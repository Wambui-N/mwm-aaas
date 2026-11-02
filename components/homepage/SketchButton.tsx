import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { SketchBox } from "./draw/primitives";

type Props = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  variant?: "paper" | "marker" | "ink";
  seed?: number;
  /** extra width of the rough border viewBox; purely visual */
  w?: number;
  h?: number;
};

/** Button with a hand-drawn rough border. `marker` is filled orange (ink text). */
export function SketchButton({ children, variant = "paper", seed = 3, className = "", w = 300, h = 70, ...rest }: Props) {
  const v = variant === "marker" ? "sk-btn--marker" : variant === "ink" ? "sk-btn--ink" : "";
  return (
    <Link className={`sk-btn ${v} ${className}`} {...rest}>
      <SketchBox seed={seed} w={w} h={h} strokeWidth={3} stroke="var(--ink)" />
      <span className="relative">{children}</span>
    </Link>
  );
}
