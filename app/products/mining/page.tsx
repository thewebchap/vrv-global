import { PageBanner } from "@/components/sections/PageBanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { MiningSection } from "@/components/products/MiningDivisionSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Mining",
  description:
    "Explore VRV Global's mining focus across industrial metals, precious metals and rare earth opportunities connected to long-term commodity supply security.",
  path: "/products/mining",
});

const FOCUS: { icon: IconName; title: string; body: string; accent: string }[] = [
  {
    icon: "cube",
    title: "Industrial Metals",
    body: "Copper-led industrial metals opportunities linked to energy transition, mobility transformation, electrification, infrastructure and AI-related demand.",
    accent: "#B87333",
  },
  {
    icon: "spark",
    title: "Precious Metals",
    body: "Precious metals opportunities linked to long-term value preservation, industrial consumption and structured production pathways.",
    accent: "#B8955B",
  },
  {
    icon: "globe",
    title: "Rare Earth Metals",
    body: "Rare earth exploration potential linked to future industry, clean energy technologies and advanced manufacturing supply chains.",
    accent: "#8A6D3B",
  },
];

export default function MiningPage() {
  return (
    <>
      <PageBanner
        eyebrow="Mining"
        title="Mining"
        subtitle="Metals of importance for tomorrow, connected through responsible resource access, structured exploration and long-term supply security."
        designTone="copper"
      />

      {/* Mining Overview */}
      <Section tone="white">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Overview" title="VRV's mining focus" />
          <p className="mt-6 text-[17px] leading-relaxed text-ink/75 text-pretty">
            VRV's mining focus is built around strategic resource access, responsible development and long-term commodity
            supply security. The division connects industrial metals, precious metals and rare earth opportunities across
            selected geographies, with a focus on disciplined execution, operational visibility and future-ready material
            flows.
          </p>
          <p className="mt-6 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-[13px] leading-relaxed text-gold-700">
            <Icon name="doc" className="mt-0.5 h-4 w-4 shrink-0" />
            This page is a working overview of VRV's mining focus and will be expanded as additional project information is
            published.
          </p>
        </div>
      </Section>

      {/* VRV Mining Focus */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="VRV Mining Focus"
          title="Industrial, precious and rare earth metals"
          intro="A focused pipeline across the metals that matter most for the energy transition and future industry."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${f.accent}1a`, color: f.accent }}
                >
                  <Icon name={f.icon} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">{f.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/65">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Focus Geographies + detailed Tanzania / Zambia content (moved here) */}
      <MiningSection hideCta />

      {/* CTA */}
      <Section tone="white" bordered>
        <div className="rounded-3xl border border-line bg-eco-soft p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl font-serif text-[clamp(1.6rem,3vw,2.35rem)] font-medium leading-tight text-ink text-balance">
            Discuss mining-linked opportunities with VRV
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-ink/65 text-pretty">
            Connect with VRV Global to discuss strategic mining-linked materials, resource access, processing opportunities
            and long-term commodity supply.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/contact?type=partner" variant="primary" size="lg" withArrow>Contact VRV</Button>
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Mining", path: "/products/mining" },
          ]),
        ]}
      />
    </>
  );
}
