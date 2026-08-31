"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { COLORS, MURAL, STAGES } from "@/components/home3/route";
import { MasterRouteMural } from "@/components/home3/MasterRouteMural";
import { RouteStage } from "@/components/home3/RouteStage";
import { FinalRouteReveal } from "@/components/home3/FinalRouteReveal";
import { ShipMarker } from "@/components/home3/ShipMarker";

/**
 * Home3GraffitiRouteStory — a refined "route mural" scroll journey.
 *
 * One large dotted route composition (MasterRouteMural) spans the whole stack of
 * stages; the four clean split stages read as close-ups of it. A small ship
 * eases continuously along the route as you scroll (target lerped in rAF — no
 * jumps), harbours light up as it passes, and the voyage resolves in a separate
 * zoom-out map (FinalRouteReveal) whose faint route only subtly echoes VRV.
 * Text lives in its own columns and never overlays the photographs. Reduced
 * motion snaps the ship without easing.
 */
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const W = MURAL.viewBox.w;
const H = MURAL.viewBox.h;

type HB = { left: number; top: number; accent: string; label: string };

function CTA({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold transition-colors",
        primary ? "bg-[#0B2F44] text-white hover:bg-[#0B2F44]/90" : "border border-[#0B2F44]/25 text-[#0B2F44] hover:border-[#0B2F44]/50 hover:bg-[#0B2F44]/[0.03]",
      )}
    >
      {children}
    </Link>
  );
}

export function Home3GraffitiRouteStory() {
  const reduce = !!useReducedMotion();
  const stagesRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [harbours, setHarbours] = useState<HB[]>([]);

  useEffect(() => {
    const path = planRef.current;
    const trail = trailRef.current;
    // Guard: only run once the SVG path actually exists in the browser and
    // exposes a valid geometry length. If anything is off, the page still
    // renders statically (route + stages) without the moving ship.
    if (!path || !trail || typeof path.getTotalLength !== "function") return;
    let L = 0;
    try {
      L = path.getTotalLength();
    } catch {
      return;
    }
    if (!Number.isFinite(L) || L <= 0) return;

    // Harbour positions = the route point nearest each target y, as %.
    try {
      const hbs: HB[] = MURAL.harbourY.map((ty, i) => {
        let best = Infinity;
        let bp = path.getPointAtLength(0);
        for (let j = 0; j <= 600; j++) {
          const q = path.getPointAtLength((j / 600) * L);
          const d = Math.abs(q.y - ty);
          if (d < best) {
            best = d;
            bp = q;
          }
        }
        return { left: (bp.x / W) * 100, top: (bp.y / H) * 100, accent: STAGES[i].accent, label: STAGES[i].harbour };
      });
      setHarbours(hbs);
    } catch {
      /* harbours are decorative — skip if geometry is unavailable */
    }

    const cur = { v: 0 };
    const target = { v: 0 };
    let running = false;
    let raf = 0;

    const compute = () => {
      const el = stagesRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return clamp((window.innerHeight * 0.5 - rect.top) / rect.height, 0, 1);
    };

    const apply = (v: number) => {
      let pt: DOMPoint;
      try {
        pt = path.getPointAtLength(v * L);
      } catch {
        return;
      }
      if (shipRef.current) {
        shipRef.current.style.left = `${(pt.x / W) * 100}%`;
        shipRef.current.style.top = `${(pt.y / H) * 100}%`;
      }
      // green trail drawn 0→ship
      trail.setAttribute("stroke-dasharray", `${L}`);
      trail.setAttribute("stroke-dashoffset", `${L * (1 - v)}`);
    };

    const setActiveFrom = (v: number) => {
      const idx = clamp(Math.floor(v * STAGES.length), 0, STAGES.length - 1);
      setActive((prev) => (prev === idx ? prev : idx));
    };

    const frame = () => {
      cur.v += (target.v - cur.v) * 0.06;
      apply(cur.v);
      if (Math.abs(target.v - cur.v) > 0.0004) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
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

  return (
    <div className="bg-[#F6F3EC] text-[#0B2F44]">
      {/* Opening image-led hero — end-to-end sustainable commodity trading */}
      <section className="relative isolate flex min-h-[82vh] items-center overflow-hidden bg-[#0B2F44]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pictures/Products - Page Banner 1.jpg"
          alt="Global commodity trade and supply-chain movement from responsible sourcing to final delivery"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: "center" }}
        />
        {/* dark gradients keep text readable (image darkened only where text sits) */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071F2E]/92 via-[#071F2E]/62 to-[#071F2E]/25" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#071F2E]/80 to-transparent" />

        {/* subtle dotted route beginning + a small ship, introducing the journey */}
        <svg aria-hidden viewBox="0 0 1200 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-12 h-24 w-full">
          <path d="M60,150 C320,60 540,150 800,70 C1000,20 1100,90 1180,45" fill="none" stroke="rgba(246,243,236,0.45)" strokeWidth={1.5} strokeDasharray="4 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg aria-hidden viewBox="-16 -16 32 32" className="pointer-events-none absolute bottom-[84px] left-6 h-8 w-8 -rotate-6 sm:left-10">
          <path d="M-11,1 Q0,9 12,0 L8,-2 L-9,-2 Z" fill="#F6F3EC" />
          <line x1={-1} y1={-2} x2={-1} y2={-15} stroke="#F6F3EC" strokeWidth={1} />
          <path d="M-1,-3 L-1,-15 L8,-5 Z" fill="#F6F3EC" opacity={0.85} />
        </svg>

        <div className="container-x relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B8955B]">
              <span aria-hidden className="h-px w-6 bg-[#B8955B]" />
              End-to-end sustainable commodity trading
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.3rem,5.4vw,4.4rem)] font-medium leading-[1.03] tracking-tight text-white text-balance">
              End-to-End Sustainable Commodity Trading
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75 text-pretty">
              From responsible sourcing to final delivery, VRV Global integrates commodities, people, processing, quality, logistics and markets through transparent and traceable supply-chain execution.
            </p>
            <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">Scroll to sail the route</p>
          </div>
        </div>
      </section>

      {/* master route mural + stages */}
      <div ref={stagesRef} className="relative">
        {/* mural + ship + harbours (behind the content) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <MasterRouteMural planRef={planRef} trailRef={trailRef} />
          {harbours.map((hb, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${hb.left}%`, top: `${hb.top}%` }}>
              <span
                className="block h-3.5 w-3.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: active === i ? hb.accent : "#F6F3EC", boxShadow: `inset 0 0 0 ${active === i ? 2.2 : 1.4}px ${hb.accent}` }}
              />
            </div>
          ))}
          <div ref={shipRef} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "0%" }}>
            <svg width={34} height={34} viewBox="-17 -17 34 34" aria-hidden>
              <g transform="rotate(90)">
                <ShipMarker />
              </g>
            </svg>
          </div>
        </div>

        {/* stages sit above the mural, in clean columns */}
        <div className="relative z-10">
          {STAGES.map((s, i) => (
            <RouteStage key={s.id} stage={s} index={i} active={active === i} />
          ))}
        </div>
      </div>

      <FinalRouteReveal />

      {/* closing */}
      <section className="border-t border-[#0B2F44]/10 py-24">
        <div className="container-x text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] tracking-tight text-balance">
            From sustainable sourcing to final delivery, integrated as one chain.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CTA href="/products" primary>Explore Products</CTA>
            <CTA href="/contact?type=buyer">Start an Enquiry</CTA>
          </div>
        </div>
      </section>
    </div>
  );
}
