import React from "react";
import { AbsoluteFill } from "remotion";
import { blurStyle, spin, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK } from "../lib/tokens";
import { PaymentCard } from "../props/PaymentCard";

/**
 * SHOT 4 - 1.1s. "Budget"
 *
 * Hard cut. Two blank cards tumble through opposite corners, one clipping the
 * top left upside down and well out of focus, one running across the bottom
 * left on a diagonal. The centre of frame is left empty for the word, which
 * snaps down onto it rather than up.
 */
export const Shot04: React.FC = () => {
  const clock = useShot(3);
  if (!clock.visible) return null;

  const a = whipIn(clock.local, 0, 0.6, { dx: -260, dy: -300, rot: 40, blur: 40 });
  const b = whipIn(clock.local, 0.04, 0.66, { dx: -320, dy: 380, rot: -46, blur: 40 });

  return (
    <AbsoluteFill>
      {/* Top-left, upside down, drifting out of focus at the frame edge. */}
      <div
        style={{
          position: "absolute",
          left: -196,
          top: -128,
          opacity: a.opacity,
          transform: `translate(${a.x}px, ${a.y}px) rotate(${196 + a.rot + spin(clock.frame, 5)}deg)`,
          ...blurStyle(a.blur + 9),
        }}
      >
        <PaymentCard size={560} id="card-a" />
      </div>

      {/* Bottom-left running into the centre, near focus. */}
      <div
        style={{
          position: "absolute",
          left: -70,
          top: 1298,
          opacity: b.opacity,
          transform: `translate(${b.x}px, ${b.y}px) rotate(${-21 + b.rot + spin(clock.frame, -4)}deg)`,
          ...blurStyle(b.blur + 1.5),
        }}
      >
        <PaymentCard size={600} id="card-b" />
      </div>

      <SnapLine
        local={clock.local}
        at={0.06}
        text="Budget"
        size={206}
        weight={900}
        colour={BLACK}
        place={{ left: 0, top: 856, width: 1080, align: "center" }}
        from={1.28}
        tracking={-0.045}
      />
    </AbsoluteFill>
  );
};
