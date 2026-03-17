"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const OUTCOMES = [
  "See your automation score across 3 key areas",
  "Get your top gaps identified and explained clearly",
  "Receive a personalised next step.",
];

const STATS = [
  { number: "10", label: "Questions" },
  { number: "3", label: "Minutes" },
  { number: "1", label: "Clear next step" },
];

export default function HomeAssessmentCtaSection() {
  return (
    <section className="py-10 border-t border-brand-grey/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Card */}
        <div
          className="relative overflow-hidden rounded-2xl bg-brand-black"
          style={{ padding: "clamp(32px, 5vw, 52px) clamp(28px, 5vw, 56px)" }}
        >
          {/* Glow blob */}
          <div
            className="pointer-events-none absolute"
            style={{
              right: "180px",
              top: "-60px",
              width: "280px",
              height: "280px",
              background:
                "radial-gradient(circle, rgba(230,80,50,0.10) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-0">
            {/* ── LEFT: content ─────────────────────────── */}
            <div className="flex-1">
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                  The Automation Gap Audit
                </span>
              </div>

              {/* Headline */}
              <h2 className="mb-7 font-display text-[clamp(24px,3.2vw,34px)] font-semibold leading-[1.12] tracking-tight text-white">
                In 3 minutes, know{" "}
                <em className="not-italic text-brand-orange">exactly</em>{" "}
                what to automate first.
              </h2>

              {/* Outcome list */}
              <ul className="mb-8 flex flex-col gap-2.5">
                {OUTCOMES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-brand-grey">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/10">
                      <Check className="h-2.5 w-2.5 stroke-[2.5] text-brand-orange" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2.5 rounded-md bg-brand-orange px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-brand-orange/90"
                  style={{
                    boxShadow: "0 0 0 0 rgba(230,80,50,0)",
                    transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
                  }}
                >
                  Take the Free Audit
                  <motion.span
                    className="inline-flex"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* ── DIVIDER ───────────────────────────────── */}
            <div className="hidden h-px w-full bg-white/[0.07] sm:block sm:h-auto sm:w-px sm:self-stretch sm:mx-12" />
            <div className="h-px w-full bg-white/[0.07] sm:hidden" />

            {/* ── RIGHT: stats ──────────────────────────── */}
            <div className="flex shrink-0 flex-row justify-around gap-0 sm:flex-col sm:justify-center sm:gap-7">
              {STATS.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div className="flex-1 text-center sm:flex-none">
                    <p
                      className="font-display font-bold leading-none text-brand-orange"
                      style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.03em" }}
                    >
                      {stat.number}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-white/30">
                      {stat.label}
                    </p>
                  </div>
                  {i < STATS.length - 1 && (
                    <>
                      {/* vertical between stats on desktop */}
                      <div className="mx-auto my-0 hidden w-6 sm:block" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
                      {/* vertical divider between stats on mobile */}
                      <div className="flex-0 mx-0 self-stretch sm:hidden" style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
