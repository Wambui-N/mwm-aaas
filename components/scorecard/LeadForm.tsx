"use client";

import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SketchSubmit } from "@/components/site/SketchButton";
import { leadForm } from "@/lib/scorecard/copy";
import { COUNTRIES } from "@/lib/scorecard/countries";
import { CONSENT_LABEL, DONORS, FIRM_SIZES, ROLES } from "@/lib/scorecard/questions";

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name."),
  email: z.string().trim().min(1, "Please enter your work email.").email("Please enter a valid email address."),
  firmName: z.string().trim().min(1, "Please enter your firm name."),
  role: z.string().min(1, "Please select your role."),
  firmSize: z.string().min(1, "Please select your firm size."),
  country: z.string().min(1, "Please select your country."),
  donors: z.array(z.string()),
  consent: z.boolean().refine((v) => v, "Please tick this box to get your results by email."),
  website: z.string().optional(),
});

export type LeadData = z.infer<typeof schema>;

const Req = () => (
  <span aria-hidden className="text-ink">
    {" "}
    *
  </span>
);

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="fm-label">
        {label}
        {required && <Req />}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="fm-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ onSubmit, busy, error }: { onSubmit: (d: LeadData) => void; busy: boolean; error: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { firstName: "", email: "", firmName: "", role: "", firmSize: "", country: "", donors: [], consent: false, website: "" },
  });

  const inv = (k: keyof LeadData) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `lf-${k}-error` } : {});

  return (
    <div className="calm-card px-6 py-8 md:px-7">
      <p className="gl-mono text-ink/60">{leadForm.label}</p>
      <h2 className="calm-h3 mb-6 mt-3">{leadForm.title}</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="lf-firstName" label="First name" required error={errors.firstName?.message}>
            <input id="lf-firstName" className="fm-control" type="text" autoComplete="given-name" placeholder="Your first name" {...inv("firstName")} {...register("firstName")} />
          </Field>
          <Field id="lf-email" label="Work email" required error={errors.email?.message}>
            <input id="lf-email" className="fm-control" type="email" autoComplete="email" placeholder="you@company.com" {...inv("email")} {...register("email")} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="lf-firmName" label="Firm name" required error={errors.firmName?.message}>
            <input id="lf-firmName" className="fm-control" type="text" autoComplete="organization" placeholder="Your firm name" {...inv("firmName")} {...register("firmName")} />
          </Field>
          <Field id="lf-role" label="Your role" required error={errors.role?.message}>
            <select id="lf-role" className="fm-control" {...inv("role")} {...register("role")}>
              <option value="">Select your role…</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="lf-firmSize" label="Firm size" required error={errors.firmSize?.message}>
            <select id="lf-firmSize" className="fm-control" {...inv("firmSize")} {...register("firmSize")}>
              <option value="">Select your firm size…</option>
              {FIRM_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field id="lf-country" label="Country" required error={errors.country?.message}>
            <select id="lf-country" className="fm-control" autoComplete="country-name" {...inv("country")} {...register("country")}>
              <option value="">Select your country…</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <fieldset>
          <legend className="fm-label">Donors you submit proposals to</legend>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
            {DONORS.map((d) => (
              <label key={d} className="flex min-h-[44px] cursor-pointer items-center gap-3">
                <input type="checkbox" value={d} className="h-5 w-5 shrink-0 accent-[#141010]" {...register("donors")} />
                <span className="calm-body">{d}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* honeypot: real people never see or fill this */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="lf-website">Website</label>
          <input id="lf-website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#141010]" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "lf-consent-error" : undefined} {...register("consent")} />
            <span className="calm-body">
              {CONSENT_LABEL}
              <Req />
            </span>
          </label>
          {errors.consent && (
            <p id="lf-consent-error" className="fm-error" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>

        {error && (
          <p className="fm-error" role="alert">
            {error}
          </p>
        )}

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <SketchSubmit variant="marker" seed={9} className="w-full text-lg sm:w-auto" disabled={busy}>
            <span className="inline-flex items-center gap-2">
              {busy ? "Starting…" : leadForm.button}
              {!busy && <ArrowRight className="h-4 w-4" aria-hidden />}
            </span>
          </SketchSubmit>
          <p className="calm-body text-ink/60">{leadForm.note}</p>
        </div>
      </form>
    </div>
  );
}
