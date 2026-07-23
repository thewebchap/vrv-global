import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { KPIGrid } from "@/components/ui/FeatureCard";
import { TickList } from "@/components/ui/TickList";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { EntitySummary } from "@/components/seo/EntitySummary";
import { Definitions } from "@/components/seo/Definitions";
import { TraceabilityVideo } from "@/components/sustainability/TraceabilityVideo";
import { ThreeCTriadVisual } from "@/components/sustainability/ThreeCTriadVisual";
import { quickAnswers, sustainabilityDefinitions } from "@/data/aeo";
import { pageMeta } from "@/lib/seo";
import { esgPillars, esgMetrics } from "@/lib/esg";

/** Icon per ESG pillar (Environment / Social / Governance). */
const esgPillarIcon: Record<string, IconName> = {
  environment: "tree",
  social: "users",
  governance: "scale",
};

export const metadata = pageMeta({
  title: "Sustainability & ESG — Responsible, Traceable Supply Chains",
  description:
    "VRV Global puts ESG investing principles at the heart of trade: a green supply chain built on responsible sourcing, circular economy material flows and an audit-ready ESG reporting supply chain.",
  path: "/sustainability",
});

const commitmentPoints = [
  "Responsible sourcing with supplier due diligence and deforestation-free focus.",
  "Material traceability from origin through processing, custody and reuse.",
  "Circular economy flows that recover recycled metals and reduce embodied carbon.",
  "Transparent, audit-ready ESG governance and reporting for investors and partners.",
];

