import { z } from "zod";
import { COUNTRIES } from "../countries";
import {
  ANSWER_VALUES,
  DONORS,
  FIRM_QUESTIONS,
  FIRM_SIZES,
  Q6X_MAX,
  ROLES,
  SCORED_IDS,
  type AnswerValue,
} from "../questions";

const short = (max: number) => z.string().trim().max(max);

export const startSchema = z.object({
  firstName: short(100).min(1),
  email: short(254).email(),
  firmName: short(150).min(1),
  role: z.enum(ROLES),
  firmSize: z.enum(FIRM_SIZES),
  consent: z.literal(true),
  utmSource: short(200).optional(),
  utmMedium: short(200).optional(),
  utmCampaign: short(200).optional(),
  referrer: short(500).optional(),
  /** honeypot: real visitors never fill this */
  website: z.string().optional(),
});

/** Validates a (possibly partial) answers object; unknown keys and invalid values are rejected. */
export function parseAnswers(input: unknown): Record<string, AnswerValue> | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return null;
  const out: Record<string, AnswerValue> = {};
  for (const [k, v] of Object.entries(input)) {
    if (!SCORED_IDS.includes(k) || !ANSWER_VALUES.includes(v as AnswerValue)) return null;
    out[k] = v as AnswerValue;
  }
  return out;
}

export function parseFirmAnswers(input: unknown): Record<string, string> | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return null;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(input)) {
    const q = FIRM_QUESTIONS.find((x) => x.id === k);
    if (!q || typeof v !== "string") return null;
    if (q.optionalText) {
      const text = v.trim().slice(0, Q6X_MAX);
      if (text) out[k] = text;
    } else if (q.options.some((o) => o.value === v)) {
      out[k] = v;
    } else {
      return null;
    }
  }
  return out;
}

export const patchSchema = z.object({
  answers: z.unknown().optional(),
  firmAnswers: z.unknown().optional(),
  /** collected after the scored questions, so saved here rather than at /start */
  country: z.string().refine((c) => COUNTRIES.includes(c), "unknown country").optional(),
  donors: z.array(z.enum(DONORS)).max(DONORS.length).optional(),
});

/** Required ids before a submission can be completed (q6x is optional). */
export const REQUIRED_FIRM_IDS = FIRM_QUESTIONS.filter((q) => !q.optionalText).map((q) => q.id);

export function missingIds(
  answers: Record<string, string>,
  firm: Record<string, string>,
  country = "",
  donors: readonly string[] = [],
): string[] {
  return [
    ...SCORED_IDS.filter((id) => !answers[id]),
    ...(country ? [] : ["country"]),
    ...(donors.length ? [] : ["donors"]),
    ...REQUIRED_FIRM_IDS.filter((id) => !firm[id]),
  ];
}
