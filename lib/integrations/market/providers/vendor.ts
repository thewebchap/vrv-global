import "server-only";
import { createLogger } from "@/lib/server/logger";
import type { CommodityPrice, MarketProvider } from "../types";
import { mockCommodityPrices } from "../mock";

const log = createLogger("market-vendor");

/**
 * Generic licensed-vendor provider (Refinitiv/LSEG, Bloomberg, Trading
 * Economics, Nasdaq Data Link/Quandl, etc.). Configure MARKET_DATA_VENDOR_API_KEY
 * and MARKET_DATA_VENDOR_BASE_URL, then implement the mapping in `fetchLive()`.
 * Returns the full indicative set until wired.
 */
export const vendorProvider: MarketProvider = {
  id: "vendor",
  label: "Licensed market-data vendor",
  async fetchPrices() {
    const indicative = mockCommodityPrices.map((p) => ({ ...p }));
    if (!process.env.MARKET_DATA_VENDOR_API_KEY || !process.env.MARKET_DATA_VENDOR_BASE_URL) {
      log.info("Vendor feed not configured — returning indicative prices.");
      return indicative;
    }
    try {
      const live = await fetchLive();
      return live.length ? live : indicative;
    } catch (err) {
      log.error("Vendor live fetch failed — using indicative fallback", err);
      return indicative;
    }
  },
};

async function fetchLive(): Promise<CommodityPrice[]> {
  // Implement against your licensed vendor API and map to CommodityPrice[].
  return [];
}
