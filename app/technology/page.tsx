import { PageHero } from "@/components/sections/PageHero";
import { TraceabilityFlow } from "@/components/sections/TraceabilityFlow";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { TickList } from "@/components/ui/TickList";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { images } from "@/lib/images";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Technology & Traceability — Transparent Supply Chains",
  description:
    "VRV Global builds material traceability into every flow — a traceable supply chain with end-to-end supply chain visibility and audit-ready ESG data for buyers, lenders and investors.",
  path: "/technology",
});

const capabilities: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Digital supplier onboarding",
    body: "Structured KYC, due diligence and supplier records captured digitally from day one.",
  },
  {
    icon: "route",
    title: "Material origin records",
    body: "Verified provenance for every consignment, tying material back to a responsible source.",
  },
  {
    icon: "truck",
    title: "Shipment tracking",
    body: "Logistics milestones and custody events tracked across the journey to destination.",
  },
  {
    icon: "chart",
    title: "ESG data collection",
    body: "Environmental and social data captured at source for audit-ready ESG reporting.",
  },
  {
    icon: "doc",
    title: "Audit trails",
    body: "Immutable, time-stamped records that let buyers and lenders verify every claim.",
  },
  {
    icon: "factory",
    title: "Documentation workflows",
    body: "Trade, quality and compliance documents standardised and centralised end to end.",
  },
  {
    icon: "qr",
    title: "Product-level traceability",
    body: "Granular tracking down to the product, ready for QR-based provenance lookups.",
  },
  {
    icon: "leaf",
    title: "Carbon & impact data readiness",
    body: "Structured to capture carbon and impact metrics as reporting standards mature.",
  },
];

const architecture: { label: string; icon: IconName; note: string }[] = [
  { label: "Supplier", icon: "users", note: "Onboarding & KYC" },
  { label: "Origin Data", icon: "route", note: "Verified provenance" },
  { label: "Logistics", icon: "truck", note: "Shipment & custody" },
  { label: "Processing", icon: "factory", note: "Transformation records" },
  { label: "Buyer", icon: "handshake", note: "Delivery & assurance" },
  { label: "ESG Reporting", icon: "chart", note: "Audit-ready data" },
];

