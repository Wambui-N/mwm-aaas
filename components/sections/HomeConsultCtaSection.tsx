"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeConsultCtaSection() {
  return (
    <section className="py-16 ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl text-center border border-gray-100 bg-gray-50 px-6 py-8 md:px-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-3">
            Free consultation
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-brand-black mb-3">
            Want help automating your business?
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
            If you&apos;d like to talk through how automation or AI could work
            in your own setup, you can request a free consultation and we&apos;ll
            figure out what makes sense together.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90"
          >
            Get a free consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

