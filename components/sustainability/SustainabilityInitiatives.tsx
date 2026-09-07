"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * SustainabilityInitiatives — the interactive "VRV's Initiatives" section.
 * Two initiatives are selectable on the left; the right pane swaps its metric
 * cards and chart to match, with muted-green (rubber) or copper (metals)
 * accents. Charts are hand-drawn inline SVG animated with Framer Motion (the
 * project's existing animation library — no charting dependency added).
 *
 * Metric-card and donut figures are supplied/approved. The line-chart series is
 * ILLUSTRATIVE placeholder progression (see comment) and must be replaced with
 * verified year-wise data before publication.
 */

// VRV palette (kept in sync with ThreeCTriadVisual)
const GREEN = "#15724E";
const BLUE = "#14587A";
const COPPER = "#B26A2B";

type Initiative = {
  id: "deforestation-rubber" | "circular-metals";
  title: string;
  icon: IconName;
  accent: string;
  chartTitle: string;
  chartDesc: string;
};

const INITIATIVES: Initiative[] = [
  {
    id: "deforestation-rubber",
    title: "Deforestation Free Natural Rubber",
    icon: "tree",
    accent: GREEN,
    chartTitle: "Traceability progression",
    chartDesc: "Year-wise progress of deforestation-free, fully traceable natural rubber sourcing, 2022–2026.",
  },
  {
    id: "circular-metals",
    title: "Circular Economy Metals",
    icon: "recycle",
    accent: COPPER,
    chartTitle: "Metals sourcing mix",
    chartDesc: "Share of primary versus recycled and scrap metals across our metals sourcing.",
  },
];

// A metric card is either number-led (`value`) or text-led (`heading`).
type MetricCardData = { value?: string; heading?: string; sub?: string; label: string };

// --- Deforestation metrics (approved figures) ---
const rubberMetrics: MetricCardData[] = [
  { value: "2,500 Ha", label: "Deforestation Free Rubber sourced from ASEAN and Africa" },
  { value: "50,000 MT", label: "Fully Traceable, Deforestation Free Natural Rubber sourced from ASEAN and African farmers" },
];

// Placeholder progression values for visual chart only.
// Replace with verified annual data when available.
const deforestationRubberData = [
  { year: "2022", value: 5 },
  { year: "2023", value: 10 },
  { year: "2024", value: 15 },
  { year: "2025", value: 20 },
  { year: "2026", value: 25 },
];

// --- Circular metals metrics (approved figures) ---
// Ferrous card is text-based (no large "100%"); non-ferrous keeps its 15% figure.
const metalsMetrics: MetricCardData[] = [
  { heading: "Ferrous Metals", label: "Recycled & scrap metals" },
  { value: "15%", sub: "Non-ferrous metals", label: "Recycled & scrap metals" },
];

// Approved split for the sourcing mix chart.
const metalsMix = [
  { label: "Primary metals", value: 75, color: BLUE },
  { label: "Recycled & scrap metals", value: 25, color: COPPER },
];

export function SustainabilityInitiatives() {
  const [active, setActive] = useState<Initiative["id"]>(INITIATIVES[0].id);
  const current = INITIATIVES.find((i) => i.id === active) ?? INITIATIVES[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      {/* Left — selector */}
      <div
        role="tablist"
        aria-label="VRV initiatives"
        aria-orientation="vertical"
        className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {INITIATIVES.map((it) => {
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              role="tab"
              id={`tab-${it.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${it.id}`}
              onClick={() => setActive(it.id)}
              className={cn(
                "group flex min-w-[200px] flex-1 items-center gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-all duration-300 ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:min-w-0",
                isActive
                  ? "border-brand/40 bg-white shadow-card"
                  : "border-line bg-white/60 hover:border-brand/25 hover:bg-white",
              )}
            >
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                style={{
                  backgroundColor: isActive ? it.accent : `${it.accent}14`,
                  color: isActive ? "#ffffff" : it.accent,
                }}
              >
                <Icon name={it.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className={cn("block text-[0.95rem] font-semibold leading-[1.25]", isActive ? "text-ink" : "text-ink/80")}>
                  {it.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Right — active panel */}
      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="rounded-3xl border border-line bg-paper p-5 shadow-soft sm:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Metric cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(current.id === "deforestation-rubber" ? rubberMetrics : metalsMetrics).map((m, i) => (
                <SustainabilityMetricCard key={i} {...m} accent={current.accent} />
              ))}
            </div>

            {/* Chart */}
            <div className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
              <div className="mb-4">
                <h3 className="font-serif text-[clamp(1.1rem,1.8vw,1.35rem)] text-ink">{current.chartTitle}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/55">{current.chartDesc}</p>
              </div>
              {current.id === "deforestation-rubber" ? (
                <DeforestationLineChart initiativeTitle={current.title} />
              ) : (
                <CircularMetalsDonutChart />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SustainabilityMetricCard({ value, heading, sub, label, accent }: MetricCardData & { accent: string }) {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-white p-6 shadow-soft [overflow-wrap:anywhere]">
      <span aria-hidden className="h-1.5 w-8 rounded-full" style={{ backgroundColor: accent }} />
      {value ? (
        <p className="mt-4 font-serif text-[clamp(1.8rem,3.2vw,2.4rem)] leading-none text-ink">{value}</p>
      ) : (
        <p className="mt-4 font-serif text-[clamp(1.15rem,2vw,1.4rem)] leading-tight text-ink">{heading}</p>
      )}
      {sub && (
        <p className="mt-2 text-[0.76rem] font-semibold uppercase leading-[1.35] tracking-label" style={{ color: accent }}>
          {sub}
        </p>
      )}
      <p className="mt-2 text-[0.82rem] leading-[1.35] text-ink/60">{label}</p>
    </div>
  );
}

/* --------------------------- Deforestation line chart --------------------------- */

function DeforestationLineChart({ initiativeTitle }: { initiativeTitle: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null); // pointer / keyboard focus
  const [selected, setSelected] = useState<number | null>(null); // click / tap / enter
  const active = hover ?? selected;

  // Geometry (viewBox units)
  const W = 560;
  const H = 300;
  const padL = 40;
  const padR = 20;
  const padT = 24;
  const padB = 44;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const maxV = 30; // headroom above the top placeholder value (25)
  const ticks = [0, 10, 20, 30];
  const n = deforestationRubberData.length;

  const x = (i: number) => padL + (plotW * i) / (n - 1);
  const y = (v: number) => padT + plotH - (plotH * v) / maxV;

  const linePath = deforestationRubberData.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ");
  const areaPath = `${linePath} L${x(n - 1)},${padT + plotH} L${x(0)},${padT + plotH} Z`;
  const gid = useId();

  const activePoint = active !== null ? deforestationRubberData[active] : null;

  return (
    <figure className="m-0">
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${initiativeTitle}: year-wise traceability progression from 2022 to 2026 (illustrative)`}
          className="h-auto w-full"
        >
          <defs>
            <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.16" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines + y-axis labels */}
          {ticks.map((t) => (
            <g key={t} aria-hidden>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#E7E3DA" strokeWidth="1" />
              <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#9C998F">
                {t}
              </text>
            </g>
          ))}
          {/* y-axis caption */}
          <text
            aria-hidden
            transform={`translate(12 ${padT + plotH / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#9C998F"
          >
            Progress index
          </text>

          {/* Dotted vertical guides (solid highlight when active) */}
          {deforestationRubberData.map((d, i) => (
            <line
              key={d.year}
              aria-hidden
              x1={x(i)}
              x2={x(i)}
              y1={padT}
              y2={padT + plotH}
              stroke={active === i ? GREEN : "#D9D4C8"}
              strokeOpacity={active === i ? 0.55 : 1}
              strokeWidth={active === i ? 1.5 : 1}
              strokeDasharray={active === i ? "0" : "3 4"}
            />
          ))}

          {/* Area */}
          <motion.path
            key={`area-${gid}`}
            d={areaPath}
            fill={`url(#${gid}-fill)`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Line — animated draw on mount / tab switch */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={GREEN}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Dots + accessible hit targets */}
          {deforestationRubberData.map((d, i) => {
            const isOn = active === i;
            return (
              <g key={d.year}>
                <motion.circle
                  cx={x(i)}
                  cy={y(d.value)}
                  r={isOn ? 6 : 4.5}
                  fill="#ffffff"
                  stroke={GREEN}
                  strokeWidth="2.5"
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.5 + i * 0.08 }}
                  style={{ transformOrigin: `${x(i)}px ${y(d.value)}px` }}
                />
                {/* x-axis label */}
                <text
                  x={x(i)}
                  y={H - 16}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={isOn ? GREEN : "#7C7A72"}
                >
                  {d.year}
                </text>
                {/* Focusable / tappable hit target */}
                <rect
                  x={x(i) - plotW / (n - 1) / 2}
                  y={padT}
                  width={plotW / (n - 1)}
                  height={plotH}
                  fill="transparent"
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.year}. ${INITIATIVES[0].chartTitle}: ${d.value}. ${initiativeTitle}.`}
                  className="cursor-pointer focus-visible:outline-none"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(i);
                    }
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML tooltip — works on hover, focus and tap (not colour-only) */}
        {activePoint && (
          <div
            role="status"
            className="pointer-events-none absolute z-10 w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-card"
            style={{
              left: `${(x(active!) / W) * 100}%`,
              top: `${(y(activePoint.value) / H) * 100 - 4}%`,
            }}
          >
            <p className="text-[13px] font-bold text-ink">{activePoint.year}</p>
            <p className="mt-0.5 text-[12px] text-ink/70">
              <span className="font-medium" style={{ color: GREEN }}>{INITIATIVES[0].chartTitle}:</span> {activePoint.value}
            </p>
            <p className="mt-0.5 text-[11px] leading-tight text-ink/45">{initiativeTitle}</p>
          </div>
        )}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-ink/40">
        Progress index shown is illustrative; verified year-wise figures to be published.
      </p>
    </figure>
  );
}

/* --------------------------- Circular metals donut chart --------------------------- */

function CircularMetalsDonutChart() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hover ?? selected;

  const size = 220;
  const stroke = 34;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;

  // Precompute each segment's arc length + starting offset.
  let acc = 0;
  const segments = metalsMix.map((seg) => {
    const len = (seg.value / 100) * circ;
    const start = acc;
    acc += len;
    return { ...seg, len, start };
  });

  const centerTitle = active === null ? "Metals Mix" : metalsMix[active].label;
  const centerValue = active === null ? "75% / 25%" : `${metalsMix[active].value}%`;

  return (
    <figure className="m-0">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <div className="relative w-40 shrink-0 sm:w-52">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-label="Metals sourcing mix: 75% primary metals, 25% recycled and scrap metals"
            className="h-auto w-full"
          >
            {/* track */}
            <circle aria-hidden cx={cx} cy={cy} r={r} fill="none" stroke="#EFEBE2" strokeWidth={stroke} />
            {/* segments */}
            <g transform={`rotate(-90 ${cx} ${cy})`}>
              {segments.map((seg, i) => (
                <motion.circle
                  key={seg.label}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={active === i ? stroke + 5 : stroke}
                  strokeDasharray={`${seg.len} ${circ - seg.len}`}
                  strokeDashoffset={-seg.start}
                  strokeLinecap="butt"
                  opacity={active === null || active === i ? 1 : 0.45}
                  tabIndex={0}
                  role="button"
                  aria-label={`${seg.label}: ${seg.value}%`}
                  className="cursor-pointer focus-visible:outline-none"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(i);
                    }
                  }}
                  style={{ transition: "stroke-width 0.2s ease, opacity 0.2s ease" }}
                  initial={reduce ? false : { strokeDashoffset: -seg.start - seg.len }}
                  animate={{ strokeDashoffset: -seg.start }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </g>
          </svg>

          {/* Center label — updates with hover / selection */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span
              className="text-[11px] font-semibold uppercase tracking-label"
              style={{ color: active === null ? "#7C7A72" : metalsMix[active].color }}
            >
              {centerTitle}
            </span>
            <span className="mt-0.5 font-serif text-[clamp(1.1rem,2vw,1.4rem)] leading-tight text-ink">{centerValue}</span>
          </div>
        </div>

        {/* Legend — clickable, keyboard accessible */}
        <ul className="w-full space-y-3">
          {metalsMix.map((seg, i) => (
            <li key={seg.label}>
              <button
                type="button"
                aria-pressed={selected === i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setSelected(selected === i ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                  active === i ? "border-brand/30 bg-white" : "border-line bg-white/60 hover:bg-white",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span aria-hidden className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: seg.color }} />
                  <span className="text-[14px] font-medium text-ink/80">{seg.label}</span>
                </span>
                <span className="font-serif text-[17px] text-ink">{seg.value}%</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
