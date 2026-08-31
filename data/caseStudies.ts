/**
 * Case studies — local content store (no database).
 *
 * On Vercel the filesystem is read-only at runtime, so new case studies created
 * via /admin/case-studies must be EXPORTED (copy the generated object or
 * download the JSON) and committed into this file. See the admin tool.
 *
 * The two entries below are ILLUSTRATIVE placeholders — replace with approved
 * real project details before publication.
 */
export type CaseStudyCategory =
  | "agro"
  | "rubber"
  | "metals"
  | "mining"
  | "sustainability"
  | "traceability"
  | "general";

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: CaseStudyCategory;
  date: string;
  status: "Draft" | "Published";
  featured?: boolean;
  thumbnail?: string;
  content: {
    problem?: string;
    vrvRole?: string;
    process?: string;
    traceability?: string;
    outcome?: string;
    sustainability?: string;
  };
  images?: string[];
  files?: { name: string; url: string }[];
};

/** Human-readable labels for the category enum. */
export const caseStudyCategoryLabels: Record<CaseStudyCategory, string> = {
  agro: "Agro",
  rubber: "Rubber",
  metals: "Metals",
  mining: "Mining",
  sustainability: "Sustainability",
  traceability: "Traceability",
  general: "General",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-001",
    slug: "natural-rubber-traceability",
    title: "Natural Rubber Traceability",
    summary:
      "Origin-level rubber sourcing, documentation and traceability-ready supply-chain movement.",
    category: "rubber",
    date: "2026-06-28",
    status: "Published",
    featured: true,
    thumbnail: "/pictures/Products Page - Natural Rubber Cuplumps.png",
    content: {
      problem:
        "Natural rubber supply chains require better origin visibility, documentation and quality discipline.",
      vrvRole:
        "VRV Global supports origin relationships, supplier engagement and traceability-ready documentation across rubber flows.",
      process:
        "The supply-chain process connects origin sourcing, aggregation, processing, quality checks, documentation and delivery.",
      traceability:
        "Traceability-ready records can include supplier details, origin data, quality documentation and shipment references.",
      outcome:
        "This illustrative case study should be replaced with approved real project details before publication.",
      sustainability:
        "The approach supports responsible sourcing and improved visibility across natural rubber supply chains.",
    },
    images: ["/pictures/Products Page - Natural Rubber Cuplumps.png"],
    files: [],
  },
  {
    id: "cs-002",
    slug: "metals-documentation-flow",
    title: "Metals Documentation Flow",
    summary:
      "Industrial metals movement supported by quality checks, shipment records and documentation discipline.",
    category: "metals",
    date: "2026-06-28",
    status: "Published",
    featured: true,
    thumbnail: "/pictures/Home page - Metals products.png",
    content: {
      problem:
        "Industrial metals supply chains depend on specification clarity, documentation and reliable movement.",
      vrvRole:
        "VRV Global supports sourcing relationships, trade documentation and customer-led supply execution.",
      process:
        "The flow connects supplier engagement, quality checks, documentation, logistics and delivery coordination.",
      traceability:
        "Documentation can support shipment visibility, product references and audit-ready records where data is available.",
      outcome:
        "This illustrative case study should be replaced with approved real project details before publication.",
      sustainability:
        "The process supports responsible sourcing and improved supply-chain accountability.",
    },
    images: ["/pictures/Home page - Metals products.png"],
    files: [],
  },
];

/** Sort helper: featured first, then newest by date. */
function byFeaturedThenDate(a: CaseStudy, b: CaseStudy): number {
  if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
  return b.date.localeCompare(a.date);
}

/** All published case studies (featured first, newest first). */
export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.status === "Published").sort(byFeaturedThenDate);
}

/** Up to `limit` featured-first published case studies for the homepage. */
export function getFeaturedCaseStudies(limit = 2): CaseStudy[] {
  return getPublishedCaseStudies().slice(0, limit);
}

/** A single published case study by slug (used for static detail pages). */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug && c.status === "Published");
}

/** Topic-default thumbnail when a case study has no image of its own. */
export function caseStudyImage(category: CaseStudyCategory, thumbnail?: string): string {
  if (thumbnail) return thumbnail;
  switch (category) {
    case "agro":
    case "rubber":
      return "/pictures/Home page - Agro products.png";
    case "metals":
    case "mining":
      return "/pictures/Home page - Metals products.png";
    case "sustainability":
      return "/pictures/Sustainability Page - Banner.jpg";
    case "traceability":
      return "/pictures/Products - Page Banner 1.jpg";
    default:
      return "/pictures/Products - Page Banner 1.jpg";
  }
}
