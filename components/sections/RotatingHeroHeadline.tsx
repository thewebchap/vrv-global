"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * RotatingHeroHeadline — the main hero H1 rotating through six supply-chain
 * statements (~10s each, 60s loop) with smooth fades. An invisible spacer set
 * to the longest statement reserves height so the layout never jumps as the
 * text changes. Honours prefers-reduced-motion (no auto-rotate → first
 * statement only). Designed to overlay the hero video directly.
 */
const heroStatements = [
  "Global Sourcing Across Agro Commodities, Metals and Mining-Linked Ventures",
  "Traceable Ground-Zero Sourcing from Origin to Market",
  "Tolling, Refining and Value-Add Across Commodity Flows",
  "Quality Checks Built into Every Stage of the Supply Chain",
  "Satellite-Based Farm and Mine Mapping for Better Visibility",
  "Ethical and ESG-Aligned Supply Chains for Long-Term Value",
];

// Longest statement (by length) reserves the headline height to avoid jumps.
const LONGEST = heroStatements.reduce((a, b) => (b.length > a.length ? b : a), heroStatements[0]);

const INTERVAL_MS = 10000;

// Shared H1 typography (used for both the visible headline and the spacer).
const H1_CLASS = "text-display text-white text-balance [text-shadow:0_2px_28px_rgba(6,16,13,0.45)]";

export function RotatingHeroHeadline() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % heroStatements.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative max-w-[760px]">
      {/* Invisible spacer — longest statement reserves a stable height */}
      <p aria-hidden className={cn("invisible", H1_CLASS)}>{LONGEST}</p>

      {/* Visible rotating headline, overlaid on the spacer */}
      <h1 className={cn("absolute inset-0", H1_CLASS)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active}
            className="block"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroStatements[active]}
          </motion.span>
        </AnimatePresence>
      </h1>
    </div>
  );
}
