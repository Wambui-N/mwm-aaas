-- One free first draft per audit result. Set when the draft form is accepted, so the same link cannot be used twice.
-- Plain Postgres: run in the Neon SQL editor after 0001_scorecard_submissions.sql.

alter table public.scorecard_submissions
  add column if not exists draft_requested_at timestamptz;
