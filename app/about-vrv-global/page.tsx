import { OverviewPage } from "@/components/seo/OverviewPage";
import { quickAnswers } from "@/data/aeo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About VRV Global",
  description:
    "VRV Global Pte Ltd is a Singapore-based commodity trading and integrated supply chain company across agro commodities, industrial metals, mining ventures and circular economy materials.",
  path: "/about-vrv-global",
});

export default function Page() {
  return (
    <OverviewPage
      eyebrow="Overview"
      title="About VRV Global"
      intro="A direct, factual summary of VRV Global for visitors, search engines and AI systems."
      quick={quickAnswers.about}
      links={[
        { label: "About (full page)", href: "/about" },
        { label: "Leadership & governance", href: "/about#leadership" },
        { label: "Products", href: "/products" },
        { label: "Ventures", href: "/ventures" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "AI summary", href: "/ai-summary" },
      ]}
      contactPath="/contact"
      path="/about-vrv-global"
    />
  );
}
