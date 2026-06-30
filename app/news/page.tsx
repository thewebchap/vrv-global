import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import {
  getFeaturedCaseStudies,
  caseStudyImage,
  caseStudyCategoryLabels,
} from "@/data/caseStudies";
import { getLatestLinkedInPosts } from "@/lib/integrations/linkedin/sync";
import { pageMeta } from "@/lib/seo";

const LINKEDIN_POSTS_URL = "https://www.linkedin.com/company/vrv-global/posts/";

const base = pageMeta({
  title: "Media",
  description:
    "Explore VRV Global case studies and LinkedIn-sourced news updates covering commodities, natural rubber, industrial metals, sustainability, traceability and supply-chain developments.",
  path: "/news",
});

export const metadata: Metadata = {
  ...base,
  openGraph: {
    ...base.openGraph,
    title: "Media | VRV Global",
    description: "Selected case studies and latest LinkedIn updates from VRV Global.",
  },
};

// Approved LinkedIn posts are read at request time (no browser-side fetching).
export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "numeric" });
const fmtDate = (iso: string) => dateFmt.format(new Date(iso));

/** Topic-default thumbnail when a LinkedIn post has no image of its own. */
function postImage(category: string, image?: string): string {
  if (image) return image;
  const c = category.toLowerCase();
  if (c.includes("rubber") || c.includes("agro")) return "/images/products/agro-commodities.jpg";
  if (c.includes("circular") || c.includes("recycl")) return "/images/hero/circular-economy.jpg";
  if (c.includes("metal") || c.includes("mining")) return "/images/hero/responsible-metals.jpg";
  if (c.includes("esg") || c.includes("govern")) return "/images/hero/sustainable-global-trade.jpg";
  return "/images/hero/singapore-global-network.jpg";
}

export default async function MediaPage() {
  const studies = getFeaturedCaseStudies(3);
  const posts = await getLatestLinkedInPosts(3);

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Media"
        intro="Explore selected case studies and the latest VRV Global updates from LinkedIn."
        crumbs={[{ label: "Media" }]}
      />

      {/* Subsection 1 — Case Studies */}
      <Section tone="white">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Case studies"
            title="Case Studies"
            intro="Selected examples of VRV Global's sourcing, processing, documentation, traceability and market-access work across commodity flows."
          />
          <Link
            href="/case-studies"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600"
          >
            View More Case Studies
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((cs) => (
            <Link
              key={cs.id}
              href={`/case-studies/${cs.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover"
            >
              <span className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                <Image
                  src={caseStudyImage(cs.category, cs.thumbnail)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col p-6">
                <span className="text-[11px] font-semibold uppercase tracking-label text-brand">
                  {caseStudyCategoryLabels[cs.category]}
                </span>
                <span className="mt-2 font-serif text-xl text-ink group-hover:text-brand">{cs.title}</span>
                <span className="mt-2 line-clamp-2 flex-1 text-[14.5px] leading-relaxed text-ink/60">
                  {cs.summary}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
                  Read Case Study
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Subsection 2 — News & Insights (LinkedIn) */}
      <Section tone="paper" bordered>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="News & insights"
            title="News &amp; Insights"
            intro="Latest LinkedIn updates from VRV Global on commodities, sustainability, traceability and supply-chain developments."
          />
          <a
            href={LINKEDIN_POSTS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600"
          >
            View More on LinkedIn
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>

        {posts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line bg-white p-8 text-[15px] text-ink/55">
            No approved LinkedIn updates yet. Published posts will appear here automatically.{" "}
            <a href={LINKEDIN_POSTS_URL} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:text-brand-600">
              Visit VRV Global on LinkedIn →
            </a>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover"
              >
                <span className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                  <Image
                    src={postImage(p.category, p.image)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="flex flex-wrap items-center gap-x-2 text-[11px] font-semibold uppercase tracking-label text-ocean">
                    <time dateTime={p.publishedDate}>{fmtDate(p.publishedDate)}</time>
                    <span aria-hidden className="text-ink/20">·</span>
                    <span>{p.category}</span>
                  </span>
                  <span className="mt-2 font-serif text-xl text-ink group-hover:text-brand">{p.title}</span>
                  <span className="mt-2 line-clamp-3 flex-1 text-[14.5px] leading-relaxed text-ink/60">
                    {p.excerpt}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
                    Read on LinkedIn
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
