/**
 * Per-product AEO/GEO content keyed by product slug — SEO metadata, a
 * Quick-Answer question (the answer reuses each product's verified summary),
 * and a concise "What is …?" definition. Factual only; no invented specifics.
 */
export type ProductAeo = {
  metaTitle: string;
  metaDescription: string;
  question: string;
  definitionTerm: string;
  definitionText: string;
};

export const productAeo: Record<string, ProductAeo> = {
  "natural-rubber": {
    metaTitle: "Natural Rubber & Cuplumps Trading",
    metaDescription:
      "VRV Global supports natural rubber and cuplump supply chains through origin relationships, responsible sourcing, quality consistency and traceable movement from producing regions to global markets.",
    question: "Does VRV Global supply natural rubber and cuplumps?",
    definitionTerm: "What is natural rubber?",
    definitionText:
      "Natural rubber is a renewable raw material made from the latex of rubber trees, valued for its elasticity, resilience and strength. Cuplumps are a primary form collected at origin before further processing.",
  },
  "block-rubber": {
    metaTitle: "Block Rubber / TSR Supply",
    metaDescription:
      "VRV Global supplies block rubber and TSR grades for industrial and manufacturing customers, with specification discipline, dependable supply and traceable natural rubber sourcing.",
    question: "What is block rubber / TSR?",
    definitionTerm: "What is block rubber / TSR?",
    definitionText:
      "Block rubber, including Technically Specified Rubber (TSR), is natural rubber processed into standardized blocks classified by technical specification, used as a consistent input for industrial and tyre manufacturing.",
  },
  copper: {
    metaTitle: "Copper Commodity Trading",
    metaDescription:
      "VRV Global supports copper-related trade flows for electrification, infrastructure, manufacturing and energy-transition markets through responsible sourcing and supply chain discipline.",
    question: "What is copper used for?",
    definitionTerm: "What is copper used for?",
    definitionText:
      "Copper is a highly conductive industrial metal used in electrical infrastructure, construction, manufacturing, transport and energy-transition applications such as grids, renewables and electric mobility.",
  },
  aluminium: {
    metaTitle: "Aluminium Supply & Trading",
    metaDescription:
      "VRV Global works across aluminium supply relationships for transport, construction, packaging and industrial manufacturing, with quality-led sourcing and responsible trade practices.",
    question: "What is aluminium used for?",
    definitionTerm: "What is aluminium used for?",
    definitionText:
      "Aluminium is a lightweight, corrosion-resistant metal used in transport, construction, packaging and industrial manufacturing where strength-to-weight and recyclability matter.",
  },
  lead: {
    metaTitle: "Lead Industrial Metal Trading",
    metaDescription:
      "VRV Global supports lead trade for batteries, specialty manufacturing and industrial applications, with compliance-led sourcing and responsible handling.",
    question: "What is lead used for?",
    definitionTerm: "What is lead used for?",
    definitionText:
      "Lead is a dense industrial metal used in batteries, specialty manufacturing, shielding and selected alloy applications.",
  },
  zinc: {
    metaTitle: "Zinc Industrial Metal Supply",
    metaDescription:
      "VRV Global supports zinc supply for galvanization, alloys, die-casting and industrial production through quality discipline and responsible sourcing.",
    question: "What is zinc used for?",
    definitionTerm: "What is zinc used for?",
    definitionText:
      "Zinc is an industrial metal used primarily for galvanization to protect steel from corrosion, as well as in alloys, die-casting and other industrial applications.",
  },
  "silico-ferro-manganese": {
    metaTitle: "Silico-Manganese & Ferro-Manganese",
    metaDescription:
      "VRV Global supports trade in silico-manganese and ferro-manganese — manganese alloys used as essential inputs in steelmaking — through trusted supplier relationships and quality-led execution.",
    question: "What are silico-manganese and ferro-manganese used for?",
    definitionTerm: "What are silico-manganese and ferro-manganese?",
    definitionText:
      "Silico-manganese and ferro-manganese are manganese alloys used as deoxidizing and alloying inputs in steelmaking and metallurgical production.",
  },
  "industrial-precious-metals": {
    metaTitle: "Industrial & Precious Metals Mining Ventures",
    metaDescription:
      "VRV Global's mining segment focuses on industrial and precious metals across Tanzania and Zambia, with a copper and gold focus and responsible, disciplined project development.",
    question: "What is VRV Global's mining focus?",
    definitionTerm: "What are industrial and precious metals?",
    definitionText:
      "Industrial metals (such as copper) support infrastructure, manufacturing and electrification, while precious metals (such as gold) hold long-term market value. VRV Global's mining ventures pursue both through responsible development.",
  },
};
