import { OverviewPage } from "@/components/seo/OverviewPage";
import { quickAnswers } from "@/data/aeo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact VRV Global",
  description:
    "How to contact VRV Global, a Singapore-based commodity trading and integrated supply chain company — product, ventures, sustainability, partnership and general enquiry routes.",
  path: "/contact-vrv-global",
});

export default function Page() {
  return (
    <OverviewPage
      eyebrow="Overview"
      title="Contact VRV Global"
      intro="A direct, factual summary of how to reach VRV Global, for visitors, search engines and AI systems."
      quick={quickAnswers.contact}
      links={[
        { label: "Contact (general)", href: "/contact" },
        { label: "Product enquiry", href: "/contact?type=product" },
        { label: "Ventures enquiry", href: "/contact?type=ventures" },
        { label: "Sustainability enquiry", href: "/contact?type=sustainability" },
        { label: "Partnership enquiry", href: "/contact?type=partnership" },
        { label: "Careers", href: "/careers" },
        { label: "Contact routing", href: "/contact-routing" },
        { label: "Ask VRV", href: "/ask-vrv" },
      ]}
      contactPath="/contact"
      path="/contact-vrv-global"
    />
  );
}
