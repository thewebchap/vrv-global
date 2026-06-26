/** Normalised news/blog post record stored in the `news_posts` collection. */
export type NewsSource = "linkedin" | "manual" | "editorial";
export type NewsStatus = "draft" | "published" | "rejected";

export type NewsPost = {
  id: string; // stable id (e.g. `linkedin:<urn>` or `manual:<slug>`)
  source: NewsSource;
  status: NewsStatus;
  title: string; // post title or generated headline
  excerpt: string;
  image?: string; // image URL (optional)
  url: string; // canonical link — the LinkedIn post URL for LinkedIn sources
  publishedDate: string; // ISO date
  category: string; // maps to the News & Insights filters
  tags: string[];
  createdAt: string; // ISO — when ingested
  updatedAt: string; // ISO — last admin/system change
};

export const NEWS_COLLECTION = "news_posts";
