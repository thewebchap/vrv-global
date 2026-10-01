import { OverviewPage } from "@/components/seo/OverviewPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ventures Overview",
  description:
    "VRV Global's ventures: mining and resource ventures, natural rubber processing, circular economy materials, regional expansion and supply chain infrastructure.",
  path: "/ventures-overview",
});

export default function Page() {
  return (
    <OverviewPage
      eyebrow="Overview"
      title="Ventures Overview"
      intro="A direct, factual summary of VRV Global's strategic ventures, for visitors, search engines and AI systems."
      stat="10-Day SLA"
      statLabel="Venture submissions are screened for an initial status within 10 business days."
      links={[
        { label: "Ventures (full page)", href: "/ventures" },
        { label: "Mining & Resource Ventures", href: "/ventures/mining" },
        { label: "Natural Rubber Processing", href: "/ventures/natural-rubber-processing" },
        { label: "Circular Economy Materials", href: "/ventures/circular-economy" },
        { label: "Regional Expansion", href: "/ventures/regional-expansion" },
        { label: "Supply Chain Infrastructure", href: "/ventures/supply-chain-infrastructure" },
        { label: "Ventures JSON", href: "/ventures.json" },
      ]}
      contactPath="/contact?type=ventures"
      path="/ventures-overview"
    />
  );
}
