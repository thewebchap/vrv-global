"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { CANVAS, COLORS, REVEAL, ROUTE_D, STAGES, STATION_F, type IconKind } from "@/components/home6/route";

/**
 * Home6RouteStory — a cinematic scroll voyage. The camera flies close to one
 * banner station at a time while a ship sails a hidden slanted V·R·V route;
 * only the travelled dotted trail is revealed (masked to the ship). On the final
 * scroll the camera zooms out, the banners morph into icons and the full route
 * resolves into a subtle V·R·V beneath the tagline. Camera / ship / trail update
 * imperatively; the active stage lives in state for the text + morph crossfades.
 * Reduced-motion snaps without easing.
 */
const N = 6; // 5 stages + final reveal
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

const WIN = { w: 430, h: 280 };
const REVEAL_VB = { x: 110, y: 235, w: 1250, h: 470 };
const BW = 300;
const BH = 131; // ~16/7 banner
type VB = { x: number; y: number; w: number; h: number };

const HERO_BG =
  "radial-gradient(circle at 84% 20%, rgba(47,125,90,0.08), transparent 34%), linear-gradient(140deg, #F8F6F1 0%, #FFFFFF 56%, #F3F6F4 100%)";

/** Icon elements in a 24-unit box (no wrapper) — drawn directly in the scene. */
function iconEls(kind: IconKind) {
  if (kind === "tree") return (<><path d="M12 21v-6" /><path d="M12 15c-3 0-5-2-5-4.5C7 8 9 6 12 6s5 2 5 4.5C17 13 15 15 12 15z" /><path d="M12 6V3" /></>);
  if (kind === "factory") return (<><path d="M3 20V11l5 3V11l5 3V8h3v12z" /><path d="M3 20h15" /><path d="M6 17h2M10 17h2" /></>);
  if (kind === "cert") return (<><rect x="5" y="3.5" width="10" height="14" rx="1.5" /><path d="M7.5 8h5M7.5 11h5" /><circle cx="16.5" cy="15.5" r="3.2" /><path d="M14.9 15.5l1.1 1.1 1.9-2.1" /></>);
  if (kind === "ship") return (<><path d="M4 14h15l-2 5H6z" /><path d="M8 14V8h5l3 6" /><path d="M3 20c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0" /></>);
  return (<><path d="M6 9a7 7 0 0 1 11-1.5" /><path d="M18 15A7 7 0 0 1 7 16.5" /><path d="M17 5v3h-3M7 19v-3h3" /></>);
}

function CTA({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link href={href} className={cn("inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold transition-colors", primary ? "bg-[#0B2F44] text-white hover:bg-[#0B2F44]/90" : "border border-[#0B2F44]/25 text-[#0B2F44] hover:border-[#0B2F44]/50 hover:bg-[#0B2F44]/[0.03]")}>
      {children}
    </Link>
  );
}

