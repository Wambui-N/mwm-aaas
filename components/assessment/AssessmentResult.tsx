"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, RotateCcw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileKey = "manual" | "patchwork" | "systems";

type StoredResult = {
  scoreOverall: number;
  profile: ProfileKey;
  name?: string;
  email?: string;
  businessName?: string;
  industry?: string;
  role?: string;
  teamSize?: string;
  gaps?: string[];
  completedAt?: string;
};

export type ResultConfig = {
  profileKey: ProfileKey;
  label: string;
  tagline: string;
  description: string;
  accentColor: string;
};

// ─── Per-profile fallback gaps (shown when localStorage is empty / cleared) ──

const FALLBACK_GAPS: Record<ProfileKey, string[]> = {
  manual: [
    "Your highest-paid people are likely burning hours on work a system could handle overnight.",
    "Core operations probably live in people's heads, not in documented systems.",
    "Leads and renewal opportunities may be slipping through gaps in manual processes.",
  ],
  patchwork: [
    "Automated workflows are fragile — they break when the process underneath changes.",
    "Data is scattered across tools and can't be trusted without manual checks.",
    "Growth will require fixing the underlying processes before adding more automation.",
  ],
  systems: [
    "There are likely high-leverage workflows left that could compound your existing gains.",
    "Optimising what you've built could unlock the next level of scale.",
    "The gaps that remain are worth mapping before business complexity grows further.",
  ],
};

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

  const firstName = result?.name?.split(" ")[0] ?? null;
  const detectedGaps =
    result?.gaps && result.gaps.length > 0
      ? result.gaps
      : FALLBACK_GAPS[config.profileKey];

  return (
    <article className="max-w-3xl mx-auto px-6">
      {/* Back link — matches blog/resources detail style */}
      <Link
        href="/assessment"
        className="text-sm text-gray-500 hover:text-brand-black inline-flex items-center gap-1 transition-colors"
      >
        ← The Automation Gap Audit
      </Link>

      {loaded && (
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="mt-8 space-y-6"
        >
          {/* ── Page-style result header ───────────────────── */}
          <motion.header variants={fadeUp}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
              The Automation Gap Audit · Your diagnostic
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wide ${config.accentColor}`}
              >
                {config.label}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-brand-black leading-tight mb-4">
              {firstName
                ? `${firstName}, ${config.tagline}`
                : config.tagline}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {config.description}
            </p>
          </motion.header>

          {/* ── Gaps diagnostic card ──────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-gray-100 bg-white px-6 py-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
              What your answers tell us
            </p>
            <ul className="flex flex-col gap-3">
              {detectedGaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-brand-orange" />
                  <span className="text-sm text-gray-700 leading-relaxed">{gap}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Book-a-call CTA ───────────────────────────── */}
          <motion.div variants={fadeUp}>
            <aside className="rounded-2xl bg-brand-black px-6 py-6 text-white">
              <div className="grid gap-4 md:grid-cols-[1.6fr,auto] md:items-center">
                <div>
                  <h2 className="text-xl font-display font-semibold mb-2">
                    Let&apos;s walk through your results together.
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    This is a free 30-minute diagnostic call — we&apos;ll look at your answers together and give you a clear picture of exactly where to focus first.
                  </p>
                </div>
                <div>
                  <a
                    href="https://calendar.app.google/gPVfLMV1agnjMBUd6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-medium text-brand-black transition-colors hover:bg-brand-orange/90 whitespace-nowrap"
                  >
                    Book your diagnostic call
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </aside>
          </motion.div>

          {/* ── Retake link ───────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 pb-8"
          >
            <Link
              href="/assessment"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-black transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake the audit
            </Link>
          </motion.div>
        </motion.div>
      )}
    </article>
  );
}
