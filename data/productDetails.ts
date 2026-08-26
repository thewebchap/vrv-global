/**
 * Sub-product detail pages — VRV Global.
 * ------------------------------------------------------------------
 * Eight dedicated commodity pages across the three segments (Agro Commodities,
 * Industrial Metals, Mining). Slugs are lowercase, hyphenated and stable.
 * Copy reuses the main Products-page language where available and is polished
 * into investor-/customer-ready prose; no certifications, customer names,
 * volumes, grades or ownership claims are invented. Unconfirmed mining details
 * are flagged with `confirm: true` and rendered with a "Confirm before
 * publishing" advisory.
 *
 * Images use the project's local commodity photography and the curated
 * royalty-free registry (lib/images.ts) so every hero shows a real commodity.
 */
import { images } from "@/lib/images";

export type ProductSegmentName = "Agro Commodities" | "Industrial Metals" | "Mining";

export type ProductDetail = {
  title: string;
  slug: string;
  segment: ProductSegmentName;
  heroImage: string;
  imageAlt: string;
  imagePosition?: string;
  summary: string;
  overview: string;
  applications: string[];
  sourcingApproach: string[];
  /** Short professional note on quality / specification discipline. */
  quality: string;
  sustainability: string;
  /** Mining-style unconfirmed claim → renders a confirm-before-publishing advisory. */
  confirm?: boolean;
};

