import { Section, SectionHeading } from "@/components/ui/Section";
import { PageBanner } from "@/components/sections/PageBanner";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { corridorsIntro, tradeCorridors } from "@/data/venturesContent";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Trade Corridors",
  description:
    "How VRV Ventures integrates physical field infrastructure with algorithmic operations across three primary corridors — Africa & LatAm origination, Southeast & South Asia processing, and Singapore & Western trade-finance hubs.",
  path: "/ventures/trade-corridors",
});

export default function TradeCorridorsPage() {
  return (
    <>
      <PageBanner
        eyebrow={corridorsIntro.eyebrow}
        title={corridorsIntro.title}
        subtitle={corridorsIntro.lead}
        imageSrc="/pictures/Ventures Page - Banner.jpg"
        imageAlt="Cross-border trade corridors linking origin, processing and settlement hubs"
        imagePosition="center"
      >
        <Button href="/ventures/pitch" variant="primary" size="lg" withArrow>Submit Venture Pitch</Button>
        <Button href="/ventures/focus-verticals" variant="outlineLight" size="lg">Venture Focus Areas</Button>
      </PageBanner>

      {/* Corridor quick-nav */}
      <Section tone="white" className="!py-10">
        <div className="flex flex-wrap gap-3">
          {tradeCorridors.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: c.accent }} />
              {c.title}
            </a>
          ))}
        </div>
      </Section>

      {/* Detailed corridors */}
      {tradeCorridors.map((c, i) => (
        <Section
          key={c.id}
          id={c.id}
          tone={i % 2 === 0 ? "paper" : "white"}
          bordered
          className="scroll-mt-24"
        >
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${c.accent}1a`, color: c.accent }}
                >
                  <Icon name={c.icon} className="h-7 w-7" />
                </span>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-label text-brand">Corridor {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-h2 text-balance">{c.title}</h2>
                <p className="mt-2 text-[17px] font-medium text-ink/70">{c.subtitle}</p>
                <span
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                  style={{ backgroundColor: `${c.accent}14`, color: c.accent }}
                >
                  <Icon name="check" className="h-3.5 w-3.5" />
                  {c.tag}
                </span>
              </div>

              <div className="rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-9">
                <h3 className="font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium text-ink">{c.heading}</h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70">{c.description}</p>
                <ul className="mt-7 space-y-4 border-t border-line pt-7">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/75">
                      <span
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${c.accent}1a`, color: c.accent }}
                      >
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>
      ))}

      {/* CTA */}
      <Section tone="white" bordered>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading
            eyebrow="Founders Portal"
            title="Building at the intersection of software and physical trade?"
            intro="If your venture layers AI, deep tech, fintech or clean tech onto one of these corridors, submit a pitch — applications are screened directly by our investment committee."
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
            { name: "Trade Corridors", path: "/ventures/trade-corridors" },
          ]),
        ]}
      />
    </>
  );
}
