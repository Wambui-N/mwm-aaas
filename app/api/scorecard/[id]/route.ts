import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, getSubmission, isUuid, updateSubmission } from "@/lib/scorecard/server/db";
import { parseAnswers, parseFirmAnswers, patchSchema } from "@/lib/scorecard/server/validate";

export const dynamic = "force-dynamic";
const NO_STORE = { "Cache-Control": "no-store" };

type Ctx = { params: Promise<{ id: string }> };

/** Resume: returns progress only (no name, email or other lead details). The UUID is the capability. */
export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  if (!isUuid(id) || !dbConfigured()) return NextResponse.json({ ok: false }, { status: 404, headers: NO_STORE });
  try {
    const row = await getSubmission(id, "status,answers,firm_answers");
    if (!row) return NextResponse.json({ ok: false }, { status: 404, headers: NO_STORE });
    return NextResponse.json({ ok: true, status: row.status, answers: row.answers ?? {}, firmAnswers: row.firm_answers ?? {} }, { headers: NO_STORE });
  } catch (err) {
    console.error("[scorecard/get]", err);
    return NextResponse.json({ ok: false }, { status: 500, headers: NO_STORE });
  }
}

/** Autosave: the client sends its full answers object after each question. Refused once completed. */
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (!dbConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (parsed.data.answers !== undefined) {
    const a = parseAnswers(parsed.data.answers);
    if (!a) return NextResponse.json({ ok: false, error: "invalid_answers" }, { status: 400 });
    patch.answers = a;
  }
  if (parsed.data.firmAnswers !== undefined) {
    const f = parseFirmAnswers(parsed.data.firmAnswers);
    if (!f) return NextResponse.json({ ok: false, error: "invalid_answers" }, { status: 400 });
    patch.firm_answers = f;
  }
  if (!Object.keys(patch).length) return NextResponse.json({ ok: true });

  try {
    const row = await updateSubmission(id, patch, { onlyIfStarted: true });
    if (!row) return NextResponse.json({ ok: false, error: "not_open" }, { status: 409 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[scorecard/patch]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
