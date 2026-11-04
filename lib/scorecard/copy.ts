/** Scorecard copy, verbatim from the spec. Terminology: "proposal", "RFP", "EOI". Never "bid" or "tender". */
import type { Stage } from "./questions";
import type { TierKey } from "./scoring";

export const landing = {
  label: "The Proposal Pipeline Scorecard",
  headline: "Is your proposal process costing you contracts you should be winning?",
  headlineMark: "costing you contracts",
  sub: "Check your proposal process across 5 stages in about 4 minutes and get your Proposal Pipeline Score. You'll see where your proposals lose time and what manual proposal work costs your firm each month.",
  button: "Get my Proposal Pipeline Score (takes about 4 minutes)",
  buttonRepeat: "Get my Proposal Pipeline Score",
  resume: "Pick up where you left off",
  familiarTitle: "Sound familiar?",
  familiar: [
    "You find a strong RFP ten days before the deadline.",
    "The same methodology section gets rewritten for every proposal.",
    "Experts' CVs are chased by email, then retyped into the donor's format.",
    "The weekend before submission goes on compliance checks.",
  ],
  getTitle: "What you'll get",
  gets: [
    "Your overall score and where you sit: Manual Mode, Patched Together, Connected or Proposal Machine.",
    "A score for each stage: Find, Filter, Draft, Staff, Submit.",
    "An estimate of the hours and money your firm spends on proposals each month.",
    "Your three highest-impact fixes, in order.",
  ],
  noPrep: "No preparation needed. Every question can be answered from memory.",
  builtTitle: "Who built this",
  built:
    "Wambui Ndung'u, founder of Made With Make. Wambui designs AI-powered proposal pipelines for consulting firms, from finding RFPs and EOIs to send-ready drafts. Computer Science and Mathematics background. Based in Nairobi, working with firms worldwide.",
  proofQuote: "Proposal creation went from several hours to a few minutes.",
  proofName: "Founders Freedom Africa",
  demoTitle: "Watch the 3-minute demo",
  faqTitle: "Questions",
  faqs: [
    ["Who is this for?", "Consultancies that respond to donor-funded RFPs and EOIs, especially teams without a dedicated proposal department."],
    ["Is it free?", "Yes. Your results appear on screen and are emailed to you."],
    ["What happens to my answers?", "They're used only to prepare your results and any follow-up you ask for. Never shared or sold."],
  ] as readonly (readonly string[])[],
};

export const leadForm = {
  label: "Before we begin",
  title: "Let's start with the basics.",
  button: "Start the scorecard",
  note: "Takes about 4 minutes · Results shown on screen and emailed to you",
};

export const tiers: Record<TierKey, { name: string; copy: string }> = {
  manual: {
    name: "Manual Mode",
    copy: "Your firm wins work through effort, not systems. Every proposal starts from zero, so capacity caps how many opportunities you can chase. The upside: small changes here create the biggest jump in proposals submitted and hours saved.",
  },
  patched: {
    name: "Patched Together",
    copy: "You have strong foundations: templates, good people, some habits. But the pieces don't talk to each other, so time leaks between stages. Connecting them is where your next gains are.",
  },
  connected: {
    name: "Connected",
    copy: "Your process is ahead of most firms. A few costly gaps remain, and closing them could add proposals without adding staff.",
  },
  machine: {
    name: "Proposal Machine",
    copy: "You run a disciplined pipeline. Your gains now come from speed and smarter filtering, not more effort.",
  },
};

export const stageInsights: Record<Stage, { diagnosis: string; fix: string }> = {
  find: {
    diagnosis: "Good opportunities reach you late or not at all.",
    fix: "A daily scan of your donors' portals, filtered to your sectors and countries, sent as one weekly digest.",
  },
  filter: {
    diagnosis: "Time goes on proposals you were unlikely to win.",
    fix: "A go/no-go score for every opportunity, based on your track record and eligibility.",
  },
  draft: {
    diagnosis: "Each proposal is rebuilt from old files.",
    fix: "A content library plus first drafts generated in the donor's format from your own material.",
  },
  staff: {
    diagnosis: "Finding experts and fixing CVs eats days.",
    fix: "A searchable expert database that shortlists people for each opportunity and formats their CVs.",
  },
  submit: {
    diagnosis: "Compliance is checked under pressure, and outcomes aren't tracked.",
    fix: "An automatic requirements checklist per RFP, plus a proposal tracker with win-rate reporting.",
  },
};

export const strongLine = "This is a strength. Protect it as you grow.";
export const helpFlagLine = "You asked for help here";

export const costBlock = (hours: string, cost: string, saved: string) =>
  `Your firm spends an estimated ${hours} hours a month on proposals, about ${cost}. Automating the repeatable parts could give back around ${saved} hours a month. These are estimates based on your answers and a $60 blended hourly rate.`;

export const resultsHeading = (firstName: string, pct: number, tierName: string) =>
  `${firstName}, your Proposal Pipeline Score is ${pct}%: ${tierName}`;

export const resultsLabels = {
  stages: "Your score by stage",
  cost: "What proposals cost you",
  fixes: "Your 3 priority fixes",
  next: "Your next step",
};

/** Next-step copy per segment (results page and email share these labels). */
export const nextSteps = {
  freeDraft: "Get your free first draft",
  book: "Book a discovery call",
  checklist: "Get the 5-Stage Proposal Pipeline Checklist",
  linkedin: "Follow Wambui on LinkedIn",
  secondOpinion: "Want a second pair of eyes?",
  referTitle: "Know a firm that's struggling?",
  referLine: "Send them this scorecard.",
  demo: "Watch the demo",
};

export const emailCopy = {
  resultsSubject: (pct: number, tierName: string) => `Your Proposal Pipeline Score: ${pct}% (${tierName})`,
  abandonSubject: "Your Proposal Pipeline Score is waiting",
  abandonBody: (firstName: string) =>
    `Hi ${firstName}, you're a few questions away from your score, your monthly proposal cost and your top 3 fixes. Pick up where you left off:`,
};
