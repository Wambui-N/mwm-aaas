"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, RotateCcw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileKey = "manual" | "patchwork" | "systems";

type StoredResult = {
  scoreOverall: number;
  profile: ProfileKey;
  name?: string;
  email?: string;
  industry?: string;
  completedAt?: string;
};

export type ResultConfig = {
  profileKey: ProfileKey;
  label: string;
  tagline: string;
  description: string;
  scoreRange: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
};

// ─── Score tier ───────────────────────────────────────────────────────────────

const TIER_LABELS = [
  { min: 0, max: 34, label: "Manual Risk Zone", color: "text-red-600" },
  { min: 35, max: 64, label: "Patchwork Zone", color: "text-amber-600" },
  { min: 65, max: 100, label: "Scale-Ready Zone", color: "text-emerald-600" },
];

function getTierLabel(pct: number) {
  return (
    TIER_LABELS.find((t) => pct >= t.min && pct <= t.max) ?? TIER_LABELS[0]
  );
}

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// ─── Main component ───────────────────────────────────────────────────────────

export function AssessmentResult({ config }: { config: ResultConfig }) {
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("latestAssessmentResult");
      if (raw) {
        const parsed: StoredResult = JSON.parse(raw);
        if (parsed.profile === config.profileKey) {
          setResult(parsed);
        } else {
          setResult(null);
        }
      }
    } catch {
      // ignore localStorage errors
    }
    setLoaded(true);
  }, [config.profileKey]);

  const scoreOverall = result?.scoreOverall ?? null;
  const firstName = result?.name?.split(" ")[0] ?? null;
  const tier = scoreOverall !== null ? getTierLabel(scoreOverall) : null;

  return (
    <div className="min-h-screen bg-gray-50/60 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Top wordmark / nav */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-black/60 hover:text-brand-black transition-colors"
          >
            Made with Make
          </Link>
          <Link
            href="/assessment"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-black transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Retake audit
          </Link>
        </div>

        {loaded && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-6"
          >
            {/* ── Profile hero card ─────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className={`rounded-2xl border ${config.borderColor} ${config.accentBg} px-6 py-8`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                The Automation Gap Audit · Your result
              </p>
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <span
                  className={`inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wide ${config.accentColor}`}
                >
                  {config.label}
                </span>
                <span className="text-xs text-gray-500 pt-1">
                  {config.scoreRange}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-semibold text-brand-black leading-snug mb-3">
                {firstName
                  ? `${firstName}, ${config.tagline}`
                  : config.tagline}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {config.description}
              </p>
            </motion.div>

            {/* ── Overall score ─────────────────────────────── */}
            {scoreOverall !== null && tier && (
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-gray-100 bg-white px-6 py-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
                  Overall Automation Readiness
                </p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-5xl font-display font-bold text-brand-black tabular-nums leading-none">
                    {scoreOverall}
                  </span>
                  <span className="text-xl font-semibold text-gray-300 leading-none mb-1">
                    / 100
                  </span>
                  <span className={`text-sm font-semibold mb-1 ${tier.color}`}>
                    {tier.label}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className="h-full rounded-full bg-brand-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `${scoreOverall}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            {/* ── CTA ──────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-brand-black px-6 py-6 text-white"
            >
              <div className="grid gap-4 md:grid-cols-[1.6fr,auto] md:items-center">
                <div>
                  <h2 className="text-xl font-display font-semibold mb-2">
                    Want help automating your business?
                  </h2>
                  <p className="text-sm text-gray-300">
                    If you'd like to talk through how automation or AI could work in your own setup, you can request a free consultation and we'll figure out what makes sense together.
                  </p>
                </div>
                <div>
                  <a
                    href="https://calendar.app.google/gPVfLMV1agnjMBUd6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-medium text-brand-black transition-colors hover:bg-brand-orange/90 whitespace-nowrap"
                  >
                    Book a free discovery call
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ── Secondary nav ─────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center pb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-black transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                Back to homepage
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
