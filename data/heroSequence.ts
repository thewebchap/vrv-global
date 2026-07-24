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
};

export const heroSlides: HeroSlide[] = [
  {
    title: "From Farm to Future.",
    description:
      "Building sustainable natural rubber supply chains from farmers to global tyre manufacturers.",
  },
  {
    title: "Industry 5.0.",
    description:
      "AI embedded processing facilities, establishing quality and traceability through continued investments into digitization and automation.",
  },
  {
    title: "Critical Metals. Circular Value.",
    description:
      "Supplying primary and recycled metals that power industry, infrastructure and next-generation manufacturing.",
  },
  {
    title: "Mining Value at Source.",
    description:
      "Capturing copper and precious metals value from responsible mining to industrial-scale buyers.",
  },
  {
    title: "Sustainable Supply. Global Impact.",
    description:
      "Creating long-term value for people, planet and investors through circular commodity solutions.",
  },
  {
    title: "PPP – People, Planet & Profits.",
    description:
      "Each of our Businesses contributes towards the benefit of its stakeholders and the place we live in by reinvesting the profits.",
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
