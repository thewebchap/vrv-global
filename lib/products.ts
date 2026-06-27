/**
 * Product catalogue — drives the mega menu, the Products landing page,
 * the category sections and the individual product pages.
 *
 * Organised to mirror VRV Global's published product structure:
 *   • Agro Commodities — Natural Rubber, Biomass, Nuts/Beans/Pulses & Spices
 *   • Metals — Ferrous Metals, Non-Ferrous Metals
 *   • Circular Economy Products — Recycled Metals, MDF
 *
 * Copy is rewritten from VRV's product pages (vrv.campaigntag.com) into premium
 * corporate language. Grade-level specs, certifications and packaging marked
 * "[Editable: …]" are PLACEHOLDERS pending verification — do not invent specs.
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
      "A curated portfolio of natural rubber, biomass and agricultural products — nuts, beans, pulses and spices — sourced from trusted growers and certified plantations, with consistent quality, traceability and sustainable farming practices from origin to destination.",
  },
  metals: {
    title: "Metals",
    tagline: "Ferrous and non-ferrous metals for industry",
    intro:
      "Ferrous and non-ferrous metals supplied through a trusted global sourcing network — from iron and steel to copper, aluminium and nickel — with quality-focused procurement, traceable supply relationships and responsible sourcing for industrial and manufacturing customers.",
  },
  circular: {
    title: "Circular Economy Products",
    tagline: "Recycled metals and recovered materials",
    intro:
      "Recycled metals and recovered materials that feed circular supply chains — keeping ferrous and non-ferrous material in productive use, improving resource efficiency and lowering embodied carbon versus newly mined inputs.",
  },
};

export const products: Product[] = [
  /* ───────────────────────── AGRO COMMODITIES ───────────────────────── */
  {
    slug: "natural-rubber",
    name: "Natural Rubber",
    category: "agro",
    short: "A vital raw material — from cup lump and latex to TSR, SMR, STR and RSS grades for tyre and industrial buyers.",
    blurb:
      "Natural rubber is a vital raw material derived from the latex of rubber trees, valued for its elasticity, resilience and strength. VRV operates an integrated rubber supply chain — from plantation sourcing through processing, packaging and delivery — working with certified growers and supported by quality-control systems, optimised warehousing and global logistics. Responsible-sourcing initiatives include plantation mapping, farmer training and EUDR-aligned, deforestation-conscious procurement.",
    examples: ["TSR / SMR / STR", "Cup lump", "Latex", "RSS"],
    grades: [
      { title: "SMR (Malaysia)", items: ["SMR 10", "SMR 20", "SMR mixtures"] },
      { title: "STR / SIR / SVR", items: ["STR 10, STR 20", "SIR 10, SIR 20", "SVR 10, SVR 20"] },
      { title: "TSR (African)", items: ["TSR 10", "Block rubber from licensed factories"] },
      { title: "RSS & Specialty", items: ["RSS 1, RSS 3", "Cup lumps, crepes, scraps"] },
    ],
    useCases: ["Tyre and tube manufacturing", "Medical and healthcare products", "Footwear and consumer goods", "Industrial and automotive components"],
    sustainability: [
      "Ethical plantation management and reduced-deforestation focus",
      "EUDR-aligned, traceable sourcing with plantation mapping",
      "Farmer training on sustainable sourcing policies",
      "Eco-friendly processing methods",
    ],
    sourcing: ["West & Central Africa", "South East Asia", "Indonesia"],
    destinations: ["China", "India", "South East Asia", "MENA"],
    specs: ["[Editable: TSR/SMR grade specs — dirt, ash, nitrogen, PRI]", "[Editable: cup lump DRC parameters]"],
    certifications: ["[Editable: GPSNR / sustainability & origin certifications]"],
    packaging: ["[Editable: bale weight & palletisation]", "[Editable: container loading specifications]"],
    heroPh: "Natural rubber — cup lump, latex, TSR, SMR & RSS",
    image: "rubber",
  },
  {
    slug: "biomass",
    name: "Biomass",
    category: "agro",
    short: "Renewable wood chips, wood pulp and biomass pellets for energy, biofuel and paper applications.",
    blurb:
      "Biomass is a renewable resource derived from organic matter such as agricultural residues, wood waste and plant-based materials. VRV manages the flow from source to end-user — collection, processing, storage and delivery — partnering with farmers, recycling facilities and energy companies, and using drying, pelletizing and quality-testing systems to preserve product integrity. As a sustainable alternative to fossil fuels, biomass supports energy security, cost savings and carbon reduction.",
    examples: ["Wood chips", "Wood pulp", "Biomass pellets"],
    grades: [
      { title: "Wood Chips", items: ["Paper-industry grade", "Biofuel & energy grade"] },
      { title: "Wood Pulp", items: ["Hardwood pulp", "Softwood pulp"] },
      { title: "Biomass Pellets", items: ["Energy-application pellets", "Biofuel-industry pellets"] },
    ],
    useCases: ["Paper and pulp production", "Biofuel and bioenergy", "Industrial heat and power", "Lower-carbon fuel substitution"],
    sustainability: [
      "FSC-certified supply sources",
      "Ethical plantation management and reduced deforestation",
      "Low-emission technologies and transparent reporting",
      "Fair-trade practices that uplift farming communities",
    ],
    sourcing: ["South East Asia", "Africa"],
    destinations: ["China", "India", "South East Asia", "MENA"],
    specs: ["[Editable: moisture, size & species specifications]", "[Editable: calorific value for pellet grades]"],
    certifications: ["[Editable: FSC / PEFC / legality certifications]"],
    packaging: ["[Editable: bulk vessel / container terms]"],
    heroPh: "Biomass — wood chips, wood pulp & pellets",
    image: "biomass",
  },
  {
    slug: "nuts-beans-pulses-spices",
    name: "Nuts, Beans, Pulses & Spices",
    category: "agro",
    short: "Nutrient-rich nuts, coffee beans, pulses and spices that meet international food-safety standards.",
    blurb:
      "VRV supplies high-quality nuts, beans, pulses and spices that meet international food-safety standards, preserving freshness and nutritional value. The integrated approach spans sourcing, processing, grading, storage and global distribution — working with farmers, aggregators and processing units to secure traceable, reliable supply. Advanced cleaning, sorting, grading and quality testing, supported by efficient warehousing, cold storage where required and optimised logistics, maintain consistent quality from farm to market.",
    examples: ["Cashews & walnuts", "Green coffee beans", "Pulses", "Spices & herbs"],
    grades: [
      { title: "Nuts", items: ["Raw cashews & cashew kernels", "Shelled & deshelled walnuts"] },
      { title: "Coffee Beans", items: ["Green coffee beans", "Special coffee beans"] },
      { title: "Pulses & Spices", items: ["Whole, ground & blended spices", "Pulses & packed herbs"] },
    ],
    useCases: ["Food processing and ingredients", "Retail and wholesale distribution", "HoReCa and foodservice", "Export and re-export programmes"],
    sustainability: [
      "Traceable, reliable supply from farm to market",
      "Responsible sourcing through farmers and aggregators",
      "Food-safety-led cleaning, sorting and grading",
      "Quality preservation through cold storage where required",
    ],
    sourcing: ["[Editable: key sourcing origins]", "South East Asia", "Africa"],
    destinations: ["[Editable: destination markets]", "MENA", "South East Asia"],
    specs: ["[Editable: grade, calibre & food-safety specifications]"],
    certifications: ["[Editable: food-safety certifications — e.g. HACCP / ISO 22000]"],
    packaging: ["[Editable: retail & bulk packaging, container terms]"],
    heroPh: "Nuts, beans, pulses & spices — quality agricultural products",
    image: "nutsSpices",
  },

  /* ───────────────────────────── METALS ────────────────────────────── */
  {
    slug: "ferrous-metals",
    name: "Ferrous Metals",
    category: "metals",
    short: "Iron ore, steel plates, pipes and rods, plus manganese ore and silico manganese for heavy industry.",
    blurb:
      "VRV trades ferrous metals — iron and steel flows across Asia and Africa — supplying mills, fabricators and heavy-industry customers. The portfolio spans iron ore, steel plates, pipes and rods, alongside manganese ore and silico manganese. An integrated approach across sourcing, processing, grading, storage and end-to-end distribution, supported by strict quality control, segregation, cutting, sizing and inspection, preserves material integrity, mechanical strength and compliance with industry standards.",
    examples: ["Iron ore", "Steel plates, pipes & rods", "Manganese ore", "Silico manganese"],
    grades: [
      { title: "Steel Products", items: ["Steel plates", "Steel pipes", "Steel rods"] },
      { title: "Iron & Ferro-Alloys", items: ["Iron ore", "Manganese ore"] },
      { title: "Silico Manganese", items: ["65/6 grade", "Lower grades"] },
    ],
    useCases: ["Construction and infrastructure", "Automotive and machinery", "Shipbuilding", "Heavy engineering"],
    sustainability: [
      "Responsible sourcing and global compliance standards",
      "Partnerships with mines, recycling facilities and industrial partners",
      "Quality control that preserves material integrity",
      "Optimised, lower-waste logistics",
    ],
    sourcing: ["Asia", "Africa"],
    destinations: ["[Editable: destination markets]", "South East Asia", "MENA"],
    specs: ["[Editable: chemistry, dimensional & mechanical specifications]"],
    certifications: ["[Editable: mill certificates & inspection regime]"],
    packaging: ["[Editable: bundle / bulk vessel / container terms]"],
    heroPh: "Ferrous metals — iron, steel & ferro-alloys",
    image: "ferrousMetals",
  },
  {
    slug: "non-ferrous-metals",
    name: "Non-Ferrous Metals",
    category: "metals",
    short: "Copper, aluminium and nickel — prized for light weight, corrosion resistance and conductivity.",
    blurb:
      "VRV trades non-ferrous metals including copper, aluminium and nickel — prized for their light weight, resistance to corrosion and excellent conductivity. These materials serve aerospace, electrical, packaging, construction and decorative sectors, and perform in demanding environments. An integrated network spanning sourcing of raw ores through refining, processing and delivery — backed by storage facilities, tracking systems and efficient logistics — ensures timely supply while preserving product integrity.",
    examples: ["Copper cathodes & concentrates", "Aluminium ingots", "Nickel briquettes"],
    grades: [
      { title: "Copper", items: ["Cathodes", "Concentrates"] },
      { title: "Aluminium", items: ["Ingots", "Aluminium ore"] },
      { title: "Nickel", items: ["Ingot", "Briquette", "Nickel ore"] },
    ],
    useCases: ["Power, grid and electrification", "Aerospace and transport", "Packaging and construction", "Electronics and manufacturing"],
    sustainability: [
      "Priority on recycling non-ferrous metals",
      "Energy-efficient refining",
      "Community engagement in mining areas",
      "Responsible trade for sustainable, green industries",
    ],
    sourcing: ["Africa", "Asia", "Middle East"],
    destinations: ["China", "India", "South East Asia", "MENA"],
    specs: ["[Editable: cathode purity / alloy & assay specifications]"],
    certifications: ["[Editable: responsible-sourcing & assay certifications]"],
    packaging: ["[Editable: bundles / bulk / container terms]"],
    heroPh: "Non-ferrous metals — copper, aluminium & nickel",
    image: "metals",
  },

  /* ───────────────────── CIRCULAR ECONOMY PRODUCTS ──────────────────── */
  {
    slug: "recycled-metals",
    name: "Recycled Metals",
    category: "circular",
    short: "Recycled ferrous and non-ferrous metals — an eco-friendly alternative to newly mined resources.",
    blurb:
      "VRV feeds recycled metal into circular supply chains worldwide, building a circular economy from ferrous and non-ferrous scrap as an eco-friendly alternative to newly mined resources. Materials are sourced from industrial scrap, end-of-life products and manufacturing waste, then refined through advanced sorting, cleaning, shredding and quality inspection. Working with scrap generators, recycling facilities, processors and industrial consumers secures steady, traceable supply across ferrous and non-ferrous streams.",
    examples: ["PNS scrap & BV shellings", "Copper scrap & ingots", "Aluminium scrap & ingots"],
    grades: [
      { title: "Iron & Steel", items: ["PNS scrap", "BV shellings"] },
      { title: "Copper", items: ["Recycled copper ingots", "Copper scrap"] },
      { title: "Aluminium", items: ["Recycled aluminium ingots", "Aluminium scrap"] },
    ],
    useCases: ["Electric-arc and induction steelmaking", "Copper refining and rod mills", "Aluminium remelting", "Construction, automotive and packaging"],
    sustainability: [
      "Displaces virgin extraction and lowers embodied carbon",
      "Improves resource efficiency and keeps metal in circulation",
      "Traceable supply across ferrous and non-ferrous streams",
      "Responsible sourcing to global compliance standards",
    ],
    sourcing: ["Industrial & manufacturing scrap", "Global recovered-metal markets"],
    destinations: ["India", "South East Asia", "China", "MENA"],
    specs: ["[Editable: grade, composition & contamination limits]", "[Editable: radiation & quality inspection regime]"],
    certifications: ["[Editable: ISRI grade reference & inspection]"],
    packaging: ["[Editable: baled / loose / container terms]"],
    heroPh: "Recycled metals — ferrous & non-ferrous circular flows",
    image: "circular",
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
    image: "biomass",
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (cat: ProductCategory) => products.filter((p) => p.category === cat);
export const categories: ProductCategory[] = ["agro", "metals", "circular"];
