-- Funnel queries for the Proposal Audit. Read-only. Paste into the Neon SQL editor.
-- Page views and button clicks are in Google Analytics (events: scorecard_view, scorecard_start,
-- scorecard_lead_submitted, scorecard_completed, audit_result_viewed, results_cta_clicked, first_draft_requested).

-- 1. Where people drop off: started the audit vs finished it, by week.
select date_trunc('week', created_at)::date as week,
       count(*)                                    as started,
       count(*) filter (where status = 'completed') as completed,
       round(100.0 * count(*) filter (where status = 'completed') / count(*), 0) as completion_pct
from scorecard_submissions
group by 1 order by 1 desc;

-- 2. Which results page people land on.
select case segment when 'ideal' then 'ready' when 'later' then 'almost' when 'not_fit' then 'playbook' when 'machine' then 'playbook'
            else coalesce(segment, '(not finished)') end as page,
       count(*) as people,
       round(100.0 * count(*) / sum(count(*)) over (), 0) as share_pct,
       round(avg(total_pct), 0) as avg_score_pct,
       round(avg(cost_month), 0) as avg_monthly_cost_usd
from scorecard_submissions
group by 1 order by 2 desc;

-- 3. Ready results: who has used their free first draft, and who is still waiting.
select count(*)                                                       as ready_results,
       count(*) filter (where draft_requested_at is not null)         as drafts_requested,
       count(*) filter (where draft_requested_at is null and ready_nudge_sent_at is not null) as reminded_not_used,
       round(100.0 * count(*) filter (where draft_requested_at is not null) / nullif(count(*), 0), 0) as draft_pct
from scorecard_submissions
where status = 'completed' and segment in ('ready', 'ideal');

-- 4. The ready list for your personal follow-up: newest first, help requests flagged.
select completed_at::date as completed, first_name, email, firm_name, firm_size, country,
       firm_answers->>'c1' as proposals_a_month, total_pct, help_flags,
       draft_requested_at is not null as draft_requested
from scorecard_submissions
where status = 'completed' and segment in ('ready', 'ideal')
order by completed_at desc limit 50;

-- 5. Where your leads come from.
select coalesce(utm_source, '(direct or unknown)') as source, count(*) as started,
       count(*) filter (where status = 'completed') as completed,
       count(*) filter (where segment in ('ready', 'ideal')) as ready
from scorecard_submissions
group by 1 order by 2 desc;