export function Home6RouteStory() {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const planRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<SVGGElement>(null);
  const [active, setActive] = useState(0);
  const [stations, setStations] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const path = planRef.current;
    const mask = maskRef.current;
    const svg = svgRef.current;
    if (!path || !mask || !svg || typeof path.getTotalLength !== "function") return;
    let L = 0;
    try {
      L = path.getTotalLength();
    } catch {
      return;
    }
    if (!Number.isFinite(L) || L <= 0) return;
    mask.setAttribute("stroke-dasharray", `${L}`);

    let pts: { x: number; y: number }[] = [];
    try {
      pts = STATION_F.map((f) => {
        const q = path.getPointAtLength(f * L);
        return { x: q.x, y: q.y };
      });
    } catch {
      return;
    }
    setStations(pts);

    const frame = (c: { x: number; y: number }): VB => ({ x: c.x - WIN.w / 2, y: c.y - WIN.h / 2, w: WIN.w, h: WIN.h });
    const S = pts.map(frame);
    // camera per stage boundary: hold S0 through stage 0, fly S0→S1…→S4, then zoom out.
    const CAM: VB[] = [S[0], S[0], S[1], S[2], S[3], S[4], REVEAL_VB];
    const STOPS = [0, STATION_F[0], STATION_F[1], STATION_F[2], STATION_F[3], STATION_F[4], STATION_F[4]];

    const setVB = (v: VB) => svg.setAttribute("viewBox", `${v.x} ${v.y} ${v.w} ${v.h}`);
    setVB(S[0]);

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
    const seg = (p: number) => clamp(Math.floor(p * N), 0, N - 1);

    const apply = (p: number) => {
      const k = seg(p);
      const t = smooth(clamp((p - k / N) / (1 / N), 0, 1));
      // ship
      const f = lerp(STOPS[k], STOPS[k + 1], t);
      let pt: DOMPoint, a: DOMPoint, b: DOMPoint;
      try {
        pt = path.getPointAtLength(f * L);
        a = path.getPointAtLength(Math.max(0, f * L - 4));
        b = path.getPointAtLength(Math.min(L, f * L + 4));
      } catch {
        return;
      }
      const ang = clamp((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI * 0.2, -16, 16);
      shipRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${ang})`);
      mask.setAttribute("stroke-dashoffset", `${L * (1 - f)}`);
      // camera
      const c0 = CAM[k];
      const c1 = CAM[k + 1];
      setVB({ x: lerp(c0.x, c1.x, t), y: lerp(c0.y, c1.y, t), w: lerp(c0.w, c1.w, t), h: lerp(c0.h, c1.h, t) });
    };
    const setActiveFrom = (p: number) => {
      const idx = clamp(Math.floor(p * N), 0, N - 1);
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const loop = () => {
      cur.v += (target.v - cur.v) * 0.025;
      apply(cur.v);
      if (Math.abs(target.v - cur.v) > 0.0004) raf = requestAnimationFrame(loop);
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
        raf = requestAnimationFrame(loop);
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

  const reveal = active === N - 1;
  const textStages = STAGES.map((s) => ({ eyebrow: s.eyebrow, title: s.title, sub: s.sub, accent: s.accent }));

  return (
    <div ref={sectionRef} className="relative bg-[#F6F3EC] text-[#0B2F44]" style={{ height: `${N * 80}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden pt-20 lg:items-center lg:pt-0" style={{ background: HERO_BG }}>
        <div className="container-x relative z-10 grid w-full items-center gap-6 pb-6 lg:grid-cols-12 lg:gap-12 lg:pb-0">
          {/* Text — crossfades per stage; tagline on reveal */}
          <div className="lg:col-span-5">
            <div className="relative min-h-[220px] sm:min-h-[240px]">
              {textStages.map((s, i) => (
                <div key={i} className={cn("absolute inset-0 transition-opacity duration-700", i === active ? "opacity-100" : "pointer-events-none opacity-0")}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: s.accent }}>{s.eyebrow}</p>
                  <h1 className="mt-4 font-serif text-[clamp(1.9rem,4vw,3.3rem)] font-medium leading-[1.06] tracking-tight text-balance">{s.title}</h1>
                  <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#0B2F44]/65 text-pretty">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-8 lg:gap-4">
              <CTA href="/products" primary>Explore Products</CTA>
              <CTA href="/contact?type=buyer">Start an Enquiry</CTA>
            </div>
          </div>

          {/* Voyage canvas */}
          <div className="lg:col-span-7">
            <div className="relative h-[42vh] w-full sm:h-[48vh] lg:h-[74vh]">
              <svg ref={svgRef} viewBox={`${230 - WIN.w / 2} ${440 - WIN.h / 2} ${WIN.w} ${WIN.h}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  {STAGES.map((_, i) => (
                    <clipPath key={i} id={`h6clip${i}`}>
                      <rect x={(stations[i]?.x ?? 0) - BW / 2} y={(stations[i]?.y ?? 0) - BH / 2} width={BW} height={BH} rx={14} />
                    </clipPath>
                  ))}
                  <mask id="h6reveal">
                    <rect x={0} y={0} width={CANVAS.w} height={CANVAS.h} fill="black" />
                    <path ref={maskRef} d={ROUTE_D} fill="none" stroke="white" strokeWidth={70} strokeLinecap="round" />
                  </mask>
                </defs>

                {/* faint sea/trade-map grid — subtle throughout, so each leg reads
                    as a nautical chart, not a letter being drawn. */}
                <g stroke={COLORS.sea} strokeOpacity={reveal ? 0.07 : 0.035} strokeWidth={0.6} style={{ transition: "stroke-opacity 1100ms ease" }}>
                  {Array.from({ length: 17 }, (_, i) => (i + 1) * 50).map((v) => <line key={"h" + v} x1={0} y1={v} x2={CANVAS.w} y2={v} />)}
                  {Array.from({ length: 27 }, (_, i) => (i + 1) * 50).map((v) => <line key={"v" + v} x1={v} y1={0} x2={v} y2={CANVAS.h} />)}
                </g>
                {/* scattered port-coordinate marks (nautical-chart feel) */}
                <g stroke={COLORS.sea} strokeOpacity={0.16} strokeWidth={0.9} strokeLinecap="round">
                  {[[120, 150], [420, 300], [560, 640], [820, 160], [1000, 520], [1180, 300], [1260, 660], [300, 560], [700, 780]].map(([x, y], i) => (
                    <path key={i} d={`M${x - 6},${y} h12 M${x},${y - 6} v12`} vectorEffect="non-scaling-stroke" />
                  ))}
                </g>

                {/* travelled dotted route (green), revealed only up to the ship */}
                <path ref={planRef} d={ROUTE_D} fill="none" stroke="rgba(47,125,90,0.52)" strokeWidth={1.8} strokeDasharray="4 10" strokeLinecap="round" mask="url(#h6reveal)" />

                {/* stations — banner image morphs to icon on reveal */}
                {stations.map((c, i) => {
                  const s = STAGES[i];
                  return (
                    <g key={i}>
                      <rect x={c.x - BW / 2 + 4} y={c.y - BH / 2 + 6} width={BW} height={BH} rx={14} fill={COLORS.navy} opacity={0.14} />
                      <image href={s.img.src} x={c.x - BW / 2} y={c.y - BH / 2} width={BW} height={BH} preserveAspectRatio="xMidYMid slice" clipPath={`url(#h6clip${i})`} style={{ opacity: reveal ? 0 : 1, transition: "opacity 1200ms ease" }}>
                        <title>{s.img.alt}</title>
                      </image>
                      <rect x={c.x - BW / 2} y={c.y - BH / 2} width={BW} height={BH} rx={14} fill="none" stroke={s.accent} strokeOpacity={reveal ? 0.5 : 0.35} strokeWidth={1.4} style={{ transition: "stroke-opacity 1100ms ease" }} />
                      {/* simplified icon (fades in on reveal) */}
                      <g
                        transform={`translate(${c.x} ${c.y}) scale(${34 / 24}) translate(-12 -12)`}
                        fill="none"
                        stroke={s.accent}
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: reveal ? 1 : 0, transition: "opacity 1200ms ease 250ms" }}
                      >
                        {iconEls(s.icon)}
                      </g>
                    </g>
                  );
                })}

                {/* ship */}
                <g ref={shipRef} transform={`translate(${230} ${440})`}>
                  <path d="M-9,1 Q0,7 10,0 L6,-2 L-8,-2 Z" fill={COLORS.navy} />
                  <line x1={-0.5} y1={-2} x2={-0.5} y2={-13} stroke={COLORS.navy} strokeWidth={1.2} />
                  <path d="M-0.5,-3 L-0.5,-13 L7,-5 Z" fill={COLORS.cream} stroke={COLORS.navy} strokeWidth={0.7} strokeLinejoin="round" />
                </g>
              </svg>

              {/* scroll cue on first stage */}
              <div aria-hidden className={cn("absolute inset-x-0 bottom-1 flex justify-center transition-opacity duration-700", active === 0 ? "opacity-100" : "opacity-0")}>
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0B2F44]/35">Scroll the route</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final-reveal tagline — centered, below the completed V·R·V route */}
        <div className={cn("pointer-events-none absolute inset-x-0 bottom-[7%] z-20 px-6 text-center transition-all duration-1000 ease-out", reveal ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: COLORS.green }}>{REVEAL.eyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] font-medium leading-[1.12] tracking-tight text-balance">{REVEAL.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#0B2F44]/60 text-pretty">{REVEAL.sub}</p>
        </div>
      </div>
    </div>
  );
}
