import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { blurStyle, clearOut, drift, OUT, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { dur, GREY, SHOT_SECONDS } from "../lib/tokens";
import { Rocket } from "../props/Rocket";

/**
 * SHOT 1 - 1.8s. "We don't / start with / Ads"
 *
 * The rocket sweeps up from the bottom left, out of focus, and settles on a
 * diagonal across the lower two thirds pointing up-right while the camera
 * drifts in a few percent.
 *
 * The type is held a quarter second past the cut on purpose: shot 2 opens by
 * blurring this line away to an almost empty frame before the magnifying glass
 * arrives, so the words outlive their own prop.
 */
export const Shot01: React.FC = () => {
  const clock = useShot(0, 0.3);
  if (!clock.visible) return null;

  const propGone = clock.local >= dur(SHOT_SECONDS[0]);
  const w = whipIn(clock.local, 0, 0.9, { dx: -520, dy: 580, rot: -34, blur: 48 });
  const d = drift(clock.frame, 1.2);
  const push = interpolate(clock.local, [0, dur(SHOT_SECONDS[0])], [1, 1.035], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const out = clearOut(clock.local, SHOT_SECONDS[0], 0.2);

  return (
    <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "50% 46%" }}>
      {propGone ? null : (
        <div
          style={{
            position: "absolute",
            left: 300,
            top: 900,
            opacity: w.opacity,
            transform: `translate(${w.x + d.x}px, ${w.y + d.y}px) rotate(${38 + w.rot + d.rot}deg)`,
            transformOrigin: "50% 50%",
            ...blurStyle(w.blur),
          }}
        >
          <Rocket size={310} />
        </div>
      )}

      <div style={{ opacity: out.opacity, ...blurStyle(out.blur) }}>
        <SnapLine
          local={clock.local}
          at={0.06}
          text="We don't"
          size={58}
          weight={600}
          colour={GREY}
          place={{ left: 214, top: 452 }}
        />
        <SnapLine
          local={clock.local}
          at={0.22}
          text="start with"
          size={58}
          weight={600}
          colour={GREY}
          place={{ right: 208, top: 534, align: "right" }}
        />
        <SnapLine
          local={clock.local}
          at={0.4}
          text="Ads"
          size={264}
          weight={900}
          colour={GREY}
          place={{ left: 0, top: 596, width: 1080, align: "center" }}
          tracking={-0.045}
        />
      </div>
    </AbsoluteFill>
  );
};
