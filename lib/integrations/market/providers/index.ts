import "server-only";
import { createLogger } from "@/lib/server/logger";
import type { CommodityPrice, MarketProvider } from "../types";
import { mockCommodityPrices } from "../mock";
import { manualProvider } from "./manual";
import { sgxProvider } from "./sgx";
import { lmeProvider } from "./lme";
import { vendorProvider } from "./vendor";

const log = createLogger("market-providers");

const registry: Record<string, MarketProvider> = {
  manual: manualProvider,
  sgx: sgxProvider,
  lme: lmeProvider,
  vendor: vendorProvider,
};

export function selectProvider(): MarketProvider {
  const id = (process.env.MARKET_DATA_PROVIDER || "manual").toLowerCase();
  return registry[id] ?? manualProvider;
}

/**
 * Gather prices from the configured provider, then backfill any commodities it
 * does not cover from the indicative set, so the Market Snapshot is always
 * complete. The configured provider's records win on conflict.
 */
export async function gatherPrices(): Promise<CommodityPrice[]> {
  const provider = selectProvider();
  log.info(`Gathering market prices via provider: ${provider.id}`);
  const primary = await provider.fetchPrices();
  const bySymbol = new Map<string, CommodityPrice>();
  for (const p of mockCommodityPrices) bySymbol.set(p.symbol, { ...p }); // indicative baseline
  for (const p of primary) bySymbol.set(p.symbol, p); // provider override
  return Array.from(bySymbol.values());
}
