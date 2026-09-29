import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { listPublishedPosts } from "@/lib/blog/store";
import { excerptFromMarkdown } from "@/lib/blog/markdown";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Insights from VRV Global on commodity trading, sustainability, natural rubber, metals, mining and supply-chain transformation.",
  path: "/blog",
});

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage({ searchParams }: { searchParams?: { tag?: string } }) {
  const posts = await listPublishedPosts();
  const activeTag = searchParams?.tag;
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
  const shown = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <>
      <PageBanner
        eyebrow="Insights"
        title="VRV Global Blog"
        subtitle="Perspectives on commodity trading, sustainability, natural rubber, metals, mining and supply-chain transformation."
        designTone="sea"
      />

      <Section tone="white">
        {allTags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                !activeTag ? "border-brand bg-brand-50 text-brand" : "border-line bg-white text-ink/70 hover:border-brand/40"
              }`}
            >
              All
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  activeTag === t ? "border-brand bg-brand-50 text-brand" : "border-line bg-white text-ink/70 hover:border-brand/40"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        {shown.length === 0 ? (
          <div className="rounded-2xl border border-line bg-paper p-12 text-center">
            <p className="text-[17px] text-ink/60">No blog articles have been published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <article
                key={p.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover"
              >
                {p.coverMediaUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverMediaUrl} alt={p.coverMediaAlt ?? p.title} className="aspect-[16/9] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-[#0C2A44] to-[#071626]">
                    <Icon name="doc" className="h-8 w-8 text-white/40" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand">{t}</span>
                    ))}
                  </div>
                  <h2 className="mt-3 font-serif text-xl text-ink">
                    <Link href={`/blog/${p.slug}`} className="hover:text-brand">{p.title}</Link>
                  </h2>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink/60 line-clamp-3">
                    {p.excerpt || excerptFromMarkdown(p.body)}
                  </p>
                  <p className="mt-4 text-[12.5px] text-ink/50">
                    {p.authorName} · {fmtDate(p.publishedAt)}
                  </p>
                  <Link href={`/blog/${p.slug}`} className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
                    Read Article
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
