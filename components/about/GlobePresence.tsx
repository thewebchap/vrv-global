"use client";

import dynamic from "next/dynamic";
import { vrvGroupLocations } from "@/data/vrvGroup";

/**
 * GlobePresence — the About page "Global Presence" block. Lazy-loads the WebGL
 * globe (client-only) so it doesn't weigh on initial load. While it loads — or
 * if WebGL is unavailable — a clean VRV Group country list stands in so the
 * section is never blank and stays readable/accessible.
 */
function GroupList() {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-label text-brand">VRV Group</p>
      <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink/60">
        Our own country presence, coordinated from the Singapore headquarters.
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {vrvGroupLocations.map((l) => (
          <li
            key={l.id}
            className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[13.5px] font-medium text-ink/80"
          >
            <span
              aria-hidden
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: l.type === "hq" ? "#D9822B" : "#3E7D5F" }}
            />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

const AboutGlobe = dynamic(() => import("./AboutGlobe").then((m) => m.AboutGlobe), {
  ssr: false,
  loading: () => <GroupList />,
});

export function GlobePresence() {
  return <AboutGlobe />;
}
