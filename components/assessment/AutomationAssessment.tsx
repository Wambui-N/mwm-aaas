"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type PageType = "intro" | "question" | "contact";
type Area = "operations" | "clients" | "tools";
type ProfileKey = "manual" | "patchwork" | "systems";

type Question = {
  id: string;
  area: Area;
  label: string;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    area: "operations",
    label:
      "We have clear, written processes for our core workflows (onboarding, delivery, reporting).",
  },
  {
    id: "q2",
    area: "operations",
    label:
      "Most repeatable tasks are already templatized (documents, emails, task lists).",
  },
  {
    id: "q3",
    area: "operations",
    label:
      "Work rarely gets stuck on one person — if someone is away, the workflow still moves.",
  },
  {
    id: "q4",
    area: "clients",
    label:
      "New enquiries always get a fast, consistent response (within a few minutes or hours).",
  },
  {
    id: "q5",
    area: "clients",
    label:
      "We have a reliable system for following up on leads, proposals, and unpaid invoices.",
  },
  {
    id: "q6",
    area: "clients",
    label:
      "Clients know exactly what will happen next at each stage of working with us.",
  },
  {
    id: "q7",
    area: "tools",
    label:
      "Our key tools (CRM, project management, billing, forms) are connected — we rarely copy-paste data.",
  },
  {
    id: "q8",
    area: "tools",
    label:
      "We track the right data in the right tools, and it is easy to pull basic reports.",
  },
  {
    id: "q9",
    area: "tools",
    label:
      "We already use some automations (e.g. task creation, notifications, document generation) in our day-to-day work.",
  },
  {
    id: "q10",
    area: "tools",
    label:
      "When we add a new tool, we think about how it fits into the rest of our systems (not as a one-off workaround).",
  },
];

const ANSWER_OPTIONS = [
  { value: 0, label: "Not at all true" },
  { value: 1, label: "Sometimes true" },
  { value: 2, label: "Mostly true" },
  { value: 3, label: "Fully true" },
];

type Scores = {
  operations: number;
  clients: number;
  tools: number;
  overall: number;
};

