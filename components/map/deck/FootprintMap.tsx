"use client";

import { useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ArcLayer, ScatterplotLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  commodityCountries,
  temporaryCommodityRoutes,
  countryById,
  routesForCountry,
  relatedCountryIds,
  roleSummary,
  ROLE_LABEL,
  netColors,
  isMultiRole,
  MAP_DISCLAIMER,
  type CommodityCountry,
} from "@/data/commodityNetwork";
import { useRouteCycle } from "../useRouteCycle";
import { MapFilters, type FilterOption } from "../MapFilters";
import { Icon } from "@/components/ui/Icon";

type Tab = "agro" | "metals" | "all";
const TABS: FilterOption<Tab>[] = [
  { key: "agro", label: "Agro Commodities" },
  { key: "metals", label: "Metals" },
  { key: "all", label: "Combined Network" },
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

/** Analytical commodities footprint: deck.gl ArcLayer over MapLibre + side panel. */
export function FootprintMap() {
  const [tab, setTab] = useState<Tab>("agro");
  const [selected, setSelected] = useState<string | null>(null);

  const pool = useMemo(
    () => (selected ? routesForCountry(selected) : tab === "all" ? temporaryCommodityRoutes : temporaryCommodityRoutes.filter((r) => r.segment === tab)),
    [tab, selected],
  );
  const { active } = useRouteCycle(pool, selected ? 99 : 4);
  const relatedIds = selected ? relatedCountryIds(selected) : null;

  const highlighted = (c: CommodityCountry) =>
    relatedIds ? relatedIds.has(c.id) : tab === "all" ? true : c.segments.includes(tab);

  const layers = useMemo(() => {
    const arcs = active
      .map((r) => {
        const a = countryById[r.from];
        const b = countryById[r.to];
        const col = hexRgb(r.segment === "agro" ? netColors.agro : netColors.metals);
        return { from: r.from, to: r.to, source: a.coordinates, target: b.coordinates, color: col, route: r };
      });

    return [
      new ArcLayer({
        id: "routes",
        data: arcs,
        greatCircle: true,
        getSourcePosition: (d: any) => d.source,
        getTargetPosition: (d: any) => d.target,
        getSourceColor: (d: any) => [...d.color, 230] as any,
        getTargetColor: (d: any) => [...d.color, 230] as any,
        getWidth: 1.6,
        getHeight: 0.5,
        pickable: true,
      }),
      new ScatterplotLayer({
        id: "markers",
        data: commodityCountries,
        getPosition: (d: CommodityCountry) => d.coordinates,
        getRadius: (d: CommodityCountry) => (d.roles.includes("headquarters") ? 7 : selected === d.id ? 6.5 : 4.5),
        radiusUnits: "pixels",
        getFillColor: (d: CommodityCountry) => {
          const c = colorFor(d);
          const on = highlighted(d) || d.roles.includes("headquarters");
          return [...c, on ? 235 : 60] as any;
        },
        getLineColor: (d: CommodityCountry) => (selected === d.id ? hexRgb(netColors.hq) : [255, 255, 255]) as any,
        getLineWidth: (d: CommodityCountry) => (selected === d.id ? 2.5 : 1),
        lineWidthUnits: "pixels",
        stroked: true,
        pickable: true,
        updateTriggers: {
          getFillColor: [tab, selected, relatedIds],
          getRadius: [selected],
          getLineColor: [selected],
          getLineWidth: [selected],
        },
      }),
    ];
  }, [active, tab, selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const listCountries = tab === "all" ? commodityCountries : commodityCountries.filter((c) => c.segments.includes(tab));
  const selCountry = selected ? countryById[selected] : null;

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
              if (!object) return null;
              if (object.c || object.coordinates) {
                const c: CommodityCountry = object.coordinates ? object : object.c;
                const { title, lines } = roleSummary(c);
                return { html: `<b>${title}</b>${lines.map((l) => `<div style="opacity:.7">${l}</div>`).join("")}` };
              }
              if (object.route) return { html: `<b>${object.route.label}</b>` };
              return null;
            }}
            onClick={(info: any) => {
              if (info.object && info.object.coordinates) setSelected((s) => (s === info.object.id ? null : info.object.id));
              else if (!info.object) setSelected(null);
            }}
          >
            <Map reuseMaps mapStyle={MAP_STYLE} attributionControl={false} />
          </DeckGL>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-ink/40">{MAP_DISCLAIMER}</p>
      </div>

      {/* Side panel */}
      <div className="flex flex-col">
        <MapFilters options={TABS} value={tab} onChange={(k) => { setTab(k); setSelected(null); }} />

        {selCountry ? (
          <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
            <button onClick={() => setSelected(null)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-600">
              <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> Back to {TABS.find((t) => t.key === tab)?.label}
            </button>
            <h3 className="mt-4 font-serif text-xl text-ink">{selCountry.label}</h3>
            <p className="text-sm text-ink/55">{selCountry.country}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selCountry.roles.map((r) => (
                <span key={r} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{ROLE_LABEL[r]}</span>
              ))}
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-label text-ink/55">Related corridors</p>
            <ul className="mt-3 space-y-2">
              {routesForCountry(selCountry.id).map((r) => (
                <li key={r.id} className="flex items-center gap-2 text-sm text-ink/70">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: r.segment === "agro" ? netColors.agro : netColors.metals }} />
                  {countryById[r.from].label} → {countryById[r.to].label}
                </li>
              ))}
              {routesForCountry(selCountry.id).length === 0 && (
                <li className="text-sm text-ink/50">No illustrative corridors for this geography yet.</li>
              )}
            </ul>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
            <h3 className="font-serif text-xl text-ink">
              {tab === "agro" ? "Agro commodity network" : tab === "metals" ? "Metals network" : "Combined network"}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
              {tab === "agro"
                ? "Sourcing across West Africa, Southeast Asia and Brazil; sales across Asia, Europe, the Middle East and North America."
                : tab === "metals"
                  ? "Sourcing across Australia, Southeast Asia and Africa; sales across East Asia, India, Europe and North America."
                  : "Every agro and metals geography, with Singapore as the coordination headquarters."}
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-label text-ink/55">
              Geographies ({listCountries.length}) — click to see related routes
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
