"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { countryFeatures } from "@/lib/map/worldFeatures";
import { commodityCountries, countryById, roleSummary, type CommodityCountry } from "@/data/commodityNetwork";
import { vrvGroupLocations, vrvGroupIso } from "@/data/vrvGroup";

/**
 * AboutGlobe — the About page "Global Presence" premium interactive globe
 * (react-globe.gl / three.js, client-only, lazy-loaded).
 *
 * VRV Group is shown clearly (Singapore HQ orange + the other five green, with
 * highlighted country boundaries and always-on labels) but is NOT a per-country
 * selector — the six are simply listed in the side panel. Commodity presence is
 * restored to its specific categories: Sales Geography (blue) and Purchase
 * Geography (brown/gold), with Mining Focus noted. Slow auto-rotation, drag to
 * rotate, +/-/Reset/auto controls, day/night by browser hour, no wheel-zoom
 * scroll trap. Respects prefers-reduced-motion.
 */

const HQ_ORANGE = "#D9822B";
const GROUP_GREEN = "#3E7D5F";
const SALES_BLUE = "#2E84AC";
const PURCHASE_BROWN = "#B27A3C";
const VRV_GROUP_IDS = new Set(vrvGroupLocations.map((l) => l.id));
const SG = countryById.singapore.coordinates; // [lon, lat]
const INITIAL_POV = { lat: 8, lng: 80, altitude: 2.4 };

// Abstract warm "city light" clusters for dark mode only — atmosphere, not data.
// Kept away from Singapore itself so they're never confused with the HQ marker.
const CITY_LIGHTS: { lat: number; lng: number }[] = [
  // SE Asia
  { lat: 3.1, lng: 101.7 }, { lat: -6.2, lng: 106.8 }, { lat: 13.7, lng: 100.5 },
  // India
  { lat: 19.1, lng: 72.9 }, { lat: 28.6, lng: 77.2 },
  // Gulf
  { lat: 25.2, lng: 55.3 },
  // East Asia
  { lat: 31.2, lng: 121.5 }, { lat: 35.7, lng: 139.7 }, { lat: 37.5, lng: 127.0 },
  // Europe
  { lat: 51.5, lng: -0.1 }, { lat: 50.1, lng: 8.7 }, { lat: 45.5, lng: 9.2 },
  // West Africa
  { lat: 6.5, lng: 3.4 }, { lat: 5.3, lng: -4.0 },
  // East / Southern Africa
  { lat: -6.8, lng: 39.3 }, { lat: -26.2, lng: 28.0 }, { lat: -1.3, lng: 36.8 },
];

const hasSales = (c: CommodityCountry) => c.roles.some((r) => r.endsWith("-sales"));
const hasPurchase = (c: CommodityCountry) => c.roles.some((r) => r.endsWith("-purchase"));

/** Dark globe when the system prefers dark OR it's nighttime (fail-safe to time). */
function computeDark(): boolean {
  if (typeof window === "undefined") return false;
  let prefersDark = false;
  try {
    prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  } catch {
    prefersDark = false;
  }
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  return prefersDark || isNight;
}

const MINING_GOLD = "#B8955B";

// Category lists (from the real role data) for the side panel.
const salesCountries = commodityCountries.filter(hasSales);
const purchaseCountries = commodityCountries.filter(hasPurchase);
const miningFocus = ["tanzania", "zambia"].map((id) => countryById[id]);

// Numeric ISO 3166-1 codes (world-atlas polygon feature ids — leading-zero
// padded, e.g. Brazil "076"). Singapore has no polygon in the 110m dataset, so
// it is shown via the orange HQ marker only. Used to draw country boundaries.
const ISO_BY_ID: Record<string, string> = {
  singapore: "702", usa: "840", hungary: "348", turkey: "792", uae: "784",
  india: "356", "sri-lanka": "144", china: "156", "south-korea": "410", japan: "392",
  malaysia: "458", liberia: "430", "cote-divoire": "384", ghana: "288", nigeria: "566",
  cameroon: "120", brazil: "076", thailand: "764", vietnam: "704", indonesia: "360",
  philippines: "608", "united-kingdom": "826", spain: "724", italy: "380", australia: "036",
  "democratic-republic-of-congo": "180", tanzania: "834", zambia: "894", "south-africa": "710",
};
const isoSet = (list: CommodityCountry[]) => new Set(list.map((c) => ISO_BY_ID[c.id]).filter(Boolean));
const SALES_ISO = isoSet(salesCountries);
const PURCHASE_ISO = isoSet(purchaseCountries);
const MINING_ISO = new Set(["834", "894"]); // Tanzania, Zambia

