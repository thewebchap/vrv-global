"use client";

import { useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * General contact form with department routing.
 * Demo only — preventDefault + local success state. A blocking consent
 * requirement is enforced in React state. Connect to your CRM / inbox
 * before launch.
 */

export const DEPARTMENTS = [
  "Product Inquiry",
  "Investor Relations",
  "Sustainability / ESG",
  "Careers",
  "Media",
  "General",
];

const COUNTRIES = [
  "Singapore",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "India",
  "China",
  "Japan",
  "Germany",
  "Switzerland",
  "Australia",
  "Other",
];

export function ContactForm({ defaultDepartment = "" }: { defaultDepartment?: string }) {
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

  function reset() {
    setConsent(false);
    setConsentError(false);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand/25 bg-eco-soft p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <Icon name="check" />
        </span>
        <div>
          <h3 className="text-lg font-medium text-ink">Message sent — thank you</h3>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/65">
            We&apos;ve received your message and will route it to the right team. Demo
            form — connect to your CRM / inbox before launch. No data has been stored
            or transmitted.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Full name" htmlFor="cf-name" required>
        <Input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
      </Field>

      <Field label="Company / organisation" htmlFor="cf-company">
        <Input id="cf-company" name="company" type="text" autoComplete="organization" placeholder="Company name" />
      </Field>

      <Field label="Email" htmlFor="cf-email" required>
        <Input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
      </Field>

      <Field label="Phone" htmlFor="cf-phone">
        <Input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+65 0000 0000" />
      </Field>

      <Field label="Country" htmlFor="cf-country">
        <Select id="cf-country" name="country" defaultValue="">
          <option value="" disabled>
            Select country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Department" htmlFor="cf-department" required>
        <Select id="cf-department" name="department" defaultValue={defaultDepartment} required>
          <option value="" disabled>
            Select a department
          </option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Subject" htmlFor="cf-subject" className="sm:col-span-2">
        <Input id="cf-subject" name="subject" type="text" placeholder="How can we help?" />
      </Field>

      <Field label="Message" htmlFor="cf-message" required className="sm:col-span-2">
        <Textarea id="cf-message" name="message" required placeholder="Tell us more about your enquiry." />
      </Field>

      <div className="sm:col-span-2">
        <label
          htmlFor="cf-consent"
          className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/65"
        >
          <input
            id="cf-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(false);
            }}
            aria-invalid={consentError}
            aria-describedby={consentError ? "cf-consent-error" : undefined}
            className={cn(
              "mt-1 h-4 w-4 shrink-0 rounded border-ink/25 text-brand focus:ring-brand",
              consentError && "border-flame ring-2 ring-flame/30",
            )}
          />
          <span>
            I consent to VRV Global processing my details to respond to this enquiry, in
            line with our{" "}
            <a href="/privacy" className="font-semibold text-brand underline underline-offset-2 hover:text-brand-600">
              privacy policy
            </a>
            .
            <span className="ml-0.5 text-brand" aria-hidden>
              *
            </span>
          </span>
        </label>
        {consentError && (
          <p id="cf-consent-error" role="alert" className="mt-2 text-sm font-medium text-flame">
            Please confirm your consent before sending your message.
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" withArrow>
          Send message
        </Button>
        <p className="text-xs text-ink/45">
          Demo form — connect to your CRM / inbox before launch.
        </p>
      </div>
    </form>
  );
}
