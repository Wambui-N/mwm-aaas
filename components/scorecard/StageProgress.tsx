import { STAGES, STAGE_NAMES, type Stage } from "@/lib/scorecard/questions";

/**
 * Progress for the 15 scored questions as five labelled stage segments (Find to Submit). The current stage is
 * ink and bold, finished stages are solid, later ones are quiet. `current` null = all five finished.
 */
export function StageProgress({ current, done }: { current: Stage | null; done: number }) {
  const idx = current ? STAGES.indexOf(current) : STAGES.length;
  return (
    <div role="progressbar" aria-label="Scorecard progress" aria-valuemin={0} aria-valuemax={15} aria-valuenow={done} aria-valuetext={`${done} of 15 questions answered`}>
      <div className="grid grid-cols-5 gap-1.5">
        {STAGES.map((s, i) => (
          <div key={s}>
            <div className="h-[3px] w-full bg-ink/[0.15]">
              <div className={`h-full bg-ink ${i <= idx ? "w-full" : "w-0"} transition-[width] duration-300`} style={i === idx && current ? { width: "50%" } : undefined} />
            </div>
            <p className={`gl-mono mt-2 ${s === current ? "font-bold text-ink" : i < idx ? "text-ink/70" : "text-ink/40"}`} aria-current={s === current ? "step" : undefined}>
              {STAGE_NAMES[s]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
