/** News & Insights — categories restricted to relevant, credible themes. */
export const newsCategories = [
  "Sustainable Supply Chains",
  "Global Commodity Trends",
  "Agro Commodities",
  "Metal Recycling",
  "Metals & Industrial Transformation",
  "Circular Economy",
  "ESG & Governance",
];

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
};

/** Sample editorial cards — professional, industry-relevant titles only. */
export const articles: Article[] = [
  {
    slug: "traceability-reshaping-supply-chains",
    title: "How Traceability Is Reshaping Commodity Supply Chains",
    category: "Sustainable Supply Chains",
    excerpt: "Origin-to-destination visibility is moving from a compliance checkbox to a commercial differentiator and a driver of investor confidence.",
    readTime: "5 min read",
    date: "2026-05-12",
  },
  {
    slug: "sustainable-natural-rubber",
    title: "Building a Responsible Natural Rubber Supply Chain",
    category: "Agro Commodities",
    excerpt: "Why managing smallholder engagement, traceability and quality together is the path to deforestation-free, ESG-aligned rubber.",
    readTime: "6 min read",
    date: "2026-04-28",
  },
  {
    slug: "metals-energy-transition",
    title: "Copper, Aluminium and Nickel: Metals of the Energy Transition",
    category: "Metals & Industrial Transformation",
    excerpt: "How electrification is redrawing demand and why responsible sourcing of industrial metals is becoming non-negotiable.",
    readTime: "5 min read",
    date: "2026-04-10",
  },
  {
    slug: "metal-recycling-low-waste-growth",
    title: "Metal Recycling and Low-Waste Industrial Growth",
    category: "Metal Recycling",
    excerpt: "Recycled copper and steel cut embodied carbon dramatically — and are becoming structural, policy-backed markets.",
    readTime: "4 min read",
    date: "2026-03-22",
  },
  {
    slug: "circular-economy-industrial-materials",
    title: "The Circular Economy in Industrial Materials",
    category: "Circular Economy",
    excerpt: "From scrap to engineered panels: keeping materials in productive use lowers waste and creates durable value.",
    readTime: "5 min read",
    date: "2026-03-05",
  },
  {
    slug: "esg-reporting-commodity-supply-chains",
    title: "ESG Reporting for Commodity Supply Chains",
    category: "ESG & Governance",
    excerpt: "What credible ESG disclosure looks like for a trade-driven business, and why it matters to capital markets.",
    readTime: "6 min read",
    date: "2026-02-18",
  },
  {
    slug: "global-commodity-trends-2026",
    title: "Global Commodity Trends Shaping Sustainable Trade",
    category: "Global Commodity Trends",
    excerpt: "Demand shifts, resilience and the changing geography of responsible commodity supply chains.",
    readTime: "5 min read",
    date: "2026-01-30",
  },
  {
    slug: "investing-in-sustainable-supply-chains",
    title: "Investor Opportunities in Sustainable Supply Chains",
    category: "Sustainable Supply Chains",
    excerpt: "Why sustainability-led, traceable supply chains are emerging as a distinct, investable category.",
    readTime: "5 min read",
    date: "2026-01-15",
  },

  /* ── Topic clusters — rubber ─────────────────────────────────────────── */
  {
    slug: "cuplumps-natural-rubber-supply-chains",
    title: "What Are Cuplumps in Natural Rubber Supply Chains?",
    category: "Agro Commodities",
    excerpt: "Cuplumps are an early-stage form of natural rubber collected at origin — and a key point for quality consistency and traceability.",
    readTime: "5 min read",
    date: "2026-06-10",
  },
  {
    slug: "tsr-block-rubber-explained",
    title: "TSR and Block Rubber: Standardized Natural Rubber for Industry",
    category: "Agro Commodities",
    excerpt: "How Technically Specified Rubber grades give tyre and industrial manufacturers consistent, dependable natural rubber inputs.",
    readTime: "5 min read",
    date: "2026-06-05",
  },
  {
    slug: "traceability-in-natural-rubber",
    title: "Why Traceability Matters in Natural Rubber",
    category: "Sustainable Supply Chains",
    excerpt: "From cuplump to block rubber, origin visibility is becoming essential to responsible, deforestation-conscious rubber supply.",
    readTime: "5 min read",
    date: "2026-05-30",
  },

  /* ── Topic clusters — metals ─────────────────────────────────────────── */
  {
    slug: "aluminium-lightweight-manufacturing",
    title: "Aluminium in Lightweight Manufacturing",
    category: "Metals & Industrial Transformation",
    excerpt: "Why aluminium's strength-to-weight ratio and recyclability make it central to transport, construction and packaging.",
    readTime: "4 min read",
    date: "2026-05-22",
  },
  {
    slug: "zinc-and-galvanization",
    title: "Zinc and the Economics of Galvanization",
    category: "Metals & Industrial Transformation",
    excerpt: "How zinc protects steel from corrosion, and where galvanization and alloy demand are heading.",
    readTime: "4 min read",
    date: "2026-05-14",
  },
  {
    slug: "lead-industrial-applications",
    title: "Lead in Industrial Applications",
    category: "Metals & Industrial Transformation",
    excerpt: "From batteries to shielding, where lead remains essential — and why compliance-led sourcing matters.",
    readTime: "4 min read",
    date: "2026-05-06",
  },
  {
    slug: "silico-ferro-manganese-steelmaking",
    title: "Silico-Manganese and Ferro-Manganese in Steelmaking",
    category: "Metals & Industrial Transformation",
    excerpt: "The manganese alloys that act as essential deoxidizing and alloying inputs in steel production.",
    readTime: "5 min read",
    date: "2026-04-28",
  },

  /* ── Topic clusters — sustainability ─────────────────────────────────── */
  {
    slug: "responsible-sourcing-commodity-supply-chains",
    title: "Responsible Sourcing in Commodity Supply Chains",
    category: "Sustainable Supply Chains",
    excerpt: "What credible responsible sourcing looks like across agro commodities and industrial metals — and why buyers increasingly require it.",
    readTime: "5 min read",
    date: "2026-04-18",
  },

  /* ── Topic clusters — ventures ───────────────────────────────────────── */
  {
    slug: "why-commodity-companies-move-upstream",
    title: "Why Commodity Companies Move Upstream",
    category: "Global Commodity Trends",
    excerpt: "The strategic logic behind integrating into resource-linked ventures for supply security and long-term value.",
    readTime: "5 min read",
    date: "2026-04-04",
  },
  {
    slug: "mining-ventures-tanzania-zambia",
    title: "Mining Ventures in Tanzania and Zambia",
    category: "Global Commodity Trends",
    excerpt: "Why these African resource geographies are central to an upstream strategy in industrial and precious metals.",
    readTime: "5 min read",
    date: "2026-03-26",
  },
  {
    slug: "copper-and-gold-strategic-resources",
    title: "Copper and Gold as Strategic Resource Opportunities",
    category: "Metals & Industrial Transformation",
    excerpt: "How electrification and precious-metals demand shape a copper and gold resource focus.",
    readTime: "5 min read",
    date: "2026-03-12",
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
