"use client";

import { useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Secure investor information request form.
 * Demo only — preventDefault + local success state. Validation runs in React
 * state: a non-blocking free-email warning and a blocking consent requirement.
 * Connect to your CRM / secure inbox before launch.
 */

const INVESTOR_TYPES = [
  "Institutional Investor",
  "Family Office",
  "Strategic Investor",
  "Private Investor",
  "Analyst",
  "Other",
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

const INFO_OPTIONS = [
  "Company Profile",
  "Financial Information",
  "ESG Reports",
  "Investor Presentation",
  "Governance Documents",
];

/** Common free / personal email domains — prefer an official corporate address. */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "gmail.co",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "ymail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
  "mail.com",
]);

function emailDomain(email: string): string | null {
  const match = email.trim().toLowerCase().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
  return match ? match[1] : null;
}

export function InvestorRequestForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [info, setInfo] = useState<string[]>([]);
  const [consentError, setConsentError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const domain = emailDomain(email);
  const freeEmailWarning = domain !== null && FREE_EMAIL_DOMAINS.has(domain);

  function toggleInfo(option: string) {
    setInfo((prev) =>
      prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option],
    );
  }

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
    setEmail("");
    setConsent(false);
    setInfo([]);
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
          <h3 className="text-lg font-medium text-ink">Request received</h3>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/65">
            Our investor relations team will respond. Demo form — connect to your CRM /
            secure inbox before launch. No data has been stored or transmitted.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Full name" htmlFor="ir-name" required>
        <Input id="ir-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
      </Field>

      <Field label="Company / organisation" htmlFor="ir-company" required>
        <Input id="ir-company" name="company" type="text" autoComplete="organization" placeholder="Company name" required />
      </Field>

      <Field label="Designation" htmlFor="ir-designation">
        <Input id="ir-designation" name="designation" type="text" autoComplete="organization-title" placeholder="e.g. Portfolio Manager" />
      </Field>

      <Field label="Investor type" htmlFor="ir-type" required>
        <Select id="ir-type" name="investorType" defaultValue="" required>
          <option value="" disabled>
            Select investor type
          </option>
          {INVESTOR_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Official email address" htmlFor="ir-email" required className="sm:col-span-2">
        <Input
          id="ir-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={freeEmailWarning ? "ir-email-warning" : undefined}
        />
        {freeEmailWarning && (
          <p
            id="ir-email-warning"
            role="status"
            className="mt-1.5 flex items-start gap-2 text-sm leading-snug text-gold-700"
          >
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
            <span>
              Free email domains may require additional verification. An official /
              corporate email is preferred.
            </span>
          </p>
        )}
      </Field>

      <Field label="Phone" htmlFor="ir-phone">
        <Input id="ir-phone" name="phone" type="tel" autoComplete="tel" placeholder="+65 0000 0000" />
      </Field>

      <Field label="Country" htmlFor="ir-country">
        <Select id="ir-country" name="country" defaultValue="">
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

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 block text-sm font-medium text-ink">Information requested</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {INFO_OPTIONS.map((option) => {
            const id = `ir-info-${option.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <label
                key={option}
                htmlFor={id}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink/80 transition-colors hover:border-brand/40"
              >
                <input
                  id={id}
                  name="info"
                  type="checkbox"
                  value={option}
                  checked={info.includes(option)}
                  onChange={() => toggleInfo(option)}
                  className="h-4 w-4 shrink-0 rounded border-ink/25 text-brand focus:ring-brand"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field label="Message" htmlFor="ir-message" className="sm:col-span-2">
        <Textarea
          id="ir-message"
          name="message"
          placeholder="Tell us what information you are seeking and any context on your interest."
        />
      </Field>

      <div className="sm:col-span-2">
        <label
          htmlFor="ir-consent"
          className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/65"
        >
          <input
            id="ir-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(false);
            }}
            aria-invalid={consentError}
            aria-describedby={consentError ? "ir-consent-error" : undefined}
            className={cn(
              "mt-1 h-4 w-4 shrink-0 rounded border-ink/25 text-brand focus:ring-brand",
              consentError && "border-flame ring-2 ring-flame/30",
            )}
          />
          <span>
            I consent to VRV Global processing my data for this request, as described in our{" "}
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
          <p id="ir-consent-error" role="alert" className="mt-2 text-sm font-medium text-flame">
            Please confirm your consent before submitting this request.
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" withArrow>
          Send request
        </Button>
        <p className="text-xs text-ink/45">
          Demo form — connect to your CRM / secure inbox before launch.
        </p>
      </div>
    </form>
  );
}
