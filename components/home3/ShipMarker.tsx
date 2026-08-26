import { COLORS } from "@/components/home3/route";

/**
 * ShipMarker — a small, refined maritime marker drawn facing +x (travel
 * direction). Deliberately compact and understated; the parent translates and
 * gently rotates the wrapping <g> on scroll, so this stays a static drawing.
 */
export function ShipMarker() {
  return (
    <g>
      <ellipse cx={0} cy={7} rx={12} ry={2.4} fill={COLORS.navy} opacity={0.12} />
      {/* hull */}
      <path d="M-11,1 Q0,9 12,0 L8,-2 L-9,-2 Z" fill={COLORS.navy} />
      {/* mast + sail */}
      <line x1={-1} y1={-2} x2={-1} y2={-15} stroke={COLORS.navy} strokeWidth={1} />
      <path d="M-1,-3 L-1,-15 L8,-5 Z" fill={COLORS.cream} stroke={COLORS.navy} strokeWidth={0.7} strokeLinejoin="round" />
    </g>
  );
}
