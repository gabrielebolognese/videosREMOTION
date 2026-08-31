import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClaudeLockup } from "../lib/ClaudeMark";
import { OUT } from "../lib/motion";
import { DARK, dur, ENDCARD_IN, RED, W } from "../lib/tokens";

/**
 * THE END CARD - 20.81 to the last frame.
 *
 * No speech. A hard cut to the light state, the mark, and a red rule that
 * draws out beneath it. Nothing fades: it holds to frame 1271.
 */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < ENDCARD_IN) return null;

  const local = frame - ENDCARD_IN;
  const mark = interpolate(local, [0, dur(0.3)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const rule = interpolate(local, [dur(0.16), dur(0.44)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          opacity: mark,
          transform: `scale(${0.85 + 0.15 * mark + 0.05 * Math.sin(Math.PI * Math.min(1, mark * 1.2))})`,
          filter: mark < 1 ? `blur(${10 * (1 - mark)}px)` : undefined,
        }}
      >
        <ClaudeLockup word="claude" size={132} weight={W.read} colour={DARK} markScale={0.78} />
      </div>

      {/* The only red outside the three numerals. */}
      <div
        style={{
          marginTop: 64,
          width: 360 * rule,
          height: 16,
          background: RED,
        }}
      />
    </AbsoluteFill>
  );
};
