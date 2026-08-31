import React from "react";
import { entranceAnim, exitStyle, partProgress, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import type { TreatmentBase } from "./common";

/**
 * MASK REVEAL
 *
 * A solid bar travels across the phrase and the words are left behind it. The
 * bar is the treatment - without it this would just read as a wipe-in, so it
 * is drawn as an actual object riding the leading edge of the mask.
 */
export const MaskReveal: React.FC<
  TreatmentBase & {
    lines: Part[][];
    width: number;
    /** Height of the travelling bar. */
    barHeight: number;
    barColour: string;
    dirSign?: number;
    gap?: number;
    indents?: number[];
  }
> = ({
  p,
  slot,
  lines,
  width,
  barHeight,
  barColour,
  dirSign = 1,
  gap = 0,
  indents = [],
  lift,
  seed = 0,
}) => {
  const clock = usePhrase(p, 0.12);
  if (!clock.visible) return null;

  const a = entranceAnim("maskWipe", partProgress(clock.local, 0, "maskWipe"));
  const edge = a.reveal * width;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, dirSign * 30, 0)}>
      {lines.map((line, i) => (
        <Run
          key={i}
          parts={line}
          clock={clock}
          entrance="maskWipe"
          dirSign={dirSign}
          lift={lift}
          seed={seed + i}
          style={{ marginLeft: indents[i] ?? 0, marginTop: i === 0 ? 0 : gap }}
        />
      ))}
      {a.reveal < 1 ? (
        <div
          style={{
            position: "absolute",
            top: -barHeight * 0.12,
            left: dirSign >= 0 ? edge : undefined,
            right: dirSign >= 0 ? undefined : edge,
            width: barHeight * 0.34,
            height: barHeight,
            background: barColour,
          }}
        />
      ) : null}
    </Positioned>
  );
};
