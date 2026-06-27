/**
 * Country-level commodity network — every listed country is an always-visible
 * node. Temporary links between purchase and sales countries are cycled by the
 * UI (RouteCycleManager) so the map feels alive without a fixed spider-web or
 * a hub-and-spoke "everything → Singapore" pattern.
 *
 * Routes are illustrative of commercial geographies & indicative relationships,
 * not exact shipment paths (see MAP_DISCLAIMER). Edit the two arrays freely.
 */
export type Role = "headquarters" | "agro-sales" | "agro-purchase" | "metals-sales" | "metals-purchase";
export type Segment = "agro" | "metals";

export type CommodityCountry = {
  id: string;
  label: string;
  country: string;
  coordinates: [number, number]; // [lon, lat] centroid
  roles: Role[];
  segments: Segment[];
  tooltip?: string;
};

/** [lon, lat] centroids for every country id below. */
const C: Record<string, [number, number]> = {
  singapore: [103.8198, 1.3521],
  usa: [-98, 39],
  hungary: [19.5, 47.1],
  turkey: [35, 39],
  uae: [54, 24],
  india: [78, 22],
  "sri-lanka": [80.7, 7.9],
  china: [104, 35.5],
  "south-korea": [127.8, 36.5],
  japan: [138, 36.5],
  malaysia: [101.7, 3.6],
  liberia: [-9.4, 6.4],
  "cote-divoire": [-5.5, 7.5],
  ghana: [-1, 7.9],
  nigeria: [8, 9.1],
  cameroon: [12.4, 5.7],
  brazil: [-51, -10],
  thailand: [100.9, 15.8],
  vietnam: [106, 16],
  indonesia: [113, -2],
  philippines: [122, 12],
  "united-kingdom": [-1.5, 52.5],
  spain: [-3.7, 40.4],
  italy: [12.5, 41.9],
  australia: [134, -25],
  "democratic-republic-of-congo": [23, -2.5],
  tanzania: [34.8, -6.4],
  zambia: [27.8, -13.1],
  "south-africa": [24, -29],
};

const mk = (
  id: string,
  label: string,
  country: string,
  roles: Role[],
  segments: Segment[],
  tooltip?: string,
): CommodityCountry => ({ id, label, country, coordinates: C[id], roles, segments, tooltip });

