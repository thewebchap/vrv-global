import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { FeatureCard, KPIGrid } from "@/components/ui/FeatureCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, IconBadge, type IconName } from "@/components/ui/Icon";
import { MarketSnapshot } from "@/components/market/MarketSnapshot";
import { SingaporeHub } from "@/components/sections/SingaporeHub";
import { InvestorRequestForm } from "@/components/forms/InvestorRequestForm";
import {
  investmentHighlights,
  investorKpis,
  marketOpportunity,
  growthStrategy,
  governanceTopics,
  investorDocs,
} from "@/lib/investors";
import { articles } from "@/lib/news";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Investor Relations — Sustainable Supply Chain Growth",
  description:
    "Explore the investment case for VRV Global, a sustainable supply chain company. ESG investing meets diversified agro, metals and circular economy exposure across global capital markets.",
  path: "/investors",
});

/** Icon assignment for the eight investment highlights, in data order. */
const highlightIcons: IconName[] = [
  "globe",
  "cube",
  "leaf",
  "recycle",
  "shield",
  "chart",
  "route",
  "scale",
];

/** Icon assignment for the four market-opportunity cards, in data order. */
const opportunityIcons: IconName[] = ["factory", "leaf", "recycle", "tree"];

/** Icon assignment for the ten governance topics, in data order. */
const governanceIcons: IconName[] = [
  "users", // board oversight
  "scale", // ethical conduct
  "shield", // anti-bribery
  "check", // supplier compliance
  "leaf", // ESG accountability
  "search", // risk management
  "lock", // data protection
  "chart", // financial transparency
  "handshake", // stakeholder engagement
  "doc", // whistleblower mechanism
];

/** ESG-related investor documents surfaced in the ESG Reporting section. */
const esgDocTitles = new Set(["ESG Report", "Sustainability Report"]);

const investorSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: `${site.url}/investors`,
  description: site.description,
  email: site.investorEmail,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Investor Relations",
    email: site.investorEmail,
    areaServed: "Global",
  },
};

