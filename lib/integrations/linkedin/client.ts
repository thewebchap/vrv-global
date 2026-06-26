import "server-only";
import { createLogger } from "@/lib/server/logger";
import { fetchWithTimeout, withRetry } from "@/lib/server/retry";
import type { NewsPost } from "./types";

const log = createLogger("linkedin");
const API_VERSION = "202401"; // LinkedIn versioned API (YYYYMM) — update as required.

export function isLinkedInConfigured(): boolean {
  return Boolean(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_ORGANIZATION_ID);
}

/**
 * Fetch recent organization posts from the official LinkedIn API.
 *
 * Requires an approved LinkedIn app (Marketing Developer Platform /
 * Community Management API), the `r_organization_social` permission, and an
 * access token scoped to the VRV Global organization. Endpoint shapes change
 * between LinkedIn API versions — adjust the URL/parsing to your approved
 * version. Returns null when not configured or on any failure, so callers
 * fall back to manual/mock data. We DO NOT scrape LinkedIn.
 */
export async function fetchOrganizationPosts(): Promise<NewsPost[] | null> {
  if (!isLinkedInConfigured()) {
    log.info("LinkedIn API not configured — falling back to manual/mock data.");
    return null;
  }

  const token = process.env.LINKEDIN_ACCESS_TOKEN!;
  const orgId = process.env.LINKEDIN_ORGANIZATION_ID!;
  const author = encodeURIComponent(`urn:li:organization:${orgId}`);
  const url = `https://api.linkedin.com/rest/posts?q=author&author=${author}&count=20&sortBy=LAST_MODIFIED`;

  try {
    const res = await withRetry(
      () =>
        fetchWithTimeout(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "LinkedIn-Version": API_VERSION,
            "X-Restli-Protocol-Version": "2.0.0",
          },
        }),
      { retries: 3, onRetry: (n, e) => log.warn(`LinkedIn fetch retry ${n}`, e) },
    );

    if (!res.ok) {
      log.error(`LinkedIn API responded ${res.status}`, await safeText(res));
      return null;
    }

    const data = (await res.json()) as { elements?: LinkedInApiPost[] };
    return (data.elements ?? []).map(normalizePost);
  } catch (err) {
    log.error("LinkedIn fetch failed", err);
    return null;
  }
}

type LinkedInApiPost = {
  id?: string;
  commentary?: string;
  createdAt?: number;
  lastModifiedAt?: number;
  content?: { media?: { id?: string } };
};

function normalizePost(p: LinkedInApiPost): NewsPost {
  const urn = p.id ?? `unknown-${p.createdAt ?? Date.now()}`;
  const text = (p.commentary ?? "").trim();
  const headline = deriveHeadline(text);
  const iso = new Date(p.createdAt ?? Date.now()).toISOString();
  const shareUrl = `https://www.linkedin.com/feed/update/${encodeURIComponent(urn)}`;
  return {
    id: `linkedin:${urn}`,
    source: "linkedin",
    status: "draft", // every API-sourced post starts as draft for admin review
    title: headline,
    excerpt: text.length > 280 ? `${text.slice(0, 277)}…` : text || headline,
    image: undefined, // resolve media URN → asset URL with a follow-up call if needed
    url: shareUrl,
    publishedDate: iso.slice(0, 10),
    category: "LinkedIn Updates",
    tags: extractHashtags(text),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/** First sentence / line of the post, trimmed to a headline length. */
function deriveHeadline(text: string): string {
  if (!text) return "VRV Global LinkedIn update";
  const firstLine = text.split(/\n|\. /)[0].trim();
  return firstLine.length > 90 ? `${firstLine.slice(0, 87)}…` : firstLine;
}

function extractHashtags(text: string): string[] {
  return Array.from(new Set((text.match(/#\w+/g) ?? []).map((t) => t.slice(1)))).slice(0, 6);
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "<no body>";
  }
}
