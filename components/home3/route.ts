/**
 * Shared copy + geometry for the /home3 maritime journey.
 *
 * The scroll experience is image-first with clean split stages (text one side,
 * image the other — never overlaid). A dotted route spine with a slow ship
 * threads the centre gutter between them. The hidden "VRV" is confined to the
 * FINAL zoom-out map (REVEAL): a wide, faint dotted route whose strokes only
 * subtly echo V · R · V behind four small image stations. No letters are drawn.
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
    sub: "Responsible sourcing at origin, built on ESG principles, traceability and long-term supply-chain integrity.",
    accent: COLORS.green,
    harbour: "Origin",
    keywords: ["ESG-led", "Traceability", "Responsible Sourcing"],
    img: { src: "/pictures/home3/sustainable-sourcing-rubber.jpg", alt: "Natural rubber sourcing at plantation origin" },
    imageSide: "right",
  },
  {
    id: "factory",
    eyebrow: "Processing",
    title: "High-End Factory & Resources",
    sub: "Integrated processing, industrial discipline and resource capability that transform sourcing into dependable supply.",
    accent: COLORS.copper,
    harbour: "Processing",
    keywords: ["Value-Add", "Resources", "Batch Flow"],
    img: { src: "/pictures/home3/high-end-factory-resources.jpg", alt: "Industrial processing facility for commodity supply chains" },
    imageSide: "left",
  },
  {
    id: "assurance",
    eyebrow: "Transparency · Traceability",
    title: "Transparent & Traceable Bookkeeping",
    tag: "Quality Assurance",
    sub: "Transparent records, traceable documentation and quality assurance create confidence across every stage of the supply chain.",
    accent: COLORS.gold,
    harbour: "Assurance",
    keywords: ["Transparency", "Documentation", "Verified Batch"],
    img: { src: "/pictures/home3/traceability-quality-assurance.jpg", alt: "Quality assurance and traceability documentation for commodity supply chains" },
    imageSide: "right",
  },
  {
    id: "shipment",
    eyebrow: "Trade · Delivery",
    title: "Shipment & End Delivery",
    sub: "Coordinated shipment, disciplined trade execution and reliable end delivery complete the supply-chain journey.",
    accent: COLORS.navy,
    harbour: "Delivery",
    keywords: ["Trade Execution", "Delivery", "Global Reach"],
    img: { src: "/pictures/home3/shipment-end-delivery.jpg", alt: "Cargo shipment and container logistics for global commodity delivery" },
    imageSide: "left",
  },
];

/**
 * Master route mural — one continuous dotted route that spans the whole stack of
 * stages (rendered with preserveAspectRatio="none" so it stretches to the tall
 * scroll area; non-scaling-stroke keeps dashes crisp). The ship travels this as
 * you scroll, so the stages read as close-ups of one composition. The overtly
 * "VRV" shape is NOT here — it lives only in REVEAL's zoom-out.
 */
export const MURAL = {
  viewBox: { w: 1000, h: 4000 },
  routeD: "M520,110 C780,620 240,960 500,1440 C770,1940 240,2280 500,2760 C780,3220 250,3560 520,3900",
  // faint hand-drawn-like contour marks for mural texture
  contours: [
    "M0,760 C260,700 760,860 1000,780",
    "M0,1680 C300,1760 720,1600 1000,1700",
    "M0,2620 C280,2560 740,2720 1000,2640",
    "M0,3500 C300,3560 700,3420 1000,3520",
  ],
  harbourY: [500, 1500, 2500, 3500],
};

export const REVEAL = {
  eyebrow: "One integrated chain",
  title: "End-to-End Supply Chain Integration",
  sub: "From sustainable sourcing to final delivery, VRV integrates supply chains with ESG responsibility, transparency, traceability and disciplined execution.",
  viewBox: { w: 1200, h: 640 },
  // Faint dotted strokes that only loosely echo V · R · V behind the stations.
  routes: [
    "M150,175 L300,470 L450,185",
    "M545,185 L545,470",
    "M545,185 C705,175 705,330 565,340",
    "M565,340 L700,470",
    "M880,185 L1000,470 L1115,175",
  ],
  thumbs: [
    { i: 0, x: 220, y: 225 },
    { i: 1, x: 600, y: 210 },
    { i: 2, x: 600, y: 452 },
    { i: 3, x: 980, y: 225 },
  ],
  shipAt: { x: 1100, y: 205, angle: -52 },
};
