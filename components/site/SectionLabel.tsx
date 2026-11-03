import type { ReactNode } from "react";

/** The mono label above a heading, e.g. "[01] Sound familiar?". Geist Mono, uppercase, ink at 60%. */
export function SectionLabel({ children, className = "mb-5" }: { children: ReactNode; className?: string }) {
  return <p className={`gl-mono ${className} text-ink/60`}>{children}</p>;
}
