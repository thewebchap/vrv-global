import Link from "next/link";
import { SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CommodityPattern } from "@/components/products/CommodityDecor";

/**
 * MiningGateway — the SHORT, high-level Mining section on the main Products page.
 * A premium overview that acts as a gateway into the dedicated /products/mining
 * page; the detailed Tanzania/Zambia content now lives there.
 */
const CARDS: { icon: IconName; title: string; lead: string; bullets: string[]; accent: string }[] = [
  {
    icon: "cube",
    title: "Industrial Metals",
    lead: "Copper — For energy transition, mobility transformation and AI",
    bullets: [
      "VRV's mining focus includes copper-led opportunities",
      "Strategic locations in Africa",
      "Structured production and exploration pipeline",
    ],
    accent: "#B87333", // copper
  },
  {
    icon: "spark",
    title: "Precious Metals",
    lead: "Gold — For store of value and industrial consumption",
    bullets: [
      "VRV's mining focus includes precious metals opportunities",
      "Strategic locations in Africa",
      "Production and processing-linked focus",
    ],
    accent: "#B8955B", // gold
  },
  {
    icon: "globe",
    title: "Rare Earth Metals",
    lead: "Rare earth metals — Materials of tomorrow",
    bullets: [
      "VRV's mining focus includes rare earth exploration potential",
      "Strategic locations in Africa",
      "Linked to future industry and energy transition demand",
    ],
    accent: "#8A6D3B", // warm earth
  },
];

export function MiningGateway({ tint }: { tint?: string }) {
  return (
    <section id="mining" className="scroll-mt-32" aria-label="Mining">
      <div className="relative overflow-hidden border-t border-line py-16 sm:py-20" style={tint ? { backgroundColor: tint } : undefined}>
        <CommodityPattern kind="mining" opacity={0.5} />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Mining segment"
            title="Metals of Importance for Tomorrow"
            intro="VRV's mining focus connects industrial, precious and rare earth metals across strategic locations in Africa, with structured production and exploration pipelines."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${c.accent}1a`, color: c.accent }}
                  >
                    <Icon name={c.icon} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-ink">{c.title}</h3>
                  <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-ink/75">{c.lead}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink/60">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: c.accent }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/products/mining"
                    className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand"
                  >
                    View Mining Focus
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
