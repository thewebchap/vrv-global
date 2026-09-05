"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { RotatingHeroHeadline } from "@/components/home/RotatingHeroHeadline";
import { heroSlides } from "@/data/heroSequence";

/**
 * Home5Hero — the spacious, scroll-driven hero (alternate /home5 concept).
 *
 * The approved hero content is preserved verbatim and presented as scroll
 * STAGES. A wide banner image (contained, never full-screen) crossfades between
 * stages; a subtle dotted maritime route frames the image along its rectangle
 * perimeter, revealed ONLY behind the ship as it eases from harbour to harbour.
 * Nothing about the shared homepage sections or the main "/" hero is touched.
 */
const N = heroSlides.length;
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

const HERO_BG =
  "radial-gradient(circle at 82% 22%, rgba(47,125,90,0.08), transparent 34%), linear-gradient(135deg, #F8F6F1 0%, #FFFFFF 55%, #F3F6F4 100%)";

const ROUTE_VB = { w: 1000, h: 560 };
// Slightly hand-plotted rounded rectangle — subtly uneven corners/edges so the
// frame reads as a maritime route rather than a mechanical box.
const ROUTE_D = "M42,18 H956 Q983,15 985,42 V518 Q986,546 959,545 H40 Q14,547 16,520 V40 Q14,16 42,18 Z";
const HARBOUR_F = [0.03, 0.2, 0.4, 0.55, 0.73, 0.92];

const STAGE_KIND = ["tree", "gear", "ingot", "mine", "loop", "ppp"] as const;
type Kind = (typeof STAGE_KIND)[number];
const ACCENTS = ["#2F7D5A", "#0B2F44", "#B87333", "#B8955B", "#2F7D5A", "#B8955B"];
// Short uppercase trade-route labels + generic trade-record values per stage.
const STAGE_LABEL = ["SOURCE", "PROCESS", "METALS", "MINE", "IMPACT", "GROWTH"];
const STAGE_NAME = ["Origin", "Processing", "Metals", "Mining", "Impact", "Growth"];

/** Thin-line, commodity-specific stage icon. Decorative. */
function StageIcon({ kind, className }: { kind: Kind; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...p}>
      {kind === "tree" && (<><path d="M12 21v-6" /><path d="M12 15c-3 0-5-2-5-4.5C7 8 9 6 12 6s5 2 5 4.5C17 13 15 15 12 15z" /><path d="M12 6V3" /></>)}
      {kind === "gear" && (<><circle cx="12" cy="12" r="3.2" /><path d="M12 4.5V3M12 21v-1.5M19.5 12H21M3 12h1.5M17 7l1-1M6 18l1-1M17 17l1 1M6 6l1 1" /></>)}
      {kind === "ingot" && (<><path d="M4 15l3-4h10l3 4-2 3H6z" /><path d="M8 11l1.5-2h5L16 11" /></>)}
      {kind === "mine" && (<><path d="M3 18c3-2 6-2 9 0s6 2 9 0" /><path d="M4 14c2.5-1.6 5-1.6 8 0s5.5 1.6 8 0" /><path d="M12 11V4l3 2" /><circle cx="12" cy="11" r="0.6" fill="currentColor" stroke="none" /></>)}
      {kind === "loop" && (<><path d="M6 9a7 7 0 0 1 11-1.5" /><path d="M18 15A7 7 0 0 1 7 16.5" /><path d="M17 5v3h-3M7 19v-3h3" /></>)}
      {kind === "ppp" && (<><circle cx="12" cy="6.5" r="2" /><circle cx="7" cy="15" r="2" /><circle cx="17" cy="15" r="2" /><path d="M12 8.5v3M10.5 13.5L9 14M13.5 13.5L15 14" /></>)}
    </svg>
  );
}

