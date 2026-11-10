import { NextRequest, NextResponse } from "next/server";

/**
 * Proposal Pipeline form. Two calls:
 *  - step "lead" (JSON): the "About you" answers, sent before any upload so a drop-off is still followed up.
 *  - step "files" (multipart): the same answers plus the RFP and past proposals.
 * Both are forwarded to one Make.com webhook (PROPOSAL_PIPELINE_WEBHOOK_URL), where the scenario stores the
 * files, builds the draft, and sends the reminder emails. Nothing is stored on this server.
 */
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // serverless request bodies are capped at about 4.5 MB
const ALLOWED = /\.(pdf|docx?)$/i;

const ABOUT_KEYS = ["firstName", "email", "firm", "role", "teamSize", "volume"] as const;

const fail = (reason: string, status: number) => NextResponse.json({ ok: false, reason }, { status });

export async function POST(req: NextRequest) {
  const hook = process.env.PROPOSAL_PIPELINE_WEBHOOK_URL;
  if (!hook) return fail("not_configured", 503);

  const type = req.headers.get("content-type") ?? "";

  if (type.includes("application/json")) {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return fail("invalid_json", 400);
    }
    const email = String(body.email ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email) || !String(body.firstName ?? "").trim()) return fail("missing_fields", 400);
    const lead: Record<string, string> = { step: "lead" };
    for (const k of ABOUT_KEYS) lead[k] = String(body[k] ?? "").trim().slice(0, 200);
    const res = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) }).catch(() => null);
    return res?.ok ? NextResponse.json({ ok: true }) : fail("upstream_failed", 502);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("invalid_form", 400);
  }
  if (String(form.get("website") ?? "") !== "") return NextResponse.json({ ok: true }); // honeypot: pretend success

  const email = String(form.get("email") ?? "").trim();
  const rfp = form.get("rfp");
  const past = form.getAll("pastProposals").filter((f): f is File => f instanceof File);
  const profile = form.get("profile");
  if (!/^\S+@\S+\.\S+$/.test(email) || !(rfp instanceof File) || past.length < 1 || past.length > 3 || form.get("consent") !== "yes") {
    return fail("missing_fields", 400);
  }

  const files: [string, File][] = [["rfp", rfp], ...past.map((f): [string, File] => ["pastProposals", f])];
  if (profile instanceof File && profile.size > 0) files.push(["profile", profile]);
  if (files.some(([, f]) => !ALLOWED.test(f.name))) return fail("bad_file_type", 400);
  if (files.reduce((n, [, f]) => n + f.size, 0) > MAX_TOTAL_BYTES) return fail("too_large", 413);

  const out = new FormData();
  out.append("step", "files");
  for (const k of ABOUT_KEYS) out.append(k, String(form.get(k) ?? "").trim().slice(0, 200));
  out.append("donor", String(form.get("donor") ?? "").slice(0, 100));
  out.append("consent", "yes");
  for (const [name, f] of files) out.append(name, f, f.name);

  const res = await fetch(hook, { method: "POST", body: out }).catch(() => null);
  return res?.ok ? NextResponse.json({ ok: true }) : fail("upstream_failed", 502);
}
