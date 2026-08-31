/**
 * Ventures — VRV Global's strategic growth initiatives beyond core trading.
 * ------------------------------------------------------------------
 * Source: VRV's published Ventures page (vrv.campaigntag.com/ventures), which
 * frames ventures as: "Beyond trading, VRV invests in ventures that strengthen
 * supply chains, unlock new markets, and build long-term value across agri
 * commodities and metals", combining capital with operational expertise — from
 * securing raw materials to driving circular supply-chain flows.
 *
 * The source supports three venture areas: Metal Ventures, Rubber Ventures and
 * Upcoming Ventures (sustainable materials / circular flows). These are
 * rewritten into polished copy. Strategic specifics not confirmed by the source
 * (e.g. country-level projects, statuses) are marked "[Confirm before
 * publishing]" and never presented as established fact.
 *
 * Images use the project's local commodity photography and the curated
 * royalty-free registry (lib/images.ts) so each venture shows a real subject.
 */
import type { IconName } from "@/components/ui/Icon";
import { images } from "@/lib/images";

export type Venture = {
  title: string;
  slug: string;
  segment: string;
  icon: IconName;
  geography: string[];
  focus: string[];
  status: string;
  /** Short card summary. */
  summary: string;
  /** Longer overview paragraph for the subpage. */
  overview: string;
  /** Strategic rationale bullets. */
  rationale: string[];
  /** Geography / market relevance. */
  marketRelevance: string;
  sustainabilityRelevance: string;
  /** Partnership opportunity statement. */
  partnership: string;
  image: string;
  imageAlt: string;
  /** Renders a "Confirm before publishing" advisory on the subpage. */
  confirm?: boolean;
};

const CONFIRM = "[Confirm status before publishing]";

