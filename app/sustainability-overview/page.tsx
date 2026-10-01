import { OverviewPage } from "@/components/seo/OverviewPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sustainability Overview",
  description:
    "VRV Global's sustainability approach: responsible sourcing, material traceability, supplier engagement and circular, lower-waste material flows across agro commodities and industrial metals.",
  path: "/sustainability-overview",
});

export default function Page() {
  return (
    <OverviewPage
      eyebrow="Overview"
      title="Sustainability Overview"
      intro="A direct, factual summary of VRV Global's sustainability and traceability approach."
      stat="25,000 Ha"
      statLabel="Deforestation-free natural rubber sourcing footprint across ASEAN and Africa."
      links={[
        { label: "Sustainability (full page)", href: "/sustainability" },
        { label: "Technology & traceability", href: "/technology" },
        { label: "Ventures", href: "/ventures" },
        { label: "Products", href: "/products" },
        { label: "Sustainability JSON", href: "/sustainability.json" },
      ]}
      contactPath="/contact?type=sustainability"
      path="/sustainability-overview"
    />
  );
}
