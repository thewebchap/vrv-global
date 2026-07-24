/**
 * Homepage hero rotation — 5 content points, each a headline + supporting line,
 * changing every 5 seconds (25s total cycle, looping). Wording is supplied and
 * must not be edited (punctuation, including the full stops in the headlines,
 * is intentional). Sequence is ordered to track the hero video story:
 *   1. Natural rubber origin / farmers   → From Farm to Future.
 *   2. Traceability, quality, technology  → Industry 5.0.
 *   3. Copper / aluminium / recycled      → Critical Metals. Circular Value.
 *   4. Mining, mapping, upstream          → Mining Value at Source.
 *   5. Communities, sustainability, impact→ Sustainable Supply. Global Impact.
 */
export type HeroSlide = {
  title: string;
  description: string;
};

export const heroSlides: HeroSlide[] = [
  {
    title: "From Farm to Future.",
    description:
      "Building responsible natural rubber supply chains from farmers to global tyre manufacturers.",
  },
  {
    title: "Industry 5.0.",
    description: "Enabled with future tech, establishing quality and traceability.",
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

/** 5 seconds per slide → 25s total cycle. */
export const HERO_INTERVAL_MS = 5000;
