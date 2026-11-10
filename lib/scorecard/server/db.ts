/**
 * Supabase access for the scorecard, over PostgREST with the service role key. Server only: never import this
 * from a client component. RLS is on with no policies, so only this key can touch the table.
 */
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

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: string) => UUID.test(s);

export const dbConfigured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

async function rest<T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<T> {
  const base = process.env.SUPABASE_URL!.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const { prefer, headers, ...rest } = init;
  const res = await fetch(`${base}/rest/v1/${path}`, {
    cache: "no-store",
    ...rest,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
      ...(headers as Record<string, string> | undefined),
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : []) as T;
}

const TABLE = "scorecard_submissions";

export async function insertSubmission(row: Record<string, unknown>): Promise<SubmissionRow> {
  const out = await rest<SubmissionRow[]>(TABLE, { method: "POST", body: JSON.stringify(row), prefer: "return=representation" });
  return out[0];
}

export async function getSubmission(id: string, select = "*"): Promise<Partial<SubmissionRow> | null> {
  if (!isUuid(id)) return null;
  const out = await rest<Partial<SubmissionRow>[]>(`${TABLE}?id=eq.${id}&select=${encodeURIComponent(select)}&limit=1`);
  return out[0] ?? null;
}

/** Updates a row. With `onlyIfStarted`, the update only applies while status is still "started" (atomic guard). */
export async function updateSubmission(
  id: string,
  patch: Record<string, unknown>,
  opts: { onlyIfStarted?: boolean } = {},
): Promise<SubmissionRow | null> {
  if (!isUuid(id)) return null;
  const filter = opts.onlyIfStarted ? `&status=eq.started` : "";
  const out = await rest<SubmissionRow[]>(`${TABLE}?id=eq.${id}${filter}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
    prefer: "return=representation",
  });
  return out[0] ?? null;
}

export async function countRecentStartsByIp(ipHash: string, sinceIso: string): Promise<number> {
  const out = await rest<{ id: string }[]>(
    `${TABLE}?ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${encodeURIComponent(sinceIso)}&select=id&limit=100`,
  );
  return out.length;
}

export async function listAbandoned(beforeIso: string): Promise<Pick<SubmissionRow, "id" | "first_name" | "email" | "consent">[]> {
  return rest(
    `${TABLE}?status=eq.started&abandon_email_sent_at=is.null&created_at=lt.${encodeURIComponent(beforeIso)}&select=id,first_name,email,consent&order=created_at.asc&limit=100`,
  );
}

/** Marks the reminder as sent only if it has not been sent (so two overlapping cron runs cannot both send). */
export async function claimAbandonReminder(id: string): Promise<boolean> {
  if (!isUuid(id)) return false;
  const out = await rest<{ id: string }[]>(`${TABLE}?id=eq.${id}&status=eq.started&abandon_email_sent_at=is.null`, {
    method: "PATCH",
    body: JSON.stringify({ abandon_email_sent_at: new Date().toISOString() }),
    prefer: "return=representation",
  });
  return out.length === 1;
}

export async function releaseAbandonReminder(id: string): Promise<void> {
  if (!isUuid(id)) return;
  await rest(`${TABLE}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ abandon_email_sent_at: null }) });
}
