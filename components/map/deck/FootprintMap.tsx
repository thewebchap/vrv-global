"use client";

import { useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
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
import { Icon } from "@/components/ui/Icon";

/** The six footprint filters (subset of NetFilter, excluding the legacy "active"). */
type FilterKey = "all" | "agro" | "metals" | "sales" | "purchase" | "headquarters";

const TABS: FilterOption<FilterKey>[] = [
  { key: "all", label: "All" },
  { key: "agro", label: "Agro Commodities" },
  { key: "metals", label: "Metals" },
  { key: "sales", label: "Sales Geographies" },
  { key: "purchase", label: "Purchase Geographies" },
  { key: "headquarters", label: "Headquarters" },
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
    title: "Headquarters",
    blurb: "Singapore — strategic coordination, governance, investor relations and global trade management.",
  },
};

const LEGEND = [
  { label: "Headquarters", color: netColors.hq },
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

  const layers = useMemo(
    () => [
      new ScatterplotLayer({
        id: "markers",
        data: commodityCountries,
        getPosition: (d: CommodityCountry) => d.coordinates,
        getRadius: (d: CommodityCountry) => (d.roles.includes("headquarters") ? 7 : selected === d.id ? 6.5 : 4.5),
        radiusUnits: "pixels",
        getFillColor: (d: CommodityCountry) => {
          const c = colorFor(d);
          const on = isHighlighted(d, filter) || d.roles.includes("headquarters");
          return [...c, on ? 235 : 55] as any;
        },
        getLineColor: (d: CommodityCountry) => (selected === d.id ? hexRgb(netColors.hq) : [255, 255, 255]) as any,
        getLineWidth: (d: CommodityCountry) => (selected === d.id ? 2.5 : 1),
        lineWidthUnits: "pixels",
        stroked: true,
        pickable: true,
        updateTriggers: {
          getFillColor: [filter, selected],
          getRadius: [selected],
          getLineColor: [selected],
          getLineWidth: [selected],
        },
      }),
    ],
    [filter, selected],
  );

  const listCountries = commodityCountries.filter((c) => isHighlighted(c, filter));
  const selCountry = selected ? countryById[selected] : null;
  const panel = PANEL[filter];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* Map */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line sm:aspect-[16/10]">
          <DeckGL
            initialViewState={INITIAL_VIEW}
            controller={{ dragRotate: false, touchRotate: false }}
            layers={layers}
            getTooltip={({ object }: any) => {
              if (!object || !object.coordinates) return null;
              const { title, lines } = roleSummary(object as CommodityCountry);
              return { html: `<b>${title}</b>${lines.map((l) => `<div style="opacity:.7">${l}</div>`).join("")}` };
            }}
            onClick={(info: any) => {
              if (info.object && info.object.coordinates) setSelected((s) => (s === info.object.id ? null : info.object.id));
              else if (!info.object) setSelected(null);
            }}
          >
            <Map reuseMaps mapStyle={MAP_STYLE} attributionControl={false} />
          </DeckGL>

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
            <button onClick={() => setSelected(null)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-600">
              <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> Back to {TABS.find((t) => t.key === filter)?.label}
            </button>
            <h3 className="mt-4 font-serif text-xl text-ink">{selCountry.label}</h3>
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
                      onClick={() => setSelected(c.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[12px] font-medium text-ink/75 transition-colors hover:border-brand/40 hover:text-brand"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `rgb(${colorFor(c).join(",")})` }} />
                      {c.label}
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
