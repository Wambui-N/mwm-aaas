import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API = "https://connect.mailerlite.com/api";

export type AssessmentSubmitPayload = {
  name: string;
  email: string;
  industry: string;
  profile: string;      // "manual" | "patchwork" | "systems"
  profileLabel: string; // "The Manual Machine" etc.
  scoreOverall: number; // 0-100
  answers?: Record<string, number>;
  answerLabels?: Record<string, string>;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  const makeSheetsWebhookUrl = process.env.MAKE_SHEETS_WEBHOOK_URL;

  let body: AssessmentSubmitPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const {
    name,
    email,
    industry,
    profile,
    profileLabel,
    scoreOverall,
    answers,
    answerLabels,
  } = body;

  if (!email || !name) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  // Build subscriber payload for MailerLite
  const subscriberPayload: Record<string, unknown> = {
    email,
    fields: {
      name,
      // Custom fields — create these in MailerLite > Subscribers > Fields if not already there
      audit_industry: industry,
      audit_profile: profile,
      audit_profile_label: profileLabel,
      audit_score_overall: scoreOverall,
    },
    // Add to group if configured
    ...(groupId ? { groups: [groupId] } : {}),
  };

  try {
    if (!apiKey) {
      console.warn("[assessment/submit] MAILERLITE_API_KEY is not set — skipping.");
    } else {
      const res = await fetch(`${MAILERLITE_API}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(subscriberPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("[assessment/submit] MailerLite error:", data);
      }
    }

    // Fire-and-forget: send to Make webhook for Google Sheets logging.
    if (makeSheetsWebhookUrl) {
      fetch(makeSheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          industry,
          profile,
          profileLabel,
          scoreOverall,
          answers,
          answerLabels,
          submittedAt: new Date().toISOString(),
        }),
      }).catch((err) => console.error("[assessment/submit] Make webhook error:", err));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[assessment/submit] Fetch error:", err);
    return NextResponse.json({ ok: false, reason: "network_error" }, { status: 200 });
  }
}
