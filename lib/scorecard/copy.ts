/** Scorecard copy, verbatim from the spec. Terminology: "proposal", "RFP", "EOI". Never "bid" or "tender". */
import type { Stage } from "./questions";
import type { TierKey } from "./scoring";

/** The welcome screen of the full-screen flow. */
export const landing = {
  headline: "Is your proposal process costing you contracts you should be winning?",
  headlineMark: "costing you contracts",
  sub: "5 stages. About 4 minutes. No call needed.",
  button: "Start",
  resume: "Pick up where you left off",
  proofQuote: "Proposal creation went from several hours to a few minutes.",
  proofName: "Founders Freedom Africa",
};

/** Lead screens, one question each. */
export const leadScreens = {
  firstName: "What's your first name?",
  email: "What's your work email?",
  firmName: "What's your firm called?",
  role: "What's your role?",
  firmSize: "How big is your firm?",
  country: "Which country is your firm based in?",
  donors: "Which donors do you submit proposals to? (optional)",
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
  freeDraft: "Get your free proposal draft",
  book: "Book a call",
  checklist: "Get the 5-Stage Proposal Pipeline Playbook",
  linkedin: "Follow Wambui on LinkedIn",
  secondOpinion: "Want a second pair of eyes?",
  referTitle: "Know a firm that's struggling?",
  referLine: "Send them this scorecard.",
  demo: "Watch the demo",
  notFitNote: (a: string, b: string) =>
    `Your two weakest stages are ${a} and ${b}. The playbook shows what to fix first in each.`,
};

export const emailCopy = {
  resultsSubject: (pct: number, tierName: string) => `Your Proposal Pipeline Score: ${pct}% (${tierName})`,
  abandonSubject: "Your Proposal Pipeline Score is waiting",
  abandonBody: (firstName: string) =>
    `Hi ${firstName}, you're a few questions away from your score, your monthly proposal cost and your top 3 fixes. Pick up where you left off:`,
};