const faqs = [
  {
    q: "Is VRV Global's supply chain traceable?",
    a: "Yes. We build material traceability into every flow — from responsible origin sourcing and supplier KYC, through logistics and processing custody, to ESG data capture and audit-ready documentation. Our Sustainable Supply Chain Framework follows a Source → Verify → Move → Track → Report → Recycle journey so every consignment can be evidenced end to end.",
  },
  {
    q: "How does VRV support the circular economy?",
    a: "We trade recycled metals and recovered materials, design lower-waste logistics, and return end-of-life materials to productive use through recover, recycle and remanufacture loops. This reduces embodied carbon and keeps valuable materials in circulation rather than landfill.",
  },
  {
    q: "Does VRV publish ESG reports?",
    a: "We are building an audit-ready ESG reporting supply chain. Our reporting and metrics dashboard and downloadable report library (ESG, sustainability, governance and responsible sourcing policies) are structured to be populated with verified figures and approved PDFs ahead of publication.",
  },
  {
    q: "How does sustainability create long-term value?",
    a: "Responsible sourcing, traceability and strong ESG governance lower counterparty, reputational and compliance risk, strengthen buyer and lender confidence, and align VRV with the expectations of ESG investing — supporting durable, long-term value creation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SustainabilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="Sustainability"
        title="Sustainability at the core of how we trade"
        intro="We integrate responsible sourcing, material traceability, circular economy flows and ESG governance into every supply chain — building a green supply chain that creates long-term value for partners, investors and the communities we source from."
        crumbs={[{ label: "Sustainability" }]}
      />

      {/* Sustainability Policy Overview — VRV's impact statement (immediately after the header).
          NOTE: the body wording below is supplied verbatim and must not be edited
          (spelling, punctuation and "its"/"Commodities deal" are intentional). */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Text — first on mobile, left on desktop */}
          <div className="order-1">
            <p className="text-sm font-semibold text-brand">VRV&rsquo;s ESG Program</p>
            <h2 className="mt-3 text-h2 text-balance">VRV&rsquo;s Sustainability Policy Overview</h2>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-label text-gold-700">
              3C = COMPREHENSIVE
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Company", "Community", "Commodities"].map((c) => (
                <span key={c} className="rounded-full border border-line bg-white px-3.5 py-1 text-[13px] font-semibold text-ink/75">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[16.5px] leading-relaxed text-ink/70 text-pretty">
              At Corporate level we strive to implement the best practices of sustainability including reduce, reuse and
              recycle. VRV encourages our stakeholders to be sustainability ambassadors in every walk of life. With the
              Commodities deal by VRV we have initiated concrete steps to ensure our sourcing and supply chain activities
              are gradually progressing towards sustainable practices and policies laid out by the Company. With our
              supplier community and buyer community, we have initiated several discussions to impart, educate and also
              convert the existing product lines and practices towards sustainable structures. Though its a long road, VRV
              is determined to walk with conviction. VRV has also earmarked specific support via our VRV Ventures
              initiative. All are welcome to join us.
            </p>
          </div>

          {/* 3C triad visual — second on mobile, right on desktop */}
          <div className="order-2">
            <ThreeCTriadVisual />
          </div>
        </div>
      </Section>

      {/* 1 — Commitment */}
      <Section tone="white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Our commitment</Eyebrow>
            <h2 className="mt-5 text-h2 text-balance">
              Sustainability is not an add-on — it is the operating standard
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/65 text-pretty">
              VRV Global is a sustainability-led supply chain integrator. We connect agro
              commodities, industrial metals, recycled metals and circular economy products
              through responsible sourcing, traceability and ESG governance — so growth and
              responsibility advance together.
            </p>
            <TickList className="mt-7" items={commitmentPoints} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/technology" variant="royal" withArrow>
                Explore our traceability technology
              </Button>
              <Button href="/ventures" variant="outline">
                Ventures & partners
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <TraceabilityVideo />
          </Reveal>
        </div>
      </Section>

      {/* Quick answer + entity summary + key terms (AEO/GEO) */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuickAnswer question={quickAnswers.sustainability.question} answer={quickAnswers.sustainability.answer} />
          <EntitySummary links={[{ label: "Explore products", href: "/products" }, { label: "Strategic ventures", href: "/ventures" }]} />
        </div>
        <div className="mt-10">
          <Eyebrow>Key terms</Eyebrow>
          <Definitions items={sustainabilityDefinitions} className="mt-5" />
        </div>
      </Section>

      {/* 2 — ESG Strategy / Pillars — dark, premium treatment */}
      <Section tone="ink" id="esg" className="scroll-mt-24">
        <SectionHeading
          eyebrow="ESG strategy"
          tone="white"
          title="A clear framework across Environment, Social and Governance"
          intro="Our ESG strategy turns intent into operating discipline — measurable environmental action, genuine social engagement at origin, and transparent, audit-ready governance across the trade lifecycle."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {esgPillars.map((p, i) => (
            <Reveal as="div" key={p.key} delay={i * 0.08}>
              <div
                id={p.key}
                className="scroll-mt-24 flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-gold ring-1 ring-white/10">
                  <Icon name={esgPillarIcon[p.key]} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-white">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{p.intro}</p>
                <TickList tone="white" className="mt-5" items={p.points} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — Reporting & Metrics */}
      <Section tone="white" id="reports" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Reporting & metrics"
          title="ESG performance, transparently reported"
          intro="Our reporting dashboard is structured to be populated with verified figures. The metrics below are editable placeholders pending audited data."
        />
        <div className="mt-12">
          <KPIGrid items={esgMetrics} cols={3} />
        </div>
        <p className="mt-6 text-sm text-ink/50">
          Note: metrics shown are editable placeholders and will be replaced with verified ESG
          figures before publication.
        </p>
      </Section>

      {/* FAQ */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="FAQ"
          title="Sustainability & ESG questions"
          intro="Common questions from investors, buyers and partners about how we operate responsibly."
        />
        <div className="mt-10 grid max-w-3xl gap-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-line bg-white p-5 shadow-soft open:border-brand/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-ink marker:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="shrink-0 text-brand transition-transform duration-200 group-open:rotate-45"
                >
                  <Icon name="arrowRight" className="h-5 w-5 rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="white">Partner with a responsible integrator</Eyebrow>
          <h2 className="mt-5 text-h2 text-white text-balance">
            Build traceable, ESG-aligned supply chains with VRV Global
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/65 text-pretty">
            Whether you are investing in ESG-aligned trade or sourcing responsibly at scale, our
            sustainability-led model is built for long-term value creation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/ventures" variant="primary" withArrow>
              Ventures & partners
            </Button>
            <Button href="/contact" variant="outlineLight">
              Talk to our team
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
