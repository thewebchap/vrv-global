import "server-only";
import { createLogger } from "@/lib/server/logger";
import { getCollection, insertMissing, upsert, patch } from "@/lib/server/db";
import { notifyAdmin } from "@/lib/server/notify";
import { fetchOrganizationPosts, isLinkedInConfigured } from "./client";
import { mockLinkedInPosts } from "./mock";
import { NEWS_COLLECTION, type NewsPost, type NewsStatus } from "./types";

const log = createLogger("linkedin-sync");

export type SyncResult = { ok: boolean; source: "api" | "mock"; fetched: number; added: number; error?: string };

/**
 * Sync LinkedIn company posts into the news_posts collection.
 * - Uses the official API when configured, otherwise seeds mock/manual data.
 * - New posts are stored as `draft` and never auto-published.
 * - Existing ids are skipped (dedupe), so re-running is safe (idempotent).
 */
export async function syncLinkedIn(): Promise<SyncResult> {
  try {
    let posts = await fetchOrganizationPosts();
    const source: "api" | "mock" = posts ? "api" : "mock";
    if (!posts) posts = mockLinkedInPosts;

    const added = await insertMissing<NewsPost>(NEWS_COLLECTION, posts);
    log.info(`LinkedIn sync complete (${source}): fetched ${posts.length}, added ${added} new draft(s).`);
    return { ok: true, source, fetched: posts.length, added };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log.error("LinkedIn sync failed", err);
    await notifyAdmin("LinkedIn sync failed", message);
    return { ok: false, source: isLinkedInConfigured() ? "api" : "mock", fetched: 0, added: 0, error: message };
  }
}

/** Admin: add a LinkedIn post manually by URL (fallback when API access is unavailable). */
export async function addManualPost(input: {
  url: string;
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  tags?: string[];
  publishedDate?: string;
}): Promise<NewsPost> {
  const now = new Date().toISOString();
  const id = `manual:${slugify(input.title)}-${now.slice(0, 10)}`;
  const post: NewsPost = {
    id,
    source: input.url.includes("linkedin.com") ? "linkedin" : "manual",
    status: "draft",
    title: input.title,
    excerpt: input.excerpt ?? "",
    image: input.image,
    url: input.url,
    publishedDate: input.publishedDate ?? now.slice(0, 10),
    category: input.category ?? "LinkedIn Updates",
    tags: input.tags ?? [],
    createdAt: now,
    updatedAt: now,
  };
  await upsert<NewsPost>(NEWS_COLLECTION, post);
  return post;
}

/** Admin: change a post's status (publish / reject / back to draft). */
export async function setPostStatus(id: string, status: NewsStatus): Promise<NewsPost | null> {
  return patch<NewsPost>(NEWS_COLLECTION, id, { status, updatedAt: new Date().toISOString() });
}

export async function getAllPosts(): Promise<NewsPost[]> {
  const rows = await getCollection<NewsPost>(NEWS_COLLECTION);
  return rows.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

export async function getPublishedPosts(): Promise<NewsPost[]> {
  return (await getAllPosts()).filter((p) => p.status === "published");
}

/**
 * Latest approved LinkedIn-sourced posts (LinkedIn or manual), newest first.
 * Same data source the News page uses — no browser-side fetching/scraping.
 */
export async function getLatestLinkedInPosts(limit = 2): Promise<NewsPost[]> {
  return (await getPublishedPosts())
    .filter((p) => p.source === "linkedin" || p.source === "manual")
    .slice(0, limit);
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
