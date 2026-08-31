import { COLORS } from "@/components/home4/route";

/**
 * ShipMarker — a small, refined maritime marker (own /home4 glyph). Drawn facing
 * +x; the parent positions/rotates the wrapper. `tone` allows a light variant
 * for dark hero backgrounds.
 */
export function ShipMarker({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const hull = tone === "light" ? COLORS.cream : COLORS.navy;
  const sail = tone === "light" ? COLORS.cream : COLORS.cream;
  const sailStroke = tone === "light" ? "rgba(246,243,236,0.6)" : COLORS.navy;
  return (
    <g>
      {tone === "dark" && <ellipse cx={0} cy={7} rx={12} ry={2.4} fill={COLORS.navy} opacity={0.12} />}
      <path d="M-11,1 Q0,9 12,0 L8,-2 L-9,-2 Z" fill={hull} />
      <line x1={-1} y1={-2} x2={-1} y2={-15} stroke={hull} strokeWidth={1} />
      <path d="M-1,-3 L-1,-15 L8,-5 Z" fill={sail} stroke={sailStroke} strokeWidth={0.7} strokeLinejoin="round" opacity={tone === "light" ? 0.9 : 1} />
    </g>
  );
}
