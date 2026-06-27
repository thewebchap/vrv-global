import "server-only";
import { kv } from "@vercel/kv";

/**
 * Design Feedback storage — Vercel KV (Upstash Redis) backed.
 * ------------------------------------------------------------------
 * Feedback items are stored as a single JSON array under FEEDBACK_KEY. This
 * persists across requests and deployments on Vercel, unlike filesystem writes
 * which are not durable on serverless platforms.
 *
 * Local development: if KV env vars are not configured, an in-memory store is
 * used so the page still works (ephemeral — resets when the dev server
 * restarts). Connect a KV database (or set KV_REST_API_URL / KV_REST_API_TOKEN)
 * for durable storage. No filesystem writes are used anywhere.
 *
 * Vercel setup:
 *   1. Vercel dashboard → Storage → Create Database → KV.
 *   2. Connect it to this project.
 *   3. Vercel injects KV_REST_API_URL / KV_REST_API_TOKEN automatically.
 *   4. Redeploy.
 */

export type FeedbackStatus = "Pending" | "Completed";

export type DesignFeedbackItem = {
  id: string;
  status: FeedbackStatus;
  page?: string;
  created: string; // YYYY-MM-DD
  feedback: string;
};

export const FEEDBACK_STATUSES: FeedbackStatus[] = ["Pending", "Completed"];

const FEEDBACK_KEY = "vrv:design-feedback";

/* ── Optional internal protection (unchanged) ─────────────────────────── */
export function feedbackPasswordRequired(): boolean {
  return !!(process.env.DESIGN_FEEDBACK_PASSWORD || "").trim();
}

export function isFeedbackRequestAuthorized(req: Request): boolean {
  const pw = (process.env.DESIGN_FEEDBACK_PASSWORD || "").trim();
  if (!pw) return true;
  return req.headers.get("x-feedback-password") === pw;
}

/* ── Storage backend: KV when configured, in-memory fallback otherwise ─── */
const kvConfigured = !!(
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_URL
);

// Process-local fallback for local dev without KV. `null` = never written yet.
let memoryStore: DesignFeedbackItem[] | null = null;

/** Demo items shown until the store has been written for the first time. */
const SEED_ITEMS: DesignFeedbackItem[] = [
  { id: "FB-001", status: "Pending", page: "Home Hero", created: "2026-06-27", feedback: "Replace static hero images with animated supply chain diagram." },
  { id: "FB-002", status: "Completed", page: "Products", created: "2026-06-27", feedback: "Re-segment products into Agro Commodities, Industrial Metals, and Mining." },
];

async function readStore(): Promise<DesignFeedbackItem[] | null> {
  if (kvConfigured) {
    const items = await kv.get<DesignFeedbackItem[]>(FEEDBACK_KEY);
    return Array.isArray(items) ? items : null;
  }
  return memoryStore;
}

async function writeStore(items: DesignFeedbackItem[]): Promise<void> {
  if (kvConfigured) {
    await kv.set(FEEDBACK_KEY, items);
  } else {
    memoryStore = items;
  }
}

/* ── Public API ───────────────────────────────────────────────────────── */
export async function getFeedbackItems(): Promise<DesignFeedbackItem[]> {
  const items = await readStore();
  // Seed the list on first read so the tracker is never empty by default.
  return items ?? SEED_ITEMS;
}

export async function saveFeedbackItems(items: DesignFeedbackItem[]): Promise<void> {
  await writeStore(items);
}

export function getNextFeedbackId(items: DesignFeedbackItem[]): string {
  const maxNumber = items.reduce((max, item) => {
    const match = item.id.match(/^FB-(\d+)$/);
    const n = match ? Number(match[1]) : 0;
    return Math.max(max, n);
  }, 0);
  return `FB-${String(maxNumber + 1).padStart(3, "0")}`;
}

export async function addFeedbackItem(input: {
  feedback: string;
  page?: string;
}): Promise<DesignFeedbackItem> {
  const feedback = (input.feedback || "").trim();
  if (!feedback) throw new Error("Feedback text is required.");

  const items = await getFeedbackItems();
  const page = input.page?.trim();
  const newItem: DesignFeedbackItem = {
    id: getNextFeedbackId(items),
    status: "Pending",
    ...(page ? { page } : {}),
    created: new Date().toISOString().slice(0, 10),
    feedback,
  };

  await saveFeedbackItems([newItem, ...items]);
  return newItem;
}

export async function updateFeedbackStatus(
  id: string,
  status: FeedbackStatus,
): Promise<DesignFeedbackItem | null> {
  if (!FEEDBACK_STATUSES.includes(status)) {
    throw new Error("Invalid status.");
  }
  const items = await getFeedbackItems();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  items[index] = { ...items[index], status };
  await saveFeedbackItems(items);
  return items[index];
}
