"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IntakeForm } from "./IntakeForm";
import { PageHeader } from "@/components/site/PageHeader";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IntakeData = {
  name: string;
  email: string;
  businessName: string;
  industry: string;
  role: string;
  teamSize: string;
};

type AnswerOption = {
  label: string;
  value: number;
  gap?: string;
};

type ProfileKey = "manual" | "patchwork" | "systems";

type Question = {
  id: string;
  label: string;
  options: AnswerOption[];
};

// ─── Questions ────────────────────────────────────────────────────────────────
// Scoring guide: 3 = strong systems, 2 = partial, 1 = early-stage, 0 = pain/chaotic
// Each pain answer carries a gap string that surfaces on the results page.
// All values within a question are unique to ensure reliable label lookup.
// Total max = 30 (10 questions × max 3 each).

const QUESTIONS: Question[] = [
  {
    id: "q1",
    label:
      "Think about your most skilled, highest-paid team members. How much of their week disappears into admin, data chasing, or fixing manual errors?",
    options: [
      { label: "Very little — that work is automated or off their plate", value: 3 },
      { label: "A few hours — noticeable but we manage", value: 2 },
      {
        label: "A significant chunk — more than I'd like to admit",
        value: 1,
        gap: "Your highest-paid people are burning hours on work a system could handle overnight.",
      },
      {
        label: "Most of their time, honestly",
        value: 0,
        gap: "Your highest-paid people are burning hours on work a system could handle overnight.",
      },
    ],
  },
  {
    id: "q2",
    label:
      "When a new client signs, how many tools, spreadsheets, or group chats does your team have to touch to get them live?",
    options: [
      { label: "1–2 — it's simple and centralised", value: 3 },
      {
        label: "3–4 — manageable but a bit scattered",
        value: 2,
        gap: "Client onboarding is fragmented across too many tools — errors and delays are baked in.",
      },
      {
        label: "5 or more — it's honestly chaotic",
        value: 1,
        gap: "Client onboarding is fragmented across too many tools — errors and delays are baked in.",
      },
      {
        label: "We don't have a consistent onboarding process",
        value: 0,
        gap: "Client onboarding is fragmented across too many tools — errors and delays are baked in.",
      },
    ],
  },
  {
    id: "q3",
    label:
      "If your most critical team member went on leave tomorrow, how much of your daily operations would grind to a halt?",
    options: [
      { label: "Very little — everything is documented and anyone could cover it", value: 3 },
      { label: "Some things would slow down — there are gaps but we'd manage", value: 2 },
      {
        label: "A lot would stop or get messy",
        value: 1,
        gap: "Core operations live in people's heads, not in systems — one absence becomes a crisis.",
      },
      {
        label: "We'd be in serious trouble",
        value: 0,
        gap: "Core operations live in people's heads, not in systems — one absence becomes a crisis.",
      },
    ],
  },
  {
    id: "q4",
    label:
      "How often do leads, renewals, or follow-ups slip through the cracks because no one tracked them?",
    options: [
      { label: "Rarely or never — our pipeline and follow-ups are systematic", value: 3 },
      { label: "Occasionally — we catch most things but not everything", value: 2 },
      {
        label: "Regularly — there's definitely revenue we're missing",
        value: 1,
        gap: "Leads and renewal opportunities are being lost to manual follow-up processes that aren't reliable.",
      },
      {
        label: "Honestly, we don't know what we're missing",
        value: 0,
        gap: "Leads and renewal opportunities are being lost to manual follow-up processes that aren't reliable.",
      },
    ],
  },
  {
    id: "q5",
    label:
      "When leadership needs an accurate, real-time answer about the business today, how quickly can you actually get it?",
    options: [
      { label: "Instantly — it's in a live dashboard we trust", value: 3 },
      {
        label: "Within a day — someone needs to pull it from a few different places",
        value: 2,
        gap: "Decision-making is slowed by data scattered across tools that can't be trusted without manual checks.",
      },
      {
        label: "It takes days, and may not be fully accurate",
        value: 1,
        gap: "Decision-making is slowed by data scattered across tools that can't be trusted without manual checks.",
      },
      {
        label: "We're mostly making decisions without real data",
        value: 0,
        gap: "Decision-making is slowed by data scattered across tools that can't be trusted without manual checks.",
      },
    ],
  },
  {
    id: "q6",
    label:
      "If we decided to automate your biggest operational bottleneck tomorrow, is that workflow documented step-by-step — or does it mostly live in someone's head?",
    options: [
      { label: "Fully documented — we could hand it over today", value: 3 },
      { label: "Partially — the key steps are written down somewhere", value: 2 },
      {
        label: "Mostly lives in one person's head",
        value: 1,
        gap: "Your biggest bottleneck can't be automated yet — the process isn't documented well enough to build on.",
      },
      {
        label: "We haven't identified our main bottleneck yet",
        value: 0,
        gap: "Your biggest bottleneck can't be automated yet — the process isn't documented well enough to build on.",
      },
    ],
  },
  {
    id: "q7",
    label:
      "Have you tried to build automations before — Zaps, Make scenarios, or anything similar?",
    options: [
      { label: "Yes — and they still run reliably today", value: 3 },
      {
        label: "Yes — they worked for a while, then broke",
        value: 2,
        gap: "Past automation attempts broke because the underlying process wasn't fixed first — systems built on unstable foundations always collapse.",
      },
      { label: "No — we haven't tried yet", value: 1 },
      {
        label: "Yes — it broke and we gave up entirely",
        value: 0,
        gap: "Past automation attempts broke because the underlying process wasn't fixed first — systems built on unstable foundations always collapse.",
      },
    ],
  },
  {
    id: "q8",
    label:
      "How is your leadership team currently thinking about AI and automation?",
    options: [
      {
        label: "We're focused on fixing our processes first, then automating what works",
        value: 3,
      },
      {
        label: "We know we need to change but aren't sure where to start",
        value: 2,
        gap: "Without a process-first strategy, new tools will automate the chaos rather than eliminate it.",
      },
      {
        label: "We're mainly looking for AI tools or software to speed things up",
        value: 0,
        gap: "Without a process-first strategy, new tools will automate the chaos rather than eliminate it.",
      },
    ],
  },
  {
    id: "q9",
    label:
      "If you doubled your client base next quarter with your current team and processes, what would actually happen?",
    options: [
      { label: "We'd handle it — our systems can scale", value: 3 },
      { label: "It would be tough, but manageable with real effort", value: 2 },
      {
        label: "We'd miss deliverables, burn out the team, or lose clients",
        value: 1,
        gap: "Your current operations can't absorb growth without things breaking or quality dropping.",
      },
      {
        label: "Honestly, it would be a disaster",
        value: 0,
        gap: "Your current operations can't absorb growth without things breaking or quality dropping.",
      },
    ],
  },
  {
    id: "q10",
    label:
      "Be honest: how much longer can your current manual workflows hold before something breaks or growth completely stalls?",
    options: [
      {
        label: "We're already hitting the ceiling — this needs fixing now",
        value: 0,
        gap: "The window to fix this before it costs you clients or team members is already closing.",
      },
      {
        label: "3–6 months — it's getting painful and we know it",
        value: 1,
        gap: "The window to fix this before it costs you clients or team members is already closing.",
      },
      { label: "We have some runway, but we can see the wall coming", value: 2 },
      { label: "We're in good shape for the foreseeable future", value: 3 },
    ],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
// 10 questions × max 3 each = 30 total max.

const TOTAL_MAX = 30;

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

export function AutomationAssessment() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("intake");
  const [intake, setIntake] = useState<IntakeData>({
    name: "",
    email: "",
    businessName: "",
    industry: "",
    role: "",
    teamSize: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [gaps, setGaps] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  /** Which step of the audit the user is viewing (1-based). Matches "Question X of Y" in the card. */
  const auditStepDisplay =
    step === "questions" ? currentQuestion + 1 : 0;
  const progressPercent =
    step === "questions"
      ? Math.round((auditStepDisplay / QUESTIONS.length) * 100)
      : 0;

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

    // Track per-question gap: set or clear based on selected option
    const q = QUESTIONS.find((q) => q.id === questionId);
    const selectedOption = q?.options.find((opt) => opt.value === value);
    const newGaps = { ...gaps };
    if (selectedOption?.gap) {
      newGaps[questionId] = selectedOption.gap;
    } else {
      delete newGaps[questionId];
    }
    setGaps(newGaps);

    const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

    if (isLastQuestion) {
      const scoreOverall = computeOverallScore(newAnswers);
      const profileKey = pickProfile(scoreOverall);
      const answerLabels = buildAnswerLabels(newAnswers);
      const gapsList = Object.values(newGaps);

      localStorage.setItem(
        "latestAssessmentResult",
        JSON.stringify({
          scoreOverall,
          profile: profileKey,
          name: intake.name,
          email: intake.email,
          businessName: intake.businessName,
          industry: intake.industry,
          role: intake.role,
          teamSize: intake.teamSize,
          gaps: gapsList,
          completedAt: new Date().toISOString(),
        })
      );

      // Fire-and-forget: send results to MailerLite + Make webhook
      fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: intake.name,
          email: intake.email,
          businessName: intake.businessName,
          industry: intake.industry,
          role: intake.role,
          teamSize: intake.teamSize,
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
  const shownPercent = step === "intake" ? 0 : progressPercent;

  return (
    <div className="cols-8">
      <PageHeader
        label="Free diagnostic"
        title="The Automation Gap Audit"
        mark="Gap"
        seed={43}
        lede="10 quick questions to find out where your operations are leaking time, money, and leads, and exactly what to do next."
        className="mb-10"
      />

      {/* Progress: a thin ink bar on a hairline track */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="gl-mono text-ink/70">{step === "intake" ? "About you" : "The Audit"}</p>
          <p className="gl-mono tabular-nums text-ink/60">
            {auditStepDisplay} / {QUESTIONS.length}
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Audit progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={shownPercent}
          className="h-[3px] w-full bg-ink/[0.15]"
        >
          <div className="h-full bg-ink transition-[width] duration-300" style={{ width: `${shownPercent}%` }} />
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
          >
            <div className="calm-card p-6 md:p-7">
              <p className="gl-mono text-ink/60">
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </p>
              <h2 className="calm-h3 mt-3">{currentQ.label}</h2>
              <div className="mt-6 flex flex-col gap-2.5">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    aria-pressed={answers[currentQ.id] === opt.value}
                    onClick={() => handleAnswer(currentQ.id, opt.value)}
                    className="fm-option"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button: only on questions, only goes to previous question */}
      {step === "questions" && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setCurrentQuestion((i) => Math.max(0, i - 1))}
            disabled={currentQuestion === 0}
            className="gl-mono -ml-1 px-1 py-3 text-ink/60 underline-offset-4 hover:text-ink hover:underline focus-visible:underline disabled:cursor-default disabled:opacity-40 disabled:no-underline"
          >
            ← Previous question
          </button>
        </div>
      )}
    </div>
  );
}
