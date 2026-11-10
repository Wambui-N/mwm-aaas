"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { SketchSubmit } from "@/components/site/SketchButton";
import { DrawIn } from "@/components/site/draw/DrawIn";

/** Files travel through a serverless function, which caps the request body (about 4.5 MB on Vercel). */
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx";
const ACCEPT_RE = /\.(pdf|docx?)$/i;
const EMAIL = "wambui@madewithmake.com";

const ROLES = ["Managing Director / Partner", "BD or Proposal Manager", "Proposal Coordinator / Writer", "Technical Expert", "Other"];
const TEAM_SIZES = ["1–4", "5–15", "16–50", "51+"];
const VOLUMES = ["1–2", "3–5", "6–10", "11+"];
const DONORS = ["World Bank", "EU", "AfDB", "ADB", "UN agency", "Bilateral", "Foundation", "Other"];

type About = { firstName: string; email: string; firm: string; role: string; teamSize: string; volume: string };
type Errors = Record<string, string>;

const emptyAbout: About = { firstName: "", email: "", firm: "", role: "", teamSize: "", volume: "" };

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

function Select({ id, value, onChange, options, placeholder, invalid }: { id: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string; invalid: boolean }) {
  return (
    <select id={id} className="fm-control" value={value} aria-invalid={invalid || undefined} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** A hairline track with an ink line that draws along it: half way on step 1, all the way on step 2. Instant with reduced motion. */
function Progress({ step }: { step: 1 | 2 }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    setPct(step === 1 ? 50 : 100);
  }, [step]);
  return (
    <div aria-hidden className="relative mt-3 h-[2px] w-full bg-ink/15">
      <div className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-700 ease-out motion-reduce:transition-none" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function ProposalForm() {
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [about, setAbout] = useState<About>(emptyAbout);
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

  const set = (k: keyof About) => (v: string) => setAbout((a) => ({ ...a, [k]: v }));

  // Step 1: the three things needed to save the lead.
  function validateAbout(): Errors {
    const e: Errors = {};
    if (!about.firstName.trim()) e.firstName = "Please add your first name.";
    if (!/^\S+@\S+\.\S+$/.test(about.email.trim())) e.email = "Please add a valid work email.";
    if (!about.firm.trim()) e.firm = "Please add your firm name.";
    return e;
  }

  // Step 2: the documents, plus role, team size and volume (same rules as before, moved here).
  function validateDocs(): Errors {
    const e: Errors = {};
    if (!donor) e.donor = "Please choose the donor.";
    if (!rfp) e.rfp = "Please upload the RFP or ToR.";
    if (past.length < 1) e.past = "Please upload at least one past proposal.";
    if (past.length > 3) e.past = "Please upload no more than 3 past proposals.";
    if (!about.role) e.role = "Please choose your role.";
    if (!about.teamSize) e.teamSize = "Please choose your team size.";
    if (!about.volume) e.volume = "Please choose how many proposals you send.";
    if (!consent) e.consent = "Please tick the box so I can use your files.";
    const total = (rfp?.size ?? 0) + past.reduce((n, f) => n + f.size, 0) + (profile?.size ?? 0);
    if (total > MAX_TOTAL_BYTES) e.files = `Your files are over 4 MB in total. Email them to ${EMAIL} and I will start your draft from there.`;
    return e;
  }

  function next(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validateAbout();
    setErrors(e);
    if (Object.keys(e).length) return;
    // Save the lead before the uploads, so a drop-off at step 2 is still followed up. Never blocks the user.
    fetch("/api/proposal-pipeline", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ step: "lead", ...about }),
    }).catch(() => {});
    setStep(2);
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validateDocs();
    setErrors(e);
    setFailure("");
    if (Object.keys(e).length) return;
    setBusy(true);
    try {
      const fd = new FormData();
      Object.entries(about).forEach(([k, v]) => fd.append(k, v));
      fd.append("step", "files");
      fd.append("donor", donor);
      fd.append("consent", "yes");
      fd.append("website", trap);
      if (rfp) fd.append("rfp", rfp);
      past.forEach((f) => fd.append("pastProposals", f));
      if (profile) fd.append("profile", profile);
      const res = await fetch("/api/proposal-pipeline", { method: "POST", body: fd });
      if (!res.ok) throw new Error(String(res.status));
      setStep("done");
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
    if (f && ACCEPT_RE.test(f.name)) setRfp(f); // same filter the file picker applies; anything else is ignored
  }

  if (step === "done") {
    return (
      <div className="border-t border-ink pt-8" role="status">
        <DrawIn as="div" on="mount" duration={0.5} stagger={0.35} className="h-12 w-12">
          <svg aria-hidden focusable="false" viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path className="sk-stroke" d="M24 4C35 4 44 13 44 24C44 35 35 44 24 44C13 44 4 35 4 24C4 13 13 4 24 4Z" />
            <path className="sk-stroke" d="M13 25 21 33 35 15" />
          </svg>
        </DrawIn>
        <h3 className="calm-h3 mt-4">Got it. Your first draft is on its way.</h3>
        <p className="calm-body mt-2 max-w-xl text-ink/85">
          Keep an eye on your inbox. A complete first draft, built from your own past work, should arrive in under 20 minutes.
        </p>
      </div>
    );
  }

  const fileInput = "fm-control file:mr-3 file:border-0 file:bg-sage file:px-3 file:py-1 file:font-bold file:text-ink";

  return (
    <div className="border border-ink/40 bg-white p-5 md:p-8">
      <p className="gl-mono text-ink/70">Step {step} of 2</p>
      <Progress step={step} />

      {step === 1 ? (
        <form onSubmit={next} noValidate className="mt-6">
          <h3 className="calm-h3">About you</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field label="First name" htmlFor="pp-first" error={errors.firstName}>
              <input id="pp-first" className="fm-control" autoComplete="given-name" value={about.firstName} aria-invalid={!!errors.firstName || undefined} onChange={(e) => set("firstName")(e.target.value)} />
            </Field>
            <Field label="Work email" htmlFor="pp-email" error={errors.email}>
              <input id="pp-email" type="email" className="fm-control" autoComplete="email" value={about.email} aria-invalid={!!errors.email || undefined} onChange={(e) => set("email")(e.target.value)} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Firm name" htmlFor="pp-firm" error={errors.firm}>
                <input id="pp-firm" className="fm-control" autoComplete="organization" value={about.firm} aria-invalid={!!errors.firm || undefined} onChange={(e) => set("firm")(e.target.value)} />
              </Field>
            </div>
          </div>
          <div className="mt-7">
            <SketchSubmit variant="marker" seed={31} className="text-lg">
              <span className="inline-flex items-center gap-2">
                Next: Upload Your RFP <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </SketchSubmit>
          </div>
        </form>
      ) : (
        <form onSubmit={submit} noValidate className="mt-6">
          <h3 className="calm-h3">Your documents</h3>
          <div className="mt-5 grid gap-5">
            <Field label="Which donor is this RFP for?" htmlFor="pp-donor" error={errors.donor}>
              <Select id="pp-donor" value={donor} onChange={setDonor} options={DONORS} placeholder="Choose one" invalid={!!errors.donor} />
            </Field>

            {/* The RFP: a dashed drop zone around the same file input (field name and File object unchanged). */}
            <div>
              <label
                htmlFor="pp-rfp"
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
                <input id="pp-rfp" type="file" accept={ACCEPT} className="sr-only" aria-invalid={!!errors.rfp || undefined} onChange={(e) => setRfp(e.target.files?.[0] ?? null)} />
              </label>
              {errors.rfp && (
                <p className="fm-error" role="alert">
                  {errors.rfp}
                </p>
              )}
            </div>

            <Field label="Upload 1–3 past proposals (PDF or Word)" htmlFor="pp-past" error={errors.past}>
              <input id="pp-past" type="file" accept={ACCEPT} multiple className={fileInput} aria-invalid={!!errors.past || undefined} onChange={(e) => setPast(Array.from(e.target.files ?? []))} />
            </Field>
            <Field label="Upload your company profile (optional)" htmlFor="pp-profile">
              <input id="pp-profile" type="file" accept={ACCEPT} className={fileInput} onChange={(e) => setProfile(e.target.files?.[0] ?? null)} />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="Your role" htmlFor="pp-role" error={errors.role}>
                  <Select id="pp-role" value={about.role} onChange={set("role")} options={ROLES} placeholder="Choose one" invalid={!!errors.role} />
                </Field>
              </div>
              <Field label="Team size" htmlFor="pp-team" error={errors.teamSize}>
                <Select id="pp-team" value={about.teamSize} onChange={set("teamSize")} options={TEAM_SIZES} placeholder="Choose one" invalid={!!errors.teamSize} />
              </Field>
              <Field label="Proposals a month" htmlFor="pp-vol" error={errors.volume}>
                <Select id="pp-vol" value={about.volume} onChange={set("volume")} options={VOLUMES} placeholder="Choose one" invalid={!!errors.volume} />
              </Field>
            </div>

            {/* honeypot: real people never see or fill this */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label htmlFor="pp-website">Website</label>
              <input id="pp-website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#141010]" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={!!errors.consent || undefined} />
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

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <SketchSubmit variant="marker" seed={32} className="text-lg" disabled={busy}>
              <span className="inline-flex items-center gap-2">
                {busy ? "Sending…" : "Send Me My First Draft"} {!busy && <ArrowRight className="h-4 w-4" aria-hidden />}
              </span>
            </SketchSubmit>
            <button type="button" onClick={() => setStep(1)} className="font-bold underline underline-offset-4 hover:no-underline">
              Back
            </button>
          </div>

          <p className="calm-body mt-5 text-ink/80">
            One free draft per firm. This draft is built from your past proposals before any voice tuning. Client drafts get even closer to your voice after setup.
          </p>
          <p className="calm-body mt-3 text-ink/80">
            Your files stay locked in my secure drive for 30 days. Partly because that&rsquo;s where they&rsquo;re safest, and partly because I&rsquo;m pretty sure you&rsquo;ll want to keep going. When you do, I start with everything already in hand. If not, they&rsquo;re deleted. No questions, no follow-up spam.
          </p>
        </form>
      )}
    </div>
  );
}
