/**
 * Curated image registry for VRV Global.
 * ------------------------------------------------------------------
 * Strategy: prefer the project's own LOCAL, commodity-relevant photography
 * (in /public/images/...) for every slot that has a good match — these are
 * real supply-chain visuals (rubber tapping, aluminium billets, steel, scrap,
 * Singapore network, global trade) and they avoid remote dependencies, layout
 * shift and Vercel image-optimization limits.
 *
 * A few slots without a confirmed local photo fall back to royalty-free
 * Unsplash CDN links (https://unsplash.com/license — free, commercial use,
 * no attribution required). When VRV supplies real photography, drop the files
 * into the folders documented in /public/images/image-credits.md and point the
 * matching `src` below at them — keep the keys and the whole site updates.
 *
 * Alt text is meaningful and commodity-specific (never "image"/"photo"/"banner").
 */
const ux = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export type Img = { src: string; alt: string; credit?: string; where: string };

/** Local, commodity-relevant source files (already optimized, in /public). */
const L = {
  rubberPlantation: "/images/hero/natural-rubber.jpg",
  latexTapping: "/images/products/agro-commodities.jpg",
  aluminiumBillets: "/images/products/metals.jpg",
  steelCoils: "/images/products/ferrous-metals.jpg",
  industrialMetals: "/images/commodities/metals/industrial-metals-warehouse.jpg",
  scrapMetal: "/images/products/circular-economy.jpg",
  circularYard: "/images/hero/circular-economy.jpg",
  woodchips: "/images/products/biomass.jpg",
  spices: "/images/products/nuts-spices.jpg",
  singaporeNetwork: "/images/hero/singapore-global-network.jpg",
  globalTrade: "/images/hero/sustainable-global-trade.jpg",
} as const;

const LOCAL_CREDIT = "VRV Global / Wikimedia Commons (CC BY-SA)";

