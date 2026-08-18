"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, type NavItem } from "@/lib/nav";
import { productDetails, productDetailsBySegment } from "@/data/productDetails";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenKey(null);
  }, [pathname]);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  return (
    // Sticky wrapper reserves the floating bar's space (no layout shift / overlap),
    // with a small margin from the top + sides. The visible pill floats inside it.
    <header className="sticky top-0 z-50 px-2.5 pt-2.5 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-[62px] max-w-[1180px] items-center justify-between gap-4 rounded-full border pl-5 pr-2.5 backdrop-blur-[14px] transition-[background-color,box-shadow,border-color] duration-200 ease-out",
          scrolled
            ? "border-[rgba(15,45,65,0.10)] bg-white/95 shadow-[0_12px_30px_rgba(15,45,65,0.12)]"
            : "border-[rgba(15,45,65,0.08)] bg-white/85 shadow-[0_10px_28px_rgba(15,45,65,0.08)]",
        )}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {mainNav.map((item) =>
            item.children || item.mega ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenKey(item.label)}
                onMouseLeave={() => setOpenKey(null)}
                onFocus={() => setOpenKey(item.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenKey(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpenKey(null);
                }}
              >
                <Link
                  href={item.href}
                  aria-expanded={openKey === item.label}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                    isActive(item.href) ? "bg-brand-50 text-brand" : "text-ink/70 hover:bg-paper hover:text-brand",
                  )}
                >
                  {item.label}
                  <span aria-hidden className={cn("text-[9px] transition-transform", openKey === item.label && "rotate-180")}>▾</span>
                </Link>
                {openKey === item.label &&
                  (item.mega === "products" ? <ProductsMega /> : <Dropdown item={item} />)}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive(item.href) ? "bg-brand-50 text-brand" : "text-ink/70 hover:bg-paper hover:text-brand",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Button href="/ventures" variant="outline" size="md">Ventures</Button>
          <Button href="/contact" variant="primary" size="md">Contact Us</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink xl:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span className={cn("absolute left-0 top-0 h-0.5 w-6 bg-current transition-all", mobileOpen && "top-1.5 rotate-45")} />
            <span className={cn("absolute left-0 top-1.5 h-0.5 w-6 bg-current transition-all", mobileOpen && "opacity-0")} />
            <span className={cn("absolute left-0 top-3 h-0.5 w-6 bg-current transition-all", mobileOpen && "top-1.5 -rotate-45")} />
          </span>
        </button>
      </div>

      {/* Mobile menu — rounded panel below the floating bar */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-[1180px] xl:hidden">
          <div className="overflow-hidden rounded-3xl border border-[rgba(15,45,65,0.08)] bg-white/95 shadow-[0_12px_30px_rgba(15,45,65,0.12)] backdrop-blur-[14px]">
            <nav className="max-h-[calc(100vh-96px)] space-y-1 overflow-y-auto p-4" aria-label="Mobile">
              {mainNav.map((item) => {
                const children = item.mega === "products"
                  ? productDetails.map((p) => ({ label: p.title, href: `/products/${p.slug}` }))
                  : item.children;
                return (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className={cn("block rounded-xl px-3 py-2.5 text-base font-medium", isActive(item.href) ? "bg-brand-50 text-brand" : "text-ink")}
                    >
                      {item.label}
                    </Link>
                    {children && (
                      <div className="ml-3 border-l border-line pl-3">
                        {children.map((c) => (
                          <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-ink/65 hover:text-brand">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="grid grid-cols-2 gap-3 px-3 pt-3">
                <Button href="/ventures" variant="outline" size="lg" className="w-full">Ventures</Button>
                <Button href="/contact" variant="primary" size="lg" className="w-full">Contact</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({ item }: { item: NavItem }) {
  return (
    <div className="absolute left-0 top-full z-50 w-[340px] max-w-[92vw] pt-3">
      <div className="origin-top animate-[dropdown-in_180ms_ease_both] rounded-[20px] border border-[rgba(15,45,65,0.08)] bg-white/95 p-3 shadow-[0_18px_45px_rgba(15,45,65,0.12)] backdrop-blur-[12px]">
        <div className="flex flex-col gap-0.5">
          {item.children!.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group/item flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-150 ease-out hover:-translate-y-px hover:border-[rgba(32,120,87,0.14)] hover:bg-[rgba(32,120,87,0.06)]"
            >
              <span aria-hidden className="mt-0.5 h-9 w-1 shrink-0 rounded-full bg-line transition-colors duration-150 group-hover/item:bg-brand" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink transition-colors group-hover/item:text-brand">{c.label}</span>
                {c.desc && <span className="mt-0.5 block text-xs leading-snug text-ink/55">{c.desc}</span>}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const segmentAnchor: Record<string, string> = {
  "Agro Commodities": "agro-commodities",
  "Industrial Metals": "industrial-metals",
  Mining: "mining",
};

const segmentDesc: Record<string, string> = {
  "Agro Commodities": "Natural rubber and agro-origin supply chains.",
  "Industrial Metals": "Refined, recycled and alloy metals for industry.",
  Mining: "Copper and precious metals mining-linked opportunities.",
};

function ProductsMega() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(920px,94vw)] -translate-x-1/2 pt-3">
      <div className="grid grid-cols-1 gap-3 rounded-[20px] border border-[rgba(15,45,65,0.08)] bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,45,65,0.12)] backdrop-blur-[12px] md:grid-cols-3 origin-top animate-[dropdown-in_180ms_ease_both]">
        {productDetailsBySegment.map(({ segment, items }) => (
          <div key={segment} className="rounded-2xl border border-transparent p-3 transition-colors hover:border-line">
            <Link href={`/products#${segmentAnchor[segment]}`} className="block">
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-brand">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                {segment}
              </span>
              {segmentDesc[segment] && (
                <span className="mt-1.5 block text-xs leading-snug text-ink/55">{segmentDesc[segment]}</span>
              )}
            </Link>
            <div className="mt-3 space-y-0.5">
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group/item flex items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 transition-all duration-150 ease-out hover:border-[rgba(32,120,87,0.14)] hover:bg-[rgba(32,120,87,0.06)]"
                >
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-line transition-colors duration-150 group-hover/item:bg-brand" />
                  <span className="text-[13px] font-medium text-ink transition-colors group-hover/item:text-brand">{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
