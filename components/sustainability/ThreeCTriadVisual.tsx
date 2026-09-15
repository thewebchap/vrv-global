"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * ThreeCTriadVisual — the "VRV's ESG Program" 3C diagram.
 *
 * FAIL-SAFE BY DESIGN: the finished diagram is the default render state (every
 * node/line visible), so it always shows — on the server, before scrolling,
 * with reduced motion, or if JavaScript / the observer never run. The slow
 * ~3.8s formation is pure CSS (see `.esg-*` in globals.css) and is enabled only
 * by adding `.esg-play` once the section scrolls into view. No Framer Motion,
 * no path-length math, nothing that can hide the diagram if it fails.
 *
 * Each pillar is a focusable button; hover / focus / tap reveals a compact
 * micro-description beneath the diagram (labels themselves are unchanged).
 */

// Geometry (viewBox units)
const C = { x: 210, y: 205 };
const NODES = [
  { label: "Company", x: 210, y: 60, color: "#15724E", bg: "#F3F8F1", desc: "Internal sustainability practices and responsible operations." },
  { label: "Community", x: 76, y: 300, color: "#14587A", bg: "#E9F2F7", desc: "People, stakeholders and long-term shared value." },
  { label: "Commodities", x: 344, y: 300, color: "#B26A2B", bg: "#F8F1EC", desc: "Responsible sourcing and traceability-ready supply chains." },
] as const;

// Curved inter-links between the pillars (bow gently outward from the centre).
const LINKS = [
  "M210,60 Q104,168 76,300", // Company ↔ Community
  "M76,300 Q210,362 344,300", // Community ↔ Commodities
  "M344,300 Q316,168 210,60", // Commodities ↔ Company
];
const LINK_ENDS: [string, string][] = [
  ["Company", "Community"],
  ["Community", "Commodities"],
  ["Commodities", "Company"],
];

// A few tiny dots that drift along the connections to imply continuous flow.
const FLOWS = [
  ...NODES.map((n) => ({ d: `M${C.x},${C.y} L${n.x},${n.y}`, color: "#14587A" })),
  ...LINKS.map((d) => ({ d, color: "#15724E" })),
];

