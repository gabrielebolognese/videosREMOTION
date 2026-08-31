import React from "react";
import { exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import type { TreatmentBase } from "./common";

/**
 * VERTICAL
 *
 * Set down one edge, one unit per line, tight. Used for the whisper in the
 * intro and for "series:" pinned down the hard right of the selfie shot.
 */
export const Vertical: React.FC<
  TreatmentBase & {
    /** One entry per stacked line. */
    units: Part[];
    lineGap?: number;
    /** A hairline running alongside the stack. */
    rule?: { height: number; offset: number; colour: string };
    unitDelay?: number;
  }
> = ({ p, slot, units, lineGap = 0, rule, unitDelay = 0.07, lift, seed = 0 }) => {
  const clock = usePhrase(p);
  if (!clock.visible) return null;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -18)}>
      {rule ? (
        <div
          style={{
            position: "absolute",
            left: rule.offset,
            top: 0,
            width: 2,
            height: rule.height * Math.min(1, Math.max(0, clock.local / 14)),
            background: rule.colour,
            opacity: 0.55,
          }}
        />
      ) : null}
      {units.map((unit, i) => (
        <Run
          key={i}
          parts={[unit]}
          clock={clock}
          entrance={p.entrance}
          baseDelay={i * unitDelay}
          lift={lift}
          seed={seed + i}
          style={{ marginTop: i === 0 ? 0 : lineGap, lineHeight: 0.92 }}
        />
      ))}
    </Positioned>
  );
};
