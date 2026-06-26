import { companyStats } from "@/data/companyStats";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Premium headline-stat cards — equal width AND height, centered, with a
 * dominant number and a smaller uppercase label. Reusable on the homepage
 * globe (dark) and the About page (light).
 */
export function StatCards({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", className)}>
      {companyStats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08}>
          <div
            className={cn(
              "flex h-full min-h-[128px] flex-col items-center justify-center rounded-2xl border p-5 text-center shadow-soft",
              dark ? "border-white/12 bg-white/[0.05]" : "border-line bg-white",
            )}
          >
            <span className={cn("font-serif text-3xl font-semibold leading-none md:text-[2.5rem]", dark ? "text-white" : "text-ink")}>
              {s.value}
            </span>
            <span className={cn("mt-3 text-[11px] font-semibold uppercase tracking-label", dark ? "text-white/60" : "text-ink/55")}>
              {s.label}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
