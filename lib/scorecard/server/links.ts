/** Next-step links per segment, shared by the results page and the results email. Server only (reads env). */
import { DEFAULT_BOOKING_URL, FIRST_DRAFT_PATH, SCORECARD_PATH } from "../config";
import { nextSteps } from "../copy";
import type { Stage } from "../questions";
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
  demo: () => process.env.DEMO_VIDEO_URL?.trim() || "",
};
export const demoVideoUrl = env.demo;

const PLAYBOOK_PATH = "/playbook";
const GET_READY_PATH = "/playbook/get-ready-checklist";
const STARTER_PATH = "/playbook/starter-checklist";
const playbookHref = (lowest?: Stage) => (lowest ? `${PLAYBOOK_PATH}?start=${lowest}` : PLAYBOOK_PATH);
export const bookingUrl = env.booking;

/**
 * The next step for each results page. The Playbook, and the checklists, live on this site; the Playbook opens on the
 * stage `lowest` (the visitor's lowest-scoring stage), so the first thing they read is the thing to fix first.
 */
export function nextLinks(segment: Segment, auditId: string, lowest?: Stage): NextLink[] {
  const out: NextLink[] = [];
  const add = (key: string, label: string, href: string, primary = true) => href && out.push({ key, label, href, primary });

  switch (segment) {
    case "ready":
      // equal visual weight: both primary
      add("free_draft", nextSteps.freeDraft, `${FIRST_DRAFT_PATH}?id=${auditId}`);
      add("book", nextSteps.book, env.booking());
      break;
    case "almost":
      add("playbook", nextSteps.playbook, playbookHref(lowest));
      add("get_ready_checklist", nextSteps.getReadyChecklist, GET_READY_PATH, false);
      break;
    default:
      add("playbook", nextSteps.playbook, playbookHref(lowest));
      add("starter_checklist", nextSteps.starterChecklist, STARTER_PATH, false);
  }
  return out;
}
