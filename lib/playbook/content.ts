/**
 * The 5-Stage Proposal Pipeline Playbook and its two checklists. Written for proposal people who are new to
 * automation: never explain proposals, explain the automation plainly. Terminology: proposal, RFP, EOI, ToR.
 * Never "bid" or "tender". Say "first draft".
 */
import type { Stage } from "@/lib/scorecard/questions";

export type PlaybookStage = {
  stage: Stage;
  name: string;
  /** The problem, in the reader's words. */
  problem: string;
  /** What good looks like. */
  good: string;
  /** Exactly three steps. */
  steps: readonly { title: string; body: string }[];
  /** One template: a name, a one-line use, and the column headings to copy into a sheet. */
  template: { name: string; use: string; columns: readonly string[] };
  /** One honest sentence on when a system starts to pay off. */
  automate: string;
};

export const playbook = {
  title: "The 5-Stage Proposal Pipeline Playbook",
  lede: "Five stages, three steps each, one template per stage. It's what a well-run proposal team does, written down so you can do it this week with the tools you already have.",
  how: [
    "Every proposal moves through the same five stages: Find, Filter, Draft, Staff, Submit. Most firms are strong in two or three of them and leaking time in the rest.",
    "Start with the stage your audit scored lowest. Do the three steps, copy the template, and move on to the next. None of it needs new software.",
  ],
  startHere: "Your lowest-scoring stage",
  retakeTitle: "Done a few stages? See where you stand now.",
  retakeBody: "The Proposal Audit takes about 4 minutes. Take it again after you've worked through the Playbook and compare your score.",
  closing: "Questions, or want to talk something through? Write to me any time.",
  stages: [
    {
      stage: "find",
      name: "Find",
      problem: "Good RFPs reach you late, or not at all, because finding them depends on whoever remembers to check.",
      good: "Relevant opportunities arrive in one place, in a rhythm, without anyone hunting for them.",
      steps: [
        {
          title: "Write down where opportunities come from",
          body: "One list: each donor, the portal or mailing list you hear from, who checks it, and how often. Only include places you could realistically win from. You'll probably find one portal nobody has looked at since March.",
        },
        {
          title: "Set alerts instead of paying visits",
          body: "Use saved searches and email alerts filtered to your sectors and countries. Send them all to one shared inbox or channel, never to one person's own address, so the whole team sees them and nothing disappears on leave.",
        },
        {
          title: "Hold a 20-minute weekly scan",
          body: "Same slot every week. One person brings the shortlist. Everyone else has two minutes to say \"that's ours\" or \"pass\". A good RFP you see ten days before the deadline is a very different RFP from one you see two days before.",
        },
      ],
      template: {
        name: "Portal register",
        use: "One row per donor or portal. It becomes your checklist for the weekly scan.",
        columns: ["Donor", "Portal or source", "How we hear (alert, newsletter, contact)", "Sectors and countries filter", "Owner", "Last checked"],
      },
      automate: "Once you're following five or more portals, a daily scan filtered to your sectors, sent as one weekly digest, takes the hunting off your team.",
    },
    {
      stage: "filter",
      name: "Filter",
      problem: "Time goes on proposals you were unlikely to win, so the strong ones get less of it.",
      good: "A go or no-go decision within one working day, using criteria everyone agreed before the RFP arrived.",
      steps: [
        {
          title: "Agree six to eight criteria, once",
          body: "For example: do we meet the eligibility rules; do we have recent work in this sector and region; are the key experts available; do we know the donor and the client; how many strong firms are likely to respond; is there enough time to do it well; does the budget justify the effort.",
        },
        {
          title: "Score every opportunity in ten minutes",
          body: "Give each criterion 0, 1 or 2. Add them up. Above your line is a go, near it is a maybe, below it is a pass. The point is not precision. It is replacing the argument with a number you can both look at.",
        },
        {
          title: "Decide the same day, and write one line why",
          body: "Log the passes too. After a few months, the list of things you turned down tells you more about where you win than the list of things you sent.",
        },
      ],
      template: {
        name: "Go/no-go scorecard",
        use: "One row per opportunity, one column per criterion. The total and the one-line reason are what you keep.",
        columns: ["Opportunity", "Donor", "Deadline", "Criterion 1 to 8 (score 0 to 2)", "Total", "Decision (go, maybe, pass)", "One line why"],
      },
      automate: "When you're weighing more than a handful of opportunities a month, a score generated from your track record and the eligibility rules does the first pass for you.",
    },
    {
      stage: "draft",
      name: "Draft",
      problem: "Each proposal is rebuilt from old files, and the methodology section is on its fortieth outing.",
      good: "Nobody starts from a blank page. The parts that repeat are ready, and the time goes on what's specific to this RFP.",
      steps: [
        {
          title: "Gather your last ten proposals, winners first",
          body: "Put them in one shared folder. Messy is fine. You're not tidying yet. You're finding out what you actually say again and again.",
        },
        {
          title: "Pull out the parts that repeat",
          body: "Company profile, approach and methodology, quality assurance, risk management, project management, team structure, case studies. One short file per block, with a line on when to use it. Keep the best version of each, not every version.",
        },
        {
          title: "Start every new proposal from the evaluation criteria",
          body: "Outline first: one heading per criterion in the ToR. Then drop in the blocks and tailor them. The tailoring is the part that wins, so that's where the team's time should go.",
        },
      ],
      template: {
        name: "Content library",
        use: "A folder structure that anyone on the team can find things in within a minute.",
        columns: ["Library / Section / Donor / Year", "Block name", "Last updated", "Best used when", "Owner"],
      },
      automate: "A content library is also what a first-draft system is built from. When yours is in decent shape, a complete first draft in the donor's format, written from your own material, is a short step.",
    },
    {
      stage: "staff",
      name: "Staff",
      problem: "Finding the right experts and fixing their CVs eats days, usually the days you don't have.",
      good: "You can shortlist the right experts in under an hour, and their CVs are ready in the donor's format.",
      steps: [
        {
          title: "Keep one master CV per expert in one folder",
          body: "Put the date in the file name and refresh each one once a year, not during a deadline. Ask associates for updates on a schedule, with a deadline of their own.",
        },
        {
          title: "Add a one-line profile for each person",
          body: "In one sheet: sectors, regions, languages, donors they've worked with, and a rough sense of availability. That sheet is how you answer \"who do we have for this?\" without sending an email round.",
        },
        {
          title: "Keep blank donor CV formats and fill them in one pass",
          body: "World Bank, EU and the others you use, saved as templates. Fill them from the master CV once, rather than retyping from scratch each time.",
        },
      ],
      template: {
        name: "Expert register",
        use: "One row per expert. It's the sheet you search when an RFP arrives.",
        columns: ["Name", "Master CV (link and date)", "Sectors", "Regions", "Languages", "Donors worked with", "Availability (rough)", "Last updated"],
      },
      automate: "A searchable expert database that shortlists people for each opportunity and formats their CVs is the next step once the register above exists and is kept current.",
    },
    {
      stage: "submit",
      name: "Submit",
      problem: "Compliance is checked under pressure, and nobody remembers what happened to last year's proposals.",
      good: "Proposals go out without a last-minute rush, and you know your win rate.",
      steps: [
        {
          title: "Build a requirements checklist on day one",
          body: "Every mandatory item in the RFP, where in the proposal it's answered, and who owns it. The checklist is also your outline for the compliance check at the end.",
        },
        {
          title: "Set an internal deadline a day before the real one",
          body: "The last day is for checking, not writing. Run the same final check every time: formats, page limits, signatures, annexes, file names, and a test of the upload if the portal allows it.",
        },
        {
          title: "Log every result",
          body: "Submitted, won or lost, the score if you get it, and one line on why. Review the log every quarter. Your win rate by donor and sector will show you where to focus.",
        },
      ],
      template: {
        name: "Requirements checklist and outcome log",
        use: "Two small sheets. The first lives with each proposal. The second lives forever.",
        columns: ["Requirements: item", "Where it's answered", "Owner", "Done", "Outcome log: proposal, donor, submitted, result, score, one line why"],
      },
      automate: "An automatic requirements checklist for each RFP, plus a proposal tracker with win-rate reporting, takes this stage off your team's late nights.",
    },
  ] satisfies readonly PlaybookStage[],
} as const;