export const commodityCountries: CommodityCountry[] = [
  mk("singapore", "Singapore", "Singapore", ["headquarters", "agro-sales"], ["agro"],
    "VRV Global Headquarters. Strategic coordination, governance, investor relations, and global trade management. Agro: Sales Geography."),

  // Agro sales
  mk("usa", "USA", "United States", ["agro-sales", "metals-sales"], ["agro", "metals"]),
  mk("hungary", "Hungary", "Hungary", ["agro-sales"], ["agro"]),
  mk("turkey", "Turkey", "Turkey", ["agro-sales"], ["agro"]),
  mk("uae", "Dubai / UAE", "United Arab Emirates", ["agro-sales"], ["agro"]),
  mk("india", "India", "India", ["agro-sales", "metals-sales"], ["agro", "metals"]),
  mk("sri-lanka", "Sri Lanka", "Sri Lanka", ["agro-sales"], ["agro"]),
  mk("china", "China", "China", ["agro-sales", "metals-sales"], ["agro", "metals"]),
  mk("south-korea", "South Korea", "South Korea", ["agro-sales", "metals-sales"], ["agro", "metals"]),
  mk("japan", "Japan", "Japan", ["agro-sales", "metals-sales"], ["agro", "metals"]),
  mk("malaysia", "Malaysia", "Malaysia", ["agro-sales", "agro-purchase", "metals-purchase"], ["agro", "metals"]),

  // Agro purchase
  mk("liberia", "Liberia", "Liberia", ["agro-purchase"], ["agro"]),
  mk("cote-divoire", "Côte d’Ivoire", "Côte d’Ivoire", ["agro-purchase"], ["agro"]),
  mk("ghana", "Ghana", "Ghana", ["agro-purchase"], ["agro"]),
  mk("nigeria", "Nigeria", "Nigeria", ["agro-purchase"], ["agro"]),
  mk("cameroon", "Cameroon", "Cameroon", ["agro-purchase"], ["agro"]),
  mk("brazil", "Brazil", "Brazil", ["agro-purchase"], ["agro"]),
  mk("thailand", "Thailand", "Thailand", ["agro-purchase", "metals-purchase"], ["agro", "metals"]),
  mk("vietnam", "Vietnam", "Vietnam", ["agro-purchase"], ["agro"]),
  mk("indonesia", "Indonesia", "Indonesia", ["agro-purchase", "metals-purchase"], ["agro", "metals"]),
  mk("philippines", "Philippines", "Philippines", ["agro-purchase"], ["agro"]),

  // Metals sales
  mk("united-kingdom", "UK", "United Kingdom", ["metals-sales"], ["metals"]),
  mk("spain", "Spain", "Spain", ["metals-sales"], ["metals"]),
  mk("italy", "Italy", "Italy", ["metals-sales"], ["metals"]),

  // Metals purchase
  mk("australia", "Australia", "Australia", ["metals-purchase"], ["metals"]),
  mk("democratic-republic-of-congo", "DR Congo", "Democratic Republic of Congo", ["metals-purchase"], ["metals"]),
  mk("tanzania", "Tanzania", "Tanzania", ["metals-purchase"], ["metals"]),
  mk("zambia", "Zambia", "Zambia", ["metals-purchase"], ["metals"]),
  mk("south-africa", "South Africa", "South Africa", ["metals-purchase"], ["metals"]),
];

export const countryById: Record<string, CommodityCountry> = Object.fromEntries(commodityCountries.map((c) => [c.id, c]));

export type TempRoute = { id: string; from: string; to: string; segment: Segment; label: string };

export const temporaryCommodityRoutes: TempRoute[] = [
  // Agro
  { id: "agro-ghana-india", from: "ghana", to: "india", segment: "agro", label: "Agro corridor: Ghana to India" },
  { id: "agro-cote-divoire-turkey", from: "cote-divoire", to: "turkey", segment: "agro", label: "Agro corridor: Côte d’Ivoire to Turkey" },
  { id: "agro-nigeria-uae", from: "nigeria", to: "uae", segment: "agro", label: "Agro corridor: Nigeria to Dubai / UAE" },
  { id: "agro-cameroon-hungary", from: "cameroon", to: "hungary", segment: "agro", label: "Agro corridor: Cameroon to Hungary" },
  { id: "agro-liberia-usa", from: "liberia", to: "usa", segment: "agro", label: "Agro corridor: Liberia to USA" },
  { id: "agro-brazil-usa", from: "brazil", to: "usa", segment: "agro", label: "Agro corridor: Brazil to USA" },
  { id: "agro-thailand-china", from: "thailand", to: "china", segment: "agro", label: "Agro corridor: Thailand to China" },
  { id: "agro-vietnam-japan", from: "vietnam", to: "japan", segment: "agro", label: "Agro corridor: Vietnam to Japan" },
  { id: "agro-indonesia-south-korea", from: "indonesia", to: "south-korea", segment: "agro", label: "Agro corridor: Indonesia to South Korea" },
  { id: "agro-malaysia-singapore", from: "malaysia", to: "singapore", segment: "agro", label: "Agro corridor: Malaysia to Singapore" },
  { id: "agro-philippines-malaysia", from: "philippines", to: "malaysia", segment: "agro", label: "Agro corridor: Philippines to Malaysia" },
  { id: "agro-thailand-india", from: "thailand", to: "india", segment: "agro", label: "Agro corridor: Thailand to India" },
  { id: "agro-vietnam-china", from: "vietnam", to: "china", segment: "agro", label: "Agro corridor: Vietnam to China" },
  // Metals
  { id: "metals-australia-china", from: "australia", to: "china", segment: "metals", label: "Metals corridor: Australia to China" },
  { id: "metals-australia-japan", from: "australia", to: "japan", segment: "metals", label: "Metals corridor: Australia to Japan" },
  { id: "metals-indonesia-south-korea", from: "indonesia", to: "south-korea", segment: "metals", label: "Metals corridor: Indonesia to South Korea" },
  { id: "metals-malaysia-india", from: "malaysia", to: "india", segment: "metals", label: "Metals corridor: Malaysia to India" },
  { id: "metals-thailand-japan", from: "thailand", to: "japan", segment: "metals", label: "Metals corridor: Thailand to Japan" },
  { id: "metals-drc-india", from: "democratic-republic-of-congo", to: "india", segment: "metals", label: "Metals corridor: DRC to India" },
  { id: "metals-zambia-china", from: "zambia", to: "china", segment: "metals", label: "Metals corridor: Zambia to China" },
  { id: "metals-tanzania-italy", from: "tanzania", to: "italy", segment: "metals", label: "Metals corridor: Tanzania to Italy" },
  { id: "metals-south-africa-uk", from: "south-africa", to: "united-kingdom", segment: "metals", label: "Metals corridor: South Africa to UK" },
  { id: "metals-south-africa-spain", from: "south-africa", to: "spain", segment: "metals", label: "Metals corridor: South Africa to Spain" },
  { id: "metals-drc-uk", from: "democratic-republic-of-congo", to: "united-kingdom", segment: "metals", label: "Metals corridor: DRC to UK" },
];

