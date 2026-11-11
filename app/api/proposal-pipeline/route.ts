import { NextRequest, NextResponse } from "next/server";
import { claimFirstDraft, dbConfigured, getSubmission, isUuid, releaseFirstDraft } from "@/lib/scorecard/server/db";

/**
 * Free first draft. Only a completed "ready" audit result can use it, once: the request must carry that result's
 * id (`auditId`), the server claims the draft in the database, and the person's details (name, email, firm, role,
 * size, volume) come from the saved audit, not from the browser. The files and the answers are then forwarded to one
 * Make.com webhook (PROPOSAL_PIPELINE_WEBHOOK_URL), where the scenario stores the files and builds the draft.
 * Nothing but the claim is stored on this server. If forwarding fails, the claim is given back so they can retry.
 */
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // serverless request bodies are capped at about 4.5 MB
const ALLOWED = /\.(pdf|docx?)$/i;

const fail = (reason: string, status: number) => NextResponse.json({ ok: false, reason }, { status });

export async function POST(req: NextRequest) {
  const hook = process.env.PROPOSAL_PIPELINE_WEBHOOK_URL;
  if (!hook || !dbConfigured()) return fail("not_configured", 503);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("invalid_form", 400);
  }
  if (String(form.get("website") ?? "") !== "") return NextResponse.json({ ok: true }); // honeypot: pretend success

  const auditId = String(form.get("auditId") ?? "");
  const rfp = form.get("rfp");
  const past = form.getAll("pastProposals").filter((f): f is File => f instanceof File);
  const profile = form.get("profile");
  if (!isUuid(auditId) || !(rfp instanceof File) || past.length < 1 || past.length > 3 || form.get("consent") !== "yes") {
    return fail("missing_fields", 400);
  }

  const files: [string, File][] = [["rfp", rfp], ...past.map((f): [string, File] => ["pastProposals", f])];
  if (profile instanceof File && profile.size > 0) files.push(["profile", profile]);
  if (files.some(([, f]) => !ALLOWED.test(f.name))) return fail("bad_file_type", 400);
  if (files.reduce((n, [, f]) => n + f.size, 0) > MAX_TOTAL_BYTES) return fail("too_large", 413);

  // Claim before sending: only a completed "ready" result that has not used its draft gets past this line.
  let row;
  try {
    row = await claimFirstDraft(auditId);
  } catch (err) {
    console.error("[proposal-pipeline] claim failed", err);
    return fail("server_error", 500);
  }
  if (!row) {
    const known = await getSubmission(auditId, "draft_requested_at").catch(() => null);
    return known?.draft_requested_at ? fail("already_requested", 409) : fail("not_available", 403);
  }

  const out = new FormData();
  out.append("step", "files");
  out.append("auditId", row.id);
  out.append("firstName", row.first_name);
  out.append("email", row.email);
  out.append("firm", row.firm_name);
  out.append("role", row.role);
  out.append("teamSize", row.firm_size);
  out.append("volume", row.firm_answers?.c1 ?? "");
  out.append("score", String(row.total_pct ?? ""));
  out.append("tier", row.tier ?? "");
  out.append("donor", String(form.get("donor") ?? "").slice(0, 100));
  out.append("consent", "yes");
  for (const [name, f] of files) out.append(name, f, f.name);

  const res = await fetch(hook, { method: "POST", body: out }).catch(() => null);
  if (!res?.ok) {
    await releaseFirstDraft(row.id).catch(() => {});
    return fail("upstream_failed", 502);
  }
  return NextResponse.json({ ok: true });
}
