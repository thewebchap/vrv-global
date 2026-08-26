import { PageBanner } from "@/components/sections/PageBanner";
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
      <PageBanner
        eyebrow="Case studies"
        title="Case Studies"
        subtitle="Supply-chain examples showing how VRV Global connects sourcing, processing, documentation, traceability and market access across commodity flows."
        imageSrc="/pictures/Home page - Agro products.png"
        imageAlt="Natural rubber tapping processing and cuplumps representing commodity case studies"
        imagePosition="center"
      />

      <Section tone="white">
        <CaseStudiesExplorer studies={studies} />
      </Section>
    </>
  );
}
