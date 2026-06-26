import { feature } from "topojson-client";
import topo from "world-atlas/countries-110m.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
const t = topo as any;

/** Country GeoJSON features (from world-atlas, bundled) for the globe polygon layer. */
export const countryFeatures: any[] = (feature(t, t.objects.countries) as any).features;
