"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EXAMPLE_CASE_STUDIES = [
  {
    title: "From Lead Chaos to Reliable Follow-up",
    summary:
      "A service business was missing warm leads because follow-up depended on memory. We rebuilt intake and follow-up into one flow and recovered high-intent opportunities.",
    href: "/blog?tag=Case%20Study",
  },
  {
    title: "Reporting Cut from Hours to Minutes",
    summary:
      "Weekly updates were stitched together manually across tools. We automated data collection and delivery, giving the team faster decisions with less admin work.",
    href: "/blog?tag=Case%20Study",
  },
];

export default function CaseStudyHighlightSection() {
  return (
    <section className="py-10 border-t border-brand-grey/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl p-5 sm:p-6"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
              Proof it works
            </p>
            <h2 className="mt-4 text-2xl font-display font-semibold leading-tight text-brand-black md:text-4xl">
              What a real before and after
              <br />
              looks like.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              Numbers matter more than promises. Here&apos;s what actually changed
              for a client after we built their system.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {EXAMPLE_CASE_STUDIES.map((study) => (
              <article
                key={study.title}
                className="group rounded-xl border border-brand-grey/50 bg-white p-5 sm:p-6"
              >
                <h3 className="text-xl font-display font-semibold leading-snug text-brand-black">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {study.summary}
                </p>
                <Link
                  href={study.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-orange hover:underline"
                >
                  Read case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
