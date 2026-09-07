/**
 * Geometry + copy for /home6 — a cinematic scroll voyage (self-contained; not
 * importing /home5 or /home4 components).
 *
 * ROUTE_D is one continuous, deliberately hand-plotted / asymmetric route the
 * ship sails. Its overall silhouette loosely forms a slanted, lop-sided V·R·V —
 * but the camera flies close to one station at a time and only the TRAVELLED
 * dotted trail is revealed (masked to the ship), so it reads as a maritime
 * commodity route first; the V·R·V only resolves on the final zoom-out.
 */
export const CANVAS = { w: 1400, h: 900 };

// One continuous ship route. Every segment is a soft maritime CURVE (no straight
// letter strokes), so while the camera is zoomed in each leg reads as a natural
// sea lane — yet the MACRO silhouette still resolves into a capital V · R · V on
// the final zoom-out. Never shown ahead of the ship (only the travelled dotted
// trail is revealed).
export const ROUTE_D =
  "M160,320 Q250,520 340,620 Q455,500 545,300 C590,405 595,545 620,620 Q626,470 645,300 C845,312 843,492 660,494 Q753,562 830,626 C892,512 918,412 965,300 Q1048,505 1135,626 Q1232,498 1320,300";

// Stations sit on SMOOTH parts of the route (not on the sharp letter vertices)
// and spread widely across the canvas — origin (upper-left) → processing
// (mid-right) → assurance (centre) → shipment (upper-right) → impact
// (lower-right) — so the journey reads as a map, not as letters being drawn.
export const STATION_F = [0.08, 0.36, 0.52, 0.74, 0.92];

export const COLORS = {
  navy: "#0B2F44",
  sea: "#2E6C86",
  cream: "#F6F3EC",
  green: "#2F7D5A",
  gold: "#B8955B",
  copper: "#B87333",
};

export type IconKind = "tree" | "factory" | "cert" | "ship" | "esg";

export type Stage = {
  id: string;
  eyebrow: string;
  title: string;
  sub: string;
  harbour: string;
  accent: string;
  icon: IconKind;
  img: { src: string; alt: string };
};

export const STAGES: Stage[] = [
  {
    id: "source",
    eyebrow: "Source",
    title: "Sustainable Sourcing",
    sub: "Responsible origin sourcing across agro commodities, natural rubber and strategic materials.",
    harbour: "Origin",
    accent: COLORS.green,
    icon: "tree",
    img: { src: "/pictures/Home page - hero banner/1.png", alt: "Responsible sourcing at agro-commodity and natural-rubber origins" },
  },
  {
    id: "process",
    eyebrow: "Process",
    title: "Processing & Resources",
    sub: "Integrated processing and resource capability turn origin supply into dependable commodity flows.",
    harbour: "Processing",
    accent: COLORS.copper,
    icon: "factory",
    img: { src: "/pictures/Crepe machine.png", alt: "Rubber processing machinery adding value to sourced material" },
  },
  {
    id: "assure",
    eyebrow: "Assure",
    title: "Traceability & Quality",
    sub: "Quality checks, documentation and traceability strengthen confidence across the supply chain.",
    harbour: "Assurance",
    accent: COLORS.gold,
    icon: "cert",
    img: { src: "/pictures/Traceability and Technology Page - Banner.jpg", alt: "Quality assurance and traceability records across the supply chain" },
  },
  {
    id: "move",
    eyebrow: "Move",
    title: "Shipment & Trade Execution",
    sub: "Coordinated logistics and disciplined trade execution move materials from source to market.",
    harbour: "Delivery",
    accent: COLORS.navy,
    icon: "ship",
    img: { src: "/pictures/home3/shipment-end-delivery.jpg", alt: "Cargo shipment and container logistics moving commodities to market" },
  },
  {
    id: "impact",
    eyebrow: "Impact",
    title: "Responsible Growth",
    sub: "Sustainable commodity flows create long-term value for communities, customers and partners.",
    harbour: "Impact",
    accent: COLORS.green,
    icon: "esg",
    img: { src: "/pictures/Sustainability Page - Banner.jpg", alt: "Responsible growth and sustainable practices supporting communities" },
  },
];

export const REVEAL = {
  eyebrow: "End to end",
  title: "Your Trusted End-to-End Commodity Trading Partner",
  sub: "From sourcing and processing to assurance, logistics and responsible growth, VRV Global connects commodity supply chains from origin to destination.",
};
