import { countryById } from "./commodityNetwork";

/**
 * VRV Group presence — the group's own country footprint, shown as a distinct
 * highlighted layer on the homepage globe (separate from the commodity trade
 * network). Singapore is the HQ and is styled more strongly than the other
 * group countries. Coordinates are reused from the shared commodity network so
 * nothing here changes the About-page map.
 */
export type VrvGroupLocation = {
  id: string; // matches commodityNetwork id
  iso: string; // numeric ISO 3166-1 code = world-atlas polygon feature id
  label: string;
  type: "hq" | "group";
  lat: number;
  lng: number;
};

// Numeric ISO 3166-1 codes (used to match world-atlas country polygons).
const ISO: Record<string, string> = {
  singapore: "702",
  india: "356",
  tanzania: "834",
  zambia: "894",
  uae: "784",
  "cote-divoire": "384",
};

const DEF: { id: string; label: string; type: "hq" | "group" }[] = [
  { id: "singapore", label: "Singapore (HQ)", type: "hq" },
  { id: "india", label: "India", type: "group" },
  { id: "uae", label: "UAE", type: "group" },
  { id: "cote-divoire", label: "Ivory Coast", type: "group" },
  { id: "tanzania", label: "Tanzania", type: "group" },
  { id: "zambia", label: "Zambia", type: "group" },
];

export const vrvGroupLocations: VrvGroupLocation[] = DEF.map((d) => {
  const c = countryById[d.id];
  return { ...d, iso: ISO[d.id], lat: c.coordinates[1], lng: c.coordinates[0] };
});

export const vrvGroupIso = new Set(Object.values(ISO));
export const SINGAPORE_ISO = ISO.singapore;

/** Distinct, muted VRV Group palette (premium, not loud). */
export const vrvGroupColors = {
  hq: "#F0A92B", // gold — Singapore HQ (stronger)
  group: "#3E7D5F", // muted green — other group countries
  groupLabel: "#173D2B", // dark green label text (readable on land)
  active: "#F0A92B", // active-country border accent
} as const;
