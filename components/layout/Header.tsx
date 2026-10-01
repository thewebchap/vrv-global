"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, type NavItem } from "@/lib/nav";
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

  const matchHref = (href: string) => {
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };
  // Active if the item's own route matches, or any of its dropdown children do
  // (keeps e.g. Media active on /blog and /case-studies, which live outside /news).
  const isActive = (item: NavItem) =>
    matchHref(item.href) || (item.children?.some((c) => matchHref(c.href)) ?? false);

  return (
    <>
      {/* Navigation safe-zone — a soft off-white fade behind the floating navbar
          so the imagery above/around it feels calmer and the pill reads as
          intentional. Fixed, non-interactive, layered BELOW the navbar (z-40),
          and feathered with a mask so the light blur fades out with no hard edge
          (never a rectangle or cloudy patch). */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[92px] sm:h-[118px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(248,246,240,0.82) 0%, rgba(248,246,240,0.60) 42%, rgba(248,246,240,0.22) 76%, rgba(248,246,240,0) 100%)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage: "linear-gradient(180deg, #000 0%, #000 58%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 58%, transparent 100%)",
        }}
      />
      {/* Sticky wrapper reserves the floating bar's space (no layout shift / overlap),
          with a small margin from the top + sides. The visible pill floats inside it. */}
      <header className="sticky top-0 z-[60] px-2.5 pt-2 sm:px-4 sm:pt-3">
      <div
        className={cn(
          "mx-auto flex h-[62px] max-w-[1180px] items-center justify-between gap-4 rounded-full border pl-5 pr-2.5 backdrop-blur-[14px] transition-[background-color,box-shadow,border-color] duration-200 ease-out",
          scrolled
            ? "border-[rgba(8,24,40,0.10)] bg-white/97 shadow-[0_12px_34px_rgba(8,24,40,0.12)]"
            : "border-[rgba(8,24,40,0.08)] bg-white/92 shadow-[0_12px_34px_rgba(8,24,40,0.10)]",
        )}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {mainNav.map((item) =>
            item.children ? (
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
                    isActive(item) ? "bg-brand-50 text-brand" : "text-ink/70 hover:bg-paper hover:text-brand",
                  )}
                >
                  {item.label}
                  <span aria-hidden className={cn("text-[9px] transition-transform", openKey === item.label && "rotate-180")}>▾</span>
                </Link>
                {openKey === item.label && <Dropdown item={item} />}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive(item) ? "bg-brand-50 text-brand" : "text-ink/70 hover:bg-paper hover:text-brand",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
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
                const children = item.children;
                return (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className={cn("block rounded-xl px-3 py-2.5 text-base font-medium", isActive(item) ? "bg-brand-50 text-brand" : "text-ink")}
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
              <div className="px-3 pt-3">
                <Button href="/contact" variant="primary" size="lg" className="w-full">Contact</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
      </header>
    </>
  );
}

function Dropdown({ item }: { item: NavItem }) {
  return (
    <div className="absolute left-0 top-full z-[80] w-[340px] max-w-[92vw] pt-3">
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