// One display category per country → drives its boundary + marker colour.
type DisplayCat = "hq" | "vrvGroup" | "sales" | "purchase" | "mining";
const CAT_COLOR: Record<DisplayCat, string> = {
  hq: HQ_ORANGE, vrvGroup: GROUP_GREEN, sales: SALES_BLUE, purchase: PURCHASE_BROWN, mining: MINING_GOLD,
};

/**
 * In "All" mode, resolve a polygon's single display category (overlaps → a
 * fixed priority so each country gets one clean boundary, never stacked outlines).
 * Priority keeps every category visible: Mining Focus (Tanzania/Zambia) reads as
 * gold, remaining VRV Group countries green, then sales, then purchase.
 */
function allDisplayCat(iso: string): DisplayCat | null {
  if (MINING_ISO.has(iso)) return "mining";
  if (vrvGroupIso.has(iso)) return "vrvGroup"; // India, UAE, Ivory Coast (Singapore = marker)
  if (SALES_ISO.has(iso)) return "sales";
  if (PURCHASE_ISO.has(iso)) return "purchase";
  return null;
}

// Selectable legend categories. Category-level selection only (no per-country).
type CategoryKey = "all" | "vrvGroup" | "sales" | "purchase" | "mining";

// Side-panel category listings (the four real datasets).
const CATEGORIES: { key: Exclude<CategoryKey, "all">; label: string; color: string; names: string[] }[] = [
  { key: "vrvGroup", label: "VRV Group", color: GROUP_GREEN, names: vrvGroupLocations.map((l) => l.label) },
  { key: "sales", label: "Sales Geography", color: SALES_BLUE, names: salesCountries.map((c) => c.label) },
  { key: "purchase", label: "Purchase Geography", color: PURCHASE_BROWN, names: purchaseCountries.map((c) => c.label) },
  { key: "mining", label: "Mining Focus", color: MINING_GOLD, names: miningFocus.map((c) => c.label) },
];

// Chip selector — "All" first, then the four categories. "multi" swatch renders
// a small 4-colour dot; each item carries an accent for its active-chip tint.
const SELECTOR: { key: CategoryKey; label: string; swatch: string; accent: string }[] = [
  { key: "all", label: "All", swatch: "multi", accent: "#5F6F67" },
  { key: "vrvGroup", label: "VRV Group", swatch: GROUP_GREEN, accent: GROUP_GREEN },
  { key: "sales", label: "Sales Geography", swatch: SALES_BLUE, accent: SALES_BLUE },
  { key: "purchase", label: "Purchase Geography", swatch: PURCHASE_BROWN, accent: PURCHASE_BROWN },
  { key: "mining", label: "Mining Focus", swatch: MINING_GOLD, accent: MINING_GOLD },
];

/** hex + alpha → rgba() string (react-globe.gl point colours accept rgba). */
function rgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

type ThemeTokens = {
  ocean: string; land: string; landGroup: string; landHQ: string;
  stroke: string; groupStroke: string; hqStroke: string; atmosphere: string;
  labelGroup: string; labelHQ: string;
  // Per-category boundary fill (cap) + outline (stroke) for highlighted countries.
  cat: Record<DisplayCat, { cap: string; stroke: string }>;
};

const DAY: ThemeTokens = {
  ocean: "#E9F0F4", land: "#D5DED8", landGroup: "#C2D8C8", landHQ: "#EDD9AF",
  stroke: "#B6C4BD", groupStroke: "#3E7D5F", hqStroke: "#C77A2A", atmosphere: "#A6C7DF",
  labelGroup: "#173D2B", labelHQ: "#8A4B12",
  cat: {
    hq: { cap: "#EDD9AF", stroke: "#C77A2A" },
    vrvGroup: { cap: "#C2D8C8", stroke: "#3E7D5F" },
    sales: { cap: "#C3DAE6", stroke: "#2E84AC" },
    purchase: { cap: "#E4D3BC", stroke: "#B27A3C" },
    mining: { cap: "#E1D3B0", stroke: "#B8955B" },
  },
};
const NIGHT: ThemeTokens = {
  ocean: "#0B2238", land: "#233240", landGroup: "#2C4A43", landHQ: "#463619",
  stroke: "#39505C", groupStroke: "#4E9E77", hqStroke: "#D9822B", atmosphere: "#33506E",
  labelGroup: "#CFE6D8", labelHQ: "#F2B872",
  cat: {
    hq: { cap: "#463619", stroke: "#D9822B" },
    vrvGroup: { cap: "#2C4A43", stroke: "#4E9E77" },
    sales: { cap: "#26414E", stroke: "#4FA6CE" },
    purchase: { cap: "#46392A", stroke: "#C89A5E" },
    mining: { cap: "#453D28", stroke: "#CBA972" },
  },
};

