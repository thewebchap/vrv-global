import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CaseStudiesExplorer } from "@/components/case-studies/CaseStudiesExplorer";
import { getPublishedCaseStudies } from "@/data/caseStudies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Case Studies",
  description:
    "Supply-chain examples showing how VRV Global connects sourcing, processing, documentation, traceability and market access across commodity flows.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const studies = getPublishedCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Case Studies"
        intro="Supply-chain examples showing how VRV Global connects sourcing, processing, documentation, traceability and market access across commodity flows."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
        ]}
      />

      <Section tone="white">
        <CaseStudiesExplorer studies={studies} />
      </Section>
    </>
  );
}
