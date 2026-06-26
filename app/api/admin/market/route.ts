import { NextResponse } from "next/server";
import { getAllPrices, updatePrice } from "@/lib/integrations/market/sync";
import { extractSecret, secretMatches } from "@/lib/server/notify";
import type { CommodityPrice } from "@/lib/integrations/market/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(req: Request): boolean {
  return secretMatches(extractSecret(req), process.env.CRON_SECRET);
}

/** List all commodity records (incl. hidden) for admin management. */
export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, prices: await getAllPrices() });
}

/**
 * Update a commodity record: { symbol, changes }.
 * Use to set a manual price (changes.manualOverride=true), toggle visibility
 * (changes.visible), change the data-delay label, or edit source/disclaimer.
 */
export async function PATCH(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { symbol?: string; changes?: Partial<CommodityPrice> } | null;
  if (!body?.symbol || !body?.changes) {
    return NextResponse.json({ ok: false, error: "symbol and changes are required" }, { status: 400 });
  }
  const updated = await updatePrice(body.symbol, body.changes);
  if (!updated) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, price: updated });
}
