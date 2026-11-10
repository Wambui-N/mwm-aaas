/** Next-step links per segment, shared by the results page and the results email. Server only (reads env). */
import { FREE_DRAFT_HREF, SCORECARD_PATH } from "../config";
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
  booking: () => process.env.BOOKING_URL?.trim() || "",
  draft: () => process.env.FREE_DRAFT_URL?.trim() || FREE_DRAFT_HREF,
  checklist: () => process.env.CHECKLIST_URL?.trim() || "",
  demo: () => process.env.DEMO_VIDEO_URL?.trim() || "",
  linkedin: () => process.env.LINKEDIN_URL?.trim() || "https://www.linkedin.com/in/wambui-ndungu-210409193/",
};
export const demoVideoUrl = env.demo;

/** Links hidden when their env var is empty (booking, checklist). */
export function nextLinks(segment: Segment): NextLink[] {
  const out: NextLink[] = [];
  const add = (l: NextLink | null) => l && out.push(l);
  const book = env.booking() ? { key: "book", label: nextSteps.book, href: env.booking() } : null;
  const draft = { key: "free_draft", label: nextSteps.freeDraft, href: env.draft() };

  switch (segment) {
    case "not_fit":
      add(env.checklist() ? { key: "checklist", label: nextSteps.checklist, href: env.checklist(), primary: true } : null);
      add({ key: "linkedin", label: nextSteps.linkedin, href: env.linkedin(), primary: !env.checklist() });
      break;
    case "machine":
      add(book ? { ...book, primary: true } : null);
      break;
    case "ideal":
      // equal visual weight: both primary
      add({ ...draft, primary: true });
      add(book ? { ...book, primary: true } : null);
      break;
    default:
      add({ ...draft, primary: true });
      add(book);
  }
  return out;
}
