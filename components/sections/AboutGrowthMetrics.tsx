"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { CompanyStat } from "@/data/companyStats";

export type AboutStatsVariant = "premium-band" | "timeline-metrics";

/**
 * Count up an integer from 0 → target with an ease-out curve once `active`.
 * Respects prefers-reduced-motion (jumps straight to the final value).
 */
function useCountUp(target: number, active: boolean, duration = 1400) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  return value;
}

/**
 * Renders a stat value with a subtle count-up on the numeric portion, keeping
 * any prefix/suffix (e.g. "200k+", "20%", "15+", "2012") intact.
 */
function AnimatedValue({
  value,
  active,
  className,
}: {
  value: string;
  active: boolean;
  className?: string;
}) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";
  const current = useCountUp(target, active);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span className={className}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

/**
 * Premium, investor-ready presentation of the headline company stats.
 *
 *  - `premium-band`    → a single dark "Milestone Metrics" band with thin
 *                        vertical dividers, large numbers and supporting text.
 *  - `timeline-metrics`→ the same stats laid out as a flowing growth journey
 *                        with nodes connected by a subtle progress line.
 *
 * Responsive: 1 col (mobile, horizontal dividers) → 2×2 (tablet) → 4 (desktop).
 */
export function AboutGrowthMetrics({
  stats,
  variant = "premium-band",
  className,
}: {
  stats: CompanyStat[];
  variant?: AboutStatsVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (variant === "timeline-metrics") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] border border-line bg-paper px-6 py-12 sm:px-10 sm:py-14",
          className,
        )}
      >
        <div ref={ref} className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Flowing progress line connecting the nodes (desktop only) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[13px] hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent lg:block"
          />
          {stats.map((stat) => (
            <div key={stat.label} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-brand/30 bg-white shadow-soft">
                <span className="h-2.5 w-2.5 rounded-full bg-brand" />
              </span>
              <AnimatedValue
                value={stat.value}
                active={inView}
                className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl"
              />
              <span className="mt-2 text-[11px] font-semibold uppercase tracking-label text-brand">
                {stat.label}
              </span>
              <p className="mt-2 max-w-[24ch] text-[13px] leading-snug text-ink/60">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // premium-band (default)
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 px-4 py-12 text-white shadow-card sm:px-8 sm:py-14",
        className,
      )}
    >
      {/* Soft gradient texture + glow for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-700/30 via-transparent to-ocean-700/25"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
      />

      <div ref={ref} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center px-6 py-7 text-center",
              i > 0 && "border-t border-white/10",
              i === 1 && "sm:border-t-0",
              i % 2 === 1 && "sm:border-l sm:border-white/10",
              i > 0 && "lg:border-t-0 lg:border-l lg:border-white/10",
            )}
          >
            <AnimatedValue
              value={stat.value}
              active={inView}
              className="font-serif text-4xl font-semibold tracking-tight md:text-5xl"
            />
            <span className="mt-3 text-[11px] font-semibold uppercase tracking-label text-emerald-200">
              {stat.label}
            </span>
            <p className="mt-2 max-w-[24ch] text-[13px] leading-snug text-white/60">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
