import "server-only";
import { promises as fs } from "fs";
import path from "path";

/**
 * File-based JSON datastore — a stand-in for a real database / headless CMS.
 * Each "collection" is a JSON file in /data. Swap this module for Prisma,
 * Mongo, Supabase, Sanity, etc. without touching callers: keep the same
 * async signatures (getCollection / writeCollection / upsert / patch).
 *
 * NOTE: filesystem writes persist on a long-running Node server (npm start)
 * and in local dev. On read-only/serverless hosts, point these helpers at a
 * real database — see INTEGRATIONS.md.
 */
const DATA_DIR = path.join(process.cwd(), "data");

export type Record_ = { id: string; [k: string]: unknown };

// Serialise writes per-file to avoid lost updates under concurrency.
const writeChains = new Map<string, Promise<unknown>>();

function filePath(collection: string): string {
  return path.join(DATA_DIR, `${collection}.json`);
}

export async function getCollection<T extends Record_>(collection: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath(collection), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
}

async function persist<T extends Record_>(collection: string, rows: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${filePath(collection)}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(rows, null, 2), "utf8");
  await fs.rename(tmp, filePath(collection)); // atomic replace
}

/** Queue a mutation against a collection so writes never interleave. */
async function mutate<T extends Record_, R>(
  collection: string,
  fn: (rows: T[]) => { rows: T[]; result: R },
): Promise<R> {
  const prev = writeChains.get(collection) ?? Promise.resolve();
  const run = prev.then(async () => {
    const rows = await getCollection<T>(collection);
    const { rows: next, result } = fn(rows);
    await persist(collection, next);
    return result;
  });
  writeChains.set(
    collection,
    run.then(
      () => undefined,
      () => undefined,
    ),
  );
  return run;
}

export async function writeCollection<T extends Record_>(collection: string, rows: T[]): Promise<void> {
  await mutate<T, void>(collection, () => ({ rows, result: undefined }));
}

/** Insert or replace by id. Returns true if the row was newly inserted. */
export async function upsert<T extends Record_>(collection: string, row: T): Promise<boolean> {
  return mutate<T, boolean>(collection, (rows) => {
    const idx = rows.findIndex((r) => r.id === row.id);
    if (idx === -1) return { rows: [row, ...rows], result: true };
    const next = rows.slice();
    next[idx] = { ...next[idx], ...row };
    return { rows: next, result: false };
  });
}

/** Insert many, skipping ids that already exist. Returns count actually added. */
export async function insertMissing<T extends Record_>(collection: string, incoming: T[]): Promise<number> {
  return mutate<T, number>(collection, (rows) => {
    const seen = new Set(rows.map((r) => r.id));
    const fresh = incoming.filter((r) => !seen.has(r.id));
    return { rows: [...fresh, ...rows], result: fresh.length };
  });
}

/** Patch a single row by id. Returns the updated row or null. */
export async function patch<T extends Record_>(
  collection: string,
  id: string,
  changes: Partial<T>,
): Promise<T | null> {
  return mutate<T, T | null>(collection, (rows) => {
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) return { rows, result: null };
    const next = rows.slice();
    next[idx] = { ...next[idx], ...changes };
    return { rows: next, result: next[idx] };
  });
}

export async function remove(collection: string, id: string): Promise<boolean> {
  return mutate(collection, (rows) => {
    const next = rows.filter((r) => r.id !== id);
    return { rows: next, result: next.length !== rows.length };
  });
}
