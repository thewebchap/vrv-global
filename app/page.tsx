import type { Metadata } from "next";
import Link from "next/link";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { ProductEcosystem } from "@/components/sections/ProductEcosystem";
import { TraceabilityFlow } from "@/components/sections/TraceabilityFlow";
import { SupplyChainOperatingModel } from "@/components/sections/SupplyChainOperatingModel";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { EntitySummary } from "@/components/seo/EntitySummary";
import { ProofBlocks } from "@/components/seo/ProofBlock";
import { DecisionPathCTA } from "@/components/seo/DecisionPathCTA";
import { Faq } from "@/components/seo/Faq";
import { quickAnswers, homeFaqs } from "@/data/aeo";
import { SingaporeHub } from "@/components/sections/SingaporeHub";
import { MarketSnapshot } from "@/components/market/MarketSnapshot";
import { GlobeSection } from "@/components/map/globe/GlobeSection";
import { StatCards } from "@/components/sections/StatCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { TickList } from "@/components/ui/TickList";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/lib/images";
import { investmentHighlights } from "@/lib/investors";
import { articles } from "@/lib/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sustainable Supply Chains for Global Trade",
  description:
    "VRV Global is a sustainability-led supply chain integrator connecting agro commodities, industrial metals, recycled metals and circular economy products through responsible sourcing, material traceability and ESG-aligned global trade.",
  alternates: { canonical: site.url },
};

