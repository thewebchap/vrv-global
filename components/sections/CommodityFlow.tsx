"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * VRV Commodity Flow — a premium, accessible animation explaining how VRV
 * Global moves commodities from source to market. A glowing marker advances
 * stage-to-stage on a ~11s loop; hover / focus / tap reveals each stage's
 * explanation. Horizontal on desktop, vertical with animated connectors on
 * mobile. All stage copy is rendered as real HTML (kept in the DOM even when
 * collapsed) so search and AI engines can read the full process. Honours
 * prefers-reduced-motion.
 */
type Step = { title: string; short: string; long: string; icon: IconName };

const STEPS: Step[] = [
  {
    title: "Sourcing",
    short: "Trusted producers, plantations, mines, and commodity suppliers.",
    long: "VRV identifies and works with trusted producers, mines, plantations, and commodity partners across key markets.",
    icon: "leaf",
  },
  {
    title: "Quality & Due Diligence",
    short: "Review of grade, origin, documentation, and trade suitability.",
    long: "Commodities are reviewed for grade, quality, documentation, origin, and trade suitability.",
    icon: "search",
  },
  {
    title: "Procurement",
    short: "Structured commercial terms, pricing references, and supply agreements.",
    long: "VRV structures trade terms, supply agreements, pricing references, and commercial documentation.",
    icon: "doc",
  },
  {
    title: "Logistics",
    short: "Coordinated movement through warehouses, ports, shipping, and delivery channels.",
    long: "The commodity is moved through warehousing, inland transport, ports, shipping, and international logistics partners.",
    icon: "truck",
  },
  {
    title: "Finance & Risk",
    short: "Documentation, payment flow, risk visibility, and transaction controls.",
    long: "VRV manages documentation, payment flows, risk controls, and transaction visibility.",
    icon: "scale",
  },
  {
    title: "Global Markets",
    short: "Delivery to industrial buyers, processors, manufacturers, and trade partners.",
    long: "Commodities are delivered to industrial buyers, manufacturers, processors, and international trading partners.",
    icon: "globe",
  },
];

const N = STEPS.length;
const CYCLE_MS = 10800; // ~11s full cycle
const STEP_MS = CYCLE_MS / N;
const center = (i: number) => ((i + 0.5) / N) * 100; // % position of each node

const PILLARS: { icon: IconName; title: string; body: string }[] = [
  { icon: "leaf", title: "Reliable Sourcing", body: "Trusted producers and origin partners across key commodity markets." },
  { icon: "doc", title: "Structured Trade", body: "Disciplined commercial structuring, documentation and risk control." },
  { icon: "globe", title: "Global Delivery", body: "Dependable delivery to industrial buyers and markets worldwide." },
];

