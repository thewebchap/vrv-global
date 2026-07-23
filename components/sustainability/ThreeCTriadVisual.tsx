import { cn } from "@/lib/cn";

/**
 * ThreeCTriadVisual — a simple, premium inline-SVG triad for VRV's 3C ESG
 * framework: "VRV's ESG Program" at the centre with three connected nodes —
 * Company, Community and Commodities. Pure SVG (no external icon libraries),
 * VRV brand colours (deep blue / muted green / light gold-copper), thin
 * connecting lines and a subtle outer triangle. Responsive via viewBox.
 */
const NODES = [
  { label: "Company", cx: 210, cy: 66, color: "#15724E", bg: "#F3F8F1" }, // muted green
  { label: "Community", cx: 74, cy: 306, color: "#14587A", bg: "#E9F2F7" }, // deep blue
  { label: "Commodities", cx: 346, cy: 306, color: "#B26A2B", bg: "#F8F1EC" }, // gold / copper
] as const;

const CX = 210;
const CY = 196;
const R = 60;

export function ThreeCTriadVisual({ className }: { className?: string }) {
  return (
    <figure className={cn("m-0", className)}>
      <svg
        viewBox="0 0 420 392"
        role="img"
        aria-label="VRV's ESG Program — the 3C framework connecting Company, Community and Commodities"
        className="mx-auto h-auto w-full max-w-md"
      >
        {/* Subtle outer triangle */}
        <polygon
          points="210,66 74,306 346,306"
          fill="none"
          stroke="#15724E"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />

        {/* Connecting lines (drawn under the circles) */}
        {NODES.map((n) => (
          <line key={n.label} x1={CX} y1={CY} x2={n.cx} y2={n.cy} stroke="#14587A" strokeOpacity="0.28" strokeWidth="1.5" />
        ))}

        {/* Centre — VRV's ESG Program */}
        <circle cx={CX} cy={CY} r={R} fill="#14587A" />
        <circle cx={CX} cy={CY} r={R - 5} fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1" />
        <text x={CX} y={CY - 20} textAnchor="middle" fill="#F0A92B" fontSize="11" fontWeight="700" letterSpacing="1.2">
          3C
        </text>
        <text x={CX} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600">
          <tspan x={CX} y={CY + 1}>{"VRV’s ESG"}</tspan>
          <tspan x={CX} y={CY + 19}>Program</tspan>
        </text>

        {/* Outer nodes — the three Cs */}
        {NODES.map((n) => (
          <g key={n.label}>
            <circle cx={n.cx} cy={n.cy} r="48" fill={n.bg} stroke={n.color} strokeWidth="1.5" />
            <text x={n.cx} y={n.cy + 4} textAnchor="middle" fill={n.color} fontSize="13" fontWeight="600">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
