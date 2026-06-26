import "server-only";
import { createLogger } from "@/lib/server/logger";
import type { CommodityPrice, MarketProvider } from "../types";
import { mockCommodityPrices } from "../mock";

const log = createLogger("market-sgx");

/**
 * SGX / SICOM provider — rubber futures (TSR20, RSS3). VRV Global is Singapore-
 * based, so SGX/SICOM is the priority source for rubber benchmarks.
 *
 * SGX market data is licensed and not available from a free public endpoint.
 * Wire your approved SGX/licensed-vendor feed inside `fetchLive()`. Until then
 * this returns the indicative rubber subset so the UI stays populated.
 */
const RUBBER_SYMBOLS = ["SICOM-TSR20", "SICOM-RSS3", "SNR-BENCHMARK"];

export const sgxProvider: MarketProvider = {
  id: "sgx",
  label: "SGX / SICOM",
  async fetchPrices() {
    const indicative = mockCommodityPrices.filter((p) => RUBBER_SYMBOLS.includes(p.symbol)).map((p) => ({ ...p }));
    if (!process.env.SGX_API_KEY) {
      log.info("SGX_API_KEY not set — returning indicative rubber prices.");
      return indicative;
    }
    try {
      const live = await fetchLive();
      return live.length ? live : indicative;
    } catch (err) {
      log.error("SGX live fetch failed — using indicative fallback", err);
      return indicative;
    }
  },
};

/** Placeholder for the licensed SGX/SICOM feed. Map the response to CommodityPrice[]. */
async function fetchLive(): Promise<CommodityPrice[]> {
  // Example shape — replace endpoint/parsing with your licensed SGX data API:
  //   const res = await fetchWithTimeout("https://api.your-sgx-vendor.com/sicom", {
  //     headers: { Authorization: `Bearer ${process.env.SGX_API_KEY}` },
  //   });
  //   const data = await res.json();
  //   return data.quotes.map(mapToCommodityPrice);
  return [];
}
