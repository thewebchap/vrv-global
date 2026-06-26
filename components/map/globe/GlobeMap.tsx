"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { countryFeatures } from "@/lib/map/worldFeatures";
import {
  commodityCountries,
  temporaryCommodityRoutes,
  countryById,
  routesForCountry,
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
const hexRgba = (hex: string, a: number) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${a})`;
};
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
function pickRandom<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

/**
 * Homepage cinematic globe (react-globe.gl / three.js). Slow auto-rotation,
 * soft country markers, a highlighted Singapore HQ with a pulse ring, and
 * 3–5 temporary arcs that cycle. Click a country to focus its related arcs.
 * Client-only; loaded via dynamic(ssr:false). Respects reduced motion.
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

  // Cycling temporary arcs (3–5), or related arcs when a country is selected.
  const pool = useMemo(() => (selected ? routesForCountry(selected) : temporaryCommodityRoutes), [selected]);
  const poolKey = pool.map((r) => r.id).join(",");
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const isMobile = size.w > 0 && size.w < 640;
  useEffect(() => {
    if (pool.length === 0) {
      setActiveIds([]);
      return;
    }
    // 4–7 corridors on desktop, 2–4 on mobile; all related when a country is focused.
    const hi = isMobile ? 4 : 7;
    const lo = isMobile ? 2 : 4;
    const cap = Math.min(selected ? pool.length : hi, pool.length);
    setActiveIds(pickRandom(pool, cap).map((r) => r.id));
    if (reduce || selected || pool.length <= cap) return;
    const t = setInterval(() => {
      setActiveIds(pickRandom(pool, Math.round(rand(lo, hi))).map((r) => r.id));
    }, 4800);
    return () => clearInterval(t);
  }, [poolKey, reduce, selected, isMobile]);

  const arcs = useMemo(
    () =>
      activeIds
        .map((id) => temporaryCommodityRoutes.find((r) => r.id === id))
        .filter(Boolean)
        .map((r) => {
          const a = countryById[r!.from];
          const b = countryById[r!.to];
          const col = r!.segment === "agro" ? netColors.agro : netColors.metals;
          // soft gradient: stronger at source → fading toward destination
          return { startLat: a.coordinates[1], startLng: a.coordinates[0], endLat: b.coordinates[1], endLng: b.coordinates[0], color: [hexRgba(col, 0.95), hexRgba(col, 0.32)] };
        }),
    [activeIds],
  );

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
        arcsData={arcs}
        arcColor="color"
        arcStroke={0.5}
        arcDashLength={0.4}
        arcDashGap={0.18}
        arcDashAnimateTime={reduce ? 0 : 4500}
        arcAltitudeAutoScale={0.45}
        arcsTransitionDuration={1500}
      />
    </div>
  );
}
