/**
 * Headline company stats — used on the homepage globe section and the About
 * page growth-metrics band. These are approved figures (not "0+" placeholders).
 * Update here to change everywhere they appear.
 *
 * `description` is a short one-line supporting note shown only in the premium
 * About-page band (AboutGrowthMetrics); the compact StatCards ignore it.
 */
export type CompanyStat = { value: string; label: string; description: string };

export const companyStats: CompanyStat[] = [
  {
    value: "2012",
    label: "Established",
    description: "Founded in Singapore",
  },
  {
    value: "15+",
    label: "Countries Served",
    description: "Across purchase and sales geographies",
  },
  {
    value: "200k+",
    label: "Tonnes Handled",
    description: "Annual commodity movement scale",
  },
  {
    value: "20%",
    label: "Sustainable Volume",
    description: "Current sustainable supply contribution",
  },
];
