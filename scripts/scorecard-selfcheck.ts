/**
 * Acceptance cases A–G from the scorecard spec. Run: npx tsx scripts/scorecard-selfcheck.ts
 * (tsx is fetched on demand, not a project dependency).
 */
import { computeResult, formatUsd, stageLabelFor, tierFor, type Answers, type FirmAnswers } from "../lib/scorecard/scoring";
import { SCORED_IDS, type AnswerValue } from "../lib/scorecard/questions";

let failed = 0;
const check = (name: string, ok: boolean, got?: unknown) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `  got ${JSON.stringify(got)}`}`);
  if (!ok) failed++;
};

const all = (v: AnswerValue): Answers => Object.fromEntries(SCORED_IDS.map((id) => [id, v]));
const base: FirmAnswers = { c1: "3–5", c2: "40–60", c3: "Not sure", q4x: "Ourselves, with guidance", q5x: "Just exploring" };

// A: all yes
const a = computeResult({ answers: all("yes"), firm: base, firmSize: "5–15" });
check("A 100%", a.totalPct === 100, a.totalPct);
check("A tier machine", a.tier === "machine", a.tier);
check("A all Strong", Object.values(a.stageScores).every((s) => s.label === "Strong"));
check("A segment machine", a.segment === "machine", a.segment);
check("A single 'even strong' fix", a.fixes.length === 1 && a.fixes[0].note !== undefined, a.fixes);

// B: all no
const b = computeResult({ answers: all("no"), firm: base, firmSize: "5–15" });
check("B 0%", b.totalPct === 0, b.totalPct);
check("B tier manual", b.tier === "manual", b.tier);
check("B all Weak", Object.values(b.stageScores).every((s) => s.label === "Weak"));
check("B fixes find, filter, draft", b.fixes.map((f) => f.stage).join() === "find,filter,draft", b.fixes);

// C: all partly
const c = computeResult({ answers: all("partly"), firm: base, firmSize: "5–15" });
check("C 50%", c.totalPct === 50, c.totalPct);
check("C tier patched", c.tier === "patched", c.tier);
check("C all Okay", Object.values(c.stageScores).every((s) => s.label === "Okay"));

// D: cost
const d = computeResult({ answers: all("no"), firm: { ...base, c1: "3–5", c2: "40–60" }, firmSize: "5–15" });
check("D hours 200", d.hoursMonth === 200, d.hoursMonth);
check("D cost $12,000", formatUsd(d.costMonth) === "$12,000", formatUsd(d.costMonth));
check("D saved 80", d.savedHours === 80, d.savedHours);

// E: size 1-4
const e = computeResult({ answers: all("yes"), firm: { ...base, q5x: "This month", q4x: "Built and run for us" }, firmSize: "1–4" });
check("E not_fit", e.segment === "not_fit", e.segment);
const e2 = computeResult({ answers: all("partly"), firm: { ...base, c1: "1–2" }, firmSize: "51–200" });
check("E2 not_fit via c1 1–2", e2.segment === "not_fit", e2.segment);

// F: ideal at 55%
const partlyPlus: Answers = all("partly");
// push to ~55%: 17.5 points is 50%; turn q1 (weight 3) to yes (+1.5) = 19 → 54%, q2 yes (+1) = 20 → 57%. Use q1 only plus q4 (+1): 20 → 57%.
partlyPlus.q1 = "yes";
partlyPlus.q2 = "yes";
const f = computeResult({
  answers: partlyPlus,
  firm: { ...base, c1: "6–10", q5x: "This month", q4x: "Built and run for us" },
  firmSize: "16–50",
});
check("F ideal", f.segment === "ideal", f.segment);
check("F score in the 50s", f.totalPct >= 50 && f.totalPct < 65, f.totalPct);

// G: help flag lifts Draft first
const g: Answers = all("yes");
g.q7 = "help";
g.q1 = "no"; // find is the lowest stage
g.q2 = "no";
g.q3 = "no";
const gr = computeResult({ answers: g, firm: base, firmSize: "5–15" });
check("G help flag recorded", gr.helpFlags.join() === "draft", gr.helpFlags);
check("G Draft first although Find is lower", gr.fixes[0].stage === "draft" && gr.fixes[0].help, gr.fixes);

// extras
check(
  "tier edges 39/40/64/65/84/85",
  [39, 40, 64, 65, 84, 85].map(tierFor).join() === "manual,patched,patched,connected,connected,machine",
);
check("stage labels 49/50/79/80", [49, 50, 79, 80].map(stageLabelFor).join() === "Weak,Okay,Okay,Strong");
check("stage max 7/7/8/7/6 total 35", (() => {
  const r = computeResult({ answers: all("yes"), firm: base, firmSize: "5–15" });
  return r.totalPoints === 35 && r.stageScores.draft.points === 8 && r.stageScores.submit.points === 6;
})());

console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
