/**
 * VRV Ventures content — the institutional VC & physical-incubation arm.
 * Copy is used as-is from the supplied brief (content only); the VRV design
 * system is applied on the pages themselves. Shared by /ventures (previews) and
 * the /ventures/{trade-corridors,focus-verticals,pitch} subpages.
 */
import type { IconName } from "@/components/ui/Icon";

export const venturesHero = {
  eyebrow: "Institutional VC & Physical Incubation",
  title: "The Algorithmic Layer for Global Physical Trade",
  sub: "VRV Ventures backs early-stage founders merging AI intelligence with ground-truth physical commodity infrastructure across Africa, Asia, and global liquidity hubs.",
};

export const ventureMetrics: { icon: IconName; title: string; note: string }[] = [
  { icon: "route", title: "Origin to Port", note: "Direct physical off-take & operational sandbox" },
  { icon: "chart", title: "Seed → Series A", note: "Institutional lead & strategic co-investment" },
  { icon: "check", title: "10-Day SLA", note: "Accelerated investment committee decisions" },
];

export type Corridor = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  heading: string;
  description: string;
  bullets: string[];
  icon: IconName;
  accent: string; // hex
};

export const corridorsIntro = {
  eyebrow: "Cross-Border Advantage",
  title: "Physical Footprint Meets Deep Tech",
  lead: "Select a primary corridor below to view how VRV integrates field infrastructure with algorithmic operations.",
};

export const tradeCorridors: Corridor[] = [
  {
    id: "africa-latam",
    title: "Africa & LatAm",
    subtitle: "Critical Minerals & Agro Origination",
    tag: "Field-Level Provenance & EUDR Ready",
    heading: "Origin Automation & Resource Intelligence",
    description:
      "Direct upstream integration across Sub-Saharan Africa and Latin America. We deploy field sensor arrays, satellite telemetry, and mobile-first micro-aggregation rails to make commodities transparent from farm/mine gate to shipping berth.",
    bullets: [
      "Automated deforestation verification for EUDR and cross-border compliance.",
      "Direct-to-origin producer payouts via programmatic local liquidity rails.",
      "Traceable critical mineral asset tagging for clean-energy industrial procurement.",
    ],
    icon: "globe",
    accent: "#2F7D5A",
  },
  {
    id: "asia",
    title: "Southeast & South Asia",
    subtitle: "Processing, Refining & Aggregation",
    tag: "Manufacturing & Intermediate Supply",
    heading: "Factory Automation & Smarter Grading",
    description:
      "Transforming the high-friction processing landscape in Southeast and South Asia with computer vision quality inspection, automated warehouse logistics, and adaptive material batching.",
    bullets: [
      "Hyperspectral computer vision for automated natural rubber and cashew grading.",
      "Dynamic inventory pooling across bonded regional fulfillment warehouses.",
      "Real-time processing throughput monitoring and scrap minimization.",
    ],
    icon: "factory",
    accent: "#B87333",
  },
  {
    id: "singapore-western",
    title: "Singapore & Western Hubs",
    subtitle: "Trade Finance, Hedging & Settlement",
    tag: "Global Trade Finance & Risk Management",
    heading: "Algorithmic Settlement & Liquidity Hub",
    description:
      "Bridging the physical flow of goods with institutional capital rails in Singapore. We integrate high-speed FX hedging, paperless customs clearance, and dynamic working capital facilities.",
    bullets: [
      "Smart Bill of Lading (eBL) tokenization and settlement verification.",
      "Algorithmic dynamic pricing indices for opaque OTC commodity markets.",
      "Automated multi-currency treasury and export credit underwriting.",
    ],
    icon: "scale",
    accent: "#B8955B",
  },
];

export type FocusArea = {
  badge: string;
  title: string;
  description: string;
  icon: IconName;
  tone: "brand" | "ocean" | "gold";
};

export const focusIntro = {
  eyebrow: "Core Sectors",
  title: "Venture Focus Areas",
};

export const ventureFocus: FocusArea[] = [
  {
    badge: "AI Core",
    title: "Predictive Trade Ops",
    description:
      "Dynamic multimodal freight dispatch, spot-freight pricing engines, automated cargo demurrage prevention, and vessel tracking telemetry.",
    icon: "route",
    tone: "brand",
  },
  {
    badge: "DeepTech",
    title: "Geospatial Traceability",
    description:
      "Satellite yield projection, soil carbon capture verification, synthetic aperture radar (SAR) monitoring, and decentralized provenance trails.",
    icon: "globe",
    tone: "ocean",
  },
  {
    badge: "Fintech",
    title: "Cross-Border Liquidity",
    description:
      "Tokenized warehouse receipts, non-recourse digital factoring networks, and institutional multicurrency clearing for emerging market exporters.",
    icon: "scale",
    tone: "gold",
  },
  {
    badge: "CleanTech",
    title: "Circular Materials",
    description:
      "Low-emission metal reprocessing, devulcanized tire elastomer synthesis, and automated scrap commodity grading via edge computer vision.",
    icon: "recycle",
    tone: "brand",
  },
];

export const pitchIntro = {
  eyebrow: "Founders Portal",
  title: "Fast-Track Pitch Submission",
  lead: "Applications are screened directly by our investment committee. You will receive an initial status within 10 business days.",
};
