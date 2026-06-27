"use client";

import { useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Ventures & Partnership enquiry form. Demo only — preventDefault + local
 * success state, with a blocking consent requirement. Connect to your CRM /
 * secure inbox before launch.
 */
const ENQUIRY_TYPES = [
  "Mining venture",
  "Natural rubber processing",
  "Circular economy materials",
  "Regional expansion",
  "Supply chain partnership",
  "Investor / strategic partner",
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

export function VentureEnquiryForm({ defaultType }: { defaultType?: string }) {
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
          <h3 className="text-lg font-medium text-ink">Enquiry received</h3>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/65">
            Our ventures team will respond. Demo form — connect to your CRM / secure inbox before launch.
            No data has been stored or transmitted.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Full name" htmlFor="v-name" required>
        <Input id="v-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
      </Field>

      <Field label="Company / organisation" htmlFor="v-company" required>
        <Input id="v-company" name="company" type="text" autoComplete="organization" placeholder="Company name" required />
      </Field>

      <Field label="Designation" htmlFor="v-designation">
        <Input id="v-designation" name="designation" type="text" autoComplete="organization-title" placeholder="e.g. Director, Partner" />
      </Field>

      <Field label="Enquiry type" htmlFor="v-type" required>
        <Select id="v-type" name="enquiryType" defaultValue={defaultType ?? ""} required>
          <option value="" disabled>Select enquiry type</option>
          {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
      </Field>

      <Field label="Email" htmlFor="v-email" required>
        <Input id="v-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
      </Field>

      <Field label="Phone" htmlFor="v-phone">
        <Input id="v-phone" name="phone" type="tel" autoComplete="tel" placeholder="+65 0000 0000" />
      </Field>

      <Field label="Country" htmlFor="v-country" className="sm:col-span-2">
        <Select id="v-country" name="country" defaultValue="">
          <option value="" disabled>Select country</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </Field>

      <Field label="Message" htmlFor="v-message" className="sm:col-span-2">
        <Textarea id="v-message" name="message" placeholder="Tell us about the venture, partnership or opportunity you would like to discuss." />
      </Field>

      <div className="sm:col-span-2">
        <label htmlFor="v-consent" className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/65">
          <input
            id="v-consent"
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
            I consent to VRV Global processing my data for this enquiry, as described in our{" "}
            <a href="/privacy" className="font-semibold text-brand underline underline-offset-2 hover:text-brand-600">privacy policy</a>.
            <span className="ml-0.5 text-brand" aria-hidden>*</span>
          </span>
        </label>
        {consentError && (
          <p role="alert" className="mt-2 text-sm font-medium text-flame">
            Please confirm your consent before submitting this enquiry.
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" withArrow>Submit Venture Enquiry</Button>
        <p className="text-xs text-ink/45">Demo form — connect to your CRM / secure inbox before launch.</p>
      </div>
    </form>
  );
}
