import { NextResponse } from "next/server";
import { syncMarketPrices } from "@/lib/integrations/market/sync";
import { extractSecret, secretMatches } from "@/lib/server/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Refresh commodity prices from the configured provider. Protected by
 * CRON_SECRET. Schedule per market hours (see vercel.json / INTEGRATIONS.md).
 */
async function handle(req: Request) {
  if (!secretMatches(extractSecret(req), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const result = await syncMarketPrices();
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export const POST = handle;
export const GET = handle;
