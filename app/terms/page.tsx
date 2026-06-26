import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms & Conditions",
  description:
    "The terms governing use of the VRV Global Pte. Ltd. website, including intellectual property, disclaimers, limitation of liability and governing law. Template pending legal review.",
  path: "/terms",
});

export default function TermsPage() {
  const address = `${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.postal}, ${site.address.country}`;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="The terms that govern your use of the VRV Global website and the information it contains."
        crumbs={[{ label: "Terms & Conditions" }]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-line bg-paper px-5 py-4 text-sm text-ink/65">
            [Editable: template terms — review with legal counsel.]
          </div>
          <p className="mt-4 text-sm text-ink/55">Effective date: [Editable]</p>

          <div className="mt-10 space-y-12 text-[16px] leading-relaxed text-ink/70">
            <section>
              <h2 className="text-h2 text-ink">1. Acceptance of Terms</h2>
              <p className="mt-4">
                These Terms &amp; Conditions govern your access to and use of the website operated by{" "}
                {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;).
                By accessing or using this website, you agree to be bound by these terms. If you do not agree, please
                do not use the website.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">2. Use of Website</h2>
              <p className="mt-4">
                You may use this website for lawful purposes only. You agree not to use it in any way that could
                damage, disable or impair the site, interfere with another party&rsquo;s use of it, or attempt to gain
                unauthorised access to any systems or data. We may suspend, withdraw or restrict availability of all or
                part of the website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">3. Intellectual Property</h2>
              <p className="mt-4">
                All content on this website — including text, graphics, logos, images and design — is owned by or
                licensed to {site.legalName} and is protected by intellectual property laws. You may view and print
                content for your own internal reference, but you may not reproduce, distribute, modify or
                commercially exploit it without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">4. Products &amp; Trade Enquiries</h2>
              <p className="mt-4">
                Information on this website about our products, materials, services and capabilities is provided for
                general informational purposes only. It does not constitute an offer, solicitation or commitment to
                buy or sell any product or to enter into any transaction. Any trade, sourcing or partnership will be
                subject to separate written agreement, due diligence and applicable terms agreed between the parties.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">5. Disclaimers</h2>
              <p className="mt-4">
                This website and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
                warranties of any kind, whether express or implied. While we take reasonable care to keep information
                accurate and up to date, we make no representation or warranty as to its completeness, accuracy,
                reliability or fitness for any particular purpose. Any reliance you place on the content is at your own
                risk.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">6. Limitation of Liability</h2>
              <p className="mt-4">
                To the fullest extent permitted by law, {site.legalName} shall not be liable for any indirect,
                incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or
                goodwill, arising out of or in connection with your use of, or inability to use, this website or its
                content.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">7. Indemnification</h2>
              <p className="mt-4">
                You agree to indemnify and hold harmless {site.legalName} and its officers, directors, employees and
                agents from and against any claims, liabilities, damages, losses and expenses arising out of your
                breach of these terms or your misuse of the website.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">8. Third-Party Links</h2>
              <p className="mt-4">
                This website may contain links to third-party websites for your convenience. We do not control and are
                not responsible for the content, accuracy or practices of those websites. Inclusion of a link does not
                imply endorsement, and accessing third-party sites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">9. Governing Law</h2>
              <p className="mt-4">
                These Terms &amp; Conditions are governed by and construed in accordance with the laws of Singapore
                [Editable], and you submit to the exclusive jurisdiction of the courts of Singapore [Editable] in
                relation to any dispute arising from them.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">10. Changes</h2>
              <p className="mt-4">
                We may revise these terms from time to time. The version in effect is the one published on this page,
                and your continued use of the website after any change constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-ink">11. Contact</h2>
              <p className="mt-4">If you have any questions about these terms, please contact us:</p>
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
          </div>
        </div>
      </Section>
    </>
  );
}
