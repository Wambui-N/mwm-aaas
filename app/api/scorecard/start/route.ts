import { createHash, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { countRecentStartsByIp, dbConfigured, insertSubmission } from "@/lib/scorecard/server/db";
import { startSchema } from "@/lib/scorecard/server/validate";

export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_STARTS_PER_IP = 10;

function ipHash(req: NextRequest): string | null {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
  if (!ip) return null;
  return createHash("sha256").update(`scorecard:${ip}`).digest("hex").slice(0, 32);
}

/** Creates a submission from the lead form and returns its id. */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = startSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_fields", fields: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 400 });
  }
  const d = parsed.data;

  // honeypot: pretend it worked, store nothing
  if (d.website) return NextResponse.json({ ok: true, id: randomUUID() });

  if (!dbConfigured()) {
    console.warn("[scorecard/start] DATABASE_URL is not set.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const hash = ipHash(req);
    if (hash) {
      const recent = await countRecentStartsByIp(hash, new Date(Date.now() - WINDOW_MS).toISOString());
      if (recent >= MAX_STARTS_PER_IP) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const row = await insertSubmission({
      first_name: d.firstName,
      email: d.email,
      firm_name: d.firmName,
      role: d.role,
      firm_size: d.firmSize,
      // country and donors are asked after the scored questions and saved by PATCH
      country: "",
      donors: [],
      consent: d.consent,
      utm_source: d.utmSource || null,
      utm_medium: d.utmMedium || null,
      utm_campaign: d.utmCampaign || null,
      referrer: d.referrer || null,
      ip_hash: hash,
    });
    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    console.error("[scorecard/start]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
