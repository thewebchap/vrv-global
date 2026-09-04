import { cn } from "@/lib/cn";

/**
 * Decorative, content-free commodity design elements shared across the Products
 * page (and reusable elsewhere). Every element is purely visual and marked
 * aria-hidden — none of these render or alter any page text/content.
 *
 *  - CommodityPattern    faint per-commodity background texture
 *      · agro   → organic plantation-row contour waves (muted green)
 *      · metals → fine industrial / cathode grid (muted copper)
 *      · mining → terrain contour lines (muted gold)
 *  - SectionRouteConnector  a subtle dotted maritime route divider with tiny
 *      harbour waypoints + a small ship marker (sourcing → … → delivery)
 */
export type CommodityKind = "agro" | "metals" | "mining";

const PATTERN_STROKE: Record<CommodityKind, string> = {
  agro: "rgba(47,125,90,0.6)",
  metals: "rgba(184,115,51,0.55)",
  mining: "rgba(184,149,91,0.6)",
};

/** Per-commodity card theme (tint gradient + border + accent) — style only. */
export const commodityTheme: Record<CommodityKind, { gradient: string; border: string; accent: string }> = {
  agro: { gradient: "linear-gradient(135deg,#F3F8F1,#FFFFFF)", border: "rgba(47,125,90,0.16)", accent: "#2F7D5A" },
  metals: { gradient: "linear-gradient(135deg,#F8F1EC,#FFFFFF)", border: "rgba(184,115,51,0.16)", accent: "#B87333" },
  mining: { gradient: "linear-gradient(135deg,#F8F3E6,#FFFFFF)", border: "rgba(184,149,91,0.18)", accent: "#B8955B" },
};

export function commodityKind(slug: string): CommodityKind | null {
  if (slug === "agro-commodities") return "agro";
  if (slug === "industrial-metals") return "metals";
  if (slug === "mining") return "mining";
  return null;
}

/** Faint commodity-specific background texture. Absolutely fills its parent. */
export function CommodityPattern({ kind, className, opacity = 0.5 }: { kind: CommodityKind; className?: string; opacity?: number }) {
  const stroke = PATTERN_STROKE[kind];
  const id = `cp-${kind}`;
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} style={{ opacity }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width={kind === "agro" ? 120 : 46} height={kind === "agro" ? 46 : 46} patternTransform={kind === "metals" ? "rotate(0)" : undefined}>
          {kind === "agro" && (
            <path d="M-10,34 C20,18 40,50 70,34 C100,18 120,50 150,34" fill="none" stroke={stroke} strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          )}
          {kind === "metals" && (
            <>
              <path d="M0,0 H46 M0,0 V46" fill="none" stroke={stroke} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
              <circle cx={23} cy={23} r={1.1} fill={stroke} />
            </>
          )}
          {kind === "mining" && (
            <path d="M-6,40 Q23,18 52,40 M-6,52 Q23,30 52,52" fill="none" stroke={stroke} strokeWidth={0.9} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          )}
        </pattern>
      </defs>
      <rect x={0} y={0} width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** A small elegant ship marker (facing +x). Decorative only. */
function ShipGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-9,1 Q0,7 10,0 L7,-2 L-7,-2 Z" fill="rgba(11,47,68,0.55)" />
      <line x1={-0.5} y1={-2} x2={-0.5} y2={-12} stroke="rgba(11,47,68,0.55)" strokeWidth={1} />
      <path d="M-0.5,-3 L-0.5,-12 L7,-4 Z" fill="rgba(11,47,68,0.35)" />
    </g>
  );
}

/**
 * A slim dotted maritime route divider — sourcing → … → delivery. Subtle and
 * decorative; simplified (shorter, no ship) on very small screens is achieved by
 * keeping it lightweight. No text is added.
 */
export function SectionRouteConnector({ className }: { className?: string }) {
  // 5 evenly spaced harbour waypoints; ship sits just past the second.
  const waypoints = [60, 260, 500, 740, 940];
  return (
    <div aria-hidden className={cn("relative", className)}>
      <div className="container-x">
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="h-8 w-full">
          <path d="M40,20 C220,6 320,34 500,20 C680,6 780,34 960,20" fill="none" stroke="rgba(11,47,68,0.22)" strokeWidth={1.5} strokeDasharray="4 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M40,20 C220,6 320,34 500,20" fill="none" stroke="rgba(47,125,90,0.45)" strokeWidth={1.75} strokeDasharray="4 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {waypoints.map((x, i) => (
            <circle key={x} cx={x} cy={20} r={2.6} fill="none" stroke={i < 2 ? "rgba(47,125,90,0.6)" : "rgba(11,47,68,0.3)"} strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
          ))}
          <ShipGlyph x={300} y={20} />
        </svg>
      </div>
    </div>
  );
}
