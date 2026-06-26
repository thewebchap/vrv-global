"use client";

import { useEffect, useState } from "react";
import { Sparkline } from "./Sparkline";
import { MarketDisclaimer } from "./MarketDisclaimer";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Price = {
  id: string;
  name: string;
  symbol: string;
  category: "agro" | "metals" | "circular";
  source: string;
  exchange: string;
  price: number | null;
  currency: string;
  unit: string;
  change: number | null;
  changePercent: number | null;
  timestamp: string;
  dataDelay: "live" | "delayed" | "indicative" | "manual";
  sourceUrl: string;
  licenseNote: string;
  trend: number[];
};

type ApiResponse = { ok: boolean; provider: string; lastUpdated: string; disclaimer: string; prices: Price[] };

const CATEGORY_LABEL: Record<string, string> = { agro: "Agro / Rubber", metals: "Metals", circular: "Circular" };
const DELAY_STYLE: Record<string, string> = {
  live: "bg-brand-50 text-brand-700",
  delayed: "bg-ocean-50 text-ocean-700",
  indicative: "bg-gold/15 text-gold-700",
  manual: "bg-sand-200 text-ink/60",
};

/**
 * Live "Market Snapshot" — fetches the backend `/api/market-prices` feed
 * (provider keys stay server-side), auto-refreshes, and degrades gracefully.
 * Optional `category` filter and `limit` for compact placements.
 */
export function MarketSnapshot({
  category,
  limit,
  showDisclaimer = true,
  refreshMs = 300_000,
  className,
}: {
  category?: "agro" | "metals" | "circular";
  limit?: number;
  showDisclaimer?: boolean;
  refreshMs?: number;
  className?: string;
}) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/market-prices", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as ApiResponse;
        if (active) {
          setData(json);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus((s) => (s === "ready" ? "ready" : "error"));
      }
    };
    load();
    const t = setInterval(load, refreshMs);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, [refreshMs]);

  let prices = data?.prices ?? [];
  if (category) prices = prices.filter((p) => p.category === category);
  if (limit) prices = prices.slice(0, limit);

  if (status === "loading") {
    return (
      <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl border border-line bg-paper" />
        ))}
      </div>
    );
  }

  if (status === "error" && prices.length === 0) {
    return (
      <div className={cn("rounded-2xl border border-line bg-paper p-8 text-center", className)}>
        <p className="text-sm font-semibold text-ink">Market data is temporarily unavailable</p>
        <p className="mt-1 text-sm text-ink/55">
          Please check the relevant exchange for official prices. Our team is notified automatically.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prices.map((p) => {
          const up = (p.changePercent ?? 0) >= 0;
          const hasPrice = p.price !== null;
          const external = p.sourceUrl.startsWith("http");
          return (
            <div key={p.id} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-label text-brand">{CATEGORY_LABEL[p.category]}</p>
                  <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">{p.name}</h3>
                  <p className="mt-0.5 text-xs text-ink/50">{p.source}</p>
                </div>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", DELAY_STYLE[p.dataDelay])}>
                  {p.dataDelay}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  {hasPrice ? (
                    <p className="font-serif text-2xl leading-none text-ink">
                      {p.currency === "USD" ? "$" : ""}
                      {p.price!.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span className="ml-1 text-xs font-sans font-medium text-ink/50">
                        {p.currency}/{p.unit}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-ink/45">No live benchmark</p>
                  )}
                  {hasPrice && p.changePercent !== null && (
                    <p className={cn("mt-1 inline-flex items-center gap-1 text-xs font-semibold", up ? "text-brand" : "text-flame-600")}>
                      <span aria-hidden>{up ? "▲" : "▼"}</span>
                      {p.change !== null && (
                        <>
                          {up ? "+" : ""}
                          {p.change.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </>
                      )}
                      <span className="text-ink/40">
                        ({up ? "+" : ""}
                        {p.changePercent.toFixed(2)}%)
                      </span>
                    </p>
                  )}
                </div>
                <Sparkline data={p.trend} up={up} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink/45">
                <span>{p.exchange}</span>
                <a
                  href={p.sourceUrl}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-600"
                >
                  Source
                  <Icon name="arrowRight" className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {showDisclaimer && (
        <div className="mt-5">
          <MarketDisclaimer
            lastUpdated={data?.lastUpdated ? new Date(data.lastUpdated).toUTCString() : undefined}
            provider={data?.provider}
          />
        </div>
      )}
    </div>
  );
}
