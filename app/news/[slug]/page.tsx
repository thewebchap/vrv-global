import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";
import { articles, articleBySlug, type Article } from "@/lib/news";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articleBySlug(params.slug);
  if (!article) {
    return pageMeta({
      title: "Insight not found",
      description: "The requested insight could not be found.",
      path: `/news/${params.slug}`,
    });
  }
  return pageMeta({
    title: article.title,
    description: article.excerpt,
    path: `/news/${params.slug}`,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const fmtDate = (iso: string) => dateFmt.format(new Date(iso));

/**
 * Professional, on-topic editorial scaffolding generated from each article's
 * category and title. This is placeholder prose to be replaced by the approved
 * article — never lorem ipsum. Structured as h2 sections + a pull-quote.
 */
type Body = {
  lede: string;
  sections: { heading: string; paragraphs: string[] }[];
  quote: string;
};

function buildBody(article: Article): Body {
  const t = article.title;
  const lede = `${article.excerpt} For a sustainability-led supply chain integrator such as VRV Global, this is not an abstract theme — it shapes how we source, verify, finance and move material across agro commodities, industrial metals and the circular economy.`;

  const byCategory: Record<string, { heading: string; paragraphs: string[] }[]> = {
    "Sustainable Supply Chains": [
      {
        heading: "Why visibility is becoming a commercial advantage",
        paragraphs: [
          "Buyers, lenders and regulators increasingly expect to know where material comes from and under what conditions it was produced. Origin-to-destination visibility — once treated as a compliance overhead — is now a source of pricing power, faster financing and more resilient relationships. Counterparties that can evidence responsible sourcing are simply easier to do business with.",
          "Achieving that visibility means connecting fragmented data across producers, processors, logistics providers and destination markets. The objective is a single, defensible record of a material's journey, captured at each handover rather than reconstructed after the fact.",
        ],
      },
      {
        heading: "From documentation to verifiable traceability",
        paragraphs: [
          "Traditional trade documentation tells you what was declared; verifiable traceability tells you what actually happened. The shift is from paper trails to data that can be cross-checked against independent signals — certifications, inspection results and movement records — so claims hold up under scrutiny.",
          "VRV Global's material-traceability roadmap is steadily extending this coverage across origin, movement, processing and delivery, prioritising the categories where transparency matters most to our partners and investors.",
        ],
      },
    ],
    "Agro Commodities": [
      {
        heading: "Engaging origin without compromising quality",
        paragraphs: [
          "Responsible agro supply chains begin at origin, often with smallholders and cooperatives whose practices determine both the sustainability and the quality of the final material. Engagement, fair commercial terms and consistent specifications have to be managed together — improving one at the expense of the others is a false economy.",
          "Deforestation-free, ESG-aligned sourcing depends on knowing the production landscape: who is producing, where, and how land and labour are managed. That knowledge underpins credible claims and protects buyers from reputational and regulatory exposure.",
        ],
      },
      {
        heading: "Traceability as the connective tissue",
        paragraphs: [
          "Linking origin engagement to destination demand requires traceability that survives aggregation and processing. When provenance is preserved through the chain, premiums for responsibly produced material can flow back toward origin — aligning incentives in the right direction.",
          "This is the model VRV Global works toward: dependable supply for serious counterparties, built on documented, responsible origin rather than opaque intermediation.",
        ],
      },
    ],
    "Metals & Industrial Transformation": [
      {
        heading: "Electrification is redrawing demand",
        paragraphs: [
          "Copper, aluminium and nickel sit at the centre of the energy transition. Grids, renewables, storage and electric mobility all intensify demand for these metals, even as the bar for how they are sourced continues to rise. The result is a market where availability and responsibility have to be solved at the same time.",
          "For integrators, this means securing reliable flows while ensuring that the metals entering them meet credible environmental and social expectations — increasingly a condition of access to capital and to discerning buyers.",
        ],
      },
      {
        heading: "Responsible sourcing is non-negotiable",
        paragraphs: [
          "Industrial metals can no longer be treated purely as fungible commodities. Provenance, processing footprint and chain-of-custody now influence which material qualifies for premium offtake and ESG-aligned financing.",
          "VRV Global approaches metals with the same discipline applied across the portfolio: understand the origin, document the journey, and connect supply to demand in a way that is both commercially sound and defensible.",
        ],
      },
    ],
    "Metal Recycling": [
      {
        heading: "Recycled metal as a structural market",
        paragraphs: [
          "Recycled copper and steel carry a fraction of the embodied carbon of primary production. As decarbonisation targets harden and policy support grows, secondary metals are shifting from a cyclical sideline to a structural, policy-backed market with durable demand.",
          "Keeping metal in productive use lowers waste, reduces emissions and eases pressure on primary extraction — a clear alignment of environmental and commercial logic.",
        ],
      },
      {
        heading: "Quality, sorting and chain-of-custody",
        paragraphs: [
          "The value of recycled metal depends on consistent grading, clean sorting and a credible chain-of-custody. Buyers need confidence that what is declared is what they receive, and that the material's recycled status can be substantiated.",
          "Building that confidence is exactly where an integrator adds value — coordinating collection, processing and documentation so recycled metal can compete on quality, not just price.",
        ],
      },
    ],
    "Circular Economy": [
      {
        heading: "Designing material flows that loop",
        paragraphs: [
          "The circular economy reframes waste as feedstock. From metal scrap to engineered wood panels, keeping materials in productive use for longer reduces waste, lowers embodied carbon and creates durable, lower-volatility value streams.",
          "Realising this at commodity scale requires the same fundamentals as any supply chain: reliable sourcing, consistent quality and transparent documentation — applied to recovered and remanufactured materials.",
        ],
      },
      {
        heading: "From scrap to specified product",
        paragraphs: [
          "Turning recovered material into specified, sellable product is where circularity becomes commercial. That transformation depends on processing capability and on traceability that lets buyers trust the recycled content they are paying for.",
          "VRV Global treats circular economy products as a core portfolio pillar, integrating recovery, processing and distribution rather than treating recycled material as a residual trade.",
        ],
      },
    ],
    "ESG & Governance": [
      {
        heading: "What credible disclosure looks like",
        paragraphs: [
          "For a trade-driven business, credible ESG disclosure is specific and evidenced, not aspirational. It addresses how material is sourced, how counterparties are screened, how environmental and social risks are managed, and how governance holds the whole system accountable.",
          "Capital markets reward this clarity. Investors increasingly differentiate between businesses that can substantiate their sustainability claims and those that cannot — and price that difference accordingly.",
        ],
      },
      {
        heading: "Governance turns intent into practice",
        paragraphs: [
          "A formalised ESG framework only matters if governance gives it force: clear policies, a supplier code, defined responsibilities and meaningful oversight across the trade lifecycle.",
          "VRV Global's framework guides environmental, social and governance practice across sourcing, processing and distribution, with reporting designed to stand up to investor and regulator scrutiny.",
        ],
      },
    ],
    "Global Commodity Trends": [
      {
        heading: "Demand shifts and the geography of supply",
        paragraphs: [
          "The map of global commodity flows is being redrawn by decarbonisation, supply-chain resilience and shifting demand. Where material is produced, how it moves and which corridors prove dependable are all in flux.",
          "For integrators, the opportunity is to build supply chains that are both resilient and responsible — diversified enough to absorb shocks and transparent enough to satisfy a more demanding set of buyers and regulators.",
        ],
      },
      {
        heading: "Resilience and responsibility together",
        paragraphs: [
          "Resilience is no longer just about redundancy; it is about visibility. Knowing your supply chain in detail is what lets you reroute, substitute and reassure counterparties when conditions change.",
          "VRV Global positions for these shifts by combining a multi-region sourcing network with the traceability and ESG discipline that increasingly define which trade flows are bankable.",
        ],
      },
    ],
  };

  const sections =
    byCategory[article.category] ??
    byCategory["Sustainable Supply Chains"];

  const quote =
    "Transparency is no longer a cost of doing business — it is fast becoming the basis on which the best business gets done.";

  return {
    lede: `${t}. ${lede}`,
    sections,
    quote,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articleBySlug(params.slug);
  if (!article) notFound();

  const body = buildBody(article);
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const heroImg = images.traceability ?? images.news;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    url: `${site.url}/news/${article.slug}`,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/news/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <PageHero
        eyebrow={article.category}
        title={article.title}
        intro={article.excerpt}
        crumbs={[{ label: "News & Insights", href: "/news" }, { label: article.title }]}
      />

      <Section tone="white">
        <article className="mx-auto max-w-3xl">
          {/* Meta line */}
          <div className="flex items-center gap-3 text-sm text-ink/50">
            <span className="font-semibold text-brand">{article.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{fmtDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Hero image */}
          <Reveal>
            <Media
              src={heroImg.src}
              alt={article.title}
              label={article.category}
              ratio="16/9"
              overlay
              rounded="rounded-2xl"
              className="mt-8 shadow-card"
              priority
            />
          </Reveal>

          {/* Body */}
          <div className="mt-12 space-y-10">
            <p className="text-[19px] leading-relaxed text-ink/80">{body.lede}</p>

            {body.sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="text-h2 text-ink">{s.heading}</h2>
                <div className="mt-5 space-y-5 text-[16px] leading-relaxed text-ink/70">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>

                {/* Pull-quote after the first section */}
                {i === 0 && (
                  <blockquote className="my-10 border-l-2 border-gold pl-6">
                    <p className="text-xl font-medium leading-relaxed text-ink text-balance">
                      &ldquo;{body.quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </section>
            ))}

            <p className="rounded-xl border border-line bg-paper px-5 py-4 text-sm text-ink/55">
              [Editable: replace with the full approved article.]
            </p>
          </div>
        </article>
      </Section>

      {/* Related insights */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="Related insights"
          title="Continue reading"
          intro="More professional commentary from VRV Global's sustainable supply-chain practice."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link
                href={`/news/${a.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-hover"
              >
                <span className="text-[11px] font-semibold uppercase tracking-label text-brand">{a.category}</span>
                <h3 className="mt-3 text-lg font-medium leading-snug text-ink transition-colors group-hover:text-brand">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{a.excerpt}</p>
                <span className="mt-5 text-xs font-semibold text-brand">Read insight →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="ink">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Partner with VRV Global"
            tone="white"
            title="Build responsible, traceable supply chains with us"
            intro="Explore how our sustainability-led model connects responsible sourcing, material traceability and ESG-aligned trade — or start a conversation with our team."
          />
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href="/contact" variant="primary" withArrow>
              Contact us
            </Button>
            <Button href="/sustainability" variant="outlineLight" withArrow>
              Our sustainability approach
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
