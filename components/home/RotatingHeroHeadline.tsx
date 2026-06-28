"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroSequence, LONGEST_HEADLINE, HERO_INTERVAL_MS } from "@/data/heroSequence";
import { cn } from "@/lib/cn";

/**
 * RotatingHeroHeadline — the main hero H1, rotating through the six supply-chain
 * statements (~10s each, ~60s loop) with smooth fades. Self-contained: it owns
 * its own rotation. An invisible spacer set to the longest headline reserves
 * height so the layout never jumps as the text changes. Honours
 * prefers-reduced-motion (no auto-rotate → first headline only, no fade).
 */
const H1_CLASS =
  "text-display font-medium text-white text-balance [text-shadow:0_2px_28px_rgba(6,16,13,0.55)]";

export function RotatingHeroHeadline() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSequence.length),
      HERO_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      {/* Invisible spacer — longest headline reserves a stable height */}
      <p aria-hidden className={cn("invisible", H1_CLASS)}>
        {LONGEST_HEADLINE}
      </p>

      {/* Visible rotating headline, overlaid on the spacer */}
      <h1 className={cn("absolute inset-0", H1_CLASS)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="block"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroSequence[index].headline}
          </motion.span>
        </AnimatePresence>
      </h1>
    </div>
  );
}
