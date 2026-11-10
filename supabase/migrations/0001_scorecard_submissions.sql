-- Proposal Pipeline Scorecard: one row per submission.
-- All access goes through the Next.js server with the service role key. RLS is on with NO policies,
-- so the anon and authenticated roles cannot read or write anything.

create table if not exists public.scorecard_submissions (
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

alter table public.scorecard_submissions enable row level security;
-- intentionally no policies

create index if not exists scorecard_submissions_status_created_idx
  on public.scorecard_submissions (status, created_at);

create index if not exists scorecard_submissions_ip_created_idx
  on public.scorecard_submissions (ip_hash, created_at);

create or replace function public.scorecard_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists scorecard_touch_updated_at on public.scorecard_submissions;
create trigger scorecard_touch_updated_at
  before update on public.scorecard_submissions
  for each row execute function public.scorecard_touch_updated_at();

-- ---------------------------------------------------------------------------------------------
-- Abandon reminder schedule (every 15 minutes). Vercel Hobby only allows daily crons, so this uses
-- Supabase pg_cron + pg_net to call the site's cron route. Run once, after enabling both extensions
-- (Database > Extensions) and replacing the two placeholders. If you are on Vercel Pro you can use a
-- vercel.json cron instead: { "crons": [{ "path": "/api/cron/scorecard-abandon", "schedule": "*/15 * * * *" }] }
--
-- select cron.schedule(
--   'scorecard-abandon',
--   '*/15 * * * *',
--   $$ select net.http_get(
--        url := 'https://YOUR-DOMAIN/api/cron/scorecard-abandon',
--        headers := jsonb_build_object('Authorization', 'Bearer YOUR_CRON_SECRET')
--      ); $$
-- );
