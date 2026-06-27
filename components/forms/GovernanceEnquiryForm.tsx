"use client";

import { useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Governance / ethics concern enquiry form. Demo only — preventDefault + local
 * success state with a blocking consent requirement. Connect to a confidential
 * governance inbox / case system before launch.
 */
const CONCERN_TYPES = [
  "Code of Conduct",
  "Responsible Sourcing",
  "Trade Compliance",
  "Anti-Bribery / Anti-Corruption",
  "Supplier Concern",
  "Documentation / Traceability",
  "Other",
];

const COUNTRIES = [
  "Singapore",
  "Tanzania",
  "Zambia",
  "Côte d'Ivoire",
  "United Arab Emirates",
  "India",
  "China",
  "United Kingdom",
  "United States",
  "Switzerland",
  "Other",
];

export function GovernanceEnquiryForm() {
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand/25 bg-eco-soft p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <Icon name="check" />
        </span>
        <div>
          <h3 className="text-lg font-medium text-ink">Concern received</h3>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/65">
            Your governance concern will be reviewed responsibly and escalated where appropriate. Demo form — connect to a
            confidential governance inbox before launch. No data has been stored or transmitted.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          Submit another concern
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Full name" htmlFor="g-name" required>
        <Input id="g-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
      </Field>

      <Field label="Company / organisation" htmlFor="g-company">
        <Input id="g-company" name="company" type="text" autoComplete="organization" placeholder="Company name" />
      </Field>

      <Field label="Email" htmlFor="g-email" required>
        <Input id="g-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
      </Field>

      <Field label="Phone" htmlFor="g-phone">
        <Input id="g-phone" name="phone" type="tel" autoComplete="tel" placeholder="+65 0000 0000" />
      </Field>

      <Field label="Country" htmlFor="g-country">
        <Select id="g-country" name="country" defaultValue="">
          <option value="" disabled>Select country</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </Field>

      <Field label="Concern type" htmlFor="g-type" required>
        <Select id="g-type" name="concernType" defaultValue="" required>
          <option value="" disabled>Select concern type</option>
          {CONCERN_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
      </Field>

      <Field label="Message" htmlFor="g-message" required className="sm:col-span-2">
        <Textarea id="g-message" name="message" placeholder="Describe the concern. Handled with confidentiality where possible." required />
      </Field>

      <div className="sm:col-span-2">
        <label htmlFor="g-consent" className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/65">
          <input
            id="g-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(false); }}
            aria-invalid={consentError}
            className={cn(
              "mt-1 h-4 w-4 shrink-0 rounded border-ink/25 text-brand focus:ring-brand",
              consentError && "border-flame ring-2 ring-flame/30",
            )}
          />
          <span>
            I consent to VRV Global processing this information to review and, where appropriate, escalate my concern, as
            described in our{" "}
            <a href="/privacy" className="font-semibold text-brand underline underline-offset-2 hover:text-brand-600">privacy policy</a>.
            <span className="ml-0.5 text-brand" aria-hidden>*</span>
          </span>
        </label>
        {consentError && (
          <p role="alert" className="mt-2 text-sm font-medium text-flame">Please confirm your consent before submitting.</p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" withArrow>Submit Governance Enquiry</Button>
        <p className="text-xs text-ink/45">Demo form — connect to a confidential governance inbox before launch.</p>
      </div>
    </form>
  );
}
