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
const COPPER = "#B26A2B";

type Initiative = {
  id: "deforestation-rubber" | "circular-metals";
  title: string;
  short: [string, string]; // compact two-line label for the selector tab
  icon: IconName;
  accent: string;
  chartTitle: string;
  chartDesc: string;
};

const INITIATIVES: Initiative[] = [
  {
    id: "deforestation-rubber",
    title: "Deforestation Free Natural Rubber",
    short: ["Deforestation Free", "Natural Rubber"],
    icon: "tree",
    accent: GREEN,
    chartTitle: "Traceability progression",
    chartDesc: "Year-wise progress of deforestation-free, fully traceable natural rubber sourcing, 2022–2026.",
  },
  {
    id: "circular-metals",
    title: "Circular Economy Metals",
    short: ["Circular Economy", "Metals"],
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
  { value: "25,000 Ha", label: "Deforestation Free Rubber sourced from ASEAN and Africa" },
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
  { label: "Primary metals", value: 75, color: COPPER },
  { label: "Recycled & scrap metals", value: 25, color: GREEN },
];

export function SustainabilityInitiatives() {
  const [active, setActive] = useState<Initiative["id"]>(INITIATIVES[0].id);
  const current = INITIATIVES.find((i) => i.id === active) ?? INITIATIVES[0];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(150px,21%)_1fr] lg:items-start lg:gap-8">
      {/* Left — compact segmented initiative selector (wraps only the tabs) */}
      <div
        role="tablist"
        aria-label="VRV initiatives"
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:self-start lg:overflow-visible lg:pb-0"
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
                "group relative flex min-h-[88px] min-w-[150px] flex-1 flex-col justify-center gap-3 rounded-2xl border p-4 pl-5 text-left transition-all duration-200 ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:min-h-[118px] lg:min-w-0 lg:flex-none lg:p-5 lg:pl-6",
                isActive
                  ? "scale-[1.01] border-transparent"
                  : "border-line bg-white/70 shadow-sm hover:-translate-y-0.5 hover:border-brand/25 hover:bg-white",
              )}
              style={isActive ? { backgroundColor: `${it.accent}1a`, boxShadow: "0 10px 26px rgba(0,0,0,0.08)" } : undefined}
            >
              {/* Single premium active indicator — an animated left marker bar */}
              {isActive && (
                <motion.span
                  layoutId="esg-tab-marker"
                  className="absolute left-1.5 top-1/2 h-9 w-[3px] -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: it.accent }}
                />
              )}
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors"
                style={{
                  backgroundColor: isActive ? it.accent : `${it.accent}14`,
                  color: isActive ? "#ffffff" : it.accent,
                }}
              >
                <Icon name={it.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className={cn("block text-[0.9rem] font-semibold leading-[1.22]", isActive ? "text-ink" : "text-ink/75")}>
                {it.short[0]}
                <br />
                {it.short[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right — active panel (theme follows the selected initiative) */}
      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="rounded-3xl border p-5 shadow-soft transition-colors duration-300 sm:p-8"
        style={
          current.id === "circular-metals"
            ? { backgroundColor: "#F6EEE5", borderColor: "#E6D5C0" } // muted copper / earth
            : { backgroundColor: "#F1F7F2", borderColor: "#DBEAE0" } // green / sustainability
        }
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
              {/* Shared chart frame — same min-height for both initiatives so the
                  panel never jumps on tab switch, and both charts sit centred with
                  comparable visual weight (wide line chart vs. donut). */}
              <div className="flex min-h-[260px] items-center justify-center">
                {current.id === "deforestation-rubber" ? (
                  <DeforestationLineChart initiativeTitle={current.title} />
                ) : (
                  <MetalsMixChart />
                )}
              </div>
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
    <figure className="m-0 mx-auto w-full max-w-[520px]">
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

          {/* Axes / grid — fade in first */}
          <motion.g
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {ticks.map((t) => (
              <g key={t} aria-hidden>
                <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#E7E3DA" strokeWidth="1" />
                <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#9C998F">
                  {t}
                </text>
              </g>
            ))}
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
          </motion.g>

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

          {/* Area — soft fill under the line */}
          <motion.path
            key={`area-${gid}`}
            d={areaPath}
            fill={`url(#${gid}-fill)`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          />

          {/* Line — draws slowly left to right */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={GREEN}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.4 + (i / (n - 1)) * 1.05 }}
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

          {/* Latest year — subtle one-time final highlight */}
          {!reduce && (
            <motion.circle
              aria-hidden
              cx={x(n - 1)}
              cy={y(deforestationRubberData[n - 1].value)}
              r={6}
              fill="none"
              stroke={GREEN}
              strokeWidth={1.5}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.45, 0], scale: [1, 2.4, 2.4] }}
              transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}
              style={{ transformOrigin: `${x(n - 1)}px ${y(deforestationRubberData[n - 1].value)}px` }}
            />
          )}
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

/* --------------------------- Metals sourcing mix (donut) --------------------------- */

function MetalsMixChart() {
  const reduce = useReducedMotion();

  // Donut geometry in viewBox units — a lightweight inline SVG (no charting
  // dependency). The SVG scales to fill its responsive container (below), so it
  // reaches a comparable visual size to the line chart on the other tab.
  const VB = 240;
  const stroke = 38;
  const r = (VB - stroke) / 2;
  const c = 2 * Math.PI * r;
  const gap = 4; // small visual break between segments (in stroke-length units)

  // Cumulative offsets so the two arcs sit end to end around the ring.
  let acc = 0;
  const arcs = metalsMix.map((seg) => {
    const len = (seg.value / 100) * c;
    const arc = { ...seg, len: Math.max(len - gap, 0), offset: acc };
    acc += len;
    return arc;
  });

  return (
    <figure className="m-0 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      {/* Donut — sized to match the line chart's visual weight */}
      <div className="relative h-[200px] w-[200px] shrink-0 lg:h-[240px] lg:w-[240px]">
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          role="img"
          aria-label="Metals sourcing mix: 75% primary metals, 25% recycled and scrap metals"
          className="h-full w-full"
        >
          {/* Track */}
          <circle cx={VB / 2} cy={VB / 2} r={r} fill="none" stroke="#EDE6DC" strokeWidth={stroke} />
          {/* Segments — rotated so the ring starts at 12 o'clock */}
          <g transform={`rotate(-90 ${VB / 2} ${VB / 2})`}>
            {arcs.map((seg) => (
              <motion.circle
                key={seg.label}
                cx={VB / 2}
                cy={VB / 2}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeLinecap="butt"
                strokeDasharray={`${seg.len} ${c - seg.len}`}
                strokeDashoffset={-seg.offset}
                initial={reduce ? false : { opacity: 0, strokeDasharray: `0 ${c}` }}
                animate={{ opacity: 1, strokeDasharray: `${seg.len} ${c - seg.len}` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </g>
        </svg>
        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-label text-ink/45">Metals mix</span>
          <span className="font-serif text-[1.5rem] leading-none text-ink">75 / 25</span>
        </div>
      </div>

      {/* Legend — equal-styled rows, never over the chart; stacks under on mobile */}
      <figcaption className="min-w-0 space-y-3">
        {metalsMix.map((seg) => (
          <div key={seg.label} className="flex min-w-0 items-start gap-2.5">
            <span aria-hidden className="mt-[3px] h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: seg.color }} />
            <p className="min-w-0 text-[12px] font-medium leading-[1.3] text-ink/70 [overflow-wrap:anywhere]">
              {seg.label}
              <span className="ml-1.5 font-semibold text-ink">{seg.value}%</span>
            </p>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
