import React from "react";
import type { Metadata } from "next";
import { Play } from "lucide-react";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import { SiteShell } from "@/components/site/SiteShell";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Underlined } from "@/components/site/Underlined";
import { JumpButton, JumpLink } from "@/components/proposal-pipeline/Jump";
import ProposalForm from "@/components/proposal-pipeline/ProposalForm";
import { testimonial } from "@/lib/homepage/copy";
import { AUDIT_HREF } from "@/lib/site/shell";

export const metadata: Metadata = {
  ...generatePageMetadata(
    "Proposal Pipeline for Development Consultancies — Made with Make",
    "Send one RFP and get a complete first draft back in under 20 minutes, written in your firm's voice from your own past work. Free, one per firm, no call needed.",
    "proposal-pipeline",
    ["proposal automation", "RFP response automation", "development consultancy proposals", "donor proposal automation", "first draft proposal"]
  ),
  alternates: { canonical: `${siteConfig.url}/proposal-pipeline` },
};

/** Set to the demo video's file or embed URL once it is recorded; until then the frame shows a placeholder. */
const DEMO_VIDEO_SRC = "";

const FORM_ID = "free-draft";
const DEMO_ID = "demo";
const HOW_ID = "how-it-works";

/** A section heading with at most one orange marker underline under `mark`. */
function H2({ id, text, mark, seed }: { id?: string; text: string; mark?: string; seed: number }) {
  const at = mark ? text.indexOf(mark) : -1;
  return (
    <h2 id={id} className="sk-h2 max-w-[48rem]">
      {at >= 0 && mark ? (
        <>
          {text.slice(0, at)}
          <Underlined seed={seed}>{mark}</Underlined>
          {text.slice(at + mark.length)}
        </>
      ) : (
        text
      )}
    </h2>
  );
}

const beforeAfter = [
  {
    before: ["Good RFPs found too late.", "Someone checks portals by hand, and the best ones slip past."],
    after: ["Every relevant RFP comes to you.", "Matched to your sectors, with a one-click “Start proposal” button."],
  },
  {
    before: ["A 60-page ToR eats a morning.", "Before anyone writes a word."],
    after: ["The ToR is read for you.", "Requirements, scoring and expert roles pulled out in minutes."],
  },
  {
    before: ["Every proposal starts from a blank page.", "Old proposals copied, pasted and patched together."],
    after: ["Every proposal starts as a complete first draft.", "Written in your firm’s voice, from your own past work."],
  },
  {
    before: ["Deadlines mean late nights.", "Missing documents and compliance checks found at the last minute."],
    after: ["Deadlines mean polishing, not panicking.", "Missing items are flagged on day one."],
  },
];

const steps = [
  ["Find it.", "A new RFP lands in your inbox, already matched to your firm."],
  ["Draft it.", "One click, and a complete first draft is ready in about 15 minutes, in your firm’s voice."],
  ["Polish it and send it.", "Your team spends its time on the parts that win."],
];

const includes = [
  ["Complete first drafts in minutes", "written in your firm’s voice from your past proposals"],
  ["Your ToR, read for you", "a one-page brief of requirements, scoring and expert roles"],
  ["The right experts, matched", "a shortlist for each RFP, with CVs in the donor’s format"],
  ["Donor-ready formatting", "drafts built in each donor’s required structure"],
  ["Go/no-go scoring", "know in minutes which opportunities are worth your time"],
  ["No more midnight deadlines", "a compliance checklist and missing items flagged early"],
  ["Win/loss tracking", "see your win rate and what works"],
  ["Set up for you", "we organise your files, tune the voice and train your team"],
];

const bonuses = [
  ["Opportunity radar", "a daily scan of the donor portals you bid on, with a weekly digest and a one-click “Start proposal” button"],
  ["Ready-made donor templates", "editable templates for the 5 donors you bid to most"],
];

const guarantee = [
  "If your drafts don’t sound like your firm, we keep refining them for free until they do.",
  "You pay the second half of the setup fee only after your first complete draft.",
  "No lock-in. Cancel the monthly plan anytime, and keep everything we built.",
];

const fit = [
  "Do you respond to World Bank, EU, UN or other donor RFPs and EOIs?",
  "Does your team send 4+ proposals a month?",
  "Is proposal writing squeezed in around everyone’s “real” job?",
];

