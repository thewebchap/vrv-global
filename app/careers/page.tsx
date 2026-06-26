import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ResumeForm } from "@/components/forms/ResumeForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers — Purpose-Led Careers in Sustainable Global Trade",
  description:
    "Build a career in sustainable supply chain and global trade at VRV Global. Join a purpose-led team across trading, sustainability and ESG, operations, finance and technology — and help make responsible sourcing the standard.",
  path: "/careers",
});

const reasons = [
  {
    icon: "leaf",
    title: "Sustainability-led culture",
    body: "Work where responsible sourcing, traceability and ESG are core to the business model — not an afterthought. Your work helps make sustainable trade the standard.",
  },
  {
    icon: "globe",
    title: "Global trade exposure",
    body: "Sit close to live, cross-border flows across agro commodities, industrial metals and the circular economy, connecting origins to destination markets worldwide.",
  },
  {
    icon: "spark",
    title: "Learning & growth",
    body: "Gain breadth across sourcing, trade finance, logistics, compliance and commercial strategy — with the room and mentorship to grow fast.",
  },
  {
    icon: "handshake",
    title: "Impact & ownership",
    body: "Own real outcomes in an entrepreneurial house with institutional discipline, where your decisions shape partnerships, communities and the bottom line.",
  },
] as const;

const openings = [
  {
    title: "[Editable: Sustainability Analyst]",
    location: "Singapore / Remote",
    blurb: "Support the ESG framework, responsible-sourcing programmes and traceability reporting across the portfolio.",
  },
  {
    title: "[Editable: Commodity Trader — Metals]",
    location: "Singapore / Remote",
    blurb: "Run industrial and recycled-metals flows, building refiner, mill and supplier relationships across markets.",
  },
  {
    title: "[Editable: Supply Chain & Traceability Lead]",
    location: "Singapore / Remote",
    blurb: "Advance the material-traceability roadmap across origin, movement, processing and delivery.",
  },
  {
    title: "[Editable: Investor Relations Associate]",
    location: "Singapore / Remote",
    blurb: "Support investor communications, reporting and capital-markets readiness as the business scales.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build purpose-led global trade"
        intro="Join a Singapore-based team making global trade more responsible, transparent and resilient. We hire people who want to own outcomes across sustainable supply chains — and build careers with real impact."
        crumbs={[{ label: "Careers" }]}
      />

      {/* Why work with us */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Why work with us"
          title="A career where commercial edge meets responsibility"
          intro="VRV Global pairs the pace of an entrepreneurial trading house with the discipline of an institution — and a genuine commitment to sustainability."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <FeatureCard icon={r.icon} title={r.title} className="h-full">
                {r.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Culture image band */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Media
              src="/pictures/about/team-3.jpg"
              alt="The VRV Global team at the office in Singapore"
              label="The VRV Global team"
              ratio="4/3"
              overlay
              rounded="rounded-2xl"
              className="shadow-card"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our culture"
              title="Purpose-led, responsible and genuinely collaborative"
              intro="We believe responsible trade is better trade. Our people work transparently, treat suppliers and communities as long-term partners, and hold themselves to high ethical and environmental standards."
            />
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink/65">
              You will work alongside an experienced, international team that values integrity, curiosity and
              ownership. Whether you are sourcing material at origin, structuring trade finance or advancing our
              traceability roadmap, your contribution is visible — and it matters.
            </p>
          </div>
        </div>
      </Section>

      {/* Current openings */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Current openings"
          title="Open roles"
          intro="Roles below are editable placeholders, shown to illustrate the kinds of talent we hire. We are always interested in strong candidates — submit your resume below."
        />
        <div className="mt-10 space-y-4">
          {openings.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.05}>
              <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 ease-out-soft hover:border-brand/30 hover:shadow-hover sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="max-w-2xl">
                  <h3 className="text-lg font-medium text-ink">{role.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink/60">{role.blurb}</p>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink/65">
                  <Icon name="globe" className="h-4 w-4 text-brand" />
                  {role.location}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 flex items-center gap-2 text-[15px] text-ink/60">
          <Icon name="spark" className="h-4 w-4 text-brand" />
          We&rsquo;re always hiring — don&rsquo;t see your role? Submit your resume below and we&rsquo;ll be in touch.
        </p>
      </Section>

      {/* Submit resume */}
      <Section tone="paper" bordered id="apply" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            eyebrow="Submit your resume"
            title="Tell us about you"
            intro="Don't see the right role, or want to register your interest? Send us your profile — we review speculative applications from strong candidates across all functions."
          />
          <div className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
            <ResumeForm />
          </div>
        </div>
      </Section>
    </>
  );
}
