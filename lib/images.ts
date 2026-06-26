/**
 * Curated, royalty-free image registry.
 * ------------------------------------------------------------------
 * Sources: Unsplash (https://unsplash.com/license — free, commercial use,
 * no attribution required). URLs are direct CDN links sized for the web.
 * The <Media> component degrades to a branded eco panel if any image fails
 * to load, so the UI is never broken.
 *
 * REPLACE STRATEGY: swap any `src` below with (a) an image from the current
 * VRV site, or (b) your own licensed photography. Keep the same keys and the
 * whole site updates. Each entry documents where it is used.
 */
const ux = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export type Img = { src: string; alt: string; credit?: string; where: string };

export const images: Record<string, Img> = {
  // — Home hero: sustainable global trade
  heroPort: {
    src: ux("1494412651409-8963ce7935a7"),
    alt: "Container vessel and gantry cranes at a global shipping port",
    credit: "Unsplash",
    where: "Home hero background image",
  },
  heroGreen: {
    src: ux("1466611653911-95081537e5b7"),
    alt: "Sustainable green plantation landscape representing responsible sourcing",
    credit: "Unsplash",
    where: "Home hero / sustainability hero",
  },

  // — Supply-chain journey stage thumbnails
  origin: { src: ux("1500382017468-9049fed747ef", 900), alt: "Agricultural origin — plantation landscape", credit: "Unsplash", where: "Supply chain: Origin" },
  aggregation: { src: ux("1586528116311-ad8dd3c8310d", 900), alt: "Warehouse aggregation of bagged commodities", credit: "Unsplash", where: "Supply chain: Aggregation" },
  processing: { src: ux("1581094794329-c8112a89af12", 900), alt: "Industrial processing facility", credit: "Unsplash", where: "Supply chain: Processing" },
  finance: { src: ux("1454165804606-c3d57bc86b40", 900), alt: "Trade finance — documents and analysis on a desk", credit: "Unsplash", where: "Supply chain: Trade Finance" },
  logistics: { src: ux("1578575437130-527eed3abbec", 900), alt: "Logistics — cargo trucks and containers", credit: "Unsplash", where: "Supply chain: Logistics" },
  destination: { src: ux("1605902711622-cfb43c4437b5", 900), alt: "Destination port terminal with stacked containers", credit: "Unsplash", where: "Supply chain: Destination markets" },

  // — Product images: Agro
  agro: { src: ux("1574323347407-f5e1ad6d020b", 1200), alt: "Agricultural commodities — harvested crops", credit: "Unsplash", where: "Category: Agro Commodities" },
  rubber: { src: ux("1597916829826-02e5bb4a54e0", 1200), alt: "Natural rubber latex collection at origin", credit: "Unsplash", where: "Product: Natural Rubber" },
  sustainableRubber: { src: "/images/hero/natural-rubber.jpg", alt: "Latex collected in a managed natural rubber plantation — sustainable, traceable sourcing", credit: "Wikimedia Commons (CC BY-SA 4.0)", where: "Product: Sustainable Natural Rubber" },
  woodchips: { src: ux("1416879595882-3373a0480b5b", 1200), alt: "Woodchips and forestry biomass", credit: "Unsplash", where: "Product: Woodchips" },
  woodpulp: { src: ux("1605000797499-95a51c5269ae", 1200), alt: "Paper and pulp rolls in an industrial mill", credit: "Unsplash", where: "Product: Wood Pulp" },

  // — Product images: Metals
  metals: { src: ux("1518709268805-4e9042af9f23", 1200), alt: "Molten industrial metal in a steel works", credit: "Unsplash", where: "Category: Metals" },
  copper: { src: ux("1605000797499-95a51c5269ae", 1200), alt: "Copper wire and refined metal", credit: "Unsplash", where: "Product: Copper" },
  aluminum: { src: ux("1605557202138-c8d3e6f0a0d4", 1200), alt: "Aluminium ingots and rolled metal", credit: "Unsplash", where: "Product: Aluminum" },
  nickel: { src: ux("1535813547-99c456a41d4a", 1200), alt: "Refined industrial metal briquettes", credit: "Unsplash", where: "Product: Nickel" },

  // — Product images: Circular economy
  circular: { src: ux("1532996122724-e3c354a0b15b", 1200), alt: "Recycling and circular economy materials", credit: "Unsplash", where: "Category: Circular Economy" },
  ferrousScrap: { src: ux("1567789884554-0b844b597180", 1200), alt: "Recycled ferrous metal scrap ready for steelmaking", credit: "Unsplash", where: "Product: PNS / Bushelling scrap" },
  copperScrap: { src: ux("1605557202138-c8d3e6f0a0d4", 1200), alt: "Recycled copper scrap and wire", credit: "Unsplash", where: "Product: Copper Scrap" },
  mdf: { src: ux("1503602642458-232111445657", 1200), alt: "Engineered wood panels and boards", credit: "Unsplash", where: "Product: MDF" },

  // — Section / page imagery
  mining: { src: ux("1578662996442-48f60103fc96", 1400), alt: "Heavy mining equipment at an extraction site", credit: "Unsplash", where: "Responsible metals sourcing" },
  recycling: { src: ux("1532996122724-e3c354a0b15b", 1400), alt: "Materials recovery and recycling facility", credit: "Unsplash", where: "Circular economy section" },
  farming: { src: ux("1500382017468-9049fed747ef", 1400), alt: "Sustainable farming and plantation landscape", credit: "Unsplash", where: "Sustainable agro section" },
  traceability: { src: ux("1518186285589-2f7649de83e0", 1400), alt: "Technology-enabled supply chain traceability and data", credit: "Unsplash", where: "Technology & traceability" },
  sustainability: { src: ux("1466611653911-95081537e5b7", 1400), alt: "Green landscape representing responsible sourcing", credit: "Unsplash", where: "Sustainability hero / section" },
  esg: { src: ux("1497435334941-8c899ee9e8e9", 1400), alt: "Forest canopy representing environmental responsibility", credit: "Unsplash", where: "ESG / environment" },
  community: { src: ux("1531206715517-5c0ba140b2b8", 1400), alt: "Community and people at a sourcing region", credit: "Unsplash", where: "Social responsibility" },
  boardroom: { src: ux("1600880292203-757bb62b4baf", 1400), alt: "Corporate leadership meeting in a boardroom", credit: "Unsplash", where: "Leadership & governance / Investors" },
  governance: { src: ux("1450101499163-c8848c66ca85", 1400), alt: "Governance, policy and compliance documents", credit: "Unsplash", where: "Governance & ethics" },
  investors: { src: ux("1611974789855-9c2a0a7236a3", 1400), alt: "Financial market data and analysis", credit: "Unsplash", where: "Investor relations" },
  singapore: { src: ux("1565967511849-76a60a516170", 1400), alt: "Singapore skyline at dusk", credit: "Unsplash", where: "About / Contact — Singapore HQ" },
  careers: { src: ux("1521737604893-d14cc237f11d", 1400), alt: "Professional team collaborating in an office", credit: "Unsplash", where: "Careers — why VRV" },
  news: { src: ux("1611974789855-9c2a0a7236a3", 1200), alt: "Market data and analysis", credit: "Unsplash", where: "News & insights — featured" },
  containersAerial: { src: ux("1577563908411-5077b6dc7624", 1400), alt: "Aerial view of a container yard", credit: "Unsplash", where: "Global presence / corridors" },
  supplyDiagram: { src: ux("1577416412292-747c6607f055", 1200), alt: "Logistics warehouse operations", credit: "Unsplash", where: "Supply chain page" },
};
