/**
 * Shared CTA and routing configuration.
 * Primary CTA: Automation Readiness Scorecard (external).
 * Secondary CTA: Book a discovery call (Cal.com embed on homepage).
 */

export const scorecardUrl =
  process.env.NEXT_PUBLIC_SCORECARD_URL ?? "";

export const calBookingAnchor = "#book-call";

/** Full URL for booking (homepage + hash). Use for links from other pages. */
export const bookingUrl = "/#book-call";
