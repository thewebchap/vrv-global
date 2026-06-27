"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * The VRV Supply Chain Operating Model — a calm, premium animated flow from
 * origin to customer. A glowing marker advances stage-to-stage; nodes pulse
 * softly; a sustainability loop frames the chain. Horizontal on desktop,
 * vertical with animated connectors on mobile. All stage copy is real HTML
 * (kept in the DOM) for SEO/AEO. Honours prefers-reduced-motion.
 */
type Stage = { title: string; detail: string; icon: IconName };

const STAGES: Stage[] = [
  { title: "Origin", detail: "Producers, plantations and mines", icon: "leaf" },
  { title: "Aggregation", detail: "Cuplumps, ore and raw material gathering", icon: "cube" },
  { title: "Processing", detail: "Tolling, refining and value-add", icon: "factory" },
  { title: "Quality", detail: "Grade, inspection and documentation", icon: "search" },
  { title: "Trade Finance", detail: "Structuring, payment flows and risk control", icon: "scale" },
  { title: "Logistics", detail: "Warehousing, ports and shipping", icon: "truck" },
  { title: "Customer", detail: "Industrial buyers and global markets", icon: "globe" },
];

const N = STAGES.length;
const STEP_MS = 11000 / N;
const center = (i: number) => ((i + 0.5) / N) * 100;

export function SupplyChainOperatingModel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % N), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const activeIndex = reduce ? -1 : active;

  return (
    <div
      className="relative"
      role="img"
      aria-label="VRV supply chain operating model: origin, aggregation, processing, quality, trade finance, logistics and customer markets, framed by a sustainability loop."
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 route-pattern opacity-50" />

      {/* Sustainability loop accent */}
      <div className="relative z-10 mb-6 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-label text-brand">
        <Icon name="recycle" className="h-4 w-4 text-gold" />
        Sustainability & traceability across every stage
      </div>

      {/* DESKTOP — horizontal */}
      <div className="relative z-10 hidden lg:block">
        <div aria-hidden className="absolute left-[7.143%] right-[7.143%] top-7 -translate-y-1/2">
          <div className="h-0.5 w-full rounded-full bg-line" />
          <motion.div
            className="absolute left-0 top-0 h-0.5 rounded-full bg-gradient-to-r from-brand to-gold"
            initial={false}
            animate={{ width: reduce ? "100%" : `${(Math.max(active, 0) / (N - 1)) * 100}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute top-7 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(240,169,43,0.22),0_0_16px_rgba(240,169,43,0.85)]"
            initial={false}
            animate={{ left: `${center(active)}%` }}
            transition={{ type: "spring", stiffness: 55, damping: 16 }}
          />
        )}
        <div className="grid grid-cols-7 gap-3">
          {STAGES.map((s, i) => (
            <StageCard key={s.title} stage={s} index={i} active={activeIndex === i} expanded={focus === i || activeIndex === i} reduce={!!reduce} onEnter={() => setFocus(i)} onLeave={() => setFocus(null)} layout="h" />
          ))}
        </div>
      </div>

      {/* MOBILE / TABLET — vertical */}
      <div className="relative z-10 lg:hidden">
        <ol className="space-y-0">
          {STAGES.map((s, i) => (
            <li key={s.title}>
              <StageCard stage={s} index={i} active={activeIndex === i} expanded={focus === i || activeIndex === i} passed={!reduce && i < active} last={i === N - 1} reduce={!!reduce} onEnter={() => setFocus(i)} onLeave={() => setFocus(null)} layout="v" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  index,
  active,
  expanded,
  passed,
  last,
  reduce,
  layout,
  onEnter,
  onLeave,
}: {
  stage: Stage;
  index: number;
  active: boolean;
  expanded: boolean;
  passed?: boolean;
  last?: boolean;
  reduce: boolean;
  layout: "h" | "v";
  onEnter: () => void;
  onLeave: () => void;
}) {
  const node = (
    <span
      className={cn(
        "relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out-soft",
        active ? "scale-105 bg-brand text-white ring-4 ring-gold/30" : "bg-brand-50 text-brand",
      )}
    >
      <Icon name={stage.icon} className="h-6 w-6" />
      {active && !reduce && (
        <motion.span aria-hidden className="absolute inset-0 rounded-full ring-2 ring-gold" initial={{ opacity: 0.55, scale: 1 }} animate={{ opacity: 0, scale: 1.5 }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }} />
      )}
    </span>
  );

  const body = (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-label text-brand">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-1 font-serif text-[16px] text-ink">{stage.title}</h3>
      <div className={cn("grid transition-all duration-300 ease-out-soft", expanded ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <p className="overflow-hidden text-[12.5px] leading-snug text-ink/55">{stage.detail}</p>
      </div>
    </>
  );

  if (layout === "h") {
    return (
      <div className="flex flex-col items-center text-center" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div className="relative z-10">{node}</div>
        <div className="mt-4 w-full">{body}</div>
      </div>
    );
  }

  return (
    <div className="flex gap-4" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="flex flex-col items-center">
        <div className="relative z-10">{node}</div>
        {!last && <span aria-hidden className={cn("my-2 w-0.5 flex-1 rounded-full transition-colors duration-500", passed ? "bg-gradient-to-b from-brand to-gold" : "bg-line")} />}
      </div>
      <div className="flex-1 pb-6 pt-1">{body}</div>
    </div>
  );
}