const faqs = [
  ["Will it sound like generic AI?", "No. Every draft is built from your own past proposals, methodologies and projects, not from the internet. During setup, we tune it on your best proposals until your team can’t tell the difference. If it still doesn’t sound like you, we keep refining for free."],
  ["Is our data safe?", "Your system is built inside your own accounts, so you own everything. The AI runs under commercial terms that don’t allow your content to be used for training, and the automation runs on independently audited infrastructure (SOC 2 Type II, ISO 27001, GDPR)."],
  ["Who is this for, and who isn’t it for?", "It’s for development consultancies that send 4+ proposals a month without a dedicated proposal team. It’s not for firms that bid once or twice a year, or for large firms with full bid departments and software already in place."],
  ["Which donors and formats does it work with?", "World Bank, EU, AfDB, ADB, UN agencies, bilateral donors and foundations. We set it up for the donors you bid to most."],
  ["What tools do we need?", "The ones you already have. It works inside Google Workspace or Microsoft 365. There’s no new app for your team to learn."],
  ["How long does setup take, and how much of our time?", "Your first complete draft arrives within 14 days of receiving your documents. Your team spends a few hours on it in total: sending files and one voice-tuning session."],
  ["What does it cost?", "Every firm’s setup is different, so pricing is shared on the discovery call. We take on 2 new builds a month, and founding places are limited."],
  ["What happens after my free draft?", "If you like what you see, book a discovery call. We’ll look at your proposal process and show you what it looks like for every RFP. If not, no follow-up spam."],
  ["What if it doesn’t work for us?", "You pay the second half of the setup fee only after your first complete draft. The monthly plan is cancel-anytime, and you keep everything we built."],
];

const card = "border border-ink/[0.22] bg-white p-5 md:p-6";

/** A homepage-rhythm section: full-width, 4.5rem (6.75rem from md) above and below. `id` goes on the inner column so jumps land with the heading near the top. */
function Section({ id, labelledby, children }: { id?: string; labelledby?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={labelledby} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div id={id} className="mx-auto max-w-[81.25rem] scroll-mt-24">
        {children}
      </div>
    </section>
  );
}

