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
      {/* intro */}
      <section className="container-x pt-28 pb-8 sm:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: COLORS.sea }}>
          A maritime supply-chain journey
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-tight text-balance">
          Source to destination, sailed as one route.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#0B2F44]/60 text-pretty">
          One continuous route connects every stage — sourcing, processing, assurance and shipment — integrated end to end.
        </p>
        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-[#0B2F44]/40">Scroll to sail the route</p>
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
