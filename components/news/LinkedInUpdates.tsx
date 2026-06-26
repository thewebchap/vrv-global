import { getPublishedPosts } from "@/lib/integrations/linkedin/sync";
import { Icon } from "@/components/ui/Icon";

/**
 * Server component — renders APPROVED LinkedIn-sourced posts with a
 * "View on LinkedIn" CTA. Only published posts appear (admin-approved).
 */
export async function LinkedInUpdates({ limit = 3 }: { limit?: number }) {
  const posts = (await getPublishedPosts()).filter((p) => p.source === "linkedin" || p.source === "manual").slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {posts.map((p) => (
        <article key={p.id} className="flex flex-col rounded-xl border border-line bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-ocean">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-ocean-50 text-[10px]">in</span>
            LinkedIn · {p.category}
          </div>
          <h3 className="mt-3 text-lg font-medium text-ink">{p.title}</h3>
          <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/60">{p.excerpt}</p>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <time className="text-xs text-ink/45" dateTime={p.publishedDate}>
              {new Date(p.publishedDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
            </time>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600"
            >
              View on LinkedIn
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
