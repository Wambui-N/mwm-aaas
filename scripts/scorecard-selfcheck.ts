/**
 * Acceptance cases for the Proposal Audit scoring and the three results pages (ready, almost, playbook).
 * Run: npx tsx scripts/scorecard-selfcheck.ts   (tsx is fetched on demand, not a project dependency)
 */
import { computeResult, formatUsd, segmentFor, stageLabelFor, tierFor, weakestStages, type Answers, type FirmAnswers } from "../lib/scorecard/scoring";
import { NO_DONORS, SCORED_IDS, type AnswerValue } from "../lib/scorecard/questions";

let failed = 0;
const check = (name: string, ok: boolean, got?: unknown) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `  got ${JSON.stringify(got)}`}`);
  if (!ok) failed++;
};

const all = (v: AnswerValue): Answers => Object.fromEntries(SCORED_IDS.map((id) => [id, v]));
const base: FirmAnswers = { c1: "10–19", c2: "40–60", c3: "Not sure", q1x: "We copy and adapt old proposals", q4x: "Ourselves, with guidance", q5x: "Just exploring" };
const WB = ["World Bank"];
const SIZE = "15–49";

// A: all yes
const a = computeResult({ answers: all("yes"), firm: base, firmSize: SIZE, donors: WB });
check("A 100%", a.totalPct === 100, a.totalPct);
check("A tier machine", a.tier === "machine", a.tier);
check("A all Strong", Object.values(a.stageScores).every((s) => s.label === "Strong"));
check("A page ready (fit does not depend on the score)", a.segment === "ready", a.segment);
check("A single 'even strong' fix", a.fixes.length === 1 && a.fixes[0].note !== undefined, a.fixes);

// B: all no
const b = computeResult({ answers: all("no"), firm: base, firmSize: SIZE, donors: WB });
check("B 0%", b.totalPct === 0, b.totalPct);
check("B tier manual", b.tier === "manual", b.tier);
check("B all Weak", Object.values(b.stageScores).every((s) => s.label === "Weak"));
check("B fixes find, filter, draft", b.fixes.map((f) => f.stage).join() === "find,filter,draft", b.fixes);

// C: all partly
const c = computeResult({ answers: all("partly"), firm: base, firmSize: SIZE, donors: WB });
check("C 50%", c.totalPct === 50, c.totalPct);
check("C tier patched", c.tier === "patched", c.tier);
check("C all Okay", Object.values(c.stageScores).every((s) => s.label === "Okay"));

// D: cost (5–9 proposals a month is 7, 40–60 hours is 50: 350 hours)
const d = computeResult({ answers: all("no"), firm: { ...base, c1: "5–9", c2: "40–60" }, firmSize: "5–14", donors: WB });
check("D hours 350", d.hoursMonth === 350, d.hoursMonth);
check("D cost $21,000", formatUsd(d.costMonth) === "$21,000", formatUsd(d.costMonth));
check("D saved 140", d.savedHours === 140, d.savedHours);

// G: help flag lifts Draft first
const g: Answers = all("yes");
g.q7 = "help";
g.q1 = "no"; // find is the lowest stage
g.q2 = "no";
g.q3 = "no";
const gr = computeResult({ answers: g, firm: base, firmSize: SIZE, donors: WB });
check("G help flag recorded", gr.helpFlags.join() === "draft", gr.helpFlags);
check("G Draft first although Find is lower", gr.fixes[0].stage === "draft" && gr.fixes[0].help, gr.fixes);

// H: two weakest stages (ties keep Find → Submit order)
check("H weakest two on all-no", weakestStages(b.stageScores, 2).join() === "find,filter", weakestStages(b.stageScores, 2));
const hAns = all("yes");
hAns.q10 = "no"; hAns.q11 = "no"; hAns.q12 = "no"; hAns.q7 = "no"; hAns.q8 = "partly";
const h = computeResult({ answers: hAns, firm: base, firmSize: SIZE, donors: WB });
check("H weakest two picks staff then draft", weakestStages(h.stageScores, 2).join() === "staff,draft", weakestStages(h.stageScores, 2));

// Pages, from the Ideal Client Profile
const page = (firmSize: string, c1: string, donors: string[] = WB, q1x = "We copy and adapt old proposals") =>
  segmentFor({ firmSize, firm: { ...base, c1, q1x }, donors });

check("ready: 15–49 staff, 10–19 proposals", page("15–49", "10–19") === "ready", page("15–49", "10–19"));
check("ready: 50–100 staff, 20+ proposals", page("50–100", "20+") === "ready", page("50–100", "20+"));
check("ready: donor answer 'Other' still counts", page("15–49", "10–19", ["Other"]) === "ready");
check("almost: 15–49 staff, 5–9 proposals", page("15–49", "5–9") === "almost", page("15–49", "5–9"));
check("almost: 5–14 staff with high volume", page("5–14", "20+") === "almost", page("5–14", "20+"));
check("almost: 5–14 staff, 5–9 proposals", page("5–14", "5–9") === "almost", page("5–14", "5–9"));
check("almost: over 100 staff without proposal software", page("Over 100", "10–19") === "almost", page("Over 100", "10–19"));
check("playbook: 1–4 staff even with high volume", page("1–4", "20+") === "playbook", page("1–4", "20+"));
check("playbook: under 5 proposals a month", page("15–49", "1–4") === "playbook", page("15–49", "1–4"));
check("playbook: no donor-funded RFPs", page("15–49", "10–19", [NO_DONORS]) === "playbook", page("15–49", "10–19", [NO_DONORS]));
check("playbook: no donor answer at all", page("15–49", "10–19", []) === "playbook", page("15–49", "10–19", []));
check("playbook: over 100 staff with proposal software", page("Over 100", "20+", WB, "We use proposal software") === "playbook");

// extras
check(
  "tier edges 39/40/64/65/84/85",
  [39, 40, 64, 65, 84, 85].map(tierFor).join() === "manual,patched,patched,connected,connected,machine",
);
check("stage labels 49/50/79/80", [49, 50, 79, 80].map(stageLabelFor).join() === "Weak,Okay,Okay,Strong");
check("stage max 7/7/8/7/6 total 35", a.totalPoints === 35 && a.stageScores.draft.points === 8 && a.stageScores.submit.points === 6);

console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
