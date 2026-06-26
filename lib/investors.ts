/**
 * Investor Relations data — investment highlights, KPI cards, governance
 * topics and downloadable documents. Metrics are EDITABLE placeholders.
 * NOTE on listing language: any public-market ambition is described as
 * "future listing readiness / capital markets roadmap" unless official
 * wording is provided.
 */
export const investmentHighlights = [
  { title: "Global supply chain presence", body: "A multi-region sourcing and destination network spanning Africa, Asia, the Middle East and beyond." },
  { title: "Diversified product portfolio", body: "Agro commodities, industrial metals and circular economy products across distinct demand cycles." },
  { title: "Sustainability-led positioning", body: "Responsible sourcing, traceability and ESG as core differentiators, not add-ons." },
  { title: "Circular economy exposure", body: "Recycled metals and lower-waste materials aligned to structural decarbonisation demand." },
  { title: "Traceability & governance focus", body: "Material visibility, compliance and audit-ready records that build counterparty trust." },
  { title: "Long-term commodity demand", body: "Exposure to electrification, food, packaging and infrastructure megatrends." },
  { title: "Supply chain resilience", body: "Integration across sourcing, finance, quality and logistics protects reliability." },
  { title: "Capital markets readiness", body: "Strengthening governance, reporting and disclosure toward future listing readiness." },
];

/** Investor KPI cards — all EDITABLE placeholders pending verified data. */
export const investorKpis = [
  { value: "2012", label: "Year established", note: "Operating across market cycles." },
  { value: "[Editable]", label: "Markets served", note: "Sourcing & destination countries." },
  { value: "[Editable]", label: "Product lines", note: "Across agro, metals & circular." },
  { value: "[Editable]", label: "Annual trade volume", note: "Figure pending verification." },
];

export const marketOpportunity = [
  { title: "Electrification & metals", body: "Copper, aluminium and nickel demand scales with EVs, grids and renewables." },
  { title: "Sustainable materials", body: "Buyers increasingly require traceable, responsibly sourced and recycled inputs." },
  { title: "Circular economy", body: "Recycling and lower-waste flows are becoming structural, policy-backed markets." },
  { title: "Food & agro security", body: "Resilient, transparent agro supply chains command a durable premium." },
];

export const growthStrategy = [
  "Deepen responsible-sourcing relationships at origin",
  "Scale circular economy and recycled-material volumes",
  "Invest in traceability technology and ESG data capability",
  "Strengthen governance and disclosure toward capital-markets readiness",
  "Expand long-term offtake and strategic partnerships",
];

export const governanceTopics = [
  { title: "Board oversight", body: "Clear board responsibility for strategy, risk and ESG accountability." },
  { title: "Ethical business conduct", body: "A code of conduct governing how we trade and treat counterparties." },
  { title: "Anti-bribery & anti-corruption", body: "Zero-tolerance policies with due diligence and controls." },
  { title: "Supplier compliance", body: "Supplier Code of Conduct, KYC and screening across the chain." },
  { title: "ESG accountability", body: "Defined ownership of environmental and social commitments." },
  { title: "Risk management", body: "Counterparty, market, operational and compliance risk frameworks." },
  { title: "Data protection", body: "Responsible handling of commercial and personal data." },
  { title: "Financial transparency", body: "Disciplined reporting and audit-ready records." },
  { title: "Stakeholder engagement", body: "Structured engagement with investors, partners and communities." },
  { title: "Whistleblower mechanism", body: "[Editable: confidential reporting channel — to confirm.]" },
];

export type InvestorDoc = { title: string; note: string };

/** Investor download cards — wire each to an uploaded PDF before launch. */
export const investorDocs: InvestorDoc[] = [
  { title: "Investor Presentation", note: "[Replace with approved investor presentation]" },
  { title: "ESG Report", note: "[Upload ESG Report PDF]" },
  { title: "Corporate Governance Policy", note: "[Upload Governance Policy PDF]" },
  { title: "Company Profile", note: "[Upload Company Profile PDF]" },
  { title: "Sustainability Report", note: "[Upload Sustainability Report PDF]" },
];