export type ChecklistGroup = { title: string; items: readonly string[] };

export const getReadyChecklist = {
  title: "The Get-Ready Checklist",
  lede: "Ten things to tidy before you automate. Do them in any order. Each one makes a first-draft system work better, and each one saves your team time even if you never build one.",
  groups: [
    {
      title: "Your numbers",
      items: [
        "Count the proposals and EOIs you sent in the last three months, and roughly how many hours each took. Your audit gave you an estimate. Replace it with the real figure.",
      ],
    },
    {
      title: "Your content",
      items: [
        "Save your last ten proposals in one shared folder, winners first.",
        "Pull out the repeat sections (company profile, approach, quality assurance, risk, project management) into one file each.",
        "Keep one approved, dated version of your company profile.",
      ],
    },
    {
      title: "Your people",
      items: [
        "Collect one master CV per expert in one folder, with the date in the file name.",
        "Start a one-sheet register of your experts: sectors, regions, languages, donors.",
      ],
    },
    {
      title: "Your process",
      items: [
        "Write your go/no-go criteria on one page.",
        "Name one owner for each of the five stages. It can be the same person.",
        "Start a win/loss log: every proposal, the result, and one line on why.",
      ],
    },
    {
      title: "Your ground rules",
      items: [
        "Decide where donor and client files live, who can see them, and which AI tools are allowed. Business terms only, nothing that trains on your content.",
      ],
    },
  ] satisfies readonly ChecklistGroup[],
  closing: {
    title: "Ready, or nearly?",
    body: "When you're sending around 10 proposals a month, retake the audit. By then most of this will be done, and a first-draft system will have a lot to work with.",
  },
} as const;

export const starterChecklist = {
  title: "The Starter Checklist",
  lede: "Five habits, one for each stage. Each takes about fifteen minutes to start, and none needs new software.",
  habits: [
    { stage: "Find", title: "Pick the two portals that matter", body: "Set an alert on each, filtered to your sector and countries. Send both to one shared inbox." },
    { stage: "Filter", title: "Ask three questions before every response", body: "Can we meet the eligibility rules? Do we have recent work like this? Do we have the people, and are they free? If two answers are no, pass." },
    { stage: "Draft", title: "Save every proposal you send, and pull out one reusable section", body: "Start with the one you rewrite most often. Next time, start from that file instead of a blank page." },
    { stage: "Staff", title: "Keep one up-to-date master CV for each regular expert", body: "Put the date in the file name. Refresh them once a year, outside deadline week." },
    { stage: "Submit", title: "Write a final-check list and use it every time", body: "Formats, page limits, signatures, annexes, file names. Then log every result in one line, so you know what you've won." },
  ],
  closing: {
    title: "Growing?",
    body: "If you start sending more proposals, retake the audit. Your score and your next steps will change with your volume.",
  },
} as const;
