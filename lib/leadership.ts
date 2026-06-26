/**
 * Leadership & milestones data.
 * All names/titles/dates are EDITABLE PLACEHOLDERS — replace with approved
 * bios and verified milestones before publishing.
 */
export type Leader = { name: string; role: string; bio: string };

export const leaders: Leader[] = [
  {
    name: "[Editable: Founder / Chairman]",
    role: "Founder & Chairman",
    bio: "Two decades of cross-border commodity trade and supply-chain leadership, founding VRV Global in 2012 to build integrated, responsible supply chains. [Replace with approved bio.]",
  },
  {
    name: "[Editable: Chief Executive Officer]",
    role: "Chief Executive Officer",
    bio: "Leads group strategy, growth and capital-markets readiness across agro commodities, metals and the circular economy. [Replace with approved bio.]",
  },
  {
    name: "[Editable: Chief Operating Officer]",
    role: "Chief Operating Officer",
    bio: "Oversees sourcing, trading operations, quality control and logistics across origin and destination markets. [Replace with approved bio.]",
  },
  {
    name: "[Editable: Head of Sustainability & ESG]",
    role: "Head of Sustainability & ESG",
    bio: "Owns the ESG framework, responsible-sourcing programmes and the material-traceability roadmap. [Replace with approved bio.]",
  },
  {
    name: "[Editable: Chief Financial Officer]",
    role: "Chief Financial Officer",
    bio: "Leads finance, trade finance, risk management and investor relations. [Replace with approved bio.]",
  },
  {
    name: "[Editable: Head of Trading — Metals]",
    role: "Head of Trading, Metals & Circular Economy",
    bio: "Directs metals and recycled-materials desks and refiner/mill relationships. [Replace with approved bio.]",
  },
];

/** Journey milestones now live in data/journey.ts (used by AutoMovingGrowthLedger). */

/** VRV values / pillars. */
export const values = [
  { title: "Customer Partnerships", body: "Putting customer insight first, building long-term relationships that go beyond a single transaction." },
  { title: "Trusted Integrity", body: "Maintaining integrity at every step — the basis of our reputation as a reliable counterparty." },
  { title: "Sustainable Growth", body: "Growing responsibly, balancing commercial performance with environmental and social outcomes." },
  { title: "Sustainable & Traceable Sourcing", body: "Sourcing responsibly with visibility across origin, movement, processing and delivery." },
  { title: "Technology-Enabled Efficiency", body: "Using technology to make integrated supply chains faster, leaner and more reliable." },
  { title: "Shared Growth with Stakeholders", body: "Creating value that is shared with suppliers, customers, communities, partners and investors." },
  { title: "Climate-Conscious Sourcing", body: "Reducing impact through lower-waste, lower-carbon and deforestation-free sourcing choices." },
  { title: "Technology-Driven Transparency", body: "Capturing data and documentation that make our supply chains transparent and audit-ready." },
  { title: "Long-Term Stakeholder Value", body: "Building a resilient, future-ready business that compounds value for the long term." },
];
