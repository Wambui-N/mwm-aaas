/**
 * Postgres access for the scorecard on Neon, over Neon's serverless driver (HTTP, so it works on Vercel and the edge).
 * Server only: never import this from a client component. The connection string (DATABASE_URL) is the only secret
 * that can touch the table, so it must never reach the browser.
 */
import { neon } from "@neondatabase/serverless";
import type { Segment, TierKey } from "../scoring";
import type { Stage } from "../questions";

export type SubmissionRow = {
  id: string;
  created_at: string;
  status: "started" | "completed";
  first_name: string;
  email: string;
  firm_name: string;
  role: string;
  firm_size: string;
  country: string;
  donors: string[];
  consent: boolean;
  answers: Record<string, string>;
  firm_answers: Record<string, string>;
  stage_scores: Record<Stage, { points: number; pct: number; label: string }> | null;
  total_points: number | null;
  total_pct: number | null;
  tier: TierKey | null;
  help_flags: Stage[];
  hours_month: number | null;
  cost_month: number | null;
  saved_hours: number | null;
  segment: Segment | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  abandon_email_sent_at: string | null;
  completed_at: string | null;
  draft_requested_at: string | null;
  ready_nudge_sent_at: string | null;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: string) => UUID.test(s);

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

type Row = Record<string, unknown>;
type Runner = (text: string, params: unknown[]) => Promise<Row[]>;

const neonRunner: Runner = async (text, params) => {
  const sql = neon(process.env.DATABASE_URL!);
  return (await sql.query(text, params)) as Row[];
};

let run: Runner = neonRunner;
/** Swap the query runner (tests run the same SQL against a local Postgres). */
export const setQueryRunner = (r: Runner | null) => {
  run = r ?? neonRunner;
};

const TABLE = "scorecard_submissions";

/** Every column this module may read or write, and how its value is passed to Postgres. */
const JSONB = new Set(["answers", "firm_answers", "stage_scores"]);
const TEXT_ARRAY = new Set(["donors", "help_flags"]);
const COLUMNS = new Set([
  "id", "created_at", "status", "first_name", "email", "firm_name", "role", "firm_size", "country", "donors", "consent",
  "answers", "firm_answers", "stage_scores", "total_points", "total_pct", "tier", "help_flags", "hours_month", "cost_month",
  "saved_hours", "segment", "utm_source", "utm_medium", "utm_campaign", "referrer", "ip_hash", "abandon_email_sent_at", "completed_at", "draft_requested_at", "ready_nudge_sent_at",
]);

function col(name: string): string {
  if (!COLUMNS.has(name)) throw new Error(`unknown column: ${name}`);
  return name;
}

/** Placeholder for a value, with a cast where the driver needs one (jsonb and text[]). */
function place(column: string, value: unknown, params: unknown[]): string {
  if (value === null || value === undefined) params.push(null);
  else if (JSONB.has(column)) params.push(JSON.stringify(value));
  else params.push(value);
  const n = `$${params.length}`;
  return JSONB.has(column) ? `${n}::jsonb` : TEXT_ARRAY.has(column) ? `${n}::text[]` : n;
}

/** numeric comes back as a string and timestamptz as a Date; hand callers the shapes they had before. */
function normalise<T>(row: Row | undefined): T | null {
  if (!row) return null;
  const out: Row = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = v instanceof Date ? v.toISOString() : k === "total_points" && v !== null ? Number(v) : v;
  }
  return out as T;
}

export async function insertSubmission(row: Record<string, unknown>): Promise<SubmissionRow> {
  const keys = Object.keys(row).map(col);
  const params: unknown[] = [];
  const values = keys.map((k) => place(k, row[k], params));
  const out = await run(`insert into ${TABLE} (${keys.join(", ")}) values (${values.join(", ")}) returning *`, params);
  return normalise<SubmissionRow>(out[0])!;
}

export async function getSubmission(id: string, select = "*"): Promise<Partial<SubmissionRow> | null> {
  if (!isUuid(id)) return null;
  const cols = select === "*" ? "*" : select.split(",").map((c) => col(c.trim())).join(", ");
  const out = await run(`select ${cols} from ${TABLE} where id = $1 limit 1`, [id]);
  return normalise<Partial<SubmissionRow>>(out[0]);
}

