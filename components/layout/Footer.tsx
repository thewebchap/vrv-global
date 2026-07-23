import Link from "next/link";
import { legalNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

/** Simple, premium footer — essential navigation only (no menu-heavy columns). */
const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Ventures", href: "/ventures" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Media", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <Container className="flex flex-col gap-10 py-14 lg:flex-row lg:items-center lg:justify-between">
        {/* Brand + one short company line */}
        <div className="max-w-md">
          <Logo tone="light" priority={false} className="h-10" />
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            Singapore-based sustainable supply-chain integrator for agro commodities, natural rubber, industrial metals
            and minerals.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a href={`mailto:${site.email}`} className="text-sm font-medium text-white/70 transition-colors hover:text-gold">
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="VRV Global on LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              in
            </a>
          </div>
        </div>

        {/* Essential navigation */}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-white/70 transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>

      {/* Fine print — copyright + legal links */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold">{l.label}</Link>
            ))}
            {/* Machine-readable AI guide (static file → plain anchor). */}
            <a href="/llms.txt" className="hover:text-gold">llms.txt</a>
            {/* Internal review tool — discreet link, intentionally not in main nav. */}
            <Link href="/design-feedback" className="hover:text-gold">Design Feedback</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
