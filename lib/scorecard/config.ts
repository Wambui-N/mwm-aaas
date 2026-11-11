/**
 * Scorecard configuration. Safe to import from client and server code: only NEXT_PUBLIC_* values are read here.
 * Server-only values (database, Resend, booking link and so on) are read in lib/scorecard/server.
 */

/**
 * Launch flag. On by default: the nav and every "Find My Proposal Gaps" button go to /audit, the homepage [05]
 * section uses the scorecard copy, /assessment redirects (301) to /audit, and /audit is indexed and in the
 * sitemap. Set NEXT_PUBLIC_SCORECARD_LIVE=false (and redeploy) to switch everything back to the Automation Gap Audit.
 */
export const SCORECARD_LIVE = process.env.NEXT_PUBLIC_SCORECARD_LIVE !== "false";

/** Public URL of the Proposal Audit (the code, API routes and database keep the internal name "scorecard"). */
export const SCORECARD_PATH = "/audit";

/** Free first draft offer page (built separately). */
export const FREE_DRAFT_HREF = "/proposal-pipeline#free-draft";

export const FOUNDERS_FREEDOM_POST = "/blog/from-first-contact-to-signed-client-founders-freedom-africa";

/** Blended hourly rate used in the cost estimate (USD). Server code may override with the HOURLY_RATE env var. */
export const DEFAULT_HOURLY_RATE = 60;

/** Share of proposal hours the repeatable parts could give back. */
export const SAVED_SHARE = 0.4;

export const LOCAL_KEY = "mwm-scorecard";