/** Updates a row. With `onlyIfStarted`, the update only applies while status is still "started" (atomic guard). */
export async function updateSubmission(
  id: string,
  patch: Record<string, unknown>,
  opts: { onlyIfStarted?: boolean } = {},
): Promise<SubmissionRow | null> {
  if (!isUuid(id)) return null;
  const keys = Object.keys(patch).map(col);
  if (!keys.length) return null;
  const params: unknown[] = [id];
  const sets = keys.map((k) => `${k} = ${place(k, patch[k], params)}`);
  const guard = opts.onlyIfStarted ? " and status = 'started'" : "";
  const out = await run(`update ${TABLE} set ${sets.join(", ")} where id = $1${guard} returning *`, params);
  return normalise<SubmissionRow>(out[0]);
}

export async function countRecentStartsByIp(ipHash: string, sinceIso: string): Promise<number> {
  const out = await run(`select count(*)::int as n from ${TABLE} where ip_hash = $1 and created_at >= $2`, [ipHash, sinceIso]);
  return Number(out[0]?.n ?? 0);
}

export async function listAbandoned(beforeIso: string): Promise<Pick<SubmissionRow, "id" | "first_name" | "email" | "consent">[]> {
  const out = await run(
    `select id, first_name, email, consent from ${TABLE}
     where status = 'started' and abandon_email_sent_at is null and created_at < $1
     order by created_at asc limit 100`,
    [beforeIso],
  );
  return out as Pick<SubmissionRow, "id" | "first_name" | "email" | "consent">[];
}

/** Marks the reminder as sent only if it has not been sent (so two overlapping cron runs cannot both send). */
export async function claimAbandonReminder(id: string): Promise<boolean> {
  if (!isUuid(id)) return false;
  const out = await run(
    `update ${TABLE} set abandon_email_sent_at = now() where id = $1 and status = 'started' and abandon_email_sent_at is null returning id`,
    [id],
  );
  return out.length === 1;
}

export async function releaseAbandonReminder(id: string): Promise<void> {
  if (!isUuid(id)) return;
  await run(`update ${TABLE} set abandon_email_sent_at = null where id = $1`, [id]);
}

/**
 * Claims the free first draft for a completed "ready" result, once. Returns the row when this call claimed it, or null
 * when the result is not ready, not completed, or already used. The check and the claim are one statement, so two
 * overlapping requests cannot both succeed. ("ideal" is the segment name saved before the three pages existed.)
 */
export async function claimFirstDraft(id: string): Promise<SubmissionRow | null> {
  if (!isUuid(id)) return null;
  const out = await run(
    `update ${TABLE} set draft_requested_at = now()
     where id = $1 and status = 'completed' and segment in ('ready', 'ideal') and draft_requested_at is null
     returning *`,
    [id],
  );
  return normalise<SubmissionRow>(out[0]);
}

/** Gives the draft back when sending it to the pipeline failed, so the person can try again. */
export async function releaseFirstDraft(id: string): Promise<void> {
  if (!isUuid(id)) return;
  await run(`update ${TABLE} set draft_requested_at = null where id = $1`, [id]);
}

/**
 * "Ready" results from before `beforeIso` that have neither used their free first draft nor had the reminder yet,
 * and that agreed to be emailed. ("ideal" is the segment name saved before the three results pages existed.)
 */
export async function listReadyNudges(beforeIso: string): Promise<Pick<SubmissionRow, "id" | "first_name" | "email">[]> {
  const out = await run(
    `select id, first_name, email from ${TABLE}
     where status = 'completed' and segment in ('ready', 'ideal') and consent = true
       and draft_requested_at is null and ready_nudge_sent_at is null and completed_at < $1
     order by completed_at asc limit 100`,
    [beforeIso],
  );
  return out as Pick<SubmissionRow, "id" | "first_name" | "email">[];
}

/** Marks the reminder as sent only if it has not been sent and the draft is still unused, so overlapping runs cannot both send. */
export async function claimReadyNudge(id: string): Promise<boolean> {
  if (!isUuid(id)) return false;
  const out = await run(
    `update ${TABLE} set ready_nudge_sent_at = now()
     where id = $1 and status = 'completed' and draft_requested_at is null and ready_nudge_sent_at is null returning id`,
    [id],
  );
  return out.length === 1;
}

export async function releaseReadyNudge(id: string): Promise<void> {
  if (!isUuid(id)) return;
  await run(`update ${TABLE} set ready_nudge_sent_at = null where id = $1`, [id]);
}
