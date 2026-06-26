"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { TempRoute } from "@/data/commodityNetwork";

/** Active-link cap by breakpoint: desktop 8 · tablet 5 · mobile 3. */
function useBreakpointMax(): number {
  const [max, setMax] = useState(8);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setMax(w < 640 ? 3 : w < 1024 ? 5 : 8);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return max;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/**
 * Cycles a small set of temporary links. Each active link lives 4–7s (random,
 * staggered) then is removed; the set is topped up to the breakpoint cap from
 * the remaining pool, so links continuously fade in and out without blinking
 * all at once. With prefers-reduced-motion, shows a static subset and no cycle.
 */
export function useRouteCycle(pool: TempRoute[], maxCap = 99): { active: TempRoute[]; reduce: boolean } {
  const reduce = useReducedMotion() ?? false;
  const max = Math.min(useBreakpointMax(), maxCap);
  const [active, setActive] = useState<TempRoute[]>([]);
  const poolKey = pool.map((r) => r.id).join(",");

  useEffect(() => {
    const cap = Math.min(max, pool.length);
    if (cap === 0) {
      setActive([]);
      return;
    }
    if (reduce) {
      setActive(shuffle(pool).slice(0, cap));
      return;
    }

    let current: { route: TempRoute; expires: number }[] = shuffle(pool)
      .slice(0, cap)
      .map((route, i) => ({ route, expires: Date.now() + rand(4000, 7000) + i * 400 }));
    setActive(current.map((a) => a.route));

    const t = setInterval(() => {
      const now = Date.now();
      current = current.filter((a) => a.expires > now);
      let guard = 0;
      while (current.length < cap && guard++ < 50) {
        const used = new Set(current.map((a) => a.route.id));
        const candidates = pool.filter((r) => !used.has(r.id));
        if (candidates.length === 0) break;
        const route = candidates[Math.floor(Math.random() * candidates.length)];
        current = [...current, { route, expires: now + rand(4000, 7000) }];
      }
      setActive(current.map((a) => a.route));
    }, 900);

    return () => clearInterval(t);
  }, [poolKey, max, reduce]);

  return { active, reduce };
}
