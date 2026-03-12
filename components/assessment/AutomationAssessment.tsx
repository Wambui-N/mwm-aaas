"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Area = "operations" | "clients" | "tools";

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

type ProfileKey = "manual" | "patchwork" | "systems";

const PROFILE_COPY: Record<
  ProfileKey,
  { label: string; color: string; headline: string; body: string }
> = {
  manual: {
    label: "The Manual Machine",
    color: "bg-red-50 text-red-900 border-red-200",
    headline: "Most things still run on human effort.",
    body: "Right now, your team is keeping everything moving through memory, spreadsheets, and one-off fixes. That's normal at this stage — and also exactly where automation starts to pay off quickly.",
  },
  patchwork: {
    label: "The Patchwork Operator",
    color: "bg-yellow-50 text-yellow-900 border-yellow-200",
    headline: "You have pieces in place, but they don't fully connect.",
    body: "Some workflows are automated or systemised, but there are still gaps where work falls through the cracks, data is duplicated, or things depend on the right person remembering what to do.",
  },
  systems: {
    label: "The Systems Builder",
    color: "bg-emerald-50 text-emerald-900 border-emerald-200",
    headline: "You think in systems — now it's about refinement.",
    body: "You already have solid processes and some automations in place. The next step is optimising the highest leverage workflows and designing a roadmap for where to go next.",
  },
};

const GAP_CARDS: Record<
  Area,
  { title: string; body: string; cta: string; href: string }[]
