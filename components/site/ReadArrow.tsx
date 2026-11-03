/**
 * A hand-drawn arrow for card links. At rest it is a short, slightly wobbly arrow. Inside a `.pc` card, on hover
 * or keyboard focus, the shaft redraws itself, the head pops in and the arrow nudges right (CSS in site.css,
 * off under prefers-reduced-motion). Takes its colour from `currentColor`.
 */
export function ReadArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 40 16"
      className={`sk-arrow h-4 w-10 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path className="sk-arrow-shaft" pathLength={1} d="M2 9.2 C 9 6.4, 17 10.6, 30 8" />
      <path className="sk-arrow-head" d="M24.5 2.8 C 28.5 5.4, 31.5 6.8, 35 8.1 C 31.5 9.6, 28 11.6, 24.2 14.2" />
    </svg>
  );
}