export const productDetails: ProductDetail[] = [
  /* ───────────────────────── AGRO COMMODITIES ───────────────────────── */
  {
    title: "Natural Rubber — Cuplumps",
    slug: "natural-rubber",
    segment: "Agro Commodities",
    heroImage: "/pictures/Products Page - Natural Rubber Cuplumps.png",
    imageAlt: "Natural rubber cuplumps collected from rubber plantation",
    imagePosition: "center",
    summary:
      "VRV Global supports natural rubber supply chains through origin relationships, responsible sourcing, and disciplined quality control across cuplump procurement and movement.",
    overview:
      "Cuplumps are a primary form of natural rubber collected at origin before further processing. VRV Global works with sourcing networks and supply partners to support reliable procurement, quality consistency, and responsible movement of natural rubber from producing regions to global markets.",
    applications: [
      "Natural rubber processing",
      "Industrial rubber products",
      "Tyres and auto components",
      "Manufacturing supply chains",
    ],
    sourcingApproach: [
      "Origin-linked procurement",
      "Supplier engagement",
      "Quality consistency",
      "Traceability readiness",
    ],
    quality:
      "Cuplump supply is managed with consistency checks at aggregation and pre-processing stages, supported by documentation discipline and clear specification dialogue with customers. Exact parameters are confirmed against each buyer's requirement and destination market.",
    sustainability:
      "VRV Global approaches natural rubber with a focus on responsible sourcing, origin visibility, supplier relationships, and future-ready traceability — supporting deforestation-conscious, accountable rubber flows.",
  },
  {
    title: "Block Rubber / TSR",
    slug: "block-rubber",
    segment: "Agro Commodities",
    heroImage: "/images/products/agro-commodities.jpg",
    imageAlt: "Block rubber and TSR material used in industrial rubber supply chains",
    imagePosition: "center",
    summary:
      "Block Rubber, including TSR grades, supports industrial and manufacturing customers requiring standardized natural rubber inputs.",
    overview:
      "Block Rubber, including Technically Specified Rubber (TSR) grades, supports customers requiring standardized rubber inputs for industrial and manufacturing use. VRV Global focuses on specification discipline, dependable supply, and traceable sourcing relationships across natural rubber markets.",
    applications: [
      "Tyre manufacturing",
      "Industrial rubber products",
      "Automotive components",
      "Technical rubber goods",
    ],
    sourcingApproach: [
      "Specification-led sourcing",
      "Quality and grade discipline",
      "Reliable supplier relationships",
      "Origin-to-market delivery",
    ],
    quality:
      "Block rubber is supplied against agreed technical specifications, with grade discipline and inspection documentation supporting dependable, repeatable industrial supply. Confirmed grades and parameters are agreed per contract.",
    sustainability:
      "VRV supports responsible natural rubber flows through supplier engagement, sourcing discipline, and traceability-led supply relationships across producing regions.",
  },

  /* ───────────────────────── INDUSTRIAL METALS ──────────────────────── */
  {
    title: "Copper",
    slug: "copper",
    segment: "Industrial Metals",
    heroImage: "/images/commodities/metals/industrial-metals-warehouse.jpg",
    imageAlt: "Industrial metals stored in a warehouse for copper commodity trade",
    imagePosition: "center",
    summary:
      "Copper is central to electrification, infrastructure, manufacturing, and energy transition demand.",
    overview:
      "Copper remains one of the most important industrial metals, supporting electrification, infrastructure, construction, manufacturing, and energy transition-linked demand. VRV Global supports copper-related trade flows through sourcing relationships, quality focus, and disciplined commercial execution.",
    applications: [
      "Electrical infrastructure",
      "Energy transition",
      "Construction",
      "Industrial manufacturing",
      "Automotive and electronics",
    ],
    sourcingApproach: [
      "Supplier relationships",
      "Quality-focused procurement",
      "Customer-led supply",
      "Responsible sourcing discipline",
    ],
    quality:
      "Copper trade is supported by quality-focused procurement and inspection discipline, with specifications and assay expectations confirmed against each customer's requirement and destination market.",
    sustainability:
      "Copper plays an important role in electrification and infrastructure. VRV approaches copper trade with a focus on supply reliability, responsible sourcing, and long-term customer value.",
  },
  {
    title: "Aluminium",
    slug: "aluminium",
    segment: "Industrial Metals",
    heroImage: "/images/products/metals.jpg",
    imageAlt: "Aluminium ingots and billets, industrial aluminium commodity material",
    imagePosition: "center",
    summary:
      "Aluminium supports lightweight manufacturing, transport, construction, packaging, and industrial applications.",
    overview:
      "Aluminium is widely used across lightweight manufacturing, transport, construction, packaging, and industrial applications. VRV Global works across aluminium supply relationships with a focus on reliable sourcing, consistent quality, and responsible trade practices.",
    applications: [
      "Transport and mobility",
      "Construction",
      "Packaging",
      "Industrial manufacturing",
      "Lightweight materials",
    ],
    sourcingApproach: [
      "Quality-led sourcing",
      "Reliable supply partnerships",
      "Industrial customer alignment",
      "Responsible procurement",
    ],
    quality:
      "Aluminium supply is managed through quality-led sourcing and consistent specification dialogue, with form, grade and tolerances confirmed against customer and destination requirements.",
    sustainability:
      "Aluminium supports lightweight and resource-efficient industrial applications. VRV focuses on supply relationships that support reliability, quality, and responsible sourcing.",
  },
  {
    title: "Lead",
    slug: "lead",
    segment: "Industrial Metals",
    heroImage: "/images/products/ferrous-metals.jpg",
    imageAlt: "Lead ingots in industrial metals storage",
    imagePosition: "center",
    summary:
      "Lead serves important industrial applications including batteries, specialty manufacturing, shielding, and selected alloy uses.",
    overview:
      "Lead continues to serve important industrial applications including batteries, specialty manufacturing, shielding, and selected alloy uses. VRV Global approaches lead-related trade with compliance-led sourcing, responsible handling, and disciplined counterparty management.",
    applications: [
      "Battery industry",
      "Specialty manufacturing",
      "Shielding applications",
      "Selected alloy uses",
    ],
    sourcingApproach: [
      "Compliance-led sourcing",
      "Responsible handling",
      "Counterparty diligence",
      "Industrial supply coordination",
    ],
    quality:
      "Lead is handled with particular attention to compliance and responsible handling, supported by counterparty diligence and clear specification agreement against each industrial customer's requirement.",
    sustainability:
      "VRV handles lead-related opportunities with particular attention to compliance, responsible sourcing, and disciplined trade practices.",
  },
  {
    title: "Zinc",
    slug: "zinc",
    segment: "Industrial Metals",
    heroImage: images.nickel.src,
    imageAlt: "Zinc ingots and refined industrial zinc commodity material",
    imagePosition: "center",
    summary:
      "Zinc is widely used in galvanization, alloys, die-casting, and industrial production.",
    overview:
      "Zinc is widely used in galvanization, alloys, die-casting, and industrial production. VRV Global supports zinc-related opportunities where responsible sourcing, quality discipline, and customer demand align.",
    applications: [
      "Galvanization",
      "Alloy production",
      "Die-casting",
      "Industrial manufacturing",
    ],
    sourcingApproach: [
      "Industrial sourcing relationships",
      "Quality discipline",
      "Customer-led supply",
      "Responsible procurement",
    ],
    quality:
      "Zinc supply is supported by quality discipline and customer-led specification dialogue, with grade and form confirmed against the relevant industrial application and destination market.",
    sustainability:
      "VRV approaches zinc trade through responsible sourcing, customer alignment, and disciplined supply chain execution.",
  },
  {
    title: "Silico-Manganese & Ferro-Manganese",
    slug: "silico-ferro-manganese",
    segment: "Industrial Metals",
    heroImage: images.ferrousScrap.src,
    imageAlt: "Manganese alloy material used as a steelmaking input",
    imagePosition: "center",
    summary:
      "Silico-manganese and ferro-manganese are important alloy inputs used in steelmaking and metallurgical applications.",
    overview:
      "Manganese alloys such as silico-manganese and ferro-manganese are essential inputs for steelmaking and metallurgical applications. VRV Global supports trade flows for alloy materials through trusted supplier relationships, industrial customer engagement, and quality-led execution.",
    applications: [
      "Steelmaking",
      "Metallurgical applications",
      "Alloy production",
      "Industrial manufacturing",
    ],
    sourcingApproach: [
      "Trusted supplier relationships",
      "Industrial customer engagement",
      "Quality-led execution",
      "Market-linked procurement",
    ],
    quality:
      "Manganese alloy supply is managed with quality-led execution and specification discipline, with grade and sizing confirmed against steelmaking and metallurgical customer requirements.",
    sustainability:
      "VRV supports manganese alloy trade with a focus on responsible sourcing, supply reliability, and industrial customer requirements.",
  },

  /* ───────────────────────────── MINING ─────────────────────────────── */
  {
    title: "Industrial & Precious Metals",
    slug: "industrial-precious-metals",
    segment: "Mining",
    heroImage: images.mining.src,
    imageAlt: "Industrial and precious metals mining and responsible resource development",
    imagePosition: "center",
    summary:
      "VRV Global's Mining segment focuses on industrial and precious metals, with Tanzania and Zambia as key resource geographies.",
    overview:
      "VRV Global's Mining segment represents the company's strategic move upstream into resource-linked opportunities across industrial and precious metals. With a focus on Tanzania and Zambia, and an initial mine development focus in Tanzania, the segment is designed to strengthen origin access, long-term supply security, and value creation across copper and gold opportunities.",
    applications: [
      "Industrial metals",
      "Precious metals",
      "Copper resource development",
      "Gold opportunities",
      "Upstream supply security",
    ],
    sourcingApproach: [
      "Resource-linked partnerships",
      "Responsible project evaluation",
      "Origin access",
      "Long-term supply chain integration",
    ],
    quality:
      "Mining-related development is approached with disciplined project evaluation, responsible development practices, and compliance-led partnerships. Project specifics are confirmed before any public disclosure.",
    sustainability:
      "Mining content emphasises responsible development, compliance, local partnerships, and long-term value creation across copper and gold opportunities.",
    confirm: true,
  },
];

export const getProductDetail = (slug: string) => productDetails.find((p) => p.slug === slug);

/**
 * Related products from the same segment; falls back to Industrial Metals
 * when a segment has only one page (e.g. Mining → industrial metals).
 */
export function getRelatedProducts(slug: string, limit = 4): ProductDetail[] {
  const current = getProductDetail(slug);
  if (!current) return [];
  const sameSegment = productDetails.filter((p) => p.slug !== slug && p.segment === current.segment);
  if (sameSegment.length >= 2) return sameSegment.slice(0, limit);
  const fillers = productDetails.filter(
    (p) => p.slug !== slug && p.segment === "Industrial Metals" && !sameSegment.includes(p),
  );
  return [...sameSegment, ...fillers].slice(0, limit);
}

export const segmentOrder: ProductSegmentName[] = ["Agro Commodities", "Industrial Metals", "Mining"];

/** Detail pages grouped by segment (drives the header mega-menu). */
export const productDetailsBySegment: { segment: ProductSegmentName; items: ProductDetail[] }[] =
  segmentOrder.map((segment) => ({
    segment,
    items: productDetails.filter((p) => p.segment === segment),
  }));