export function Home5Hero() {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const shipGlyphRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [harbours, setHarbours] = useState<{ left: number; top: number }[]>([]);

  useEffect(() => {
    const path = planRef.current;
    const mask = maskRef.current;
    if (!path || !mask || typeof path.getTotalLength !== "function") return;
    let L = 0;
    try {
      L = path.getTotalLength();
    } catch {
      return;
    }
    if (!Number.isFinite(L) || L <= 0) return;

    try {
      setHarbours(HARBOUR_F.map((f) => {
        const pt = path.getPointAtLength(f * L);
        return { left: (pt.x / ROUTE_VB.w) * 100, top: (pt.y / ROUTE_VB.h) * 100 };
      }));
    } catch {
      /* harbours are decorative */
    }

    const cur = { v: 0 };
    const target = { v: 0 };
    let running = false;
    let raf = 0;

    const compute = () => {
      const el = sectionRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      return dist > 0 ? clamp(-rect.top / dist, 0, 1) : 0;
    };
    const shipFrac = (p: number) => {
      const k = clamp(Math.floor(p * (N - 1)), 0, N - 2);
      const t = smooth(clamp((p - k / (N - 1)) / (1 / (N - 1)), 0, 1));
      return lerp(HARBOUR_F[k], HARBOUR_F[k + 1], t);
    };
    const apply = (v: number) => {
      const f = shipFrac(v);
      let pt: DOMPoint, a: DOMPoint, b: DOMPoint;
      try {
        pt = path.getPointAtLength(f * L);
        a = path.getPointAtLength(Math.max(0, f * L - 3));
        b = path.getPointAtLength(Math.min(L, f * L + 3));
      } catch {
        return;
      }
      if (shipRef.current) {
        shipRef.current.style.left = `${(pt.x / ROUTE_VB.w) * 100}%`;
        shipRef.current.style.top = `${(pt.y / ROUTE_VB.h) * 100}%`;
      }
      if (shipGlyphRef.current) {
        const ang = clamp((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI * 0.18, -14, 14);
        shipGlyphRef.current.style.transform = `rotate(${ang}deg)`;
      }
      mask.setAttribute("stroke-dashoffset", `${1 - f}`);
    };
    const setActiveFrom = (v: number) => {
      const idx = clamp(Math.round(v * (N - 1)), 0, N - 1);
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const frame = () => {
      cur.v += (target.v - cur.v) * 0.09;
      apply(cur.v);
      if (Math.abs(target.v - cur.v) > 0.0005) raf = requestAnimationFrame(frame);
      else running = false;
    };
    const onScroll = () => {
      target.v = compute();
      setActiveFrom(target.v);
      if (reduce) {
        cur.v = target.v;
        apply(cur.v);
        return;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    target.v = compute();
    cur.v = target.v;
    apply(cur.v);
    setActiveFrom(target.v);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const accent = ACCENTS[active];

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${N * 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden pt-20 lg:items-center lg:pt-0" style={{ background: HERO_BG }}>
        {/* faint trade-map grid (decorative, desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-[0.5] lg:block"
          style={{
            backgroundImage: "radial-gradient(rgba(11,47,68,0.06) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(circle at 78% 34%, black, transparent 62%)",
            WebkitMaskImage: "radial-gradient(circle at 78% 34%, black, transparent 62%)",
          }}
        />

        {/* faint per-stage commodity motif watermark (desktop) */}
        <div aria-hidden className="pointer-events-none absolute bottom-4 left-4 hidden opacity-[0.06] lg:block" style={{ color: accent, transition: "color 500ms ease" }}>
          <StageIcon kind={STAGE_KIND[active]} className="h-44 w-44" />
        </div>

        <div className="container-x relative z-10 grid w-full items-center gap-4 pb-8 lg:grid-cols-12 lg:gap-14 lg:pb-0">
          {/* Content — left, spacious */}
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-label text-gold-700">
              <span aria-hidden className="h-px w-6 bg-gold" />
              Singapore-headquartered commodity supply-chain integrator
            </p>
            <div className="mt-4 lg:mt-6">
              <RotatingHeroHeadline index={active} tone="dark" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-9 lg:gap-4">
              <Button href="/products" variant="primary" size="lg" withArrow>Explore Products</Button>
              <Button href="/contact?type=buyer" variant="outline" size="lg">Start an Enquiry</Button>
            </div>
          </div>

          {/* Banner image — the rectangle border route + harbours + ship wrap it. */}
          <div className="lg:col-span-7 lg:pr-8 xl:pr-12">
            {/* On mobile the card is capped so the compact banner + route fit the first screen. */}
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[440px] lg:max-w-none">
              {/* the active banner image (contained; crossfades per stage) */}
              <div className="relative z-10 w-full overflow-hidden rounded-2xl shadow-[0_28px_70px_rgba(7,31,46,0.16)] ring-1 ring-black/5" style={{ aspectRatio: "16 / 9" }}>
                {heroSlides.map((slide, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={slide.image}
                    src={slide.image}
                    alt={i === active ? slide.imageAlt : ""}
                    aria-hidden={i === active ? undefined : true}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-out motion-reduce:transition-none"
                    style={{ objectPosition: slide.imagePosition, opacity: i === active ? 1 : 0, transform: i === active ? "translateX(0)" : "translateX(16px)" }}
                  />
                ))}
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5" style={{ backgroundColor: accent, opacity: 0.9, transition: "background-color 500ms ease" }} />
              </div>

              {/* Rectangle border route (revealed behind the ship) + harbours + ship.
                  Shown on mobile too (tighter inset); labels/panel hide on mobile. */}
              <div aria-hidden className="pointer-events-none absolute -inset-3 z-20 lg:-inset-9 xl:-inset-12">
                <svg viewBox={`0 0 ${ROUTE_VB.w} ${ROUTE_VB.h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <defs>
                    <mask id="home5TrailReveal" maskUnits="userSpaceOnUse" x={0} y={0} width={ROUTE_VB.w} height={ROUTE_VB.h}>
                      <path ref={maskRef} d={ROUTE_D} fill="none" stroke="#fff" strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
                    </mask>
                  </defs>
                  <path ref={planRef} d={ROUTE_D} fill="none" stroke="none" />
                  <path d={ROUTE_D} fill="none" stroke="rgba(47,125,90,0.55)" strokeWidth={1.8} strokeDasharray="4 10" strokeLinecap="round" mask="url(#home5TrailReveal)" />
                </svg>

                {harbours.map((h, i) => {
                  const on = i === active;
                  const reached = active >= i;
                  return (
                    <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${h.left}%`, top: `${h.top}%`, opacity: reached ? 1 : 0, transition: "opacity 500ms ease" }}>
                      <span
                        className="grid h-6 w-6 place-items-center rounded-[7px] bg-white/95 transition-all duration-300 lg:h-8 lg:w-8 lg:rounded-[8px]"
                        style={{
                          border: `1px solid ${on ? ACCENTS[i] : "rgba(11,47,68,0.14)"}`,
                          boxShadow: on ? `0 10px 26px rgba(7,31,46,0.14), 0 0 0 3px ${ACCENTS[i]}1f` : "0 8px 22px rgba(7,31,46,0.08)",
                          color: on ? ACCENTS[i] : "rgba(11,47,68,0.42)",
                          transform: on ? "scale(1.08)" : "scale(0.92)",
                        }}
                      >
                        <StageIcon kind={STAGE_KIND[i]} className="h-4 w-4" />
                      </span>
                      {(() => {
                        const dx = h.left - 50;
                        const dy = h.top - 50;
                        const m = Math.hypot(dx, dy) || 1;
                        const ox = (dx / m) * 30;
                        const oy = (dy / m) * 30;
                        return (
                          <span
                            className="pointer-events-none absolute left-1/2 top-1/2 hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.22em] lg:block"
                            style={{ transform: `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`, color: on ? ACCENTS[i] : "rgba(11,47,68,0.42)", transition: "color 300ms ease" }}
                          >
                            {STAGE_LABEL[i]}
                          </span>
                        );
                      })()}
                    </div>
                  );
                })}

                <div ref={shipRef} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "3%", top: "3%" }}>
                  <div ref={shipGlyphRef} className="drop-shadow-[0_6px_14px_rgba(7,31,46,0.28)]" style={{ transition: "transform 200ms ease" }}>
                    <svg width={20} height={20} viewBox="-10 -10 20 20" aria-hidden>
                      <rect x={-9} y={-9} width={18} height={18} rx={5} fill="#ffffff" />
                      <path d="M-7,1 Q0,6 8,0 L5,-2 L-6,-2 Z" fill="#0B2F44" />
                      <line x1={-0.5} y1={-2} x2={-0.5} y2={-9} stroke="#0B2F44" strokeWidth={1} />
                      <path d="M-0.5,-3 L-0.5,-9 L5,-4 Z" fill="rgba(11,47,68,0.4)" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Trade-document mini-panel — a subtle stamp/record, updates per stage. */}
              <div aria-hidden className="absolute -bottom-8 left-2 z-30 hidden w-[196px] rounded-xl border border-ink/10 bg-white/90 p-3.5 shadow-[0_14px_34px_rgba(7,31,46,0.12)] backdrop-blur-sm lg:block">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-ink/45">Trade record</span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent, transition: "background-color 400ms ease" }} />
                </div>
                <dl className="mt-2.5 space-y-1.5 text-[11.5px]">
                  <div className="flex items-center justify-between gap-3"><dt className="text-ink/45">Stage</dt><dd className="font-medium text-ink/80">{STAGE_NAME[active]}</dd></div>
                  <div className="flex items-center justify-between gap-3"><dt className="text-ink/45">Flow</dt><dd className="font-medium text-ink/80">Commodity Supply</dd></div>
                  <div className="flex items-center justify-between gap-3"><dt className="text-ink/45">Status</dt><dd className="font-semibold" style={{ color: accent }}>{active === N - 1 ? "Complete" : "In Progress"}</dd></div>
                </dl>
              </div>

            </div>
          </div>
        </div>

        {/* scroll cue (first stage only) */}
        <div aria-hidden className={cn("absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-500", active === 0 ? "opacity-100" : "opacity-0")}>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink/35">Scroll through the chain</span>
        </div>
      </div>
    </div>
  );
}
