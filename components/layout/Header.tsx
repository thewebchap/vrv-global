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
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-colors duration-300 supports-[backdrop-filter]:bg-white/80",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <div className="container-x flex h-[70px] items-center justify-between gap-4">
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
              >
                <Link
                  href={item.href}
                  aria-expanded={openKey === item.label}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                    isActive(item.href) ? "text-brand" : "text-ink/70 hover:text-brand",
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
                  "rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                  isActive(item.href) ? "text-brand" : "text-ink/70 hover:text-brand",
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink xl:hidden"
          aria-label="Toggle menu"
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

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-line bg-white xl:hidden">
          <nav className="container-x max-h-[calc(100vh-70px)] space-y-1 overflow-y-auto py-4" aria-label="Mobile">
            {mainNav.map((item) => {
              const children = item.mega === "products"
                ? productDetails.map((p) => ({ label: p.title, href: `/products/${p.slug}` }))
                : item.children;
              return (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={cn("block rounded-md px-3 py-2.5 text-base font-medium", isActive(item.href) ? "bg-paper text-brand" : "text-ink")}
                  >
                    {item.label}
                  </Link>
                  {children && (
                    <div className="ml-3 border-l border-line pl-3">
                      {children.map((c) => (
                        <Link key={c.href} href={c.href} className="block rounded-md px-3 py-2 text-sm text-ink/65 hover:text-brand">
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
      )}
    </header>
  );
}

function Dropdown({ item }: { item: NavItem }) {
  return (
    <div className="absolute left-0 top-full z-50 w-[300px] pt-3">
      <div className="rounded-xl border border-line bg-white p-2 shadow-hover">
        {item.children!.map((c) => (
          <Link key={c.href} href={c.href} className="group/item block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper">
            <span className="block text-sm font-medium text-ink group-hover/item:text-brand">{c.label}</span>
            {c.desc && <span className="mt-0.5 block text-xs text-ink/50">{c.desc}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

const segmentAnchor: Record<string, string> = {
  "Agro Commodities": "agro-commodities",
  "Industrial Metals": "industrial-metals",
  Mining: "mining",
};

function ProductsMega() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(960px,94vw)] -translate-x-1/2 pt-3">
      <div className="grid grid-cols-1 gap-2 rounded-xl border border-line bg-white p-4 shadow-hover md:grid-cols-3">
        {productDetailsBySegment.map(({ segment, items }) => (
          <div key={segment} className="rounded-lg p-3">
            <Link href={`/products#${segmentAnchor[segment]}`} className="eyebrow no-flourish !text-brand hover:opacity-80">
              {segment}
            </Link>
            <div className="mt-3 space-y-0.5">
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group/item block rounded-md px-2.5 py-2 transition-colors hover:bg-paper"
                >
                  <span className="block text-[13px] font-medium text-ink group-hover/item:text-brand">{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
