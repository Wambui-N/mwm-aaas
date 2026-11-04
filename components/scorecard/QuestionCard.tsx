"use client";

import { useState } from "react";
import { SketchSubmit } from "@/components/site/SketchButton";

/**
 * One question: a mono kicker, the question and its answer buttons. Fixed minimum height so the layout does not
 * jump between questions of different lengths.
 */
export function QuestionCard({
  kicker,
  question,
  options,
  selected,
  onPick,
}: {
  kicker: string;
  question: string;
  options: readonly { value: string; label: string }[];
  selected: string | undefined;
  onPick: (value: string) => void;
}) {
  return (
    <div className="calm-card min-h-[33rem] p-6 md:p-7">
      <p className="gl-mono text-ink/60">{kicker}</p>
      <h2 className="calm-h3 mt-3">{question}</h2>
      <div className="mt-6 flex flex-col gap-2.5" role="group" aria-label="Answers">
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={selected === o.value} onClick={() => onPick(o.value)} className="fm-option">
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** The last, optional, open-text question. */
export function TextQuestionCard({
  kicker,
  question,
  value,
  max,
  busy,
  onChange,
  onFinish,
}: {
  kicker: string;
  question: string;
  value: string;
  max: number;
  busy: boolean;
  onChange: (v: string) => void;
  onFinish: () => void;
}) {
  const [touched, setTouched] = useState(false);
  return (
    <div className="calm-card min-h-[33rem] p-6 md:p-7">
      <p className="gl-mono text-ink/60">{kicker}</p>
      <label htmlFor="sc-q6x" className="calm-h3 mt-3 block">
        {question}
      </label>
      <textarea
        id="sc-q6x"
        className="fm-control mt-6 min-h-[8rem]"
        maxLength={max}
        value={value}
        onChange={(e) => {
          setTouched(true);
          onChange(e.target.value);
        }}
        aria-describedby="sc-q6x-count"
      />
      <p id="sc-q6x-count" className="gl-mono mt-2 text-right text-ink/60">
        {value.length} / {max}
      </p>
      <div className="mt-5">
        <SketchSubmit type="button" variant="marker" seed={14} className="text-lg" disabled={busy} onClick={onFinish}>
          {busy ? "Working out your score…" : touched || value ? "See my results" : "Skip and see my results"}
        </SketchSubmit>
      </div>
    </div>
  );
}
