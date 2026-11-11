import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { ResultsView, type ResultsData } from "@/components/scorecard/ResultsView";
import { SCORECARD_PATH } from "@/lib/scorecard/config";
import { dbConfigured, getSubmission, isUuid, type SubmissionRow } from "@/lib/scorecard/server/db";
import { absolute, demoVideoUrl, nextLinks } from "@/lib/scorecard/server/links";

export const dynamic = "force-dynamic";

/** Submissions saved before the three pages existed carry the old segment names. */
const LEGACY: Record<string, ResultsData["segment"]> = { ideal: "ready", later: "almost", not_fit: "playbook", machine: "playbook" };

export const metadata: Metadata = {
  title: "Your Proposal Pipeline Score",
  robots: { index: false, follow: false },
};

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id) || !dbConfigured()) notFound();

  // Only the fields the results page shows. Email, firm name, donors and the free-text answer are never read here.
  const row = (await getSubmission(
    id,
    "status,first_name,total_pct,tier,stage_scores,help_flags,hours_month,cost_month,saved_hours,segment",
  ).catch(() => null)) as Partial<SubmissionRow> | null;
  if (!row) notFound();
  if (row.status !== "completed" || !row.stage_scores || row.total_pct == null || !row.tier || !row.segment) redirect(`${SCORECARD_PATH}?resume=${id}`);

  const data: ResultsData = {
    firstName: row.first_name ?? "",
    totalPct: row.total_pct,
    tier: row.tier,
    stageScores: row.stage_scores as ResultsData["stageScores"],
    helpFlags: row.help_flags ?? [],
    hoursMonth: row.hours_month ?? 0,
    costMonth: row.cost_month ?? 0,
    savedHours: row.saved_hours ?? 0,
    segment: LEGACY[row.segment] ?? (row.segment as ResultsData["segment"]),
  };


  return (
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <ResultsView data={data} links={nextLinks(data.segment)} demoUrl={demoVideoUrl()} />
        </div>
      </main>
    </SiteShell>
  );
}
