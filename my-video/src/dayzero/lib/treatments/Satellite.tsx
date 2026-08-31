import React from "react";
import { interpolate } from "remotion";
import { OUT, exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import { dur } from "../tokens";
import type { TreatmentBase } from "./common";

/**
 * SATELLITE
 *
 * A larger centre word with small lines pinned off it, joined by hairlines
 * that draw out to their labels. Reads as an annotation on the frame rather
 * than a caption over it.
 */
export const Satellite: React.FC<
  TreatmentBase & {
    centre: Part[];
    satellites: {
      parts: Part[];
      dx: number;
      dy: number;
      delay?: number;
      /** Hairline from the centre word out to this label. */
      leader?: { x1: number; y1: number; x2: number; y2: number };
    }[];
    leaderColour?: string;
  }
> = ({ p, slot, centre, satellites, leaderColour, lift, seed = 0 }) => {
  const clock = usePhrase(p, 0.12);
  if (!clock.visible) return null;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -20)}>
      <Run parts={centre} clock={clock} entrance={p.entrance} lift={lift} seed={seed} />

      {satellites.map((s, i) => {
        const delay = s.delay ?? 0.14 + i * 0.1;
        const grow = interpolate(
          clock.local,
          [dur(delay), dur(delay + 0.2)],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: OUT },
        );

        return (
          <React.Fragment key={i}>
            {s.leader && leaderColour ? (
              <svg
                style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}
                width={1}
                height={1}
              >
                <line
                  x1={s.leader.x1}
                  y1={s.leader.y1}
                  x2={s.leader.x1 + (s.leader.x2 - s.leader.x1) * grow}
                  y2={s.leader.y1 + (s.leader.y2 - s.leader.y1) * grow}
                  stroke={leaderColour}
                  strokeWidth={2}
                  opacity={0.75}
                />
              </svg>
            ) : null}
            <Run
              parts={s.parts}
              clock={clock}
              entrance={p.entrance}
              baseDelay={delay}
              lift={lift}
              seed={seed + i * 2.1}
              style={{ position: "absolute", left: s.dx, top: s.dy, whiteSpace: "pre" }}
            />
          </React.Fragment>
        );
      })}
    </Positioned>
  );
};