/* ── derived helpers ── */
export const byRole = (role: Role) => commodityCountries.filter((c) => c.roles.includes(role));
export const isMultiRole = (c: CommodityCountry) => c.roles.filter((r) => r !== "headquarters").length > 1;

export type NetFilter = "all" | "agro" | "metals" | "sales" | "purchase" | "headquarters" | "active";

/** Route pool for a given filter. */
export function routePool(filter: NetFilter): TempRoute[] {
  if (filter === "agro") return temporaryCommodityRoutes.filter((r) => r.segment === "agro");
  if (filter === "metals") return temporaryCommodityRoutes.filter((r) => r.segment === "metals");
  if (filter === "headquarters") return [];
  return temporaryCommodityRoutes;
}

/** Whether a country is emphasised (vs dimmed) under a filter. */
export function isHighlighted(c: CommodityCountry, filter: NetFilter): boolean {
  switch (filter) {
    case "agro":
      return c.segments.includes("agro");
    case "metals":
      return c.segments.includes("metals");
    case "sales":
      return c.roles.some((r) => r.endsWith("-sales"));
    case "purchase":
      return c.roles.some((r) => r.endsWith("-purchase"));
    case "headquarters":
      return c.roles.includes("headquarters");
    default:
      return true;
  }
}

/** Tooltip role/segment lines for a country. */
export function roleSummary(c: CommodityCountry): { title: string; lines: string[] } {
  if (c.id === "singapore") {
    return {
      title: "Singapore",
      lines: ["VRV Global Headquarters", "Strategic coordination, governance & investor relations", "Agro: Sales Geography"],
    };
  }
  const lines: string[] = [];
  const agro: string[] = [];
  if (c.roles.includes("agro-sales")) agro.push("Sales");
  if (c.roles.includes("agro-purchase")) agro.push("Purchase");
  if (agro.length) lines.push(`Agro: ${agro.join(" & ")}`);
  const metals: string[] = [];
  if (c.roles.includes("metals-sales")) metals.push("Sales");
  if (c.roles.includes("metals-purchase")) metals.push("Purchase");
  if (metals.length) lines.push(`Metals: ${metals.join(" & ")}`);
  return { title: c.label, lines };
}

