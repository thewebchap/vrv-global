"use client";

import { useState } from "react";
import { Field, Input, Textarea, Select, FileInput } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Speculative / open-application resume form.
 * Demo only — preventDefault + local success state. Connect to a real ATS
 * or form endpoint before launch.
 */
export function ResumeForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand/25 bg-eco-soft p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <Icon name="check" />
        </span>
        <div>
          <h3 className="text-lg font-medium text-ink">Thank you — application received</h3>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/65">
            Demo form — connect to your ATS before launch. No data has been stored or transmitted.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      noValidate={false}
    >
      <Field label="Full name" htmlFor="rf-name" required>
        <Input id="rf-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
      </Field>

      <Field label="Email" htmlFor="rf-email" required>
        <Input id="rf-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
      </Field>

      <Field label="Phone" htmlFor="rf-phone">
        <Input id="rf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+65 0000 0000" />
      </Field>

      <Field label="Area of interest" htmlFor="rf-area" required>
        <Select id="rf-area" name="area" defaultValue="" required>
          <option value="" disabled>
            Select an area
          </option>
          <option value="trading">Trading</option>
          <option value="sustainability">Sustainability / ESG</option>
          <option value="operations">Operations &amp; Logistics</option>
          <option value="finance">Finance</option>
          <option value="technology">Technology</option>
          <option value="other">Other</option>
        </Select>
      </Field>

      <Field label="LinkedIn / Portfolio URL" htmlFor="rf-url" className="sm:col-span-2">
        <Input id="rf-url" name="url" type="url" placeholder="https://linkedin.com/in/…" />
      </Field>

      <Field label="Message" htmlFor="rf-message" className="sm:col-span-2">
        <Textarea
          id="rf-message"
          name="message"
          placeholder="Tell us about your experience and what draws you to purpose-led global trade."
        />
      </Field>

      <Field label="CV / Resume" htmlFor="rf-cv" required className="sm:col-span-2">
        <FileInput id="rf-cv" name="cv" accept=".pdf,.doc,.docx" required />
        <p className="mt-1.5 text-xs text-ink/45">PDF or Word document. Demo upload — file is not stored.</p>
      </Field>

      <div className="sm:col-span-2">
        <label htmlFor="rf-consent" className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/65">
          <input
            id="rf-consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 rounded border-ink/25 text-brand focus:ring-brand"
          />
          <span>
            I consent to VRV Global processing my details for recruitment purposes in line with its privacy policy.
            <span className="ml-0.5 text-brand" aria-hidden>
              *
            </span>
          </span>
        </label>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" withArrow>
          Submit application
        </Button>
        <p className="text-xs text-ink/45">
          Demo form — connect to your ATS before launch.
        </p>
      </div>
    </form>
  );
}
