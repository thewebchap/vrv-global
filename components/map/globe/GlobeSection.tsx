"use client";

import dynamic from "next/dynamic";
import { netColors, MAP_DISCLAIMER } from "@/data/commodityNetwork";

const GlobeMap = dynamic(() => import("./GlobeMap").then((m) => m.GlobeMap), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-square w-full max-w-[560px] items-center justify-center">
      <div className="h-56 w-56 animate-pulse rounded-full bg-white/5" />
    </div>
  ),
});

const Swatch = ({ color, ring = false, label }: { color: string; ring?: boolean; label: string }) => (
  <span className="inline-flex items-center gap-2 text-xs text-white/65">
    <span className="inline-block h-3 w-3 rounded-full" style={ring ? { border: `2px solid ${color}`, background: "transparent" } : { backgroundColor: color }} />
    {label}
  </span>
);

/** Homepage globe + role legend + disclaimer (rendered on the dark section). */
export function GlobeSection() {
  return (
    <div>
      <GlobeMap />
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        <Swatch color={netColors.hq} label="Singapore HQ" />
        <Swatch color="#1F8459" label="Agro purchase" />
        <Swatch color="#17968B" label="Agro sales" />
        <Swatch color="#C2703D" label="Metals purchase" />
        <Swatch color="#2E84AC" label="Metals sales" />
        <Swatch color={netColors.multi} ring label="Multiple roles" />
        <span className="inline-flex items-center gap-2 text-xs text-white/65">
          <span className="inline-block h-0.5 w-6 rounded bg-gradient-to-r from-[#1F8459] to-[#2E84AC]" />
          Commodity corridor
        </span>
      </div>
      <p className="mt-4 text-xs text-white/45">Highlighted corridors rotate to keep the globe readable.</p>
      <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-white/35">{MAP_DISCLAIMER}</p>
    </div>
  );
}
