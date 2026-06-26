"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { MarketSnapshot } from "@/components/market/MarketSnapshot";
import { cn } from "@/lib/cn";
import type { NewsPost } from "@/lib/integrations/linkedin/types";

const FILTERS = [
  "All",
  "Company Updates",
  "LinkedIn Updates",
  "Sustainability",
  "Agro Commodities",
  "Metals",
  "Circular Economy",
  "Investor News",
  "Market Prices",
] as const;
type Filter = (typeof FILTERS)[number];

function matches(post: NewsPost, filter: Filter): boolean {
  if (filter === "All") return true;
  const c = post.category.toLowerCase();
  switch (filter) {
    case "LinkedIn Updates":
      return post.source === "linkedin" || post.source === "manual";
    case "Company Updates":
      return /company/.test(c);
    case "Sustainability":
      return /sustainab|esg|governance/.test(c);
    case "Agro Commodities":
      return /agro|rubber/.test(c);
    case "Metals":
      return /metal/.test(c);
    case "Circular Economy":
      return /circular|recycl/.test(c);
    case "Investor News":
      return /investor/.test(c);
    default:
      return false;
  }
}

export function NewsExplorer({ posts }: { posts: NewsPost[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => posts.filter((p) => matches(p, filter)), [posts, filter]);

  return (
    <div>
      {/* Filter rail */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Content filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === f
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-brand",
              f === "Market Prices" && filter !== f && "text-ocean",
            )}
          >
            {f === "Market Prices" && <span aria-hidden className="mr-1">📈</span>}
            {f}
          </button>
        ))}
      </div>

      {/* Market Prices view */}
      {filter === "Market Prices" ? (
        <div className="mt-10">
          <MarketSnapshot />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const isLinkedIn = p.source === "linkedin" || p.source === "manual";
            return (
              <article key={p.id} className="group flex flex-col rounded-xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand/40 hover:shadow-hover">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label">
                  {isLinkedIn ? (
                    <span className="inline-flex items-center gap-1 text-ocean">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-ocean-50 text-[10px]">in</span>
                      LinkedIn
                    </span>
                  ) : (
                    <span className="text-brand">{p.category}</span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-medium text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/60">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <time className="text-xs text-ink/45" dateTime={p.publishedDate}>
                    {new Date(p.publishedDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                  {isLinkedIn ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600">
                      View on LinkedIn <Icon name="arrowRight" className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link href={p.url} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Read insight <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
          {visible.length === 0 && (
            <p className="col-span-full rounded-xl border border-line bg-paper p-8 text-center text-sm text-ink/55">
              No items in this category yet. Check back soon.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
