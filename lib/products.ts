/**
 * Product catalogue — drives the mega menu, the Products landing page,
 * the category sections and the individual product pages.
 *
 * Organised into three pillars: Agro Commodities, Metals, and Circular
 * Economy Products. Grade-level specs, certifications and packaging are
 * intentionally PLACEHOLDERS ("[Editable: …]") pending verification —
 * replace with approved figures before publishing. Do not invent specs.
 */
export type ProductCategory = "agro" | "metals" | "circular";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  short: string;
  blurb: string;
  examples: string[];
  /** Boxed slider/cards of grades or sub-types shown on the product page. */
  grades: { title: string; items: string[] }[];
  useCases: string[];
  /** The sustainability / circular-economy angle for this product. */
  sustainability: string[];
  sourcing: string[];
  destinations: string[];
  specs: string[];
  certifications: string[];
  packaging: string[];
  heroPh: string;
  /** key into lib/images.ts `images` registry */
  image: string;
};

export const categoryMeta: Record<ProductCategory, { title: string; tagline: string; intro: string }> = {
  agro: {
    title: "Agro Commodities",
    tagline: "Responsibly sourced agricultural supply chains",
    intro:
      "Plantation and forestry-based commodities — natural rubber, sustainable rubber, woodchips and wood pulp — sourced with supplier engagement, quality assurance and a clear traceability roadmap from origin to destination.",
  },
  metals: {
    title: "Metals",
    tagline: "Industrial metals for the energy transition",
    intro:
      "Copper, aluminium and nickel — the foundational metals of electrification and clean energy — supplied through responsible sourcing relationships with assay-backed quality and end-to-end logistics.",
  },
  circular: {
    title: "Circular Economy Products",
    tagline: "Recycled materials and lower-waste flows",
    intro:
      "Recycled and recovered materials — ferrous and non-ferrous scrap and engineered wood products — that displace virgin extraction, lower embodied carbon and keep materials in productive use for longer.",
  },
};

