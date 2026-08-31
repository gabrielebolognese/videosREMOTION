import React from "react";
import { interpolate } from "remotion";
import { OUT, drift, exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import { dur } from "../tokens";
import type { TreatmentBase } from "./common";

/**
 * ANNOTATED
 *
 * A hand-drawn ellipse is stroked around one word over about 0.35s.
 *
 * The draw is a function of the absolute frame like everything else, which is
 * what lets this one survive the footage cut at 10.23 that lands in the middle
 * of it - the ring keeps drawing straight through the cut instead of
 * restarting on the new shot.
 */
export const Annotated: React.FC<
  TreatmentBase & {
    parts: Part[];
    ring: { cx: number; cy: number; rx: number; ry: number; rotate: number };
    ringColour: string;
    /** Seconds after the phrase starts before the pen touches down. */
    ringDelay?: number;
    strokeWidth?: number;
  }
> = ({ p, slot, parts, ring, ringColour, ringDelay = 0.22, strokeWidth = 6, lift, seed = 0 }) => {
  const clock = usePhrase(p, 0.14);
  if (!clock.visible) return null;

  const draw = interpolate(
    clock.local,
    [dur(ringDelay), dur(ringDelay + 0.35)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: OUT },
  );
  const d = drift(clock.frame, seed);
  // Slightly more than the true circumference so the stroke overshoots and
  // closes past its own start, the way a drawn circle does.
  const len = Math.PI * (3 * (ring.rx + ring.ry) - Math.sqrt((3 * ring.rx + ring.ry) * (ring.rx + 3 * ring.ry))) * 1.06;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -24)}>
      <Run parts={parts} clock={clock} entrance={p.entrance} lift={lift} seed={seed} />
      {draw > 0 ? (
        <svg
          width={ring.cx * 2}
          height={ring.cy * 2}
          style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}
        >
          <ellipse
            cx={ring.cx}
            cy={ring.cy}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={ringColour}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={len}
            strokeDashoffset={len * (1 - draw)}
            transform={`rotate(${ring.rotate + d.rot} ${ring.cx} ${ring.cy})`}
          />
        </svg>
      ) : null}
    </Positioned>
  );
};
