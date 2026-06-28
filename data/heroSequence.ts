/**
 * Hero sequence for the homepage split hero.
 *
 * Each step pairs a rotating headline (left column H1) with one Technology &
 * Traceability connection point. As the headline rotates (~10s each, ~60s loop)
 * the matching connection point is revealed/highlighted and only the active
 * point's description is shown — so the path "builds" progressively.
 */
export type HeroStep = {
  /** Rotating H1 headline (kept short and premium). */
  headline: string;
  /** Connection-point label in the Technology & Traceability path. */
  point: string;
  /** Short description shown only while this step is active. */
  description: string;
};

export const heroSequence: HeroStep[] = [
  {
    headline: "Global Sourcing Across Commodities",
    point: "Origin Sourcing",
    description: "Rubber, agro commodities, industrial metals and mining-linked materials from trusted origin networks.",
  },
  {
    headline: "Ground-Zero Traceability",
    point: "Supplier & Origin Visibility",
    description: "Supplier engagement and origin records that make supply chains more transparent and accountable.",
  },
  {
    headline: "Tolling, Refining & Value-Add",
    point: "Processing & Transformation",
    description: "Processing, tolling, refining and packing that add value across commodity flows.",
  },
  {
    headline: "Quality Checks at Every Stage",
    point: "Quality & Documentation",
    description: "Specifications, inspections and shipment-ready records linked from source to delivery.",
  },
  {
    headline: "Satellite-Based Farm & Mine Mapping",
    point: "Geospatial Intelligence",
    description: "Geospatial mapping that supports better visibility across farms, plantations and mining areas.",
  },
  {
    headline: "Ethical, ESG-Aligned Supply Chains",
    point: "ESG & Chain-of-Custody Reporting",
    description: "Traceability-ready ESG data capture and audit-oriented chain-of-custody reporting.",
  },
];

/** Longest headline (by length) reserves a stable H1 height to avoid layout jumps. */
export const LONGEST_HEADLINE = heroSequence.reduce(
  (a, b) => (b.headline.length > a.length ? b.headline : a),
  heroSequence[0].headline,
);

export const HERO_INTERVAL_MS = 10000;
