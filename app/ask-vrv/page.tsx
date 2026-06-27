import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ask VRV",
  description:
    "Find the right product, venture, or partnership path. A guided way for customers, partners, investors and AI agents to reach the right part of VRV Global.",
  path: "/ask-vrv",
});

const OPTIONS: { label: string; desc: string; href: string; icon: IconName }[] = [
  { label: "I want to buy a commodity", desc: "Start a product enquiry with grades, volumes, ports and Incoterms.", href: "/contact?type=product", icon: "cube" },
  { label: "I want to enquire about natural rubber", desc: "Natural rubber cuplumps and block rubber / TSR.", href: "/products/natural-rubber", icon: "leaf" },
  { label: "I want to enquire about metals", desc: "Copper, aluminium, zinc, lead and manganese alloys.", href: "/products#industrial-metals", icon: "cube" },
  { label: "I want to discuss a mining or venture opportunity", desc: "Mining, processing, regional expansion and infrastructure ventures.", href: "/ventures", icon: "spark" },
  { label: "I want sustainability or traceability information", desc: "Responsible sourcing, traceability and ESG approach.", href: "/sustainability", icon: "recycle" },
  { label: "I want company information", desc: "About VRV Global, leadership and governance.", href: "/about", icon: "globe" },
  { label: "I want to contact the right team", desc: "Reach the right department directly.", href: "/contact", icon: "handshake" },
];

export default function AskVrvPage() {
  return (
    <>
      <PageHero
        eyebrow="Ask VRV"
        title="Find the right product, venture, or partnership path"
        intro="A guided way for customers, partners, investors — and AI agents — to reach the right part of VRV Global. Choose what you need and we'll point you to the right page or team."
        crumbs={[{ label: "Ask VRV" }]}
      />

      <Section tone="white">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {OPTIONS.map((o, i) => (
            <Link
              key={o.label}
              href={o.href}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ocean-50 text-ocean">
                <Icon name={o.icon} className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-serif text-[17px] leading-snug text-ink group-hover:text-brand">{o.label}</p>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink/60">{o.desc}</p>
              </div>
              <Icon name="arrowRight" className="mt-1 h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-ink/45">
          Prefer machine-readable routing? See{" "}
          <Link href="/contact-routing" className="font-semibold text-brand hover:text-brand-600">/contact-routing</Link> or{" "}
          <a href="/llms.txt" className="font-semibold text-brand hover:text-brand-600">/llms.txt</a>.
        </p>
      </Section>

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Ask VRV", path: "/ask-vrv" }])} />
    </>
  );
}
