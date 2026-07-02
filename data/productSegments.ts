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

export type ProductSegment = {
  title: string;
  slug: string;
  icon: IconName;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  products: SegmentProduct[];
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
        image: "/images/hero/natural-rubber.jpg",
        imageAlt: "Rubber tapping and cuplump collection at a natural rubber plantation",
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
    tags: ["Copper", "Aluminium", "Zinc", "Lead", "Silico-Manganese", "Ferro-Manganese"],
    products: [
      {
        title: "Copper",
        slug: "copper",
        copy:
          "Copper is central to electrification, infrastructure, industrial manufacturing, and the energy transition. VRV Global supports copper commodity trade flows through sourcing relationships, quality focus, and disciplined commercial execution.",
        blocks: ["Industrial demand", "Electrification and infrastructure relevance", "Sourcing discipline", "Customer supply requirements"],
        cta: { label: "Enquire About Copper", href: CONTACT },
        image: "/images/commodities/metals/industrial-metals-warehouse.jpg",
        imageAlt: "Industrial metals stored in a warehouse for copper commodity trade",
      },
      {
        title: "Aluminium",
        slug: "aluminium",
        copy:
          "Aluminium supports lightweight manufacturing, construction, transport, packaging, and industrial applications. VRV Global works across aluminium supply relationships with a focus on reliable sourcing, consistent quality, and responsible trade practices.",
        blocks: ["Lightweight industrial applications", "Construction and transport demand", "Quality-focused sourcing", "Supply reliability"],
        cta: { label: "Enquire About Aluminium", href: CONTACT },
        image: "/images/products/metals.jpg",
        imageAlt: "Aluminium ingots and billets in an industrial warehouse",
      },
      {
        title: "Zinc",
        slug: "zinc",
        copy:
          "Zinc is widely used in galvanization, alloys, die-casting, and industrial production. VRV Global supports zinc-related opportunities where responsible sourcing, quality discipline, and customer demand align.",
        blocks: ["Galvanization", "Alloy applications", "Industrial use", "Supply and sourcing discipline"],
        cta: { label: "Enquire About Zinc", href: CONTACT },
        image: images.nickel.src,
        imageAlt: "Refined zinc and industrial metal stock",
      },
      {
        title: "Lead",
        slug: "lead",
        copy:
          "Lead continues to serve important industrial applications including batteries, specialty manufacturing, shielding, and selected alloy uses. VRV Global approaches lead-related trade with compliance-led sourcing, responsible handling, and disciplined counterparty management.",
        blocks: ["Battery industry applications", "Specialty industrial use", "Compliance-led sourcing", "Responsible handling"],
        cta: { label: "Enquire About Lead", href: CONTACT },
        image: "/images/products/ferrous-metals.jpg",
        imageAlt: "Industrial metals warehouse storing lead and battery metals",
      },
      {
        title: "Silico-Manganese",
        slug: "silico-manganese",
        copy:
          "Silico-manganese is an important alloy input used in steelmaking and metallurgical applications. VRV Global supports trade flows for manganese alloys through trusted supplier relationships, industrial customer engagement, and quality-led execution.",
        blocks: ["Steelmaking input", "Alloy use", "Supplier relationships", "Industrial customer demand"],
        cta: { label: "Enquire About Silico-Manganese", href: CONTACT },
        image: images.ferrousScrap.src,
        imageAlt: "Ferroalloy material used as a steelmaking input",
      },
      {
        title: "Ferro-Manganese",
        slug: "ferro-manganese",
        copy:
          "Ferro-manganese is widely used in steel production as a deoxidizing and alloying material. VRV Global supports ferro-manganese opportunities through market relationships, sourcing discipline, and industrial supply chain coordination.",
        blocks: ["Steel production", "Alloying and deoxidizing", "Industrial metal inputs", "Supply chain coordination"],
        cta: { label: "Enquire About Ferro-Manganese", href: CONTACT },
        image: images.supplyDiagram.src,
        imageAlt: "Industrial materials for steel production and alloying",
      },
      {
        title: "Other Industrial Metals",
        slug: "other-industrial-metals",
        copy:
          "Beyond core metals, VRV Global evaluates industrial metal opportunities where responsible sourcing, reliable supply, and customer demand create long-term value. This includes selected metals and alloys aligned with industrial transformation, infrastructure, and manufacturing needs.",
        blocks: ["Selected industrial metals", "Customer-led sourcing", "Market opportunity evaluation", "Responsible procurement"],
        cta: { label: "Discuss Industrial Metal Requirements", href: CONTACT },
        compact: true,
      },
    ],
  },
  {
    title: "Mining",
    slug: "mining",
    icon: "spark",
    description:
      "VRV Global's Mining segment represents the company's strategic move upstream into resource-linked opportunities across industrial and precious metals. With a focus on Tanzania and Zambia, and an initial mine development focus in Tanzania, the segment is designed to strengthen origin access, long-term supply security, and value creation across copper and gold opportunities.",
    image: images.mining.src,
    imageAlt: "Responsible mining and resource development site",
    tags: ["Industrial Metals", "Precious Metals", "Tanzania", "Zambia", "Copper", "Gold"],
    products: [
      {
        title: "Industrial Metals",
        slug: "mining-industrial-metals",
        copy:
          "VRV Global's mining strategy supports access to industrial metals that are essential to infrastructure, manufacturing, electrification, and long-term economic development. The segment is designed to strengthen origin access and supply security.",
        blocks: ["Upstream access", "Industrial demand", "Supply security", "Responsible development"],
        cta: { label: "Explore Mining Opportunities", href: CONTACT },
        image: images.mining.src,
        imageAlt: "Industrial metals mining and resource development",
      },
      {
        title: "Precious Metals",
        slug: "precious-metals",
        copy:
          "Precious metals form part of VRV Global's strategic resource focus where long-term market relevance, responsible development, and origin-linked opportunities align. VRV approaches these opportunities with discipline, compliance, and long-term partnership.",
        blocks: ["Gold and precious metals focus", "Responsible development", "Market relevance", "Long-term value creation"],
        cta: { label: "Discuss Precious Metals", href: CONTACT },
        imageAlt: "Precious metals strategic resource focus",
      },
      {
        title: "Tanzania & Zambia",
        slug: "tanzania-zambia",
        copy:
          "Tanzania and Zambia represent important African resource geographies for VRV Global's upstream and mining strategy. The company is focused on building its presence through responsible partnerships, disciplined project evaluation, and long-term supply chain integration.",
        blocks: ["African resource geographies", "Responsible partnerships", "Disciplined project evaluation", "Long-term supply chain integration"],
        cta: { label: "View Regional Focus", href: "#footprint" },
        imageAlt: "Tanzania and Zambia resource geographies",
        note: "Confirm final project details before publishing",
      },
      {
        title: "First Mine: Tanzania",
        slug: "first-mine-tanzania",
        copy:
          "VRV Global's first mine development focus is Tanzania, representing a strategic step toward upstream integration and origin-linked resource access. This section should be finalized with approved project details before publication.",
        blocks: ["Upstream integration", "Origin-linked resource access", "Strategic first development", "Approved disclosure pending"],
        cta: { label: "Request Project Information", href: CONTACT },
        imageAlt: "First mine development focus in Tanzania",
        note: "Confirm mine details, licenses, project stage, and approved disclosure before publishing",
      },
      {
        title: "Copper & Gold Focus",
        slug: "copper-gold-focus",
        copy:
          "Copper and gold are central to VRV Global's mining focus, reflecting demand from electrification, infrastructure, industrial growth, and precious metals markets. VRV's approach is to build responsible, long-term resource access linked to broader supply chain value creation.",
        blocks: ["Electrification and infrastructure demand", "Industrial growth", "Precious metals markets", "Long-term resource access"],
        cta: { label: "Explore Copper & Gold Focus", href: CONTACT },
        image: "/images/commodities/metals/industrial-metals-warehouse.jpg",
        imageAlt: "Industrial metals warehouse representing VRV's copper and gold mining focus",
        note: "Confirm before publishing",
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

/** Compact anchor-navigation model for the sticky products sub-nav. */
export const productAnchors: { label: string; slug: string; lead?: boolean }[] = [
  { label: "Agro Commodities", slug: "agro-commodities", lead: true },
  { label: "Natural Rubber — Cuplumps", slug: "natural-rubber-cuplumps" },
  { label: "Block Rubber / TSR", slug: "block-rubber-tsr" },
  { label: "Industrial Metals", slug: "industrial-metals", lead: true },
  { label: "Copper", slug: "copper" },
  { label: "Aluminium", slug: "aluminium" },
  { label: "Zinc", slug: "zinc" },
  { label: "Lead", slug: "lead" },
  { label: "Silico-Manganese", slug: "silico-manganese" },
  { label: "Ferro-Manganese", slug: "ferro-manganese" },
  { label: "Mining", slug: "mining", lead: true },
  { label: "Tanzania & Zambia", slug: "tanzania-zambia" },
  { label: "Copper & Gold", slug: "copper-gold-focus" },
];
