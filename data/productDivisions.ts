/**
 * Product divisions — sourced from the VRV products page and polished.
 * `products` are the listed categories per division; where a category has a
 * full detail page (lib/products.ts) the UI links to it, otherwise it renders
 * as an informational card.
 */
import { products, type ProductCategory } from "@/lib/products";

export type ProductDivision = {
  title: string;
  slug: string;
  category: ProductCategory;
  description: string;
  products: string[];
};

export const productDivisions: ProductDivision[] = [
  {
    title: "Agro Commodities",
    slug: "agro-commodities",
    category: "agro",
    description:
      "VRV Global's Agro Commodities division provides a curated portfolio of natural rubber, biomass, nuts, pulses, spices and essential agricultural products sourced through trusted growers, certified plantations and responsible supply partners. The division focuses on consistent quality, traceability, responsible procurement and sustainable farming practices.",
    products: [
      "Natural Rubber",
      "Sustainable Natural Rubber",
      "Biomass",
      "Woodchips",
      "Wood Pulp",
      "Nuts",
      "Beans",
      "Pulses",
      "Spices",
    ],
  },
  {
    title: "Metals",
    slug: "metals",
    category: "metals",
    description:
      "VRV Global's Metals division supplies ferrous, non-ferrous and recycled metals through a trusted global sourcing network. The division supports industrial and manufacturing customers with quality-focused procurement, traceable supply relationships and responsible sourcing across multiple countries.",
    products: ["Ferrous Metals", "Non-Ferrous Metals", "Recycled Metals", "Copper", "Aluminum", "Nickel"],
  },
  {
    title: "Circular Economy Products",
    slug: "circular-economy-products",
    category: "circular",
    description:
      "VRV Global supports circular economy material flows through recycled metals, recovered industrial materials and responsible, reuse-focused commodity channels — keeping valuable materials in productive use and lowering embodied carbon.",
    products: ["PNS Scrap", "Bushelling Scrap", "Copper Scrap", "MDF", "Recovered Industrial Materials"],
  },
];

/** Example natural-rubber grades (editable). */
export const naturalRubberGrades = ["TSR", "RSS", "Latex", "Cup Lump", "Other Natural Rubber Grades"];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** If a division product has a detail page, return its slug; else null. */
export function detailSlugFor(productName: string): string | null {
  const direct = slugify(productName);
  if (products.some((p) => p.slug === direct)) return direct;
  // common aliases
  const alias: Record<string, string> = {
    aluminium: "aluminum",
  };
  if (alias[direct] && products.some((p) => p.slug === alias[direct])) return alias[direct];
  return null;
}
