"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

type ProfileKey = "manual" | "patchwork" | "systems";

type Question = {
  id: string;
  label: string;
  options: AnswerOption[];
};

// ─── Questions ────────────────────────────────────────────────────────────────
// Scoring guide: 3 = strong systems, 2 = partial, 1 = mostly manual, 0 = chaotic/undefined
// Q7 max is 2; all others max 3. Total max = 29.

const QUESTIONS: Question[] = [
  {
    id: "q1",
    label:
      "When you sign a new client, how many different tools, spreadsheets, or group chats does your team have to touch to get them set up?",
    options: [
      { label: "1–2 — it's simple and centralised", value: 3 },
      { label: "3–4 — manageable but a bit scattered", value: 2 },
      { label: "5 or more — it's honestly chaotic", value: 1 },
      { label: "We don't have a set process for this", value: 0 },
    ],
  },
  {
    id: "q2",
    label:
      "Think about your most skilled, highly-paid team members. How much of their week is spent manually moving data between systems, formatting documents, or chasing follow-ups?",
    options: [
      { label: "Almost none — that work is automated or delegated", value: 3 },
      { label: "A few hours — noticeable but manageable", value: 2 },
      { label: "A significant chunk — more than I'd like to admit", value: 1 },
      { label: "Most of their time, honestly", value: 0 },
    ],
  },
  {
    id: "q3",
    label:
      "You've grown past your original core team. Honestly, how are your daily operations running right now?",
    options: [
      { label: "Like clockwork — fully documented and consistent", value: 3 },
      { label: "Mostly fine, but the cracks are showing", value: 1 },
      { label: "Everything runs on memory and goodwill", value: 0 },
    ],
  },
  {
    id: "q4",
    label:
      "What happens right now when a custom proposal needs to go out to a high-value lead?",
    options: [
      { label: "It goes out fast — we have a template and system for it", value: 3 },
      { label: "Someone puts it together manually — takes a few hours", value: 2 },
      { label: "It takes a full day or more and involves several people", value: 1 },
      { label: "It's inconsistent — depends who's available and remembers", value: 0 },
    ],
  },
  {
    id: "q5",
    label:
      "If we decided to automate your biggest bottleneck tomorrow, is that workflow currently documented step-by-step, or does it mostly live in someone's head?",
    options: [
      { label: "Fully documented — we could hand it over today", value: 3 },
      { label: "Partially documented — some key steps are written down", value: 2 },
      { label: "Mostly lives in someone's head", value: 1 },
      { label: "We haven't identified our main bottleneck yet", value: 0 },
    ],
  },
  {
    id: "q6",
    label:
      "Have you tried to build automations (like Zaps or Make scenarios) in the past?",
    options: [
      { label: "Yes — and they still work reliably", value: 3 },
      { label: "Yes — they worked for a while, then broke", value: 2 },
      { label: "Yes — we gave up after it broke", value: 0 },
      { label: "No — we haven't attempted it yet", value: 1 },
    ],
  },
  {
    id: "q7",
    label:
      "If you could completely eliminate one messy, manual task from your team's plate tomorrow, which area is currently causing the biggest drag on your growth?",
    options: [
      { label: "Client onboarding and data setup", value: 1 },
      { label: "Proposal generation and sales follow-ups", value: 1 },
      { label: "Moving data between tools and fixing manual errors", value: 1 },
      { label: "We've mostly addressed our major bottlenecks", value: 3 },
    ],
  },
  {
    id: "q8",
    label:
      "How is your leadership team currently approaching AI and automation?",
    options: [
      {
        label:
          "We're mostly looking for the right AI tools or software to buy to speed things up",
        value: 0,
      },
      {
        label:
          "We know we need to scale, but we need to fix our underlying processes before adding more tools",
        value: 3,
      },
    ],
  },
  {
    id: "q9",
    label:
      "When it comes to solving these operational leaks, what type of help are you actually looking for right now?",
    options: [
      {
        label: "Someone to give us a strategy deck so our team can try to build it",
        value: 1,
      },
      {
        label:
          "A partner to audit the process, build the systems, and hand them over fully documented",
        value: 3,
      },
      { label: "We're just exploring and not ready to bring anyone in", value: 0 },
    ],
  },
  {
    id: "q10",
    label:
      "Be honest: how much longer can your business sustain its current manual workflows before operations start breaking or growth completely stalls?",
    options: [
      { label: "We're already hitting the ceiling — we need to fix this now", value: 0 },
      { label: "We can manage for another 3–6 months, but it's getting painful", value: 1 },
      { label: "We're fine for now, just seeing what's out there", value: 2 },
    ],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
// Max total = 29 (Q7 max 2 due to 3-option scale, all others max 3 each... wait:
// Q1–Q6: max 3 each = 18, Q7 max 3, Q8 max 3, Q9 max 3, Q10 max 2 → total max 29)

const TOTAL_MAX = 29;

function computeOverallScore(answers: Record<string, number>): number {
  const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
  return Math.round((total / TOTAL_MAX) * 100);
}

function buildAnswerLabels(answers: Record<string, number>): Record<string, string> {
  return QUESTIONS.reduce<Record<string, string>>((acc, q) => {
    const selectedValue = answers[q.id];
    const selectedOption = q.options.find((opt) => opt.value === selectedValue);
    if (selectedOption) {
      acc[q.id] = selectedOption.label;
    }
    return acc;
  }, {});
}

function pickProfile(overallPercent: number): ProfileKey {
  if (overallPercent <= 34) return "manual";
  if (overallPercent <= 64) return "patchwork";
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
      const scoreOverall = computeOverallScore(newAnswers);
      const profileKey = pickProfile(scoreOverall);
      const answerLabels = buildAnswerLabels(newAnswers);

      localStorage.setItem(
        "latestAssessmentResult",
        JSON.stringify({
          scoreOverall,
          profile: profileKey,
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
          scoreOverall,
          answers: newAnswers,
          answerLabels,
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
                {step === "intake" ? "About you" : "The Audit"}
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
                  Question {currentQuestion + 1} of {QUESTIONS.length}
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
