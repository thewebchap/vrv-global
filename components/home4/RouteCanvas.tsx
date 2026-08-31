import type { RefObject } from "react";
import { COLORS, MURAL } from "@/components/home4/route";

/**
 * RouteCanvas — the large continuous route behind the stages. Stretched to the
 * full scroll height (preserveAspectRatio="none"); non-scaling-stroke keeps the
 * dotted line crisp and uniform. A faint grid + contour marks give a premium
 * chart texture. The parent reveals the green travelled trail up to the ship via
 * stroke-dashoffset.
 */
export function RouteCanvas({ planRef, trailRef }: { planRef: RefObject<SVGPathElement>; trailRef: RefObject<SVGPathElement> }) {
  const { w, h } = MURAL.viewBox;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g stroke={COLORS.sea} strokeOpacity={0.05} strokeWidth={1} vectorEffect="non-scaling-stroke">
        {Array.from({ length: 9 }, (_, i) => (i + 1) * 100).map((x) => <line key={"v" + x} x1={x} y1={0} x2={x} y2={h} />)}
        {Array.from({ length: 24 }, (_, i) => (i + 1) * 200).map((y) => <line key={"hz" + y} x1={0} y1={y} x2={w} y2={y} />)}
      </g>
      <g stroke={COLORS.sea} strokeOpacity={0.09} strokeWidth={1} fill="none" vectorEffect="non-scaling-stroke">
        {MURAL.contours.map((d, i) => <path key={i} d={d} vectorEffect="non-scaling-stroke" />)}
      </g>
      <path ref={planRef} d={MURAL.routeD} fill="none" stroke="rgba(11,47,68,0.34)" strokeWidth={1.5} strokeDasharray="4 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path ref={trailRef} d={MURAL.routeD} fill="none" stroke="rgba(47,125,90,0.62)" strokeWidth={1.8} strokeDasharray="4 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
