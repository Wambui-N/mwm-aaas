"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { IntakeData } from "./AutomationAssessment";

const INDUSTRIES = [
  "Consulting / Professional services",
  "Marketing / Creative agency",
  "Real estate",
  "E-commerce / Retail",
  "Health & wellness",
  "Finance / Accounting",
  "Tech / SaaS",
  "Coaching / Education",
  "Other",
];

type Errors = Partial<Record<keyof IntakeData, string>>;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface IntakeFormProps {
  onComplete: (data: IntakeData) => void;
}

export function IntakeForm({ onComplete }: IntakeFormProps) {
  const [form, setForm] = useState<IntakeData>({
    name: "",
    email: "",
    industry: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof IntakeData, boolean>>>({});

  const validate = (data: IntakeData): Errors => {
    const errs: Errors = {};
    if (!data.name.trim()) errs.name = "Please enter your first name.";
    if (!data.email.trim()) {
      errs.email = "Please enter your work email.";
    } else if (!validateEmail(data.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!data.industry) errs.industry = "Please select your industry.";
    return errs;
  };

  const handleChange = (key: keyof IntakeData, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    if (touched[key]) {
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [key]: errs[key] }));
    }
  };

  const handleBlur = (key: keyof IntakeData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [key]: errs[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ name: true, email: true, industry: true });
      return;
    }
    onComplete(form);
  };

  const inputBase =
    "w-full rounded-lg border px-4 py-3 text-sm text-brand-black placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange";
  const inputOk = "border-gray-200 bg-white";
  const inputErr = "border-red-400 bg-red-50";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
        Before we start
      </p>
      <h2 className="text-lg md:text-xl font-semibold text-brand-black mb-2 leading-snug">
        Tell us a little about your business.
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        This helps us tailor your results to your situation.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            First name
          </label>
          <input
            type="text"
            autoComplete="given-name"
            placeholder="Your first name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            Work email
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Industry */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            Industry
          </label>
          <select
            value={form.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            onBlur={() => handleBlur("industry")}
            className={`${inputBase} ${errors.industry ? inputErr : inputOk}`}
          >
            <option value="">Select your industry…</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1 text-xs text-red-600">{errors.industry}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange/90"
        >
          Start the audit
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-center text-xs text-gray-400">
          Takes about 5 minutes · Results emailed to you
        </p>
      </form>
    </div>
  );
}
