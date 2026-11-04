/** Pure scoring for the Proposal Pipeline Scorecard. Runs on the server (never trust client scores). */
import { DEFAULT_HOURLY_RATE, SAVED_SHARE } from "./config";
import {
  FIRM_QUESTIONS,
  FIRM_SIZES,
  SCORED_QUESTIONS,
  STAGES,
  STAGE_MAX,
  TOTAL_MAX,
  type AnswerValue,
  type Stage,
} from "./questions";

export type TierKey = "manual" | "patched" | "connected" | "machine";
export type StageLabel = "Weak" | "Okay" | "Strong";
export type Segment = "not_fit" | "machine" | "ideal" | "later";

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

export function segmentFor(args: { totalPct: number; firmSize: string; firm: FirmAnswers }): Segment {
  const sizeIdx = FIRM_SIZES.indexOf(args.firmSize as (typeof FIRM_SIZES)[number]);
  const c1 = FIRM_QUESTIONS.find((q) => q.id === "c1")!.options.map((o) => o.value);
  const c1Idx = c1.indexOf(args.firm.c1 ?? "");
  if (sizeIdx === 0 || c1Idx === 0) return "not_fit";
  if (args.totalPct >= 85) return "machine";
  const soon = args.firm.q5x === "This month" || args.firm.q5x === "In the next 3 months";
  const handsOn = args.firm.q4x === "With a specialist building it alongside us" || args.firm.q4x === "Built and run for us";
  if (sizeIdx >= 1 && c1Idx >= 1 && soon && handsOn) return "ideal";
  return "later";
}

export function computeResult(input: {
  answers: Answers;
  firm: FirmAnswers;
  firmSize: string;
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
    segment: segmentFor({ totalPct, firmSize: input.firmSize, firm: input.firm }),
  };
}

export function formatUsd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}
