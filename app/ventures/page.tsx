import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { VentureEnquiryForm } from "@/components/forms/VentureEnquiryForm";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { EntitySummary } from "@/components/seo/EntitySummary";
import { ProofBlocks } from "@/components/seo/ProofBlock";
import { CompanyResources } from "@/components/company/CompanyResources";
import { Faq } from "@/components/seo/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ventures, featuredVentures, ventureRegions } from "@/data/ventures";
import { quickAnswers, venturesFaqs } from "@/data/aeo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ventures — Strategic Supply Chain Growth",
  description:
    "VRV Global's ventures extend commodity trading into strategic projects, mining and resource-linked opportunities, natural rubber processing, circular economy materials, and sustainable supply chain growth across agro commodities and industrial metals.",
  path: "/ventures",
});

const venturesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "VRV Global Ventures",
  url: `${site.url}/ventures`,
  description:
    "Strategic growth ventures across mining, natural rubber processing, circular economy materials, regional expansion and supply chain infrastructure.",
};

export default function VenturesPage() {
  return (
    <>
      {/* 1 — Ventures hero */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.mining.src}
          alt="Strategic ventures across mining, resource development and sustainable supply chains"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: "center" }}
        />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/92 via-ink-900/72 to-ink-900/35" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-800/55 via-transparent to-transparent" />
        <div className="container-x py-24 lg:py-32">
          <p className="eyebrow !text-gold">Ventures</p>
          <h1 className="mt-4 max-w-3xl text-display text-white text-balance">Ventures Built for Long-Term Supply Chain Value</h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/75 text-pretty">
            VRV Global&apos;s ventures extend the company&apos;s commodity trading capabilities into strategic projects,
            upstream resource access, circular economy opportunities, and sustainable supply chain growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#focus" variant="primary" size="lg" withArrow>Explore Venture Focus Areas</Button>
            <Button href="#enquiry" variant="outlineLight" size="lg">Partner with VRV</Button>
          </div>
        </div>
      </section>

      {/* Quick answer + entity summary + proof (AEO/GEO) */}
      <Section tone="white" className="!pb-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuickAnswer question={quickAnswers.ventures.question} answer={quickAnswers.ventures.answer} />
          <EntitySummary links={[{ label: "Explore products", href: "/products" }, { label: "Sustainability", href: "/sustainability" }]} />
        </div>
        <div className="mt-6">
          <ProofBlocks />
        </div>
      </Section>

      {/* 2 — Strategic growth thesis */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Strategic growth thesis"
            title="From Commodity Trade to Strategic Supply Chain Ventures"
            intro="VRV Global's venture strategy is built around disciplined expansion from commodity trade into origin-linked, infrastructure-enabled, and sustainability-led opportunities. These ventures are designed to strengthen supply security, deepen market access, and create long-term value across agro commodities, industrial metals, mining, and circular economy materials."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: "spark" as const, t: "Upstream integration", d: "Move from trade toward origin-linked resource access and supply security." },
              { icon: "factory" as const, t: "Value-added processing", d: "Processing, tolling and quality capability that add value to commodity flows." },
              { icon: "recycle" as const, t: "Circular opportunities", d: "Recovered and recycled material flows that lower waste and embodied carbon." },
              { icon: "handshake" as const, t: "Partnerships", d: "Strategic partners, investors and long-term counterparties." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-line bg-paper p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{c.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3 — Venture portfolio / focus areas */}
      <Section id="focus" tone="paper" bordered className="scroll-mt-24">
        <SectionHeading
          eyebrow="Venture portfolio"
          title="Focus areas"
          intro="Strategic venture areas drawn from VRV's ventures direction — metal and resource ventures, rubber processing, and sustainable, circular supply chain solutions."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ventures.map((v, i) => (
            <Reveal key={v.slug} delay={i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover">
                <Media src={v.image} alt={v.imageAlt} label={v.title} ratio="16/9" rounded="rounded-none" imgClassName="transition-transform duration-500 ease-out-soft group-hover:scale-105" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-brand">
                      <Icon name={v.icon} className="h-4 w-4" />{v.segment}
                    </span>
                    <span className="rounded-full bg-ocean-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ocean">{v.status}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-ink">{v.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/60">{v.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {v.focus.slice(0, 4).map((f) => (
                      <li key={f} className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] font-medium text-ink/65">{f}</li>
                    ))}
                  </ul>
                  <Link href={`/ventures/${v.slug}`} className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
                    Explore venture
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — Featured ventures */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Featured ventures"
          title="Geography-led venture initiatives"
          intro="Specific venture initiatives across our resource and processing geographies. Project specifics are marked for confirmation before publishing."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featuredVentures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand">{f.segment}</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-ink/60">
                    <Icon name="globe" className="h-3.5 w-3.5 text-ocean" />{f.geography}
                  </span>
                  <span className="ml-auto rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-700">{f.status}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl text-ink">{f.title}</h3>
                <p className="mt-1 text-[13px] font-medium text-brand">Focus: {f.focus}</p>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink/65">{f.description}</p>
                <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-ink/55">
                  <Icon name="leaf" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{f.sustainability}
                </p>
                <Link href={f.href} className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
                  View venture
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — Regional focus */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="Regional focus"
          title="Where our ventures are focused"
          intro="Coordinated from Singapore, VRV's ventures focus on African resource geographies and Asian markets, with project specifics confirmed before publishing."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ventureRegions.map((r) => (
            <div key={r.region} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean-50 text-ocean">
                <Icon name="globe" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-lg text-ink">{r.region}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-ink/55">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6 — Sustainability & traceability link */}
      <Section tone="white" bordered>
        <div className="rounded-2xl bg-eco-soft p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-soft">
              <Icon name="leaf" className="h-7 w-7" />
            </span>
            <div>
              <p className="eyebrow">Sustainability & traceability</p>
              <h2 className="mt-4 text-h2 text-balance">Ventures grounded in responsible, traceable supply chains</h2>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/75">
                Every venture is evaluated through the lens of responsible sourcing, traceability and long-term value —
                from responsible resource development and origin-linked rubber processing to circular, lower-waste material flows.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/sustainability" variant="royal" withArrow>Our sustainability approach</Button>
                <Button href="/technology" variant="outline" withArrow>Technology &amp; traceability</Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7 — Partnership model */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Partnership model"
            title="Built with strategic partners, investors and long-term counterparties"
            intro="VRV develops ventures through disciplined partnerships — combining capital with operational expertise to create scalable, responsible solutions across the supply chain."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { t: "Strategic partners", d: "Producers, processors and infrastructure partners across the chain." },
              { t: "Investors", d: "Long-term capital aligned with disciplined, sustainability-led growth." },
              { t: "Counterparties", d: "Reliable offtake and supply relationships across geographies." },
              { t: "Operational expertise", d: "Sourcing, quality, finance, logistics and traceability capability." },
            ].map((p) => (
              <div key={p.t} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />{p.t}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CompanyResources tone="white" />

      {/* FAQs (AEO + FAQPage schema) */}
      <Section tone="paper" bordered>
        <SectionHeading
          align="center"
          eyebrow="FAQs"
          title="Questions about VRV's ventures"
          intro="Clear answers about VRV Global's strategic ventures, mining focus and partnership opportunities."
        />
        <div className="mt-12">
          <Faq items={venturesFaqs} idBase="ventures-faq" />
        </div>
      </Section>

      {/* 8 — Ventures enquiry CTA */}
      <Section id="enquiry" tone="white" bordered className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow="Ventures & partnership enquiry"
            title="Explore a Venture Partnership with VRV"
            intro="Connect with VRV Global to discuss strategic ventures, upstream opportunities, supply chain partnerships, and long-term value creation across agro commodities, industrial metals, mining, and circular economy materials."
          />
          <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft sm:p-9">
            <VentureEnquiryForm />
          </div>
        </div>
      </Section>

      <JsonLd data={[venturesSchema, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Ventures", path: "/ventures" }])]} />
    </>
  );
}