export const netColors = {
  hq: "#F0A92B",
  agro: "#1F8459",
  metals: "#2E84AC",
  multi: "#6F5AA8", // distinct hue for multi-role nodes
  land: "#E4EDE8",
  landStroke: "#CBDBD2",
  ocean: "#F4F8F6",
} as const;

export const MAP_DISCLAIMER =
  "Map markers represent VRV Global's headquarters, sales geographies, and purchase geographies. They do not represent exact shipment routes or permanent trade paths.";

/* ── split-screen "Global Commodity Footprint" helpers ── */

export type FootprintTab = "overview" | "agro" | "metals" | "sales" | "purchase";

export const footprintTabs: { key: FootprintTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "agro", label: "Agro Commodities" },
  { key: "metals", label: "Metals" },
  { key: "sales", label: "Sales Geographies" },
  { key: "purchase", label: "Purchase Geographies" },
];

/** Map a footprint tab to the marker-highlight / route filter. */
export const tabToFilter: Record<FootprintTab, NetFilter> = {
  overview: "all",
  agro: "agro",
  metals: "metals",
  sales: "sales",
  purchase: "purchase",
};

export const tabExplain: Record<FootprintTab, { title: string; blurb: string }> = {
  overview: {
    title: "A Singapore-coordinated global network",
    blurb:
      "VRV Global connects individual purchasing and sales geographies across agro commodities and metals, coordinated from its Singapore headquarters. Every geography stays visible; temporary links illustrate indicative commercial relationships — not fixed shipment paths. Open a tab or click a country to explore its role.",
  },
  agro: {
    title: "Agro commodity network",
    blurb:
      "Responsibly sourced agro commodities move from purchasing geographies across West Africa, Southeast Asia and Brazil to sales markets across Asia, Europe, the Middle East and North America — with Singapore as the coordination hub.",
  },
  metals: {
    title: "Metals network",
    blurb:
      "Industrial metals are sourced across Australia, Southeast Asia and Africa's metals belt and delivered to demand markets across East Asia, India, Europe and North America, supported by responsible-sourcing and logistics coordination.",
  },
  sales: {
    title: "Sales geographies",
    blurb:
      "Destination markets where VRV Global delivers agro commodities and metals — spanning North America, Europe, the Middle East, South Asia and East Asia. Several markets buy across both segments.",
  },
  purchase: {
    title: "Purchase geographies",
    blurb:
      "Sourcing and purchasing geographies across West Africa, Southeast Asia, Brazil, Australia and Africa's metals belt, engaged through responsible-sourcing relationships.",
  },
};

const uniqById = (list: CommodityCountry[]) => {
  const seen = new Set<string>();
  return list.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
};

/** Countries listed in the right panel for a tab. */
export function countriesForTab(tab: FootprintTab): CommodityCountry[] {
  switch (tab) {
    case "agro":
      return uniqById([...byRole("agro-purchase"), ...byRole("agro-sales")]);
    case "metals":
      return uniqById([...byRole("metals-purchase"), ...byRole("metals-sales")]);
    case "sales":
      return uniqById([...byRole("agro-sales"), ...byRole("metals-sales")]);
    case "purchase":
      return uniqById([...byRole("agro-purchase"), ...byRole("metals-purchase")]);
    default:
      return commodityCountries;
  }
}

/** Temporary routes that touch a given country. */
export function routesForCountry(id: string): TempRoute[] {
  return temporaryCommodityRoutes.filter((r) => r.from === id || r.to === id);
}

/** Country ids related to a country via temporary routes (incl. itself). */
export function relatedCountryIds(id: string): Set<string> {
  const ids = new Set<string>([id]);
  for (const r of routesForCountry(id)) {
    ids.add(r.from);
    ids.add(r.to);
  }
  return ids;
}

/** Human label for a single role. */
export const ROLE_LABEL: Record<Role, string> = {
  headquarters: "Headquarters",
  "agro-sales": "Agro — Sales",
  "agro-purchase": "Agro — Purchase",
  "metals-sales": "Metals — Sales",
  "metals-purchase": "Metals — Purchase",
};
