"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SketchSubmit } from "@/components/site/SketchButton";
import { LOCAL_KEY } from "@/lib/scorecard/config";
import { FIRM_INTRO, FIRM_QUESTIONS, Q6X_MAX, SCORED_QUESTIONS, STAGE_NAMES, ANSWER_OPTIONS, type Stage } from "@/lib/scorecard/questions";
import { landing as landingCopy } from "@/lib/scorecard/copy";
import { track } from "@/lib/scorecard/track";
import { LeadForm, type LeadData } from "./LeadForm";
import { QuestionCard, TextQuestionCard } from "./QuestionCard";
import { StageProgress } from "./StageProgress";

type Step = "landing" | "lead" | "scored" | "intro" | "firm";
type Saved = { id: string; answers: Record<string, string>; firm: Record<string, string>; step: Step; i: number; f: number; savedAt: number };

const FRESH_MS = 30 * 60 * 1000; // a refresh inside this window drops you straight back into the quiz
const REQUIRED_FIRM = FIRM_QUESTIONS.filter((q) => !q.optionalText);
const LAST_FIRM = FIRM_QUESTIONS.length - 1;

/** Where a half-finished submission should continue. */
function positionFrom(answers: Record<string, string>, firm: Record<string, string>): { step: Step; i: number; f: number } {
  const i = SCORED_QUESTIONS.findIndex((q) => !answers[q.id]);
  if (i >= 0) return { step: "scored", i, f: 0 };
  const f = REQUIRED_FIRM.findIndex((q) => !firm[q.id]);
  if (f < 0) return { step: "firm", i: 14, f: LAST_FIRM };
  return { step: f === 0 && Object.keys(firm).length === 0 ? "intro" : "firm", i: 14, f };
}

const readSaved = (): Saved | null => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
};
const writeSaved = (s: Saved | null) => {
  try {
    if (s) localStorage.setItem(LOCAL_KEY, JSON.stringify(s));
    else localStorage.removeItem(LOCAL_KEY);
  } catch {
    /* private mode: autosave to the server still works */
  }
};

const Ctx = createContext<{ start: () => void; resume: (() => void) | null }>({ start: () => {}, resume: null });

/** Landing-page button (the landing itself is server-rendered, so the button lives here). */
export function StartButton({ children, seed = 6 }: { children: React.ReactNode; seed?: number }) {
  const { start } = useContext(Ctx);
  return (
    <SketchSubmit type="button" variant="marker" seed={seed} className="text-lg" onClick={start}>
      {children}
    </SketchSubmit>
  );
}

/** "Pick up where you left off", shown on the landing page when an unfinished submission is saved on this device. */
export function ResumeNotice() {
  const { resume } = useContext(Ctx);
  if (!resume) return null;
  return (
    <p className="calm-body mt-6">
      <button type="button" onClick={resume} className="font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline">
        {landingCopy.resume} →
      </button>
    </p>
  );
}

