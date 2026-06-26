import { NextResponse } from "next/server";
import { getVisiblePrices } from "@/lib/integrations/market/sync";
import { selectProvider } from "@/lib/integrations/market/providers";
import { MARKET_DISCLAIMER } from "@/lib/integrations/market/disclaimer";
import { cached } from "@/lib/server/cache";
import { rateLimit, clientKey } from "@/lib/server/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public, read-only commodity prices feed consumed by the Market Snapshot UI.
 * Rate-limited and cached. No API keys are ever exposed — all provider calls
 * happen server-side during sync.
 */
export async function GET(req: Request) {
  const rl = rateLimit(clientKey(req, "market-prices"), { limit: 60, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: "Rate limit exceeded" }, { status: 429 });
  }

  const prices = await cached("market-prices:visible", 60_000, getVisiblePrices);
  const lastUpdated = prices.reduce<string>((max, p) => (p.timestamp > max ? p.timestamp : max), "");

  return NextResponse.json(
    {
      ok: true,
      provider: selectProvider().id,
      lastUpdated,
      disclaimer: MARKET_DISCLAIMER,
      count: prices.length,
      prices,
    },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
  );
}
