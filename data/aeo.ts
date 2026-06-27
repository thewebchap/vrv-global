/**
 * AEO/GEO content — factual Quick Answers, FAQs and definitions reused across
 * pages. Answers are concise (≈40–70 words), direct and verifiable; no invented
 * certifications, prices, volumes or claims.
 */
import type { FaqItem } from "@/components/seo/Faq";
import type { DefinitionItem } from "@/components/seo/Definitions";

/* ── Quick answers (per page) ─────────────────────────────────────────── */
export const quickAnswers = {
  home: {
    question: "What does VRV Global do?",
    answer:
      "VRV Global is a Singapore-based commodity trading and integrated supply chain company operating across agro commodities, natural rubber, industrial metals, mining ventures, and circular economy materials. The company focuses on responsible sourcing, traceability, reliable trade execution, and long-term supply chain value.",
  },
  about: {
    question: "Who is VRV Global?",
    answer:
      "VRV Global Pte Ltd is a Singapore-based commodity trading and integrated supply chain company established in 2012. It works across agro commodities, natural rubber, industrial metals, mining ventures and circular economy materials, with a focus on responsible sourcing, traceability and long-term partnerships.",
  },
  products: {
    question: "What products does VRV Global trade?",
    answer:
      "VRV Global trades across three segments: agro commodities (natural rubber cuplumps and block rubber / TSR), industrial metals (copper, aluminium, zinc, lead, silico-manganese and ferro-manganese), and mining ventures spanning industrial and precious metals — all through responsible sourcing and disciplined trade execution.",
  },
  sustainability: {
    question: "How does VRV Global approach sustainability?",
    answer:
      "VRV Global integrates sustainability into how commodities are sourced, moved and delivered — through responsible sourcing, material traceability from origin to destination, supplier engagement, and circular, lower-waste material flows across agro commodities and industrial metals.",
  },
  ventures: {
    question: "What are VRV Global's ventures?",
    answer:
      "VRV Global's ventures are strategic growth initiatives beyond core trading — spanning mining and resource ventures, natural rubber processing, circular economy materials, regional expansion and supply chain infrastructure — designed to strengthen supply security and create long-term value with partners and investors.",
  },
  contact: {
    question: "How can I contact VRV Global?",
    answer:
      "You can reach VRV Global through the contact form, submit a product RFQ for grades, volumes and Incoterms, or send a ventures and partnership enquiry. The Singapore-based team responds with availability, documentation and commercial terms across agro commodities, metals and ventures.",
  },
} as const;

/* ── FAQs (per page) ──────────────────────────────────────────────────── */
export const homeFaqs: FaqItem[] = [
  {
    q: "What is VRV Global?",
    a: "VRV Global Pte Ltd is a Singapore-based commodity trading and integrated supply chain company. It operates across agro commodities, natural rubber, block rubber / TSR, industrial metals, mining ventures and circular economy materials, focusing on responsible sourcing, traceability and long-term supply chain partnerships.",
  },
  {
    q: "Where is VRV Global based?",
    a: "VRV Global is headquartered in Singapore, a neutral, well-regulated global trade hub. From Singapore it coordinates sourcing and sales geographies across Asia, Africa, the Middle East, Europe and the Americas.",
  },
  {
    q: "What commodities does VRV Global work with?",
    a: "VRV Global works across agro commodities — including natural rubber cuplumps and block rubber / TSR — and industrial metals such as copper, aluminium, zinc, lead and manganese alloys. It also pursues mining ventures and circular economy materials such as recycled metals.",
  },
  {
    q: "Does VRV Global focus on sustainability?",
    a: "Yes. Sustainability is central to VRV Global's model. The company emphasises responsible sourcing, material traceability from origin to destination, and circular, lower-waste material flows across agro commodities and industrial metals.",
  },
  {
    q: "How can customers or partners contact VRV Global?",
    a: "Customers, suppliers, investors and strategic partners can reach VRV Global through the contact page, submit a product RFQ, or send a ventures and partnership enquiry. The team responds with grades, availability, documentation and commercial terms.",
  },
];

export const productsFaqs: FaqItem[] = [
  {
    q: "What products does VRV Global trade?",
    a: "VRV Global trades across three segments: agro commodities (natural rubber cuplumps and block rubber / TSR), industrial metals (copper, aluminium, zinc, lead, silico-manganese and ferro-manganese), and mining ventures spanning industrial and precious metals.",
  },
  {
    q: "Does VRV Global supply natural rubber and cuplumps?",
    a: "Yes. Natural rubber is a core product. VRV Global supports cuplump sourcing and early-stage aggregation through origin relationships, quality consistency and responsible, traceable movement from producing regions to global markets.",
  },
  {
    q: "What is block rubber / TSR?",
    a: "Block rubber, including Technically Specified Rubber (TSR) grades, is standardized natural rubber for industrial and manufacturing use. VRV Global focuses on specification discipline, dependable supply and traceable sourcing across natural rubber markets.",
  },
  {
    q: "What industrial metals does VRV Global work with?",
    a: "VRV Global works with copper, aluminium, zinc and lead, along with manganese alloys (silico-manganese and ferro-manganese) and other industrial metals, supplied through responsible sourcing and disciplined trade execution.",
  },
  {
    q: "Does VRV Global work with copper, aluminium, zinc, and lead?",
    a: "Yes. Copper, aluminium, zinc and lead are all part of VRV Global's industrial metals segment, supporting electrification, construction, manufacturing, galvanization, batteries and other industrial applications.",
  },
  {
    q: "What are silico-manganese and ferro-manganese used for?",
    a: "Silico-manganese and ferro-manganese are manganese alloys used as essential inputs in steelmaking and metallurgical applications, acting as deoxidizing and alloying materials in steel production.",
  },
];

