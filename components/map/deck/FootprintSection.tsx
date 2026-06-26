"use client";

import dynamic from "next/dynamic";

const FootprintMap = dynamic(() => import("./FootprintMap").then((m) => m.FootprintMap), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
      <div className="aspect-[4/3] w-full animate-pulse rounded-2xl border border-line bg-paper sm:aspect-[16/10]" />
      <div className="h-72 w-full animate-pulse rounded-2xl border border-line bg-paper" />
    </div>
  ),
});

/** Analytical commodities map (deck.gl + MapLibre), client-only. */
export function FootprintSection() {
  return <FootprintMap />;
}
