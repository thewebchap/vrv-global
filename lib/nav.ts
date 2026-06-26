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
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", desc: "Mission, vision, values and story" },
      { label: "Leadership", href: "/about#leadership", desc: "The team behind VRV Global" },
      { label: "Milestones", href: "/about#milestones", desc: "Our journey since 2012" },
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
  { label: "Technology & Traceability", href: "/technology" },
  { label: "Investor Relations", href: "/investors" },
  { label: "News & Insights", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Milestones", href: "/about#milestones" },
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
    heading: "Investors & More",
    links: [
      { label: "Investor Relations", href: "/investors" },
      { label: "Corporate Governance", href: "/investors#governance" },
      { label: "News & Insights", href: "/news" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
