"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { SketchButton } from "@/components/site/SketchButton";

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
    <article className="cols-8">
      <Link
        href="/assessment"
        className="gl-mono inline-block py-2 text-ink/70 underline-offset-4 hover:text-ink hover:underline focus-visible:underline"
      >
        ← The Automation Gap Audit
      </Link>

      {loaded && (
        <motion.div initial="initial" animate="animate" variants={stagger} className="mt-6 space-y-8">
          {/* ── Result header ─────────────────────────────── */}
          <motion.header variants={fadeUp}>
            <p className="gl-mono text-ink/60">The Automation Gap Audit · Your diagnostic</p>
            <p className={`gl-mono mt-4 inline-block px-3 py-1.5 ${config.accentColor}`}>{config.label}</p>
            <h1 className="sk-title mt-5">
              {firstName ? `${firstName}, ${config.tagline}` : config.tagline}
            </h1>
            <p className="pg-lede mt-5">{config.description}</p>
          </motion.header>

          {/* ── Gaps diagnostic ───────────────────────────── */}
          <motion.div variants={fadeUp} className="calm-card p-6 md:p-7">
            <p className="gl-mono text-ink/60">What your answers tell us</p>
            <ul className="mt-5 flex flex-col gap-4">
              {detectedGaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-ink" />
                  <span className="calm-body">{gap}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Book-a-call CTA ───────────────────────────── */}
          <motion.div variants={fadeUp}>
            <aside className="bg-ink p-6 text-sage md:p-8">
              <h2 className="font-[family-name:var(--font-brule)] text-[clamp(1.5rem,2.2vw,1.9rem)] font-semibold leading-tight">
                Here&apos;s what I&apos;d do with your results.
              </h2>
              <p className="calm-body mt-4 max-w-xl text-sage/90">
                You&apos;ve identified the gaps. Now let&apos;s make sense of them together.
                Book a 30-minute call and I&apos;ll have your audit results in front of me so we can talk through what&apos;s actually going on, what&apos;s worth fixing first, and whether working together makes sense.
              </p>
              <div className="mt-6">
                <SketchButton
                  href="https://calendar.app.google/2NrpG6HXaqkdSURXA"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="marker"
                  seed={12}
                  className="text-lg"
                >
                  <span className="inline-flex items-center gap-2">
                    Book your 20-minute audit review
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </SketchButton>
              </div>
            </aside>
          </motion.div>

          {/* ── Retake link ───────────────────────────────── */}
          <motion.div variants={fadeUp} className="pb-8">
            <Link
              href="/assessment"
              className="gl-mono inline-flex items-center gap-2 py-2 text-ink/70 underline-offset-4 hover:text-ink hover:underline focus-visible:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Retake the audit
            </Link>
          </motion.div>
        </motion.div>
      )}
    </article>
  );
}
