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
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
