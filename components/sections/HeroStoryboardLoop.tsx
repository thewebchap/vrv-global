"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * HeroStoryboardLoop — a premium CSS/SVG "storyboard preview" that loops through
 * VRV Global's hero narrative as an elegant stopgap until the real cinematic
 * footage is uploaded. Seven scenes cross-fade with a slow Ken Burns drift:
 *   1 Rubber plantations → 2 Rubber tapping → 3 Rubber processing →
 *   4 Copper cathodes → 5 Aluminium → 6 Satellite mapping / traceability →
 *   7 Farmer & children / shared future.
 * Lightweight (inline SVG only). Honours prefers-reduced-motion (shows the
 * first scene, static). Designed to sit behind the hero overlay + text.
 */
const SVG_PROPS = {
  viewBox: "0 0 1600 900",
  preserveAspectRatio: "xMidYMid slice" as const,
  className: "h-full w-full",
  xmlns: "http://www.w3.org/2000/svg",
};

function Vignette({ id }: { id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="0.42" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#06100d" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id})`} />
    </>
  );
}

/* Scene 1 — Rubber plantations at sunrise */
function ScenePlantation() {
  const tree = (x: number, y: number, s: number, fill: string) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <rect x={-6} y={0} width={12} height={120} rx={5} />
      <ellipse cx={0} cy={-10} rx={52} ry={64} />
      <ellipse cx={-30} cy={20} rx={34} ry={42} />
      <ellipse cx={30} cy={20} rx={34} ry={42} />
    </g>
  );
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="s1sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08251f" />
          <stop offset="0.5" stopColor="#0f463a" />
          <stop offset="0.7" stopColor="#caa052" />
          <stop offset="0.78" stopColor="#7c7a3a" />
          <stop offset="1" stopColor="#0a2c23" />
        </linearGradient>
        <radialGradient id="s1sun" cx="0.68" cy="0.7" r="0.26">
          <stop offset="0" stopColor="#ffe7ab" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe7ab" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#s1sky)" />
      <rect width="1600" height="900" fill="url(#s1sun)" />
      {/* distant tree line */}
      <g fill="#0a3a2d" opacity="0.85">
        {Array.from({ length: 26 }).map((_, i) => (
          <ellipse key={i} cx={i * 64 + 20} cy={612} rx={36} ry={20} />
        ))}
      </g>
      <rect y="624" width="1600" height="280" fill="#0a2f24" />
      {/* perspective rows */}
      <g stroke="#072a20" strokeWidth="3" opacity="0.6">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={800} y1={636} x2={(i - 3) * 520 + 800} y2={900} />
        ))}
      </g>
      {/* foreground trees */}
      {tree(150, 470, 1.5, "#0b3a2c")}
      {tree(1380, 500, 1.7, "#093125")}
      {tree(470, 540, 1.1, "#0c4133")}
      {tree(1050, 520, 1.3, "#0a3729")}
      <Vignette id="s1v" />
    </svg>
  );
}

/* Scene 2 — Rubber tapping (trunk, spiral cut, latex cup, dignified figure) */
function SceneTapping() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="s2bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a2018" />
          <stop offset="0.6" stopColor="#10342a" />
          <stop offset="1" stopColor="#071712" />
        </linearGradient>
        <radialGradient id="s2glow" cx="0.74" cy="0.4" r="0.4">
          <stop offset="0" stopColor="#f3c777" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f3c777" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#s2bg)" />
      <rect width="1600" height="900" fill="url(#s2glow)" />
      {/* large tree trunk */}
      <path d="M820 0 C880 260 900 560 1010 900 L1320 900 C1180 540 1140 240 1120 0 Z" fill="#23150d" />
      <path d="M860 0 C912 260 930 560 1040 900 L1100 900 C1010 560 980 260 940 0 Z" fill="#160d07" opacity="0.6" />
      {/* tapping spiral cut */}
      <path d="M905 230 C1010 250 1010 320 905 350 C1010 380 1010 450 912 488" fill="none" stroke="#f0c071" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      {/* latex cup + droplet */}
      <path d="M905 500 q-26 4 -22 44 q4 30 28 30 q24 0 28 -30 q4 -40 -22 -44 Z" fill="#0b2a20" stroke="#d9b98a" strokeWidth="3" />
      <ellipse cx="911" cy="512" rx="22" ry="7" fill="#e9d6b4" opacity="0.9" />
      <circle cx="911" cy="476" r="6" fill="#f0e2c4" />
      {/* dignified figure silhouette */}
      <g fill="#05130d">
        <circle cx="430" cy="430" r="46" />
        <path d="M360 520 q70 -70 140 0 l16 360 q-86 30 -172 0 Z" />
        <path d="M486 540 q120 -40 230 -90 l24 50 q-110 70 -244 96 Z" />
      </g>
      <Vignette id="s2v" />
    </svg>
  );
}

