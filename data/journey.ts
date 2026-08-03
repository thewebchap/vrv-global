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
    title: "Global Distribution Partnerships",
    description:
      "VRV entered into a strategic partnerships with Natural Rubber Producers for global distribution, marking its full transition from tyre distribution into the Natural Rubber Supply chain Industry.",
  },
  {
    year: "2022",
    phase: "Scale and Integration",
    title: "Supply Chain Integration",
    description:
      "VRV entered strategic partnerships for expansion into African markets, including supply and distribution arrangements across Western Africa and the Middle East.",
  },
  {
    year: "2023",
    phase: "Scale and Integration",
    title: "Fast growing SME Award",
    description:
      "2023 has been a year of global recognition and dedication to the hardwork of Team VRV. VRV was awarded the Fast growing SME 100 award and Best Sustainable Business Brand award for the Sustainability tech integration initiative used in VRV’s business.",
  },
  {
    year: "2024",
    phase: "Scale and Integration",
    title: "Deforestation free Natural Rubber",
    description:
      "VRV exported a fully EUDR compliant Deforestation free Natural Rubber to its customers using a home grown technology solution behind it. VRV to date has converted ~20% of its Natural Rubber Supply Chain into De-forestation free – a long term step towards Sustainable Natural Rubber goal.",
  },
  {
    year: "2025",
    phase: "Scale and Integration",
    title: "Agro processing & Mining",
    description:
      "VRV acquired Large scale mining licenses for Copper and Critical minerals in Africa integrating its presence in the Industrial and Critical Minerals Space. Similarly VRV also acquired stake in a production licence for processing Natural Rubber in West Africa.",
  },
];