export const ventures: Venture[] = [
  {
    title: "Mining & Resource Ventures",
    slug: "mining",
    segment: "Mining",
    icon: "spark",
    geography: ["Tanzania", "Zambia"],
    focus: ["Copper", "Gold", "Industrial metals", "Precious metals"],
    status: "Strategic Focus",
    summary:
      "Strategic upstream initiatives across industrial and precious metals, with a focus on responsible resource access and long-term supply security.",
    overview:
      "VRV Global's mining and resource ventures extend the company's metals capability upstream — moving from responsibly sourced trade toward origin-linked resource access. The focus is on industrial and precious metals across selected African resource geographies, with a disciplined approach to project evaluation, partnerships and compliance. The intent is to strengthen origin access, deepen supply security, and create long-term value across copper and gold opportunities.",
    rationale: [
      "Secure origin access and long-term supply security",
      "Move upstream from trade into resource-linked value",
      "Build responsible, compliance-led project partnerships",
      "Align with structural copper and gold demand",
    ],
    marketRelevance:
      "Tanzania and Zambia represent important African resource geographies for industrial and precious metals. VRV is building its presence with disciplined project evaluation and long-term supply chain integration. [Confirm final project details, licenses and project stage before publishing]",
    sustainabilityRelevance:
      "Responsible resource access, long-term supply security, and disciplined project development — with responsible development practices and local partnerships central to the approach.",
    partnership:
      "VRV welcomes strategic partners, investors and long-term counterparties interested in responsible upstream resource development and origin-linked supply security.",
    image: images.mining.src,
    imageAlt: "Responsible mining and resource development across industrial and precious metals",
    confirm: true,
  },
  {
    title: "Natural Rubber Processing",
    slug: "natural-rubber-processing",
    segment: "Agro Commodities",
    icon: "leaf",
    geography: ["Côte d'Ivoire"],
    focus: ["Natural rubber", "Processing", "Traceable supply chains"],
    status: "Under Development",
    summary:
      "Origin-linked rubber processing and supply chain integration to support traceable and sustainable natural rubber flows.",
    overview:
      "Building on VRV's Rubber Ventures, natural rubber processing extends origin relationships into value-added, origin-linked processing and supply chain integration. The aim is to support traceable, responsibly sourced natural rubber — strengthening quality consistency, deepening producer relationships, and building supply chains that meet evolving traceability expectations from origin to market.",
    rationale: [
      "Add value through origin-linked processing",
      "Strengthen traceability and quality consistency",
      "Deepen producer and supplier relationships",
      "Support deforestation-conscious, responsible rubber flows",
    ],
    marketRelevance:
      "Côte d'Ivoire is a significant natural rubber producing geography in West Africa, supporting origin-linked processing and factory-development opportunities. [Confirm project, factory and geography details before publishing]",
    sustainabilityRelevance:
      "Origin-linked processing and traceability-led natural rubber supply chain development, supporting responsible, deforestation-conscious sourcing.",
    partnership:
      "VRV is open to processing, offtake and partnership discussions with producers, processors and strategic partners across the natural rubber value chain.",
    image: "/pictures/Home page - Agro products.png",
    imageAlt: "Natural rubber processing and sustainable sourcing",
    confirm: true,
  },
  {
    title: "Circular Economy Materials",
    slug: "circular-economy",
    segment: "Circular Economy",
    icon: "recycle",
    geography: ["[Confirm geography]"],
    focus: ["Recycled metals", "Recovered materials", "Resource efficiency"],
    status: "Strategic Focus",
    summary:
      "Recovered, recycled, and lower-waste material flows that support resource efficiency and sustainable industrial supply chains.",
    overview:
      "Drawing on VRV's Upcoming Ventures direction — sustainable materials, value-added processing and circular supply chain solutions — circular economy materials focus on recovered and recycled flows that keep value in productive use. The emphasis is on recycled metals and recovered industrial materials that lower embodied carbon, improve resource efficiency, and support lower-waste industrial supply chains.",
    rationale: [
      "Keep materials in productive use through recovery and recycling",
      "Lower embodied carbon versus virgin extraction",
      "Support resource-efficient, lower-waste supply chains",
      "Align with structural, policy-backed circular demand",
    ],
    marketRelevance:
      "Recovered and recycled material flows are becoming structural across global industrial markets. Specific sourcing and destination geographies are [Confirm geography before publishing].",
    sustainabilityRelevance:
      "Recovered and recycled material flows that support lower-waste industrial supply chains and improved resource efficiency.",
    partnership:
      "VRV welcomes partners across recovery, recycling and industrial offtake to scale circular material flows responsibly.",
    image: "/pictures/Home page - Metals products.png",
    imageAlt: "Circular economy materials and recovered industrial products",
    confirm: true,
  },
  {
    title: "Regional Expansion",
    slug: "regional-expansion",
    segment: "Cross-segment",
    icon: "globe",
    geography: ["Africa", "Asia"],
    focus: ["Partnerships", "Sourcing networks", "Local market integration"],
    status: "Strategic Focus",
    summary:
      "Growth across Africa, Asia, and other strategic geographies through partnerships, sourcing networks, and local market integration.",
    overview:
      "Regional expansion supports VRV's objective to unlock new markets and strengthen origin access. Coordinated from Singapore, the company develops partnerships, sourcing networks and local market integration across Africa, Asia and other strategic geographies — building the relationships that underpin reliable, responsible commodity flows.",
    rationale: [
      "Unlock new markets and deepen origin access",
      "Build durable partnerships and sourcing networks",
      "Integrate into local markets responsibly",
      "Strengthen multi-region supply resilience",
    ],
    marketRelevance:
      "Africa and Asia are central to VRV's sourcing and growth strategy, coordinated from its Singapore headquarters. Specific regional initiatives are [Confirm before publishing].",
    sustainabilityRelevance:
      "Responsible sourcing relationships and local market integration that support resilient, accountable supply chains.",
    partnership:
      "VRV partners with regional producers, counterparties and strategic investors to expand responsibly into new geographies.",
    image: images.containersAerial.src,
    imageAlt: "Regional expansion across Africa and Asia — ports and commodity logistics",
    confirm: true,
  },
  {
    title: "Supply Chain Infrastructure",
    slug: "supply-chain-infrastructure",
    segment: "Cross-segment",
    icon: "route",
    geography: ["[Confirm geography]"],
    focus: ["Processing", "Logistics", "Quality control", "Trade-enabling infrastructure"],
    status: "Strategic Focus",
    summary:
      "Processing, logistics, quality control, and trade-enabling infrastructure that improve reliability across commodity flows.",
    overview:
      "Supply chain infrastructure ventures support VRV's move from securing raw materials to driving reliable, integrated flows. The focus is on processing coordination, logistics, quality control and trade-enabling infrastructure that improve reliability, traceability and value across agro commodities and metals supply chains.",
    rationale: [
      "Improve reliability and traceability across flows",
      "Coordinate processing and quality control",
      "Strengthen logistics and trade-enabling capability",
      "Integrate the chain from origin to destination",
    ],
    marketRelevance:
      "Infrastructure initiatives are evaluated where they strengthen commodity flows and supply reliability. Specific projects and locations are [Confirm before publishing].",
    sustainabilityRelevance:
      "Infrastructure that improves traceability, quality and efficiency — reducing waste and strengthening accountable supply chains.",
    partnership:
      "VRV engages infrastructure, logistics and processing partners to build trade-enabling capability across its supply chains.",
    image: images.supplyDiagram.src,
    imageAlt: "Supply chain infrastructure — processing, logistics and trade-enabling capability",
    confirm: true,
  },
];

