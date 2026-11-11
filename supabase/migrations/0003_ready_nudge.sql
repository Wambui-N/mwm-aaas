-- One reminder for "ready" audit results that have not used their free first draft. Set when it is sent (or claimed),
-- so it goes out once. Plain Postgres: run in the Neon SQL editor after 0002_first_draft_requested.sql.

alter table public.scorecard_submissions
  add column if not exists ready_nudge_sent_at timestamptz;

create index if not exists scorecard_submissions_nudge_idx
  on public.scorecard_submissions (completed_at)
  where status = 'completed' and draft_requested_at is null and ready_nudge_sent_at is null;
