import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { images } from "@/lib/images";
import { articles } from "@/lib/news";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { getCombinedFeed } from "@/lib/integrations/feed";

export const metadata = pageMeta({
  title: "News, Insights & Market Intelligence",
  description:
    "Company updates, LinkedIn highlights, sustainability and ESG insights, circular economy articles and live commodity market snapshots from VRV Global — a sustainable supply chain integrator in Singapore.",
  path: "/news",
});

// Combined feed (editorial + approved LinkedIn posts) is read at request time.
export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric" });
const fmtDate = (iso: string) => dateFmt.format(new Date(iso));

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${site.name} — News, Insights & Market Intelligence`,
  url: `${site.url}/news`,
  description: "Sustainable supply chains, the circular economy, ESG, commodity trends and company updates.",
  publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  blogPost: articles.map((a) => ({
    "@type": "BlogPosting",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    url: `${site.url}/news/${a.slug}`,
    articleSection: a.category,
    author: { "@type": "Organization", name: site.name },
  })),
};

export default async function NewsPage() {
  const feed = await getCombinedFeed();
  const feature = articles[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <PageHero
        eyebrow="News, Insights & Market Intelligence"
        title="News, insights and market intelligence"
        intro="Company updates, LinkedIn highlights, sustainability and ESG insights, circular economy articles, investor-relevant announcements and live commodity market snapshots — in one place."
        crumbs={[{ label: "News & Insights" }]}
      />

      {/* Featured editorial article */}
      <Section tone="white">
        <Reveal>
          <Link
            href={`/news/${feature.slug}`}
            className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-line transition-all duration-300 hover:border-brand/40 hover:shadow-hover lg:grid-cols-2"
          >
            <div className="p-3">
              <Media src={images.news.src} alt={images.news.alt} label="Featured insight" ratio="16/9" overlay rounded="rounded-xl" className="h-full" priority />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="eyebrow no-flourish">{feature.category}</span>
              <h2 className="mt-4 text-h2 text-ink transition-colors group-hover:text-brand">{feature.title}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/60">{feature.excerpt}</p>
              <div className="mt-6 flex items-center gap-3 text-sm text-ink/50">
                <span>{fmtDate(feature.date)}</span>
                <span aria-hidden>·</span>
                <span>{feature.readTime}</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Read insight
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      </Section>

      {/* Combined, filterable feed (incl. LinkedIn updates + Market Prices) */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="Explore"
          title="Filter by topic"
          intro="Switch between company and LinkedIn updates, sustainability and ESG, agro and metals, the circular economy, investor news — and the live market snapshot."
        />
        <div className="mt-10">
          <NewsExplorer posts={feed} />
        </div>
      </Section>

      {/* Newsletter CTA band */}
      <section className="bg-eco py-16 text-white sm:py-20">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Stay informed"
            tone="white"
            title="Subscribe to VRV Insights"
            intro="Periodic, professional commentary on sustainable supply chains, responsible sourcing, the circular economy and ESG — direct to your inbox."
          />
          <div className="lg:justify-self-end">
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
