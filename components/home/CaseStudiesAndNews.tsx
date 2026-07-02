import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { getFeaturedCaseStudies, caseStudyImage, caseStudyCategoryLabels } from "@/data/caseStudies";
import { getLatestLinkedInPosts } from "@/lib/integrations/linkedin/sync";

const LINKEDIN_POSTS_URL = "https://www.linkedin.com/company/vrv-global/posts/";

const dateFmt = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "numeric" });
const fmtDate = (iso: string) => dateFmt.format(new Date(iso));

/** Topic-default thumbnail when a LinkedIn post has no image of its own. */
function postImage(category: string, image?: string): string {
  if (image) return image;
  const c = category.toLowerCase();
  if (c.includes("rubber") || c.includes("agro")) return "/images/products/agro-commodities.jpg";
  if (c.includes("circular") || c.includes("recycl")) return "/images/hero/circular-economy.jpg";
  if (c.includes("metal") || c.includes("mining")) return "/images/commodities/metals/industrial-metals-warehouse.jpg";
  if (c.includes("esg") || c.includes("govern")) return "/images/hero/sustainable-global-trade.jpg";
  return "/images/hero/singapore-global-network.jpg";
}

/**
 * CaseStudiesAndNews — one compact bipartite section after Sustainability.
 * Left: 2 featured published case studies. Right: the latest 2 approved LinkedIn
 * posts (same server data source as the News page; no browser fetch). Stacks
 * vertically on mobile (case studies first).
 */
export async function CaseStudiesAndNews() {
  const studies = getFeaturedCaseStudies(2);
  const posts = await getLatestLinkedInPosts(2);

  return (
    <Section tone="white" bordered>
      <SectionHeading
        eyebrow="Media"
        title="Media"
        intro="Explore selected case studies and the latest VRV Global updates from LinkedIn."
      />

      <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2 lg:divide-x lg:divide-line">
        {/* LEFT — Case Studies */}
        <div className="lg:pr-14">
          <h3 className="font-serif text-xl text-ink">Case Studies</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
            Selected examples of VRV Global&apos;s sourcing, processing, documentation, traceability and market-access
            work across commodity flows.
          </p>

          <div className="mt-6 space-y-4">
            {studies.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.slug}`}
                className="group flex gap-4 rounded-xl border border-line bg-white p-4 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover"
              >
                <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image
                    src={caseStudyImage(cs.category, cs.thumbnail)}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-label text-brand">
                    {caseStudyCategoryLabels[cs.category]}
                  </span>
                  <span className="mt-0.5 block text-[15px] font-medium leading-snug text-ink group-hover:text-brand">
                    {cs.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-[13.5px] leading-relaxed text-ink/55">
                    {cs.summary}
                  </span>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand">
                    Read Case Study
                    <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/case-studies"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600"
          >
            View More Case Studies
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>

        {/* RIGHT — News & Insights (LinkedIn) */}
        <div className="lg:pl-14">
          <h3 className="font-serif text-xl text-ink">News &amp; Insights</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
            Latest LinkedIn updates from VRV Global on commodities, sustainability, traceability and supply-chain
            developments.
          </p>

          {posts.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-line bg-paper/50 p-6 text-[14px] text-ink/55">
              No approved LinkedIn updates yet. Published posts will appear here automatically.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {posts.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-4 rounded-xl border border-line bg-white p-4 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover"
                >
                  <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand">
                    <Image
                      src={postImage(p.category, p.image)}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 text-[10px] font-semibold uppercase tracking-label text-ocean">
                      <time dateTime={p.publishedDate}>{fmtDate(p.publishedDate)}</time>
                      <span aria-hidden className="text-ink/20">·</span>
                      <span>{p.category}</span>
                    </span>
                    <span className="mt-0.5 block text-[15px] font-medium leading-snug text-ink group-hover:text-brand">
                      {p.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-[13.5px] leading-relaxed text-ink/55">
                      {p.excerpt}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand">
                      Read on LinkedIn
                      <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </a>
              ))}
            </div>
          )}

          <a
            href={LINKEDIN_POSTS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600"
          >
            View More on LinkedIn
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}
