import React from "react";
import { exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import type { TreatmentBase } from "./common";

/**
 * WORD LADDER
 *
 * Each step lands further right and further down than the last, so the phrase
 * reads as a descending staircase instead of a block of lines. Steps can be
 * whole words or fragments of one word.
 */
export const WordLadder: React.FC<
  TreatmentBase & {
    steps: { parts: Part[]; dx: number; dy: number; delay?: number }[];
    stepDelay?: number;
  }
> = ({ p, slot, steps, stepDelay = 0.12, lift, seed = 0 }) => {
  const clock = usePhrase(p);
  if (!clock.visible) return null;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, -34, 0)}>
      {steps.map((step, i) => (
        <Run
          key={i}
          parts={step.parts}
          clock={clock}
          entrance={p.entrance}
          baseDelay={step.delay ?? i * stepDelay}
          dirSign={-1}
          lift={lift}
          seed={seed + i * 1.3}
          style={{
            position: "absolute",
            left: step.dx,
            top: step.dy,
            whiteSpace: "pre",
          }}
        />
      ))}
    </Positioned>
  );
};
