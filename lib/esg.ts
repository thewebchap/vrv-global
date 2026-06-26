/**
 * Sustainability / ESG data — pillars, metrics, reports, supply-chain
 * framework, supplier code. Metrics are EDITABLE PLACEHOLDERS; replace
 * with verified figures and upload real PDFs before publishing.
 */
export type EsgPillar = {
  key: "environment" | "social" | "governance";
  title: string;
  intro: string;
  points: string[];
};

export const esgPillars: EsgPillar[] = [
  {
    key: "environment",
    title: "Environment",
    intro: "Reducing waste and embodied carbon across responsibly sourced and recycled material flows.",
    points: [
      "Reduce, reuse and recycle across operations",
      "Responsible sourcing and deforestation-free focus",
      "Lower-waste logistics and circular material flows",
      "Carbon and impact data readiness",
    ],
  },
  {
    key: "social",
    title: "Social",
    intro: "Engaging suppliers and communities and upholding worker welfare across the chain.",
    points: [
      "Supplier engagement and capacity building",
      "Community impact in sourcing regions",
      "Worker welfare and fair labour expectations",
      "Inclusive, long-term partnerships",
    ],
  },
  {
    key: "governance",
    title: "Governance",
    intro: "Operating with ethics, compliance and transparent, audit-ready reporting.",
    points: [
      "Ethics, conduct and anti-corruption policies",
      "KYC / AML and counterparty compliance",
      "Transparent ESG and financial reporting",
      "Risk management across the trade lifecycle",
    ],
  },
];

/** Headline ESG KPI cards — all EDITABLE placeholders. */
export const esgMetrics = [
  { value: "[Editable]", label: "Responsible sourcing partners", note: "Suppliers engaged in due diligence." },
  { value: "[Editable]", label: "Countries covered", note: "Sourcing & destination markets." },
  { value: "[Editable]", label: "Traceable supply chain programmes", note: "Active traceability initiatives." },
  { value: "[Editable]", label: "Recycled material sourced", note: "Volume of recovered materials traded." },
  { value: "[Editable]", label: "ESG initiatives", note: "Active environmental & social programmes." },
  { value: "[Editable]", label: "Supplier engagement programmes", note: "Capacity-building & audits." },
];

export const supplyChainFramework = [
  { step: "Source", body: "Responsible sourcing with supplier due diligence and risk screening." },
  { step: "Verify", body: "Supplier onboarding, KYC and origin verification." },
  { step: "Move", body: "Lower-impact logistics and shipment visibility." },
  { step: "Track", body: "Material traceability across processing and custody." },
  { step: "Report", body: "ESG data capture and audit-ready documentation." },
  { step: "Recycle / Reuse", body: "Circular flows that return materials to productive use." },
];

export type Report = { title: string; type: string; note: string };

/** Downloadable report cards — wire each to an uploaded PDF before launch. */
export const reports: Report[] = [
  { title: "ESG Report", type: "PDF", note: "[Upload ESG Report PDF]" },
  { title: "Sustainability Report", type: "PDF", note: "[Upload Sustainability Report PDF]" },
  { title: "Supplier Code of Conduct", type: "PDF", note: "[Upload Supplier Code of Conduct PDF]" },
  { title: "Corporate Governance Policy", type: "PDF", note: "[Upload Governance Policy PDF]" },
  { title: "Responsible Sourcing Policy", type: "PDF", note: "[Upload Responsible Sourcing Policy PDF]" },
  { title: "Circular Economy Brief", type: "PDF", note: "[Upload Circular Economy Brief PDF]" },
];

export const supplierCode = [
  "Legal compliance and business integrity",
  "Anti-bribery and anti-corruption",
  "Human rights and fair labour practices",
  "Health, safety and environmental standards",
  "No deforestation and responsible land use",
  "Traceability and documentation cooperation",
  "Audit access and continuous improvement",
];
