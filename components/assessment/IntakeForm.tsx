"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
        Before we begin
      </p>
      <h2 className="text-lg md:text-xl font-semibold text-brand-black mb-6 leading-snug">
        Let&apos;s start with the basics.
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onComplete)}
          noValidate
          className="flex flex-col gap-4"
        >
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    First name <span className="text-brand-orange">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="given-name"
                      placeholder="Your first name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Work email <span className="text-brand-orange">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Business Name + Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Business name <span className="text-brand-orange">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="organization"
                      placeholder="Your business name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Industry <span className="text-brand-orange">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    onOpenChange={() => field.onBlur()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Role + Team Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Role <span className="text-brand-orange">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    onOpenChange={() => field.onBlur()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Team size <span className="text-brand-orange">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    onOpenChange={() => field.onBlur()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your team size…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TEAM_SIZES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="mt-2 w-full sm:w-auto gap-2"
          >
            Start the audit
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-center text-xs text-gray-400">
            Takes about 5 minutes · Results emailed to you
          </p>
        </form>
      </Form>
    </div>
  );
}
