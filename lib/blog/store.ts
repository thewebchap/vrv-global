import "server-only";
import { randomUUID } from "node:crypto";
import { kv } from "@vercel/kv";
import type { BlogAuthor, BlogOtp, BlogPost, BlogSession } from "./types";

/**
 * Storage adapter for the blog. Uses Vercel KV (Upstash Redis) in production
 * when configured, and an in-process store in development / build so the app
 * always works. Swap the backend here without touching the rest of the app.
 *
 * NOTE: the in-memory backend is per-process and non-durable — it exists only
 * so local dev and CI builds run without external services. Configure KV
 * (KV_REST_API_URL + KV_REST_API_TOKEN) for real persistence.
 */
export const kvConfigured = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// ---- low-level backend (kv | memory) ------------------------------------
// The in-memory backend is stored on globalThis so every route bundle (and HMR
// reload) shares ONE instance in dev. Production should configure KV.
type MemStore = { kv: Map<string, unknown>; ttl: Map<string, number>; sets: Map<string, Set<string>> };
const g = globalThis as unknown as { __vrvBlogMem?: MemStore };
const mem: MemStore =
  g.__vrvBlogMem ?? (g.__vrvBlogMem = { kv: new Map(), ttl: new Map(), sets: new Map() });
function memAlive(key: string) {
  const exp = mem.ttl.get(key);
  if (exp && exp < Date.now()) {
    mem.kv.delete(key);
    mem.ttl.delete(key);
    return false;
  }
  return true;
}

async function bGet<T>(key: string): Promise<T | null> {
  if (kvConfigured) return (await kv.get<T>(key)) ?? null;
  return memAlive(key) ? ((mem.kv.get(key) as T) ?? null) : null;
}
async function bSet(key: string, val: unknown, ttlSeconds?: number): Promise<void> {
  if (kvConfigured) {
    await (ttlSeconds ? kv.set(key, val, { ex: ttlSeconds }) : kv.set(key, val));
    return;
  }
  mem.kv.set(key, val);
  if (ttlSeconds) mem.ttl.set(key, Date.now() + ttlSeconds * 1000);
  else mem.ttl.delete(key);
}
async function bDel(key: string): Promise<void> {
  if (kvConfigured) await kv.del(key);
  else {
    mem.kv.delete(key);
    mem.ttl.delete(key);
  }
}
async function bSAdd(key: string, member: string): Promise<void> {
  if (kvConfigured) await kv.sadd(key, member);
  else {
    if (!mem.sets.has(key)) mem.sets.set(key, new Set());
    mem.sets.get(key)!.add(member);
  }
}
async function bSRem(key: string, member: string): Promise<void> {
  if (kvConfigured) await kv.srem(key, member);
  else mem.sets.get(key)?.delete(member);
}
async function bSMembers(key: string): Promise<string[]> {
  if (kvConfigured) return (await kv.smembers(key)) as string[];
  return Array.from(mem.sets.get(key) ?? []);
}

// ---- key helpers --------------------------------------------------------
const K = {
  author: (id: string) => `blog:author:${id}`,
  authorByEmail: (email: string) => `blog:authorByEmail:${email}`,
  authors: "blog:authors",
  post: (id: string) => `blog:post:${id}`,
  postBySlug: (slug: string) => `blog:postBySlug:${slug}`,
  posts: "blog:posts",
  otp: (email: string) => `blog:otp:${email}`,
  session: (id: string) => `blog:session:${id}`,
};

export const normalizeEmail = (e: string) => e.trim().toLowerCase();
const now = () => new Date().toISOString();

// ---- authors ------------------------------------------------------------
export async function createAuthor(input: {
  name: string;
  email: string;
  role?: BlogAuthor["role"];
  status?: BlogAuthor["status"];
}): Promise<BlogAuthor> {
  const email = normalizeEmail(input.email);
  const existing = await getAuthorByEmail(email);
  if (existing) return existing;
  const author: BlogAuthor = {
    id: randomUUID(),
    name: input.name.trim() || email,
    email,
    role: input.role ?? "author",
    status: input.status ?? "active",
    createdAt: now(),
    updatedAt: now(),
  };
  await bSet(K.author(author.id), author);
  await bSet(K.authorByEmail(email), author.id);
  await bSAdd(K.authors, author.id);
  return author;
}

export async function getAuthorById(id: string): Promise<BlogAuthor | null> {
  return bGet<BlogAuthor>(K.author(id));
}
export async function getAuthorByEmail(email: string): Promise<BlogAuthor | null> {
  const id = await bGet<string>(K.authorByEmail(normalizeEmail(email)));
  return id ? getAuthorById(id) : null;
}
export async function listAuthors(): Promise<BlogAuthor[]> {
  const ids = await bSMembers(K.authors);
  const all = await Promise.all(ids.map((id) => getAuthorById(id)));
  return all.filter(Boolean).sort((a, b) => (a!.createdAt < b!.createdAt ? 1 : -1)) as BlogAuthor[];
}
export async function updateAuthor(id: string, patch: Partial<BlogAuthor>): Promise<BlogAuthor | null> {
  const a = await getAuthorById(id);
  if (!a) return null;
  const next = { ...a, ...patch, id: a.id, email: a.email, updatedAt: now() };
  await bSet(K.author(id), next);
  return next;
}
export async function deleteAuthor(id: string): Promise<void> {
  const a = await getAuthorById(id);
  if (!a) return;
  await bDel(K.author(id));
  await bDel(K.authorByEmail(a.email));
  await bSRem(K.authors, id);
}

