"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { IntakeForm } from "./IntakeForm";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IntakeData = {
  name: string;
  email: string;
  industry: string;
};

type AnswerOption = {
  label: string;
  value: number;
};

type Area = "operations" | "clients" | "tools";
type ProfileKey = "manual" | "patchwork" | "systems";

type Question = {
  id: string;
  area: Area;
  label: string;
  options: AnswerOption[];
};

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: "q1",
    area: "operations",
    label:
      "When you sign a new client, how many different tools, spreadsheets, or group chats does your team have to touch to get them set up?",
    options: [
      { label: "1–2 — it's simple and centralised", value: 3 },
      { label: "3–4 — manageable but scattered", value: 2 },
      { label: "5 or more — it's honestly chaotic", value: 1 },
      { label: "We don't have a set process for this", value: 0 },
    ],
  },
  {
    id: "q2",
    area: "operations",
    label:
      "Think about your most skilled, highly-paid team members. How much of their week is spent manually moving data, formatting documents, or chasing follow-ups?",
    options: [
      { label: "Almost none — that work is automated or delegated", value: 3 },
      { label: "A few hours — it's annoying but manageable", value: 2 },
      { label: "A significant chunk — more than I'd like to admit", value: 1 },
      { label: "Most of their time, honestly", value: 0 },
    ],
  },
  {
    id: "q3",
    area: "operations",
    label:
      "You've grown past your original core team. Honestly, how are your daily operations running right now?",
    options: [
      { label: "Like clockwork — fully documented and consistent", value: 3 },
      { label: "Mostly fine, but the cracks are starting to show", value: 2 },
      { label: "Everything runs on memory and goodwill", value: 0 },
    ],
  },
  {
    id: "q4",
    area: "clients",
    label:
      "When a high-value lead comes in right now — how long before they hear from you, and who is responsible for making that happen?",
    options: [
      { label: "Within minutes — it's automated and consistent", value: 3 },
      { label: "Within a few hours — someone picks it up manually", value: 2 },
      { label: "It depends on who sees it first", value: 1 },
      { label: "Honestly, some fall through the cracks", value: 0 },
    ],
  },
  {
    id: "q5",
    area: "clients",
    label:
      "Has a lead, proposal, or unpaid invoice ever gone quiet because the follow-up just didn't happen?",
    options: [
      { label: "Never — we have a reliable system for this", value: 3 },
      { label: "Rarely — but it has happened", value: 2 },
      { label: "More often than I'd like", value: 1 },
      { label: "Regularly — it's a known problem", value: 0 },
    ],
  },
  {
    id: "q6",
    area: "clients",
    label:
      "What happens right now when a custom proposal needs to go out to a high-value lead?",
    options: [
      { label: "It goes out fast — we have a template and system for it", value: 3 },
      { label: "Someone puts it together manually — takes a few hours", value: 2 },
      { label: "It takes a day or more and involves several people", value: 1 },
      { label: "It's inconsistent — depends on who's available", value: 0 },
    ],
  },
  {
    id: "q7",
    area: "tools",
    label:
      "Your team copies data between tools by hand — because the tools don't talk to each other.",
    options: [
      { label: "Never — our tools are connected", value: 3 },
      { label: "Occasionally for edge cases", value: 2 },
      { label: "Regularly for certain workflows", value: 1 },
      { label: "Constantly — it's how most things get done", value: 0 },
    ],
  },
  {
    id: "q8",
    area: "tools",
    label:
      "If we decided to automate your biggest bottleneck tomorrow — is that workflow currently documented step by step, or does it mostly live in someone's head?",
    options: [
      { label: "Fully documented — we could hand it over today", value: 3 },
      { label: "Partially documented — some of it is written down", value: 2 },
      { label: "Mostly in people's heads", value: 1 },
      { label: "What bottleneck? We haven't identified it yet", value: 0 },
    ],
  },
  {
    id: "q9",
    area: "tools",
    label:
      "Have you tried to build automations before — a Zap, a Make scenario, a spreadsheet formula — and watched it quietly break within a few weeks?",
    options: [
      { label: "No — we haven't tried yet", value: 2 },
      { label: "Yes — and it still works", value: 3 },
      { label: "Yes — and it broke, we're not sure why", value: 1 },
      { label: "Yes — and we gave up after it broke", value: 0 },
    ],
  },
  {
    id: "q10",
    area: "tools",
    label: "How many people are currently on your team, including yourself?",
    options: [
      { label: "Just me (1–2 people)", value: 1 },
      { label: "Small team (3–10 people)", value: 2 },
      { label: "Growing team (11–30 people)", value: 3 },
      { label: "Established team (30+ people)", value: 2 },
    ],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────

type RawScores = {
  operations: number; // max 9
  clients: number;    // max 9
  tools: number;      // max 11
};

type Scores = {
  operations: number; // percentage
  clients: number;
  tools: number;
  overall: number;
};

const AREA_MAX: Record<Area, number> = {
  operations: 9,
  clients: 9,
  tools: 11,
};
const TOTAL_MAX = 29;

function computeRawScores(answers: Record<string, number>): RawScores {
  const ops = (answers["q1"] ?? 0) + (answers["q2"] ?? 0) + (answers["q3"] ?? 0);
  const cli = (answers["q4"] ?? 0) + (answers["q5"] ?? 0) + (answers["q6"] ?? 0);
  const tls =
    (answers["q7"] ?? 0) +
    (answers["q8"] ?? 0) +
    (answers["q9"] ?? 0) +
    (answers["q10"] ?? 0);
  return { operations: ops, clients: cli, tools: tls };
}

function computeScores(raw: RawScores): Scores {
  const total = raw.operations + raw.clients + raw.tools;
  return {
    operations: Math.round((raw.operations / AREA_MAX.operations) * 100),
    clients: Math.round((raw.clients / AREA_MAX.clients) * 100),
    tools: Math.round((raw.tools / AREA_MAX.tools) * 100),
    overall: Math.round((total / TOTAL_MAX) * 100),
  };
}

function pickDiagnosisArea(raw: RawScores): Area {
  // Normalise to percentages for fair comparison
  const pcts: Record<Area, number> = {
    operations: raw.operations / AREA_MAX.operations,
    clients: raw.clients / AREA_MAX.clients,
    tools: raw.tools / AREA_MAX.tools,
  };
  // Tie-break order: clients > operations > tools
  const order: Area[] = ["clients", "operations", "tools"];
  return order.reduce((lowest, area) =>
    pcts[area] < pcts[lowest] ? area : lowest
  );
}

function pickProfile(overallPercent: number): ProfileKey {
  if (overallPercent <= 35) return "manual";
  if (overallPercent <= 65) return "patchwork";
  return "systems";
}

const PROFILE_SLUG: Record<ProfileKey, string> = {
  manual: "manual-machine",
  patchwork: "patchwork-operator",
  systems: "systems-builder",
};

const PROFILE_LABEL: Record<ProfileKey, string> = {
  manual: "The Manual Machine",
  patchwork: "The Patchwork Operator",
  systems: "The Systems Builder",
};

const AREA_LABEL: Record<Area, string> = {
  operations: "Operations",
  clients: "Client management",
  tools: "Your tools",
};

// ─── Main component ───────────────────────────────────────────────────────────

type Step = "intake" | "questions";

export function AutomationAssessment({ fullPage }: { fullPage?: boolean }) {
  const router = useRouter();

  const [step, setStep] = useState<Step>("intake");
  const [intake, setIntake] = useState<IntakeData>({
    name: "",
    email: "",
    industry: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);

  // Keyboard: left arrow goes to previous question (but not back to intake)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowLeft" && step === "questions") {
        setCurrentQuestion((i) => Math.max(0, i - 1));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const handleIntakeComplete = (data: IntakeData) => {
    setIntake(data);
    setStep("questions");
  };

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

    if (isLastQuestion) {
      // Compute and save, then navigate
      const raw = computeRawScores(newAnswers);
      const scores = computeScores(raw);
      const diagnosisArea = pickDiagnosisArea(raw);
      const profileKey = pickProfile(scores.overall);

      localStorage.setItem(
        "latestAssessmentResult",
        JSON.stringify({
          scores,
          rawScores: raw,
          profile: profileKey,
          diagnosisArea,
          name: intake.name,
          email: intake.email,
          industry: intake.industry,
          completedAt: new Date().toISOString(),
        })
      );

      // Fire-and-forget: send results to MailerLite (errors are silently logged)
      fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: intake.name,
          email: intake.email,
          industry: intake.industry,
          profile: profileKey,
          profileLabel: PROFILE_LABEL[profileKey],
          diagnosisArea,
          scoreOverall: scores.overall,
          scoreOperations: scores.operations,
          scoreClients: scores.clients,
          scoreTools: scores.tools,
        }),
      }).catch((err) => console.error("[assessment] submit error:", err));

      router.push(`/assessment/results/${PROFILE_SLUG[profileKey]}`);
    } else {
      setTimeout(() => {
        setCurrentQuestion((i) => Math.min(i + 1, QUESTIONS.length - 1));
      }, 180);
    }
  };

  const currentQ = QUESTIONS[currentQuestion];

  return (
    <div className={`${fullPage ? "min-h-screen flex items-center justify-center " : ""}`}>
      <div className="w-full">
        <div className="mx-auto max-w-2xl">
          {/* Brand wordmark */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-black/60">
              Made with Make
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-black/40">
              The Automation Gap Audit
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {step === "intake"
                  ? "About you"
                  : currentQ?.area === "operations"
                  ? "Operations"
                  : currentQ?.area === "clients"
                  ? "Client management"
                  : "Your tools"}
              </div>
              <div className="text-xs text-gray-400 tabular-nums">
                {step === "intake" ? "0" : answeredCount} / {QUESTIONS.length}
              </div>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-brand-orange"
                initial={false}
                animate={{ width: step === "intake" ? "0%" : `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ─── INTAKE ──────────────────────────────────── */}
            {step === "intake" && (
              <motion.div
                key="intake"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <IntakeForm onComplete={handleIntakeComplete} />
              </motion.div>
            )}

            {/* ─── QUESTIONS ───────────────────────────────── */}
            {step === "questions" && currentQ && (
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
                  {AREA_LABEL[currentQ.area]}
                </p>
                <h2 className="text-lg md:text-xl font-semibold text-brand-black mb-6 leading-snug">
                  {currentQ.label}
                </h2>
                <div className="flex flex-col gap-2">
                  {currentQ.options.map((opt) => {
                    const selected = answers[currentQ.id] === opt.value;
                    return (
                      <motion.button
                        key={opt.label}
                        onClick={() => handleAnswer(currentQ.id, opt.value)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left rounded-lg border px-4 py-3.5 text-sm font-medium transition-colors ${
                          selected
                            ? "bg-brand-black border-brand-black text-white"
                            : "bg-white border-gray-200 text-gray-800 hover:border-brand-orange/60 hover:bg-brand-orange/5"
                        }`}
                      >
                        {opt.label}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back button — only on questions, only goes to previous question */}
          {step === "questions" && (
            <div className="mt-4">
              <button
                onClick={() => setCurrentQuestion((i) => Math.max(0, i - 1))}
                disabled={currentQuestion === 0}
                className="text-sm text-brand-black/50 hover:text-brand-black/80 transition-colors"
              >
                ← Previous question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
