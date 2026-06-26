"use client";

import { useCallback, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

/**
 * Lightweight admin console for the LinkedIn approval workflow and commodity
 * price management. Auth is the shared CRON_SECRET, entered once and sent as
 * `x-admin-secret`. This is a pragmatic console — put it behind SSO / proper
 * auth (and IP allow-listing) before production. It is noindex (see layout).
 */
type NewsPost = {
  id: string; source: string; status: string; title: string; excerpt: string;
  url: string; publishedDate: string; category: string;
};
type Price = {
  symbol: string; name: string; category: string; price: number | null; currency: string;
  unit: string; dataDelay: string; visible: boolean; manualOverride: boolean;
};

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"news" | "market">("news");
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const headers = useCallback(
    () => ({ "content-type": "application/json", "x-admin-secret": secret }),
    [secret],
  );

  const loadNews = useCallback(async () => {
    const res = await fetch("/api/admin/news", { headers: headers(), cache: "no-store" });
    if (res.ok) { const d = await res.json(); setPosts(d.posts); setAuthed(true); return true; }
    setMsg(res.status === 401 ? "Unauthorized — check the secret." : "Failed to load."); return false;
  }, [headers]);

  const loadMarket = useCallback(async () => {
    const res = await fetch("/api/admin/market", { headers: headers(), cache: "no-store" });
    if (res.ok) { const d = await res.json(); setPrices(d.prices); }
  }, [headers]);

  const signIn = async () => { setMsg(null); if (await loadNews()) loadMarket(); };

  const setStatus = async (id: string, status: string) => {
    await fetch("/api/admin/news", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, status }) });
    loadNews();
  };
  const addManual = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = Object.fromEntries(f.entries());
    const res = await fetch("/api/admin/news", { method: "POST", headers: headers(), body: JSON.stringify(body) });
    setMsg(res.ok ? "Post added as draft." : "Add failed — url and title required.");
    e.currentTarget.reset(); loadNews();
  };
  const sync = async (which: "linkedin" | "market") => {
    setMsg(`Syncing ${which}…`);
    const url = which === "linkedin" ? "/api/integrations/linkedin/sync" : "/api/market-prices/sync";
    const res = await fetch(url, { method: "POST", headers: { authorization: `Bearer ${secret}` } });
    const d = await res.json().catch(() => ({}));
    setMsg(res.ok ? `Sync ok: ${JSON.stringify(d)}` : "Sync failed.");
    which === "linkedin" ? loadNews() : loadMarket();
  };
  const patchPrice = async (symbol: string, changes: Record<string, unknown>) => {
    await fetch("/api/admin/market", { method: "PATCH", headers: headers(), body: JSON.stringify({ symbol, changes }) });
    loadMarket();
  };

  if (!authed) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-md rounded-2xl border border-line bg-white p-8 shadow-soft">
          <h1 className="font-serif text-2xl text-ink">Integrations Admin</h1>
          <p className="mt-2 text-sm text-ink/60">Enter the admin secret (CRON_SECRET) to manage LinkedIn posts and commodity prices.</p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
            placeholder="Admin secret"
            className="mt-5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button onClick={signIn} className="mt-4 w-full rounded-full bg-flame px-6 py-3 text-sm font-semibold text-white hover:bg-flame-600">
            Sign in
          </button>
          {msg && <p className="mt-3 text-sm text-flame-600" role="alert">{msg}</p>}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-2xl text-ink">Integrations Admin</h1>
        <div className="flex gap-2">
          <button onClick={() => sync("linkedin")} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand">Sync LinkedIn</button>
          <button onClick={() => sync("market")} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand">Sync Prices</button>
        </div>
      </div>
      {msg && <p className="mt-3 rounded-lg bg-white px-4 py-2 text-sm text-ink/70 shadow-soft">{msg}</p>}

      <div className="mt-6 flex gap-2">
        {(["news", "market"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-4 py-2 text-sm font-semibold", tab === t ? "bg-brand text-white" : "bg-white text-ink/70 border border-line")}>
            {t === "news" ? "LinkedIn / News" : "Commodity Prices"}
          </button>
        ))}
      </div>

      {tab === "news" ? (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="rounded-xl border border-line bg-white p-4 shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", p.status === "published" ? "bg-brand-50 text-brand-700" : p.status === "rejected" ? "bg-flame/10 text-flame-600" : "bg-gold/15 text-gold-700")}>{p.status}</span>
                  <span className="text-[11px] uppercase tracking-label text-ink/40">{p.source} · {p.category}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-ink/55">{p.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => setStatus(p.id, "published")} className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">Publish</button>
                  <button onClick={() => setStatus(p.id, "draft")} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink/70">Draft</button>
                  <button onClick={() => setStatus(p.id, "rejected")} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-flame-600">Reject</button>
                  <a href={p.url} target="_blank" rel="noreferrer" className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ocean">Open</a>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={addManual} className="h-fit space-y-3 rounded-xl border border-line bg-white p-4 shadow-soft">
            <h3 className="text-sm font-semibold text-ink">Add LinkedIn post manually</h3>
            <p className="text-xs text-ink/55">Fallback when API access is unavailable. Saved as draft.</p>
            <input name="url" required placeholder="LinkedIn post URL" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
            <input name="title" required placeholder="Title / headline" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
            <textarea name="excerpt" placeholder="Excerpt" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
            <input name="category" placeholder="Category (e.g. Sustainability)" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
            <input name="image" placeholder="Image URL (optional)" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
            <button className="w-full rounded-full bg-flame px-4 py-2 text-sm font-semibold text-white hover:bg-flame-600">Add as draft</button>
          </form>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-[11px] uppercase tracking-label text-ink/45">
              <tr>{["Commodity", "Price", "Delay", "Visible", "Actions"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {prices.map((p) => (
                <tr key={p.symbol} className="border-b border-line/60">
                  <td className="px-4 py-3"><span className="font-semibold text-ink">{p.name}</span><span className="ml-2 text-xs text-ink/40">{p.symbol}</span></td>
                  <td className="px-4 py-3">{p.price === null ? "—" : `${p.price} ${p.currency}/${p.unit}`}{p.manualOverride && <span className="ml-1 text-[10px] text-gold-700">(manual)</span>}</td>
                  <td className="px-4 py-3">
                    <select defaultValue={p.dataDelay} onChange={(e) => patchPrice(p.symbol, { dataDelay: e.target.value })} className="rounded border border-ink/15 px-2 py-1 text-xs">
                      {["live", "delayed", "indicative", "manual"].map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => patchPrice(p.symbol, { visible: !p.visible })} className={cn("rounded-full px-3 py-1 text-xs font-semibold", p.visible ? "bg-brand-50 text-brand-700" : "bg-sand-200 text-ink/50")}>{p.visible ? "Shown" : "Hidden"}</button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => { const v = prompt(`New price for ${p.name} (${p.currency}/${p.unit}):`, String(p.price ?? "")); if (v !== null) patchPrice(p.symbol, { price: Number(v), manualOverride: true, dataDelay: "manual" }); }} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink/70">Set price</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
