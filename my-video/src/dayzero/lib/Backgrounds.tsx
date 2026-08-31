import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { DARK, ENDCARD_IN, FLASH_IN, HOLE_IN, HOLE_OUT, LIGHT } from "./tokens";

/** 60px dot grid at 5%. Light states only. */
export const DotGrid: React.FC = () => (
  <AbsoluteFill
    style={{
      opacity: 0.05,
      backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${DARK} 2.5px, transparent 2.5px)`,
      backgroundSize: "60px 60px",
    }}
  />
);

/**
 * The graphic states, each arriving on a hard cut.
 *
 * 2.10-7.06 black, 7.06-7.30 the single white flash, 20.81-end the light end
 * card. Everywhere else this layer draws nothing and the footage shows.
 */
export const Backgrounds: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame >= HOLE_IN && frame < FLASH_IN) {
    return <AbsoluteFill style={{ backgroundColor: DARK }} />;
  }

  if (frame >= FLASH_IN && frame < HOLE_OUT) {
    return (
      <AbsoluteFill style={{ backgroundColor: LIGHT }}>
        <DotGrid />
      </AbsoluteFill>
    );
  }

  if (frame >= ENDCARD_IN) {
    return (
      <AbsoluteFill style={{ backgroundColor: LIGHT }}>
        <DotGrid />
      </AbsoluteFill>
    );
  }

  return null;
};


