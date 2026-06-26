import "server-only";
import { createLogger } from "@/lib/server/logger";
import { getCollection, writeCollection, patch } from "@/lib/server/db";
import { notifyAdmin } from "@/lib/server/notify";
import { gatherPrices, selectProvider } from "./providers";
import { MARKET_COLLECTION, type CommodityPrice } from "./types";

const log = createLogger("market-sync");

export type MarketSyncResult = { ok: boolean; provider: string; updated: number; error?: string };

/**
 * Refresh commodity prices from the configured provider into the
 * `commodity_prices` collection. Records flagged `manualOverride` keep their
 * admin-edited price/labels; the `visible` flag is always preserved across
 * syncs. Idempotent and safe to run on a schedule.
 */
export async function syncMarketPrices(): Promise<MarketSyncResult> {
  const provider = selectProvider();
  try {
    const incoming = await gatherPrices();
    const existing = await getCollection<CommodityPrice>(MARKET_COLLECTION);
    const existingBySymbol = new Map(existing.map((r) => [r.symbol, r]));

    const merged: CommodityPrice[] = incoming.map((next) => {
      const prev = existingBySymbol.get(next.symbol);
      if (!prev) return next;
      if (prev.manualOverride) {
        // Keep admin-entered values; just carry the visible flag.
        return { ...prev };
      }
      return { ...next, visible: prev.visible };
    });

    // Preserve any admin-only records that the provider doesn't return.
    for (const prev of existing) {
      if (!merged.find((m) => m.symbol === prev.symbol)) merged.push(prev);
    }

    await writeCollection<CommodityPrice>(MARKET_COLLECTION, merged);
    log.info(`Market sync complete via ${provider.id}: ${merged.length} records.`);
    return { ok: true, provider: provider.id, updated: merged.length };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log.error("Market sync failed", err);
    await notifyAdmin("Commodity price sync failed", message);
    return { ok: false, provider: provider.id, updated: 0, error: message };
  }
}

/** Public read: visible prices, sorted by category then name. Seeds on first run. */
export async function getVisiblePrices(): Promise<CommodityPrice[]> {
  let rows = await getCollection<CommodityPrice>(MARKET_COLLECTION);
  if (rows.length === 0) {
    await syncMarketPrices(); // first-run seed
    rows = await getCollection<CommodityPrice>(MARKET_COLLECTION);
  }
  const order = { agro: 0, metals: 1, circular: 2 } as const;
  return rows
    .filter((r) => r.visible)
    .sort((a, b) => order[a.category] - order[b.category] || a.name.localeCompare(b.name));
}

export async function getAllPrices(): Promise<CommodityPrice[]> {
  return getCollection<CommodityPrice>(MARKET_COLLECTION);
}

/** Admin: override or toggle a commodity record. */
export async function updatePrice(symbol: string, changes: Partial<CommodityPrice>): Promise<CommodityPrice | null> {
  return patch<CommodityPrice>(MARKET_COLLECTION, symbol, {
    ...changes,
    timestamp: changes.timestamp ?? new Date().toISOString(),
  });
}
