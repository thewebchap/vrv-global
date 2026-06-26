import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Icon + title + body card, optionally linkable. Used for pillars & features. */
export function FeatureCard({
  icon,
  title,
  children,
  href,
  tone = "brand",
  className,
}: {
  icon: IconName;
  title: string;
  children: React.ReactNode;
  href?: string;
  tone?: "brand" | "ocean" | "gold";
  className?: string;
}) {
  const badge = {
    brand: "bg-brand-50 text-brand",
    ocean: "bg-ocean-50 text-ocean",
    gold: "bg-gold/15 text-gold-700",
  }[tone];

  const body = (
    <>
      <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl", badge)}>
        <Icon name={icon} />
      </span>
      <h3 className="mt-5 text-lg font-medium text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/60">{children}</p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Learn more
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  const base =
    "group flex flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-300 ease-out-soft";

  return href ? (
    <Link href={href} className={cn(base, "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover", className)}>
      {body}
    </Link>
  ) : (
    <div className={cn(base, className)}>{body}</div>
  );
}

export function KPIGrid({
  items,
  cols = 4,
  tone = "light",
}: {
  items: { value: string; label: string; note?: string }[];
  cols?: 2 | 3 | 4;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={cn("grid grid-cols-1 gap-4", grid)}>
      {items.map((m) => (
        <div
          key={m.label}
          className={cn(
            "rounded-xl border p-6",
            dark ? "border-white/12 bg-white/[0.03]" : "border-line bg-paper",
          )}
        >
          <div className="flex items-baseline gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className={cn("font-serif text-2xl sm:text-[1.7rem] leading-tight", dark ? "text-white" : "text-ink")}>
              {m.value}
            </span>
          </div>
          <p className={cn("mt-3 text-sm font-semibold", dark ? "text-white/90" : "text-ink")}>{m.label}</p>
          {m.note && <p className={cn("mt-1 text-sm leading-snug", dark ? "text-white/50" : "text-ink/50")}>{m.note}</p>}
        </div>
      ))}
    </div>
  );
}
