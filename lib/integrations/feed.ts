import "server-only";
import { articles } from "@/lib/news";
import { getPublishedPosts } from "./linkedin/sync";
import type { NewsPost } from "./linkedin/types";

/** Editorial articles (lib/news.ts) presented in the unified NewsPost shape. */
export function editorialAsNews(): NewsPost[] {
  return articles.map((a) => ({
    id: `editorial:${a.slug}`,
    source: "editorial" as const,
    status: "published" as const,
    title: a.title,
    excerpt: a.excerpt,
    image: undefined,
    url: `/news/${a.slug}`,
    publishedDate: a.date,
    category: a.category,
    tags: [],
    createdAt: a.date,
    updatedAt: a.date,
  }));
}

/** Combined, published feed: editorial articles + approved LinkedIn/manual posts. */
export async function getCombinedFeed(): Promise<NewsPost[]> {
  const published = await getPublishedPosts();
  return [...editorialAsNews(), ...published].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}
