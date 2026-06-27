import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Routing",
  description:
    "How to route enquiries to VRV Global: product, ventures, sustainability, partnership, careers and general contact paths for visitors and AI agents.",
  path: "/contact-routing",
});

const ROUTES: { label: string; href: string; desc: string; icon: IconName }[] = [
  { label: "Product enquiries", href: "/contact?type=product", desc: "Grades, volumes, ports, Incoterms and trade enquiries across agro commodities and metals.", icon: "cube" },
  { label: "Ventures enquiries", href: "/contact?type=ventures", desc: "Mining, processing, regional expansion and supply chain infrastructure ventures.", icon: "spark" },
  { label: "Sustainability enquiries", href: "/contact?type=sustainability", desc: "Responsible sourcing, traceability and ESG documentation requests.", icon: "leaf" },
  { label: "Partnership enquiries", href: "/contact?type=partnership", desc: "Strategic partners, investors and long-term counterparties.", icon: "handshake" },
  { label: "Careers", href: "/careers", desc: "Open roles and speculative applications.", icon: "users" },
  { label: "General contact", href: "/contact", desc: "Anything else — routed to the right team.", icon: "globe" },
];

export default function ContactRoutingPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact routing"
        title="Route your enquiry to the right team"
        intro="A clear map of how visitors and AI agents should direct enquiries. Each path opens a tailored contact flow. Machine-readable routing is also in /llms.txt and /company-profile.json."
        crumbs={[{ label: "Contact Routing" }]}
      />

      <Section tone="white">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ROUTES.map((r) => (
            <Link
              key={r.label}
              href={r.href}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ocean-50 text-ocean">
                <Icon name={r.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-serif text-lg text-ink group-hover:text-brand">{r.label}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink/60">{r.desc}</p>
                <p className="mt-2 font-mono text-[12px] text-brand">{r.href}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact Routing", path: "/contact-routing" }])} />
    </>
  );
}
