import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { AutoMovingGrowthLedger } from "@/components/sections/AutoMovingGrowthLedger";
import { AboutGrowthMetrics } from "@/components/sections/AboutGrowthMetrics";
import { FounderSpotlight } from "@/components/sections/FounderSpotlight";
import { companyStats } from "@/data/companyStats";
import { journeyMilestones } from "@/data/journey";
import { aboutGroupImages } from "@/data/companyImages";
import { leadershipTeam } from "@/data/leadershipTeam";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { EntitySummary } from "@/components/seo/EntitySummary";
import { CompanyResources } from "@/components/company/CompanyResources";
import { quickAnswers } from "@/data/aeo";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Us — Connecting Markets, People & Planet",
  description:
    "VRV Global is a diversified trading house connecting agri-commodities and metals across Asia, Africa and beyond — delivering reliable, integrated and sustainable supply chains since 2012.",
  path: "/about",
});

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${site.name}`,
  url: `${site.url}/about`,
  description:
    "About VRV Global — a sustainability-led supply chain integrator connecting agro commodities, industrial metals and circular economy products through responsible sourcing, material traceability and ESG.",
  about: {
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    foundingDate: site.founded,
    url: site.url,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <PageHero
        eyebrow="Company"
        title="Connecting Markets, People, and Planet — The VRV Way"
        intro="VRV Global is a diversified trading house connecting agri-commodities and metals across Asia, Africa and beyond — combining experienced traders, customer insight and sourcing expertise to deliver reliable, integrated supply chains."
        crumbs={[{ label: "About" }]}
      />

      {/* Quick answer + entity summary (AEO/GEO) */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuickAnswer question={quickAnswers.about.question} answer={quickAnswers.about.answer} />
          <EntitySummary links={[{ label: "Leadership team", href: "/about#leadership" }, { label: "Ventures", href: "/ventures" }]} />
        </div>
      </Section>

      {/* A Decade of Responsible Growth — premium metrics band */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="By the numbers"
          title="A Decade of Responsible Growth"
          intro="Since 2012, VRV Global has grown from a Singapore-based trading business into a diversified agro commodities and metals supply chain company serving customers across global markets."
          align="center"
        />
        <div className="mt-12">
          <AboutGrowthMetrics stats={companyStats} variant="premium-band" />
        </div>
      </Section>

      {/* Mission & Vision — split manifesto (Build / Lead) */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Mission &amp; vision"
          title="Purpose Built for Responsible Global Trade"
          intro="VRV Global's mission and vision reflect a simple belief: global commodity flows can be more reliable, more transparent and more sustainable when supply chains are built with discipline and long-term partnership."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Mission */}
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[2rem] border border-brand-100 bg-eco-soft p-8 sm:p-10">
              <span aria-hidden className="pointer-events-none absolute inset-0 leaf-grid opacity-60" />
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-100/50 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-label text-brand">What drives us</p>
                <h3 className="mt-4 font-serif text-5xl font-semibold leading-none text-brand-700">Build</h3>
                <h4 className="mt-7 font-serif text-2xl text-ink">Mission</h4>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                  To create value through integrated, transparent and future-ready supply chains across agro
                  commodities and metals. VRV Global connects producers, processors and markets through responsible
                  sourcing, traceability and operational discipline — delivering reliable flows for customers while
                  building long-term value for partners and investors.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Vision */}
          <Reveal delay={0.08}>
            <article className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 p-8 text-white sm:p-10">
              <span aria-hidden className="pointer-events-none absolute inset-0 route-pattern-ink opacity-70" />
              <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ocean-700/40 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-label text-emerald-300">Where we are heading</p>
                <h3 className="mt-4 font-serif text-5xl font-semibold leading-none text-white">Lead</h3>
                <h4 className="mt-7 font-serif text-2xl text-white">Vision</h4>
                <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                  To become one of the most trusted sustainable supply chain partners in global trade, connecting
                  Asia, Africa and the world through resilient commodity networks. VRV Global aims to lead with
                  accountability, traceability and sustainable growth — creating consistent value across every link
                  of the supply chain.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* The VRV Growth Ledger — auto-moving growth flow (no timeline, no images) */}
      <Section tone="paper" bordered id="milestones" className="scroll-mt-24">
        <AutoMovingGrowthLedger milestones={journeyMilestones} />
      </Section>

      {/* Company story */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Our story"
          title="From commodity trade to an integrated, sustainable supply chain"
          intro="A growth story rooted in responsibility, traceability and long-term partnership."
        />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[48%_52%] lg:items-center lg:gap-14">
          <div className="max-w-prose space-y-5 text-[15px] leading-relaxed text-ink/70">
            <p>
              Founded in Singapore in 2012, VRV Global began as a cross-border commodity trading house, building
              durable relationships with producers, processors, financiers, logistics providers and buyers across
              multiple regions. From the outset, the ambition was to do more than move material — it was to make the
              flow of material dependable, transparent and responsible.
            </p>
            <p>
              Over more than a decade, the business has evolved from commodity trade into an integrated, sustainable
              supply chain company spanning agro commodities, industrial and recycled metals, and circular economy
              products. Rather than acting only as a seller, VRV Global coordinates sourcing, quality control,
              processing, trade finance, logistics and destination fulfilment — turning fragmented flows into reliable
              supply for serious counterparties.
            </p>
            <p>
              Responsible sourcing sits at the centre of how we operate. We work to understand the origin and
              conditions behind every material, and our material-traceability roadmap is steadily extending visibility
              across origin, movement, processing and delivery. A formalised ESG framework guides environmental,
              social and governance practice across the trade lifecycle.
            </p>
            <p>
              As we grow, our focus remains constant: integrate the supply chain, advance traceability and circularity,
              and create long-term value for partners, communities and stakeholders alike.
            </p>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-line bg-paper shadow-card">
              {/* object-contain + h-auto: the full landscape image is always visible, never cropped */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aboutGroupImages[1].src}
                alt={aboutGroupImages[1].alt}
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto max-h-[560px] w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Sustainability commitment band */}
      <Section tone="paper" bordered className="bg-eco-soft">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Sustainability commitment"
              title="ESG and traceability are core to our model"
              intro="We are committed to responsible sourcing, lower-waste and circular material flows, and transparent, accountable supply chains. Our ESG framework and material-traceability roadmap turn that commitment into practice — and technology makes it verifiable."
            />
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href="/sustainability" variant="royal" withArrow>
              Our sustainability approach
            </Button>
            <Button href="/technology" variant="outline" withArrow>
              Traceability &amp; technology
            </Button>
          </div>
        </div>
      </Section>

      {/* Leadership — founder, executives, directors */}
      <Section tone="white" id="leadership" className="scroll-mt-24">
        {/* Row 1 — Founder (large hero uses the main image) */}
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-label text-brand">Founder</p>
        <FounderSpotlight image={leadershipTeam.founder.mainImage} />

        {/* Row 2 — Executive Leadership */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Executive leadership"
            title="The executive team"
            intro="Names and titles are as published; bios and some focus areas are editable placeholders — replace with approved profiles before publishing."
            align="center"
          />
          <div className="mt-12">
            <LeadershipGrid members={leadershipTeam.executives} />
          </div>
        </div>

        {/* Row 3 — Directors */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Directors"
            title="Our directors"
            align="center"
          />
          <div className="mt-12">
            <LeadershipGrid members={leadershipTeam.directors} compact />
          </div>
        </div>
      </Section>

      <CompanyResources />

      {/* Final CTA */}
      <Section tone="ink">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Work &amp; partner with us"
            tone="white"
            title="Build the future of responsible trade with VRV Global"
            intro="Whether you are exploring a supply, sourcing or investment partnership, or want to join the team, we would welcome the conversation."
          />
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href="/sustainability" variant="primary" withArrow>
              Explore Our Sustainability Initiatives
            </Button>
            <Button href="/ventures" variant="outlineLight" withArrow>
              Ventures
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
