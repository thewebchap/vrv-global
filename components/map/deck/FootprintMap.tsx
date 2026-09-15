"use client";

import { useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { FlyToInterpolator } from "@deck.gl/core";
import { ScatterplotLayer, GeoJsonLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { countryFeatures } from "@/lib/map/worldFeatures";
import {
  commodityCountries,
  countryById,
  roleSummary,
  ROLE_LABEL,
  netColors,
  isMultiRole,
  isHighlighted,
  MAP_DISCLAIMER,
  type CommodityCountry,
} from "@/data/commodityNetwork";
import { MapFilters, type FilterOption } from "../MapFilters";
import { vrvGroupLocations, vrvGroupIso, SINGAPORE_ISO } from "@/data/vrvGroup";
import { Icon } from "@/components/ui/Icon";

// VRV Group presence: Singapore (HQ) + India, UAE, Ivory Coast, Tanzania, Zambia.
const VRV_GROUP_IDS = new Set(vrvGroupLocations.map((l) => l.id));
const VRV_GROUP_COLOR = "#3E7D5F"; // one shared, muted group colour (matches globe)
const HQ_BOUNDARY = "#D9822B"; // muted orange — Singapore HQ boundary
const GROUP_BOUNDARY = "#1F7A5A"; // muted green — other VRV Group boundaries
const displayLabel = (id: string, label: string) => (id === "singapore" ? "Singapore (HQ)" : label);

// The six VRV Group country polygons (matched by numeric ISO code) — used to
// draw a distinct, always-on boundary so the group is easy to identify.
const vrvGroupFeatures = countryFeatures.filter((f: { id?: string | number }) => vrvGroupIso.has(String(f.id)));

/** The six footprint filters (subset of NetFilter, excluding the legacy "active"). */
type FilterKey = "all" | "agro" | "metals" | "sales" | "purchase" | "headquarters";

const TABS: FilterOption<FilterKey>[] = [
  { key: "all", label: "All" },
  { key: "agro", label: "Agro Commodities" },
  { key: "metals", label: "Metals" },
  { key: "sales", label: "Sales Geographies" },
  { key: "purchase", label: "Purchase Geographies" },
  { key: "headquarters", label: "VRV Group" },
];

const PANEL: Record<FilterKey, { title: string; blurb: string }> = {
  all: {
    title: "Global commodity footprint",
    blurb: "Every agro and metals geography, coordinated from VRV Global's Singapore headquarters.",
  },
  agro: {
    title: "Agro commodity geographies",
    blurb: "Purchase and sales geographies for natural rubber, biomass and agricultural products.",
  },
  metals: {
    title: "Metals geographies",
    blurb: "Purchase and sales geographies for ferrous, non-ferrous and recycled metals.",
  },
  sales: {
    title: "Sales geographies",
    blurb: "Destination markets where VRV Global delivers agro commodities and metals.",
  },
  purchase: {
    title: "Purchase geographies",
    blurb: "Sourcing geographies engaged through responsible-sourcing relationships.",
  },
  headquarters: {
    title: "VRV Group",
    blurb: "VRV Group's own country presence — the Singapore headquarters together with India, the UAE, Côte d'Ivoire (Ivory Coast), Tanzania and Zambia.",
  },
};

const LEGEND = [
  { label: "Singapore (HQ)", color: HQ_BOUNDARY },
  { label: "VRV Group Countries", color: GROUP_BOUNDARY },
  { label: "Agro Commodities", color: netColors.agro },
  { label: "Metals", color: netColors.metals },
  { label: "Multiple roles", color: netColors.multi },
];

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const INITIAL_VIEW = { longitude: 55, latitude: 18, zoom: 1.15, pitch: 0, bearing: 0 };

const hexRgb = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
function colorFor(c: CommodityCountry): [number, number, number] {
  if (c.roles.includes("headquarters")) return hexRgb(netColors.hq);
  if (isMultiRole(c)) return hexRgb(netColors.multi);
  return hexRgb(c.roles[0].startsWith("agro") ? netColors.agro : netColors.metals);
}

/**
 * Global commodity footprint — a clean location map (deck.gl ScatterplotLayer
 * over MapLibre). Shows only location dots and highlighted geographies: no
 * route lines, arcs or corridors. Filters emphasise relevant markers and dim
 * the rest; hovering a marker shows its country, segment and role.
 */
export function FootprintMap() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<string | null>(null);
  // Controlled view so zoom happens only on intent (buttons / country focus),
  // never on scroll. Wheel zoom is disabled on the controller below.
  const [viewState, setViewState] = useState<Record<string, unknown>>(INITIAL_VIEW);
  const zoomOf = (v: Record<string, unknown>) => (v.zoom as number) ?? INITIAL_VIEW.zoom;

  const flyTo = (lon: number, lat: number, zoom: number) =>
    setViewState((v) => ({
      ...v,
      longitude: lon,
      latitude: lat,
      zoom: Math.max(zoomOf(v), zoom),
      transitionDuration: 650,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.6 }),
    }));

  const zoomBy = (d: number) =>
    setViewState((v) => ({ ...v, zoom: Math.min(4.5, Math.max(0.6, zoomOf(v) + d)), transitionDuration: 250, transitionInterpolator: undefined }));

  const resetView = () => {
    setSelected(null);
    setViewState({ ...INITIAL_VIEW, transitionDuration: 450 });
  };

  // Select a country and gently focus the map on it (clear visitor intent).
  const focusCountry = (id: string) => {
    setSelected((s) => (s === id ? null : id));
    const c = countryById[id];
    if (c) flyTo(c.coordinates[0], c.coordinates[1], 2.6);
  };

  // Under the "VRV Group" filter, the six group countries are the highlighted set.
  const isVrvGroup = filter === "headquarters";
  const inFilter = (d: CommodityCountry) =>
    isVrvGroup ? VRV_GROUP_IDS.has(d.id) : isHighlighted(d, filter);

  // ISO code of the selected country (if it's a VRV Group country) — for a
  // stronger boundary on focus.
  const selIso = selected ? vrvGroupLocations.find((l) => l.id === selected)?.iso ?? null : null;

  const layers = useMemo(
    () => [
      // VRV Group country boundaries — always visible: Singapore orange, others
      // shared green, with a very light fill tint. Non-VRV countries untouched.
      new GeoJsonLayer({
        id: "vrv-group-boundaries",
        data: vrvGroupFeatures as any,
        stroked: true,
        filled: true,
        getLineColor: (f: any) => (String(f.id) === SINGAPORE_ISO ? [...hexRgb(HQ_BOUNDARY), 255] : [...hexRgb(GROUP_BOUNDARY), 235]) as any,
        getFillColor: (f: any) => (String(f.id) === SINGAPORE_ISO ? [...hexRgb(HQ_BOUNDARY), 46] : [...hexRgb(GROUP_BOUNDARY), 40]) as any,
        getLineWidth: (f: any) => {
          const id = String(f.id);
          const base = id === SINGAPORE_ISO ? 2.5 : 2;
          return id === selIso ? base + 1.5 : base;
        },
        lineWidthUnits: "pixels",
        lineWidthMinPixels: 1.5,
        pickable: false,
        parameters: { depthTest: false },
        updateTriggers: { getLineWidth: [selIso] },
      }),
      new ScatterplotLayer({
        id: "markers",
        data: commodityCountries,
        getPosition: (d: CommodityCountry) => d.coordinates,
        getRadius: (d: CommodityCountry) =>
          d.roles.includes("headquarters")
            ? 7
            : isVrvGroup && VRV_GROUP_IDS.has(d.id)
              ? 6
              : selected === d.id
                ? 6.5
                : 4.5,
        radiusUnits: "pixels",
        getFillColor: (d: CommodityCountry) => {
          // Singapore stays orange (HQ); other VRV Group countries take the shared
          // group colour ONLY under the VRV Group filter. All other categories and
          // countries keep their existing colours unchanged.
          const grouped = isVrvGroup && VRV_GROUP_IDS.has(d.id) && !d.roles.includes("headquarters");
          const c = grouped ? hexRgb(VRV_GROUP_COLOR) : colorFor(d);
          const on = inFilter(d) || d.roles.includes("headquarters");
          return [...c, on ? 235 : 55] as any;
        },
        getLineColor: (d: CommodityCountry) =>
          (d.roles.includes("headquarters")
            ? hexRgb(HQ_BOUNDARY)
            : selected === d.id
              ? hexRgb(netColors.hq)
              : [255, 255, 255]) as any,
        getLineWidth: (d: CommodityCountry) => (d.roles.includes("headquarters") || selected === d.id ? 2.5 : 1),
        lineWidthUnits: "pixels",
        stroked: true,
        pickable: true,
        updateTriggers: {
          getFillColor: [filter, selected],
          getRadius: [filter, selected],
          getLineColor: [selected],
          getLineWidth: [selected],
        },
      }),
    ],
    [filter, selected, isVrvGroup, selIso],
  );

  const listCountries = commodityCountries.filter((c) => inFilter(c));
  const selCountry = selected ? countryById[selected] : null;
  const panel = PANEL[filter];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* Map */}
      <div>
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line sm:aspect-[16/10]"
          // Let vertical touch-swipes scroll the page instead of panning the map.
          style={{ touchAction: "pan-y" }}
        >
          <DeckGL
            viewState={viewState as any}
            onViewStateChange={(e: any) => setViewState(e.viewState)}
            // scrollZoom disabled → normal page scroll is never trapped by the map.
            controller={{ scrollZoom: false, dragRotate: false, touchRotate: false }}
            layers={layers}
            getTooltip={({ object }: any) => {
              if (!object || !object.coordinates) return null;
              const { title, lines } = roleSummary(object as CommodityCountry);
              return { html: `<b>${title}</b>${lines.map((l) => `<div style="opacity:.7">${l}</div>`).join("")}` };
            }}
            onClick={(info: any) => {
              if (info.object && info.object.coordinates) focusCountry(info.object.id);
              else if (!info.object) setSelected(null);
            }}
          >
            <Map reuseMaps mapStyle={MAP_STYLE} attributionControl={false} />
          </DeckGL>

          {/* Zoom controls — explicit intent only (scroll never zooms) */}
          <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-line bg-white/90 shadow-soft backdrop-blur">
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => zoomBy(0.7)}
              className="flex h-9 w-9 items-center justify-center text-lg leading-none text-ink/70 transition-colors hover:bg-paper hover:text-brand"
            >
              +
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => zoomBy(-0.7)}
              className="flex h-9 w-9 items-center justify-center border-t border-line text-lg leading-none text-ink/70 transition-colors hover:bg-paper hover:text-brand"
            >
              −
            </button>
            <button
              type="button"
              aria-label="Reset map view"
              onClick={resetView}
              className="flex h-9 w-9 items-center justify-center border-t border-line text-ink/70 transition-colors hover:bg-paper hover:text-brand"
            >
              <Icon name="route" className="h-4 w-4" />
            </button>
          </div>

          {/* Legend */}
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-xl border border-line bg-white/90 px-3 py-2.5 shadow-soft backdrop-blur">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {LEGEND.map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-[11px] font-medium text-ink/70">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-ink/40">{MAP_DISCLAIMER}</p>
      </div>

      {/* Side panel */}
      <div className="flex flex-col">
        <MapFilters options={TABS} value={filter} onChange={(k) => { setFilter(k); setSelected(null); }} />

        {selCountry ? (
          <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
            <button onClick={resetView} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-600">
              <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> Back to {TABS.find((t) => t.key === filter)?.label}
            </button>
            <h3 className="mt-4 font-serif text-xl text-ink">{displayLabel(selCountry.id, selCountry.label)}</h3>
            <p className="text-sm text-ink/55">{selCountry.country}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selCountry.roles.map((r) => (
                <span key={r} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{ROLE_LABEL[r]}</span>
              ))}
            </div>
            <div className="mt-5 space-y-1.5 border-t border-line pt-5">
              {roleSummary(selCountry).lines.map((l) => (
                <p key={l} className="text-sm text-ink/70">{l}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
            <h3 className="font-serif text-xl text-ink">{panel.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{panel.blurb}</p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-label text-ink/55">
              Geographies ({listCountries.length}) — select for details
            </p>
            <div className="mt-3 max-h-[320px] overflow-y-auto pr-1 [scrollbar-width:thin]">
              <ul className="flex flex-wrap gap-1.5">
                {listCountries.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => focusCountry(c.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[12px] font-medium text-ink/75 transition-colors hover:border-brand/40 hover:text-brand"
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            isVrvGroup && VRV_GROUP_IDS.has(c.id) && !c.roles.includes("headquarters")
                              ? VRV_GROUP_COLOR
                              : `rgb(${colorFor(c).join(",")})`,
                        }}
                      />
                      {displayLabel(c.id, c.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
