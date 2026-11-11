"use client";

import { useEffect } from "react";
import { track } from "@/lib/scorecard/track";

/** Records which results page a visitor saw (ready, almost or playbook) and their score tier. Renders nothing. */
export function ResultTracker({ segment, tier }: { segment: string; tier: string }) {
  useEffect(() => {
    track("audit_result_viewed", { segment, tier });
  }, [segment, tier]);
  return null;
}
