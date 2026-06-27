import Link from "next/link";
import { footerNav, legalNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo tone="light" priority={false} className="h-10" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">{site.description}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
            Headquartered in Singapore, VRV Global connects regional sourcing networks with global buyers through
            responsible trade and sustainable supply chain practices.
          </p>
          <address className="mt-6 space-y-1 text-sm not-italic text-white/60">
            <p className="font-semibold text-white/85">{site.legalName}</p>
            <p>{site.address.line1}, {site.address.line2}</p>
            <p>{site.address.city} {site.address.postal}</p>
            <p className="pt-1">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold">{site.phone}</a>
              <span className="text-white/30"> · </span>
              <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            </p>
          </address>
          <div className="mt-6 flex items-center gap-3">
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

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-label text-white/40">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/65 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-medium text-white">VRV Insights</h3>
            <p className="mt-1 text-sm text-white/50">Sustainable supply-chain intelligence, commodity trends and ESG updates.</p>
          </div>
          <NewsletterForm />
        </Container>
      </div>

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
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-gold">LinkedIn</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
