/**
 * Neon Postgres access for the scorecard, with node-postgres on the pooled DATABASE_URL (the Neon-recommended
 * setup for Vercel: a shared Pool attached with attachDatabasePool). Server only: never import this from a client
 * component. Migrations run separately over the direct connection (scripts/db-migrate.mjs).
 */
import { Pool, types } from "pg";
import { attachDatabasePool } from "@vercel/functions";
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
};

// numeric -> number, timestamptz -> ISO string (pg returns a string and a Date by default)
types.setTypeParser(1700, (v) => parseFloat(v));
types.setTypeParser(1184, (v) => new Date(v).toISOString());

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: string) => UUID.test(s);

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

const TABLE = "scorecard_submissions";
const COLUMNS = new Set([
  "id", "created_at", "updated_at", "status", "first_name", "email", "firm_name", "role", "firm_size", "country", "donors",
  "consent", "answers", "firm_answers", "stage_scores", "total_points", "total_pct", "tier", "help_flags", "hours_month",
  "cost_month", "saved_hours", "segment", "utm_source", "utm_medium", "utm_campaign", "referrer", "ip_hash",
  "abandon_email_sent_at", "completed_at",
]);
const JSONB = new Set(["answers", "firm_answers", "stage_scores"]);

let pool: Pool | undefined;
function getPool(): Pool {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
    attachDatabasePool(pool);
  }
  return pool;
}

async function query<T>(text: string, params: unknown[] = []): Promise<T[]> {
  const res = await getPool().query(text, params);
  return res.rows as T[];
}

/** Column names only ever come from server code, but they are checked anyway before going into SQL. */
function cols(names: string[]): string[] {
  for (const n of names) if (!COLUMNS.has(n)) throw new Error(`unknown column: ${n}`);
  return names;
}

const param = (col: string, value: unknown) => (JSONB.has(col) && value !== null ? JSON.stringify(value) : value);
const slot = (col: string, i: number) => (JSONB.has(col) ? `$${i}::jsonb` : `$${i}`);

export async function insertSubmission(row: Record<string, unknown>): Promise<SubmissionRow> {
  const names = cols(Object.keys(row));
  const rows = await query<SubmissionRow>(
    `insert into ${TABLE} (${names.join(", ")}) values (${names.map((c, i) => slot(c, i + 1)).join(", ")}) returning *`,
    names.map((c) => param(c, row[c])),
  );
  return rows[0];
}

export async function getSubmission(id: string, select = "*"): Promise<Partial<SubmissionRow> | null> {
  if (!isUuid(id)) return null;
  const list = select === "*" ? "*" : cols(select.split(",").map((s) => s.trim())).join(", ");
  const rows = await query<Partial<SubmissionRow>>(`select ${list} from ${TABLE} where id = $1 limit 1`, [id]);
  return rows[0] ?? null;
}

/** Updates a row. With `onlyIfStarted`, the update only applies while status is still "started" (atomic guard). */
export async function updateSubmission(
  id: string,
  patch: Record<string, unknown>,
  opts: { onlyIfStarted?: boolean } = {},
): Promise<SubmissionRow | null> {
  if (!isUuid(id)) return null;
  const names = cols(Object.keys(patch));
  if (!names.length) return null;
  const set = names.map((c, i) => `${c} = ${slot(c, i + 1)}`).join(", ");
  const rows = await query<SubmissionRow>(
    `update ${TABLE} set ${set} where id = $${names.length + 1}${opts.onlyIfStarted ? " and status = 'started'" : ""} returning *`,
    [...names.map((c) => param(c, patch[c])), id],
  );
  return rows[0] ?? null;
}

export async function countRecentStartsByIp(ipHash: string, sinceIso: string): Promise<number> {
  const rows = await query<{ n: number }>(`select count(*)::int as n from ${TABLE} where ip_hash = $1 and created_at >= $2`, [ipHash, sinceIso]);
  return rows[0]?.n ?? 0;
}

export async function listAbandoned(beforeIso: string): Promise<Pick<SubmissionRow, "id" | "first_name" | "email" | "consent">[]> {
  return query(
    `select id, first_name, email, consent from ${TABLE}
     where status = 'started' and abandon_email_sent_at is null and created_at < $1
     order by created_at asc limit 100`,
    [beforeIso],
  );
}

/** Marks the reminder as sent only if it has not been sent (so two overlapping cron runs cannot both send). */
export async function claimAbandonReminder(id: string): Promise<boolean> {
  if (!isUuid(id)) return false;
  const rows = await query<{ id: string }>(
    `update ${TABLE} set abandon_email_sent_at = now() where id = $1 and status = 'started' and abandon_email_sent_at is null returning id`,
    [id],
  );
  return rows.length === 1;
}

export async function releaseAbandonReminder(id: string): Promise<void> {
  if (!isUuid(id)) return;
  await query(`update ${TABLE} set abandon_email_sent_at = null where id = $1`, [id]);
}
