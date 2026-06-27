import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ventures, getVenture } from "@/data/ventures";
import { VentureEnquiryForm } from "@/components/forms/VentureEnquiryForm";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const v = getVenture(params.slug);
  if (!v) return { title: "Venture not found" };
  const url = `${site.url}/ventures/${v.slug}`;
  const fullTitle = `${v.title} | ${site.name}`;
  return {
    title: v.title,
    description: v.summary,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: v.summary,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: v.image, alt: v.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: v.summary },
  };
}

/** Default enquiry type to pre-select on the subpage form. */
const enquiryTypeFor: Record<string, string> = {
  mining: "Mining venture",
  "natural-rubber-processing": "Natural rubber processing",
  "circular-economy": "Circular economy materials",
  "regional-expansion": "Regional expansion",
  "supply-chain-infrastructure": "Supply chain partnership",
};

export default function VentureDetailPage({ params }: { params: { slug: string } }) {
  const venture = getVenture(params.slug);
  if (!venture) notFound();

  const related = ventures.filter((v) => v.slug !== venture.slug).slice(0, 3);

  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Ventures", path: "/ventures" },
    { name: venture.title, path: `/ventures/${venture.slug}` },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      {/* 1 — Hero */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={venture.image}
          alt={venture.imageAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: "center" }}
        />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/92 via-ink-900/72 to-ink-900/35" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-800/55 via-transparent to-transparent" />
        <div className="container-x py-24 lg:py-32">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/70">
            <Link href="/ventures" className="hover:text-gold">Ventures</Link>
            <span className="px-2 text-white/35">/</span>
            <span className="text-white/90">{venture.title}</span>
          </nav>
          <p className="mt-6 eyebrow !text-gold">{venture.segment} venture</p>
          <h1 className="mt-4 max-w-3xl text-display text-white text-balance">{venture.title}</h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/75 text-pretty">{venture.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#enquiry" variant="primary" size="lg" withArrow>Partner with VRV</Button>
            <Button href="/ventures" variant="outlineLight" size="lg">All ventures</Button>
          </div>
        </div>
      </section>

      {/* 2 — Overview */}
      <Section tone="white">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Overview" title={`${venture.title} at VRV Global`} />
          <p className="mt-6 text-[19px] leading-relaxed text-ink/75 text-pretty">{venture.overview}</p>
          {venture.confirm && (
            <p className="mt-6 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-[13px] leading-relaxed text-gold-700">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
              This is a forward-looking venture. Specific project details, geographies, ownership and status are marked
              <span className="font-semibold"> [Confirm before publishing]</span> until formally approved for disclosure.
            </p>
          )}
        </div>
      </Section>

      {/* 3 — Strategic rationale */}
      <Section tone="paper" bordered>
        <SectionHeading eyebrow="Strategic rationale" title="Why this venture" />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {venture.rationale.map((r, i) => (
            <Reveal as="li" key={r} delay={i * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-white p-5 shadow-soft">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-[15px] leading-relaxed text-ink/75">{r}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 4 — Geography / market relevance */}
      <Section tone="white" bordered>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Media src={venture.image} alt={venture.imageAlt} label={venture.title} ratio="4/3" rounded="rounded-2xl" className="shadow-card" />
          </Reveal>
          <Reveal>
            <SectionHeading eyebrow="Geography & market relevance" title="Where this venture is focused" intro={venture.marketRelevance} />
            <div className="mt-6 flex flex-wrap gap-2">
              {venture.geography.map((g) => (
                <span key={g} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/70">
                  <Icon name="globe" className="h-4 w-4 text-ocean" />{g}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {venture.focus.map((f) => (
                <span key={f} className="rounded-full border border-brand/25 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand">{f}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — Sustainability & traceability relevance */}
      <Section tone="paper" bordered>
        <div className="rounded-2xl bg-eco-soft p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-soft">
              <Icon name="leaf" className="h-7 w-7" />
            </span>
            <div>
              <p className="eyebrow">Sustainability & traceability</p>
              <h2 className="mt-4 text-h2 text-balance">Responsible, traceable and built for the long term</h2>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/75">{venture.sustainabilityRelevance}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 6 — Current status */}
      <Section tone="white" bordered>
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-paper p-7 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="eyebrow no-flourish">Current status</p>
            <h3 className="mt-2 font-serif text-2xl text-ink">{venture.status}</h3>
          </div>
          <span className="rounded-full bg-gold/15 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-gold-700">
            Details [Confirm before publishing]
          </span>
        </div>
      </Section>

      {/* 7 — Partnership opportunity */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Partnership opportunity" title="Work with VRV on this venture" intro={venture.partnership} />
          <div className="rounded-2xl border border-line bg-white p-7 shadow-soft">
            <p className="text-[15px] leading-relaxed text-ink/70">
              VRV combines capital with operational expertise across sourcing, quality, finance, logistics and
              traceability to develop ventures responsibly with strategic partners, investors and long-term counterparties.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Sourcing", "Quality", "Finance", "Logistics", "Traceability"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand">
                  <Icon name="check" className="h-4 w-4" />{c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <p className="eyebrow no-flourish">More ventures</p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/ventures/${r.slug}`} className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-hover">
                  <span className="text-[11px] font-semibold uppercase tracking-label text-brand">{r.segment}</span>
                  <span className="mt-2 font-serif text-lg text-ink group-hover:text-brand">{r.title}</span>
                  <span className="mt-2 flex-1 text-[14px] leading-snug text-ink/55">{r.summary}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Explore venture
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* 8 — CTA / enquiry */}
      <Section id="enquiry" tone="white" bordered className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow="Ventures & partnership enquiry"
            title="Explore a Venture Partnership with VRV"
            intro="Connect with VRV Global to discuss strategic ventures, upstream opportunities, supply chain partnerships, and long-term value creation across agro commodities, industrial metals, mining, and circular economy materials."
          />
          <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft sm:p-9">
            <VentureEnquiryForm defaultType={enquiryTypeFor[venture.slug]} />
          </div>
        </div>
      </Section>
    </>
  );
}
