import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { PolicyCards } from "@/components/governance/PolicyCards";
import { PolicyDownload } from "@/components/governance/PolicyDownload";

/**
 * Ethics & Governance — premium About-page section. Left column carries the
 * heading, description and CTAs; right column holds the governance policy
 * cards. A policy-pack download (or placeholder) sits below.
 */
export function EthicsGovernance({ pdfExists, pdfHref }: { pdfExists: boolean; pdfHref: string }) {
  return (
    <Section id="ethics-governance" tone="paper" bordered className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div>
          <Eyebrow>Ethics &amp; governance</Eyebrow>
          <h2 className="mt-5 text-h2 text-balance">Ethics &amp; Governance</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/70 text-pretty">
            Responsible trade depends on strong governance, clear policies, ethical conduct, and accountable
            decision-making across every supply chain relationship.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
            VRV Global&apos;s governance approach is designed to support responsible sourcing, trade compliance, supplier
            accountability, and transparent decision-making across agro commodities, industrial metals, mining, ventures,
            and circular economy materials. The company&apos;s ethics and governance framework guides how VRV engages with
            suppliers, customers, partners, communities, and stakeholders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/ethics-governance" variant="primary" withArrow>View the full framework</Button>
            <Button href="/contact?type=governance" variant="outline">Raise a governance concern</Button>
          </div>
        </div>

        <PolicyCards />
      </div>

      <div className="mt-10">
        <PolicyDownload exists={pdfExists} href={pdfHref} />
      </div>
    </Section>
  );
}
