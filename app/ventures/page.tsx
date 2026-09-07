import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageBanner } from "@/components/sections/PageBanner";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  venturesHero,
  ventureMetrics,
  corridorsIntro,
  tradeCorridors,
  focusIntro,
  ventureFocus,
  pitchIntro,
} from "@/data/venturesContent";
import { site } from "@/lib/site";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "VRV Ventures",
  description:
    "VRV Ventures backs early-stage founders merging AI intelligence with ground-truth physical commodity infrastructure across Africa, Asia, and global liquidity hubs.",
  path: "/ventures",
});

const venturesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "VRV Ventures",
  url: `${site.url}/ventures`,
  description:
    "Institutional VC and physical incubation backing early-stage founders merging AI with physical commodity infrastructure across trade corridors in Africa, Asia and global liquidity hubs.",
};

export default function VenturesPage() {
  return (
    <>
      {/* 1 — Hero */}
      <PageBanner
        eyebrow={venturesHero.eyebrow}
        title={venturesHero.title}
        subtitle={venturesHero.sub}
        imageSrc="/pictures/Ventures Page - Banner.jpg"
        imageAlt="Global physical trade and technology infrastructure representing VRV Ventures"
        imagePosition="right center"
      >
        <Button href="/ventures/pitch" variant="primary" size="lg" withArrow>Submit Venture Pitch</Button>
        <Button href="/ventures/trade-corridors" variant="outlineLight" size="lg">Explore Geo Rails</Button>
      </PageBanner>

      {/* 2 — Metric cards */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ventureMetrics.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-paper p-7 shadow-soft">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={m.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-tight text-ink">{m.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink/60">{m.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — Trade Corridors preview */}
      <Section tone="paper" bordered>
        <SectionHeading eyebrow={corridorsIntro.eyebrow} title={corridorsIntro.title} intro={corridorsIntro.lead} />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tradeCorridors.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <Link
                href={`/ventures/trade-corridors#${c.id}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover"
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${c.accent}1a`, color: c.accent }}
                >
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">{c.title}</h3>
                <p className="mt-1 text-[13px] font-semibold text-brand">{c.subtitle}</p>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink/60">{c.heading}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
                  View corridor
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/ventures/trade-corridors" variant="royal" withArrow>Explore all trade corridors</Button>
        </div>
      </Section>

      {/* 4 — Venture Focus Areas preview */}
      <Section tone="white" bordered>
        <SectionHeading eyebrow={focusIntro.eyebrow} title={focusIntro.title} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ventureFocus.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <FeatureCard icon={f.icon} title={f.title} tone={f.tone} className="h-full">
                <span className="mb-3 inline-flex w-fit rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-label text-brand">
                  {f.badge}
                </span>
                <br />
                {f.description}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/ventures/focus-verticals" variant="outline" withArrow>See all focus areas</Button>
        </div>
      </Section>

      {/* 5 — Pitch CTA (preserves #enquiry anchor for contact-page link) */}
      <Section id="enquiry" tone="paper" bordered className="scroll-mt-24">
        <div className="overflow-hidden rounded-3xl bg-ink-900 p-8 text-white sm:p-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_auto] lg:items-center">
            <div>
              <p className="eyebrow !text-gold">{pitchIntro.eyebrow}</p>
              <h2 className="mt-4 text-h2 text-white text-balance">{pitchIntro.title}</h2>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/70">{pitchIntro.lead}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/ventures/pitch" variant="primary" size="lg" withArrow>Submit Venture Pitch</Button>
              <Button href="/ventures/focus-verticals" variant="outlineLight" size="lg">Focus Verticals</Button>
            </div>
          </div>
        </div>
      </Section>

      <JsonLd data={[venturesSchema, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Ventures", path: "/ventures" }])]} />
    </>
  );
}