export function ScorecardFlow({ landing }: { landing: React.ReactNode }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("landing");
  const [id, setId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [firm, setFirm] = useState<Record<string, string>>({});
  const [i, setI] = useState(0);
  const [f, setF] = useState(0);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [leadBusy, setLeadBusy] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [finishing, setFinishing] = useState(false);
  const [finishError, setFinishError] = useState("");
  const attribution = useRef<{ utmSource?: string; utmMedium?: string; utmCampaign?: string; referrer?: string }>({});
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const advancing = useRef(false);

  const go = useCallback((s: { step: Step; i?: number; f?: number }) => {
    setStep(s.step);
    if (s.i !== undefined) setI(s.i);
    if (s.f !== undefined) setF(s.f);
    window.scrollTo({ top: 0 });
  }, []);

  // first load: attribution, view event, resume link or a recent refresh
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    attribution.current = {
      utmSource: q.get("utm_source") || undefined,
      utmMedium: q.get("utm_medium") || undefined,
      utmCampaign: q.get("utm_campaign") || undefined,
      referrer: document.referrer || undefined,
    };
    track("scorecard_view");

    const resumeId = q.get("resume");
    if (resumeId) {
      fetch(`/api/scorecard/${resumeId}`, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!d?.ok) return;
          if (d.status === "completed") return void router.replace(`/scorecard/results/${resumeId}`);
          setId(resumeId);
          setAnswers(d.answers ?? {});
          setFirm(d.firmAnswers ?? {});
          const pos = positionFrom(d.answers ?? {}, d.firmAnswers ?? {});
          go(pos);
        })
        .catch(() => {});
      return;
    }

    const s = readSaved();
    if (!s?.id) return;
    if (Date.now() - s.savedAt < FRESH_MS && ["scored", "intro", "firm"].includes(s.step)) {
      setId(s.id);
      setAnswers(s.answers);
      setFirm(s.firm);
      setStep(s.step);
      setI(s.i);
      setF(s.f);
    } else {
      setSaved(s);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep the on-device copy current so a refresh lands on the same question
  useEffect(() => {
    if (!id || !["scored", "intro", "firm"].includes(step)) return;
    writeSaved({ id, answers, firm, step, i, f, savedAt: Date.now() });
  }, [id, answers, firm, step, i, f]);

  /** Server autosave. Sends the full objects, one request at a time, so an older save can never overwrite a newer one. */
  const autosave = useCallback(
    (sid: string, body: { answers?: Record<string, string>; firmAnswers?: Record<string, string> }) => {
      const run = () =>
        fetch(`/api/scorecard/${sid}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
          .then((r) => r.ok)
          .catch(() => false);
      const p = queue.current.then(run, run);
      queue.current = p;
      return p as Promise<boolean>;
    },
    [],
  );

  const start = useCallback(() => {
    track("scorecard_start");
    go({ step: "lead" });
  }, [go]);

  const resumeSaved = useCallback(() => {
    if (!saved) return;
    setId(saved.id);
    setAnswers(saved.answers);
    setFirm(saved.firm);
    go({ step: saved.step, i: saved.i, f: saved.f });
  }, [saved, go]);

  const submitLead = async (d: LeadData) => {
    setLeadBusy(true);
    setLeadError("");
    try {
      const res = await fetch("/api/scorecard/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, ...attribution.current }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.id) {
        setLeadError(
          res.status === 429
            ? "Too many attempts from this connection. Please try again in an hour, or email wambui@madewithmake.com."
            : res.status === 503
              ? "The scorecard isn't available right now. Please try again shortly."
              : "Something went wrong starting the scorecard. Please check your details and try again.",
        );
        return;
      }
      track("scorecard_lead_submitted");
      setId(body.id);
      setAnswers({});
      setFirm({});
      go({ step: "scored", i: 0, f: 0 });
    } catch {
      setLeadError("We couldn't reach the server. Please check your connection and try again.");
    } finally {
      setLeadBusy(false);
    }
  };

  const advance = (fn: () => void) => {
    if (advancing.current) return;
    advancing.current = true;
    window.setTimeout(() => {
      fn();
      advancing.current = false;
    }, 180);
  };

  const pickScored = (qid: string, value: string) => {
    if (!id) return;
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    void autosave(id, { answers: next });
    track("scorecard_question_answered", { question: qid });
    advance(() => (i >= SCORED_QUESTIONS.length - 1 ? go({ step: "intro" }) : go({ step: "scored", i: i + 1 })));
  };

  const pickFirm = (qid: string, value: string) => {
    if (!id) return;
    const next = { ...firm, [qid]: value };
    setFirm(next);
    void autosave(id, { firmAnswers: next });
    track("scorecard_question_answered", { question: qid });
    advance(() => go({ step: "firm", f: f + 1 }));
  };

  const finish = async () => {
    if (!id) return;
    setFinishing(true);
    setFinishError("");
    try {
      const saved = await autosave(id, { answers, firmAnswers: firm });
      if (!saved) throw new Error("save failed");
      const res = await fetch(`/api/scorecard/${id}/complete`, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.url) throw new Error(body?.error || "complete failed");
      track("scorecard_completed");
      writeSaved(null);
      router.push(body.url);
    } catch {
      setFinishError("We couldn't work out your score just now. Your answers are saved, so please try again.");
      setFinishing(false);
    }
  };

  const back = () => {
    if (step === "scored") go({ step: "scored", i: Math.max(0, i - 1) });
    else if (step === "intro") go({ step: "scored", i: SCORED_QUESTIONS.length - 1 });
    else if (step === "firm") (f === 0 ? go({ step: "intro" }) : go({ step: "firm", f: f - 1 }));
  };

  const ctx = { start, resume: saved ? resumeSaved : null };

  if (step === "landing") return <Ctx.Provider value={ctx}>{landing}</Ctx.Provider>;

  const scoredQ = SCORED_QUESTIONS[i];
  const firmQ = FIRM_QUESTIONS[f];
  const answeredScored = SCORED_QUESTIONS.filter((q) => answers[q.id]).length;
  const stage: Stage | null = step === "scored" ? scoredQ.stage : null;
  const backDisabled = step === "lead" || (step === "scored" && i === 0) || finishing;

  const kicker =
    step === "scored"
      ? `Question ${i + 1} of ${SCORED_QUESTIONS.length} · ${STAGE_NAMES[scoredQ.stage]}`
      : step === "firm"
        ? `About your firm · ${f + 1} of ${FIRM_QUESTIONS.length}`
        : "";

  return (
    <Ctx.Provider value={ctx}>
      <div className="cols-8">
        {step !== "lead" && (
          <div className="mb-6">
            <StageProgress current={stage} done={step === "scored" ? answeredScored : SCORED_QUESTIONS.length} />
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {kicker}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step + i + f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            {step === "lead" && <LeadForm onSubmit={submitLead} busy={leadBusy} error={leadError} />}

            {step === "scored" && (
              <QuestionCard kicker={kicker} question={scoredQ.label} options={ANSWER_OPTIONS} selected={answers[scoredQ.id]} onPick={(v) => pickScored(scoredQ.id, v)} />
            )}

            {step === "intro" && (
              <div className="calm-card min-h-[33rem] p-6 md:p-7">
                <p className="gl-mono text-ink/60">Stages complete</p>
                <h2 className="calm-h3 mt-3">{FIRM_INTRO}</h2>
                <p className="calm-body mt-4 text-ink/80">Nine short questions, then your score. These help work out your monthly proposal cost and your best next step.</p>
                <div className="mt-8">
                  <SketchSubmit type="button" variant="marker" seed={12} className="text-lg" onClick={() => go({ step: "firm", f: 0 })}>
                    Continue →
                  </SketchSubmit>
                </div>
              </div>
            )}

            {step === "firm" && firmQ && !firmQ.optionalText && (
              <QuestionCard
                kicker={kicker}
                question={firmQ.label}
                options={firmQ.options.map((o) => ({ value: o.value, label: o.value }))}
                selected={firm[firmQ.id]}
                onPick={(v) => pickFirm(firmQ.id, v)}
              />
            )}

            {step === "firm" && firmQ?.optionalText && (
              <TextQuestionCard
                kicker={kicker}
                question={firmQ.label}
                value={firm[firmQ.id] ?? ""}
                max={Q6X_MAX}
                busy={finishing}
                onChange={(v) => setFirm((p) => ({ ...p, [firmQ.id]: v }))}
                onFinish={finish}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {finishError && (
          <p className="fm-error mt-4" role="alert">
            {finishError}
          </p>
        )}

        {step !== "lead" && (
          <div className="mt-4">
            <button
              type="button"
              onClick={back}
              disabled={backDisabled}
              className="gl-mono -ml-1 px-1 py-3 text-ink/60 underline-offset-4 hover:text-ink hover:underline focus-visible:underline disabled:cursor-default disabled:opacity-40 disabled:no-underline"
            >
              ← Previous question
            </button>
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}
