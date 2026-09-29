/** Shared types for the VRV Global blog system. */

export type BlogRole = "author" | "admin";
export type BlogStatus = "draft" | "published";
export type AuthorStatus = "active" | "inactive";

export type BlogMedia = {
  url: string;
  alt?: string;
  type?: string;
};

export type BlogAuthor = {
  id: string;
  name: string;
  email: string;
  role: BlogRole;
  status: AuthorStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: string; // markdown
  coverMediaUrl?: string;
  coverMediaAlt?: string;
  inlineMedia?: BlogMedia[];
  tags: string[];
  authorId: string;
  authorName: string;
  status: BlogStatus;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type BlogOtp = {
  email: string;
  otpHash: string;
  expiresAt: string;
  attempts: number;
  lastSentAt: string;
  createdAt: string;
};

export type BlogSession = {
  id: string;
  authorId: string;
  email: string;
  role: BlogRole;
  expiresAt: string;
  createdAt: string;
};

/** Suggested, non-exhaustive tag vocabulary shown in the editor. */
export const SUGGESTED_TAGS = [
  "Natural Rubber",
  "Agro Commodities",
  "Industrial Metals",
  "Mining",
  "Sustainability",
  "Traceability",
  "Supply Chain",
  "Ventures",
  "Commodity Trading",
] as const;

/** Media types accepted by the upload endpoint. */
export const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];
export const MAX_MEDIA_BYTES = 8 * 1024 * 1024; // 8 MB
