import { NextRequest, NextResponse } from "next/server";
import { SCORECARD_PATH } from "@/lib/scorecard/config";
import { computeResult, type Answers, type FirmAnswers } from "@/lib/scorecard/scoring";
import { dbConfigured, getSubmission, isUuid, updateSubmission, type SubmissionRow } from "@/lib/scorecard/server/db";
import { alertEmail, resultsEmail } from "@/lib/scorecard/server/emailTemplates";
import { sendMail } from "@/lib/scorecard/server/mail";
import { missingIds } from "@/lib/scorecard/server/validate";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/**
 * Validates the stored answers, scores them on the server, saves the results and sends the emails.
 * Idempotent: completing twice returns the same URL and sends nothing the second time.
 */
export async function POST(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (!dbConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  const url = `${SCORECARD_PATH}/results/${id}`;

  try {
    const row = (await getSubmission(id)) as SubmissionRow | null;
    if (!row) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    if (row.status === "completed") return NextResponse.json({ ok: true, url, segment: row.segment });

    const missing = missingIds(row.answers ?? {}, row.firm_answers ?? {}, row.country, row.donors ?? []);
    if (missing.length) return NextResponse.json({ ok: false, error: "incomplete", missing }, { status: 400 });

    const hourly = Number(process.env.HOURLY_RATE);
    const result = computeResult({
      answers: row.answers as Answers,
      firm: row.firm_answers as FirmAnswers,
      firmSize: row.firm_size,
      donors: row.donors ?? [],
      hourlyRate: Number.isFinite(hourly) && hourly > 0 ? hourly : undefined,
    });

    // Only the request that flips status from started to completed sends emails.
    const saved = await updateSubmission(
      id,
      {
        status: "completed",
        completed_at: new Date().toISOString(),
        stage_scores: result.stageScores,
        total_points: result.totalPoints,
        total_pct: result.totalPct,
        tier: result.tier,
        help_flags: result.helpFlags,
        hours_month: result.hoursMonth,
        cost_month: result.costMonth,
        saved_hours: result.savedHours,
        segment: result.segment,
      },
      { onlyIfStarted: true },
    );
    if (!saved) return NextResponse.json({ ok: true, url, segment: result.segment });

    const jobs: Promise<boolean>[] = [];
    const mail = resultsEmail(saved, result);
    jobs.push(sendMail({ to: saved.email, ...mail }));
    if (result.segment === "ready") {
      const alert = alertEmail(saved, result);
      jobs.push(sendMail({ to: process.env.SCORECARD_NOTIFY_EMAIL || "wambui@madewithmake.com", ...alert }));
    }
    const sent = await Promise.allSettled(jobs);
    sent.forEach((s, i) => {
      if (s.status === "rejected" || s.value === false) console.error(`[scorecard/complete] email ${i} not sent for ${id}`);
    });

    return NextResponse.json({ ok: true, url, segment: result.segment });
  } catch (err) {
    console.error("[scorecard/complete]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
