"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TickList } from "@/components/ui/TickList";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CommodityPattern } from "@/components/products/CommodityDecor";

/**
 * MiningSection — the Mining Division block embedded INSIDE the Products page
 * (id="mining", so the /products#mining nav anchor still resolves). "Our Focus
 * Geographies" shows Tanzania (default) and Zambia as clickable cards; selecting
 * one swaps the detail sections below (never both at once). Content is exactly
 * as supplied (lightly polished); no figures are invented. Text is always in its
 * own block — never overlaid on the image cards. Key Terms still follows on the
 * Products page, outside this component.
 */
type CountryId = "tanzania" | "zambia";

const GOLD = "#B8955B";
const COPPER = "#B87333";

const IMG = {
  mine: "/pictures/Home Page - Mining.png",
  processing: "/pictures/Products Page/Products Page - Industrial Metals - Processing Plant.jpeg",
  trading: "/pictures/Products Page/Products Page - Industrial Metals.jpg",
  exploration: "/pictures/Products Page/Products Page - Industrial Metals - Mining.jpeg",
};

const COUNTRIES: Record<CountryId, {
  name: string;
  accent: string;
  number: string;
  numberLabel: string;
  details: [string, string][];
}> = {
  tanzania: {
    name: "Tanzania",
    accent: GOLD,
    number: "2",
    numberLabel: "mines",
    details: [
      ["Area", "250 Ha"],
      ["Type", "PML Licenses"],
      ["Facilities", "Mining, processing and trading"],
      ["Metals", "Precious metals"],
    ],
  },
  zambia: {
    name: "Zambia",
    accent: COPPER,
    number: "4",
    numberLabel: "exploration licenses",
    details: [
      ["Area", "~50,000 Ha"],
      ["Type", "Large Scale Exploration Licenses"],
      ["Facility", "Exploration office"],
      ["Metals", "Copper, precious metals, cobalt, rare earths"],
    ],
  },
};

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line shadow-[0_24px_60px_rgba(7,31,46,0.14)]">
      <div className="aspect-[4/3] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            const el = e.currentTarget;
            if (el.dataset.fb) return;
            el.dataset.fb = "1";
            el.src = "/pictures/Home Page - Mining.png";
          }}
        />
      </div>
    </div>
  );
}

/** One split detail block — text and image never overlap. */
function DetailBlock({
  index,
  eyebrow,
  title,
  bullets,
  image,
  imageAlt,
  imageSide,
  accent,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
  accent: string;
  children?: React.ReactNode;
}) {
  const imgFirst = imageSide === "left";
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn("order-2", imgFirst ? "lg:order-1" : "lg:order-2")}>
        <Reveal>
          <ImageCard src={image} alt={imageAlt} />
        </Reveal>
      </div>
      <div className={cn("order-1", imgFirst ? "lg:order-2" : "lg:order-1")}>
        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-semibold tabular-nums tracking-[0.2em]" style={{ color: accent }}>{index}</span>
            <span className="h-px w-8" style={{ backgroundColor: accent, opacity: 0.5 }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: accent }}>{eyebrow}</p>
          </div>
          <h3 className="mt-4 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-snug text-ink text-balance">{title}</h3>
          <TickList className="mt-6" items={bullets} />
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </div>
  );
}

function TanzaniaDetails() {
  return (
    <>
      <Section tone="white">
        <DetailBlock
          index="A"
          eyebrow="Tanzania"
          title="Mining Activities"
          image={IMG.mine}
          imageAlt="Precious-metals mine site with open-pit and earth-moving operations in Tanzania"
          imageSide="left"
          accent={GOLD}
          bullets={[
            "Estimated reserve of 200,000 oz.",
            "Full-scale exploration underway.",
            "High-prospect area in North Mara.",
            "Open-pit to underground mining operations.",
            "High standard of health and safety for our workers.",
            "Adequate earth-moving equipment to support mining.",
            "Supervised by experienced mining engineers.",
          ]}
        />
      </Section>

      <Section tone="paper">
        <DetailBlock
          index="B"
          eyebrow="Tanzania"
          title="Processing Plant"
          image={IMG.processing}
          imageAlt="Modern CIP precious-metals processing plant and laboratory facility"
          imageSide="right"
          accent={GOLD}
          bullets={[
            "Modern processing plant — CIP plant.",
            "Installed capacity of 50 MT per day.",
            "Second plant planned for 200 MT per day — CIL plant.",
            "End-to-end processing with a full-fledged TSF facility.",
            "Systemised storage and processing of materials.",
            "State-of-the-art laboratory for testing at every stage.",
          ]}
        />
      </Section>

      <Section tone="white">
        <DetailBlock
          index="C"
          eyebrow="Tanzania"
          title="Trading Unit"
          image={IMG.trading}
          imageAlt="Refined precious metals prepared for regional sale and export"
          imageSide="left"
          accent={GOLD}
          bullets={[
            "Complete setup with a proper dealership license at the regional office.",
            "Enables local sale of materials and export of the same in our own name.",
            "Advisory business for aggregation of material from other miners.",
            "Captures value through an end-to-end metals ecosystem.",
          ]}
        >
          <Button href="/contact?type=partner" variant="primary" withArrow>
            Discuss Your Product Requirements
          </Button>
        </DetailBlock>
      </Section>
    </>
  );
}

