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
  donors: "Which donors do you submit proposals to?",
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

/** Next-step button labels (results page and email share these). */
export const nextSteps = {
  freeDraft: "Get your free first draft",
  book: "Book a call",
  playbook: "Get the 5-Stage Proposal Pipeline Playbook",
  getReadyChecklist: "Get the Get-Ready Checklist",
  starterChecklist: "Get the Starter Checklist",
  demo: "Watch the demo",
  weakestNote: (a: string, b: string) => `Your two weakest stages are ${a} and ${b}. The Playbook shows what to fix first in each.`,
};

/** The three results pages. Visitors never see the words "qualified" or "fit": each page says what to do next. */
export const pages = {
  ready: {
    heading: "Here's how this would work for your team",
    lede: "At your volume, the repeatable parts of proposal writing add up fast. This is how the Proposal Pipeline takes them off your team.",
    steps: [
      { title: "You send", body: "One live RFP and one to three of your past proposals. About 5 minutes." },
      { title: "We run it", body: "The pipeline reads the ToR and writes a complete first draft from your own past work, in under 20 minutes." },
      { title: "Your team reviews", body: "You polish a draft instead of starting from a blank page. If it doesn't sound like your firm yet, we keep refining it with you." },
    ],
  },
  almost: {
    heading: "Where to start",
    lede: "A full system pays off most once you're sending around 10 proposals a month. Until then, the Playbook and the Get-Ready Checklist cover the fixes above, so you're ready when you get there.",
    retake: "Retake the audit when you reach 10 proposals a month.",
  },
  playbook: {
    heading: "Your playbook",
    lede: "At your volume, a system is more than you need today. The Playbook walks through the fixes above, stage by stage, and the Starter Checklist gives you five habits to start with.",
    retake: "Retake the audit if your proposal volume grows.",
  },
  reachOut: "Questions, or want to talk it through? Write to me any time.",
};

export const emailCopy = {
  /** One short paragraph per results page, after the numbers and before the buttons. */
  pageNote: {
    ready:
      "Here's the quickest way to see the Proposal Pipeline on your own work: send one live RFP and one to three of your past proposals, and a complete first draft comes back in under 20 minutes. Or book 30 minutes and we'll go through your results together.",
    almost:
      "A system pays off most once you're sending around 10 proposals a month. Until then, the Playbook shows what to fix first in each stage, and the Get-Ready Checklist gets you ready for when your volume grows. Questions? Just reply to this email.",
    playbook:
      "At your volume, a system is more than you need today. The Playbook walks through the fixes stage by stage, and the Starter Checklist gives you five habits to start with. Questions? Just reply to this email.",
  },
  nudgeSubject: "Your first draft is one upload away",
  nudgeBody: (firstName: string) =>
    `Hi ${firstName}, your audit results are saved, and your free first draft is still waiting. Send one live RFP and one to three of your past proposals, and a complete first draft comes back in under 20 minutes. If you'd rather talk it through first, book 30 minutes.`,
  resultsSubject: (pct: number, tierName: string) => `Your Proposal Pipeline Score: ${pct}% (${tierName})`,
  abandonSubject: "Your Proposal Pipeline Score is waiting",
  abandonBody: (firstName: string) =>
    `Hi ${firstName}, you're a few questions away from your score, your monthly proposal cost and your top 3 fixes. Pick up where you left off:`,
};
