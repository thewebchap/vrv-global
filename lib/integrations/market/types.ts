/** A single commodity price record stored in the `commodity_prices` collection. */
export type CommodityCategory = "agro" | "metals" | "circular";
export type DataDelay = "live" | "delayed" | "indicative" | "manual";

export type CommodityPrice = {
  id: string; // === symbol, used as the stable key
  name: string;
  symbol: string;
  category: CommodityCategory;
  source: string; // human label, e.g. "SGX / SICOM"
  exchange: string; // e.g. "SGX", "LME", "Indicative"
  price: number | null;
  currency: string; // e.g. "USD", "USc"
  unit: string; // e.g. "tonne", "kg"
  change: number | null; // absolute daily change
  changePercent: number | null; // % daily change
  timestamp: string; // ISO — when the quote was observed
  dataDelay: DataDelay; // live | delayed | indicative | manual
  sourceUrl: string; // link to the exchange / provider
  licenseNote: string; // attribution / licensing note
  manualOverride: boolean; // admin-edited; protected from auto-sync overwrite
  visible: boolean; // show/hide on the site
  trend: number[]; // recent values for the mini sparkline chart
};

/** Common interface every provider implements. */
export type MarketProvider = {
  id: string;
  label: string;
  /** Returns whatever commodities this provider covers (may be a subset). */
  fetchPrices: () => Promise<CommodityPrice[]>;
};

export const MARKET_COLLECTION = "commodity_prices";
