/**
 * The layout grid as the page background: 12 columns (4 on mobile) drawn as hairlines, with the
 * same container and gutters the sections use, so content snaps to the columns. Drawn in ink on paper. Absolutely
 * positioned inside its parent so it scrolls with the sheet that carries it.
 */
export function GridBackground({ tone = "ink", className = "" }: { tone?: "ink" | "sage"; className?: string }) {
  const line = tone === "ink" ? "border-ink/[0.08]" : "border-sage/[0.07]";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 z-0 px-4 md:px-8 ${className}`}>
      <div className="mx-auto grid h-full max-w-[81.25rem] grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`border-x ${line} ${i >= 4 ? "hidden md:block" : ""}`} />
        ))}
      </div>
    </div>
  );
}
