-- Proposal Pipeline Scorecard: one row per submission (Neon Postgres).
-- Only the Next.js server reads or writes this table, through DATABASE_URL, so there is no public access path.
-- Apply with: node scripts/db-migrate.mjs   (uses the direct, non-pooled DATABASE_URL_UNPOOLED)

create table if not exists scorecard_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'started' check (status in ('started', 'completed')),

  -- lead form
  first_name text not null,
  email text not null,
  firm_name text not null,
  role text not null,
  firm_size text not null,
  country text not null,
  donors text[] not null default '{}',
  consent boolean not null default false,

  -- answers
  answers jsonb not null default '{}'::jsonb,
  firm_answers jsonb not null default '{}'::jsonb,

  -- results (set on completion)
  stage_scores jsonb,
  total_points numeric,
  total_pct int,
  tier text,
  help_flags text[] not null default '{}',
  hours_month int,
  cost_month int,
  saved_hours int,
  segment text,

  -- attribution and abuse control
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  ip_hash text,

  abandon_email_sent_at timestamptz,
  completed_at timestamptz
);

create index if not exists scorecard_submissions_status_created_idx
  on scorecard_submissions (status, created_at);

create index if not exists scorecard_submissions_ip_created_idx
  on scorecard_submissions (ip_hash, created_at);

create or replace function scorecard_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists scorecard_touch_updated_at on scorecard_submissions;
create trigger scorecard_touch_updated_at
  before update on scorecard_submissions
  for each row execute function scorecard_touch_updated_at();
