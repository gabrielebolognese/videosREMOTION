import React from "react";
import { exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import type { TreatmentBase } from "./common";

/**
 * STACKED CONTRAST
 *
 * Two or three lines with the weight and size split hard between them, and
 * deliberately uneven line lengths. The indents make the block ragged rather
 * than centred, which is the whole point of the treatment.
 */
export const StackedContrast: React.FC<
  TreatmentBase & {
    lines: Part[][];
    /** Per-line horizontal offset, px. Uneven on purpose. */
    indents?: number[];
    gap?: number;
    lineDelay?: number;
  }
> = ({ p, slot, lines, indents = [], gap = 0, lineDelay = 0.09, lift, seed = 0 }) => {
  const clock = usePhrase(p);
  if (!clock.visible) return null;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -30)}>
      {lines.map((line, i) => (
        <Run
          key={i}
          parts={line}
          clock={clock}
          entrance={p.entrance}
          baseDelay={i * lineDelay}
          lift={lift}
          seed={seed + i}
          style={{ marginLeft: indents[i] ?? 0, marginTop: i === 0 ? 0 : gap }}
        />
      ))}
    </Positioned>
  );
};
