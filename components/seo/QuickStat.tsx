import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Quick Stat — a compact, credibility-style stat card placed near the top of
 * major pages (replaces the former Quick Answer block). A short eyebrow, a
 * large highlight, and one supporting line. Factual and page-relevant; no
 * invented figures.
 */
export function QuickStat({
  stat,
  label,
  className,
}: {
  stat: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-brand/20 bg-eco-soft p-6 shadow-soft sm:p-7", className)}>
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-brand">
        <Icon name="chart" className="h-4 w-4 text-gold" />
        Quick Stat
      </p>
      <p className="mt-3 font-serif text-[clamp(1.8rem,3.4vw,2.4rem)] leading-none text-ink">{stat}</p>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink/70 text-pretty">{label}</p>
    </div>
  );
}
