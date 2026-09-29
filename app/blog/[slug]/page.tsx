import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPostBySlug, listPublishedPosts } from "@/lib/blog/store";
import { renderMarkdown, excerptFromMarkdown } from "@/lib/blog/markdown";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post || post.status !== "published") return pageMeta({ title: "Article", description: "VRV Global blog", path: `/blog/${params.slug}` });
  const description = post.seoDescription || post.excerpt || excerptFromMarkdown(post.body);
  const meta = pageMeta({ title: post.seoTitle || post.title, description, path: `/blog/${post.slug}` });
  if (post.coverMediaUrl && meta.openGraph) meta.openGraph.images = [{ url: post.coverMediaUrl }];
  return meta;
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || post.status !== "published") notFound();

  const related = (await listPublishedPosts())
    .filter((p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt || excerptFromMarkdown(post.body),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.authorName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    ...(post.coverMediaUrl ? { image: post.coverMediaUrl } : {}),
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <Section tone="white">
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600">
            <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> Back to Blog
          </Link>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand hover:bg-brand-100">
                {t}
              </Link>
            ))}
          </div>

          <h1 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.8rem)] leading-tight text-ink text-balance">{post.title}</h1>
          <p className="mt-4 text-[14px] text-ink/55">
            By {post.authorName} · {fmtDate(post.publishedAt)}
          </p>

          {post.coverMediaUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverMediaUrl} alt={post.coverMediaAlt ?? post.title} className="mt-8 w-full rounded-2xl border border-line" />
          )}

          <div className="mt-8">{renderMarkdown(post.body)}</div>

          <div className="mt-12 border-t border-line pt-8">
            <Button href="/blog" variant="outline" withArrow>Back to Blog</Button>
          </div>
        </article>
      </Section>

      {related.length > 0 && (
        <Section tone="paper" bordered>
          <h2 className="font-serif text-2xl text-ink">Related articles</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand">{t}</span>
                  ))}
                </div>
                <h3 className="mt-3 font-serif text-lg text-ink group-hover:text-brand">{p.title}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink/60 line-clamp-3">{p.excerpt || excerptFromMarkdown(p.body)}</p>
                <span className="mt-3 text-[12px] text-ink/45">{fmtDate(p.publishedAt)}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <JsonLd data={[articleSchema]} />
    </>
  );
}