> = {
  operations: [
    {
      title: "Your core workflows live in people's heads",
      body: "Start by documenting the 2–3 workflows you run most often — onboarding, delivery, or reporting. Once it's written down, it's much easier to spot which steps should be automated.",
      cta: "Use the 10-workflow checklist to choose what to document first.",
      href: "/resources/checklist/10-workflows-to-automate-first",
    },
    {
      title: "No standard starting point for projects",
      body: "If every project is set up from scratch, task creation is a quick win. A single template for 'how we start a project' can save dozens of clicks every week.",
      cta: "Read the guide on automating internal task creation.",
      href:
        "/blog/how-to-automate-internal-task-creation-when-a-new-project-starts",
    },
    {
      title: "Reporting steals more time than it should",
      body: "Weekly or monthly updates shouldn't require manual number-chasing. Once your metrics are clear, you can automate how they're pulled and shared.",
      cta: "Read the guide on automated reporting and status updates.",
      href: "/blog/how-to-set-up-automated-reporting-and-status-updates",
    },
  ],
  clients: [
    {
      title: "Leads wait too long for a response",
      body: "Speed to response is one of the biggest drivers of conversion. An automated acknowledgement and a simple follow-up flow can transform your pipeline.",
      cta: "Read the guide on automated lead follow-up.",
      href: "/blog/how-to-set-up-automated-lead-follow-up",
    },
    {
      title: "You chase invoices manually",
      body: "If you or your team are nudging clients one by one, you're doing work a system could handle for you — and it's uncomfortable work at that.",
      cta: "Read the guide on automating invoice and payment follow-up.",
      href: "/blog/how-to-automate-invoice-and-payment-follow-up",
    },
    {
      title: "Onboarding is inconsistent client to client",
      body: "When onboarding depends on who remembers what, you get uneven experiences. A simple sequence and a few automations can make this smooth and repeatable.",
      cta: "Read the guide on building an automated client onboarding flow.",
      href: "/blog/how-to-build-an-automated-client-onboarding-flow",
    },
  ],
  tools: [
    {
      title: "Your tools don't talk to each other",
      body: "Copy-pasting data between tools is a clear signal for automation. Start with one high-frequency handoff — like form submissions into your CRM.",
      cta: "Use the checklist to pick your first integration.",
      href: "/resources/checklist/10-workflows-to-automate-first",
    },
    {
      title: "Reporting requires digging in multiple places",
      body: "If you have to open three tools to answer a basic question, you likely need a simple 'source of truth' and a few automations to keep it up to date.",
      cta: "Read the guide on eliminating manual data entry.",
      href:
        "/blog/how-to-eliminate-manual-data-entry-between-your-business-tools",
    },
    {
      title: "Automations exist, but there's no roadmap",
      body: "Scattered one-off automations can be fragile. A simple roadmap — which workflows to automate in what order — keeps changes strategic instead of reactive.",
      cta: "Book a free consultation to prioritise your next 2–3 automations.",
      href: "/contact-us",
    },
  ],
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

function weakestArea(scores: Scores): Area {
  const entries: [Area, number][] = [
    ["operations", scores.operations],
    ["clients", scores.clients],
    ["tools", scores.tools],
  ];
  return entries.reduce((weakest, current) =>
    current[1] < weakest[1] ? current : weakest
  )[0];
}

export function AutomationAssessment() {
  const [answers, setAnswers] = useState<Record<string, number | null>>(() => {
    const initial: Record<string, number | null> = {};
    QUESTIONS.forEach((q) => {
      initial[q.id] = null;
    });
    return initial;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const scores = useMemo(() => computeScores(answers), [answers]);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const answeredCount = QUESTIONS.filter((q) => answers[q.id] != null).length;
  const progressPercent = Math.round(
    (answeredCount / totalQuestions) * 100
  );

  const handleAnswer = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));

    // Advance to next question after a short delay
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < totalQuestions - 1) {
          return prevIndex + 1;
        }
        // Last question answered -> show results
        setSubmitted(true);
        return prevIndex;
      });
    }, 150);
  };

  const handlePrev = () => {
    setSubmitted(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSeeResults = () => {
    if (answeredCount === totalQuestions) {
      setSubmitted(true);
    }
  };

  const profile: ProfileKey | null =
    submitted && scores ? pickProfile(scores.overall) : null;
  const weakest: Area | null =
    submitted && scores ? weakestArea(scores) : null;

  const gapCards =
    submitted && weakest ? GAP_CARDS[weakest].slice(0, 3) : [];

  return (
    <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 md:p-8 shadow-sm">
      <header className="mb-6 md:mb-8">
        <p className="inline-flex items-center rounded-full bg-brand-grey/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-black/80">
          Assessment
        </p>
        <h1 className="mt-3 text-2xl md:text-3xl font-display font-semibold text-brand-black">
          Automation Readiness Assessment
        </h1>
        <p className="mt-2 max-w-2xl text-sm md:text-base text-gray-600">
          Answer 10 quick questions to see where your business is currently
          relying on manual effort, how your systems stack up across{" "}
          <b>Operations &amp; Workflows</b>, <b>Client &amp; Lead Management</b>
          , and <b>Tools &amp; Systems</b>, and what to focus on next.
        </p>

        {/* Progress bar */}
        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Question {answeredCount + (answers[currentQuestion.id] == null ? 0 : 0)}/{totalQuestions} ·{" "}
            {currentQuestion.area === "operations"
              ? "Operations & Workflows"
              : currentQuestion.area === "clients"
              ? "Client & Lead Management"
              : "Tools & Systems"}
          </p>
          <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-brand-grey/30 md:ml-auto">
            <div
              className="h-full rounded-full bg-brand-orange transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Single-question flow */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-xl border border-gray-100 bg-white px-4 py-5 md:px-5 md:py-6"
          >
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                {currentQuestion.area === "operations"
                  ? "Operations & Workflows"
                  : currentQuestion.area === "clients"
                  ? "Client & Lead Management"
                  : "Tools & Systems"}{" "}
                · Q{currentIndex + 1}
              </p>
            </div>
            <p className="mb-4 text-base md:text-lg font-medium text-brand-black">
              {currentQuestion.label}
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ANSWER_OPTIONS.map((opt) => {
                const selected = answers[currentQuestion.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                    className={`rounded-full border px-4 py-2 text-[13px] text-left font-medium transition-colors ${
                      selected
                        ? "border-brand-orange bg-brand-orange text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-brand-orange/70 hover:bg-brand-orange/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="disabled:cursor-not-allowed disabled:text-gray-300 hover:text-brand-black transition-colors"
          >
            ← Previous question
          </button>
          <button
            type="button"
            onClick={handleSeeResults}
            disabled={answeredCount < totalQuestions}
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 hover:border-brand-orange/70 hover:text-brand-black"
          >
            See my results
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {submitted && scores && profile && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/80 p-5 md:p-6"
        >
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Your profile
              </p>
              <div
                className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${PROFILE_COPY[profile].color}`}
              >
                <span>{PROFILE_COPY[profile].label}</span>
                <span className="text-[10px] opacity-80">
                  ({scores.overall}% overall)
                </span>
              </div>
              <h2 className="mt-3 text-lg font-display font-semibold text-brand-black">
                {PROFILE_COPY[profile].headline}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {PROFILE_COPY[profile].body}
              </p>
            </div>
            <div className="w-full max-w-xs rounded-xl bg-white p-4 shadow-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Area scores
              </p>
              {(["operations", "clients", "tools"] as Area[]).map((area) => {
                const label =
                  area === "operations"
                    ? "Operations & Workflows"
                    : area === "clients"
                    ? "Client & Lead Management"
                    : "Tools & Systems";
                const value = scores[area];
                return (
                  <div key={area} className="mb-2 last:mb-0">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-gray-600">
                      <span>{label}</span>
                      <span className="font-medium text-brand-black">
                        {value}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-grey/30">
                      <div
                        className="h-full rounded-full bg-brand-orange"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gap cards */}
          {gapCards.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 mb-2">
                Your next 2–3 moves
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Based on your lowest-scoring area, here are a few focused moves
                that will create the most leverage. Pick one to start with — you
                don&apos;t need to fix everything at once.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {gapCards.map((gap) => (
                  <div
                    key={gap.title}
                    className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-left"
                  >
                    <h3 className="text-sm font-semibold text-brand-black mb-2">
                      {gap.title}
                    </h3>
                    <p className="text-xs text-gray-600 flex-1 mb-3">
                      {gap.body}
                    </p>
                    <Link
                      href={gap.href}
                      className="mt-auto inline-flex items-center text-xs font-semibold text-brand-orange hover:underline"
                    >
                      {gap.cta}
                      <ArrowRight className="ml-1.5 h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tailored CTA */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white px-4 py-4 md:px-5 md:py-5">
            {profile === "manual" && (
              <>
                <h3 className="text-sm font-display font-semibold text-brand-black mb-1">
                  Start with the quickest wins.
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  The goal is not to automate everything at once — it&apos;s to
                  pick 1–2 workflows that will immediately reduce manual effort.
                  The checklist is a good place to choose your first moves.
                </p>
                <Link
                  href="/resources/checklist/10-workflows-to-automate-first"
                  className="inline-flex items-center text-sm font-semibold text-brand-orange hover:underline"
                >
                  Open the &quot;10 Workflows to Automate First&quot; checklist
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </>
            )}
            {profile === "patchwork" && (
              <>
                <h3 className="text-sm font-display font-semibold text-brand-black mb-1">
                  You&apos;re ready for a systems conversation.
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  You have building blocks in place — the next step is deciding
                  which 2–3 workflows to connect and automate first. That&apos;s
                  exactly what we cover in a free consultation.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center text-sm font-semibold text-brand-orange hover:underline"
                >
                  Book a free consultation
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </>
            )}
            {profile === "systems" && (
              <>
                <h3 className="text-sm font-display font-semibold text-brand-black mb-1">
                  You&apos;re ready for a strategy roadmap.
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  You&apos;re already thinking in systems — now it&apos;s about
                  sharpening what you have and designing a roadmap for the next
                  12–18 months of automation work.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center text-sm font-semibold text-brand-orange hover:underline"
                >
                  Book a strategy call
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </motion.section>
      )}
    </section>
  );
}

