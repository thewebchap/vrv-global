/**
 * Ethics & Governance content — policy cards, governance principles, supplier
 * expectations and FAQs. Careful, non-legalistic wording; no certifications or
 * unsupported claims. Used by the About page section and the dedicated
 * /ethics-governance page.
 */
import type { IconName } from "@/components/ui/Icon";

export type PolicyCard = { title: string; description: string; icon: IconName };

export const policyCards: PolicyCard[] = [
  {
    title: "Code of Conduct",
    description:
      "Defines the ethical principles, professional standards, and conduct expectations that guide VRV Global's people and business relationships.",
    icon: "doc",
  },
  {
    title: "Responsible Sourcing Policy",
    description:
      "Outlines VRV Global's approach to supplier engagement, origin visibility, responsible procurement, and sustainability-led sourcing practices.",
    icon: "leaf",
  },
  {
    title: "Trade Compliance & Sanctions",
    description:
      "Supports responsible cross-border trade through counterparty screening, sanctions awareness, documentation discipline, and compliance-led execution.",
    icon: "scale",
  },
  {
    title: "Anti-Bribery & Anti-Corruption",
    description:
      "Sets expectations for integrity, fair dealing, anti-bribery controls, and ethical engagement with customers, suppliers, public officials, and partners.",
    icon: "shield",
  },
  {
    title: "Supplier Grievance & Escalation",
    description:
      "Provides a structured approach for raising, reviewing, and escalating supplier, sourcing, or conduct-related concerns.",
    icon: "users",
  },
  {
    title: "Data, Traceability & Records",
    description:
      "Supports accurate record keeping, traceability readiness, documentation control, and responsible handling of supply chain information.",
    icon: "qr",
  },
];

export type Principle = { title: string; body: string };

export const principles: Principle[] = [
  { title: "Integrity", body: "Conduct business with honesty, fairness, accountability, and respect for applicable laws and stakeholder expectations." },
  { title: "Accountability", body: "Define clear responsibilities across sourcing, trade execution, supplier engagement, documentation, and escalation processes." },
  { title: "Responsible Sourcing", body: "Engage suppliers and partners with a focus on origin visibility, ethical procurement, environmental awareness, and long-term value creation." },
  { title: "Transparency", body: "Maintain accurate records, clear documentation, and traceability-ready information across commodity flows where data is available." },
  { title: "Compliance", body: "Support trade execution through counterparty diligence, sanctions awareness, anti-bribery controls, and documentation discipline." },
  { title: "Continuous Improvement", body: "Strengthen policies, processes, supplier engagement, and sustainability practices over time as the business grows." },
];

export const supplierExpectations: string[] = [
  "Legal and regulatory compliance",
  "Anti-bribery and anti-corruption",
  "Sanctions and counterparty diligence",
  "Responsible sourcing practices",
  "Accurate documentation and record keeping",
  "Respect for communities and workers",
  "Environmental awareness",
  "Cooperation with traceability and audit requests",
];

export const governanceFaqs: { q: string; a: string }[] = [
  {
    q: "What is VRV Global's ethics and governance approach?",
    a: "VRV Global's ethics and governance framework is designed to support responsible business conduct across global commodity supply chains — covering supplier engagement, sourcing discipline, trade compliance, anti-bribery expectations, documentation practices, grievance escalation, and traceability readiness.",
  },
  {
    q: "How does VRV Global approach responsible sourcing?",
    a: "VRV Global engages suppliers and partners with a focus on origin visibility, ethical procurement and environmental awareness. Its governance approach is designed to support responsible sourcing and traceability readiness across selected commodity flows where data is available.",
  },
  {
    q: "What does supplier accountability mean for VRV?",
    a: "VRV Global expects suppliers and partners to act with integrity, comply with applicable laws, support responsible sourcing, maintain accurate documentation, and cooperate with reasonable due diligence and traceability requests.",
  },
  {
    q: "How does VRV handle trade compliance?",
    a: "VRV Global's trade compliance expectations are designed to support lawful, ethical trade execution — covering counterparty awareness, sanctions sensitivity, documentation discipline, fair dealing, and anti-bribery controls.",
  },
  {
    q: "How can someone raise a governance concern?",
    a: "Concerns related to sourcing, supplier conduct, compliance, documentation or ethical business conduct can be raised through the governance enquiry at /contact?type=governance. Concerns are reviewed responsibly, escalated where appropriate, and handled with confidentiality where possible.",
  },
];
