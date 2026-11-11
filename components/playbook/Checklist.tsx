"use client";

import { useEffect, useState } from "react";

/**
 * A checklist you can tick. Progress is remembered on this device only (localStorage), and the list works exactly the
 * same, just without memory, if storage is blocked. Prints cleanly: the ticked state shows as a filled box.
 */
export function Checklist({ id, groups }: { id: string; groups: readonly { title: string; items: readonly { key: string; label: React.ReactNode }[] }[] }) {
  const storeKey = `mwm-checklist-${id}`;
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* private mode or blocked storage: the list still works */
    }
  }, [storeKey]);

  const toggle = (key: string) =>
    setDone((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(storeKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const count = groups.reduce((n, g) => n + g.items.filter((i) => done[i.key]).length, 0);

  return (
    <div>
      <p className="gl-mono mt-8 text-ink/60" aria-live="polite">
        {count} of {total} done
      </p>
      {groups.map((g) => (
        <section key={g.title} className="mt-8" aria-label={g.title}>
          {g.title && <h2 className="calm-h3">{g.title}</h2>}
          <ul className="mt-3 border-b border-ink/20">
            {g.items.map((item) => (
              <li key={item.key} className="border-t border-ink/20">
                <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-4">
                  <input type="checkbox" checked={!!done[item.key]} onChange={() => toggle(item.key)} className="mt-1 h-5 w-5 shrink-0 accent-[#141010]" />
                  <span className={`calm-body ${done[item.key] ? "text-ink/55 line-through" : ""}`}>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