function computeScores(answers: Record<string, number | null>): Scores | null {
  const areaTotals: Record<Area, { sum: number; count: number }> = {
    operations: { sum: 0, count: 0 },
    clients: { sum: 0, count: 0 },
    tools: { sum: 0, count: 0 },
  };

  for (const q of QUESTIONS) {
    const value = answers[q.id];
    if (value == null) return null;
    areaTotals[q.area].sum += value;
    areaTotals[q.area].count += 1;
  }

  const areaPercents: Record<Area, number> = {
    operations:
      (areaTotals.operations.sum / (areaTotals.operations.count * 3)) * 100,
    clients: (areaTotals.clients.sum / (areaTotals.clients.count * 3)) * 100,
    tools: (areaTotals.tools.sum / (areaTotals.tools.count * 3)) * 100,
  };

  const overall =
    (areaTotals.operations.sum +
      areaTotals.clients.sum +
      areaTotals.tools.sum) /
    (QUESTIONS.length * 3);

  return {
    operations: Math.round(areaPercents.operations),
    clients: Math.round(areaPercents.clients),
    tools: Math.round(areaPercents.tools),
    overall: Math.round(overall * 100),
  };
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

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function AutomationAssessment({ fullPage }: { fullPage?: boolean }) {
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<string, number | null>>(() => {
    const initial: Record<string, number | null> = {};
    QUESTIONS.forEach((q) => {
      initial[q.id] = null;
    });
    return initial;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const scores = useMemo(() => computeScores(answers), [answers]);

  // Pages: intro, questions..., name, email
  const pages = useMemo(() => {
    const p: { type: PageType; id: string; question?: Question }[] = [];
    p.push({ type: "intro", id: "intro" });
    for (const q of QUESTIONS) p.push({ type: "question", id: q.id, question: q });
    p.push({ type: "contact", id: "name" });
    p.push({ type: "contact", id: "email" });
    return p;
  }, []);

  const totalSteps = QUESTIONS.length + 2; // questions + 2 contact steps
  const currentPage = pages[currentIndex];
  const answeredCount = QUESTIONS.filter((q) => answers[q.id] != null).length;
  const progressPercent = Math.round(
    ((answeredCount + (name ? 1 : 0) + (email ? 1 : 0)) / totalSteps) * 100
  );

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Don't intercept when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowLeft") setCurrentIndex((i) => Math.max(0, i - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleAnswer = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setTimeout(() => {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, pages.length - 1));
    }, 180);
  };

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, pages.length - 1));

  const submitContacts = () => {
    let hasError = false;
    if (!name.trim()) {
      setNameError("Please enter your name.");
      hasError = true;
    } else {
      setNameError("");
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (hasError) return;

    const allScores = computeScores(answers);
    if (!allScores) return;

    const profileKey = pickProfile(allScores.overall);

    // Persist result to localStorage so result page can read it
    localStorage.setItem(
      "latestAssessmentResult",
      JSON.stringify({
        scores: allScores,
        profile: profileKey,
        name,
        email,
        completedAt: new Date().toISOString(),
      })
    );

    router.push(`/assessment/results/${PROFILE_SLUG[profileKey]}`);
  };

  return (
    <div
      className={`${
        fullPage ? "min-h-screen flex items-center justify-center" : ""
      }`}
    >
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
                {currentPage?.type === "question"
                  ? currentPage.question?.area === "operations"
                    ? "Operations & Workflows"
                    : currentPage.question?.area === "clients"
                    ? "Client & Lead Management"
                    : "Tools & Systems"
                  : currentPage?.type === "intro"
                  ? "Welcome"
                  : "Your details"}
              </div>
              <div className="text-xs text-gray-400 tabular-nums">
                {Math.min(answeredCount, QUESTIONS.length)} / {QUESTIONS.length}
              </div>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-brand-orange"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ─── INTRO ─────────────────────────────────────────── */}
            {currentPage?.type === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center shadow-sm"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-4">
                  The Automation Gap Audit
                </p>
                <h1 className="text-2xl md:text-3xl font-display font-semibold text-brand-black mb-4 leading-tight">
                  Find out where your business is bleeding time.
                </h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                  10 questions across Operations, Client Management, and your
                  Tools stack. You&apos;ll leave with a clear picture of where
                  you are — and exactly where to focus first.
                </p>
                <button
                  onClick={() => setCurrentIndex((i) => i + 1)}
                  className="inline-flex items-center rounded-lg bg-brand-black px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-black/90"
                >
                  Start the audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <p className="mt-4 text-xs text-gray-400">
                  Takes about 5 minutes · Results emailed to you
                </p>
              </motion.div>
            )}

            {/* ─── QUESTION ──────────────────────────────────────── */}
            {currentPage?.type === "question" && currentPage.question && (
              <motion.div
                key={currentPage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
                  {currentPage.question.area === "operations"
                    ? "Operations & Workflows"
                    : currentPage.question.area === "clients"
                    ? "Client & Lead Management"
                    : "Tools & Systems"}
                </p>
                <h2 className="text-lg md:text-xl font-semibold text-brand-black mb-6 leading-snug">
                  {currentPage.question.label}
                </h2>
                <div className="grid gap-2.5">
                  {ANSWER_OPTIONS.map((opt) => {
                    const selected =
                      answers[currentPage.question!.id] === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        onClick={() =>
                          handleAnswer(currentPage.question!.id, opt.value)
                        }
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

            {/* ─── CONTACT (name) ────────────────────────────────── */}
            {currentPage?.type === "contact" && currentPage.id === "name" && (
              <motion.div
                key="contact-name"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
                  Almost there
                </p>
                <h2 className="text-lg md:text-xl font-semibold text-brand-black mb-2 leading-snug">
                  What should we call you?
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  We&apos;ll use your name to personalise your results.
                </p>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && name.trim()) goNext();
                  }}
                  autoFocus
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-brand-black placeholder:text-gray-400 focus:border-brand-orange focus:outline-none"
                  placeholder="Your full name"
                />
                {nameError && (
                  <p className="mt-1 text-xs text-red-500">{nameError}</p>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <button
                    onClick={goPrev}
                    className="text-sm text-gray-400 hover:text-brand-black transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!name.trim()}
                    className="inline-flex items-center rounded-lg bg-brand-black px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40 transition-colors hover:bg-brand-black/90"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── CONTACT (email) ───────────────────────────────── */}
            {currentPage?.type === "contact" && currentPage.id === "email" && (
              <motion.div
                key="contact-email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
                  Last step
                </p>
                <h2 className="text-lg md:text-xl font-semibold text-brand-black mb-2 leading-snug">
                  Where should we send your results{name ? `, ${name.split(" ")[0]}` : ""}?
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Your full personalised report will be emailed to you.
                </p>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitContacts();
                  }}
                  autoFocus
                  type="email"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-brand-black placeholder:text-gray-400 focus:border-brand-orange focus:outline-none"
                  placeholder="you@company.com"
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-500">{emailError}</p>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <button
                    onClick={goPrev}
                    className="text-sm text-gray-400 hover:text-brand-black transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={submitContacts}
                    className="inline-flex items-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
                  >
                    See my results
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prev button shown on question pages */}
          {currentPage?.type === "question" && (
            <div className="mt-4">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="text-sm text-gray-400 hover:text-brand-black transition-colors disabled:opacity-30"
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
