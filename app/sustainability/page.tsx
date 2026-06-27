import { PageHero } from "@/components/sections/PageHero";
import { ESGPillars } from "@/components/sections/ESGPillars";
import { CircularLoop } from "@/components/sections/CircularLoop";
import { TraceabilityFlow } from "@/components/sections/TraceabilityFlow";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { KPIGrid } from "@/components/ui/FeatureCard";
import { TickList } from "@/components/ui/TickList";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { EntitySummary } from "@/components/seo/EntitySummary";
import { Definitions } from "@/components/seo/Definitions";
import { quickAnswers, sustainabilityDefinitions } from "@/data/aeo";
import { images } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import {
  esgPillars,
  esgMetrics,
  supplyChainFramework,
  reports,
  supplierCode,
} from "@/lib/esg";

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

      {/* Quick answer + entity summary (AEO/GEO) */}
      <Section tone="white" className="!pb-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuickAnswer question={quickAnswers.sustainability.question} answer={quickAnswers.sustainability.answer} />
          <EntitySummary links={[{ label: "Explore products", href: "/products" }, { label: "Strategic ventures", href: "/ventures" }]} />
        </div>
        <div className="mt-10">
          <Eyebrow>Key terms</Eyebrow>
          <Definitions items={sustainabilityDefinitions} className="mt-5" />
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
            <Media
              src={images.sustainability.src}
              alt={images.sustainability.alt}
              label="Responsible sourcing & sustainable trade"
              ratio="4/3"
              overlay
              rounded="rounded-2xl"
              className="shadow-card"
            />
          </Reveal>
        </div>
      </Section>

      {/* 2 — ESG Strategy / Pillars */}
      <Section tone="paper" id="esg" className="scroll-mt-24">
        <SectionHeading
          eyebrow="ESG strategy"
          title="A clear framework across Environment, Social and Governance"
          intro="Our ESG strategy turns intent into operating discipline — measurable environmental action, genuine social engagement at origin, and transparent, audit-ready governance across the trade lifecycle."
          align="center"
        />
        <div className="mt-12">
          <ESGPillars />
        </div>
      </Section>

      {/* 3 — Governance deep-dive band */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="Governance in depth"
          tone="white"
          title="Ethics, compliance and transparent reporting"
          intro="Strong governance is the foundation of investor and partner confidence. We operate to institutional standards across conduct, compliance and risk."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {esgPillars
            .find((p) => p.key === "governance")
            ?.points.map((point, i) => (
              <Reveal as="div" key={point} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <span aria-hidden className="inline-block h-2 w-2 rotate-45 bg-amber" />
                  <p className="mt-4 text-[15px] font-medium leading-relaxed text-white/85">
                    {point}
                  </p>
                </div>
              </Reveal>
            ))}
        </div>
      </Section>

      {/* 4 — Sustainable Supply Chain Framework */}
      <Section tone="white" id="framework" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Framework"
          title="A sustainable supply chain, end to end"
          intro="Every consignment follows the same disciplined journey — so responsibility and traceability are evidenced from source to reuse."
        />
        <div className="mt-12">
          <TraceabilityFlow />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {supplyChainFramework.map((s, i) => (
            <Reveal as="div" key={s.step} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-soft">
                <span className="font-serif text-2xl text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-medium text-ink">{s.step}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — Circular Economy */}
      <Section tone="paper" id="circular" className="scroll-mt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <CircularLoop />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Circular economy</Eyebrow>
            <h2 className="mt-5 text-h2 text-balance">
              Keeping valuable materials in productive use
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/65 text-pretty">
              We trade recycled metals and recovered materials, design lower-waste logistics,
              and build circular flows that return end-of-life materials to industry. The result
              is reduced embodied carbon, less waste and resilient supply for our buyers.
            </p>
            <TickList
              className="mt-7"
              items={[
                "Recycled metals — recovered copper, aluminium and ferrous scrap.",
                "Lower-waste logistics and consolidated, lower-impact flows.",
                "Recovered materials returned to productive use through recycle and remanufacture loops.",
              ]}
            />
            <div className="mt-8">
              <Button href="/products#circular" variant="royal" withArrow>
                Explore circular economy products
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6 — Reporting & Metrics */}
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

      {/* 7 — ESG Reports download area */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="ESG reports"
          title="Download our ESG & governance library"
          intro="Each report below is a placeholder slot, ready for an approved PDF to be uploaded before launch."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r, i) => (
            <Reveal as="div" key={r.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <Icon name="doc" />
                  </span>
                  <span className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-ink/60">
                    {r.type}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium text-ink">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">{r.note}</p>
                <span
                  aria-disabled="true"
                  className="mt-6 inline-flex cursor-not-allowed items-center gap-2 self-start rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink/40"
                >
                  Download
                  <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink/50">
          Downloads are disabled until approved documents are uploaded.
        </p>
      </Section>

      {/* 8 — Supplier Code of Conduct */}
      <Section tone="white">
        <div className="rounded-3xl border border-line bg-eco-soft p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow>Supplier code of conduct</Eyebrow>
              <h2 className="mt-5 text-h2 text-balance">
                Clear expectations across our supplier network
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink/65 text-pretty">
                Every supplier is held to a code spanning legal compliance, human rights,
                environmental standards and traceability cooperation — supported by audit access
                and continuous improvement.
              </p>
              <span
                aria-disabled="true"
                className="mt-7 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink/40"
              >
                Download full code [Upload Supplier Code of Conduct PDF]
                <Icon name="doc" className="h-4 w-4" />
              </span>
            </div>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-soft">
              <TickList items={supplierCode} />
            </div>
          </div>
        </div>
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
