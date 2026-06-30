import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/forms/ContactForm";
import { GovernanceEnquiryForm } from "@/components/forms/GovernanceEnquiryForm";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { quickAnswers } from "@/data/aeo";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Contact VRV Global — a sustainability-led global supply chain integrator. Reach our teams for product inquiries, investor relations, sustainability, careers and media from our Singapore headquarters.",
  path: "/contact",
});

const shortcuts: { title: string; body: string; href: string }[] = [
  { title: "Ventures & Partnerships", body: "Explore strategic ventures, partnerships and investor opportunities.", href: "/ventures#enquiry" },
  { title: "Product Inquiry", body: "Specifications, availability and trade enquiries.", href: "#contact-form" },
  { title: "Sustainability / ESG", body: "Responsible sourcing, traceability and ESG topics.", href: "/sustainability" },
  { title: "Careers", body: "Open roles and speculative applications.", href: "/careers" },
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
      contactType: "Ventures & Partnerships",
      email: site.investorEmail,
      areaServed: "Global",
    },
  ],
};

/** Tailors the contact form heading + default department by ?type=. */
const INTENTS: Record<string, { department: string; title: string; intro: string }> = {
  product: {
    department: "Product Inquiry",
    title: "Product enquiry",
    intro: "Share your product, grade, volume, destination port, Incoterm and timeline. Our trade desk will respond with availability and terms.",
  },
  ventures: {
    department: "Ventures & Partnerships",
    title: "Ventures enquiry",
    intro: "Tell us about the venture, geography and partnership interest. Our ventures team will follow up.",
  },
  partnership: {
    department: "Ventures & Partnerships",
    title: "Partnership enquiry",
    intro: "Strategic partners, investors and long-term counterparties — tell us how you'd like to work with VRV Global.",
  },
  sustainability: {
    department: "Sustainability / ESG",
    title: "Sustainability enquiry",
    intro: "Responsible sourcing, traceability and ESG documentation requests. Tell us what you need and the relevant product area.",
  },
  governance: {
    department: "",
    title: "Governance & compliance enquiry",
    intro: "Raise a concern related to sourcing practices, supplier conduct, compliance, documentation or ethical business conduct. Handled responsibly and with confidentiality where possible.",
  },
  general: {
    department: "",
    title: "How can we help?",
    intro: "Choose a department so your message reaches the right team. Required fields are marked with an asterisk.",
  },
};

export default function ContactPage({ searchParams }: { searchParams?: { type?: string } }) {
  const intent = INTENTS[searchParams?.type ?? "general"] ?? INTENTS.general;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
      />

      <PageHero
        eyebrow="Contact"
        title="Talk to VRV Global"
        intro="Reach the right team directly — for product inquiries, ventures and partnerships, sustainability and ESG, careers and media. We respond from our Singapore headquarters."
        crumbs={[{ label: "Contact" }]}
      />

      <Section tone="white" className="!pb-0">
        <QuickAnswer question={quickAnswers.contact.question} answer={quickAnswers.contact.answer} className="max-w-3xl" />
      </Section>

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
                title={intent.title}
                intro={intent.intro}
              />
              <div className="mt-8">
                {searchParams?.type === "governance" ? (
                  <GovernanceEnquiryForm />
                ) : (
                  <ContactForm defaultDepartment={intent.department} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

    </>
  );
}