export default function HomePage() {
  return (
    <>
      <HeroVideoBackground />

      {/* Quick answer + entity summary + proof blocks (AEO/GEO) */}
      <Section tone="white" id="main-content" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuickAnswer question={quickAnswers.home.question} answer={quickAnswers.home.answer} />
          <EntitySummary
            links={[
              { label: "Products", href: "/products" },
              { label: "Sustainability", href: "/sustainability" },
              { label: "Ventures", href: "/ventures" },
            ]}
          />
        </div>
        <div className="mt-6">
          <ProofBlocks />
        </div>
      </Section>

      {/* 2 — Sustainable Approach: 3 pillars */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Our sustainable approach"
          title="Three pillars of a responsible supply chain"
          intro="VRV Global is built to be a sustainable supply chain integrator — not a generic commodity trader. Responsibility, visibility and circularity are designed into how we source, move and deliver materials."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            { icon: "route" as const, title: "Sustainable Supply Chains", body: "Responsible sourcing across agro commodities, industrial metals and recycled materials — engaging suppliers and reducing impact at every stage." },
            { icon: "search" as const, title: "Traceability of Materials", body: "Visibility across origin, movement, processing and delivery, building audit-ready records that earn buyer and investor confidence." },
            { icon: "recycle" as const, title: "Circular Economy Solutions", body: "Supporting reuse, recycling and lower-waste material flows that displace virgin extraction and keep value in circulation." },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <FeatureCard icon={p.icon} title={p.title}>{p.body}</FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — Product Ecosystem */}
      <Section tone="paper">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Product ecosystem"
            title="Agro, metals and circular economy products"
            intro="A diversified portfolio spanning distinct demand cycles — each line backed by responsible sourcing, quality control and a traceability roadmap."
          />
          <Button href="/products" variant="outline" className="shrink-0">All products</Button>
        </div>
        <div className="mt-12">
          <ProductEcosystem />
        </div>
      </Section>

      {/* Cinematic global commodity network — 3D globe */}
      <section className="relative overflow-hidden bg-ink-900 py-20 lg:py-24">
        <span aria-hidden className="pointer-events-none absolute inset-0 route-pattern-ink opacity-40" />
        <span aria-hidden className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ocean/20 blur-3xl" />
        <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="order-1">
            <p className="eyebrow !text-gold">Global footprint</p>
            <h2 className="mt-5 text-h2 text-white text-balance">Global commodity flows, coordinated from Singapore</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/65 text-pretty">
              Headquartered in Singapore, VRV Global connects purchase and sales geographies across agro commodities
              and metals through responsible sourcing, traceability and long-term commercial relationships.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
              From Singapore, VRV Global coordinates a diversified network of agro commodity and metals relationships
              across Asia, Africa, Europe, the Middle East and the Americas. The globe highlights our purchase and sales
              geographies as a clean global-presence map — not specific shipment routes.
            </p>
            <StatCards tone="dark" className="mt-9 max-w-xl" />
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/products#footprint" variant="primary">Explore commodity network</Button>
              <Button href="/sustainability" variant="outlineLight">View sustainability approach</Button>
            </div>
          </div>

          <div className="order-2">
            <GlobeSection />
          </div>
        </div>
      </section>

      {/* 4 — The VRV Supply Chain Operating Model */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Operating model"
          title="The VRV Supply Chain Operating Model"
          intro="From origin relationships to customer markets, VRV Global connects sourcing, processing, quality, trade finance, logistics, traceability, and delivery."
        />
        <div className="mt-14">
          <SupplyChainOperatingModel />
        </div>
      </Section>

      {/* 5 — Case Study Highlight */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Media
            src={images.sustainableRubber.src}
            alt={images.sustainableRubber.alt}
            label="Responsible natural rubber supply chain"
            ratio="4/3"
            rounded="rounded-2xl"
            className="shadow-card"
          />
          <div>
            <p className="eyebrow">Case study</p>
            <h2 className="mt-5 text-h2 text-balance">Building a responsible natural rubber supply chain</h2>
            <div className="mt-6 space-y-4">
              {[
                ["Challenge", "Buyers increasingly require deforestation-free, traceable rubber that smallholder-based supply chains struggle to evidence."],
                ["VRV approach", "Structured supplier engagement, origin data capture and quality assurance from plantation through processing."],
                ["Traceability layer", "Chain-of-custody records and audit-ready documentation across the consignment journey."],
                ["Outcome", "A responsibly sourced, ESG-aligned rubber programme positioned for EUDR-style requirements. [Editable: quantify outcomes.]"],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-[15px] leading-relaxed text-ink/70">
                    <span className="font-semibold text-ink">{t}: </span>{d}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/products/natural-rubber" variant="primary">View case study</Button>
              <Button href="/news" variant="link">More case studies</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 6 — Ventures & partners */}
      <Section tone="ink">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeading
            tone="white"
            eyebrow="Ventures & partners"
            title="Strategic ventures for long-term value"
            intro="Beyond trading, VRV Global invests in ventures that strengthen supply chains, unlock new markets and build long-term value — working with strategic partners, investors and long-term counterparties."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {investmentHighlights.slice(0, 6).map((h) => (
              <div key={h.title} className="rounded-xl border border-white/12 bg-white/[0.03] p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />{h.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/ventures" variant="primary">Explore Strategic Ventures</Button>
          <Button href="/ventures#enquiry" variant="outlineLight">Partner with VRV</Button>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-white/40">
          VRV Global engages strategic partners, investors and long-term counterparties. Forward-looking venture details are confirmed before publication and do not constitute an offer or solicitation.
        </p>
      </Section>

      {/* 7 — Technology & Traceability */}
      <Section tone="white" bordered>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            eyebrow="Technology & traceability"
            title="Visibility from source to reuse"
            intro="We use technology to make supply chains transparent and accountable — supplier verification, material traceability, shipment visibility, ESG data capture and audit-ready records."
          />
          <TickList
            items={[
              "Digital supplier onboarding and verification",
              "Material origin and chain-of-custody records",
              "Shipment visibility and documentation workflows",
              "ESG data capture for audit-ready reporting",
            ]}
          />
        </div>
        <div className="mt-12">
          <TraceabilityFlow />
        </div>
        <div className="mt-8">
          <Button href="/technology" variant="link">Explore our technology &amp; traceability</Button>
        </div>
      </Section>

      {/* Live Market Snapshot */}
      <Section tone="white" bordered>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Live market snapshot"
            title="Market-aware commodity intelligence"
            intro="Indicative prices across rubber, metals and recycled materials — from SGX/SICOM and LME-referenced benchmarks. Connect a licensed feed for live data."
          />
          <Button href="/ventures" variant="outline" className="shrink-0">Explore Ventures</Button>
        </div>
        <div className="mt-12">
          <MarketSnapshot limit={6} />
        </div>
      </Section>

      {/* Singapore positioning */}
      <SingaporeHub />

      {/* Ask VRV — guided decision paths */}
      <Section tone="paper" bordered>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Ask VRV"
            title="Find the right product, venture, or partnership path"
            intro="Tell us what you need and we'll point you to the right page or team — for customers, partners, investors and AI agents."
          />
          <Button href="/ask-vrv" variant="primary" className="shrink-0" withArrow>Open Ask VRV</Button>
        </div>
        <div className="mt-10">
          <DecisionPathCTA title="" />
        </div>
      </Section>

      {/* 8 — News & Insights */}
      <Section tone="paper">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="News & insights"
            title="Sustainable supply-chain intelligence"
            intro="Professional commentary on responsible sourcing, commodity trends, metal recycling, the circular economy, ESG and governance."
          />
          <Button href="/news" variant="outline" className="shrink-0">All insights</Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              className="group flex flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 ease-out-soft hover:border-brand/40 hover:shadow-hover sm:p-7"
            >
              <span className="text-[11px] font-semibold uppercase tracking-label text-brand">{a.category}</span>
              <h3 className="mt-3 text-lg font-medium text-ink">{a.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/60">{a.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Read insight
                <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQs (AEO + FAQPage schema) */}
      <Section tone="white" bordered>
        <SectionHeading
          align="center"
          eyebrow="FAQs"
          title="Frequently asked questions"
          intro="Quick, factual answers about VRV Global — what we do, where we are based, and how to work with us."
        />
        <div className="mt-12">
          <Faq items={homeFaqs} idBase="home-faq" />
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-eco">
        <div className="container-x grid grid-cols-1 gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-center lg:py-20">
          <div>
            <h2 className="text-h2 text-white text-balance">Let&apos;s build sustainable supply chains together.</h2>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/70">
              Whether you are a buyer, supplier, partner or investor, the VRV Global team is ready to talk traceable, responsible and circular trade.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Button href="/contact" variant="primary" size="lg">Contact Us</Button>
            <Button href="/ventures" variant="outlineLight" size="lg">Partner with VRV</Button>
          </div>
        </div>
      </section>
    </>
  );
}
