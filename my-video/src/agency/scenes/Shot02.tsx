import React from "react";
import { AbsoluteFill } from "remotion";
import { blurStyle, drift, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK, GREY } from "../lib/tokens";
import { Magnifier } from "../props/Magnifier";

/**
 * SHOT 2 - 2.2s. "We / Start with / Clarity"
 *
 * Shot 1's line is still clearing over the first fifth of a second (it is held
 * open by Shot01 itself), leaving an almost empty frame for a beat before the
 * magnifying glass swings up from the lower right. Its lens genuinely
 * magnifies the construction grid behind it.
 */
export const Shot02: React.FC = () => {
  const clock = useShot(1);
  if (!clock.visible) return null;

  const w = whipIn(clock.local, 0.45, 0.8, { dx: 620, dy: 700, rot: 34, blur: 46 });
  const d = drift(clock.frame, 2.6);
  const angle = -13 + w.rot + d.rot;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 470,
          top: 616,
          opacity: w.opacity,
          transform: `translate(${w.x + d.x}px, ${w.y + d.y}px) rotate(${angle}deg)`,
          transformOrigin: "48% 34%",
          ...blurStyle(w.blur),
        }}
      >
        <Magnifier size={620} counterRotate={angle} />
      </div>

      <SnapLine
        local={clock.local}
        at={0.95}
        text="We"
        size={50}
        weight={500}
        colour={GREY}
        place={{ left: 124, top: 512 }}
      />
      <SnapLine
        local={clock.local}
        at={1.14}
        text="Start with"
        size={94}
        weight={700}
        colour={BLACK}
        place={{ left: 122, top: 566 }}
      />
      <SnapLine
        local={clock.local}
        at={1.38}
        text="Clarity"
        size={228}
        weight={900}
        colour={GREY}
        place={{ left: 116, top: 672 }}
        tracking={-0.045}
      />
    </AbsoluteFill>
  );
};
