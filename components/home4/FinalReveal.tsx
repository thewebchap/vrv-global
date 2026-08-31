"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { COLORS, REVEAL, STAGES } from "@/components/home4/route";
import { ShipMarker } from "@/components/home4/ShipMarker";

/**
 * FinalReveal — the calm zoom-out. The whole voyage resolves into one chart:
 * five small image stations linked by a faint dotted route whose strokes lean
 * into a slanted, slightly italic, lop-sided V·R·V — a maritime route first, a
 * quiet brand structure second. The map gently scales + fades in on enter (no
 * snap); reduced-motion shows it settled. Stations/ship stay upright.
 */
const TW = 150;
const TH = 100;

export function FinalReveal() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setShown(true)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const settled = shown || reduce;
  const { w, h } = REVEAL.viewBox;

  return (
    <section ref={ref} className="border-t border-[#0B2F44]/10 py-28">
      <div className="container-x text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: COLORS.green }}>{REVEAL.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] tracking-tight text-balance">{REVEAL.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-[#0B2F44]/65 text-pretty">{REVEAL.sub}</p>
      </div>

      <div className="container-x mt-14">
        <div
          className="mx-auto max-w-5xl"
          style={{ opacity: settled ? 1 : 0, transform: reduce ? undefined : `scale(${settled ? 1 : 0.965})`, transition: "opacity 900ms ease, transform 1100ms cubic-bezier(0.22,1,0.36,1)" }}
        >
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" className="h-auto w-full" role="img" aria-label="Full maritime route connecting sourcing, processing, assurance, delivery and responsible growth">
            <defs>
              {REVEAL.thumbs.map((t) => (
                <clipPath key={t.i} id={`h4clip${t.i}`}>
                  <rect x={t.x - TW / 2} y={t.y - TH / 2} width={TW} height={TH} rx={12} />
                </clipPath>
              ))}
            </defs>

            {/* faint dotted route — a slanted, italic, lop-sided V R V */}
            {REVEAL.routes.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="rgba(11,47,68,0.30)"
                strokeWidth={1.5}
                strokeDasharray="4 10"
                strokeLinecap="round"
                style={{ strokeDashoffset: settled ? 0 : 40, opacity: settled ? 1 : 0, transition: `stroke-dashoffset 1200ms ease ${200 + i * 90}ms, opacity 900ms ease ${200 + i * 90}ms` }}
              />
            ))}

            {/* upright image stations */}
            {REVEAL.thumbs.map((t, k) => {
              const s = STAGES[t.i];
              const x = t.x - TW / 2;
              const y = t.y - TH / 2;
              return (
                <g key={t.i} style={{ opacity: settled ? 1 : 0, transition: `opacity 700ms ease ${400 + k * 110}ms` }}>
                  <rect x={x + 4} y={y + 6} width={TW} height={TH} rx={12} fill={COLORS.navy} opacity={0.14} />
                  <image href={s.img.src} x={x} y={y} width={TW} height={TH} preserveAspectRatio="xMidYMid slice" clipPath={`url(#h4clip${t.i})`}>
                    <title>{s.img.alt}</title>
                  </image>
                  <rect x={x} y={y} width={TW} height={TH} rx={12} fill="none" stroke={s.accent} strokeOpacity={0.45} strokeWidth={1.2} />
                  <circle cx={t.x} cy={y - 12} r={3} fill={s.accent} />
                  <text x={t.x} y={y - 22} textAnchor="middle" fontSize={11} fontWeight={600} letterSpacing="1.4" fill={COLORS.navy} fillOpacity={0.6}>{s.harbour.toUpperCase()}</text>
                </g>
              );
            })}

            {/* ship at final destination */}
            <g transform={`translate(${REVEAL.shipAt.x} ${REVEAL.shipAt.y}) rotate(${REVEAL.shipAt.angle})`} style={{ opacity: settled ? 1 : 0, transition: "opacity 700ms ease 950ms" }}>
              <ShipMarker />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