export function CommodityFlow() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % N), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const activeIndex = reduce ? -1 : active;
  const emphasized = focus ?? activeIndex;

  return (
    <div className="relative">
      <span aria-hidden className="pointer-events-none absolute inset-0 route-pattern opacity-60" />

      {/* DESKTOP — horizontal flow */}
      <div className="relative z-10 hidden lg:block">
        {/* Track + animated progress */}
        <div aria-hidden className="absolute left-[8.333%] right-[8.333%] top-7 -translate-y-1/2">
          <div className="h-0.5 w-full rounded-full bg-line" />
          <motion.div
            className="absolute left-0 top-0 h-0.5 rounded-full bg-gradient-to-r from-brand to-gold"
            initial={false}
            animate={{ width: reduce ? "100%" : `${(Math.max(active, 0) / (N - 1)) * 100}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {/* Glowing commodity marker */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute top-7 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(240,169,43,0.22),0_0_16px_rgba(240,169,43,0.85)]"
            initial={false}
            animate={{ left: `${center(active)}%` }}
            transition={{ type: "spring", stiffness: 55, damping: 16 }}
          />
        )}

        <div className="grid grid-cols-6 gap-4">
          {STEPS.map((s, i) => (
            <StepCard
              key={s.title}
              step={s}
              index={i}
              active={activeIndex === i}
              emphasized={emphasized === i}
              expanded={focus === i || activeIndex === i}
              reduce={!!reduce}
              layout="h"
              onEnter={() => setFocus(i)}
              onLeave={() => setFocus(null)}
              onTap={() => setFocus((f) => (f === i ? null : i))}
            />
          ))}
        </div>
      </div>

      {/* MOBILE / TABLET — vertical flow with animated connectors */}
      <div className="relative z-10 lg:hidden">
        <ol className="space-y-0">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <StepCard
                step={s}
                index={i}
                active={activeIndex === i}
                emphasized={emphasized === i}
                expanded={focus === i || activeIndex === i}
                passed={!reduce && i < active}
                last={i === N - 1}
                reduce={!!reduce}
                layout="v"
                onEnter={() => setFocus(i)}
                onLeave={() => setFocus(null)}
                onTap={() => setFocus((f) => (f === i ? null : i))}
              />
            </li>
          ))}
        </ol>
      </div>

      {/* Value pillars */}
      <div className="relative z-10 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icon name={p.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="font-serif text-lg text-ink">{p.title}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink/60">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
  active,
  emphasized,
  expanded,
  passed,
  last,
  reduce,
  layout,
  onEnter,
  onLeave,
  onTap,
}: {
  step: Step;
  index: number;
  active: boolean;
  emphasized: boolean;
  expanded: boolean;
  passed?: boolean;
  last?: boolean;
  reduce: boolean;
  layout: "h" | "v";
  onEnter: () => void;
  onLeave: () => void;
  onTap: () => void;
}) {
  const interactive = {
    role: "button" as const,
    tabIndex: 0,
    "aria-expanded": expanded,
    "aria-label": `Stage ${index + 1}: ${step.title}. ${step.long}`,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
    onClick: onTap,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onTap();
      }
    },
  };

  const node = (
    <span
      className={cn(
        "relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out-soft",
        active
          ? "scale-105 bg-brand text-white ring-4 ring-gold/30"
          : emphasized
            ? "bg-brand-50 text-brand ring-2 ring-brand/20"
            : "bg-brand-50 text-brand",
      )}
    >
      <Icon name={step.icon} className="h-6 w-6" />
      {active && !reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full ring-2 ring-gold"
          initial={{ opacity: 0.55, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </span>
  );

  const body = (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-label text-brand">Step {index + 1}</p>
      <h3 className="mt-1 font-serif text-[17px] text-ink">{step.title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/60">{step.short}</p>
      {/* Full explanation — kept in the DOM for SEO/AEO; smoothly revealed */}
      <div className={cn("grid transition-all duration-300 ease-out-soft", expanded ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <p className="overflow-hidden text-[13px] leading-relaxed text-ink/55">{step.long}</p>
      </div>
    </>
  );

  if (layout === "h") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="relative z-10">{node}</div>
        <div
          {...interactive}
          className={cn(
            "mt-5 w-full cursor-default rounded-2xl border bg-white p-4 text-left shadow-soft outline-none transition-all duration-300 ease-out-soft focus-visible:ring-2 focus-visible:ring-brand",
            emphasized ? "-translate-y-0.5 border-brand/40 shadow-hover" : "border-line hover:border-brand/30",
          )}
        >
          {body}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="relative z-10">{node}</div>
        {!last && (
          <span
            aria-hidden
            className={cn(
              "my-2 w-0.5 flex-1 rounded-full transition-colors duration-500",
              passed ? "bg-gradient-to-b from-brand to-gold" : "bg-line",
            )}
          />
        )}
      </div>
      <div
        {...interactive}
        className={cn(
          "mb-4 flex-1 cursor-default rounded-2xl border bg-white p-4 text-left shadow-soft outline-none transition-all duration-300 ease-out-soft focus-visible:ring-2 focus-visible:ring-brand",
          emphasized ? "border-brand/40 shadow-hover" : "border-line",
        )}
      >
        {body}
      </div>
    </div>
  );
}
