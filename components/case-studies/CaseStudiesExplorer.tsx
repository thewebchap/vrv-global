"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  type CaseStudy,
  type CaseStudyCategory,
  caseStudyCategoryLabels,
  caseStudyImage,
} from "@/data/caseStudies";
import { cn } from "@/lib/cn";

const dateFmt = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "numeric" });
const fmtDate = (iso: string) => dateFmt.format(new Date(iso));

/** Filter chips → which categories they include. */
const FILTERS: { label: string; match: CaseStudyCategory[] | "all" }[] = [
  { label: "All", match: "all" },
  { label: "Agro / Rubber", match: ["agro", "rubber"] },
  { label: "Metals", match: ["metals"] },
  { label: "Mining", match: ["mining"] },
  { label: "Sustainability", match: ["sustainability"] },
  { label: "Traceability", match: ["traceability"] },
];

export function CaseStudiesExplorer({ studies }: { studies: CaseStudy[] }) {
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const f = FILTERS[active];
    if (f.match === "all") return studies;
    return studies.filter((c) => (f.match as CaseStudyCategory[]).includes(c.category));
  }, [active, studies]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2.5">
        {FILTERS.map((f, i) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === i
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-brand",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-[15px] text-ink/55">No case studies in this category yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs) => (
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
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label">
                  <span className="text-brand">{caseStudyCategoryLabels[cs.category]}</span>
                  <span aria-hidden className="text-ink/20">·</span>
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-brand">
                    {cs.status}
                  </span>
                </span>
                <h3 className="mt-3 font-serif text-xl text-ink group-hover:text-brand">{cs.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink/60">{cs.summary}</p>
                <span className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <time className="text-xs text-ink/45" dateTime={cs.date}>{fmtDate(cs.date)}</time>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Read Case Study
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
