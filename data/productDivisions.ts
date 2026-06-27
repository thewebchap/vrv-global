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
      "VRV Global's Agro Commodities division provides a curated range of natural rubber, biomass, nuts, beans, pulses, spices and other essential agricultural products, sourced from trusted growers and certified plantations. The division focuses on consistent quality, traceability and sustainable farming practices from origin to market.",
    products: ["Natural Rubber", "Biomass", "Nuts, Beans, Pulses & Spices"],
  },
  {
    title: "Metals",
    slug: "metals",
    category: "metals",
    description:
      "VRV Global's Metals division offers a curated range of ferrous, non-ferrous and recycled metals sourced from trusted partners. The division supports industrial and manufacturing customers with quality-focused procurement, traceable supply relationships and responsible sourcing across multiple countries.",
    products: ["Ferrous Metals", "Non-Ferrous Metals"],
  },
  {
    title: "Circular Economy Products",
    slug: "circular-economy-products",
    category: "circular",
    description:
      "VRV Global builds a circular economy from recycled metals and recovered materials — an eco-friendly alternative to newly mined resources. Ferrous and non-ferrous scrap is collected, sorted and processed into traceable supply, keeping valuable materials in productive use and lowering embodied carbon.",
    products: ["Recycled Metals", "MDF"],
  },
];

/** Example natural-rubber grades (from VRV's product page; editable). */
export const naturalRubberGrades = ["SMR", "STR", "SIR", "SVR", "TSR", "RSS", "SBR 1502", "Cup Lump", "Crepes"];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** If a division product has a detail page, return its slug; else null. */
export function detailSlugFor(productName: string): string | null {
  const direct = slugify(productName);
  return products.some((p) => p.slug === direct) ? direct : null;
}
