import { NextResponse } from "next/server";
import { getCombinedFeed } from "@/lib/integrations/feed";
import { cached } from "@/lib/server/cache";
import { rateLimit, clientKey } from "@/lib/server/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public combined news feed: editorial articles + approved LinkedIn/manual posts. */
export async function GET(req: Request) {
  const rl = rateLimit(clientKey(req, "news"), { limit: 60, windowMs: 60_000 });
  if (!rl.ok) return NextResponse.json({ ok: false, error: "Rate limit exceeded" }, { status: 429 });

  const posts = await cached("news:combined", 60_000, getCombinedFeed);
  return NextResponse.json(
    { ok: true, count: posts.length, posts },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
  );
}
