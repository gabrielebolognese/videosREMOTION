import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { drift, OUT } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK, dur, GREY } from "../lib/tokens";
import { Seesaw } from "../props/Seesaw";

/**
 * SHOT 12 - 4.3s. "Clarity / Turns marketing / Into leverage"
 *
 * The balance zooms up from a dot at frame centre to full size in half a
 * second with a white light wipe crossing diagonally - the second and last
 * transition in the piece that is not a hard cut. It then holds, the heavy
 * sphere on the high right end rocking almost imperceptibly.
 */
export const Shot12: React.FC = () => {
  const clock = useShot(11);
  if (!clock.visible) return null;

  const grow = interpolate(clock.local, [0, dur(0.5)], [0.02, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const d = drift(clock.frame, 14.5, 0.5);
  // The beam is tipped down to the left; the rock is tiny.
  const tilt = -11.5 + Math.sin(clock.frame / 46) * 0.5;

  const wipe = interpolate(clock.local, [dur(0.06), dur(0.72)], [-900, 1700], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const wipeFade = interpolate(clock.local, [dur(0.5), dur(0.78)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 1032,
          transform: `translate(${d.x}px, ${d.y}px) scale(${grow})`,
          transformOrigin: "50% 44%",
        }}
      >
        <Seesaw size={900} tilt={tilt} />
      </div>

      <SnapLine
        local={clock.local}
        at={0.55}
        text="Clarity"
        size={214}
        weight={900}
        colour={GREY}
        place={{ left: 0, top: 404, width: 1080, align: "center" }}
        tracking={-0.045}
      />
      <SnapLine
        local={clock.local}
        at={1.75}
        text="Turns marketing"
        size={62}
        weight={600}
        colour={BLACK}
        place={{ left: 0, top: 646, width: 1080, align: "center" }}
      />
      <SnapLine
        local={clock.local}
        at={2.95}
        text="Into leverage"
        size={124}
        weight={800}
        colour={BLACK}
        place={{ left: 0, top: 720, width: 1080, align: "center" }}
        tracking={-0.04}
      />

      {/* The diagonal light wipe riding the scale-up. */}
      {wipeFade > 0.01 ? (
        <div
          style={{
            position: "absolute",
            left: wipe,
            top: -400,
            width: 420,
            height: 2800,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 50%, rgba(255,255,255,0) 100%)",
            opacity: wipeFade,
            transform: "rotate(24deg)",
            filter: "blur(26px)",
            pointerEvents: "none",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
