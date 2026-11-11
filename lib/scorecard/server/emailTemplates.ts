/** Plain HTML emails. Every user-supplied value is escaped. Server only. */
import { costBlock, emailCopy, nextSteps, stageInsights, tiers } from "../copy";
import { FIRM_QUESTIONS, SCORED_QUESTIONS, STAGES, STAGE_NAMES, type Stage } from "../questions";
import { formatUsd, weakestStages, type ScoreResult } from "../scoring";
import type { SubmissionRow } from "./db";
import { absolute, nextLinks, resultsUrl, resumeUrl } from "./links";

export const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type Mail = { subject: string; html: string; text: string };

const wrap = (inner: string) =>
  `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f1e8;font-family:Arial,Helvetica,sans-serif;color:#141010;line-height:1.55;font-size:16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;padding:28px;border:1px solid #14101033">${inner}</div></body></html>`;

const button = (href: string, label: string) =>
  `<p style="margin:20px 0"><a href="${esc(href)}" style="display:inline-block;background:#e65032;color:#141010;font-weight:bold;text-decoration:none;padding:12px 18px;border:2px solid #141010">${esc(label)}</a></p>`;

function ranked(result: ScoreResult): { top: Stage; weakest: Stage; even: boolean } {
  const byPct = [...STAGES].map((s, i) => ({ s, i, pct: result.stageScores[s].pct }));
  const top = [...byPct].sort((a, b) => b.pct - a.pct || a.i - b.i)[0];
  const weakest = [...byPct].sort((a, b) => a.pct - b.pct || a.i - b.i)[0];
  return { top: top.s, weakest: weakest.s, even: top.pct === weakest.pct };
}

export function resultsEmail(row: Pick<SubmissionRow, "id" | "first_name">, result: ScoreResult): Mail {
  const tier = tiers[result.tier].name;
  const link = resultsUrl(row.id);
  const { top, weakest, even } = ranked(result);
  const cost = costBlock(String(result.hoursMonth), formatUsd(result.costMonth), String(result.savedHours));
  const links = nextLinks(result.segment, row.id, weakestStages(result.stageScores, 1)[0]);
  const intro = even
    ? `Your stages are evenly matched. Your three priority fixes start with ${STAGE_NAMES[result.fixes[0].stage]}.`
    : `Your strongest stage is ${STAGE_NAMES[top]}. The one costing you most is ${STAGE_NAMES[weakest]}. Your three priority fixes start there.`;

  const [w1, w2] = weakestStages(result.stageScores, 2);
  const weakestLine = result.segment !== "ready" ? nextSteps.weakestNote(STAGE_NAMES[w1], STAGE_NAMES[w2]) : "";
  const pageNote = emailCopy.pageNote[result.segment];

  const stageRows = STAGES.map((s) => `${STAGE_NAMES[s]}: ${result.stageScores[s].pct}% (${result.stageScores[s].label})`);
  const subject = emailCopy.resultsSubject(result.totalPct, tier);

  const html = wrap(
    `<p>Hi ${esc(row.first_name)},</p>` +
      `<p>Thanks for taking the Proposal Audit. Your results are below and saved at <a href="${esc(link)}">${esc(link)}</a>.</p>` +
      `<p style="font-size:20px;margin:18px 0 4px"><strong>${result.totalPct}%: ${esc(tier)}</strong></p>` +
      `<ul style="padding-left:18px;margin:8px 0">${stageRows.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` +
      `<p>${esc(cost)}</p>` +
      `<p>${esc(intro)}</p>` +
      (weakestLine ? `<p>${esc(weakestLine)}</p>` : "") +
      `<p>${esc(pageNote)}</p>` +
      links.map((l) => button(l.href.startsWith("/") ? absolute(l.href) : l.href, l.label)).join("") +
      `<p>Wambui</p>`,
  );
  const text = [
    `Hi ${row.first_name},`,
    "",
    `Thanks for taking the Proposal Audit. Your results are below and saved at ${link}.`,
    "",
    `${result.totalPct}%: ${tier}`,
    ...stageRows,
    "",
    cost,
    "",
    intro,
    ...(weakestLine ? ["", weakestLine] : []),
    "",
    pageNote,
    "",
    ...links.map((l) => `${l.label}: ${l.href.startsWith("/") ? absolute(l.href) : l.href}`),
    "",
    "Wambui",
  ].join("\n");
  return { subject, html, text };
}