export function AboutGlobe() {
  const reduce = useReducedMotion() ?? false;
  const globeRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | null>(null);

  const [size, setSize] = useState({ w: 520, h: 520 });
  const [autoRotate, setAutoRotate] = useState(true);
  // Selectable legend category (default: VRV Group; "all" is an extra option).
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("vrvGroup");
  const active = CATEGORIES.find((c) => c.key === activeCategory); // undefined when "all"

  // Resolve a polygon's display category for the current selection (or null →
  // default land). Singapore has no polygon, so HQ is handled by the marker.
  const polygonCat = (iso: string): DisplayCat | null => {
    switch (activeCategory) {
      case "all": return allDisplayCat(iso);
      case "vrvGroup": return vrvGroupIso.has(iso) ? "vrvGroup" : null;
      case "sales": return SALES_ISO.has(iso) ? "sales" : null;
      case "purchase": return PURCHASE_ISO.has(iso) ? "purchase" : null;
      case "mining": return MINING_ISO.has(iso) ? "mining" : null;
    }
  };
  // Dark globe when the system prefers dark OR it's nighttime locally. Resolved
  // once on the client (no SSR flash — this component is client-only) and kept
  // in sync if the system theme changes.
  const [dark, setDark] = useState<boolean>(() => computeDark());
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const onChange = () => setDark(computeDark());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const t = dark ? NIGHT : DAY;

  // Markers: highlight the active category, dim the rest. VRV Group keeps a
  // faint presence in every category; Singapore HQ stays orange. Active markers
  // render last (on top).
  const points = useMemo(() => {
    // The active view's display category for a country's marker (null = not in view).
    const markerCat = (c: CommodityCountry): DisplayCat | null => {
      const isHQ = c.id === "singapore";
      switch (activeCategory) {
        case "all": return isHQ ? "hq" : allDisplayCat(ISO_BY_ID[c.id] ?? "");
        case "vrvGroup": return isHQ ? "hq" : VRV_GROUP_IDS.has(c.id) ? "vrvGroup" : null;
        case "sales": return hasSales(c) ? (isHQ ? "hq" : "sales") : null;
        case "purchase": return hasPurchase(c) ? "purchase" : null;
        case "mining": return c.id === "tanzania" || c.id === "zambia" ? "mining" : null;
      }
    };
    const mapped = commodityCountries.map((c) => {
      const isHQ = c.id === "singapore";
      const dc = markerCat(c);
      const inActive = dc !== null;
      let hex: string;
      let size: number;
      let alpha: number;
      if (inActive) {
        hex = CAT_COLOR[dc];
        // Hierarchy: Singapore HQ strongest; slightly smaller markers in the
        // busier "All" view so it never reads as cluttered.
        size = dc === "hq" ? (activeCategory === "all" ? 0.85 : 0.95) : activeCategory === "all" ? 0.5 : 0.62;
        alpha = 1;
      } else if (VRV_GROUP_IDS.has(c.id)) {
        hex = isHQ ? HQ_ORANGE : GROUP_GREEN; // faint VRV Group presence
        size = 0.4;
        alpha = 0.4;
      } else {
        hex = "#8AA0AD";
        size = 0.26;
        alpha = 0.22;
      }
      return { id: c.id, lat: c.coordinates[1], lng: c.coordinates[0], color: rgba(hex, alpha), size, c, inActive };
    });
    return mapped.sort((a, b) => Number(a.inActive) - Number(b.inActive));
  }, [activeCategory]);

  // HQ pulse when Singapore is emphasised (VRV Group or All — Singapore strongest).
  const rings = useMemo(() => {
    if (reduce || (activeCategory !== "vrvGroup" && activeCategory !== "all")) return [] as any[];
    return [{ lat: SG[1], lng: SG[0], maxR: 4.2, speed: 1, period: 1900, color: HQ_ORANGE }];
  }, [reduce, activeCategory]);

  const globeMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: t.ocean, shininess: dark ? 8 : 4 }),
    [t.ocean, dark],
  );

  // Soft warm radial glow texture (generated once, no asset) for city lights.
  const glowTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const ctx = cv.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(240,186,110,0.95)");
    g.addColorStop(0.45, "rgba(224,158,80,0.35)");
    g.addColorStop(1, "rgba(224,158,80,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(cv);
  }, []);

  // City lights: dark mode only, fewer + fainter on small screens.
  const compact = size.w < 460;
  const cityLights = useMemo(() => {
    if (!dark) return [] as { lat: number; lng: number; opacity: number; scale: number }[];
    const src = compact ? CITY_LIGHTS.filter((_, i) => i % 2 === 0) : CITY_LIGHTS;
    return src.map((p) => ({ ...p, opacity: compact ? 0.13 : 0.2, scale: compact ? 4 : 5 }));
  }, [dark, compact]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setSize({ w, h: Math.min(Math.max(w, 340), 560) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const autoRotateRef = useRef(autoRotate);
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Mount-only: no wheel zoom (no scroll trap), face Asia, pause rotation on drag.
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const c = g.controls();
    c.enableZoom = false;
    c.enablePan = false;
    c.autoRotateSpeed = 0.35;
    c.autoRotate = autoRotateRef.current && !reduce;
    g.pointOfView(INITIAL_POV, 0);
    const onStart = () => {
      c.autoRotate = false;
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
    const onEnd = () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        c.autoRotate = autoRotateRef.current && !reduce;
      }, 2500);
    };
    c.addEventListener("start", onStart);
    c.addEventListener("end", onEnd);
    return () => {
      c.removeEventListener("start", onStart);
      c.removeEventListener("end", onEnd);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, [reduce]);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    g.controls().autoRotate = autoRotate && !reduce;
  }, [autoRotate, reduce]);

  const currentAltitude = () => globeRef.current?.pointOfView()?.altitude ?? INITIAL_POV.altitude;
  const zoomBy = (factor: number) => globeRef.current?.pointOfView({ altitude: Math.min(3.6, Math.max(1.4, currentAltitude() * factor)) }, 300);
  const resetView = () => globeRef.current?.pointOfView(INITIAL_POV, 600);

  const btn =
    "flex h-9 w-9 items-center justify-center text-ink/70 transition-colors hover:bg-paper hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(250px,0.9fr)_1.3fr] lg:items-center lg:gap-12">
      {/* Side panel — selectable legend categories + the active category list */}
      <aside className="order-2 lg:order-1">
        <p className="text-[11px] font-semibold uppercase tracking-label text-ink/45">Explore by</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Global presence categories">
          {SELECTOR.map((c) => {
            const on = c.key === activeCategory;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActiveCategory(c.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  on ? "border-transparent text-ink shadow-soft" : "border-line bg-white text-ink/65 hover:border-brand/30 hover:text-ink"
                }`}
                style={on ? { backgroundColor: rgba(c.accent, 0.14) } : undefined}
              >
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full"
                  style={
                    c.swatch === "multi"
                      ? { background: `conic-gradient(${GROUP_GREEN} 0deg 90deg, ${SALES_BLUE} 90deg 180deg, ${PURCHASE_BROWN} 180deg 270deg, ${MINING_GOLD} 270deg 360deg)` }
                      : { backgroundColor: c.swatch }
                  }
                />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-paper p-5">
          {activeCategory === "all" ? (
            <div className="space-y-4" aria-live="polite">
              <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">All presence</p>
              {CATEGORIES.map((c) => (
                <div key={c.key}>
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label" style={{ color: c.color }}>
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.label}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/70">{c.names.join(", ")}</p>
                </div>
              ))}
              <p className="border-t border-line pt-3 text-[12px] text-ink/50">
                Singapore is the Group HQ (orange). Where a country spans more than one category, its strongest role is shown.
              </p>
            </div>
          ) : (
            <>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label" style={{ color: active!.color }}>
                <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: active!.color }} />
                {active!.label}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/70" aria-live="polite">
                {active!.names.join(", ")}
              </p>
              {activeCategory === "vrvGroup" && (
                <p className="mt-3 border-t border-line pt-3 text-[12px] text-ink/50">
                  Singapore is the Group HQ (shown in orange); other VRV Group countries share one colour.
                </p>
              )}
            </>
          )}
        </div>
      </aside>

      {/* Globe + controls */}
      <div className="order-1 lg:order-2">
        <div
          ref={wrapRef}
          className="relative flex w-full justify-center overflow-hidden rounded-2xl border border-line transition-colors duration-500"
          style={{ backgroundColor: dark ? "#081a2c" : "#eef3f6" }}
        >
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeMaterial={globeMaterial}
            showAtmosphere
            atmosphereColor={t.atmosphere}
            atmosphereAltitude={0.16}
            customLayerData={cityLights}
            customThreeObject={(d: any) => {
              const mat = new THREE.SpriteMaterial({
                map: glowTex ?? undefined,
                transparent: true,
                opacity: d.opacity,
                depthWrite: false,
              });
              const s = new THREE.Sprite(mat);
              s.scale.set(d.scale, d.scale, 1);
              s.renderOrder = -1; // sit beneath the data markers
              return s;
            }}
            customThreeObjectUpdate={(obj: any, d: any) => {
              const g = globeRef.current;
              if (g) Object.assign(obj.position, g.getCoords(d.lat, d.lng, 0.006));
            }}
            polygonsData={countryFeatures}
            polygonCapColor={(f: any) => {
              const dc = polygonCat(String(f.id));
              return dc ? t.cat[dc].cap : t.land;
            }}
            polygonSideColor={() => "rgba(0,0,0,0)"}
            polygonStrokeColor={(f: any) => {
              const dc = polygonCat(String(f.id));
              return dc ? t.cat[dc].stroke : t.stroke;
            }}
            polygonAltitude={(f: any) => (polygonCat(String(f.id)) ? 0.01 : 0.006)}
            labelsData={activeCategory === "vrvGroup" || activeCategory === "all" ? vrvGroupLocations : []}
            labelLat="lat"
            labelLng="lng"
            labelText={(d: any) => d.label}
            labelSize={(d: any) => (d.type === "hq" ? 1.0 : 0.82)}
            labelDotRadius={(d: any) => (d.type === "hq" ? 0 : 0.3)}
            labelColor={(d: any) => (d.type === "hq" ? t.labelHQ : t.labelGroup)}
            labelAltitude={0.016}
            labelResolution={2}
            pointsData={points}
            pointColor="color"
            pointAltitude={0.02}
            pointRadius="size"
            pointResolution={16}
            pointLabel={(d: any) => {
              const { title, lines } = roleSummary(d.c);
              return `<div style="font:600 12px Inter,system-ui;color:#16201C;background:rgba(255,255,255,0.96);border:1px solid #DCE7E1;border-radius:8px;padding:5px 8px;box-shadow:0 8px 24px rgba(0,0,0,.18)">${title}${lines
                .map((l: string) => `<div style="font-weight:500;font-size:11px;color:#5a6b63;margin-top:2px">${l}</div>`)
                .join("")}</div>`;
            }}
            ringsData={rings}
            ringColor={(d: any) => {
              const [r, g, b] = [1, 3, 5].map((i) => parseInt(d.color.slice(i, i + 2), 16));
              return (x: number) => `rgba(${r},${g},${b},${1 - x})`;
            }}
            ringMaxRadius="maxR"
            ringPropagationSpeed="speed"
            ringRepeatPeriod="period"
          />

          {/* Zoom / rotate controls */}
          <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-line bg-white/90 shadow-soft backdrop-blur">
            <button type="button" aria-label="Zoom in" className={btn} onClick={() => zoomBy(0.8)}>
              <span className="text-lg leading-none">+</span>
            </button>
            <button type="button" aria-label="Zoom out" className={`${btn} border-t border-line`} onClick={() => zoomBy(1.25)}>
              <span className="text-lg leading-none">−</span>
            </button>
            <button type="button" aria-label="Reset globe view" className={`${btn} border-t border-line text-[11px] font-semibold uppercase`} onClick={resetView}>
              Reset
            </button>
            <button
              type="button"
              aria-label={autoRotate ? "Pause auto-rotation" : "Resume auto-rotation"}
              aria-pressed={autoRotate}
              className={`${btn} border-t border-line text-[13px]`}
              onClick={() => setAutoRotate((v) => !v)}
            >
              {autoRotate ? "❙❙" : "▶"}
            </button>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-ink/45">
          Drag to rotate · use the controls to zoom · hover a marker for details. Choose a category to outline its countries; Singapore (HQ) is always shown in orange.
        </p>
      </div>
    </div>
  );
}
