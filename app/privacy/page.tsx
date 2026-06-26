import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How VRV Global Pte. Ltd. collects, uses, shares and protects personal information, and the rights available to you. Template policy pending legal review.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const address = `${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.postal}, ${site.address.country}`;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How VRV Global collects, uses, shares and protects personal information across our website and business relationships."
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          {/* Editorial notes */}
          <div className="rounded-xl border border-line bg-paper px-5 py-4 text-sm text-ink/65">
            [Editable: this is a template privacy policy — have it reviewed by legal counsel before publishing.]
          </div>
          <p className="mt-4 text-sm text-ink/55">Effective date: [Editable]</p>

          <div className="mt-10 space-y-12 text-[16px] leading-relaxed text-ink/70">
            <section>
              <h2 className="text-h2 text-ink">1. Introduction</h2>
              <p className="mt-4">
                This Privacy Policy explains how {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo; or &ldquo;our&rdquo;) handles personal information collected through our website,
                communications and business relationships. We are committed to protecting personal data and to
                processing it lawfully, fairly and transparently. By using our website or contacting us, you
                acknowledge the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">2. Information We Collect</h2>
              <p className="mt-4">We may collect the following categories of information:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-ink">Information you provide</strong> — such as your name,
                  company, role, email address, telephone number and the content of enquiries, trade requests or
                  newsletter sign-ups.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Business and transactional information</strong> —
                  details relating to sourcing, trade and partnership discussions where you engage with us.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Technical information</strong> — including IP address,
                  browser type, device information and pages visited, collected automatically as you use our website.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Cookies and similar technologies</strong> — as described
                  in the Cookies section below.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-ink">3. How We Use Information</h2>
              <p className="mt-4">We use personal information to:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>respond to enquiries, trade requests and partnership discussions;</li>
                <li>provide, operate, maintain and improve our website and services;</li>
                <li>send updates, insights or newsletters where you have requested them or where permitted by law;</li>
                <li>comply with legal, regulatory, due-diligence and contractual obligations; and</li>
                <li>protect our rights, prevent fraud and ensure the security of our systems.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-ink">4. Legal Bases</h2>
              <p className="mt-4">
                Where applicable law requires a legal basis for processing, we rely on one or more of the following:
                your consent; the performance of a contract or steps taken at your request prior to entering a
                contract; compliance with a legal obligation; and our legitimate interests in operating and growing a
                responsible, sustainable supply-chain business, provided these interests are not overridden by your
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">5. Data Sharing</h2>
              <p className="mt-4">
                We do not sell personal information. We may share it with trusted service providers who process data
                on our behalf (for example hosting, analytics, email and customer-relationship tools), with
                professional advisers, and with authorities where required by law or to protect our legal rights. Any
                such recipients are required to safeguard the information and to use it only for the purposes for which
                it was shared.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">6. Data Retention</h2>
              <p className="mt-4">
                We retain personal information only for as long as necessary to fulfil the purposes set out in this
                policy, including to satisfy legal, accounting, regulatory or reporting requirements. When information
                is no longer required, we take reasonable steps to delete or anonymise it.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">7. Your Rights</h2>
              <p className="mt-4">
                Subject to applicable law, you may have the right to access, correct, update or delete your personal
                information, to object to or restrict certain processing, to withdraw consent, and to request data
                portability. To exercise any of these rights, please contact us using the details below. We may need
                to verify your identity before responding to a request.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">8. Cookies</h2>
              <p className="mt-4">
                Our website may use cookies and similar technologies to operate essential functions, remember
                preferences and understand how the site is used. You can manage cookies through your browser settings;
                disabling certain cookies may affect how the website functions. [Editable: align with your final
                cookie/consent implementation.]
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">9. International Transfers</h2>
              <p className="mt-4">
                As a global business, we may transfer personal information to, and store it in, countries other than
                the one in which it was collected. Where we do so, we take steps to ensure that appropriate safeguards
                are in place to protect the information in accordance with applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">10. Security</h2>
              <p className="mt-4">
                We maintain reasonable technical and organisational measures designed to protect personal information
                against unauthorised access, loss, misuse or alteration. However, no method of transmission or storage
                is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">11. Contact</h2>
              <p className="mt-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <ul className="mt-4 space-y-1">
                <li>
                  <strong className="font-semibold text-ink">{site.legalName}</strong>
                </li>
                <li>{address}</li>
                <li>
                  Email:{" "}
                  <a href={`mailto:${site.email}`} className="text-brand hover:text-brand-600">
                    {site.email}
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-ink">12. Changes to This Policy</h2>
              <p className="mt-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology or
                legal requirements. The effective date above indicates when the policy was last revised. We encourage
                you to review this page periodically.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
