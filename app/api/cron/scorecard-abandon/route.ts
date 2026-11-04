import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { claimAbandonReminder, dbConfigured, listAbandoned, releaseAbandonReminder } from "@/lib/scorecard/server/db";
import { abandonEmail } from "@/lib/scorecard/server/emailTemplates";
import { sendMail } from "@/lib/scorecard/server/mail";

export const dynamic = "force-dynamic";

const ONE_HOUR = 60 * 60 * 1000;

function authorised(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? req.headers.get("x-cron-secret") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Sends the abandon reminder once, to people whose lead form was done over an hour ago and never completed. */
export async function GET(req: NextRequest) {
  if (!authorised(req)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let sent = 0;
  let failed = 0;
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
    return NextResponse.json({ ok: true, sent, failed });
  } catch (err) {
    console.error("[scorecard/cron]", err);
    return NextResponse.json({ ok: false, error: "server_error", sent, failed }, { status: 500 });
  }
}