export const images: Record<string, Img> = {
  // — Home hero / poster: global commodity trade & sourcing
  heroPort: {
    src: L.globalTrade,
    alt: "Cargo containers and bulk commodity movement representing global supply-chain trade",
    credit: LOCAL_CREDIT,
    where: "Home hero / poster background",
  },
  heroGreen: {
    src: L.rubberPlantation,
    alt: "Natural rubber plantation with latex collection — responsible agro-origin sourcing",
    credit: LOCAL_CREDIT,
    where: "Home hero / sustainability hero",
  },

  // — Supply-chain journey stage thumbnails
  origin: { src: L.latexTapping, alt: "Farmer tapping latex in a natural rubber plantation at origin", credit: LOCAL_CREDIT, where: "Supply chain: Origin" },
  aggregation: { src: L.circularYard, alt: "Bulk commodity material aggregated and sorted in a yard", credit: LOCAL_CREDIT, where: "Supply chain: Aggregation" },
  processing: { src: L.aluminiumBillets, alt: "Processed aluminium billets ready for industrial markets", credit: LOCAL_CREDIT, where: "Supply chain: Processing" },
  finance: { src: ux("1454165804606-c3d57bc86b40", 900), alt: "Trade-finance documents and shipment paperwork under review", credit: "Unsplash", where: "Supply chain: Trade Finance" },
  logistics: { src: L.globalTrade, alt: "Containers and bulk cargo in transit across commodity logistics", credit: LOCAL_CREDIT, where: "Supply chain: Logistics" },
  destination: { src: L.singaporeNetwork, alt: "Singapore-coordinated network connecting commodity destination markets", credit: LOCAL_CREDIT, where: "Supply chain: Destination markets" },

  // — Product images: Agro
  agro: { src: L.latexTapping, alt: "Worker collecting latex in a natural rubber plantation", credit: LOCAL_CREDIT, where: "Category: Agro Commodities" },
  rubber: { src: L.rubberPlantation, alt: "Latex collected from tapped trees in a natural rubber plantation", credit: LOCAL_CREDIT, where: "Product: Natural Rubber" },
  biomass: { src: L.woodchips, alt: "Wood chips used as biomass feedstock", credit: LOCAL_CREDIT, where: "Product: Biomass" },
  nutsSpices: { src: L.spices, alt: "Spices, pulses and agricultural produce at an agro-commodity market", credit: LOCAL_CREDIT, where: "Product: Nuts, Beans, Pulses & Spices" },
  sustainableRubber: { src: L.rubberPlantation, alt: "Latex collected in a managed natural rubber plantation — sustainable, traceable sourcing", credit: LOCAL_CREDIT, where: "Product: Sustainable Natural Rubber" },
  woodchips: { src: L.woodchips, alt: "Forestry wood chips and biomass feedstock", credit: LOCAL_CREDIT, where: "Product: Woodchips" },
  woodpulp: { src: L.woodchips, alt: "Wood-based pulp feedstock for industrial processing", credit: LOCAL_CREDIT, where: "Product: Wood Pulp" },

  // — Product images: Metals
  metals: { src: L.aluminiumBillets, alt: "Stacked aluminium billets in a metals warehouse", credit: LOCAL_CREDIT, where: "Category: Metals / Non-Ferrous Metals" },
  ferrousMetals: { src: L.steelCoils, alt: "Steel coils stored in an industrial metals warehouse", credit: LOCAL_CREDIT, where: "Product: Ferrous Metals" },
  copper: { src: L.industrialMetals, alt: "Refined industrial metals representing copper supply", credit: LOCAL_CREDIT, where: "Product: Copper" },
  aluminum: { src: L.aluminiumBillets, alt: "Aluminium billets and ingots in an industrial warehouse", credit: LOCAL_CREDIT, where: "Product: Aluminum" },
  nickel: { src: L.industrialMetals, alt: "Refined industrial metals representing nickel supply", credit: LOCAL_CREDIT, where: "Product: Nickel" },

  // — Product images: Circular economy
  circular: { src: L.scrapMetal, alt: "Recovered scrap metal at a recycling yard — circular material flows", credit: LOCAL_CREDIT, where: "Category: Circular Economy / Recycled Metals" },
  ferrousScrap: { src: L.scrapMetal, alt: "Recycled ferrous metal scrap prepared for steelmaking", credit: LOCAL_CREDIT, where: "Product: PNS / Bushelling scrap" },
  copperScrap: { src: L.scrapMetal, alt: "Recovered copper and mixed metal scrap for recycling", credit: LOCAL_CREDIT, where: "Product: Copper Scrap" },
  mdf: { src: L.woodchips, alt: "Engineered wood feedstock for recovered-material panels", credit: LOCAL_CREDIT, where: "Product: MDF" },

  // — Section / page imagery
  mining: { src: L.industrialMetals, alt: "Industrial metals stored in a warehouse representing mining-linked metals sourcing", credit: LOCAL_CREDIT, where: "Mining / responsible metals sourcing" },
  recycling: { src: L.scrapMetal, alt: "Materials recovery yard returning scrap metal to productive use", credit: LOCAL_CREDIT, where: "Circular economy section" },
  farming: { src: L.latexTapping, alt: "Farmer engaged in latex tapping across a sustainable plantation", credit: LOCAL_CREDIT, where: "Sustainable agro section" },
  traceability: { src: L.singaporeNetwork, alt: "Connected global network representing supply-chain traceability from Singapore", credit: LOCAL_CREDIT, where: "Technology & traceability" },
  sustainability: { src: L.latexTapping, alt: "Responsible sourcing and farmer engagement in a natural rubber plantation", credit: LOCAL_CREDIT, where: "Sustainability hero / section" },
  esg: { src: L.rubberPlantation, alt: "Sustainable plantation practices supporting responsible, traceable sourcing", credit: LOCAL_CREDIT, where: "ESG / environment" },
  community: { src: L.latexTapping, alt: "Agro-origin community working in a natural rubber plantation", credit: LOCAL_CREDIT, where: "Social responsibility" },
  boardroom: { src: ux("1600880292203-757bb62b4baf", 1400), alt: "VRV Global leadership reviewing trade and governance matters", credit: "Unsplash", where: "Leadership & governance / Investors" },
  governance: { src: ux("1450101499163-c8848c66ca85", 1400), alt: "Governance, compliance and policy documentation under review", credit: "Unsplash", where: "Governance & ethics" },
  investors: { src: L.globalTrade, alt: "Diversified commodity trade exposure across global supply chains", credit: LOCAL_CREDIT, where: "Investor relations" },
  singapore: { src: L.singaporeNetwork, alt: "Singapore-headquartered network connecting global commodity markets", credit: LOCAL_CREDIT, where: "About / Contact — Singapore HQ" },
  careers: { src: ux("1521737604893-d14cc237f11d", 1400), alt: "VRV Global team collaborating across commodity supply-chain operations", credit: "Unsplash", where: "Careers — why VRV" },
  news: { src: L.globalTrade, alt: "Global commodity trade and logistics — VRV Global updates", credit: LOCAL_CREDIT, where: "News / Media — featured" },
  containersAerial: { src: L.globalTrade, alt: "Containers and bulk cargo moving through global trade corridors", credit: LOCAL_CREDIT, where: "Global presence / corridors" },
  supplyDiagram: { src: L.globalTrade, alt: "End-to-end commodity supply-chain movement and logistics", credit: LOCAL_CREDIT, where: "Supply chain page" },
};