function ZambiaDetails() {
  return (
    <>
      <Section tone="white">
        <DetailBlock
          index="A"
          eyebrow="Zambia · Phase 1"
          title="Exploration Activities"
          image={IMG.exploration}
          imageAlt="Large-scale copper and precious-metals exploration licence area in Zambia"
          imageSide="right"
          accent={COPPER}
          bullets={[
            "Over 50,000 Ha of prime large-scale exploration licenses.",
            "Spread across the most prospective areas in Zambia — Copper Belt to Mpika region.",
            "Satellite survey done on 1 license.",
            "Detailed IP-to-drilling campaign commenced.",
            "1 mine to be operational by 2028.",
          ]}
        />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Zambia · Phase 2" title="Mining & Production" intro="Stage-wise development planned across precious metals and copper." />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            {
              title: "Precious Metals Mining & Processing Plant",
              bullets: [
                "Estimated to commence open-cast mining.",
                "Capacity planned — 250 TPD ore processing plant.",
                "Carbon-in-leach process plant.",
                "Stage-wise mining and production planned.",
              ],
            },
            {
              title: "Copper Mining & Concentrate Plant",
              bullets: [
                "Planned open-cast mining.",
                "Initial reports indicate over 600 MMT of ore body.",
                "Concentrate plant for 1.2 MMT planned upon commencement of mining.",
                "Estimated timeline — 2028.",
              ],
            },
          ].map((card, i) => (
            <Reveal as="div" key={card.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-soft">
                <span aria-hidden className="inline-block h-2.5 w-2.5 rotate-45" style={{ backgroundColor: COPPER }} />
                <h3 className="mt-5 font-serif text-[clamp(1.35rem,2vw,1.7rem)] font-medium leading-snug text-ink text-balance">{card.title}</h3>
                <TickList className="mt-6" items={card.bullets} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/** The full Mining Division section, embedded in the Products page. */
export function MiningSection({ tint }: { tint?: string }) {
  const [country, setCountry] = useState<CountryId>("tanzania");

  return (
    <section id="mining" className="scroll-mt-32" aria-label="Mining Division">
      {/* Intro band + focus geographies */}
      <div className="relative overflow-hidden border-t border-line py-16 sm:py-20" style={tint ? { backgroundColor: tint } : undefined}>
        <CommodityPattern kind="mining" opacity={0.5} />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Mining segment"
            title="Mining Division"
            intro="Responsible mining-linked growth across precious metals, copper and critical minerals in Africa."
          />

          <div className="mt-12">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <p className="text-[11px] font-semibold uppercase tracking-label text-gold-700">Our Focus Geographies</p>
            </div>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/60">
              Responsible, mining-linked growth across two African jurisdictions. Select a country to explore its activities.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {(Object.keys(COUNTRIES) as CountryId[]).map((id) => {
                const c = COUNTRIES[id];
                const activeSel = country === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCountry(id)}
                    aria-pressed={activeSel}
                    className={cn("group rounded-2xl bg-white p-7 text-left transition-all sm:p-8", activeSel ? "shadow-card" : "shadow-soft hover:shadow-card")}
                    style={{
                      border: `1.5px solid ${activeSel ? c.accent : "rgba(15,45,65,0.10)"}`,
                      boxShadow: activeSel ? `0 0 0 3px ${c.accent}22, 0 24px 60px rgba(7,31,46,0.12)` : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: c.accent }}>{activeSel ? "Selected" : "View"}</p>
                        <h3 className="mt-2 font-serif text-[28px] font-medium leading-none text-ink">{c.name}</h3>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-serif leading-none" style={{ color: c.accent, fontSize: "clamp(48px, 9vw, 68px)" }}>{c.number}</div>
                        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50">{c.numberLabel}</div>
                      </div>
                    </div>
                    <dl className="mt-6 border-t border-line">
                      {c.details.map(([label, value]) => (
                        <div key={label} className="flex items-baseline justify-between gap-6 border-b border-line py-2.5">
                          <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/45">{label}</dt>
                          <dd className="text-right text-[14px] font-medium text-ink/80">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected-country details (never both at once) */}
      {country === "tanzania" ? <TanzaniaDetails /> : <ZambiaDetails />}

      {/* Mining-section CTA */}
      <Section tone="white">
        <div className="rounded-3xl border border-line bg-eco-soft p-8 text-center sm:p-12">
          <h3 className="mx-auto max-w-2xl font-serif text-[clamp(1.6rem,3vw,2.35rem)] font-medium leading-tight text-ink text-balance">
            Discuss Your Product Requirements
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-ink/65 text-pretty">
            Connect with VRV Global for mining-linked supply, trading and partnership enquiries.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/contact?type=partner" variant="primary" size="lg" withArrow>Contact VRV Global</Button>
          </div>
        </div>
      </Section>
    </section>
  );
}
