/**
 * Homepage hero rotation — 6 content points, each a headline + supporting line,
 * changing every 5 seconds (30s total cycle, looping). Wording is supplied and
 * must not be edited (punctuation, including the full stops in the headlines,
 * the en dash and ampersand in "PPP – People, Planet & Profits.", is
 * intentional). Sequence is ordered to track the hero video story:
 *   1. Natural rubber origin / farmers    → From Farm to Future.
 *   2. AI processing, quality, traceability→ Industry 5.0.
 *   3. Copper / aluminium / recycled       → Critical Metals. Circular Value.
 *   4. Mining, mapping, upstream           → Mining Value at Source.
 *   5. Communities, sustainability, impact → Sustainable Supply. Global Impact.
 *   6. People, reinvestment, stakeholders  → PPP – People, Planet & Profits.
 */
export type HeroSlide = {
  title: string;
  description: string;
  /** Background image for this slide (from /pictures/Home page - hero banner). */
  image: string;
  imageAlt: string;
  imagePosition: string;
};

const HERO_IMG = "/pictures/Home page - hero banner";

export const heroSlides: HeroSlide[] = [
  {
    title: "From Farm to Future.",
    description:
      "Building sustainable natural rubber supply chains from farmers to global tyre manufacturers.",
    image: `${HERO_IMG}/1.png`,
    imageAlt: "Natural rubber plantation and latex tapping at farm origin",
    imagePosition: "center",
  },
  {
    title: "Industry 5.0.",
    description:
      "AI embedded processing facilities, establishing quality and traceability through continued investments into digitization and automation.",
    image: `${HERO_IMG}/2.png`,
    imageAlt: "AI-enabled processing facility with automation, quality and traceability systems",
    imagePosition: "center",
  },
  {
    title: "Critical Metals. Circular Value.",
    description:
      "Supplying primary and recycled metals that power industry, infrastructure and next-generation manufacturing.",
    image: `${HERO_IMG}/3.png`,
    imageAlt: "Primary and recycled industrial metals including copper and aluminium for global supply",
    imagePosition: "center",
  },
  {
    title: "Mining Value at Source.",
    description:
      "Capturing copper and precious metals value from responsible mining to industrial-scale buyers.",
    image: `${HERO_IMG}/4.png`,
    imageAlt: "Responsible copper and precious-metals mining captured at source",
    imagePosition: "center",
  },
  {
    title: "Sustainable Supply. Global Impact.",
    description:
      "Creating long-term value for people, planet and investors through circular commodity solutions.",
    image: `${HERO_IMG}/5.png`,
    imageAlt: "Sustainable, responsibly sourced commodity supply chains creating global impact",
    imagePosition: "center",
  },
  {
    title: "PPP – People, Planet & Profits.",
    description:
      "Each of our Businesses contributes towards the benefit of its stakeholders and the place we live in by reinvesting the profits.",
    image: `${HERO_IMG}/6.png`,
    imageAlt: "Farming communities and families benefiting from reinvested profits — people, planet and profits",
    imagePosition: "center",
  },
];

/** Longest title / description reserve stable heights to avoid layout jumps. */
export const LONGEST_TITLE = heroSlides.reduce(
  (a, b) => (b.title.length > a.length ? b.title : a),
  heroSlides[0].title,
);
export const LONGEST_DESCRIPTION = heroSlides.reduce(
  (a, b) => (b.description.length > a.length ? b.description : a),
  heroSlides[0].description,
);

/** 5 seconds per slide → 30s total cycle (6 slides). */
export const HERO_INTERVAL_MS = 5000;