/* Scene 3 — Rubber processing & packing (stacked bales in a warehouse) */
function SceneProcessing() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="s3bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c1b1f" />
          <stop offset="1" stopColor="#06110f" />
        </linearGradient>
        <radialGradient id="s3light" cx="0.5" cy="0.05" r="0.55">
          <stop offset="0" stopColor="#cfe3d6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#cfe3d6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s3bale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a4a32" />
          <stop offset="1" stopColor="#33281a" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#s3bg)" />
      <rect width="1600" height="900" fill="url(#s3light)" />
      {/* structure beams */}
      <g stroke="#16302b" strokeWidth="10">
        <line x1="120" y1="0" x2="120" y2="900" />
        <line x1="1480" y1="0" x2="1480" y2="900" />
        <line x1="0" y1="120" x2="1600" y2="120" />
      </g>
      {/* stacked bales */}
      <g>
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 7 }).map((__, c) => (
            <g key={`${r}-${c}`} transform={`translate(${300 + c * 150} ${300 + r * 120})`}>
              <rect width="128" height="98" rx="8" fill="url(#s3bale)" stroke="#1c160d" strokeWidth="2" />
              <rect x="58" width="12" height="98" fill="#1c160d" opacity="0.5" />
            </g>
          )),
        )}
      </g>
      {/* conveyor line */}
      <rect x="0" y="250" width="1600" height="10" fill="#caa052" opacity="0.35" />
      <Vignette id="s3v" />
    </svg>
  );
}

/* Scene 4 — Copper cathodes (rack of standing sheets) */
function SceneCopper() {
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="s4bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c130c" />
          <stop offset="1" stopColor="#0a0805" />
        </linearGradient>
        <linearGradient id="s4sheet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a3d1e" />
          <stop offset="0.5" stopColor="#d98244" />
          <stop offset="0.55" stopColor="#f2b27a" />
          <stop offset="1" stopColor="#8a4a26" />
        </linearGradient>
        <radialGradient id="s4glow" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0" stopColor="#f0b277" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f0b277" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#s4bg)" />
      <rect width="1600" height="900" fill="url(#s4glow)" />
      {/* standing cathode sheets */}
      <g>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={170 + i * 110} y={210} width={64} height={470} rx={5} fill="url(#s4sheet)" stroke="#3a1d0e" strokeWidth="2" />
        ))}
      </g>
      {/* top rail + floor reflection */}
      <rect x="120" y="190" width="1360" height="14" rx="6" fill="#caa052" opacity="0.5" />
      <rect x="120" y="690" width="1360" height="120" fill="#d98244" opacity="0.08" />
      <Vignette id="s4v" />
    </svg>
  );
}

/* Scene 5 — Aluminium ingots (cool, clean) */
function SceneAluminium() {
  const ingot = (x: number, y: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
      <path d="M0 28 L24 0 L150 0 L174 28 L150 56 L24 56 Z" fill="url(#s5ing)" stroke="#9fb4bf" strokeWidth="1.5" />
    </g>
  );
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="s5bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#10212a" />
          <stop offset="1" stopColor="#0a141a" />
        </linearGradient>
        <linearGradient id="s5ing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfddE6" />
          <stop offset="0.5" stopColor="#aabfcb" />
          <stop offset="1" stopColor="#7f97a5" />
        </linearGradient>
        <radialGradient id="s5glow" cx="0.5" cy="0.1" r="0.6">
          <stop offset="0" stopColor="#d6e7f0" stopOpacity="0.4" />
          <stop offset="1" stopColor="#d6e7f0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#s5bg)" />
      <rect width="1600" height="900" fill="url(#s5glow)" />
      {/* stacked ingot rows */}
      <g>
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 6 }).map((__, c) => ingot(330 + c * 184 + (r % 2 ? 92 : 0), 360 + r * 70)),
        )}
      </g>
      <rect x="0" y="330" width="1600" height="8" fill="#9fb4bf" opacity="0.3" />
      <Vignette id="s5v" />
    </svg>
  );
}

