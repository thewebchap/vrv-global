/**
 * Shared geometry + copy for /home4 — a self-contained, image-led maritime
 * supply-chain story (NOT reusing /home3 components or its route shapes).
 *
 * MURAL is one continuous dotted route spanning the whole stack of five stages;
 * a small ship eases along it harbour to harbour. REVEAL is a separate zoom-out
 * whose faint route resolves into a SLANTED, slightly italic, lop-sided V·R·V —
 * a maritime route first, a quiet brand structure second. No letters are drawn.
 */
export const COLORS = {
  navy: "#0B2F44",
  sea: "#2E6C86",
  seaLite: "#7FA9BC",
  cream: "#F6F3EC",
  green: "#2F7D5A",
  gold: "#B8955B",
  copper: "#B87333",
};

export const HERO = {
  eyebrow: "Source to destination",
  title: "Integrated Supply Chains from Source to Destination",
  sub: "VRV Global connects sourcing, processing, quality assurance, logistics and responsible growth through transparent and sustainable commodity supply chains.",
  image: "/pictures/Products - Page Banner 1.jpg",
  imageAlt: "Global commodity trade and supply-chain movement from source to destination",
};

export type Stage = {
  id: string;
  eyebrow: string;
  title: string;
  tag?: string;
  sub: string;
  accent: string;
  harbour: string;
  keywords: string[];
  img: { src: string; alt: string };
  imageSide: "left" | "right";
};

export const STAGES: Stage[] = [
  {
    id: "sourcing",
    eyebrow: "Origin",
    title: "Sustainable Sourcing",
    sub: "Responsible sourcing at origin, supported by traceability, transparency and long-term supply-chain discipline.",
    accent: COLORS.green,
    harbour: "Origin",
    keywords: ["Responsible Sourcing", "ESG", "Traceability Begins"],
    img: { src: "/pictures/home4/sustainable-sourcing-rubber.jpg", alt: "Natural rubber sourcing at plantation origin" },
    imageSide: "right",
  },
  {
    id: "processing",
    eyebrow: "Processing",
    title: "Processing & Resources",
    sub: "Integrated processing and industrial resource capability transform sourcing into dependable supply.",
    accent: COLORS.copper,
    harbour: "Processing",
    keywords: ["Value-Add", "Resources", "Industrial Discipline"],
    img: { src: "/pictures/Crepe machine.png", alt: "Rubber crepe processing machinery adding value to sourced material" },
    imageSide: "left",
  },
  {
    id: "quality",
    eyebrow: "Transparency · Traceability",
    title: "Transparency, Traceability & Quality",
    tag: "Quality Assurance",
    sub: "Traceable documentation, quality assurance and disciplined records strengthen trust across every stage of the supply chain.",
    accent: COLORS.gold,
    harbour: "Assurance",
    keywords: ["Transparency", "Traceability", "QA", "Verified"],
    img: { src: "/pictures/Traceability and Technology Page - Banner.jpg", alt: "Traceability and quality-assurance records across commodity supply chains" },
    imageSide: "right",
  },
  {
    id: "shipment",
    eyebrow: "Trade · Delivery",
    title: "Shipment & End Delivery",
    sub: "Coordinated logistics, disciplined trade execution and reliable delivery complete the movement from source to market.",
    accent: COLORS.navy,
    harbour: "Delivery",
    keywords: ["Shipment", "Trade Execution", "Destination"],
    img: { src: "/pictures/home4/shipment-end-delivery.jpg", alt: "Cargo shipment and container logistics for global commodity delivery" },
    imageSide: "left",
  },
  {
    id: "esg",
    eyebrow: "ESG · Community",
    title: "Responsible Growth",
    sub: "Sustainable supply chains create value not only for markets, but also for communities, partners and long-term development.",
    accent: COLORS.green,
    harbour: "Impact",
    keywords: ["Community", "ESG", "Long-Term Value"],
    img: { src: "/pictures/Sustainability Page - Banner.jpg", alt: "Responsible growth and sustainable practices supporting communities and partners" },
    imageSide: "right",
  },
];

// Continuous route mural spanning all five stages (stretched to the scroll
// height; ship travels it). Harbours are the route points nearest these y's.
export const MURAL = {
  viewBox: { w: 1000, h: 5000 },
  routeD:
    "M520,120 C790,660 230,1000 500,1480 C770,1980 230,2320 500,2820 C790,3320 240,3660 500,4160 C770,4560 250,4820 520,4890",
  contours: [
    "M0,760 C260,700 760,860 1000,780",
    "M0,1760 C300,1840 720,1680 1000,1780",
    "M0,2620 C280,2560 740,2720 1000,2640",
    "M0,3640 C300,3700 700,3560 1000,3660",
    "M0,4520 C260,4460 760,4600 1000,4520",
  ],
  harbourY: [500, 1500, 2500, 3500, 4500],
};

// Final zoom-out — a SLANTED / italic / lop-sided V·R·V. Coordinates are baked
// with a right-leaning tilt and uneven arms so it never reads as a rigid logo.
// Image stations + ship stay upright (not skewed) so photos aren't distorted.
export const REVEAL = {
  eyebrow: "One integrated chain",
  title: "End-to-End Supply Chain Integration",
  sub: "From sourcing to destination, VRV Global integrates sustainable commodity supply chains through transparency, traceability and disciplined execution.",
  viewBox: { w: 1240, h: 680 },
  routes: [
    "M210,190 L330,510 L560,150", // first V — leans right, taller right arm
    "M600,175 L618,505", // R spine (slight lean)
    "M600,175 C775,195 775,350 640,360", // R bowl (soft, rounded)
    "M640,360 L775,505", // R leg
    "M880,175 L1010,505 L1180,140", // final V — leans right
  ],
  thumbs: [
    { i: 0, x: 250, y: 250 },
    { i: 1, x: 605, y: 210 },
    { i: 2, x: 705, y: 430 },
    { i: 3, x: 955, y: 430 },
    { i: 4, x: 1095, y: 210 },
  ],
  shipAt: { x: 1188, y: 150, angle: -58 },
};
