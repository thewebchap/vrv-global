import { cn } from "@/lib/cn";
import type { DesignFeedbackItem } from "./types";

/** Summary counters: total, pending, completed. */
export function FeedbackStats({ items }: { items: DesignFeedbackItem[] }) {
  const total = items.length;
  const pending = items.filter((i) => i.status === "Pending").length;
  const completed = total - pending;

  const cards = [
    { label: "Total feedback", value: total, tone: "ink" as const },
    { label: "Pending", value: pending, tone: "gold" as const },
    { label: "Completed", value: completed, tone: "brand" as const },
  ];

  const toneText: Record<string, string> = {
    ink: "text-ink",
    gold: "text-gold-700",
    brand: "text-brand",
  };

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-line bg-white p-4 shadow-soft sm:p-5">
          <p className={cn("font-serif text-2xl font-semibold sm:text-3xl", toneText[c.tone])}>{c.value}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-label text-ink/55">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
