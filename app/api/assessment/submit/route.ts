import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API = "https://connect.mailerlite.com/api";

export type AssessmentSubmitPayload = {
  name: string;
  email: string;
  industry: string;
  profile: string;         // "manual" | "patchwork" | "systems"
  profileLabel: string;    // "The Manual Machine" etc.
  diagnosisArea: string;   // "operations" | "clients" | "tools"
  scoreOverall: number;    // 0-100
  scoreOperations: number;
  scoreClients: number;
  scoreTools: number;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    console.warn("[assessment/submit] MAILERLITE_API_KEY is not set — skipping.");
    return NextResponse.json({ ok: false, reason: "api_key_missing" }, { status: 200 });
  }

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
    diagnosisArea,
    scoreOverall,
    scoreOperations,
    scoreClients,
    scoreTools,
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
      audit_diagnosis_area: diagnosisArea,
      audit_score_overall: scoreOverall,
      audit_score_operations: scoreOperations,
      audit_score_clients: scoreClients,
      audit_score_tools: scoreTools,
    },
    // Add to group if configured
    ...(groupId ? { groups: [groupId] } : {}),
  };

  try {
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
      return NextResponse.json(
        { ok: false, reason: "mailerlite_error", detail: data },
        { status: 200 } // 200 so client doesn't surface an error to the user
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[assessment/submit] Fetch error:", err);
    return NextResponse.json({ ok: false, reason: "network_error" }, { status: 200 });
  }
}
