import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { blurStyle, drift, OUT, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK, dur, GREY, SHOT_SECONDS } from "../lib/tokens";
import { Silhouette } from "../props/Silhouette";

/**
 * SHOT 3 - 2.9s. "Most / Marketing / Conversations / Begin here"
 *
 * The flat suited silhouette rises in from the left edge holding its sheet of
 * paper and then just breathes, while the frame parallaxes very slowly right
 * and the type stacks up beside it.
 */
export const Shot03: React.FC = () => {
  const clock = useShot(2);
  if (!clock.visible) return null;

  const w = whipIn(clock.local, 0, 0.72, { dy: 460, blur: 34 });
  const d = drift(clock.frame, 3.4, 0.7);
  const parallax = interpolate(clock.local, [0, dur(SHOT_SECONDS[2])], [0, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  return (
    <AbsoluteFill style={{ transform: `translateX(${parallax}px)` }}>
      <div
        style={{
          position: "absolute",
          left: 18,
          top: 918,
          opacity: w.opacity,
          transform: `translate(${d.x * 0.5}px, ${w.y + d.y}px) rotate(${d.rot * 0.4}deg)`,
          ...blurStyle(w.blur),
        }}
      >
        <Silhouette size={404} />
      </div>

      <SnapLine local={clock.local} at={0.3} text="Most" size={52} weight={500} colour={GREY} place={{ left: 452, top: 556 }} />
      <SnapLine
        local={clock.local}
        at={0.48}
        text="Marketing"
        size={98}
        weight={900}
        colour={GREY}
        place={{ left: 448, top: 606 }}
        tracking={-0.045}
      />
      <SnapLine
        local={clock.local}
        at={0.72}
        text="Conversations"
        size={62}
        weight={800}
        colour={BLACK}
        place={{ left: 450, top: 726 }}
        tracking={-0.035}
      />
      <SnapLine local={clock.local} at={0.96} text="Begin here" size={50} weight={500} colour={GREY} place={{ left: 452, top: 806 }} />
    </AbsoluteFill>
  );
};
