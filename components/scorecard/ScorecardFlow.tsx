"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { SketchSubmit } from "@/components/site/SketchButton";
import { FOUNDERS_FREEDOM_POST, LOCAL_KEY } from "@/lib/scorecard/config";
import { landing, leadScreens } from "@/lib/scorecard/copy";
import { COUNTRIES } from "@/lib/scorecard/countries";
import {
  ANSWER_OPTIONS,
  CONSENT_LABEL,
  DONORS,
  FIRM_INTRO,
  FIRM_QUESTIONS,
  FIRM_SIZES,
  Q6X_MAX,
  ROLES,
  SCORED_QUESTIONS,
  STAGES,
  STAGE_NAMES,
  type FirmQuestion,
  type ScoredQuestion,
} from "@/lib/scorecard/questions";
import { track } from "@/lib/scorecard/track";

/* ------------------------------------------------------------------ screens */

type Choice = { value: string; label: string };
type Screen =
  | { kind: "welcome" }
  | { kind: "text"; key: "firstName" | "firmName"; title: string; placeholder: string; autoComplete: string; error: string }
  | { kind: "email" }
  | { kind: "leadChoice"; key: "role" | "firmSize"; title: string; options: Choice[] }
  | { kind: "scored"; q: ScoredQuestion; n: number }
  | { kind: "country" }
  | { kind: "donors" }
  | { kind: "firm"; q: FirmQuestion }
  | { kind: "q6x"; q: FirmQuestion };

const asChoices = (xs: readonly string[]): Choice[] => xs.map((v) => ({ value: v, label: v }));

const SCREENS: Screen[] = [
  { kind: "welcome" },
  { kind: "text", key: "firstName", title: leadScreens.firstName, placeholder: "Your first name", autoComplete: "given-name", error: "Please enter your first name." },
  { kind: "email" },
  { kind: "text", key: "firmName", title: leadScreens.firmName, placeholder: "Your firm name", autoComplete: "organization", error: "Please enter your firm name." },
  { kind: "leadChoice", key: "role", title: leadScreens.role, options: asChoices(ROLES) },
  { kind: "leadChoice", key: "firmSize", title: leadScreens.firmSize, options: asChoices(FIRM_SIZES) },
  ...SCORED_QUESTIONS.map((q, i): Screen => ({ kind: "scored", q, n: i + 1 })),
  { kind: "country" },
  { kind: "donors" },
  ...FIRM_QUESTIONS.map((q): Screen => (q.optionalText ? { kind: "q6x", q } : { kind: "firm", q })),
];

const FIRST_SCORED = SCREENS.findIndex((s) => s.kind === "scored");
const FIRM_SIZE_IDX = SCREENS.findIndex((s) => s.kind === "leadChoice" && s.key === "firmSize");
const LAST = SCREENS.length - 1;
const ADVANCE_MS = 300;
const MIN_LOADING_MS = 1800;
const FRESH_MS = 30 * 60 * 1000; // a refresh inside this window drops you straight back where you were

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** First screen at or after the scored questions that still lacks a required answer (donors and q6x are optional). */
function positionFrom(answers: Record<string, string>, firm: Record<string, string>, country: string): number {
  for (let i = FIRST_SCORED; i < SCREENS.length; i++) {
    const s = SCREENS[i];
    if (s.kind === "scored" && !answers[s.q.id]) return i;
    if (s.kind === "country" && !country) return i;
    if (s.kind === "firm" && !firm[s.q.id]) return i;
  }
  return LAST;
}

type Saved = {
  id: string;
  answers: Record<string, string>;
  firm: Record<string, string>;
  country: string;
  donors: string[];
  idx: number;
  savedAt: number;
};

const readSaved = (): Saved | null => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    const s = raw ? (JSON.parse(raw) as Saved) : null;
    return s && typeof s.idx === "number" && s.idx >= FIRST_SCORED && s.idx <= LAST ? s : null;
  } catch {
    return null;
  }
};
const writeSaved = (s: Saved | null) => {
  try {
    if (s) localStorage.setItem(LOCAL_KEY, JSON.stringify(s));
    else localStorage.removeItem(LOCAL_KEY);
  } catch {
    /* private mode: the server autosave still works */
  }
};

/* ------------------------------------------------------------------ small parts */

