import Link from "next/link";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-white p-6 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Stat / proof tile. The amber tick is the only accent. */
export function StatCard({
  value,
  label,
  note,
  tone = "ink",
}: {
  value: string;
  label: string;
  note?: string;
  tone?: "ink" | "white";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-6",
        tone === "white" ? "border-white/12 bg-white/[0.03]" : "border-line bg-paper",
      )}
    >
      <div className="flex items-baseline gap-2">
        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-amber" />
        <span className={cn("font-serif text-2xl sm:text-[1.75rem]", tone === "white" ? "text-white" : "text-ink")}>
          {value}
        </span>
      </div>
      <p className={cn("mt-3 text-sm font-semibold", tone === "white" ? "text-white/90" : "text-ink")}>{label}</p>
      {note && <p className={cn("mt-1 text-sm leading-snug", tone === "white" ? "text-white/50" : "text-ink/50")}>{note}</p>}
    </div>
  );
}

/** Linkable feature card with a quiet arrow affordance. */
export function LinkCard({
  href,
  title,
  children,
  cta = "Learn more",
}: {
  href: string;
  title: string;
  children: React.ReactNode;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 ease-out-soft hover:border-brand/40 hover:shadow-hover sm:p-7"
    >
      <h3 className="text-lg font-medium text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/60">{children}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {cta}
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
