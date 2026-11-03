import type { ReactNode } from "react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Underlined } from "@/components/site/Underlined";

/**
 * Top of an inner page: optional mono label, the page title (h1) with at most one orange marker
 * underline under `mark` (an exact word or phrase inside `title`), and an optional lede.
 * The title text is rendered exactly as given; `mark` only wraps part of it.
 */
export function PageHeader({
  label,
  title,
  mark,
  seed = 41,
  lede,
  className = "",
}: {
  label?: string;
  title: string;
  mark?: string;
  seed?: number;
  lede?: ReactNode;
  className?: string;
}) {
  const at = mark ? title.indexOf(mark) : -1;
  return (
    <header className={className}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h1 className="sk-title">
        {at >= 0 && mark ? (
          <>
            {title.slice(0, at)}
            <Underlined seed={seed}>{mark}</Underlined>
            {title.slice(at + mark.length)}
          </>
        ) : (
          title
        )}
      </h1>
      {lede && <p className="pg-lede mt-5">{lede}</p>}
    </header>
  );
}
