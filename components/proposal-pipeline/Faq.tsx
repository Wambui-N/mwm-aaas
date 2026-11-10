"use client";

import { useState } from "react";

/**
 * Ruled FAQ rows. One answer is open at a time; the open row's marker is the only orange on the list (closed
 * rows use a quiet ink plus). Buttons with aria-expanded, answers stay in the page (hidden, not removed).
 */
export function Faq({ items }: { items: readonly (readonly string[])[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-6 max-w-[56rem] border-t border-ink/30">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className="border-b border-ink/30">
            <button
              type="button"
              id={`faq-q-${i}`}
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex min-h-[44px] w-full items-center justify-between gap-4 py-4 text-left font-bold"
            >
              <span>{q}</span>
              <span aria-hidden className={`shrink-0 ${isOpen ? "text-signal" : "text-ink/50"}`}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
              <p className="calm-body pb-4 pr-8 text-ink/85">{a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
