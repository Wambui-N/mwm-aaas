/** Next-step links per segment, shared by the results page and the results email. Server only (reads env). */
import { DEFAULT_BOOKING_URL, FREE_DRAFT_HREF, SCORECARD_PATH } from "../config";
import { nextSteps } from "../copy";
import type { Segment } from "../scoring";

export type NextLink = { key: string; label: string; href: string; primary?: boolean };

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://madewithmake.com").replace(/\/$/, "");
}

export const absolute = (href: string) => (/^https?:\/\//.test(href) ? href : `${siteUrl()}${href.startsWith("/") ? "" : "/"}${href}`);

export const resultsUrl = (id: string) => absolute(`${SCORECARD_PATH}/results/${id}`);
export const resumeUrl = (id: string) => absolute(`${SCORECARD_PATH}?resume=${id}`);

const env = {
  booking: () => process.env.BOOKING_URL?.trim() || DEFAULT_BOOKING_URL,
  draft: () => process.env.FREE_DRAFT_URL?.trim() || FREE_DRAFT_HREF,
  /** The 5-Stage Proposal Pipeline Playbook. CHECKLIST_URL is the older name for the same link. */
  playbook: () => process.env.PLAYBOOK_URL?.trim() || process.env.CHECKLIST_URL?.trim() || "",
  getReady: () => process.env.GET_READY_CHECKLIST_URL?.trim() || "",
  starter: () => process.env.STARTER_CHECKLIST_URL?.trim() || "",
  demo: () => process.env.DEMO_VIDEO_URL?.trim() || "",
};
export const demoVideoUrl = env.demo;

/** Links hidden when their env var is empty (playbook, checklists). */
export function nextLinks(segment: Segment): NextLink[] {
  const out: NextLink[] = [];
  const add = (key: string, label: string, href: string, primary = true) => href && out.push({ key, label, href, primary });

  switch (segment) {
    case "ready":
      // equal visual weight: both primary
      add("free_draft", nextSteps.freeDraft, env.draft());
      add("book", nextSteps.book, env.booking());
      break;
    case "almost":
      add("playbook", nextSteps.playbook, env.playbook());
      add("get_ready_checklist", nextSteps.getReadyChecklist, env.getReady(), false);
      break;
    default:
      add("playbook", nextSteps.playbook, env.playbook());
      add("starter_checklist", nextSteps.starterChecklist, env.starter(), false);
  }
  return out;
}