export const products: Product[] = [
  /* ───────────────────────── AGRO COMMODITIES ───────────────────────── */
  {
    slug: "natural-rubber",
    name: "Natural Rubber",
    category: "agro",
    short: "From origin cup lump and latex to TSR and RSS grades for tyre and industrial buyers.",
    blurb:
      "Natural rubber is a core VRV agro supply chain. We work from origin collection and field grades through to Technically Specified Rubber (TSR), supported by long-term supplier relationships across Africa and South East Asia and a traceability roadmap that follows each consignment from plantation to processor.",
    examples: ["TSR grades", "Cup lump", "Latex", "RSS"],
    grades: [
      { title: "TSR", items: ["TSR 10", "TSR 20", "Block rubber from licensed TSR factories"] },
      { title: "Cup Lump", items: ["Field cup lump", "Graded by DRC / outturn"] },
      { title: "Latex", items: ["Field latex", "Concentrated latex (60% DRC)"] },
      { title: "RSS", items: ["Ribbed Smoked Sheet grades", "RSS 1–RSS 4"] },
      { title: "Other Grades", items: ["Skim rubber", "Specialty & custom grades"] },
    ],
    useCases: ["Tyre and tube manufacturing", "Industrial rubber goods", "Footwear and consumer products", "Engineering and automotive components"],
    sustainability: [
      "Supplier engagement and responsible sourcing at origin",
      "Traceability roadmap from plantation through processing",
      "Alignment with deforestation-free and EUDR-readiness expectations",
    ],
    sourcing: ["West & Central Africa", "South East Asia", "Indonesia"],
    destinations: ["China", "India", "South East Asia", "MENA"],
    specs: ["[Editable: TSR grade specs — dirt, ash, nitrogen, PRI]", "[Editable: cup lump DRC parameters]"],
    certifications: ["[Editable: sustainability / origin certifications]"],
    packaging: ["[Editable: bale weight & palletisation]", "[Editable: container loading specifications]"],
    heroPh: "Natural rubber — cup lump, latex, TSR & RSS",
    image: "rubber",
  },
  {
    slug: "sustainable-natural-rubber",
    name: "Sustainable Natural Rubber",
    category: "agro",
    short: "Responsibly sourced rubber with supplier engagement, traceability and ESG safeguards.",
    blurb:
      "Our sustainable natural rubber programme adds a structured responsibility layer on top of our rubber supply chain — engaging smallholders and processors, capturing origin data, and progressing toward deforestation-free, traceable and ESG-aligned sourcing that meets the expectations of leading manufacturers and downstream brands.",
    examples: ["Responsible sourcing", "Traceability", "Supplier engagement", "ESG safeguards"],
    grades: [
      { title: "Responsible Sourcing", items: ["Smallholder engagement", "Processor due diligence", "Risk-based screening"] },
      { title: "Traceability", items: ["Origin & plot-level data capture", "Chain-of-custody records"] },
      { title: "Quality Assurance", items: ["Pre-shipment inspection", "Grade verification"] },
      { title: "Safeguards", items: ["Environmental safeguards", "Social & labour safeguards"] },
    ],
    useCases: ["Brands with deforestation-free commitments", "Tyre makers with ESG sourcing policies", "Buyers requiring chain-of-custody documentation"],
    sustainability: [
      "Deforestation-free and EUDR-readiness focus",
      "Smallholder and community engagement at origin",
      "Documented chain of custody and audit-ready records",
      "Environmental and social safeguards across the chain",
    ],
    sourcing: ["West & Central Africa", "South East Asia"],
    destinations: ["Europe", "China", "India", "South East Asia"],
    specs: ["[Editable: traceability programme scope]", "[Editable: certification standards applied]"],
    certifications: ["[Editable: GPSNR / FSC / scheme alignment — to confirm]"],
    packaging: ["[Editable: bale weight & palletisation]"],
    heroPh: "Sustainable natural rubber — traceable & responsibly sourced",
    image: "sustainableRubber",
  },
  {
    slug: "woodchips",
    name: "Woodchips",
    category: "agro",
    short: "Hardwood, softwood and biomass woodchips from responsibly managed forestry sources.",
    blurb:
      "We supply industrial woodchips for pulp, panel and bioenergy applications, sourced from responsibly managed forestry and plantation residues. Our sourcing prioritises legal, traceable fibre and supports lower-waste use of forestry by-products.",
    examples: ["Hardwood chips", "Softwood chips", "Biomass feedstock", "Industrial woodchips"],
    grades: [
      { title: "Hardwood Chips", items: ["Eucalyptus / acacia", "Pulp-grade hardwood"] },
      { title: "Softwood Chips", items: ["Pine / mixed softwood", "Panel-grade softwood"] },
      { title: "Biomass Feedstock", items: ["Forestry residues", "Bioenergy-grade chips"] },
      { title: "Industrial Woodchips", items: ["Panel-board feedstock", "Custom moisture / size specs"] },
    ],
    useCases: ["Pulp and paper production", "Particle board and MDF", "Biomass energy and pellets"],
    sustainability: [
      "Legal and traceable fibre sourcing",
      "Use of plantation residues and by-products",
      "Support for responsibly managed forestry (FSC/PEFC-readiness)",
    ],
    sourcing: ["South East Asia", "Africa"],
    destinations: ["China", "India", "South East Asia", "MENA"],
    specs: ["[Editable: moisture, size & species specifications]", "[Editable: calorific value for biomass grades]"],
    certifications: ["[Editable: FSC / PEFC / legality certifications]"],
    packaging: ["[Editable: bulk vessel / container terms]"],
    heroPh: "Woodchips — hardwood, softwood & biomass",
    image: "woodchips",
  },
  {
    slug: "wood-pulp",
    name: "Wood Pulp",
    category: "agro",
    short: "Hardwood, softwood, recycled and industrial pulp grades for paper and packaging.",
    blurb:
      "We connect pulp producers to paper, tissue and packaging manufacturers, including recycled pulp grades that support circular fibre use. Sourcing emphasises traceable, responsibly managed fibre and reliable, documented supply.",
    examples: ["Hardwood pulp", "Softwood pulp", "Recycled pulp", "Industrial pulp"],
    grades: [
      { title: "Hardwood Pulp", items: ["Bleached hardwood kraft (BHKP)", "Short-fibre grades"] },
      { title: "Softwood Pulp", items: ["Bleached softwood kraft (BSKP)", "Long-fibre grades"] },
      { title: "Recycled Pulp", items: ["Recovered-fibre pulp", "De-inked pulp"] },
      { title: "Industrial Pulp", items: ["Specialty & dissolving grades", "Custom specifications"] },
    ],
    useCases: ["Printing and writing paper", "Tissue and hygiene products", "Packaging and board", "Specialty paper"],
    sustainability: [
      "Recycled and recovered-fibre grades for circular use",
      "Traceable, responsibly managed virgin fibre",
      "Lower-waste sourcing from integrated mills",
    ],
    sourcing: ["South East Asia", "Americas", "Europe"],
    destinations: ["China", "India", "South East Asia", "MENA"],
    specs: ["[Editable: pulp grade, brightness & fibre specifications]"],
    certifications: ["[Editable: FSC / PEFC chain-of-custody]"],
    packaging: ["[Editable: bale & container specifications]"],
    heroPh: "Wood pulp — hardwood, softwood, recycled & industrial",
    image: "woodpulp",
  },

  /* ───────────────────────────── METALS ────────────────────────────── */
  {
    slug: "copper",
    name: "Copper",
    category: "metals",
    short: "Cathodes, concentrates and wire rod for electrification and the energy transition.",
    blurb:
      "Copper is the metal of electrification. We connect responsible mining and refining relationships to manufacturers and processors, supplying cathodes, concentrates and semi-finished forms with assay-backed quality, documentation, finance and logistics handled end to end.",
    examples: ["Copper cathodes", "Copper concentrate", "Wire rod"],
    grades: [
      { title: "Refined", items: ["Grade A cathode (LME-deliverable spec)", "Wire rod"] },
      { title: "Concentrates", items: ["Copper concentrate", "Assay-graded lots"] },
    ],
    useCases: ["Power and grid infrastructure", "Electric vehicles and batteries", "Renewable energy systems", "Electronics and construction"],
    sustainability: [
      "Responsible sourcing and counterparty due diligence",
      "Demand driven by electrification and clean energy",
      "Complemented by recycled copper through our circular range",
    ],
    sourcing: ["Africa", "South East Asia", "South America"],
    destinations: ["China", "India", "MENA", "South East Asia"],
    specs: ["[Editable: cathode purity / LME spec]", "[Editable: concentrate assay & moisture]"],
    certifications: ["[Editable: responsible-sourcing & assay certifications]"],
    packaging: ["[Editable: bundles / bulk / container terms]", "[Editable: Incoterms & inspection]"],
    heroPh: "Copper — cathodes, concentrates & wire rod",
    image: "copper",
  },
  {
    slug: "aluminum",
    name: "Aluminum",
    category: "metals",
    short: "Ingots, billets and primary aluminium for lightweight, low-carbon manufacturing.",
    blurb:
      "Aluminium combines light weight, strength and near-infinite recyclability, making it central to lower-carbon transport and packaging. We supply primary and semi-finished aluminium with reliable quality and logistics, and connect buyers to recycled aluminium through our circular economy range.",
    examples: ["Aluminium ingots", "Billets", "Primary aluminium"],
    grades: [
      { title: "Primary", items: ["P1020 ingots", "Foundry alloys"] },
      { title: "Semi-finished", items: ["Extrusion billets", "Slab / rolling feedstock"] },
    ],
    useCases: ["Automotive and aerospace", "Packaging and beverage cans", "Construction and façades", "Renewable energy and transmission"],
    sustainability: [
      "Near-infinitely recyclable with large energy savings vs. primary",
      "Responsible sourcing and documented provenance",
      "Pathway to lower-carbon and recycled aluminium",
    ],
    sourcing: ["Middle East", "Asia", "Africa"],
    destinations: ["India", "China", "South East Asia", "MENA"],
    specs: ["[Editable: alloy & purity specifications]", "[Editable: ingot / billet dimensions]"],
    certifications: ["[Editable: ASI / responsible-sourcing alignment]"],
    packaging: ["[Editable: bundle weight & container terms]"],
    heroPh: "Aluminium — ingots, billets & primary metal",
    image: "aluminum",
  },
  {
    slug: "nickel",
    name: "Nickel",
    category: "metals",
    short: "Nickel briquettes, cathodes and intermediates for stainless steel and batteries.",
    blurb:
      "Nickel underpins stainless steel and high-performance batteries. We supply refined nickel and intermediates through responsible sourcing relationships, with documentation and logistics managed end to end and a focus on supply chains that meet evolving battery-grade and ESG expectations.",
    examples: ["Nickel briquettes", "Nickel cathode", "Intermediates"],
    grades: [
      { title: "Refined", items: ["Briquettes", "Full-plate / cut cathode"] },
      { title: "Intermediates", items: ["MHP / mixed hydroxide", "Nickel sulphate (battery-grade)"] },
    ],
    useCases: ["Stainless steel production", "EV batteries and energy storage", "Alloys and plating", "Aerospace and industrial"],
    sustainability: [
      "Responsible sourcing aligned to battery-supply-chain scrutiny",
      "Provenance and counterparty due diligence",
      "Supports electrification and energy storage demand",
    ],
    sourcing: ["Indonesia", "Asia", "Africa"],
    destinations: ["China", "India", "South East Asia"],
    specs: ["[Editable: nickel content & form specifications]", "[Editable: battery-grade sulphate specs]"],
    certifications: ["[Editable: responsible-sourcing certifications]"],
    packaging: ["[Editable: drums / bulk bags / container terms]"],
    heroPh: "Nickel — briquettes, cathode & intermediates",
    image: "nickel",
  },

  /* ───────────────────── CIRCULAR ECONOMY PRODUCTS ──────────────────── */
  {
    slug: "pns-scrap",
    name: "PNS Scrap",
    category: "circular",
    short: "Plate & structural (PNS) ferrous scrap — recycled feedstock for steelmaking.",
    blurb:
      "Plate and structural (PNS) scrap is a high-quality recycled ferrous feedstock for electric-arc and induction steelmaking. Sourcing recycled steel displaces virgin iron ore and coal, sharply lowering embodied carbon while keeping valuable material in productive use.",
    examples: ["Plate & structural scrap", "Heavy melting steel", "Recycled feedstock"],
    grades: [
      { title: "Plate & Structural", items: ["P&S 5ft", "Cut structural sections"] },
      { title: "Related Ferrous", items: ["HMS 1 & 2", "Shredded scrap"] },
    ],
    useCases: ["Electric-arc furnace steelmaking", "Induction furnace melting", "Rebar and structural steel production"],
    sustainability: [
      "Displaces virgin ore and reduces embodied carbon",
      "Keeps recovered steel circulating in the economy",
      "Lower energy intensity than primary steelmaking",
    ],
    sourcing: ["Global recovered-metal markets", "Industrial & demolition sources"],
    destinations: ["India", "South East Asia", "MENA"],
    specs: ["[Editable: dimensional & density specifications]", "[Editable: chemistry / contamination limits]"],
    certifications: ["[Editable: radiation & quality inspection regime]"],
    packaging: ["[Editable: bulk vessel / container terms]"],
    heroPh: "PNS scrap — recycled ferrous feedstock",
    image: "ferrousScrap",
  },
  {
    slug: "bushelling-scrap",
    name: "Bushelling Scrap",
    category: "circular",
    short: "Clean, low-residual industrial bushelling scrap for premium steel grades.",
    blurb:
      "Bushelling is clean, new-production industrial steel scrap with low residual elements — a premium recycled charge for high-quality flat and special steels. It enables steelmakers to hit tight chemistries while maximising recycled content.",
    examples: ["Industrial bushelling", "Low-residual scrap", "Prime grade"],
    grades: [
      { title: "Bushelling", items: ["Factory bundles", "Busheling #1 prime"] },
      { title: "Related Prime", items: ["Stamping / clip scrap", "Low-copper grades"] },
    ],
    useCases: ["Flat-rolled and special steels", "Automotive-grade steel", "High-spec EAF charges"],
    sustainability: [
      "High recycled content with low residuals",
      "Reduces reliance on virgin inputs",
      "Supports closed-loop industrial recycling",
    ],
    sourcing: ["Industrial / manufacturing offcuts", "Global recovered-metal markets"],
    destinations: ["India", "South East Asia", "MENA"],
    specs: ["[Editable: residual-element limits]", "[Editable: dimensional specifications]"],
    certifications: ["[Editable: quality & inspection regime]"],
    packaging: ["[Editable: baled / loose / container terms]"],
    heroPh: "Bushelling scrap — clean prime ferrous",
    image: "ferrousScrap",
  },
  {
    slug: "copper-scrap",
    name: "Copper Scrap",
    category: "circular",
    short: "Recycled copper — Millberry, Birch/Cliff and mixed grades for refiners and mills.",
    blurb:
      "Recycled copper retains the full performance of primary metal at a fraction of the energy and carbon. We supply graded copper scrap to refiners and mills, supporting a circular copper loop that complements rising electrification demand.",
    examples: ["Millberry (bare bright)", "Birch / Cliff", "Mixed copper"],
    grades: [
      { title: "High Grade", items: ["Millberry (bare bright)", "Berry / candy"] },
      { title: "Mixed", items: ["Birch / Cliff", "Insulated copper wire", "No.1 & No.2 copper"] },
    ],
    useCases: ["Copper refining and rod mills", "Brass and alloy production", "Foundries and casting"],
    sustainability: [
      "Up to ~85% energy saving vs. primary copper",
      "Closes the loop on electrification demand",
      "Keeps high-value metal in circulation",
    ],
    sourcing: ["Global recovered-metal markets", "End-of-life electricals & cable"],
    destinations: ["China", "India", "South East Asia"],
    specs: ["[Editable: copper content by grade]", "[Editable: contamination limits]"],
    certifications: ["[Editable: ISRI grade reference & inspection]"],
    packaging: ["[Editable: bags / bales / container terms]"],
    heroPh: "Copper scrap — Millberry, Birch/Cliff & mixed",
    image: "copperScrap",
  },
  {
    slug: "mdf",
    name: "MDF",
    category: "circular",
    short: "Medium-density fibreboard from recovered and residual wood fibre.",
    blurb:
      "Medium-density fibreboard (MDF) makes productive use of wood residues and recovered fibre, turning by-products into engineered panels for furniture and construction. It is a practical example of lower-waste, circular material flows in the forestry value chain.",
    examples: ["Standard MDF", "Moisture-resistant", "Fire-rated", "Recovered-fibre panels"],
    grades: [
      { title: "Standard", items: ["General-purpose MDF", "Furniture-grade"] },
      { title: "Performance", items: ["Moisture-resistant (MR)", "Fire-rated (FR)"] },
    ],
    useCases: ["Furniture and cabinetry", "Interior fit-out and joinery", "Flooring substrates", "Construction panels"],
    sustainability: [
      "Uses wood residues and recovered fibre",
      "Diverts by-products from waste streams",
      "Supports circular use of forestry resources",
    ],
    sourcing: ["South East Asia", "Asia"],
    destinations: ["MENA", "India", "South East Asia", "Africa"],
    specs: ["[Editable: density, thickness & dimensional specs]", "[Editable: emission class — e.g. E1/E0]"],
    certifications: ["[Editable: CARB / emission & FSC certifications]"],
    packaging: ["[Editable: pallet & container terms]"],
    heroPh: "MDF — engineered panels from recovered fibre",
    image: "mdf",
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (cat: ProductCategory) => products.filter((p) => p.category === cat);
export const categories: ProductCategory[] = ["agro", "metals", "circular"];
