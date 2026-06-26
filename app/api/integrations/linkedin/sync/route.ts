import { NextResponse } from "next/server";
import { syncLinkedIn } from "@/lib/integrations/linkedin/sync";
import { extractSecret, secretMatches } from "@/lib/server/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sync LinkedIn company posts → news_posts (as drafts).
 * Protected by CRON_SECRET. Call from a scheduled job (see vercel.json):
 *   curl -X POST $SITE/api/integrations/linkedin/sync \
 *     -H "Authorization: Bearer $CRON_SECRET"
 * GET is supported for cron platforms that only issue GET requests.
 */
async function handle(req: Request) {
  if (!secretMatches(extractSecret(req), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const result = await syncLinkedIn();
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export const POST = handle;
export const GET = handle;
