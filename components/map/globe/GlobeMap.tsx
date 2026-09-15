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
import {
  vrvGroupLocations,
  vrvGroupIso,
  vrvGroupColors,
  SINGAPORE_ISO,
} from "@/data/vrvGroup";

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
  // Guided VRV Group tour: the active country's border + label are highlighted
  // automatically (no hover needed) and the camera focuses it in turn.
  const [activeGroup, setActiveGroup] = useState(0);
  const activeIso = reduce ? "" : vrvGroupLocations[activeGroup]?.iso ?? "";
  const activeGroupLoc = vrvGroupLocations[activeGroup];

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
    // Quiet pulse on the currently active VRV Group country.
    if (!reduce && activeGroupLoc && activeGroupLoc.type !== "hq") {
      list.push({ lat: activeGroupLoc.lat, lng: activeGroupLoc.lng, maxR: 3.2, speed: 1.4, period: 1600, color: vrvGroupColors.active });
    }
    return list;
  }, [selected, activeGroupLoc, reduce]);

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

  // camera + controls — a guided VRV Group tour replaces idle auto-rotation so
  // each group country is brought to the front with its border + label active.
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const c = g.controls();
    c.autoRotate = false;
    c.enableZoom = false;
    // Reduced motion: rest on the VRV Group region so all borders/labels show.
    g.pointOfView({ lat: reduce ? 8 : 12, lng: reduce ? 52 : 70, altitude: 2.3 }, 0);
  }, [reduce]);

  // Advance the active group country on a slow interval.
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setActiveGroup((a) => (a + 1) % vrvGroupLocations.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  // Focus the camera on the active country as the tour progresses.
  useEffect(() => {
    if (reduce) return;
    const g = globeRef.current;
    if (!g || !activeGroupLoc) return;
    g.pointOfView({ lat: activeGroupLoc.lat, lng: activeGroupLoc.lng, altitude: 2.2 }, 1500);
  }, [activeGroup, reduce, activeGroupLoc]);

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
        polygonCapColor={(f: any) => {
          const id = String(f.id);
          if (id === SINGAPORE_ISO) return "#E8CE95"; // HQ — gold tint
          if (vrvGroupIso.has(id)) return id === activeIso ? "#8FBFA0" : "#B9D2BE";
          return "#AEC6B3";
        }}
        polygonSideColor={() => "rgba(11,34,56,0)"}
        polygonStrokeColor={(f: any) => {
          const id = String(f.id);
          if (id === activeIso) return vrvGroupColors.active; // active border highlight
          if (id === SINGAPORE_ISO) return "#C79A3D";
          if (vrvGroupIso.has(id)) return vrvGroupColors.group;
          return "#7FA590";
        }}
        polygonAltitude={(f: any) => {
          const id = String(f.id);
          if (id === activeIso) return 0.012;
          if (vrvGroupIso.has(id)) return 0.008;
          return 0.006;
        }}
        labelsData={vrvGroupLocations}
        labelLat="lat"
        labelLng="lng"
        labelText={(d: any) => d.label}
        labelSize={(d: any) => (d.iso === activeIso ? 1.15 : d.type === "hq" ? 1.0 : 0.85)}
        labelDotRadius={(d: any) => (d.type === "hq" ? 0 : 0.32)}
        labelColor={(d: any) => (d.type === "hq" ? vrvGroupColors.hq : vrvGroupColors.groupLabel)}
        labelAltitude={0.016}
        labelResolution={2}
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