/* Scene 6 — Satellite mapping & traceability */
function SceneTraceability() {
  const nodes: [number, number][] = [
    [420, 360], [700, 300], [980, 380], [1180, 300], [560, 480], [860, 520], [1080, 470], [720, 640],
  ];
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="s6bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#06141f" />
          <stop offset="1" stopColor="#04222b" />
        </linearGradient>
        <radialGradient id="s6earth" cx="0.5" cy="1" r="0.7">
          <stop offset="0" stopColor="#14587a" />
          <stop offset="0.6" stopColor="#0e3c54" />
          <stop offset="1" stopColor="#072532" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#s6bg)" />
      {/* earth arc */}
      <circle cx="800" cy="1500" r="1180" fill="url(#s6earth)" />
      {/* geospatial grid */}
      <g stroke="#34d399" strokeWidth="1.2" fill="none" opacity="0.35">
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={`p${i}`} d={`M120 ${440 + i * 70} Q800 ${380 + i * 70} 1480 ${440 + i * 70}`} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={`m${i}`} d={`M${200 + i * 150} 360 Q800 460 ${200 + i * 150} 760`} />
        ))}
      </g>
      {/* traceability links */}
      <g stroke="#7fe9c4" strokeWidth="1.6" opacity="0.5">
        <line x1="420" y1="360" x2="700" y2="300" />
        <line x1="700" y1="300" x2="980" y2="380" />
        <line x1="980" y1="380" x2="1180" y2="300" />
        <line x1="560" y1="480" x2="860" y2="520" />
        <line x1="860" y1="520" x2="1080" y2="470" />
        <line x1="700" y1="300" x2="860" y2="520" />
        <line x1="860" y1="520" x2="720" y2="640" />
      </g>
      {/* nodes */}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="#34d399" />
          <circle cx={x} cy={y} r="13" fill="none" stroke="#34d399" strokeWidth="1.4" opacity="0.5" />
        </g>
      ))}
      {/* HQ marker (Singapore-style gold) */}
      <g>
        <circle cx="860" cy="520" r="9" fill="#F0A92B" />
        <circle cx="860" cy="520" r="20" fill="none" stroke="#F0A92B" strokeWidth="1.6" opacity="0.6" />
      </g>
      {/* faint stars */}
      <g fill="#bfe9d8" opacity="0.5">
        {Array.from({ length: 30 }).map((_, i) => (
          <circle key={i} cx={(i * 113) % 1600} cy={(i * 47) % 320 + 30} r={i % 4 ? 1.4 : 2.2} />
        ))}
      </g>
      <Vignette id="s6v" />
    </svg>
  );
}

/* Scene 7 — Farmer & children, shared future */
function SceneFuture() {
  const figure = (x: number, scale: number, fill: string) => (
    <g key={x} transform={`translate(${x} ${640}) scale(${scale})`} fill={fill}>
      <circle cx="0" cy="-150" r="34" />
      <path d="M-34 -110 q34 -34 68 0 l16 200 q-50 18 -100 0 Z" />
    </g>
  );
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="s7sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2c14" />
          <stop offset="0.4" stopColor="#caa052" />
          <stop offset="0.62" stopColor="#e7c777" />
          <stop offset="0.72" stopColor="#5e6e34" />
          <stop offset="1" stopColor="#13361f" />
        </linearGradient>
        <radialGradient id="s7sun" cx="0.5" cy="0.6" r="0.32">
          <stop offset="0" stopColor="#fff0c8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff0c8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#s7sky)" />
      <circle cx="800" cy="540" r="150" fill="#ffe9b0" opacity="0.85" />
      <rect width="1600" height="900" fill="url(#s7sun)" />
      {/* field horizon */}
      <path d="M0 620 Q800 580 1600 620 L1600 900 L0 900 Z" fill="#143a22" />
      <path d="M0 700 Q800 660 1600 700 L1600 900 L0 900 Z" fill="#0d2b18" />
      {/* a tree */}
      <g fill="#0a2415">
        <rect x="180" y="430" width="16" height="200" rx="6" />
        <ellipse cx="188" cy="410" rx="80" ry="64" />
      </g>
      {/* birds */}
      <g stroke="#1a3a24" strokeWidth="3" fill="none" opacity="0.7">
        <path d="M1180 250 q18 -16 36 0 q18 -16 36 0" />
        <path d="M1280 300 q14 -12 28 0 q14 -12 28 0" />
      </g>
      {/* farmer + children */}
      {figure(720, 1, "#06160d")}
      {figure(840, 0.62, "#06160d")}
      {figure(910, 0.55, "#06160d")}
      <Vignette id="s7v" />
    </svg>
  );
}

const SCENES = [
  ScenePlantation,
  SceneTapping,
  SceneProcessing,
  SceneCopper,
  SceneAluminium,
  SceneTraceability,
  SceneFuture,
];

const SCENE_MS = 4400;

export function HeroStoryboardLoop({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SCENES.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-ink-900", className)}>
      {SCENES.map((Scene, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1500ms] ease-out-soft",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <div className={cn("h-full w-full", !reduce && "ken-burns")}>
            <Scene />
          </div>
        </div>
      ))}
    </div>
  );
}
