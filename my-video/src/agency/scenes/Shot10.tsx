import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { blurStyle, drift, OUT, spin, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK, dur, GREY } from "../lib/tokens";
import { AppTile } from "../props/AppTile";

/**
 * SHOT 10 - 2.2s. "Ads / Don't create / Growth"
 *
 * Hard cut. Two glossy black tiles carrying abstract marks - a plain loop and
 * a simple wedge, no readable names and no letterforms - tumble in and overlap
 * at the lower centre, catching a specular flick as they settle. A thin black
 * rule then draws itself left to right across "Growth".
 */
export const Shot10: React.FC = () => {
  const clock = useShot(9);
  if (!clock.visible) return null;

  const a = whipIn(clock.local, 0, 0.62, { dx: -420, dy: 380, rot: -70, blur: 44 });
  const b = whipIn(clock.local, 0.1, 0.62, { dx: 460, dy: 420, rot: 74, blur: 44 });
  const da = drift(clock.frame, 10.1, 0.8);
  const db = drift(clock.frame, 11.4, 0.8);

  // The strike line drawing across "Growth".
  const strike = interpolate(clock.local, [dur(0.78), dur(1.14)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  // A bright flick across the tiles as they land.
  const flick = interpolate(clock.local, [dur(0.5), dur(0.72), dur(0.94)], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 296,
          top: 1248,
          opacity: a.opacity,
          transform: `translate(${a.x + da.x}px, ${a.y + da.y}px) rotate(${-15 + a.rot + spin(clock.frame, 3)}deg)`,
          ...blurStyle(a.blur),
        }}
      >
        <AppTile size={268} kind="loop" id="s10a" />
      </div>

      <div
        style={{
          position: "absolute",
          left: 486,
          top: 1338,
          opacity: b.opacity,
          transform: `translate(${b.x + db.x}px, ${b.y + db.y}px) rotate(${13 + b.rot + spin(clock.frame, -3)}deg)`,
          ...blurStyle(b.blur),
        }}
      >
        <AppTile size={268} kind="wedge" id="s10b" />
      </div>

      {/* Specular flick across both tiles as they settle. */}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 1230,
          width: 620,
          height: 400,
          background: "linear-gradient(112deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 62%)",
          opacity: flick,
          filter: "blur(16px)",
          pointerEvents: "none",
        }}
      />

      <SnapLine
        local={clock.local}
        at={0.05}
        text="Ads"
        size={206}
        weight={900}
        colour={GREY}
        place={{ left: 0, top: 384, width: 1080, align: "center" }}
        tracking={-0.045}
      />
      <SnapLine
        local={clock.local}
        at={0.26}
        text="Don't create"
        size={60}
        weight={600}
        colour={BLACK}
        place={{ left: 0, top: 620, width: 1080, align: "center" }}
      />
      <SnapLine
        local={clock.local}
        at={0.46}
        text="Growth"
        size={206}
        weight={900}
        colour={GREY}
        place={{ left: 0, top: 692, width: 1080, align: "center" }}
        tracking={-0.045}
      />

      {strike > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 146,
            top: 800,
            width: 790 * strike,
            height: 7,
            background: BLACK,
            borderRadius: 4,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
