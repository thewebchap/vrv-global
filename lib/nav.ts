import { products, categoryMeta } from "./products";

export type NavLink = { label: string; href: string; desc?: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const productNav: NavLink[] = products.map((p) => ({
  label: p.name,
  href: `/products/${p.slug}`,
  desc: p.short,
}));

export const productCategoryNav: NavLink[] = (
  ["agro", "metals", "circular"] as const
).map((c) => ({
  label: categoryMeta[c].title,
  href: `/products#${c}`,
  desc: categoryMeta[c].tagline,
}));

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About VRV", href: "/about", desc: "Singapore-headquartered commodity supply-chain platform." },
      { label: "Global Presence", href: "/about#global-presence", desc: "VRV Group presence, sales geography and purchase geography." },
      { label: "Leadership", href: "/about#leadership", desc: "Meet VRV's leadership team." },
      { label: "Awards", href: "/about#awards", desc: "Recognitions for VRV's growth and sustainability focus." },
      { label: "Our Journey", href: "/about#milestones", desc: "Key milestones in VRV's growth." },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Agro Commodities", href: "/products#agro-commodities", desc: "Natural rubber and agro-origin supply chains." },
      { label: "Industrial Metals", href: "/products#industrial-metals", desc: "Refined metals, alloys, recycled metals and hedging services." },
      { label: "Mining", href: "/products/mining", desc: "Industrial, precious and rare earth metals focus." },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    children: [
      { label: "Sustainability Overview", href: "/sustainability", desc: "VRV's 3C sustainability program across Company, Community and Commodities." },
      { label: "ESG Program", href: "/sustainability#esg-program", desc: "The 3C ESG program and sustainability policy overview." },
      { label: "Our Commitment", href: "/sustainability#our-commitment", desc: "Origin-to-end-user traceability and responsible sourcing." },
      { label: "VRV's Initiatives", href: "/sustainability#initiatives", desc: "Deforestation-free natural rubber and circular economy metals." },
      { label: "Sustainability Questions", href: "/sustainability#faq", desc: "Answers to common sustainability and ESG questions." },
    ],
  },
  {
    label: "Ventures",
    href: "/ventures",
    children: [
      { label: "Ventures Overview", href: "/ventures", desc: "Strategic growth initiatives around physical commodity infrastructure." },
      { label: "Trade Corridors", href: "/ventures/trade-corridors", desc: "Regional rails connecting origin, processing and global hubs." },
      { label: "Focus Verticals", href: "/ventures/focus-verticals", desc: "AI, deeptech, fintech and cleantech venture focus areas." },
      { label: "Pitch Venture", href: "/ventures/pitch", desc: "Founder submission portal for venture opportunities." },
    ],
  },
  {
    label: "Media",
    href: "/news",
    children: [
      { label: "Media Overview", href: "/news", desc: "Case studies and VRV updates." },
      { label: "Case Studies", href: "/case-studies", desc: "Selected examples and project stories." },
      { label: "News & Insights", href: "/news", desc: "Latest VRV updates and LinkedIn-backed insights." },
      { label: "Blog", href: "/blog", desc: "Long-form articles from approved VRV contributors." },
    ],
  },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Ethics & Governance", href: "/ethics-governance" },
      { label: "Technology & Traceability", href: "/technology" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Products",
    links: productCategoryNav.concat([{ label: "All products", href: "/products" }]),
  },
  {
    heading: "Sustainability",
    links: [
      { label: "ESG Commitment", href: "/sustainability" },
      { label: "Environmental", href: "/sustainability#environment" },
      { label: "Social", href: "/sustainability#social" },
      { label: "Governance & Ethics", href: "/sustainability#governance" },
      { label: "Reports & Metrics", href: "/sustainability#reports" },
    ],
  },
  {
    heading: "Ventures",
    links: [
      { label: "Ventures Overview", href: "/ventures" },
      { label: "Mining & Resource Ventures", href: "/ventures/mining" },
      { label: "Natural Rubber Processing", href: "/ventures/natural-rubber-processing" },
      { label: "Circular Economy Materials", href: "/ventures/circular-economy" },
      { label: "Media", href: "/news" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Ask VRV", href: "/ask-vrv" },
      { label: "Company Resources", href: "/about#resources" },
      { label: "Contact Routing", href: "/contact-routing" },
      { label: "AI Summary", href: "/ai-summary" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
