/** Scorecard questions, answer options and lead-form option lists. Wording is the spec's, verbatim. */

export const STAGES = ["find", "filter", "draft", "staff", "submit"] as const;
export type Stage = (typeof STAGES)[number];

export const STAGE_NAMES: Record<Stage, string> = {
  find: "Find",
  filter: "Filter",
  draft: "Draft",
  staff: "Staff",
  submit: "Submit",
};

export const ANSWER_VALUES = ["yes", "partly", "no", "help"] as const;
export type AnswerValue = (typeof ANSWER_VALUES)[number];

export const ANSWER_OPTIONS: readonly { value: AnswerValue; label: string }[] = [
  { value: "yes", label: "Yes, that's us" },
  { value: "partly", label: "Partly" },
  { value: "no", label: "Not yet" },
  { value: "help", label: "Not yet, and I'd like help with this" },
];

export type ScoredQuestion = { id: string; stage: Stage; label: string; weight: number };

export const SCORED_QUESTIONS: readonly ScoredQuestion[] = [
  { id: "q1", stage: "find", weight: 3, label: "Do RFPs and EOIs that fit your firm reach you automatically, without anyone checking donor portals by hand?" },
  { id: "q2", stage: "find", weight: 2, label: "Do you keep track of every donor and portal you could realistically win work from?" },
  { id: "q3", stage: "find", weight: 2, label: "Do you usually spot relevant opportunities early enough to prepare a strong proposal?" },
  { id: "q4", stage: "filter", weight: 2, label: "Do you use agreed criteria to decide whether to respond to an opportunity?" },
  { id: "q5", stage: "filter", weight: 2, label: "Can you make a go/no-go decision within a day of finding an opportunity?" },
  { id: "q6", stage: "filter", weight: 3, label: "Do you regularly pass on opportunities you're unlikely to win, so the team can focus on stronger ones?" },
  { id: "q7", stage: "draft", weight: 3, label: "Do you have a library of approved, reusable content (methodologies, company profile, past projects) that anyone on the team can find quickly?" },
  { id: "q8", stage: "draft", weight: 3, label: "Can your team produce a complete first draft of a technical proposal in two days or less?" },
  { id: "q9", stage: "draft", weight: 2, label: "Do your proposals match each donor's required format without heavy manual reformatting?" },
  { id: "q10", stage: "staff", weight: 2, label: "Are your staff and associate CVs kept in one place and up to date?" },
  { id: "q11", stage: "staff", weight: 3, label: "Can you shortlist the right experts for an opportunity in under an hour?" },
  { id: "q12", stage: "staff", weight: 2, label: "Can you produce CVs in a donor's format (World Bank, EU and others) without retyping them?" },
  { id: "q13", stage: "submit", weight: 2, label: "Do you check every submission against the RFP's requirements with a checklist before it goes out?" },
  { id: "q14", stage: "submit", weight: 2, label: "Do your proposals usually go out without a last-minute rush?" },
  { id: "q15", stage: "submit", weight: 2, label: "Do you track every proposal's outcome and know your win rate for the past year?" },
];

export const SCORED_IDS = SCORED_QUESTIONS.map((q) => q.id);

export const STAGE_MAX: Record<Stage, number> = STAGES.reduce(
  (acc, s) => ({ ...acc, [s]: SCORED_QUESTIONS.filter((q) => q.stage === s).reduce((n, q) => n + q.weight, 0) }),
  {} as Record<Stage, number>,
);
export const TOTAL_MAX = STAGES.reduce((n, s) => n + STAGE_MAX[s], 0);

/** Unscored firm questions. `value` is what is stored; `n` is the number used in the cost maths. */
export type FirmOption = { value: string; n?: number };
export type FirmQuestion = { id: string; label: string; options: readonly FirmOption[]; optionalText?: boolean };

export const FIRM_INTRO = "A few quick questions about your firm";

export const FIRM_QUESTIONS: readonly FirmQuestion[] = [
  {
    id: "c1",
    label: "About how many proposals (EOIs and full proposals) does your firm submit a month?",
    options: [
      { value: "1–2", n: 1.5 },
      { value: "3–5", n: 4 },
      { value: "6–10", n: 8 },
      { value: "11–20", n: 15 },
      { value: "20+", n: 25 },
    ],
  },
  {
    id: "c2",
    label: "Roughly how many person-hours go into one full technical proposal, across everyone involved?",
    options: [
      { value: "Under 20", n: 15 },
      { value: "20–40", n: 30 },
      { value: "40–60", n: 50 },
      { value: "60–100", n: 80 },
      { value: "100+", n: 120 },
    ],
  },
  {
    id: "c3",
    label: "Roughly what share of your proposals do you win?",
    options: [{ value: "Under 10%" }, { value: "10–20%" }, { value: "20–35%" }, { value: "Over 35%" }, { value: "Not sure" }],
  },
  {
    id: "q1x",
    label: "Which best describes how you prepare proposals today?",
    options: [
      { value: "We write most of it from scratch" },
      { value: "We copy and adapt old proposals" },
      { value: "We have templates and a content library" },
      { value: "We use proposal software" },
    ],
  },
  {
    id: "q2x",
    label: "What would make the biggest difference in the next 6 months?",
    options: [
      { value: "Submitting more proposals without hiring" },
      { value: "Less time per proposal" },
      { value: "Winning a bigger share of proposals" },
      { value: "Depending less on one or two people" },
    ],
  },
  {
    id: "q3x",
    label: "Where is your biggest bottleneck right now?",
    options: [
      { value: "Finding opportunities" },
      { value: "Deciding what to go for" },
      { value: "Writing" },
      { value: "Experts and CVs" },
      { value: "Compliance and submission" },
    ],
  },
  {
    id: "q4x",
    label: "If you fixed this, how would you prefer to do it?",
    options: [
      { value: "Ourselves, with guidance" },
      { value: "With a specialist building it alongside us" },
      { value: "Built and run for us" },
    ],
  },
  {
    id: "q5x",
    label: "How soon do you want to improve your proposal process?",
    options: [{ value: "This month" }, { value: "In the next 3 months" }, { value: "This year" }, { value: "Just exploring" }],
  },
  {
    id: "q6x",
    label: "Anything else about your proposal process we should know? (optional)",
    options: [],
    optionalText: true,
  },
];

export const Q6X_MAX = 1000;

/** Lead form option lists, in the spec's order. */
export const ROLES = [
  "Managing Director / Partner",
  "BD or Proposal Manager",
  "Proposal Coordinator / Writer",
  "Technical Expert",
  "Other",
] as const;

export const FIRM_SIZES = ["1–4", "5–15", "16–50", "51–200", "200+"] as const;

export const DONORS = [
  "World Bank",
  "EU",
  "AfDB",
  "ADB",
  "UN agencies",
  "Bilateral (FCDO, GIZ, AFD and similar)",
  "Foundations",
  "Other",
] as const;

export const CONSENT_LABEL = "Email me my results and occasional proposal-process tips. Unsubscribe anytime.";