const Hint = ({ children = "Press Enter ↵" }: { children?: string }) => (
  <p className="gl-mono mt-5 text-ink/50 [@media(hover:none)]:hidden" aria-hidden>
    {children}
  </p>
);

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="gl-mono mb-5 text-ink/60">{children}</p>;

function Options({ options, selected, onPick }: { options: readonly Choice[]; selected?: string; onPick: (v: string) => void }) {
  return (
    <div className="mt-8 flex flex-col gap-2.5" role="group" aria-label="Answers">
      {options.map((o, i) => (
        <button key={o.value} type="button" aria-pressed={selected === o.value} onClick={() => onPick(o.value)} className="fm-option sc-option">
          <span className="sc-key" aria-hidden>
            {String.fromCharCode(65 + i)}
          </span>
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function Next({ children, disabled, onClick, type = "submit", seed = 11 }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void; type?: "submit" | "button"; seed?: number }) {
  return (
    <SketchSubmit type={type} variant="marker" seed={seed} className="text-lg" disabled={disabled} onClick={onClick}>
      {children}
    </SketchSubmit>
  );
}

/** A one-field screen: big input, Enter submits. Field focus waits a beat so it doesn't fight the slide. */
function TextScreen({
  title,
  kicker,
  value,
  onChange,
  onSubmit,
  type = "text",
  placeholder,
  autoComplete,
  error,
  hidden,
  children,
}: {
  title: string;
  kicker: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  type?: string;
  placeholder: string;
  autoComplete: string;
  error?: string;
  hidden?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const t = window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 120);
    return () => window.clearTimeout(t);
  }, []);
  const id = `sc-${title.length}-${type}`;
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Kicker>{kicker}</Kicker>
      <h1 id={`${id}-h`} className="sc-title">
        {title}
      </h1>
      <div className="mt-8">
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={type === "email" ? "email" : undefined}
          aria-labelledby={`${id}-h`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-e` : undefined}
          className="sc-input"
        />
        {error && (
          <p id={`${id}-e`} className="fm-error" role="alert">
            {error}
          </p>
        )}
      </div>
      {children}
      {hidden}
      <div className="mt-8 flex items-center gap-5">
        <Next>OK →</Next>
        <Hint />
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ the flow */

type Lead = { firstName: string; email: string; consent: boolean; firmName: string; role: string; firmSize: string };

export function ScorecardFlow() {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"flow" | "loading" | "error">("flow");
  const [tick, setTick] = useState(0);
  const [lead, setLead] = useState<Lead>({ firstName: "", email: "", consent: false, firmName: "", role: "", firmSize: "" });
  const [website, setWebsite] = useState(""); // honeypot
  const [fieldError, setFieldError] = useState("");
  const [country, setCountry] = useState("");
  const [donors, setDonors] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [firm, setFirm] = useState<Record<string, string>>({});
  const [id, setId] = useState<string | null>(null);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [busy, setBusy] = useState(false);
  const [startError, setStartError] = useState("");

  const dir = useRef(1);
  const timer = useRef<number | null>(null);
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const scroller = useRef<HTMLDivElement>(null);
  const attribution = useRef<{ utmSource?: string; utmMedium?: string; utmCampaign?: string; referrer?: string }>({});

  const screen = SCREENS[idx];

  const go = useCallback((to: number, d = 1) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    dir.current = d;
    setFieldError("");
    setIdx(Math.max(0, Math.min(LAST, to)));
    scroller.current?.scrollTo({ top: 0 });
  }, []);

  /** Run `fn` after the short auto-advance pause; a second call while one is pending is ignored. */
  const later = useCallback((fn: () => void) => {
    if (timer.current) return;
    timer.current = window.setTimeout(() => {
      timer.current = null;
      fn();
    }, ADVANCE_MS);
  }, []);

  useEffect(() => () => void (timer.current && window.clearTimeout(timer.current)), []);

  /* first load: attribution, view event, resume link or a recent refresh */
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
          setCountry(d.country ?? "");
          setDonors(d.donors ?? []);
          setIdx(positionFrom(d.answers ?? {}, d.firmAnswers ?? {}, d.country ?? ""));
        })
        .catch(() => {})
        .finally(() => setReady(true));
      return;
    }

    const s = readSaved();
    if (s && Date.now() - s.savedAt < FRESH_MS) {
      setId(s.id);
      setAnswers(s.answers);
      setFirm(s.firm);
      setCountry(s.country ?? "");
      setDonors(s.donors ?? []);
      setIdx(s.idx);
    } else if (s) {
      setSaved(s);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* keep the on-device copy current so a refresh lands on the same question */
  useEffect(() => {
    if (!id || phase !== "flow" || idx < FIRST_SCORED) return;
    writeSaved({ id, answers, firm, country, donors, idx, savedAt: Date.now() });
  }, [id, answers, firm, country, donors, idx, phase]);

  /** Server autosave: one request at a time, full objects, so an older save can never overwrite a newer one. */
  const autosave = useCallback((sid: string, body: Record<string, unknown>) => {
    const run = () =>
      fetch(`/api/scorecard/${sid}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        .then((r) => r.ok)
        .catch(() => false);
    const p = queue.current.then(run, run);
    queue.current = p;
    return p as Promise<boolean>;
  }, []);

  /* ---- actions */

  const resumeSaved = () => {
    if (!saved) return;
    setId(saved.id);
    setAnswers(saved.answers);
    setFirm(saved.firm);
    setCountry(saved.country ?? "");
    setDonors(saved.donors ?? []);
    go(saved.idx);
  };

  const createSubmission = async (l: Lead) => {
    setBusy(true);
    setStartError("");
    try {
      const res = await fetch("/api/scorecard/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...l, website, ...attribution.current }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.id) {
        setStartError(
          res.status === 429
            ? "Too many attempts from this connection. Please try again in an hour, or email wambui@madewithmake.com."
            : res.status === 503
              ? "The scorecard isn't available right now. Please try again shortly."
              : "Something went wrong starting the scorecard. Please pick your firm size again.",
        );
        return;
      }
      track("scorecard_lead_submitted");
      setId(body.id);
      setAnswers({});
      setFirm({});
      go(FIRM_SIZE_IDX + 1);
    } catch {
      setStartError("We couldn't reach the server. Please check your connection and pick your firm size again.");
    } finally {
      setBusy(false);
    }
  };

  const finish = async (next: { answers: Record<string, string>; firm: Record<string, string>; country: string; donors: string[] }) => {
    if (!id) return;
    setPhase("loading");
    setTick(0);
    const minimum = new Promise((r) => window.setTimeout(r, MIN_LOADING_MS));
    try {
      const ok = await autosave(id, { answers: next.answers, firmAnswers: next.firm, country: next.country, donors: next.donors });
      if (!ok) throw new Error("save failed");
      const res = await fetch(`/api/scorecard/${id}/complete`, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.url) throw new Error(body?.error || "complete failed");
      await minimum; // never flash past the loading screen, even when the API is fast
      track("scorecard_completed");
      writeSaved(null);
      router.push(body.url);
    } catch {
      setPhase("error");
    }
  };

  const pick = (value: string) => {
    if (screen.kind === "leadChoice") {
      const nextLead = { ...lead, [screen.key]: value } as Lead;
      setLead(nextLead);
      if (screen.key === "firmSize") later(() => (id ? go(idx + 1) : void createSubmission(nextLead)));
      else later(() => go(idx + 1));
    } else if (screen.kind === "scored" && id) {
      const next = { ...answers, [screen.q.id]: value };
      setAnswers(next);
      void autosave(id, { answers: next });
      track("scorecard_question_answered", { question: screen.q.id });
      later(() => go(idx + 1));
    } else if (screen.kind === "firm" && id) {
      const next = { ...firm, [screen.q.id]: value };
      setFirm(next);
      void autosave(id, { firmAnswers: next });
      track("scorecard_question_answered", { question: screen.q.id });
      later(() => go(idx + 1));
    }
  };

  const submitCountry = () => {
    if (!country) return setFieldError("Please select your country.");
    if (id) void autosave(id, { country });
    track("scorecard_question_answered", { question: "country" });
    go(idx + 1);
  };

  const submitDonors = () => {
    if (id) void autosave(id, { donors });
    track("scorecard_question_answered", { question: "donors" });
    go(idx + 1);
  };

  const toggleDonor = (d: string) => setDonors((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  const submitEmail = () => {
    if (!lead.email.trim()) return setFieldError("Please enter your work email.");
    if (!EMAIL_RE.test(lead.email.trim())) return setFieldError("Please enter a valid email address.");
    if (!lead.consent) return setFieldError("Please tick the box to get your results by email.");
    go(idx + 1);
  };

  const submitText = (key: "firstName" | "firmName", message: string) => {
    if (!lead[key].trim()) return setFieldError(message);
    go(idx + 1);
  };

  const start = () => {
    track("scorecard_start");
    go(1);
  };

  const close = () => {
    let sameSite = false;
    try {
      sameSite = !!document.referrer && new URL(document.referrer).origin === window.location.origin;
    } catch {
      /* ignore */
    }
    if (sameSite && window.history.length > 1) router.back();
    else router.push("/");
  };

  const back = () => go(idx - 1, -1);
  const backDisabled = idx === 0 || idx === FIRST_SCORED || busy || phase !== "flow";

  /* ---- keyboard: A/B/C… pick, Enter continues. Text fields handle their own Enter through their form. */
  const keyState = { screen, idx, phase, answers, firm };
  const keyRef = useRef(keyState);
  keyRef.current = keyState;
  const handlers = useRef({ pick, start, submitDonors, toggleDonor, go });
  handlers.current = { pick, start, submitDonors, toggleDonor, go };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { screen: s, idx: i, phase: ph, answers: a, firm: f } = keyRef.current;
      if (ph !== "flow" || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)) return;
      const h = handlers.current;

      if (e.key === "Enter") {
        if (s.kind === "donors") {
          e.preventDefault();
          return h.submitDonors();
        }
        if (t instanceof HTMLButtonElement || t instanceof HTMLAnchorElement) return; // native activation
        if (s.kind === "welcome") return h.start();
        const chosen = s.kind === "scored" ? a[s.q.id] : s.kind === "firm" ? f[s.q.id] : undefined;
        if (chosen) h.go(i + 1);
        return;
      }

      const n = e.key.length === 1 ? e.key.toUpperCase().charCodeAt(0) - 65 : -1;
      if (n < 0 || n > 25) return;
      if (s.kind === "scored") ANSWER_OPTIONS[n] && h.pick(ANSWER_OPTIONS[n].value);
      else if (s.kind === "firm") s.q.options[n] && h.pick(s.q.options[n].value);
      else if (s.kind === "leadChoice") s.options[n] && h.pick(s.options[n].value);
      else if (s.kind === "donors") DONORS[n] && h.toggleDonor(DONORS[n]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* loading screen: the five stages tick off, about 360 ms apart */
  useEffect(() => {
    if (phase !== "loading") return;
    const t = window.setInterval(() => setTick((n) => (n >= STAGES.length ? n : n + 1)), MIN_LOADING_MS / STAGES.length);
    return () => window.clearInterval(t);
  }, [phase]);

  /* ---- render */

  const stageOptions = useMemo(() => ANSWER_OPTIONS.map((o) => ({ value: o.value, label: o.label })), []);
  const progress = phase === "flow" ? idx / LAST : 1;

  const body = (() => {
    switch (screen.kind) {
      case "welcome": {
        const [before, after] = landing.headline.split(landing.headlineMark);
        return (
          <div>
            <h1 className="sc-title">
              {before}
              <span className="sc-mark">{landing.headlineMark}</span>
              {after}
            </h1>
            <p className="calm-body mt-6 text-ink/75">{landing.sub}</p>
            <div className="mt-9 flex items-center gap-5">
              <Next type="button" onClick={start} seed={82}>
                {landing.button} →
              </Next>
              <Hint />
            </div>
            {saved && (
              <p className="calm-body mt-6">
                <button type="button" onClick={resumeSaved} className="font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline">
                  {landing.resume} →
                </button>
              </p>
            )}
            <p className="mt-12 max-w-[32rem] text-[0.95rem] leading-snug text-ink/60">
              “{landing.proofQuote}”{" "}
              <Link href={FOUNDERS_FREEDOM_POST} className="underline underline-offset-4 hover:no-underline">
                {landing.proofName}
              </Link>
            </p>
          </div>
        );
      }

      case "text":
        return (
          <TextScreen
            title={screen.title}
            kicker="Before we begin"
            value={lead[screen.key]}
            onChange={(v) => setLead((p) => ({ ...p, [screen.key]: v }))}
            onSubmit={() => submitText(screen.key, screen.error)}
            placeholder={screen.placeholder}
            autoComplete={screen.autoComplete}
            error={fieldError}
            hidden={
              screen.key === "firstName" ? (
                <div className="absolute -left-[9999px]" aria-hidden>
                  <label htmlFor="sc-website">Website</label>
                  <input id="sc-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
              ) : undefined
            }
          />
        );

      case "email":
        return (
          <TextScreen
            title={leadScreens.email}
            kicker="Before we begin"
            type="email"
            value={lead.email}
            onChange={(v) => setLead((p) => ({ ...p, email: v }))}
            onSubmit={submitEmail}
            placeholder="you@company.com"
            autoComplete="email"
            error={fieldError}
          >
            <label className="mt-6 flex min-h-[44px] cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={lead.consent}
                onChange={(e) => setLead((p) => ({ ...p, consent: e.target.checked }))}
                className="mt-1 h-5 w-5 shrink-0 accent-[#141010]"
              />
              <span className="calm-body">{CONSENT_LABEL}</span>
            </label>
          </TextScreen>
        );

      case "leadChoice":
        return (
          <div>
            <Kicker>Before we begin</Kicker>
            <h1 className="sc-title">{screen.title}</h1>
            <Options options={screen.options} selected={lead[screen.key]} onPick={pick} />
            {busy && <p className="gl-mono mt-5 text-ink/60">Starting…</p>}
            {startError && (
              <p className="fm-error mt-4" role="alert">
                {startError}
              </p>
            )}
          </div>
        );

      case "scored":
        return (
          <div>
            <Kicker>
              {STAGE_NAMES[screen.q.stage]} · Question {screen.n} of {SCORED_QUESTIONS.length}
            </Kicker>
            <h1 className="sc-title">{screen.q.label}</h1>
            <Options options={stageOptions} selected={answers[screen.q.id]} onPick={pick} />
          </div>
        );

      case "country":
        return (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitCountry();
            }}
          >
            <Kicker>{FIRM_INTRO}</Kicker>
            <h1 id="sc-country-h" className="sc-title">
              {leadScreens.country}
            </h1>
            <div className="mt-8">
              <select
                autoFocus
                aria-labelledby="sc-country-h"
                aria-invalid={fieldError ? true : undefined}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setFieldError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitCountry();
                  }
                }}
                autoComplete="country-name"
                className="sc-input"
              >
                <option value="">Select your country…</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {fieldError && (
                <p className="fm-error" role="alert">
                  {fieldError}
                </p>
              )}
            </div>
            <div className="mt-8 flex items-center gap-5">
              <Next>OK →</Next>
              <Hint />
            </div>
          </form>
        );

      case "donors":
        return (
          <div>
            <Kicker>{FIRM_INTRO}</Kicker>
            <h1 className="sc-title">{leadScreens.donors}</h1>
            <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="group" aria-label="Donors">
              {DONORS.map((d, i) => (
                <button key={d} type="button" aria-pressed={donors.includes(d)} onClick={() => toggleDonor(d)} className="fm-option sc-option">
                  <span className="sc-key" aria-hidden>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{d}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-5">
              <Next type="button" onClick={submitDonors}>
                {donors.length ? "OK →" : "Skip →"}
              </Next>
              <Hint />
            </div>
          </div>
        );

      case "firm":
        return (
          <div>
            <Kicker>{FIRM_INTRO}</Kicker>
            <h1 className="sc-title">{screen.q.label}</h1>
            <Options options={screen.q.options.map((o) => ({ value: o.value, label: o.value }))} selected={firm[screen.q.id]} onPick={pick} />
          </div>
        );

      case "q6x": {
        const value = firm.q6x ?? "";
        const submit = () => void finish({ answers, firm, country, donors });
        return (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Kicker>{FIRM_INTRO}</Kicker>
            <label htmlFor="sc-q6x" className="sc-title block">
              {screen.q.label}
            </label>
            <textarea
              id="sc-q6x"
              autoFocus
              rows={3}
              maxLength={Q6X_MAX}
              value={value}
              onChange={(e) => setFirm((p) => ({ ...p, q6x: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              aria-describedby="sc-q6x-count"
              className="sc-input mt-8"
            />
            <p id="sc-q6x-count" className="gl-mono mt-2 text-right text-ink/50">
              {value.length} / {Q6X_MAX}
            </p>
            <div className="mt-6 flex items-center gap-5">
              <Next>{value.trim() ? "See my results →" : "Skip and see my results →"}</Next>
              <Hint>Press Enter ↵ · Shift+Enter for a new line</Hint>
            </div>
          </form>
        );
      }
    }
  })();

  const variants = {
    enter: (d: number) => ({ opacity: 0, y: reduce ? 0 : 28 * d }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: reduce ? 0 : -28 * d }),
  };

  return (
    <div ref={scroller} className="fixed inset-0 z-50 overflow-y-auto overscroll-contain" style={{ background: "var(--paper)" }}>
      {/* progress */}
      <div
        className="fixed inset-x-0 top-0 z-10 h-[3px] bg-ink/[0.1]"
        role="progressbar"
        aria-label="Scorecard progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div className="h-full origin-left bg-ink transition-transform duration-300 ease-out motion-reduce:transition-none" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* chrome: logo left, close right. No site header or footer. */}
      <header className="fixed inset-x-0 top-[3px] z-10 flex h-16 items-center justify-between px-4 md:px-8" style={{ background: "linear-gradient(var(--paper) 60%, transparent)" }}>
        <Link href="/" className="inline-flex items-center gap-2.5 font-[family-name:var(--font-brule)] text-xl font-bold">
          <svg aria-hidden focusable="false" viewBox="0 0 539 468" className="h-[2rem] w-auto shrink-0" fill="var(--signal)">
            <path d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z" />
          </svg>
          Made with Make
        </Link>
        <button type="button" onClick={close} className="sc-icon-btn -mr-2" aria-label="Close the scorecard">
          <X className="h-6 w-6" aria-hidden />
        </button>
      </header>

      <main className="mx-auto flex min-h-[100dvh] w-full max-w-[46rem] flex-col justify-center px-6 pb-28 pt-24">
        {/* The welcome screen renders straight away (and on the server) so crawlers and slow connections see it; any
            other starting point waits for the saved-progress check so a resume never flashes the wrong screen. */}
        {(ready || idx === 0) && phase === "flow" && (
          <AnimatePresence mode="wait" initial={false} custom={dir.current}>
            <motion.div key={idx} custom={dir.current} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeOut" }}>
              {body}
            </motion.div>
          </AnimatePresence>
        )}

        {phase === "loading" && (
          <div role="status" aria-live="polite">
            <h1 className="sc-title">Calculating your score…</h1>
            <ul className="mt-9 flex flex-col gap-3">
              {STAGES.map((s, i) => (
                <li key={s} className={`flex items-center gap-3 text-[1.4rem] transition-opacity duration-300 motion-reduce:transition-none ${i < tick ? "opacity-100" : "opacity-35"}`}>
                  <span className="sc-key" aria-hidden style={i < tick ? { background: "var(--signal)", borderColor: "var(--signal)" } : undefined}>
                    {i < tick ? "✓" : ""}
                  </span>
                  <span className={i < tick ? "font-bold" : ""}>{STAGE_NAMES[s]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {phase === "error" && (
          <div role="alert">
            <h1 className="sc-title">We couldn&apos;t work out your score just now.</h1>
            <p className="calm-body mt-5 text-ink/75">Your answers are saved, so please try again.</p>
            <div className="mt-8">
              <Next type="button" onClick={() => void finish({ answers, firm, country, donors })}>
                Try again →
              </Next>
            </div>
          </div>
        )}
      </main>

      {/* back */}
      {phase === "flow" && idx > 0 && (
        <div className="fixed bottom-0 left-0 z-10 p-4 md:p-8">
          <button type="button" onClick={back} disabled={backDisabled} className="sc-icon-btn border border-ink/30 bg-paper" style={{ background: "var(--paper)" }} aria-label="Previous question">
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {phase === "flow" && screen.kind === "scored" ? `${STAGE_NAMES[screen.q.stage]}, question ${screen.n} of ${SCORED_QUESTIONS.length}` : ""}
      </p>
    </div>
  );
}
