import "server-only";
import type { MarketProvider } from "../types";
import { mockCommodityPrices } from "../mock";

/**
 * Manual / indicative provider (default). Returns the indicative sample set.
 * In production this represents prices an admin maintains by hand or imports
 * from a bulletin until a licensed live feed is connected.
 */
export const manualProvider: MarketProvider = {
  id: "manual",
  label: "Manual / Indicative",
  async fetchPrices() {
    return mockCommodityPrices.map((p) => ({ ...p }));
  },
};
