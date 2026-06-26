"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { JourneyMilestone } from "@/data/journey";

const DURATION = 22000; // total auto-travel time (ms)
const DELAY = 1000; // pause after the section enters view before moving

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * The VRV Growth Ledger — an auto-moving horizontal growth flow.
 *
 * When the section scrolls into view it waits ~1s, then slowly travels from the
 * first milestone to the last (~22s, calm easing) and stops — it does not loop.
 * Hovering pauses it; any manual interaction (drag, wheel, touch, year chip)
 * hands control to the visitor permanently. Honours prefers-reduced-motion and
 * only auto-plays on desktop; on smaller screens it's a manual swipe.
 */
export function AutoMovingGrowthLedger({ milestones }: { milestones: JourneyMilestone[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  // Animation state (refs so re-renders don't restart the loop).
  const raf = useRef<number | null>(null);
  const elapsed = useRef(0);
  const lastTs = useRef<number | null>(null);
  const running = useRef(false);
  const done = useRef(false);
  const tookOver = useRef(false);
  const endRef = useRef(0);

  const step = useCallback((ts: number) => {
    if (!running.current) return;
    if (lastTs.current == null) lastTs.current = ts;
    elapsed.current += ts - lastTs.current;
    lastTs.current = ts;
    const p = Math.min(elapsed.current / DURATION, 1);
    const el = trackRef.current;
    if (el) el.scrollLeft = endRef.current * easeInOutCubic(p);
    if (p < 1) {
      raf.current = requestAnimationFrame(step);
    } else {
      running.current = false;
      done.current = true;
    }
  }, []);

  const play = useCallback(() => {
    if (done.current || tookOver.current || running.current) return;
    const el = trackRef.current;
    if (!el) return;
    endRef.current = el.scrollWidth - el.clientWidth;
    if (endRef.current <= 0) {
      done.current = true;
      return;
    }
    running.current = true;
    lastTs.current = null;
    raf.current = requestAnimationFrame(step);
  }, [step]);

  const pause = useCallback(() => {
    running.current = false;
    lastTs.current = null;
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  const takeOver = useCallback(() => {
    tookOver.current = true;
    pause();
  }, [pause]);

  // Start once when the section enters the viewport (desktop + motion allowed).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduce || !isDesktop) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          window.setTimeout(play, DELAY);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [play]);

  // Track the nearest milestone for the year indicators.
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.round(ratio * (milestones.length - 1)));
  }, [milestones.length]);

  const goTo = useCallback(
    (i: number) => {
      takeOver();
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: (i / (milestones.length - 1)) * max, behavior: "smooth" });
    },
    [milestones.length, takeOver],
  );

  // Mouse drag-to-scroll (touch uses native scrolling).
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    takeOver();
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const el = trackRef.current;
    if (el) el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-900 px-6 py-14 text-white shadow-card lg:px-12"
    >
      {/* Soft gradient texture + glow */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-700/30 via-transparent to-ocean-700/25" />
      <span aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-label text-emerald-300">Our journey</p>
        <h2 className="mt-4 text-balance font-serif text-h2 text-white">The VRV Growth Ledger</h2>
        <p className="mt-4 text-[17px] leading-relaxed text-white/70">
          VRV&apos;s journey reflects disciplined expansion — from a Singapore-based trading business to an integrated
          agro commodities and metals supply chain platform.
        </p>
      </div>

      {/* Auto-moving flow */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onWheel={(e) => {
          // Only a deliberate horizontal swipe hands over control — vertical
          // page scrolling past the section must not cancel the auto-travel.
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) takeOver();
        }}
        onTouchStart={takeOver}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={() => {
          endDrag();
        }}
        onMouseEnter={pause}
        onMouseLeave={() => {
          if (!tookOver.current && !done.current) play();
        }}
        className="no-scrollbar relative mt-12 cursor-grab snap-x snap-mandatory overflow-x-auto pb-2 active:cursor-grabbing lg:mt-14 lg:snap-none"
      >
        <div className="flex w-max gap-6 lg:py-4">
          {/* Faint baseline path behind the cards */}
          <span aria-hidden className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-white/10 lg:block" />

          {milestones.map((m, i) => {
            const isLast = i === milestones.length - 1;
            return (
              <article
                key={m.year}
                className={cn(
                  "group relative flex w-[300px] shrink-0 snap-start select-none flex-col rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.09] lg:w-[320px]",
                  isLast && "border-emerald-300/30 bg-white/[0.09] ring-1 ring-emerald-300/30",
                )}
              >
                <span className="absolute right-5 top-5 font-serif text-sm font-semibold text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="font-serif text-4xl font-semibold tracking-tight text-emerald-300">{m.year}</div>
                <div className="mt-3 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-label text-white/55">
                  {m.phase}
                </div>
                <h3 className="mt-3 font-serif text-xl text-white">{m.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/65">{m.description}</p>
                {isLast && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-label text-emerald-300">
                    Still growing
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Year indicators / progress */}
      <div className="relative mt-8 flex flex-wrap items-center gap-2">
        {milestones.map((m, i) => (
          <button
            key={m.year}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${m.year} — ${m.title}`}
            aria-current={active === i}
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors",
              active === i ? "bg-emerald-300 text-ink-900" : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white",
            )}
          >
            {m.year}
          </button>
        ))}
      </div>
    </section>
  );
}
