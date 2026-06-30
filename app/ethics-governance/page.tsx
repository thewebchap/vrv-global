import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PolicyCards } from "@/components/governance/PolicyCards";
import { PolicyDownload } from "@/components/governance/PolicyDownload";
import { Faq } from "@/components/seo/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { principles, supplierExpectations, governanceFaqs } from "@/data/governance";
import { ethicsPdfExists, ETHICS_PDF_PATH } from "@/lib/policyPdf";
import { site } from "@/lib/site";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ethics & Governance | Responsible Commodity Trade",
  description:
    "Learn about VRV Global's ethics and governance approach across responsible sourcing, trade compliance, anti-bribery, supplier accountability, traceability readiness, and commodity supply chain conduct.",
  path: "/ethics-governance",
});

export default function EthicsGovernancePage() {
  const pdfExists = ethicsPdfExists();

  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Ethics & governance"
        title="Ethics & Governance"
        intro="A responsible governance framework for commodity trade, sourcing relationships, supplier accountability, and long-term stakeholder trust."
        crumbs={[{ label: "About", href: "/about" }, { label: "Ethics & Governance" }]}
      />

      {/* 2 — Overview */}
      <Section tone="white">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Overview" title="Responsible conduct across global supply chains" />
          <p className="mt-6 text-[18px] leading-relaxed text-ink/75 text-pretty">
            VRV Global&apos;s ethics and governance framework is designed to support responsible business conduct across
            global commodity supply chains. It covers supplier engagement, sourcing discipline, trade compliance,
            anti-bribery expectations, documentation practices, grievance escalation, and traceability readiness across the
            company&apos;s agro commodities, industrial metals, mining, ventures, and circular economy activities.
          </p>
        </div>
      </Section>

      {/* 3 — Governance principles */}
      <Section tone="paper" bordered>
        <SectionHeading eyebrow="Governance principles" title="Principles that guide how we trade" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft">
              <p className="flex items-center gap-2 font-serif text-lg text-ink">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                {p.title}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/60">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4 — Policy areas */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Policy areas"
          title="Our governance policy areas"
          intro="The policy areas that shape how VRV Global sources, trades and engages across its supply chains."
        />
        <div className="mt-12">
          <PolicyCards />
        </div>
      </Section>

      {/* 5 — Supplier & partner expectations */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Supplier & partner expectations"
            title="What we expect from partners"
            intro="VRV Global expects suppliers, customers, logistics partners, processors, agents, and strategic partners to act with integrity, comply with applicable laws, support responsible sourcing, maintain accurate documentation, and cooperate with reasonable due diligence and traceability requirements."
          />
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {supplierExpectations.map((e) => (
              <li key={e} className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-soft">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-[13.5px] leading-snug text-ink/70">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 6 — Responsible sourcing & traceability */}
      <Section tone="white" bordered>
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Responsible sourcing & traceability" title="Designed to support accountability from origin to destination" />
          <p className="mt-6 text-[16px] leading-relaxed text-ink/70">
            VRV Global&apos;s governance approach supports responsible sourcing and traceability readiness across selected
            commodity flows. This includes supplier engagement, origin visibility, documentation discipline, quality
            checks, and data practices that help improve accountability from origin to destination, where data is
            available.
          </p>
        </div>
      </Section>

      {/* 7 — Trade compliance & anti-bribery */}
      <Section tone="paper" bordered>
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Trade compliance & anti-bribery" title="Lawful, ethical trade execution" />
          <p className="mt-6 text-[16px] leading-relaxed text-ink/70">
            VRV Global&apos;s trade compliance and anti-bribery expectations are designed to support lawful and ethical
            trade execution. The framework covers counterparty awareness, sanctions sensitivity, documentation discipline,
            fair dealing, and expectations for avoiding bribery, facilitation payments, conflicts of interest, and improper
            benefits.
          </p>
        </div>
      </Section>

      {/* 8 — Grievance & escalation */}
      <Section tone="white" bordered>
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-paper p-7 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="max-w-2xl">
            <p className="eyebrow no-flourish">Grievance & escalation</p>
            <h2 className="mt-3 font-serif text-2xl text-ink">Raise a concern responsibly</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
              VRV Global&apos;s grievance and escalation approach provides a structured path for raising concerns related to
              sourcing practices, supplier conduct, compliance matters, documentation, or ethical business conduct.
              Concerns should be reviewed responsibly, escalated where appropriate, and handled with confidentiality where
              possible.
            </p>
          </div>
          <Button href="/contact?type=governance" variant="primary" size="lg" withArrow className="shrink-0">Raise a Governance Concern</Button>
        </div>
      </Section>

      {/* 9 — Policy PDF download */}
      <Section id="download" tone="paper" bordered className="scroll-mt-24">
        <PolicyDownload exists={pdfExists} href={ETHICS_PDF_PATH} />
      </Section>

      {/* FAQ */}
      <Section tone="white" bordered>
        <SectionHeading align="center" eyebrow="FAQs" title="Ethics & governance questions" />
        <div className="mt-12">
          <Faq items={governanceFaqs} idBase="governance-faq" />
        </div>
      </Section>

      {/* 10 — Contact CTA */}
      <section className="bg-eco">
        <div className="container-x py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl text-h2 text-white text-balance">Questions about our governance approach?</h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            Reach the right team for governance, compliance and responsible-sourcing enquiries.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact?type=governance" variant="primary" size="lg">Governance enquiry</Button>
            <Button href="/about" variant="outlineLight" size="lg" withArrow>Back to About</Button>
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Ethics & Governance",
            url: `${site.url}/ethics-governance`,
            about: { "@type": "Organization", name: site.legalName, url: site.url },
            description:
              "VRV Global's ethics and governance approach across responsible sourcing, trade compliance, anti-bribery, supplier accountability and traceability readiness.",
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Ethics & Governance", path: "/ethics-governance" },
          ]),
        ]}
      />
    </>
  );
}
