"use client";

import { useState } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { SketchSubmit } from "@/components/site/SketchButton";
import { DrawIn } from "@/components/site/draw/DrawIn";

/** Files travel through a serverless function, which caps the request body (about 4.5 MB on Vercel). */
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx";
const ACCEPT_RE = /\.(pdf|docx?)$/i;
const EMAIL = "wambui@madewithmake.com";

type Errors = Record<string, string>;

function Field({ label, error, children, htmlFor }: { label: string; error?: string; children: React.ReactNode; htmlFor: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="fm-label">
        {label}
      </label>
      {children}
      {error && (
        <p className="fm-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The free first draft: one step. Who they are is already known from their audit (the id in the link), so the
 * form only asks for the donor, the RFP, one to three past proposals and consent. The server checks the id again.
 */
export function FirstDraftForm({
  auditId,
  firstName,
  firmName,
  donors,
  bookingUrl,
}: {
  auditId: string;
  firstName: string;
  firmName: string;
  donors: readonly string[];
  bookingUrl: string;
}) {
  const [done, setDone] = useState(false);
  const [donor, setDonor] = useState("");
  const [rfp, setRfp] = useState<File | null>(null);
  const [past, setPast] = useState<File[]>([]);
  const [profile, setProfile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const [dragging, setDragging] = useState(false);

  /** Drops one error as soon as the person fixes that field. */
  const clear = (k: string) => setErrors((e) => (e[k] ? { ...e, [k]: "" } : e));

  function validate(): Errors {
    const e: Errors = {};
    if (!donor) e.donor = "Please choose the donor.";
    if (!rfp) e.rfp = "Please upload the RFP or ToR.";
    if (past.length < 1) e.past = "Please upload at least one past proposal.";
    if (past.length > 3) e.past = "Please upload no more than 3 past proposals.";
    if (!consent) e.consent = "Please tick the box so I can use your files.";
    const total = (rfp?.size ?? 0) + past.reduce((n, f) => n + f.size, 0) + (profile?.size ?? 0);
    if (total > MAX_TOTAL_BYTES) e.files = `Your files are over 4 MB in total. Email them to ${EMAIL} and I will start your draft from there.`;
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setFailure("");
    if (Object.keys(e).length) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("auditId", auditId);
      fd.append("donor", donor);
      fd.append("consent", "yes");
      fd.append("website", trap);
      if (rfp) fd.append("rfp", rfp);
      past.forEach((f) => fd.append("pastProposals", f));
      if (profile) fd.append("profile", profile);
      const res = await fetch("/api/proposal-pipeline", { method: "POST", body: fd });
      if (res.status === 409) return setFailure(`Your first draft has already been requested. Check your inbox, or email ${EMAIL} if it has not arrived.`);
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      setFailure(`Something went wrong sending your files. Please try again, or email them to ${EMAIL}.`);
    } finally {
      setBusy(false);
    }
  }

  function dropRfp(ev: React.DragEvent) {
    ev.preventDefault();
    setDragging(false);
    const f = ev.dataTransfer.files?.[0];
    if (f && ACCEPT_RE.test(f.name)) {
      setRfp(f);
      clear("rfp");
    } // same filter the file picker applies; anything else is ignored
  }

  if (done) {
    return (
      <div className="border-t border-ink pt-8" role="status">
        <DrawIn as="div" on="mount" duration={0.5} stagger={0.35} className="h-12 w-12">
          <svg aria-hidden focusable="false" viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path className="sk-stroke" d="M24 4C35 4 44 13 44 24C44 35 35 44 24 44C13 44 4 35 4 24C4 13 13 4 24 4Z" />
            <path className="sk-stroke" d="M13 25 21 33 35 15" />
          </svg>
        </DrawIn>
        <h2 className="calm-h3 mt-4">Got it, {firstName}. Your first draft is on its way.</h2>
        <p className="calm-body mt-2 max-w-xl text-ink/85">
          Keep an eye on your inbox. A complete first draft, built from your own past work, should arrive in under 20 minutes.
        </p>
        <p className="calm-body mt-6 max-w-xl text-ink/85">When it arrives, take 30 minutes to go through it with me.</p>
        <div className="mt-4">
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline">
            Book a call →
          </a>
        </div>
      </div>
    );
  }

  const fileInput = "fm-control file:mr-3 file:border-0 file:bg-sage file:px-3 file:py-1 file:font-bold file:text-ink";

  return (
    <form onSubmit={submit} noValidate className="border border-ink/40 bg-white p-5 md:p-8">
      <h2 className="calm-h3">Your documents</h2>
      <p className="calm-body mt-2 text-ink/80">
        Sending as {firstName}, {firmName}.
      </p>
      <div className="mt-5 grid gap-5">
        <Field label="Which donor is this RFP for?" htmlFor="fd-donor" error={errors.donor}>
          <select id="fd-donor" className="fm-control" value={donor} aria-invalid={!!errors.donor || undefined} onChange={(e) => {
              setDonor(e.target.value);
              clear("donor");
            }}>
            <option value="">Choose one</option>
            {donors.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        {/* The RFP: a dashed drop zone around the same file input. */}
        <div>
          <label
            htmlFor="fd-rfp"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={dropRfp}
            className={`flex cursor-pointer flex-col items-center gap-2 border border-dashed px-4 py-8 text-center transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink ${
              dragging ? "border-ink bg-sage/40" : errors.rfp ? "border-ink bg-white" : "border-ink/50 bg-white hover:bg-sage/20"
            }`}
          >
            <Upload className="h-5 w-5" aria-hidden />
            <span className="fm-label !mb-0">Upload the RFP or ToR (PDF or Word)</span>
            {rfp && <span className="calm-body font-bold">{rfp.name}</span>}
            <input id="fd-rfp" type="file" accept={ACCEPT} className="sr-only" aria-invalid={!!errors.rfp || undefined} onChange={(e) => {
                setRfp(e.target.files?.[0] ?? null);
                clear("rfp");
              }} />
          </label>
          {errors.rfp && (
            <p className="fm-error" role="alert">
              {errors.rfp}
            </p>
          )}
        </div>

        <Field label="Upload 1–3 past proposals (PDF or Word)" htmlFor="fd-past" error={errors.past}>
          <input id="fd-past" type="file" accept={ACCEPT} multiple className={fileInput} aria-invalid={!!errors.past || undefined} onChange={(e) => {
              setPast(Array.from(e.target.files ?? []));
              clear("past");
            }} />
        </Field>
        <Field label="Upload your company profile (optional)" htmlFor="fd-profile">
          <input id="fd-profile" type="file" accept={ACCEPT} className={fileInput} onChange={(e) => setProfile(e.target.files?.[0] ?? null)} />
        </Field>

        {/* honeypot: real people never see or fill this */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="fd-website">Website</label>
          <input id="fd-website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </div>
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#141010]" checked={consent} onChange={(e) => {
                setConsent(e.target.checked);
                clear("consent");
              }} aria-invalid={!!errors.consent || undefined} />
            <span className="calm-body">I agree to my files being stored securely for 30 days to prepare my draft, then deleted.</span>
          </label>
          {errors.consent && (
            <p className="fm-error" role="alert">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {(errors.files || failure) && (
        <p className="fm-error mt-5" role="alert">
          {errors.files || failure}
        </p>
      )}

      <div className="mt-7">
        <SketchSubmit variant="marker" seed={32} className="text-lg" disabled={busy}>
          <span className="inline-flex items-center gap-2">
            {busy ? "Sending…" : "Send Me My First Draft"} {!busy && <ArrowRight className="h-4 w-4" aria-hidden />}
          </span>
        </SketchSubmit>
      </div>

      <p className="calm-body mt-5 text-ink/80">
        One free first draft per firm. This draft is built from your past proposals before any voice tuning. Client drafts get even closer to your voice after setup.
      </p>
      <p className="calm-body mt-3 text-ink/80">
        Your files stay locked in my secure drive for 30 days. Partly because that&rsquo;s where they&rsquo;re safest, and partly because I&rsquo;m pretty sure you&rsquo;ll want to keep going. When you do, I start with everything already in hand. If not, they&rsquo;re deleted. No questions, no follow-up spam.
      </p>
    </form>
  );
}
