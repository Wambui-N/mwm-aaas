/** Analytics events, sent through the site's existing GA4 gtag. A no-op if gtag is not on the page. */
export type ScorecardEvent =
  | "scorecard_view"
  | "scorecard_start"
  | "scorecard_lead_submitted"
  | "scorecard_question_answered"
  | "scorecard_completed"
  | "audit_result_viewed"
  | "results_cta_clicked"
  | "first_draft_requested";

export function track(event: ScorecardEvent, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  gtag?.("event", event, params ?? {});
}
