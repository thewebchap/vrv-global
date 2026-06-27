"use client";

import { cn } from "@/lib/cn";
import type { DesignFeedbackItem } from "./types";

/** Single feedback item with a status badge and a toggle button. */
export function FeedbackCard({
  item,
  onToggle,
  busy,
}: {
  item: DesignFeedbackItem;
  onToggle: (item: DesignFeedbackItem) => void;
  busy: boolean;
}) {
  const completed = item.status === "Completed";

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[12px] font-semibold text-ink/55">{item.id}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
              completed ? "bg-brand-50 text-brand" : "bg-gold/15 text-gold-700",
            )}
          >
            <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", completed ? "bg-brand" : "bg-gold")} />
            {item.status}
          </span>
          {item.page && (
            <span className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] font-medium text-ink/60">
              {item.page}
            </span>
          )}
          {item.created && (
            <span className="text-[11px] text-ink/40">
              <time dateTime={item.created}>{item.created}</time>
            </span>
          )}
        </div>
        <p className={cn("mt-3 text-[15px] leading-relaxed", completed ? "text-ink/55" : "text-ink/80")}>
          {item.feedback}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onToggle(item)}
        disabled={busy}
        aria-label={completed ? `Mark ${item.id} as pending` : `Mark ${item.id} as completed`}
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 sm:w-auto",
          completed
            ? "border-line text-ink/70 hover:border-gold hover:text-gold-700"
            : "border-brand bg-brand text-white hover:bg-brand-600",
        )}
      >
        {busy ? "Saving…" : completed ? "Mark Pending" : "Mark Completed"}
      </button>
    </article>
  );
}