export function abandonEmail(row: Pick<SubmissionRow, "id" | "first_name">): Mail {
  const link = resumeUrl(row.id);
  const body = emailCopy.abandonBody(row.first_name);
  return {
    subject: emailCopy.abandonSubject,
    html: wrap(`<p>${esc(body)}</p>${button(link, "Pick up where you left off")}<p>Wambui</p>`),
    text: `${body} ${link}\n\nWambui`,
  };
}

/** The one reminder for a ready result that has not used its free first draft: the draft and a call, same two buttons. */
export function nudgeEmail(row: Pick<SubmissionRow, "id" | "first_name">): Mail {
  const body = emailCopy.nudgeBody(row.first_name);
  const links = nextLinks("ready", row.id).map((l) => ({ ...l, href: l.href.startsWith("/") ? absolute(l.href) : l.href }));
  return {
    subject: emailCopy.nudgeSubject,
    html: wrap(`<p>${esc(body)}</p>${links.map((l) => button(l.href, l.label)).join("")}<p>Wambui</p>`),
    text: [body, "", ...links.map((l) => `${l.label}: ${l.href}`), "", "Wambui"].join("\n"),
  };
}

/** Internal alert for ideal-fit leads: everything Wambui needs for a personal follow-up within 24 hours. */
export function alertEmail(row: SubmissionRow, result: ScoreResult): Mail {
  const tier = tiers[result.tier].name;
  const link = resultsUrl(row.id);
  const hot = result.helpFlags.length > 0 || row.firm_answers.q5x === "This month" || row.firm_answers.q5x === "In the next 3 months";
  const subject = `${hot ? "HOT: " : ""}Audit lead, ready to automate: ${row.firm_name} (${result.totalPct}%)`;
  const helpStages = result.helpFlags.map((s) => STAGE_NAMES[s]);

  const scored = SCORED_QUESTIONS.map((q) => `${q.id} (${STAGE_NAMES[q.stage]}): ${row.answers[q.id] ?? "-"}`);
  const firm = FIRM_QUESTIONS.map((q) => `${q.id}: ${row.firm_answers[q.id] ?? "-"}`);
  const fixes = result.fixes.map((f) => `${STAGE_NAMES[f.stage]}: ${stageInsights[f.stage].diagnosis}`);

  const lines = [
    `Name: ${row.first_name}`,
    `Email: ${row.email}`,
    `Role: ${row.role}`,
    `Firm: ${row.firm_name}`,
    `Size: ${row.firm_size}`,
    `Country: ${row.country}`,
    `Donors: ${row.donors.join(", ") || "-"}`,
    "",
    `Score: ${result.totalPct}% (${tier})`,
    `Asked for help in: ${helpStages.length ? helpStages.join(", ") : "none"}`,
    `Cost estimate: ${result.hoursMonth} hours a month, ${formatUsd(result.costMonth)}; about ${result.savedHours} hours could be given back`,
    `Priority fixes: ${fixes.join(" | ")}`,
    "",
    "Scored answers:",
    ...scored,
    "",
    "Firm answers:",
    ...firm,
    "",
    `Results: ${link}`,
  ];
  const help = helpStages.length
    ? `<p style="background:#fde9e4;padding:10px;border:1px solid #e65032"><strong>Asked for help in: ${esc(helpStages.join(", "))}. Move to the top of the list.</strong></p>`
    : "";
  return {
    subject,
    html: wrap(`${help}<pre style="white-space:pre-wrap;font-family:inherit;margin:0">${esc(lines.join("\n"))}</pre>`),
    text: (helpStages.length ? `ASKED FOR HELP IN: ${helpStages.join(", ")}\n\n` : "") + lines.join("\n"),
  };
}
