import type { Metadata } from "next";
import { HeroVideoBackground } from "@/components/home/HeroVideoBackground";
import { ProductEcosystem } from "@/components/sections/ProductEcosystem";
import { SupplyChainOperatingModel } from "@/components/sections/SupplyChainOperatingModel";
import { GlobeSection } from "@/components/map/globe/GlobeSection";
import { CaseStudiesAndNews } from "@/components/home/CaseStudiesAndNews";
import { StatCards } from "@/components/sections/StatCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TickList } from "@/components/ui/TickList";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commodity Supply Chains for Rubber, Metals & Mining",
  description:
    "VRV Global is a Singapore-headquartered commodity supply-chain company connecting agro commodities, industrial metals and mining-linked ventures through responsible sourcing, disciplined execution and traceability-ready systems.",
  alternates: { canonical: site.url },
};

const leadershipPoints = [
  "Rubber and agro-origin expertise",
  "Industrial metals and mining experience",
  "Trade finance and logistics discipline",
  "Sustainability and traceability innovation",
  "Technology-led supply-chain visibility",
];

const sustainabilityPoints = [
  "Responsible sourcing and supplier engagement",
  "Traceability-ready documentation and chain-of-custody records",
  "ESG data capture where data is available",
  "Sustainable natural rubber and ethical sourcing",
  "Technology-enabled supply-chain visibility",
];

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero (full-bleed video background + rotating headlines) */}
      <HeroVideoBackground />

      {/* 2 — About VRV */}
      <Section tone="white" id="main-content" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About VRV"
              title="About VRV"
              intro="A Singapore-headquartered commodity supply-chain platform built around rubber, metals, mining, sustainability and innovation."
            />
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-ink/70">
              <p>
                VRV Global connects origin supply, processing partners and customer markets across agro commodities,
                industrial metals and mining-linked ventures. With a strong emphasis on natural rubber, responsible
                sourcing, quality discipline and traceability-ready systems, VRV is building a supply-chain platform
                designed for modern commodity markets.
              </p>
              <p>
                The company&apos;s leadership brings deep practical experience across rubber, metals, sourcing, logistics,
                trade finance, sustainability and technology. This cross-domain expertise is central to VRV&apos;s ability to
                operate across products, geographies and supply-chain stages with discipline and accountability.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/about" variant="primary" withArrow>About VRV Global</Button>
              <Button href="/products" variant="link">Explore our products</Button>
            </div>
          </div>

          {/* Leadership USP block */}
          <Reveal>
            <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft sm:p-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name="users" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-ink">Leadership Built Across Commodities and Technology</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                VRV&apos;s leadership combines origin relationships, processing capability, industrial demand and
                traceability-led innovation within one integrated platform.
              </p>
              <TickList className="mt-6" items={leadershipPoints} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 3 — Products Ecosystem */}
      <Section tone="paper" bordered>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Products ecosystem"
            title="Agro products, industrial metals and mining"
            intro="Three connected segments — each backed by responsible sourcing, quality discipline and a traceability roadmap."
          />
          <Button href="/products" variant="outline" className="shrink-0">All products</Button>
        </div>
        <div className="mt-12">
          <ProductEcosystem />
        </div>
      </Section>

      {/* 4 — Global Footprint (3D globe — kept as-is) */}
      <section className="relative overflow-hidden bg-ink-900 py-20 lg:py-24">
        <span aria-hidden className="pointer-events-none absolute inset-0 route-pattern-ink opacity-40" />
        <span aria-hidden className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ocean/20 blur-3xl" />
        <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="order-1">
            <p className="eyebrow !text-gold">Global footprint</p>
            <h2 className="mt-5 text-h2 text-white text-balance">Global Footprint</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/65 text-pretty">
              A Singapore-based platform connected to origin, sourcing and customer markets across agro commodities,
              metals and mining-linked opportunities.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
              From Singapore, VRV Global coordinates a diversified network of sourcing and customer relationships across
              Asia, Africa, Europe, the Middle East and the Americas. The globe highlights purchase and sales
              geographies as a clean global-presence map — not specific shipment routes.
            </p>
            <StatCards tone="dark" className="mt-9 max-w-xl" />
          </div>

          <div className="order-2">
            <GlobeSection />
          </div>
        </div>
      </section>

      {/* 5 — Integrated Operating Model */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Operating model"
          title="Integrated Operating Model"
          intro="VRV's integrated model connects sourcing, processing, trade structuring, quality checks, logistics, documentation and traceability across commodity flows."
        />
        <div className="mt-14">
          <SupplyChainOperatingModel />
        </div>
      </Section>

      {/* 6 — Sustainability & Traceability */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Sustainability & traceability"
              title="Sustainability & Traceability"
              intro="VRV Global integrates responsible sourcing, supplier engagement, traceability-ready documentation and sustainability thinking across agro commodities, metals and mining-linked supply chains. The focus is on building commodity flows that are more transparent, accountable and future-ready."
            />
            <div className="mt-8">
              <Button href="/sustainability" variant="primary" withArrow>Our sustainability approach</Button>
            </div>
          </div>
          <Reveal>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-label text-brand">Where we focus</p>
              <TickList className="mt-5" items={sustainabilityPoints} />
              <p className="mt-6 border-t border-line pt-5 text-[13px] leading-relaxed text-ink/50">
                VRV builds traceability-ready supply chains designed to support ESG data capture where data is available.
                We do not claim full certification or complete traceability unless confirmed.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7 — Case Studies + News & Insights (compact bipartite block) */}
      <CaseStudiesAndNews />
    </>
  );
}
