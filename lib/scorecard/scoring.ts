/** Pure scoring for the Proposal Pipeline Scorecard. Runs on the server (never trust client scores). */
import { DEFAULT_HOURLY_RATE, SAVED_SHARE } from "./config";
import {
  FIRM_QUESTIONS,
  FIRM_SIZES,
  NO_DONORS,
  SCORED_QUESTIONS,
  STAGES,
  STAGE_MAX,
  TOTAL_MAX,
  type AnswerValue,
  type Stage,
} from "./questions";

export type TierKey = "manual" | "patched" | "connected" | "machine";
export type StageLabel = "Weak" | "Okay" | "Strong";
export type Segment = "ready" | "almost" | "playbook";

export type Answers = Record<string, AnswerValue | undefined>;
export type FirmAnswers = Record<string, string | undefined>;

export type StageScore = { points: number; pct: number; label: StageLabel };

export type PriorityFix = { stage: Stage; help: boolean; pct: number; note?: string };

export type ScoreResult = {
  stageScores: Record<Stage, StageScore>;
  totalPoints: number;
  totalPct: number;
  tier: TierKey;
  helpFlags: Stage[];
  fixes: PriorityFix[];
  hoursMonth: number;
  costMonth: number;
  savedHours: number;
  segment: Segment;
};

export const EVEN_STRONG_NOTE = "Even strong pipelines have a next step.";

export function points(answer: AnswerValue | undefined, weight: number): number {
  if (answer === "yes") return weight;
  if (answer === "partly") return weight / 2;
  return 0;
}

export function tierFor(pct: number): TierKey {
  if (pct >= 85) return "machine";
  if (pct >= 65) return "connected";
  if (pct >= 40) return "patched";
  return "manual";
}

export function stageLabelFor(pct: number): StageLabel {
  if (pct >= 80) return "Strong";
  if (pct >= 50) return "Okay";
  return "Weak";
}

/** Number used in the cost maths for a stored firm answer (c1 or c2). */
export function firmNumber(id: "c1" | "c2", value: string | undefined): number {
  const q = FIRM_QUESTIONS.find((x) => x.id === id);
  return q?.options.find((o) => o.value === value)?.n ?? 0;
}

/** Fix order: stages with a help flag first, then lowest % first; ties keep Find → Submit order. */
export function priorityFixes(stageScores: Record<Stage, StageScore>, helpFlags: readonly Stage[]): PriorityFix[] {
  const rows: PriorityFix[] = STAGES.map((s) => ({ stage: s, help: helpFlags.includes(s), pct: stageScores[s].pct }));
  const candidates = rows.filter((r) => stageScores[r.stage].label !== "Strong");
  if (candidates.length === 0) {
    const lowest = [...rows].sort((a, b) => a.pct - b.pct)[0];
    return [{ ...lowest, note: EVEN_STRONG_NOTE }];
  }
  return candidates
    .map((r, i) => ({ r, i }))
    .sort((a, b) => Number(b.r.help) - Number(a.r.help) || a.r.pct - b.r.pct || a.i - b.i)
    .slice(0, 3)
    .map((x) => x.r);
}

/** The n lowest-scoring stages, lowest first; ties keep Find → Submit order. */
export function weakestStages(stageScores: Record<Stage, StageScore>, n = 2): Stage[] {
  return STAGES.map((s, i) => ({ s, i, pct: stageScores[s].pct }))
    .sort((a, b) => a.pct - b.pct || a.i - b.i)
    .slice(0, n)
    .map((x) => x.s);
}

/**
 * Which results page a firm sees, from the Ideal Client Profile (never shown to the visitor by these names):
 *  - ready:    15–100 staff and 10+ proposals a month, responding to donor-funded RFPs
 *  - playbook: no donor-funded RFPs, 1–4 staff, under 5 proposals a month, or a firm of over 100 that already
 *              uses proposal software
 *  - almost:   everyone else (for example 5–9 proposals a month, or 5–14 staff with high volume)
 */
export function segmentFor(args: { firmSize: string; firm: FirmAnswers; donors: readonly string[] }): Segment {
  const size = FIRM_SIZES.indexOf(args.firmSize as (typeof FIRM_SIZES)[number]); // 0 = 1–4 … 4 = Over 100
  const volumes = FIRM_QUESTIONS.find((q) => q.id === "c1")!.options.map((o) => o.value);
  const volume = volumes.indexOf(args.firm.c1 ?? ""); // 0 = 1–4 … 3 = 20+

  const donorFunded = args.donors.some((d) => d !== NO_DONORS);
  const largeWithSoftware = size === 4 && args.firm.q1x === "We use proposal software";

  if (!donorFunded || size <= 0 || volume <= 0 || largeWithSoftware) return "playbook";
  if ((size === 2 || size === 3) && volume >= 2) return "ready";
  return "almost";
}

export function computeResult(input: {
  answers: Answers;
  firm: FirmAnswers;
  firmSize: string;
  donors: readonly string[];
  hourlyRate?: number;
}): ScoreResult {
  const rate = input.hourlyRate && input.hourlyRate > 0 ? input.hourlyRate : DEFAULT_HOURLY_RATE;

  const stagePoints = Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<Stage, number>;
  const help = new Set<Stage>();
  for (const q of SCORED_QUESTIONS) {
    const a = input.answers[q.id];
    stagePoints[q.stage] += points(a, q.weight);
    if (a === "help") help.add(q.stage);
  }

  const stageScores = Object.fromEntries(
    STAGES.map((s) => {
      const pct = Math.round((stagePoints[s] / STAGE_MAX[s]) * 100);
      return [s, { points: stagePoints[s], pct, label: stageLabelFor(pct) }];
    }),
  ) as Record<Stage, StageScore>;

  const totalPoints = STAGES.reduce((n, s) => n + stagePoints[s], 0);
  const totalPct = Math.round((totalPoints / TOTAL_MAX) * 100);
  const helpFlags = STAGES.filter((s) => help.has(s));

  const hoursMonth = Math.round(firmNumber("c1", input.firm.c1) * firmNumber("c2", input.firm.c2));
  const costMonth = hoursMonth * rate;
  const savedHours = Math.round(hoursMonth * SAVED_SHARE);

  return {
    stageScores,
    totalPoints,
    totalPct,
    tier: tierFor(totalPct),
    helpFlags,
    fixes: priorityFixes(stageScores, helpFlags),
    hoursMonth,
    costMonth,
    savedHours,
    segment: segmentFor({ firmSize: input.firmSize, firm: input.firm, donors: input.donors }),
  };
}

export function formatUsd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}
