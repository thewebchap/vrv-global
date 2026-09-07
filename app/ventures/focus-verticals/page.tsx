import { Section, SectionHeading } from "@/components/ui/Section";
import { PageBanner } from "@/components/sections/PageBanner";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { focusIntro, ventureFocus } from "@/data/venturesContent";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Venture Focus Areas",
  description:
    "The core sectors VRV Ventures backs — Predictive Trade Ops (AI), Geospatial Traceability (DeepTech), Cross-Border Liquidity (Fintech), and Circular Materials (CleanTech).",
  path: "/ventures/focus-verticals",
});

const badgeTone: Record<string, string> = {
  brand: "bg-brand-50 text-brand",
  ocean: "bg-ocean-50 text-ocean",
  gold: "bg-gold/15 text-gold-700",
};

export default function FocusVerticalsPage() {
  return (
    <>
      <PageBanner
        eyebrow={focusIntro.eyebrow}
        title={focusIntro.title}
        subtitle="The sectors where we back founders building the software and hardware layers on top of VRV's physical commodity flows."
        imageSrc="/pictures/Traceability and Technology Page - Banner.jpg"
        imageAlt="Core venture sectors spanning AI, deep tech, fintech and clean tech"
        imagePosition="center"
      >
        <Button href="/ventures/pitch" variant="primary" size="lg" withArrow>Submit Venture Pitch</Button>
        <Button href="/ventures/trade-corridors" variant="outlineLight" size="lg">Explore Geo Rails</Button>
      </PageBanner>

      <Section tone="white">
        <SectionHeading eyebrow={focusIntro.eyebrow} title={focusIntro.title} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ventureFocus.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover">
                <div className="flex items-center gap-4">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${badgeTone[f.tone]}`}>
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-label ${badgeTone[f.tone]}`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium text-ink">{f.title}</h3>
                <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink/65">{f.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading
            eyebrow="Founders Portal"
            title="Backing founders across these verticals"
            intro="Applications are screened directly by our investment committee. You will receive an initial status within 10 business days."
          />
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href="/ventures/pitch" variant="primary" size="lg" withArrow>Submit Venture Pitch</Button>
            <Button href="/ventures" variant="outline" size="lg">Back to Ventures</Button>
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Ventures", path: "/ventures" },
            { name: "Venture Focus Areas", path: "/ventures/focus-verticals" },
          ]),
        ]}
      />
    </>
  );
}
