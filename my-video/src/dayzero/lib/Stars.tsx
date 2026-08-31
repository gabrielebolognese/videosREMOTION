import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { spin } from "./motion";
import { DARK, isBlackState, isLightState, RED } from "./tokens";

/**
 * Four-point star: a point on each axis with concave shoulders between, so a
 * heavy blur reads as a soft spike rather than a blob. The points touch the
 * viewBox edges exactly, so the shape renders at its stated size.
 */
const STAR =
  "M100 0 C107 60 140 93 200 100 C140 107 107 140 100 200 C93 140 60 107 0 100 C60 93 93 60 100 0 Z";

const Star: React.FC<{
  size: number;
  left: number;
  top: number;
  angle: number;
  blur: number;
  colour: string;
  opacity: number;
}> = ({ size, left, top, angle, blur, colour, opacity }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    style={{
      position: "absolute",
      left,
      top,
      opacity,
      transform: `rotate(${angle}deg)`,
      filter: `blur(${blur}px)`,
    }}
  >
    <path d={STAR} fill={colour} />
  </svg>
);

/**
 * The one layer that is in every single frame of the video.
 *
 * Both stars are driven by the ABSOLUTE composition frame, never a scene-local
 * one, and this layer is never nested in a Sequence. That is deliberate: the
 * piece cuts to a black field at 2.10, flashes white at 7.06 and cuts back to
 * footage at 7.30, and if the rotation restarted at any of those the video
 * would read as footage with a graphics hole punched in it rather than as one
 * continuous thing. The angle carries straight through every cut.
 *
 * Only the tint changes with the state underneath.
 */
export const Stars: React.FC = () => {
  const frame = useCurrentFrame();

  const black = isBlackState(frame);
  const light = isLightState(frame);

  const colour = black ? RED : DARK;
  const opacity = black ? 0.85 : light ? 0.13 : 0.32;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Star
        size={380}
        left={-92}
        top={-74}
        angle={spin(frame, 7)}
        blur={34}
        colour={colour}
        opacity={opacity}
      />
      <Star
        size={520}
        left={652}
        top={1544}
        angle={spin(frame, -5)}
        blur={46}
        colour={colour}
        opacity={opacity}
      />
    </AbsoluteFill>
  );
};
