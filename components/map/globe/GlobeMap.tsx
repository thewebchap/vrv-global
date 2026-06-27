"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { countryFeatures } from "@/lib/map/worldFeatures";
import {
  commodityCountries,
  countryById,
  roleSummary,
  netColors,
  isMultiRole,
  type CommodityCountry,
} from "@/data/commodityNetwork";

// Role-precise marker palette.
const ROLE_COLOR = {
  hq: netColors.hq, // gold
  multi: netColors.multi, // dual-ring
  "agro-purchase": "#1F8459", // green
  "agro-sales": "#17968B", // green-blue
  "metals-sales": "#2E84AC", // blue
  "metals-purchase": "#C2703D", // copper
} as const;

function colorFor(c: CommodityCountry): string {
  if (c.roles.includes("headquarters")) return ROLE_COLOR.hq;
  if (isMultiRole(c)) return ROLE_COLOR.multi;
  const r = c.roles[0] as keyof typeof ROLE_COLOR;
  return ROLE_COLOR[r] ?? netColors.agro;
}

const SG = countryById.singapore.coordinates; // [lon, lat]
/**
 * Homepage cinematic globe (react-globe.gl / three.js). Slow auto-rotation,
 * soft country markers and a highlighted Singapore HQ with a pulse ring — a
 * clean global-presence visual with no route lines or shipment corridors.
 * Click a country to highlight it. Client-only; loaded via dynamic(ssr:false).
 * Respects reduced motion.
 */
export function GlobeMap() {
  const reduce = useReducedMotion() ?? false;
  const globeRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 520, h: 520 });
  const [selected, setSelected] = useState<string | null>(null);

  const points = useMemo(
    () =>
      commodityCountries.map((c) => ({
        id: c.id,
        lat: c.coordinates[1],
        lng: c.coordinates[0],
        color: colorFor(c),
        size: c.roles.includes("headquarters") ? 0.85 : 0.42,
        c,
      })),
    [],
  );

  // HQ pulse + a quiet "dual-ring" on every multi-role country.
  const rings = useMemo(() => {
    const list: { lat: number; lng: number; maxR: number; speed: number; period: number; color: string }[] = [
      { lat: SG[1], lng: SG[0], maxR: 5, speed: 1, period: 1500, color: netColors.hq },
    ];
    for (const c of commodityCountries) {
      if (!c.roles.includes("headquarters") && isMultiRole(c)) {
        list.push({ lat: c.coordinates[1], lng: c.coordinates[0], maxR: 2.6, speed: 2, period: 2600, color: netColors.multi });
      }
    }
    if (selected && selected !== "singapore") {
      const c = countryById[selected];
      if (c) list.push({ lat: c.coordinates[1], lng: c.coordinates[0], maxR: 3.5, speed: 1.5, period: 1200, color: netColors.hq });
    }
    return list;
  }, [selected]);

  // Deep-ocean globe material (navy) — strong contrast under the sage land polygons.
  const globeMaterial = useMemo(() => new THREE.MeshPhongMaterial({ color: "#0B2238", shininess: 6 }), []);

  // responsive square
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setSize({ w, h: Math.min(Math.max(w, 360), 560) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // camera + controls
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const c = g.controls();
    c.autoRotate = !reduce;
    c.autoRotateSpeed = 0.5;
    c.enableZoom = false;
    g.pointOfView({ lat: 12, lng: 70, altitude: 2.3 }, 0);
  }, [reduce]);

  return (
    <div ref={wrapRef} className="flex w-full justify-center">
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor="#8FB9D9"
        atmosphereAltitude={0.16}
        polygonsData={countryFeatures}
        polygonCapColor={() => "#AEC6B3"}
        polygonSideColor={() => "rgba(11,34,56,0)"}
        polygonStrokeColor={() => "#7FA590"}
        polygonAltitude={0.006}
        pointsData={points}
        pointColor="color"
        pointAltitude={0.02}
        pointRadius="size"
        pointResolution={18}
        pointLabel={(d: any) => {
          const { title, lines } = roleSummary(d.c);
          return `<div style="font:600 13px Inter,system-ui;color:#16201C;background:rgba(255,255,255,0.96);border:1px solid #DCE7E1;border-radius:8px;padding:6px 9px;box-shadow:0 8px 24px rgba(0,0,0,.18)">${title}${lines
            .map((l: string) => `<div style="font-weight:500;font-size:11px;color:#5a6b63;margin-top:2px">${l}</div>`)
            .join("")}</div>`;
        }}
        onPointClick={(d: any) => setSelected((s) => (s === d.id ? null : d.id))}
        ringsData={rings}
        ringColor={(d: any) => {
          const [r, g, b] = [1, 3, 5].map((i) => parseInt(d.color.slice(i, i + 2), 16));
          return (t: number) => `rgba(${r},${g},${b},${1 - t})`;
        }}
        ringMaxRadius="maxR"
        ringPropagationSpeed="speed"
        ringRepeatPeriod="period"
      />
    </div>
  );
}
