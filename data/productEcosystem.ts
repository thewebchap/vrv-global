/**
 * Home "Product ecosystem" cards — three category cards with business-relevant,
 * free-to-use imagery (local; Wikimedia Commons — see public/images/CREDITS.md).
 * Layout is image-top / content-bottom so text never overlaps the image.
 *
 * Homepage ecosystem shows three top-level segments only: Agro Products,
 * Industrial Metals and Mining. (Circular Economy is intentionally not a
 * homepage product-ecosystem segment; it lives under Ventures/Products.)
 */
export type ProductEcosystemCard = {
  category: "agro" | "metals" | "mining";
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageSource: string;
  imagePosition: string;
  href: string;
};

export const productEcosystem: ProductEcosystemCard[] = [
  {
    category: "agro",
    title: "Agro Products",
    description:
      "Natural rubber, cuplumps, block rubber / TSR and selected agro-origin supply chains supported by responsible sourcing and quality discipline.",
    tags: ["Natural Rubber", "Cuplumps", "Block Rubber / TSR", "Agro-Origin"],
    image: "/images/products/agro-commodities.jpg",
    imageAlt: "Worker collecting latex in a natural rubber plantation — responsible agro sourcing",
    imageCredit: "Manukrishnan80 (CC BY-SA 4.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Rubber_tapping_(15056).jpg",
    imagePosition: "center",
    href: "/products#agro",
  },
  {
    category: "metals",
    title: "Industrial Metals",
    description:
      "Copper, aluminium, zinc, lead, manganese alloys and other industrial metals connected through sourcing relationships, quality focus and disciplined trade execution.",
    tags: ["Copper", "Aluminium", "Zinc", "Lead", "Silico/Ferro-Manganese"],
    image: "/images/products/metals.jpg",
    imageAlt: "Stacked aluminium billets in a metals warehouse, ready for industrial markets",
    imageCredit: "Albasmelter (CC BY-SA 4.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Alba%27s_Products_-_Billets.jpg",
    imagePosition: "center",
    href: "/products#metals",
  },
  {
    category: "mining",
    title: "Mining",
    description:
      "Mining-linked industrial and precious metals opportunities focused on responsible resource access, long-term supply security and strategic upstream integration. [Confirm before publishing]",
    tags: ["Industrial Metals", "Precious Metals", "Copper & Gold", "Tanzania & Zambia [Confirm]"],
    image: "/images/hero/responsible-metals.jpg",
    imageAlt: "Industrial metals and ore representing mining-linked upstream resource ventures",
    imageCredit: "Wikimedia Commons (CC BY-SA)",
    imageSource: "https://commons.wikimedia.org/",
    imagePosition: "center",
    href: "/ventures/mining",
  },
];
