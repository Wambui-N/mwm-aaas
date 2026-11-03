import Link from "next/link";

export type FilterItem = { label: string; href: string; active: boolean };

/**
 * A row of mono, uppercase, hairline filter links (ALL / CASE STUDIES / tags). The active one is solid ink.
 * These are plain links to query-string URLs, so they work without JavaScript and stay crawlable.
 */
export function MonoFilterRow({ label, items, className = "" }: { label?: string; items: FilterItem[]; className?: string }) {
  return (
    <nav aria-label={label ?? "Filter"} className={className}>
      {label && <p className="gl-mono mb-3 text-ink/60">{label}</p>}
      <div className="fl-row">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="fl-chip" aria-current={item.active ? "true" : undefined}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