/** Ensure the bootstrap admin (BLOG_ADMIN_EMAIL) exists as an active admin. */
export async function ensureBootstrapAdmin(email: string): Promise<BlogAuthor> {
  const existing = await getAuthorByEmail(email);
  if (existing) {
    if (existing.role !== "admin" || existing.status !== "active") {
      return (await updateAuthor(existing.id, { role: "admin", status: "active" }))!;
    }
    return existing;
  }
  return createAuthor({ name: "VRV Blog Admin", email, role: "admin", status: "active" });
}

// ---- posts --------------------------------------------------------------
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "post";
}
async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = slugify(base);
  let i = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existingId = await bGet<string>(K.postBySlug(slug));
    if (!existingId || existingId === ignoreId) return slug;
    i += 1;
    slug = `${slugify(base)}-${i}`;
  }
}

export async function createPost(input: {
  title: string;
  slug?: string;
  body: string;
  excerpt?: string;
  coverMediaUrl?: string;
  coverMediaAlt?: string;
  tags: string[];
  author: BlogAuthor;
  status: BlogPost["status"];
  seoTitle?: string;
  seoDescription?: string;
}): Promise<BlogPost> {
  const slug = await uniqueSlug(input.slug?.trim() || input.title);
  const post: BlogPost = {
    id: randomUUID(),
    title: input.title.trim(),
    slug,
    body: input.body,
    excerpt: input.excerpt?.trim() || undefined,
    coverMediaUrl: input.coverMediaUrl?.trim() || undefined,
    coverMediaAlt: input.coverMediaAlt?.trim() || undefined,
    tags: input.tags,
    authorId: input.author.id,
    authorName: input.author.name,
    status: input.status,
    seoTitle: input.seoTitle?.trim() || undefined,
    seoDescription: input.seoDescription?.trim() || undefined,
    createdAt: now(),
    updatedAt: now(),
    publishedAt: input.status === "published" ? now() : undefined,
  };
  await bSet(K.post(post.id), post);
  await bSet(K.postBySlug(post.slug), post.id);
  await bSAdd(K.posts, post.id);
  return post;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  return bGet<BlogPost>(K.post(id));
}
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const id = await bGet<string>(K.postBySlug(slug));
  return id ? getPostById(id) : null;
}
export async function listPosts(): Promise<BlogPost[]> {
  const ids = await bSMembers(K.posts);
  const all = await Promise.all(ids.map((id) => getPostById(id)));
  return (all.filter(Boolean) as BlogPost[]).sort((a, b) =>
    (b.publishedAt ?? b.updatedAt).localeCompare(a.publishedAt ?? a.updatedAt),
  );
}
export async function listPublishedPosts(): Promise<BlogPost[]> {
  return (await listPosts()).filter((p) => p.status === "published");
}
export async function listPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  return (await listPosts()).filter((p) => p.authorId === authorId);
}
export async function updatePost(id: string, patch: Partial<BlogPost>): Promise<BlogPost | null> {
  const p = await getPostById(id);
  if (!p) return null;
  let slug = p.slug;
  if (patch.slug && patch.slug !== p.slug) {
    slug = await uniqueSlug(patch.slug, p.id);
    await bDel(K.postBySlug(p.slug));
    await bSet(K.postBySlug(slug), p.id);
  }
  const wasPublished = p.status === "published";
  const nowPublished = (patch.status ?? p.status) === "published";
  const next: BlogPost = {
    ...p,
    ...patch,
    id: p.id,
    slug,
    updatedAt: now(),
    publishedAt: !wasPublished && nowPublished ? now() : p.publishedAt,
  };
  await bSet(K.post(id), next);
  return next;
}
export async function deletePost(id: string): Promise<void> {
  const p = await getPostById(id);
  if (!p) return;
  await bDel(K.post(id));
  await bDel(K.postBySlug(p.slug));
  await bSRem(K.posts, id);
}

// ---- otp ----------------------------------------------------------------
export async function setOtp(email: string, otp: BlogOtp, ttlSeconds: number): Promise<void> {
  await bSet(K.otp(normalizeEmail(email)), otp, ttlSeconds);
}
export async function getOtp(email: string): Promise<BlogOtp | null> {
  return bGet<BlogOtp>(K.otp(normalizeEmail(email)));
}
export async function deleteOtp(email: string): Promise<void> {
  await bDel(K.otp(normalizeEmail(email)));
}

// ---- sessions -----------------------------------------------------------
export async function createSession(author: BlogAuthor, ttlSeconds: number): Promise<BlogSession> {
  const session: BlogSession = {
    id: randomUUID(),
    authorId: author.id,
    email: author.email,
    role: author.role,
    expiresAt: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
    createdAt: now(),
  };
  await bSet(K.session(session.id), session, ttlSeconds);
  return session;
}
export async function getSession(id: string): Promise<BlogSession | null> {
  const s = await bGet<BlogSession>(K.session(id));
  if (!s) return null;
  if (new Date(s.expiresAt).getTime() < Date.now()) {
    await bDel(K.session(id));
    return null;
  }
  return s;
}
export async function deleteSession(id: string): Promise<void> {
  await bDel(K.session(id));
}
