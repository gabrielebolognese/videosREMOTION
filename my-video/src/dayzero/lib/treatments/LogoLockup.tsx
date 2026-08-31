import React from "react";
import { interpolate } from "remotion";
import { OUT, drift, exitStyle, usePhrase } from "../motion";
import { ClaudeMark } from "../ClaudeMark";
import { Positioned, Run, type Part } from "../Text";
import { dur } from "../tokens";
import type { TreatmentBase } from "./common";

/**
 * LOGO LOCKUP
 *
 * The Claude mark set inline at cap height with the word, so the two read as
 * one object. The mark always arrives on a scale from 0.85 with a small
 * overshoot regardless of how the words enter, which is what makes all three
 * appearances feel like the same brand gesture.
 */
export const LogoLockup: React.FC<
  TreatmentBase & {
    markSize: number;
    parts: Part[];
    gap?: number;
    /** Seconds before the mark lands. */
    markDelay?: number;
    /** Anything else in the lockup: a rule, a second line. */
    children?: React.ReactNode;
    align?: "flex-start" | "center" | "flex-end";
  }
> = ({
  p,
  slot,
  markSize,
  parts,
  gap,
  markDelay = 0,
  children,
  align = "center",
  lift,
  seed = 0,
}) => {
  const clock = usePhrase(p, 0.13);
  if (!clock.visible) return null;

  const t = interpolate(clock.local, [dur(markDelay), dur(markDelay + 0.36)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  // 0.85 up to 1, overshooting a little on the way.
  const scale = 0.85 + 0.15 * t + 0.05 * Math.sin(Math.PI * Math.min(1, t * 1.2));
  const d = drift(clock.frame, seed);
  const settled = t >= 1 ? 1 : 0;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -22)}>
      <div style={{ display: "flex", alignItems: align, gap: gap ?? markSize * 0.3 }}>
        <div
          style={{
            opacity: t,
            transform: `translate(${d.x * settled}px, ${d.y * settled}px) scale(${scale}) rotate(${d.rot * settled}deg)`,
            filter: t < 1 ? `blur(${10 * (1 - t)}px)` : undefined,
            flexShrink: 0,
          }}
        >
          <ClaudeMark size={markSize} />
        </div>
        <Run
          parts={parts}
          clock={clock}
          entrance={p.entrance}
          baseDelay={markDelay + 0.08}
          dirSign={-1}
          lift={lift}
          seed={seed + 3}
        />
      </div>
      {children}
    </Positioned>
  );
};
