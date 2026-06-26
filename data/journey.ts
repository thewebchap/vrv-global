/**
 * VRV Global journey / milestones — sourced from the company's About page and
 * polished. Order-book figures and milestones are as provided; do not invent
 * additional financial figures.
 *
 * Grouped into three strategic phases (Foundation → Diversification →
 * Scale and Integration) for the About-page "Growth Ledger" chapters.
 */
export type JourneyPhase = "Foundation" | "Diversification" | "Scale and Integration";

export type JourneyMilestone = {
  year: string;
  phase: JourneyPhase;
  title: string;
  description: string;
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2012",
    phase: "Foundation",
    title: "The Beginning",
    description:
      "VRV commenced business operations with trading of tyres and auto components. Based out of Singapore, VRV leveraged the region's global business-hub status and expanded trading operations into multiple Asian geographies.",
  },
  {
    year: "2015",
    phase: "Foundation",
    title: "Early Expansion",
    description:
      "VRV expanded trading operations into India and China and expanded sourcing operations in India and Indonesia, focusing primarily on agro commodities and metals.",
  },
  {
    year: "2016",
    phase: "Diversification",
    title: "Building the Minerals Desk",
    description:
      "VRV commenced trading in copper, aluminium and steel metals, leading to the creation of a dedicated minerals and metals trading desk.",
  },
  {
    year: "2018",
    phase: "Diversification",
    title: "Exclusive Distribution Agreements",
    description:
      "VRV signed exclusive distribution agreements with leading auto-tyre and mining-tyre manufacturers, focusing on the agro industry and the mining sector.",
  },
  {
    year: "2020",
    phase: "Scale and Integration",
    title: "$100M Order Book",
    description:
      "VRV crossed a $100 million order book and entered into a strategic partnership with rubber producers for global distribution, marking its transition from tyre distribution into natural rubber supply.",
  },
  {
    year: "2022",
    phase: "Scale and Integration",
    title: "Supply Chain Integration",
    description:
      "VRV entered strategic partnerships for expansion into African markets, including supply and distribution arrangements across Western Africa and the Middle East.",
  },
  {
    year: "2025",
    phase: "Scale and Integration",
    title: "$350M Order Book",
    description:
      "VRV crossed a $350 million order book and accelerated upstream integration in natural rubber and metals, including factory development in Côte d'Ivoire and mining concessions for copper and industrial metals in Africa.",
  },
];