export default function InvestorsPage() {
  const newsHighlights = articles.slice(0, 3);
  const esgDocs = investorDocs.filter((d) => esgDocTitles.has(d.title));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investorSchema) }}
      />

      <PageHero
        eyebrow="Investor Relations"
        title="Investing in sustainable supply chains"
        intro="VRV Global offers diversified, sustainability-led and traceability-driven exposure to global commodity demand — connecting agro commodities, industrial metals, recycled metals and circular economy products with responsible sourcing and ESG-aligned value creation."
        crumbs={[{ label: "Investor Relations" }]}
      />

      {/* 1 — Company Profile + KPIs (dark band) */}
      <Section tone="ink" className="bg-eco">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Company profile"
              title="A sustainability-led global supply chain integrator"
              tone="white"
              intro="VRV Global connects agro commodities, industrial metals, recycled metals and circular economy products through responsible sourcing, material traceability and ESG-aligned trade. Our diversified portfolio spans distinct demand cycles, positioning the business for resilient, long-term value creation across global markets."
            />
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-white/65">
              We pair commercial discipline with credible sustainability — strengthening
              governance, disclosure and traceability toward capital-markets readiness.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <KPIGrid items={investorKpis} cols={2} tone="dark" />
          </Reveal>
        </div>
      </Section>

      {/* 2 — Investment Highlights */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Investment highlights"
          title="The investment case for VRV Global"
          intro="A diversified, sustainability-led supply chain business built on responsible sourcing, traceability and exposure to durable global demand."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {investmentHighlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <FeatureCard
                icon={highlightIcons[i % highlightIcons.length]}
                title={item.title}
                tone={i % 3 === 1 ? "ocean" : i % 3 === 2 ? "gold" : "brand"}
                className="h-full"
              >
                {item.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — Market Opportunity */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Market opportunity"
          title="Structural demand across our portfolio"
          intro="VRV Global is positioned against long-term, policy-backed megatrends spanning electrification, sustainable materials, the circular economy and food security."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {marketOpportunity.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <Card className="flex h-full flex-col">
                <IconBadge name={opportunityIcons[i % opportunityIcons.length]} tone={i % 2 === 0 ? "brand" : "ocean"} />
                <h3 className="mt-5 text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/60">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — Sustainability as a Value Driver */}
      <Section tone="ink" className="bg-eco">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Sustainability as a value driver"
              title="ESG is a source of durable, defensible value"
              tone="white"
              intro="For VRV Global, responsible sourcing, material traceability and ESG discipline are not compliance overhead — they are commercial differentiators. They deepen counterparty trust, unlock premium demand for traceable materials and reduce supply chain risk, building durable value for investors."
            />
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-8">
                <p className="text-[15px] leading-relaxed text-white/70">
                  ESG-aligned, traceable supply chains are emerging as a distinct,
                  investable category. Explore how our sustainability framework translates
                  into long-term value.
                </p>
                <div className="mt-6">
                  <Button href="/sustainability" variant="outlineLight" withArrow>
                    Our sustainability approach
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 5 — Growth Strategy */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="Growth strategy"
            title="A clear path to scaled, sustainable value"
            intro="Our strategy compounds advantage across sourcing, circularity, traceability, governance and partnerships."
          />
          <Reveal delay={0.1}>
            <ol className="space-y-5">
              {growthStrategy.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 font-serif text-base text-brand">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[15px] leading-relaxed text-ink/75">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* 6 — ESG Reporting */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="ESG reporting"
              title="Transparent, ESG-aligned disclosure"
              intro="We are building credible ESG disclosure for a trade-driven business — the kind of reporting that matters to capital markets. Our ESG and sustainability reporting sits alongside our wider sustainability framework."
            />
            <div className="mt-6">
              <Button href="/sustainability#reports" variant="royal" withArrow>
                View ESG reports
              </Button>
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {esgDocs.map((doc) => (
                <Card key={doc.title} className="flex h-full flex-col">
                  <IconBadge name="leaf" tone="brand" />
                  <h3 className="mt-4 text-base font-medium text-ink">{doc.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">{doc.note}</p>
                  <Link
                    href="/sustainability#reports"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                  >
                    Read more
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7 — Corporate Governance */}
      <Section tone="white" id="governance" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Corporate governance"
          title="VRV's corporate governance framework"
          intro="Sound governance underpins investor confidence. The framework below sets out how VRV Global oversees strategy, ethics, compliance, risk and ESG accountability across the business and its supply chain."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {governanceTopics.map((topic, i) => (
            <Reveal key={topic.title} delay={(i % 3) * 0.06}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-brand/30">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={governanceIcons[i % governanceIcons.length]} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-medium text-ink">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{topic.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8 — Downloadable documents */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Investor documents"
          title="Downloadable documents"
          intro="The documents below are placeholders. Wire each card to an approved, uploaded PDF before launch."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {investorDocs.map((doc, i) => (
            <Reveal key={doc.title} delay={(i % 3) * 0.06}>
              <Card className="flex h-full flex-col">
                <IconBadge name="doc" tone="ocean" />
                <h3 className="mt-5 text-lg font-medium text-ink">{doc.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/55">{doc.note}</p>
                <span className="mt-3 inline-flex w-fit items-center rounded-full bg-amber/10 px-2.5 py-1 text-xs font-semibold text-gold-700">
                  Placeholder
                </span>
                <div className="mt-5">
                  <Button variant="outline" withArrow>
                    Download
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9 — Financial Information / Investor Request */}
      <Section tone="white" id="request" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Financial information"
              title="Request investor information"
              intro="Request our company profile, financials, ESG reports, investor presentation or governance documents. Our investor relations team will respond directly."
            />
            <dl className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name="link" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-ink">Investor enquiries</dt>
                  <dd>
                    <a
                      href={`mailto:${site.investorEmail}`}
                      className="text-[15px] text-brand underline underline-offset-2 hover:text-brand-600"
                    >
                      {site.investorEmail}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
            <p className="mt-8 max-w-prose rounded-xl border border-line bg-paper p-5 text-sm leading-relaxed text-ink/55">
              Information provided is for general informational purposes only and does not
              constitute an offer or solicitation to buy or sell any securities. Any
              public-market ambition is described as future listing readiness / a
              capital-markets roadmap.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
              <InvestorRequestForm />
            </div>
          </div>
        </div>
      </Section>

      {/* 10 — News & Events */}
      <Section tone="paper">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="News & events"
            title="Latest from VRV Global"
            intro="Perspectives on sustainable supply chains, commodity markets and ESG-aligned trade."
          />
          <Button href="/news" variant="link" withArrow>
            All news & insights
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {newsHighlights.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.06}>
              <Link
                href={`/news/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">{article.category}</span>
                <h3 className="mt-3 text-lg font-medium leading-snug text-ink">{article.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/60">{article.excerpt}</p>
                <span className="mt-5 text-xs text-ink/45">{article.readTime}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11 — Final CTA */}
      {/* Live market snapshot */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Market intelligence"
          title="Commodity market snapshot"
          intro="Indicative prices across our agro, metals and circular-economy portfolio, referencing SGX/SICOM and LME benchmarks. Indicative data for context only — connect a licensed feed for live prices."
        />
        <div className="mt-12">
          <MarketSnapshot limit={6} />
        </div>
      </Section>

      {/* Singapore positioning */}
      <SingaporeHub />

      <Section tone="ink">
        <div className="max-w-2xl">
          <p className="eyebrow text-amber">
            <span aria-hidden className="h-px w-6 bg-amber opacity-60" /> Investor relations
          </p>
          <h2 className="mt-5 text-h2 text-white text-balance">
            Let&apos;s discuss the case for sustainable supply chains
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/65">
            Speak with our investor relations team about VRV Global&apos;s strategy,
            governance and capital-markets roadmap, or request our investor materials.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg" withArrow>
              Contact our IR team
            </Button>
            <Button href="#request" variant="outlineLight" size="lg">
              Request information
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
