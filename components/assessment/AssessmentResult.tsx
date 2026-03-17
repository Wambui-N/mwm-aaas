"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, RotateCcw } from "lucide-react";

type Area = "operations" | "clients" | "tools";

type Scores = {
  operations: number;
  clients: number;
  tools: number;
  overall: number;
};

type StoredResult = {
  scores: Scores;
  profile: "manual" | "patchwork" | "systems";
  name?: string;
  email?: string;
  completedAt?: string;
};

type GapCard = {
  title: string;
  body: string;
  cta: string;
  href: string;
};

type ResultConfig = {
  profileKey: "manual" | "patchwork" | "systems";
  label: string;
  tagline: string;
  description: string;
  scoreRange: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
  primaryCta: { label: string; href: string };
  gapCards: GapCard[];
  areasToFocus: Area[];
};

const AREA_LABELS: Record<Area, string> = {
  operations: "Operations & Workflows",
  clients: "Client & Lead Management",
  tools: "Tools & Systems",
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-brand-black tabular-nums">
          {value}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-brand-orange"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

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
          // Profile mismatch — still show static page but without personalised scores
          setResult(null);
        }
      }
    } catch {
      // ignore localStorage errors
    }
    setLoaded(true);
  }, [config.profileKey]);

  const scores = result?.scores ?? null;
  const firstName = result?.name?.split(" ")[0] ?? null;

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
                {firstName ? `${firstName}, ${config.tagline}` : config.tagline}
              </h1>
              <p className="text-gray-600 leading-relaxed">{config.description}</p>
            </motion.div>

            {/* ── Score breakdown ───────────────────────────── */}
            {scores && (
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-gray-100 bg-white px-6 py-6 shadow-sm"
              >
                <h2 className="text-sm font-semibold text-brand-black mb-1">
                  Your scores
                </h2>
                <p className="text-xs text-gray-400 mb-5">
                  Overall: {scores.overall}%
                </p>
                <motion.div
                  variants={stagger}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  {(["operations", "clients", "tools"] as Area[]).map((a) => (
                    <ScoreBar
                      key={a}
                      label={AREA_LABELS[a]}
                      value={scores[a]}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ── Gap cards ─────────────────────────────────── */}
            <motion.div variants={fadeUp}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
                Where to focus first
              </h2>
              <div className="space-y-3">
                {config.gapCards.map((card, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm"
                  >
                    <h3 className="font-semibold text-brand-black mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {card.body}
                    </p>
                    <Link
                      href={card.href}
                      className="inline-flex items-center text-sm font-medium text-brand-orange hover:underline"
                    >
                      {card.cta}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Primary CTA ───────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-brand-black px-6 py-8 text-white text-center"
            >
              <h2 className="text-xl font-display font-semibold mb-2">
                Ready to close the gaps?
              </h2>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                {config.primaryCta.label === "Get the free checklist"
                  ? "Start with the 10 highest-impact workflows to automate — a free step-by-step guide."
                  : "Let's figure out exactly what to automate first, and build it with you."}
              </p>
              <Link
                href={config.primaryCta.href}
                className="inline-flex items-center rounded-lg bg-brand-orange px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
              >
                {config.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
