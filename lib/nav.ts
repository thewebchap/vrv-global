import { products, categoryMeta } from "./products";

export type NavLink = { label: string; href: string; desc?: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
  /** Renders the wide, grouped products mega menu. */
  mega?: "products";
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
      { label: "Company Overview", href: "/about", desc: "Mission, vision, values and story" },
      { label: "Our Journey", href: "/about#milestones", desc: "Milestones since 2012" },
      { label: "Leadership", href: "/about#leadership", desc: "The team behind VRV Global" },
      { label: "Ethics & Governance", href: "/about#ethics-governance", desc: "Conduct, policies and compliance" },
      { label: "Careers", href: "/careers", desc: "Build purpose-led global trade" },
    ],
  },
  { label: "Products", href: "/products", mega: "products" },
  {
    label: "Sustainability",
    href: "/sustainability",
    children: [
      { label: "ESG Commitment", href: "/sustainability", desc: "Our sustainability strategy" },
      { label: "Environmental Responsibility", href: "/sustainability#environment", desc: "Reduce, reuse, recycle" },
      { label: "Social Responsibility", href: "/sustainability#social", desc: "Suppliers & communities" },
      { label: "Governance & Ethics", href: "/sustainability#governance", desc: "Conduct & compliance" },
      { label: "Reports & Metrics", href: "/sustainability#reports", desc: "ESG reports & data" },
    ],
  },
  {
    label: "Ventures",
    href: "/ventures",
    children: [
      { label: "Mining & Resource Ventures", href: "/ventures/mining", desc: "Upstream industrial & precious metals" },
      { label: "Natural Rubber Processing", href: "/ventures/natural-rubber-processing", desc: "Origin-linked rubber processing" },
      { label: "Circular Economy Materials", href: "/ventures/circular-economy", desc: "Recovered & recycled flows" },
      { label: "Regional Expansion", href: "/ventures/regional-expansion", desc: "Africa, Asia & strategic geographies" },
      { label: "Supply Chain Infrastructure", href: "/ventures/supply-chain-infrastructure", desc: "Processing, logistics & quality" },
    ],
  },
  { label: "News & Insights", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
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
      { label: "News & Insights", href: "/news" },
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
