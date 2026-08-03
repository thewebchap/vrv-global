/**
 * Home rolling-hero slides — one strong strategic theme each, drawn from the
 * VRV product/sustainability story. Images are local, business-relevant and
 * free-to-use (Wikimedia Commons; see public/images/CREDITS.md for attribution).
 * Swap any `image` for licensed VRV photography later without touching the
 * carousel.
 */
export type HeroCta = { label: string; href: string };

export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageSource: string;
  imagePosition: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Sustainable global trade",
    title: "Building Sustainable Supply Chains for Global Trade",
    description:
      "VRV Global connects agro commodities, metals and circular economy products through responsible sourcing, traceability and long-term commercial relationships.",
    primaryCta: { label: "Explore Sustainability", href: "/sustainability" },
    secondaryCta: { label: "Investor Relations", href: "/investors" },
    image: "/images/hero/sustainable-global-trade.jpg",
    imageAlt: "Container ship and stacked containers at a busy global trade port",
    imageCredit: "KimonBerlin (CC BY-SA 2.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Container_port_(12848714813).jpg",
    imagePosition: "center",
  },
  {
    eyebrow: "Agro commodities",
    title: "Traceable Natural Rubber, From Origin to Market",
    description:
      "VRV supports responsible natural rubber flows through supplier relationships, quality focus and traceability-led sourcing across key producing regions.",
    primaryCta: { label: "Explore Agro Commodities", href: "/products#agro" },
    secondaryCta: { label: "View Commodity Network", href: "/about#global-presence" },
    image: "/images/hero/natural-rubber.jpg",
    imageAlt: "Latex collected from tapped trees in a natural rubber plantation",
    imageCredit: "Manukrishnan80 (CC BY-SA 4.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Rubber_tapping_(65872).jpg",
    imagePosition: "center",
  },
  {
    eyebrow: "Metals and minerals",
    title: "Responsible Metals for Industrial Growth",
    description:
      "VRV connects copper, aluminium, nickel, ferrous and non-ferrous metals, and recycled metals with industrial and manufacturing demand across global markets.",
    primaryCta: { label: "Explore Metals", href: "/products#metals" },
    secondaryCta: { label: "Contact Product Team", href: "/contact" },
    image: "/images/commodities/metals/industrial-metals-warehouse.jpg",
    imageAlt: "Industrial metals stored in a warehouse, ready for commodity shipment",
    imageCredit: "Albasmelter (CC BY-SA 4.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Alba%27s_Products_-_Billets.jpg",
    imagePosition: "center",
  },
  {
    eyebrow: "Circular economy",
    title: "Circular Material Flows for a Lower-Waste Future",
    description:
      "Through recycled metals, scrap materials, MDF and recovered industrial products, VRV supports resource efficiency and circular economy growth.",
    primaryCta: { label: "View Circular Economy Products", href: "/products#circular" },
    secondaryCta: { label: "Explore Sustainability", href: "/sustainability" },
    image: "/images/hero/circular-economy.jpg",
    imageAlt: "Industrial scrap-metal recycling facility processing recovered materials",
    imageCredit: "Quintin Soloviev (CC BY 4.0)",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Scrap_metal_recycling_facility_in_Longview,_Washington%27s_industrial_zone.jpg",
    imagePosition: "center",
  },
  {
    eyebrow: "Singapore headquarters",
    title: "Coordinated from Singapore. Connected to Global Markets.",
    description:
      "Headquartered in Singapore, VRV manages purchase and sales geographies across Asia, Africa, Europe, the Middle East and the Americas.",
    primaryCta: { label: "Explore Global Footprint", href: "/about#global-presence" },
    secondaryCta: { label: "About VRV", href: "/about" },
    image: "/images/hero/singapore-global-network.jpg",
    imageAlt: "Aerial view of Singapore's container terminal and global shipping lanes",
    imageCredit: "Noel Reynolds (CC BY 2.0)",
    imageSource: "https://commons.wikimedia.org/wiki/File:Keppel_Container_Terminal,_Singapore_-_20120525.jpg",
    imagePosition: "center",
  },
];