export const sustainabilityFaqs: FaqItem[] = [
  {
    q: "How does VRV Global approach sustainability?",
    a: "VRV Global integrates sustainability into how commodities are sourced, moved and delivered — through responsible sourcing, material traceability, supplier engagement and circular, lower-waste material flows across agro commodities and industrial metals.",
  },
  {
    q: "What does responsible sourcing mean for VRV Global?",
    a: "Responsible sourcing means engaging suppliers and origins so materials are produced and handled to credible environmental, social and compliance standards — supporting deforestation-conscious agro sourcing and responsibly sourced metals.",
  },
  {
    q: "How does VRV Global support traceability?",
    a: "VRV Global works toward visibility across origin, movement, processing and delivery, building audit-ready records and chain-of-custody documentation so material claims can be evidenced from origin to destination.",
  },
  {
    q: "What is VRV Global's approach to circular economy materials?",
    a: "VRV Global supports recovered and recycled material flows — including recycled metals — that keep materials in productive use, lower embodied carbon and improve resource efficiency across industrial supply chains.",
  },
  {
    q: "Does VRV Global publish ESG or sustainability reports?",
    a: "VRV Global's reporting is designed to support alignment with recognised frameworks such as GRI, CDP and the UN SDGs. Specific reports and disclosures are published as they are finalised, with placeholders clearly marked before publication.",
  },
];

export const venturesFaqs: FaqItem[] = [
  {
    q: "What are VRV Global's ventures?",
    a: "VRV Global's ventures are strategic growth initiatives beyond core trading — spanning mining and resource ventures, natural rubber processing, circular economy materials, regional expansion and supply chain infrastructure — designed to strengthen supply security and long-term value.",
  },
  {
    q: "What is the purpose of VRV's mining ventures?",
    a: "VRV Global's mining ventures extend the business upstream into resource-linked opportunities across industrial and precious metals, strengthening origin access and long-term supply security with disciplined, compliance-led project development.",
  },
  {
    q: "Which geographies are relevant to VRV's mining focus?",
    a: "VRV Global's mining focus centres on African resource geographies, with Tanzania and Zambia identified as key regions. Specific project details are confirmed before publication.",
  },
  {
    q: "What is VRV's focus in Tanzania and Zambia?",
    a: "Tanzania and Zambia are strategic resource geographies for VRV Global's upstream and mining strategy, with a focus on copper and gold and on industrial and precious metals. Project specifics are marked for confirmation before publishing.",
  },
  {
    q: "How can strategic partners engage with VRV?",
    a: "Strategic partners, investors and long-term counterparties can engage VRV Global through the ventures and partnership enquiry, to discuss upstream opportunities, supply chain partnerships and long-term value creation.",
  },
];

/* ── Definitions (AI-friendly) ────────────────────────────────────────── */
export const productDefinitions: DefinitionItem[] = [
  { term: "What is natural rubber?", text: "Natural rubber is a renewable raw material made from the latex of rubber trees, valued for its elasticity, resilience and strength. It is widely used in tyres, industrial and medical products." },
  { term: "What are cuplumps?", text: "Cuplumps are a primary form of natural rubber collected at origin — coagulated latex gathered from tapped rubber trees — before further processing into standardized grades." },
  { term: "What is block rubber / TSR?", text: "Block rubber, including Technically Specified Rubber (TSR), is natural rubber processed into standardized blocks classified by technical specification, used as a consistent input for industrial and tyre manufacturing." },
  { term: "What are circular economy materials?", text: "Circular economy materials are recovered and recycled materials — such as recycled metals — kept in productive use to reduce waste, lower embodied carbon and improve resource efficiency." },
];

export const sustainabilityDefinitions: DefinitionItem[] = [
  { term: "What is responsible sourcing?", text: "Responsible sourcing is the practice of procuring materials in ways that meet credible environmental, social and compliance standards, through supplier engagement and origin diligence." },
  { term: "What is supply chain traceability?", text: "Supply chain traceability is the ability to track a material's journey across origin, movement, processing and delivery, supported by documentation and chain-of-custody records." },
  { term: "What are circular economy materials?", text: "Circular economy materials are recovered and recycled materials kept in productive use to reduce waste, lower embodied carbon and improve resource efficiency across industrial supply chains." },
];
