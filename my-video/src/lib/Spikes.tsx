import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FPS, INK, RED, sec } from "./tokens";

/** The spikes exist only for the two full-screen scenes. */
export const FULLSCREEN_IN = sec(5.22); // 313
export const FULLSCREEN_FLIP = sec(6.95); // 417, dark to light
export const FULLSCREEN_OUT = sec(10.23); // 614

/**
 * The 4-point spike: a point on each axis with concave shoulders between, so a
 * heavy gaussian blur reads as a soft spike rather than a blob. The points
 * touch the viewBox edges exactly, so the shape renders at its stated size.
 */
const SPIKE =
  "M100 0 C108 62 138 92 200 100 C138 108 108 138 100 200 C92 138 62 108 0 100 C62 92 92 62 100 0 Z";

const Spike: React.FC<{
  size: number;
  left: number;
  top: number;
  angle: number;
  blur: number;
  colour: string;
}> = ({ size, left, top, angle, blur, colour }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    style={{
      position: "absolute",
      left,
      top,
      transform: `rotate(${angle}deg)`,
      filter: `blur(${blur}px)`,
    }}
  >
    <path d={SPIKE} fill={colour} />
  </svg>
);

/**
 * Two spikes bleeding off opposite corners.
 *
 * Their angle is a function of the ABSOLUTE composition frame, never a scene
 * local one. Shot 2 and shot 3 are separate scenes with a hard cut between
 * them at 6.95, and if the rotation were driven per scene it would visibly
 * snap back to zero on that cut. Driving it off `useCurrentFrame()` at the top
 * level of the composition - this layer is never nested in a Sequence - makes
 * the angle carry straight through.
 */
export const Spikes: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < FULLSCREEN_IN || frame >= FULLSCREEN_OUT) {
    return null;
  }

  const seconds = frame / FPS;
  const light = frame >= FULLSCREEN_FLIP;
  const colour = light ? INK : RED;
  // The light scene runs the same shapes about 25% softer.
  const softness = light ? 0.75 : 1;

  return (
    <AbsoluteFill>
      <Spike
        size={500}
        left={-110}
        top={-60}
        angle={seconds * 8}
        blur={45 * softness}
        colour={colour}
      />
      <Spike
        size={700}
        left={850}
        top={2080}
        angle={seconds * -6}
        blur={64 * softness}
        colour={colour}
      />
    </AbsoluteFill>
  );
};

/**
 * The two full-screen backdrops. Kept as their own layer beneath the spikes so
 * the spikes can sit on the background but behind the type, without either
 * scene owning a background that would break that order.
 */
export const Backdrops: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < FULLSCREEN_IN || frame >= FULLSCREEN_OUT) {
    return null;
  }

  if (frame < FULLSCREEN_FLIP) {
    // Dark scene: flat, no grid.
    return <AbsoluteFill style={{ backgroundColor: "#060706" }} />;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#F7F7F7" }}>
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${INK} 3px, transparent 3px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </AbsoluteFill>
  );
};