const roadmap: { title: string; body: string; tag: string }[] = [
  {
    title: "Blockchain-ready traceability",
    body: "An architecture designed to anchor custody events to tamper-evident, distributed records.",
    tag: "[Roadmap]",
  },
  {
    title: "QR-based product records",
    body: "Scannable provenance and ESG data at the product level for buyers and end customers.",
    tag: "[Roadmap]",
  },
  {
    title: "ESG data dashboards",
    body: "Live dashboards turning captured data into clear environmental and social insight.",
    tag: "[Roadmap]",
  },
  {
    title: "Investor reporting dashboards",
    body: "Curated views giving investors transparent, real-time visibility into ESG performance.",
    tag: "[Roadmap]",
  },
  {
    title: "Supplier scorecards",
    body: "Performance and risk scoring to drive continuous improvement across the network.",
    tag: "[Roadmap]",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & Traceability"
        title="Visibility from source to reuse"
        intro="We invest in technology that makes supply chains transparent, accountable and audit-ready — giving buyers, lenders and investors material traceability and supply chain visibility they can trust."
        crumbs={[{ label: "Technology & Traceability" }]}
      />

      {/* 1 — Why traceability matters */}
      <Section tone="white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Why traceability matters</Eyebrow>
            <h2 className="mt-5 text-h2 text-balance">
              Trust is built on evidence, not assertion
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/65 text-pretty">
              In global trade, claims about origin, quality and responsibility are only as strong
              as the evidence behind them. Our technology captures that evidence at every step —
              turning a traceable supply chain into a competitive advantage and a foundation for
              ESG data, compliance and investor confidence.
            </p>
            <TickList
              className="mt-7"
              items={[
                "End-to-end supply chain visibility from source to reuse.",
                "Audit-ready documentation that stands up to buyer and lender scrutiny.",
                "Structured ESG data captured where it originates.",
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Media
              src={images.traceability.src}
              alt={images.traceability.alt}
              label="Technology-enabled supply chain traceability"
              ratio="4/3"
              overlay
              rounded="rounded-2xl"
              className="shadow-card"
            />
          </Reveal>
        </div>
      </Section>

      {/* 2 — Capabilities grid */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Capabilities"
          title="A traceability platform across the trade lifecycle"
          intro="Each capability captures the data and documentation that make supply chains transparent, accountable and audit-ready."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal as="div" key={c.title} delay={(i % 4) * 0.06}>
              <FeatureCard icon={c.icon} title={c.title} className="h-full">
                {c.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3a — Architecture diagram (dark band for contrast) */}
      <Section tone="ink" className="bg-eco">
        <SectionHeading
          eyebrow="Architecture"
          tone="white"
          title="How data flows through the chain"
          intro="From supplier onboarding to ESG reporting, every stage feeds a single, connected record."
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-11 lg:items-stretch">
          {architecture.map((node, i) => (
            <div key={node.label} className="contents">
              <Reveal as="div" delay={i * 0.06} className="lg:col-span-2">
                <div className="flex h-full flex-col rounded-xl border border-white/15 bg-white/[0.06] p-5 text-center">
                  <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-gold">
                    <Icon name={node.icon} />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-white">{node.label}</p>
                  <p className="mt-1 text-xs leading-snug text-white/55">{node.note}</p>
                </div>
              </Reveal>
              {i < architecture.length - 1 && (
                <div
                  aria-hidden
                  className="flex items-center justify-center lg:col-span-1"
                >
                  <Icon
                    name="arrowRight"
                    className="h-5 w-5 rotate-90 text-gold/70 lg:rotate-0"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 3b — Complementary journey flow */}
      <Section tone="white">
        <SectionHeading
          eyebrow="The traceability journey"
          title="Source → Verify → Move → Track → Report → Recycle"
          intro="A complementary view of the same discipline, framed as the lifecycle journey each consignment follows."
        />
        <div className="mt-12">
          <TraceabilityFlow />
        </div>
      </Section>

      {/* 4 — Future-ready technology / roadmap */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Future-ready"
          title="A technology roadmap built for what's next"
          intro="We are progressively extending our platform. The items below are forward-looking and clearly marked as roadmap."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((r, i) => (
            <Reveal as="div" key={r.title} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
                <span className="inline-flex w-fit items-center rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-gold-700">
                  {r.tag}
                </span>
                <h3 className="mt-4 text-lg font-medium text-ink">{r.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/60">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — How it supports investors & buyers */}
      <Section tone="white">
        <div className="rounded-3xl border border-line bg-eco-soft p-8 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>For investors & buyers</Eyebrow>
              <h2 className="mt-5 text-h2 text-balance">
                Traceability is the bridge from data to confidence
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink/65 text-pretty">
                When every claim is evidenced, buyers source with assurance and investors gain
                transparent visibility into ESG performance. Our traceability platform turns
                operational rigour into measurable trust — and trust into long-term value.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/ventures" variant="royal" withArrow>
                  Ventures & partnerships
                </Button>
                <Button href="/sustainability" variant="outline">
                  See our ESG approach
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Buyer assurance", "Verified origin, quality and custody for every consignment."],
                ["Lender confidence", "Documentation and audit trails that de-risk trade finance."],
                ["Investor visibility", "Structured ESG data ready for transparent reporting."],
                ["Operational rigour", "Standardised workflows across the trade lifecycle."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-xl border border-line bg-white p-6 shadow-soft"
                >
                  <span aria-hidden className="inline-block h-2 w-2 rotate-45 bg-amber" />
                  <h3 className="mt-4 text-base font-semibold text-ink">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6 — Final CTA */}
      <Section tone="ink">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="white">Build a transparent supply chain</Eyebrow>
          <h2 className="mt-5 text-h2 text-white text-balance">
            Talk to us about traceability for your supply chain
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/65 text-pretty">
            Whether you are sourcing responsibly, financing trade or investing for the long term,
            our technology makes the chain transparent and audit-ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary" withArrow>
              Get in touch
            </Button>
            <Button href="/sustainability" variant="outlineLight">
              Explore sustainability
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
