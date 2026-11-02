"use client";

import { useEffect } from "react";
import { useSetReady } from "./SmoothScrollProvider";

/** Marks the page ready as soon as it mounts, so entrance animations start without a loader. */
export function ReadyOnMount() {
  const setReady = useSetReady();
  useEffect(() => setReady(true), [setReady]);
  return null;
}