export const getVenture = (slug: string) => ventures.find((v) => v.slug === slug);

export const ventureNav = ventures.map((v) => ({ label: v.title, href: `/ventures/${v.slug}` }));

/**
 * Featured ventures — specific, geography-led initiatives surfaced on the main
 * Ventures page. All project specifics are unconfirmed and clearly flagged.
 */
export type FeaturedVenture = {
  title: string;
  segment: string;
  geography: string;
  focus: string;
  status: string;
  description: string;
  sustainability: string;
  href: string;
};

export const featuredVentures: FeaturedVenture[] = [
  {
    title: "Tanzania Mining Venture",
    segment: "Mining",
    geography: "Tanzania",
    focus: "Copper and Gold",
    status: CONFIRM,
    description:
      "An initial mine-development focus in Tanzania, representing a strategic step toward upstream integration and origin-linked resource access.",
    sustainability: "Responsible development, compliance-led partnerships and long-term supply security.",
    href: "/ventures/mining",
  },
  {
    title: "Zambia Resource Focus",
    segment: "Mining",
    geography: "Zambia",
    focus: "Industrial and precious metals",
    status: CONFIRM,
    description:
      "Zambia as a strategic African resource geography for VRV's upstream and mining strategy, approached through disciplined evaluation and partnerships.",
    sustainability: "Disciplined project evaluation and responsible resource access.",
    href: "/ventures/mining",
  },
  {
    title: "Côte d'Ivoire Rubber Processing",
    segment: "Agro Commodities",
    geography: "Côte d'Ivoire",
    focus: "Natural rubber processing / factory development",
    status: CONFIRM,
    description:
      "Origin-linked natural rubber processing and factory-development opportunity in a significant West African producing geography.",
    sustainability: "Traceability-led, responsible natural rubber supply chain development.",
    href: "/ventures/natural-rubber-processing",
  },
  {
    title: "Circular Economy Materials",
    segment: "Circular Economy",
    geography: "[Confirm geography]",
    focus: "Recycled metals and recovered industrial materials",
    status: CONFIRM,
    description:
      "Recovered and recycled material flows supporting resource efficiency and lower-waste industrial supply chains.",
    sustainability: "Lower embodied carbon and resource-efficient circular flows.",
    href: "/ventures/circular-economy",
  },
];

/** Regional focus chips for the Ventures page. */
export const ventureRegions: { region: string; note: string }[] = [
  { region: "Tanzania", note: "Mining — copper & gold [Confirm]" },
  { region: "Zambia", note: "Resource focus — industrial & precious metals [Confirm]" },
  { region: "Côte d'Ivoire", note: "Natural rubber processing [Confirm]" },
  { region: "Singapore", note: "Headquarters & coordination" },
  { region: "Asia", note: "Sourcing & destination markets" },
  { region: "Africa", note: "Resource geographies & sourcing" },
];
