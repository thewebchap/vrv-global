import "server-only";
import { createLogger } from "@/lib/server/logger";
import type { CommodityPrice, MarketProvider } from "../types";
import { mockCommodityPrices } from "../mock";

const log = createLogger("market-lme");

/**
 * London Metal Exchange provider — copper, aluminium, nickel. LME provides
 * official/closing prices but distribution requires a market-data licence.
 * Wire your approved LME or licensed-vendor feed inside `fetchLive()`.
 */
const METAL_SYMBOLS = ["LME-COPPER", "LME-ALUMINIUM", "LME-NICKEL"];

export const lmeProvider: MarketProvider = {
  id: "lme",
  label: "London Metal Exchange",
  async fetchPrices() {
    const indicative = mockCommodityPrices.filter((p) => METAL_SYMBOLS.includes(p.symbol)).map((p) => ({ ...p }));
    if (!process.env.LME_API_KEY) {
      log.info("LME_API_KEY not set — returning indicative metal prices.");
      return indicative;
    }
    try {
      const live = await fetchLive();
      return live.length ? live : indicative;
    } catch (err) {
      log.error("LME live fetch failed — using indicative fallback", err);
      return indicative;
    }
  },
};

/** Placeholder for the licensed LME feed. Map the response to CommodityPrice[]. */
async function fetchLive(): Promise<CommodityPrice[]> {
  // Replace with your licensed LME/vendor endpoint + parsing.
  return [];
}
