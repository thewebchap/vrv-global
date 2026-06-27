"use client";

import { cn } from "@/lib/cn";
import type { FeedbackFilter } from "./types";

/** All / Pending / Completed filter pills with counts. */
export function FeedbackFilters({
  value,
  onChange,
  counts,
}: {
  value: FeedbackFilter;
  onChange: (f: FeedbackFilter) => void;
  counts: Record<FeedbackFilter, number>;
}) {
  const options: FeedbackFilter[] = ["All", "Pending", "Completed"];
  return (
    <div role="tablist" aria-label="Filter feedback" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          role="tab"
          aria-selected={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            value === o
              ? "border-brand bg-brand text-white"
              : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-brand",
          )}
        >
          {o}
          <span
            className={cn(
              "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
              value === o ? "bg-white/20 text-white" : "bg-paper text-ink/55",
            )}
          >
            {counts[o]}
          </span>
        </button>
      ))}
    </div>
  );
}
