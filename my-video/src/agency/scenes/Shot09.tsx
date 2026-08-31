import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { blurStyle, drift, OUT, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { dur, GREY, LIGHT_GREY } from "../lib/tokens";
import { Laptop, Stylus } from "../props/Desk";
import { PhotoPlaceholder } from "../props/Placeholder";

/**
 * SHOT 9 - 2.0s. "Without those / Answers"
 *
 * The philosopher rushes in from the lower left under extreme motion blur,
 * decelerates and resolves sharp at the laptop, stylus at his lips, while a
 * soft light arc sweeps across the backdrop behind him.
 *
 * The marble statue needs a render, so it is a labelled placeholder at the
 * size and position the real one will occupy. The laptop and stylus around it
 * are built.
 */
export const Shot09: React.FC = () => {
  const clock = useShot(8);
  if (!clock.visible) return null;

  const w = whipIn(clock.local, 0, 0.58, { dx: -620, dy: 460, rot: -10, blur: 62 });
  const d = drift(clock.frame, 9.2, 0.6);
  const arc = interpolate(clock.local, [dur(0.1), dur(1.3)], [-560, 900], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  return (
    <AbsoluteFill>
      {/* The light arc sweeping the backdrop behind him. */}
      <div
        style={{
          position: "absolute",
          left: arc,
          top: 700,
          width: 520,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 72%)",
          filter: "blur(26px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 66,
          top: 918,
          opacity: w.opacity,
          transform: `translate(${w.x + d.x}px, ${w.y + d.y}px) rotate(${w.rot + d.rot * 0.4}deg)`,
          ...blurStyle(w.blur),
        }}
      >
        <PhotoPlaceholder
          name="marble bust-and-torso philosopher, seated, draped robes"
          width={452}
          height={624}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 386,
          top: 1362,
          opacity: w.opacity,
          transform: `translate(${w.x * 0.82}px, ${w.y * 0.82}px)`,
          ...blurStyle(w.blur * 0.8),
        }}
      >
        <Laptop size={432} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 404,
          top: 1052,
          opacity: w.opacity,
          transform: `translate(${w.x * 0.9}px, ${w.y * 0.9}px) rotate(-52deg)`,
          ...blurStyle(w.blur * 0.9),
        }}
      >
        <Stylus length={214} />
      </div>

      <SnapLine
        local={clock.local}
        at={0.34}
        text="Without those"
        size={54}
        weight={500}
        colour={LIGHT_GREY}
        place={{ right: 84, top: 540, align: "right" }}
      />
      <SnapLine
        local={clock.local}
        at={0.54}
        text="Answers"
        size={192}
        weight={900}
        colour={GREY}
        place={{ right: 74, top: 596, align: "right" }}
        tracking={-0.045}
        origin="right center"
      />
    </AbsoluteFill>
  );
};
