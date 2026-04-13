"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeConsultCtaSection() {
  return (
    <section className="py-16 ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl text-center border border-gray-100 bg-gray-50 px-6 py-8 md:px-8 md:py-10">
          <p className="text-[11px] text-center font-semibold uppercase tracking-[0.16em] text-brand-orange">
            Is this for you?
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-brand-black mb-3">
          Find out exactly where your business is leaking time.

          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
          The audit takes five minutes. The results stay with you forever.
          </p>
          <Link
            href="/assessment"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90"
          >
            Take the Free Automation Gap Audit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

