import React from "react";
import { drift, exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import type { TreatmentBase } from "./common";

/**
 * ROTATED
 *
 * The phrase sits a few degrees off square. The drift is folded into the angle
 * so it keeps rocking very slightly rather than locking to its final tilt.
 */
export const Rotated: React.FC<
  TreatmentBase & { lines: Part[][]; angle: number; gap?: number; indents?: number[] }
> = ({ p, slot, lines, angle, gap = 0, indents = [], lift, seed = 0 }) => {
  const clock = usePhrase(p);
  if (!clock.visible) return null;
  const d = drift(clock.frame, seed);

  return (
    <Positioned
      slot={{ ...slot, rotate: angle + d.rot * 1.6 }}
      style={exitStyle(clock.exit, 26, -14)}
    >
      {lines.map((line, i) => (
        <Run
          key={i}
          parts={line}
          clock={clock}
          entrance={p.entrance}
          baseDelay={i * 0.1}
          lift={lift}
          seed={seed + i}
          style={{ marginLeft: indents[i] ?? 0, marginTop: i === 0 ? 0 : gap }}
        />
      ))}
    </Positioned>
  );
};
