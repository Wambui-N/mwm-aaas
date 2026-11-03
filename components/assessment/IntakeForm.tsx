"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SketchSubmit } from "@/components/site/SketchButton";
import { satoshi } from "@/lib/site/fonts";

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

const ROLES = ["Founder", "Director", "Partner", "Other"] as const;

const TEAM_SIZES = ["Solo", "2–5", "6–15", "16+"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your first name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .email("Please enter a valid email address."),
  businessName: z.string().trim().min(1, "Please enter your business name."),
  industry: z.string().min(1, "Please select your industry."),
  role: z.string().min(1, "Please select your role."),
  teamSize: z.string().min(1, "Please select your team size."),
});

interface IntakeFormProps {
  onComplete: (data: IntakeData) => void;
}

// The select menu is rendered in a portal outside the page wrapper, so it carries its own font and
// sizes (16px text, 44px rows) instead of inheriting the scoped design tokens.
const MENU_STYLE = { fontFamily: satoshi.style.fontFamily } as const;
const MENU_CLASS = "rounded-none border-ink/40 bg-white text-ink shadow-none";
const ITEM_CLASS = "min-h-[44px] rounded-none py-3 pl-8 pr-3 text-[16px] focus:bg-sage/40 focus:text-ink";
const ERROR_CLASS = "fm-error";
const LABEL_CLASS = "fm-label";
const REQUIRED = (
  <span aria-hidden className="text-ink">
    {" "}
    *
  </span>
);

export function IntakeForm({ onComplete }: IntakeFormProps) {
  const form = useForm<IntakeData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      industry: "",
      role: "",
      teamSize: "",
    },
  });

  return (
    <div className="calm-card px-6 py-8 md:px-7">
      <p className="gl-mono text-ink/60">Before we begin</p>
      <h2 className="calm-h3 mb-6 mt-3">Let&apos;s start with the basics.</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onComplete)} noValidate className="flex flex-col gap-5">
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>
                    First name{REQUIRED}
                  </FormLabel>
                  <FormControl>
                    <Input className="fm-control" type="text" autoComplete="given-name" placeholder="Your first name" {...field} />
                  </FormControl>
                  <FormMessage className={ERROR_CLASS} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>
                    Work email{REQUIRED}
                  </FormLabel>
                  <FormControl>
                    <Input className="fm-control" type="email" autoComplete="email" placeholder="you@company.com" {...field} />
                  </FormControl>
                  <FormMessage className={ERROR_CLASS} />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Business Name + Industry */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>
                    Business name{REQUIRED}
                  </FormLabel>
                  <FormControl>
                    <Input className="fm-control" type="text" autoComplete="organization" placeholder="Your business name" {...field} />
                  </FormControl>
                  <FormMessage className={ERROR_CLASS} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>
                    Industry{REQUIRED}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} onOpenChange={() => field.onBlur()}>
                    <FormControl>
                      <SelectTrigger className="fm-control h-auto">
                        <SelectValue placeholder="Select your industry…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={MENU_CLASS} style={MENU_STYLE}>
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind} value={ind} className={ITEM_CLASS}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={ERROR_CLASS} />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Role + Team Size */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>
                    Role{REQUIRED}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} onOpenChange={() => field.onBlur()}>
                    <FormControl>
                      <SelectTrigger className="fm-control h-auto">
                        <SelectValue placeholder="Select your role…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={MENU_CLASS} style={MENU_STYLE}>
                      {ROLES.map((r) => (
                        <SelectItem key={r} value={r} className={ITEM_CLASS}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={ERROR_CLASS} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL_CLASS}>
                    Team size{REQUIRED}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} onOpenChange={() => field.onBlur()}>
                    <FormControl>
                      <SelectTrigger className="fm-control h-auto">
                        <SelectValue placeholder="Select your team size…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={MENU_CLASS} style={MENU_STYLE}>
                      {TEAM_SIZES.map((s) => (
                        <SelectItem key={s} value={s} className={ITEM_CLASS}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={ERROR_CLASS} />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <SketchSubmit variant="marker" seed={9} className="w-full text-lg sm:w-auto">
              <span className="inline-flex items-center gap-2">
                Start the audit
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </SketchSubmit>
            <p className="calm-body text-ink/60">Takes about 5 minutes · Results emailed to you</p>
          </div>
        </form>
      </Form>
    </div>
  );
}
