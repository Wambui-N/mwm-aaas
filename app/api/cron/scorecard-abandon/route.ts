import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  claimAbandonReminder,
  claimReadyNudge,
  dbConfigured,
  listAbandoned,
  listReadyNudges,
  releaseAbandonReminder,
  releaseReadyNudge,
} from "@/lib/scorecard/server/db";
import { abandonEmail, nudgeEmail } from "@/lib/scorecard/server/emailTemplates";
import { sendMail } from "@/lib/scorecard/server/mail";

export const dynamic = "force-dynamic";

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

function authorised(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? req.headers.get("x-cron-secret") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Two reminders, each sent once, to people who agreed to be emailed:
 *  - the abandon reminder, an hour after a lead form that was never completed
 *  - the first-draft reminder, a day after a "ready" result that has not used its free first draft
 */
export async function GET(req: NextRequest) {
  if (!authorised(req)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let sent = 0;
  let failed = 0;
  let nudged = 0;
  try {
    const rows = await listAbandoned(new Date(Date.now() - ONE_HOUR).toISOString());
    for (const row of rows) {
      // Not emailing someone who did not agree to be emailed is the safe default.
      if (!row.consent) continue;
      if (!(await claimAbandonReminder(row.id))) continue;
      const ok = await sendMail({ to: row.email, ...abandonEmail(row) });
      if (ok) {
        sent++;
      } else {
        failed++;
        await releaseAbandonReminder(row.id); // retry on the next run
      }
    }

    const ready = await listReadyNudges(new Date(Date.now() - ONE_DAY).toISOString());
    for (const row of ready) {
      if (!(await claimReadyNudge(row.id))) continue;
      const ok = await sendMail({ to: row.email, ...nudgeEmail(row) });
      if (ok) {
        nudged++;
      } else {
        failed++;
        await releaseReadyNudge(row.id); // retry on the next run
      }
    }
    return NextResponse.json({ ok: true, sent, nudged, failed });
  } catch (err) {
    console.error("[scorecard/cron]", err);
    return NextResponse.json({ ok: false, error: "server_error", sent, failed }, { status: 500 });
  }
}
