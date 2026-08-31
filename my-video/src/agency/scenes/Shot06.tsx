import React from "react";
import { AbsoluteFill } from "remotion";
import { blurStyle, drift, spin, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK, GREY } from "../lib/tokens";
import { CellRing } from "../props/CellRing";

/**
 * SHOT 6 - 1.5s. "Campaign / ideas"
 *
 * Hard cut. The cut-open looped letterform rotates slowly into place across
 * the lower right two thirds, coming into focus as it settles, with its soft
 * blurred twin sitting out on the left of frame.
 */
export const Shot06: React.FC = () => {
  const clock = useShot(5);
  if (!clock.visible) return null;

  const w = whipIn(clock.local, 0, 0.85, { rot: -34, blur: 30, scaleFrom: 1.16 });
  const d = drift(clock.frame, 6.3, 0.7);

  return (
    <AbsoluteFill>
      {/* The blurred shadow twin, out on the left. */}
      <div
        style={{
          position: "absolute",
          left: -170,
          top: 1088,
          opacity: 0.32 * w.opacity,
          transform: `rotate(${spin(clock.frame, 3) + w.rot}deg) scale(0.72)`,
          filter: "blur(17px)",
        }}
      >
        <CellRing size={700} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 322,
          top: 986,
          opacity: w.opacity,
          transform: `translate(${d.x}px, ${d.y}px) rotate(${spin(clock.frame, 4) + w.rot + d.rot}deg) scale(${w.scale})`,
          ...blurStyle(w.blur),
        }}
      >
        <CellRing size={716} />
      </div>

      <SnapLine
        local={clock.local}
        at={0.05}
        text="Campaign"
        size={134}
        weight={900}
        colour={BLACK}
        place={{ left: 0, top: 416, width: 1080, align: "center" }}
        tracking={-0.045}
      />
      <SnapLine
        local={clock.local}
        at={0.32}
        text="ideas"
        size={78}
        weight={500}
        colour={GREY}
        place={{ left: 0, top: 566, width: 1080, align: "center" }}
      />
    </AbsoluteFill>
  );
};
