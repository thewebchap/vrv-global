import { Home5Hero } from "@/components/home5/Home5Hero";
import { ProductEcosystem } from "@/components/sections/ProductEcosystem";
import { SupplyChainOperatingModel } from "@/components/sections/SupplyChainOperatingModel";
import { GlobeSection } from "@/components/map/globe/GlobeSection";
import { CaseStudiesAndNews } from "@/components/home/CaseStudiesAndNews";
import { StatCards } from "@/components/sections/StatCards";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Home Concept 5",
  description:
    "An alternate VRV Global homepage concept with a spacious scroll-driven hero — a banner image framed by a maritime ship route — above the standard homepage sections.",
  path: "/home5",
});

export default function Home5Page() {
  return (
    <>
      {/* Spacious scroll-driven hero (alternate concept). */}
      <Home5Hero />

      {/* Products ecosystem — reused homepage component. */}
      <Section tone="paper" bordered>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Products" title="A connected commodity ecosystem" intro="Agro commodities, industrial metals and a strategic mining platform — one integrated supply chain." />
          <Button href="/products" variant="outline" className="shrink-0">All products</Button>
        </div>
        <div className="mt-12">
          <ProductEcosystem />
        </div>
      </Section>

      {/* Global footprint — reused StatCards + GlobeSection. */}
      <section className="relative overflow-hidden bg-ink-900 py-20 lg:py-24">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow tone="white">Global footprint</Eyebrow>
            <h2 className="mt-5 text-h2 text-white text-balance">Coordinated from Singapore, connected to global markets</h2>
            <StatCards tone="dark" className="mt-9 max-w-xl" />
          </div>
          <GlobeSection />
        </div>
      </section>

      {/* Integrated operating model — reused homepage component. */}
      <Section tone="white" bordered>
        <SectionHeading eyebrow="How we operate" title="An integrated operating model" intro="From responsible sourcing to disciplined trade execution and delivery." align="center" />
        <div className="mt-12">
          <SupplyChainOperatingModel />
        </div>
      </Section>

      {/* Media & case studies — reused homepage component. */}
      <CaseStudiesAndNews />
    </>
  );
}
