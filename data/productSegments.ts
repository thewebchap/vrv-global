/**
 * Product segments & subsections — VRV Global's three business segments.
 * ------------------------------------------------------------------
 * Three segments: Agro Commodities (natural rubber), Industrial Metals, and
 * Mining (strategic upstream). Each segment expands into dedicated product
 * subsections with anchor slugs, premium copy, feature blocks, a product image
 * and an enquiry CTA. Copy reuses VRV's product-page language where available
 * and is polished into investor-ready, SEO-aware corporate prose. Unconfirmed
 * mining claims carry a "note" marker to flag before publishing.
 *
 * Images use the project's local commodity photography and the curated
 * royalty-free registry (lib/images.ts). Subsections without a confirmed image
 * (forthcoming mining items) render the branded <Media> fallback panel.
 */
import type { IconName } from "@/components/ui/Icon";
import { images } from "@/lib/images";

export type SegmentProduct = {
  title: string;
  slug: string;
  copy: string;
  blocks: string[];
  cta: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  note?: string;
  /** Render as a compact full-width card (no paired image). */
  compact?: boolean;
};

/** A grouped product category shown as a compact card (Metals / Mining). */
export type ProductCategory = {
  title: string;
  copy: string;
  /** Optional highlighted detail line (e.g. "4 mining licenses — Zambia"). */
  detail?: string;
  /** Products in this category; `href` set only when a detail page exists. */
  products?: { name: string; href?: string }[];
};

export type ProductSegment = {
  title: string;
  slug: string;
  icon: IconName;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  products: SegmentProduct[];
  /** When present, the segment renders grouped category cards instead of the
   *  alternating product subsections. */
  categories?: ProductCategory[];
};

const CONTACT = "/contact";

export const productSegments: ProductSegment[] = [
  {
    title: "Agro Commodities",
    slug: "agro-commodities",
    icon: "leaf",
    description:
      "VRV Global's Agro Commodities segment focuses on natural rubber supply chains, including cuplumps and block rubber / TSR. Through origin relationships, supplier engagement, and disciplined quality control, VRV supports reliable rubber flows from producing regions to global customers.",
    image: "/images/products/agro-commodities.jpg",
    imageAlt: "Latex collected from tapped trees in a natural rubber plantation",
    tags: ["Natural Rubber", "Cuplumps", "Block Rubber", "TSR"],
    products: [
      {
        title: "Natural Rubber — Cuplumps",
        slug: "natural-rubber-cuplumps",
        copy:
          "Cuplumps are a primary form of natural rubber collected at origin before further processing. VRV Global works with sourcing networks and supply partners to support reliable procurement, quality consistency, and responsible movement of natural rubber cuplumps from producing regions to global markets.",
        blocks: ["Origin sourcing", "Quality checks", "Supplier engagement", "Traceability readiness", "Movement to processing or customer markets"],
        cta: { label: "Enquire About Natural Rubber", href: CONTACT },
        image: "/pictures/Products Page - Natural Rubber Cuplumps.png",
        imageAlt: "Natural rubber cuplumps collected from rubber plantation",
      },
      {
        title: "Block Rubber / TSR",
        slug: "block-rubber-tsr",
        copy:
          "Block Rubber, including Technically Specified Rubber (TSR) grades, supports customers requiring standardized rubber inputs for industrial and manufacturing use. VRV Global focuses on specification discipline, dependable supply, and traceable sourcing relationships across natural rubber markets.",
        blocks: ["TSR / block rubber grades", "Industrial use", "Specification control", "Origin-to-market supply", "Customer-led delivery"],
        cta: { label: "Discuss Block Rubber Supply", href: CONTACT },
        image: "/images/products/agro-commodities.jpg",
        imageAlt: "Natural rubber sourcing supporting block rubber and TSR grades",
      },
    ],
  },
  {
    title: "Industrial Metals",
    slug: "industrial-metals",
    icon: "cube",
    description:
      "VRV Global's Industrial Metals segment connects global sourcing networks with industrial and manufacturing demand across copper, aluminium, zinc, lead, manganese alloys, and other industrial metals. The segment is built around supply reliability, responsible sourcing, and disciplined trade execution.",
    image: "/images/products/metals.jpg",
    imageAlt: "Stacked aluminium billets in an industrial metals warehouse",
    tags: ["Refined Metals", "Circular Economy Metals", "Ferro & Noble Alloys", "Hedging Services"],
    products: [],
    categories: [
      {
        title: "Refined Metals",
        copy: "Refined base metals supplied for industrial manufacturing, infrastructure, energy systems and global trade flows.",
        products: [
          { name: "Copper", href: "/products/copper" },
          { name: "Aluminium", href: "/products/aluminium" },
          { name: "Zinc", href: "/products/zinc" },
          { name: "Lead", href: "/products/lead" },
          { name: "Tin" },
          { name: "Nickel" },
        ],
      },
      {
        title: "Circular Economy Metals",
        copy: "Recycled and scrap metal flows supporting circular material use, responsible sourcing and efficient industrial supply chains.",
        products: [
          { name: "Recycled Metals" },
          { name: "Scrap Metals" },
        ],
      },
      {
        title: "Ferro & Noble Alloys",
        copy: "Ferro and noble alloy materials serving steel, foundry, specialty alloy and industrial production requirements.",
        products: [
          { name: "Ferro Nickel" },
          { name: "Ferro Manganese", href: "/products/silico-ferro-manganese" },
          { name: "Silico Manganese", href: "/products/silico-ferro-manganese" },
        ],
      },
      {
        title: "Hedging Services",
        copy: "End-to-end hedging solutions designed to help customers manage commodity price exposure and improve trade planning discipline.",
        products: [
          { name: "End-to-End Hedging Solutions" },
        ],
      },
    ],
  },
  {
    title: "Mining Division",
    slug: "mining",
    icon: "spark",
    description:
      "VRV Global's Mining Division represents the company's strategic move upstream into resource-linked opportunities across industrial and precious metals in Zambia and Tanzania. The division is designed to strengthen origin access, long-term supply security, and value creation across copper and precious metals opportunities.",
    image: images.mining.src,
    imageAlt: "Responsible mining and resource development site",
    tags: ["Copper Mining", "Precious Metals Mining", "Zambia", "Tanzania"],
    products: [],
    categories: [
      {
        title: "Copper Mining",
        detail: "4 mining licenses — Zambia",
        copy: "Copper mining opportunities in Zambia linked to long-term resource access, responsible development and industrial metals supply security.",
      },
      {
        title: "Precious Metals Mining",
        detail: "2 operating mines — Tanzania",
        copy: "Precious metals mining operations in Tanzania focused on responsible resource development and upstream-linked growth.",
      },
    ],
  },
];

/** Example natural-rubber grades (from VRV's product page; editable). */
export const naturalRubberGrades = ["SMR", "STR", "SIR", "SVR", "TSR", "RSS", "SBR 1502", "Cup Lump", "Crepes"];

/**
 * Supporting agro lines retained as future-expansion notes rather than
 * top-level segments (de-emphasised per the re-segmentation).
 */
export const supportingAgroLines = ["Biomass", "Woodchips", "Wood Pulp", "Nuts, Beans, Pulses & Spices"];

/** Compact anchor-navigation model for the sticky products sub-nav — three
 *  top-level segment tabs only. */
export const productAnchors: { label: string; slug: string; lead?: boolean }[] = [
  { label: "Agro Commodities", slug: "agro-commodities", lead: true },
  { label: "Industrial Metals", slug: "industrial-metals", lead: true },
  { label: "Mining", slug: "mining", lead: true },
];
