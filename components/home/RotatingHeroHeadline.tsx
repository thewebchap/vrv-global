"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroSlides, LONGEST_TITLE, LONGEST_DESCRIPTION, HERO_INTERVAL_MS } from "@/data/heroSequence";
import { cn } from "@/lib/cn";

/**
 * RotatingHeroHeadline — the homepage hero's rotating content: each slide is a
 * headline (H1) + supporting line that change together every 5s (25s cycle,
 * looping) with a subtle fade. Self-contained: it owns its own rotation.
 * Invisible spacers set to the longest title / description reserve stable
 * heights so the layout never jumps. Honours prefers-reduced-motion (no
 * auto-rotate → first slide only, no fade), and cleans up its interval.
 */
const H1_CLASS =
  "text-display font-medium text-white text-balance [text-shadow:0_2px_28px_rgba(6,16,13,0.55)]";
const DESC_CLASS = "text-[18px] leading-relaxed text-white/80 text-pretty";

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function RotatingHeroHeadline() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const interval = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      HERO_INTERVAL_MS,
    );
    return () => clearInterval(interval);
  }, [reduce]);

  const slide = heroSlides[index];

  return (
    <div>
      {/* Headline — invisible spacer (longest title) reserves a stable height */}
      <div className="relative">
        <p aria-hidden className={cn("invisible", H1_CLASS)}>{LONGEST_TITLE}</p>
        <h1 className={cn("absolute inset-0", H1_CLASS)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              className="block"
              initial={reduce ? false : fade.initial}
              animate={fade.animate}
              exit={reduce ? { opacity: 1 } : fade.exit}
              transition={fade.transition}
            >
              {slide.title}
            </motion.span>
          </AnimatePresence>
        </h1>
      </div>

      {/* Supporting line — its own spacer (longest description) for stable height */}
      <div className="relative mt-6 max-w-xl">
        <p aria-hidden className={cn("invisible", DESC_CLASS)}>{LONGEST_DESCRIPTION}</p>
        <div className={cn("absolute inset-0", DESC_CLASS)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={reduce ? false : fade.initial}
              animate={fade.animate}
              exit={reduce ? { opacity: 1 } : fade.exit}
              transition={fade.transition}
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