export default function ProposalPipelinePage() {
  return (
    <SiteShell>
      <main>
        {/* 1. Hero: one screen of its own (the shell already pads 5rem for the nav), centred, one button */}
        <section className="flex min-h-[calc(100svh-5rem)] flex-col justify-center px-4 pb-[4.5rem] pt-8 md:px-8">
          <div className="mx-auto w-full max-w-[81.25rem]">
            <SectionLabel className="mb-0">[00] The Proposal Pipeline · For development consultancies</SectionLabel>
            <h1 className="sk-display mt-6 max-w-[22ch]">
              Complete proposals in <Underlined seed={61}>20 minutes</Underlined>, written in your firm’s voice.
            </h1>
            <p className="mt-8 max-w-[52ch] text-[1.3125rem] leading-relaxed text-ink/80">
              The Proposal Pipeline finds the RFPs that fit your firm, reads the ToR and writes a complete first draft from your own past proposals in about 15 minutes. It runs quietly inside the tools you already use, so your team stops starting from scratch and spends its time on the parts that win.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
              <JumpButton to={FORM_ID} seed={62}>
                Try It Free on Your Next RFP →
              </JumpButton>
              <JumpLink to={HOW_ID} className="font-bold underline-offset-4 hover:underline focus-visible:underline">
                See how it works ↓
              </JumpLink>
            </div>
            <p className="calm-body mt-8 text-ink/80">
              “Proposal creation went from several hours to a few minutes.” <span className="font-bold text-ink">Founders Freedom Africa</span>
            </p>
          </div>
        </section>

          {/* 2. Demo video */}
          <Section id={DEMO_ID} labelledby="demo-h">
            <SectionLabel>[01] See it work</SectionLabel>
            <H2 id="demo-h" text="Watch: how a proposal goes from RFP to complete first draft in 15 minutes." mark="complete first draft" seed={63} />
            <p className="calm-body mt-4 max-w-[46rem] text-ink/85">
              No slides. No pitch. Just a real public RFP, a sample consultancy’s past proposals and the system doing its job, start to finish.
            </p>
            <div className="mt-6 aspect-video w-full border-2 border-ink bg-sage">
              {DEMO_VIDEO_SRC ? (
                <video src={DEMO_VIDEO_SRC} controls preload="metadata" className="h-full w-full bg-ink" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-ink">
                  <span className="flex h-16 w-16 items-center justify-center border-2 border-ink bg-white">
                    <Play className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="gl-mono">Demo video coming soon</span>
                </div>
              )}
            </div>
            <p className="gl-mono mt-3 text-ink/70">Shown with a fictional consultancy and a real public RFP. Your free draft uses your own past work.</p>
          </Section>

          {/* 3. Before / after */}
          <Section labelledby="ba-h">
            <SectionLabel>[02] Before → After</SectionLabel>
            <H2 id="ba-h" text="Your experts should be winning projects, not formatting proposals." mark="winning projects" seed={65} />
            <p className="calm-body mt-4 max-w-[46rem] text-ink/85">Every RFP still costs your team days of work that has nothing to do with expertise. Here’s what changes.</p>

            <div className="site-grid mt-8 gap-y-4 md:gap-y-6">
              {beforeAfter.map((row) => (
                <React.Fragment key={row.before[0]}>
                  <div className={`col-span-4 md:col-span-6 ${card}`}>
                    <span className="gl-mono text-ink/70">Before</span>
                    <p className="calm-h3 mt-2">{row.before[0]}</p>
                    <p className="calm-body mt-2 text-ink/80">{row.before[1]}</p>
                  </div>
                  <div className="col-span-4 border-2 border-ink bg-sage p-5 md:col-span-6 md:p-6">
                    <span className="gl-mono bg-signal px-2 py-1 text-ink">After</span>
                    <p className="calm-h3 mt-3">{row.after[0]}</p>
                    <p className="calm-body mt-2 text-ink/85">{row.after[1]}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <h3 id={HOW_ID} className="calm-h3 mt-12 scroll-mt-24">How it works</h3>
            <ol className="site-grid mt-4 gap-y-4 md:gap-y-6">
              {steps.map(([t, b], i) => (
                <li key={t} className={`col-span-4 ${card}`}>
                  <span className="gl-mono text-signal">Step {i + 1}</span>
                  <p className="calm-h3 mt-2">{t}</p>
                  <p className="calm-body mt-2 text-ink/80">{b}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* 4. What you get */}
          <Section labelledby="get-h">
            <SectionLabel>[03] What you get</SectionLabel>
            <H2 id="get-h" text="One system. Every proposal starts done." mark="starts done" seed={66} />
            <p className="calm-body mt-4 max-w-[46rem] text-ink/85">Built inside the tools your team already uses, around the way you already work.</p>

            <h3 className="calm-h3 mt-8">Every build includes</h3>
            <ul className="site-grid mt-4 gap-y-4 md:gap-y-6">
              {includes.map(([t, b]) => (
                <li key={t} className={`col-span-4 md:col-span-6 ${card}`}>
                  <p className="font-bold">{t}</p>
                  <p className="calm-body mt-1 text-ink/80">{b.charAt(0).toUpperCase() + b.slice(1)}.</p>
                </li>
              ))}
            </ul>

            <h3 className="calm-h3 mt-10">Plus two bonuses</h3>
            <ul className="site-grid mt-4 gap-y-4 md:gap-y-6">
              {bonuses.map(([t, b]) => (
                <li key={t} className="col-span-4 border-2 border-ink bg-sage p-5 md:col-span-6 md:p-6">
                  <span className="gl-mono bg-signal px-2 py-1 text-ink">Bonus</span>
                  <p className="mt-3 font-bold">{t}</p>
                  <p className="calm-body mt-1 text-ink/85">{b.charAt(0).toUpperCase() + b.slice(1)}.</p>
                </li>
              ))}
            </ul>

            <aside className="mt-10 border border-ink bg-ink p-2 text-sage">
              <div className="border border-sage/30 p-5 md:p-7">
                <h3 className="font-[family-name:var(--font-brule)] text-[clamp(1.4rem,2vw,1.8rem)] font-semibold leading-tight text-[color:var(--paper)]">
                  The Sounds-Like-You Guarantee
                </h3>
                <ul className="calm-body mt-4 list-disc space-y-2 pl-5 marker:text-signal">
                  {guarantee.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <figure className="mt-10 border border-ink/[0.22] bg-white p-6 md:p-8">
              <blockquote className="rd-prose border-l-4 border-signal pl-5">“{testimonial.quote}”</blockquote>
              <figcaption className="gl-mono mt-4 text-ink/70">
                {testimonial.name}, {testimonial.company}
              </figcaption>
            </figure>

            <div className="mt-8">
              <JumpButton to={FORM_ID} seed={67}>
                Get My Free First Draft →
              </JumpButton>
            </div>
          </Section>

          {/* 5. Free first draft */}
          <Section id={FORM_ID} labelledby="try-h">
            <SectionLabel>[04] Try it free</SectionLabel>
            <H2 id="try-h" text="See your next proposal written before your coffee gets cold." mark="before your coffee gets cold" seed={68} />
            <p className="calm-body mt-4 max-w-[46rem] text-ink/85">
              Send one live RFP and a couple of your past proposals. In under 20 minutes, a complete first draft lands in your inbox, built from your own work.
            </p>

            <div className="site-grid mt-8 gap-y-4 md:gap-y-6">
              <div className={`col-span-4 md:col-span-6 ${card}`}>
                <h3 className="calm-h3">Is this for you?</h3>
                <ul className="calm-body mt-3 list-disc space-y-2 pl-5 marker:text-signal">
                  {fit.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className="calm-body mt-4 font-bold">If you said yes, this was built for you. Try it on your next RFP.</p>
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-4 md:col-span-6">
                <div className={card}>
                  <h3 className="gl-mono text-ink/70">You send</h3>
                  <ul className="calm-body mt-3 list-disc space-y-2 pl-5">
                    <li>One live RFP or ToR</li>
                    <li>1–3 past proposals</li>
                    <li>Your company profile (optional)</li>
                  </ul>
                </div>
                <div className="border-2 border-ink bg-sage p-5 md:p-6">
                  <h3 className="gl-mono text-ink/70">You get</h3>
                  <ul className="calm-body mt-3 list-disc space-y-2 pl-5">
                    <li>A complete first draft of your technical proposal</li>
                    <li>Written in your firm’s voice, from your own past work</li>
                    <li>In your inbox in under 20 minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 max-w-[56rem]">
              <ProposalForm />
            </div>
          </Section>

          {/* 6. FAQ and final call to action */}
          <Section labelledby="faq-h">
            <SectionLabel>[05] Questions</SectionLabel>
            <H2 id="faq-h" text="Questions directors ask before they try it." seed={69} />
            <div className="mt-6 max-w-[56rem] border-t border-ink/30">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-ink/30 py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold [&::-webkit-details-marker]:hidden">
                    <span>{q}</span>
                    <span aria-hidden className="shrink-0 text-signal [details[open]_&]:hidden">+</span>
                    <span aria-hidden className="hidden shrink-0 text-signal [details[open]_&]:inline">−</span>
                  </summary>
                  <p className="calm-body pb-4 pr-8 text-ink/85">{a}</p>
                </details>
              ))}
            </div>
          </Section>

          {/* 7. Final call to action: the one dark panel */}
          <Section>
            <aside className="border border-ink bg-ink p-2 text-sage">
              <div className="border border-sage/30 p-6 text-center md:p-10">
                <h2 className="mx-auto max-w-[44rem] font-[family-name:var(--font-brule)] text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight text-[color:var(--paper)]">
                  Your next RFP is already out there. See it drafted in <Underlined seed={70}>under 20 minutes</Underlined>.
                </h2>
                <div className="mt-8">
                  <JumpButton to={FORM_ID} seed={71}>
                    Get My Free First Draft →
                  </JumpButton>
                </div>
                <p className="calm-body mt-6 text-sage/85">
                  Not ready yet?{" "}
                  <a href={AUDIT_HREF} className="font-bold text-[color:var(--paper)] underline underline-offset-4 hover:no-underline">
                    Find your proposal gaps with the free scorecard →
                  </a>
                </p>
              </div>
            </aside>
          </Section>
      </main>
    </SiteShell>
  );
}