export function ThreeCTriadVisual({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [play, setPlay] = useState(false);

  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const activeLabel = pinned ?? hovered;
  const activeNode = NODES.find((n) => n.label === activeLabel);

  // Enable the animation only as progressive enhancement. If anything here is
  // unavailable, the diagram simply stays in its default (visible) state.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      if (typeof IntersectionObserver === "undefined") return; // default diagram already visible
      let done = false;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !done) {
              done = true;
              setPlay(true);
              io.disconnect();
            }
          }
        },
        { threshold: 0.3 },
      );
      io.observe(el);
      return () => io.disconnect();
    } catch {
      // Never let a diagnostic path hide the diagram.
    }
  }, []);

  return (
    <figure className={cn("relative m-0", className)}>
      <svg
        ref={ref}
        viewBox="0 0 420 380"
        role="img"
        aria-label="VRV's ESG Program — the 3C framework connecting Company, Community and Commodities"
        className={cn("mx-auto h-auto w-full max-w-md", play && "esg-play")}
        style={{ minHeight: 300 }}
      >
        <defs>
          <filter id="esg-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0B2F44" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Spokes: centre → each pillar (under the nodes) */}
        {NODES.map((n, i) => {
          const rel = activeLabel === n.label;
          return (
            <line
              key={`spoke-${n.label}`}
              className="esg-spoke"
              x1={C.x}
              y1={C.y}
              x2={n.x}
              y2={n.y}
              stroke="#14587A"
              strokeOpacity="0.32"
              strokeWidth={rel ? 2.6 : 1.5}
              style={{
                ["--esg-d" as string]: `${1050 + i * 80}ms`,
                ["--base-op" as string]: "0.32",
                ["--hi-op" as string]: "0.6",
                ["--hi-delay" as string]: `${i * 1800}ms`,
              } as CSSProperties}
            />
          );
        })}

        {/* Curved inter-links between pillars — thin, low weight */}
        {LINKS.map((d, i) => {
          const rel = !!activeLabel && LINK_ENDS[i].includes(activeLabel);
          return (
            <path
              key={`link-${i}`}
              className="esg-link"
              d={d}
              fill="none"
              stroke="#15724E"
              strokeOpacity="0.18"
              strokeWidth={rel ? 2.2 : 1.25}
              style={{
                ["--esg-d" as string]: `${2600 + i * 80}ms`,
                ["--base-op" as string]: "0.18",
                ["--hi-op" as string]: "0.45",
                ["--hi-delay" as string]: `${(i + 3) * 1800}ms`,
              } as CSSProperties}
            />
          );
        })}

        {/* Tiny drifting dots — continuous flow (hidden on mobile / reduced motion) */}
        {FLOWS.map((f, idx) => (
          <circle
            key={`dot-${idx}`}
            className="esg-dot"
            r={3.5}
            fill={f.color}
            style={{ offsetPath: `path("${f.d}")`, ["--dot-delay" as string]: `${idx * 1500}ms` } as CSSProperties}
          />
        ))}

        {/* One-time final-highlight halo behind the centre */}
        <circle className="esg-halo" cx={C.x} cy={C.y} r={58} fill="#14587A" />

        {/* Continuous soft breathing ring on the centre */}
        <circle className="esg-pulse" cx={C.x} cy={C.y} r={58} fill="none" stroke="#14587A" strokeWidth="1.5" />

        {/* Origin dot (Phase 1) — sits under the centre */}
        <circle className="esg-seed" cx={C.x} cy={C.y} r={9} fill="#14587A" />

        {/* Centre — VRV's ESG Program */}
        <g className="esg-center">
          <circle cx={C.x} cy={C.y} r={58} fill="#14587A" filter="url(#esg-soft)" />
          <circle cx={C.x} cy={C.y} r={51} fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1" />
          <text x={C.x} y={C.y - 20} textAnchor="middle" fill="#F0A92B" fontSize="11" fontWeight="700" letterSpacing="1.2">
            3C
          </text>
          <text x={C.x} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600">
            <tspan x={C.x} y={C.y + 1}>{"VRV’s ESG"}</tspan>
            <tspan x={C.x} y={C.y + 19}>Program</tspan>
          </text>
        </g>

        {/* Outer pillars — interactive (hover / focus / tap reveal a description) */}
        {NODES.map((n, i) => {
          const on = activeLabel === n.label;
          return (
            <g
              key={n.label}
              className="esg-node cursor-pointer focus:outline-none"
              style={{ ["--esg-d" as string]: `${1500 + i * 250}ms` } as CSSProperties}
              role="button"
              tabIndex={0}
              aria-label={`${n.label} — ${n.desc}`}
              aria-pressed={pinned === n.label}
              onMouseEnter={() => setHovered(n.label)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.label)}
              onBlur={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === n.label ? null : n.label))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPinned((p) => (p === n.label ? null : n.label));
                }
              }}
            >
              {on && <circle cx={n.x} cy={n.y} r="52" fill="none" stroke={n.color} strokeOpacity="0.5" strokeWidth="1" />}
              <circle cx={n.x} cy={n.y} r="46" fill={n.bg} stroke={n.color} strokeWidth={on ? 2 : 1.5} filter="url(#esg-soft)" />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fill={n.color} fontSize="13" fontWeight="600">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Compact micro-description — updates on hover / focus / tap; no overflow */}
      <div className="mt-2 flex min-h-[2.75rem] items-start justify-center px-2" aria-live="polite">
        {activeNode && (
          <p className="max-w-sm text-center text-[13px] leading-relaxed text-ink/70">
            <span className="font-semibold" style={{ color: activeNode.color }}>{activeNode.label}</span>
            <span className="mx-1.5 text-ink/30">—</span>
            {activeNode.desc}
          </p>
        )}
      </div>
    </figure>
  );
}
