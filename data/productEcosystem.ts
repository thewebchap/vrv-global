/**
 * Home "Product ecosystem" cards — three category cards with business-relevant,
 * free-to-use imagery (local; Wikimedia Commons — see public/images/CREDITS.md).
 * Layout is image-top / content-bottom so text never overlaps the image.
 */
export type ProductEcosystemCard = {
  category: "agro" | "metals" | "circular";
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageSource: string;
  imagePosition: string;
};

export const productEcosystem: ProductEcosystemCard[] = [
  {
    category: "agro",
    title: "Agro Commodities",
    description:
      "Natural rubber, sustainable rubber, biomass, woodchips, wood pulp, nuts, pulses, beans and spices sourced through responsible supply relationships.",
    tags: ["Natural Rubber", "Biomass", "Woodchips", "Pulses", "Spices"],
    image: "/images/products/agro-commodities.jpg",
    imageAlt: "Worker collecting latex in a natural rubber plantation — sustainable agro sourcing",
    imageCredit: "Manukrishnan80 (CC BY-SA 4.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Rubber_tapping_(15056).jpg",
    imagePosition: "center",
  },
  {
    category: "metals",
    title: "Metals",
    description:
      "Ferrous, non-ferrous and industrial metals including copper, aluminium and nickel for manufacturing and global industrial demand.",
    tags: ["Copper", "Aluminium", "Nickel", "Ferrous", "Non-Ferrous"],
    image: "/images/products/metals.jpg",
    imageAlt: "Stacked aluminium billets in a metals warehouse, ready for industrial markets",
    imageCredit: "Albasmelter (CC BY-SA 4.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Alba%27s_Products_-_Billets.jpg",
    imagePosition: "center",
  },
  {
    category: "circular",
    title: "Circular Economy Products",
    description:
      "Recycled metals, scrap materials, MDF and recovered industrial products that support resource efficiency and lower-waste material flows.",
    tags: ["PNS Scrap", "Bushelling Scrap", "Copper Scrap", "MDF"],
    image: "/images/products/circular-economy.jpg",
    imageAlt: "Recovered scrap metal at a recycling yard representing circular material flows",
    imageCredit: "Digitura (CC0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Scrap_metal_yard.jpg",
    imagePosition: "center",
  },
];
