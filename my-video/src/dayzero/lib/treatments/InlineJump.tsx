import React from "react";
import { interpolate } from "remotion";
import { exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import { dur } from "../tokens";
import type { TreatmentBase } from "./common";

/**
 * INLINE JUMP
 *
 * One line, one word set several times larger than its neighbours and dropped
 * onto a shifted baseline. `stretch` lets that word keep growing while it
 * holds, for a word the voice draws out.
 */
export const InlineJump: React.FC<
  TreatmentBase & {
    parts: Part[];
    /** Index of the jumped word, and how much wider it grows while holding. */
    stretch?: { index: number; to: number };
  }
> = ({ p, slot, parts, stretch, lift, seed = 0 }) => {
  const clock = usePhrase(p);
  if (!clock.visible) return null;

  const grow =
    stretch === undefined
      ? 1
      : interpolate(clock.local, [dur(0.2), clock.end - clock.start], [1, stretch.to], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -22)}>
      <div style={{ display: "flex", alignItems: "baseline", whiteSpace: "pre" }}>
        {parts.map((part, i) => (
          <div
            key={i}
            style={
              stretch && stretch.index === i
                ? { transform: `scaleX(${grow})`, transformOrigin: "left center" }
                : undefined
            }
          >
            <Run
              parts={[part]}
              clock={clock}
              entrance={p.entrance}
              baseDelay={i * 0.1}
              lift={lift}
              seed={seed + i}
            />
          </div>
        ))}
      </div>
    </Positioned>
  );
};
