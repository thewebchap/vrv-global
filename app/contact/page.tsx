import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Contact VRV Global — a sustainability-led global supply chain integrator. Reach our teams for product inquiries, investor relations, sustainability, careers and media from our Singapore headquarters.",
  path: "/contact",
});

const shortcuts: { title: string; body: string; href: string }[] = [
  { title: "Investor Relations", body: "Request investor materials, governance and ESG documents.", href: "/investors#request" },
  { title: "Product Inquiry", body: "Specifications, availability and trade enquiries.", href: "#contact-form" },
  { title: "Sustainability / ESG", body: "Responsible sourcing, traceability and ESG topics.", href: "/sustainability" },
  { title: "Careers", body: "Open roles and speculative applications.", href: "/careers" },
];

const departments: { title: string; body: string; icon: IconName }[] = [
  { title: "Product Inquiry", body: "Specifications, grades, availability, pricing and trade enquiries across agro, metals and circular products.", icon: "cube" },
  { title: "Investor Relations", body: "Company profile, financials, ESG reports, investor presentation, governance and capital-markets roadmap.", icon: "chart" },
  { title: "Sustainability / ESG", body: "Responsible sourcing, material traceability, supplier compliance and ESG-aligned practices.", icon: "leaf" },
  { title: "Careers", body: "Job opportunities, speculative applications and questions for our people team.", icon: "users" },
  { title: "Media", body: "Press, interviews, media kits and communications requests.", icon: "doc" },
  { title: "General", body: "Anything else — we'll route your message to the right team.", icon: "handshake" },
];

const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: `${site.url}/contact`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: site.phone,
      email: site.email,
      areaServed: "Global",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "Investor Relations",
      email: site.investorEmail,
      areaServed: "Global",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
      />

      <PageHero
        eyebrow="Contact"
        title="Talk to VRV Global"
        intro="Reach the right team directly — for product inquiries, investor relations, sustainability and ESG, careers and media. We respond from our Singapore headquarters."
        crumbs={[{ label: "Contact" }]}
      />

      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left — contact details, shortcuts, map placeholder */}
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Get in touch" title="Singapore headquarters" />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">
              Headquartered in Singapore, VRV Global connects regional sourcing networks with global buyers through
              responsible trade, sustainable supply chain practices and market-aware commodity intelligence.
            </p>

            <address className="mt-8 space-y-5 not-italic">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name="globe" className="h-5 w-5" />
                </span>
                <div className="text-[15px] leading-relaxed text-ink/75">
                  <p className="font-semibold text-ink">{site.legalName}</p>
                  <p>{site.address.line1}</p>
                  <p>{site.address.line2}</p>
                  <p>
                    {site.address.city} {site.address.postal}
                  </p>
                  <p>{site.address.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name="route" className="h-5 w-5" />
                </span>
                <div className="text-[15px] text-ink/75">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">Phone</p>
                  <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="text-brand hover:text-brand-600">
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name="link" className="h-5 w-5" />
                </span>
                <div className="text-[15px] text-ink/75">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">General enquiries</p>
                  <a href={`mailto:${site.email}`} className="text-brand hover:text-brand-600">
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name="chart" className="h-5 w-5" />
                </span>
                <div className="text-[15px] text-ink/75">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">Investor relations</p>
                  <a href={`mailto:${site.investorEmail}`} className="text-brand hover:text-brand-600">
                    {site.investorEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name="users" className="h-5 w-5" />
                </span>
                <div className="text-[15px] text-ink/75">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">LinkedIn</p>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-brand hover:text-brand-600">
                    VRV Global on LinkedIn
                  </a>
                </div>
              </div>
            </address>

            {/* Shortcut cards */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {shortcuts.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  className="group flex flex-col rounded-xl border border-line bg-paper p-5 transition-colors hover:border-brand/40"
                >
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    {s.title}
                    <Icon name="arrowRight" className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1.5 text-sm leading-snug text-ink/60">{s.body}</span>
                </a>
              ))}
            </div>

            {/* Map embed placeholder */}
            <div className="mt-10">
              <div
                role="img"
                aria-label="Map placeholder for VRV Global's Singapore office"
                className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-dashed border-ink/25 bg-sand-100 p-6 text-center"
              >
                <span className="text-sm leading-relaxed text-ink/50">
                  [Map embed placeholder — insert Google Maps iframe for 138 Cecil Street, Singapore]
                </span>
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <div id="contact-form" className="scroll-mt-24 lg:col-span-7">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
              <SectionHeading
                eyebrow="Send a message"
                title="How can we help?"
                intro="Choose a department so your message reaches the right team. Required fields are marked with an asterisk."
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Department routing descriptions */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Where your message goes"
          title="Department routing"
          intro="Select the department that best fits your enquiry so we can respond quickly and accurately."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 0.06}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={d.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-medium text-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{d.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/investors#request" variant="link" withArrow>
            Investor information request
          </Button>
        </div>
      </Section>
    </>
  );
}
