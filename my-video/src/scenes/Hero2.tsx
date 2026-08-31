import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { HeroAccent, HeroSatellite, HeroWord } from "../lib/Hero";
import { HERO2_IN } from "../lib/heroTiming";
import { sec } from "../lib/tokens";

/**
 * Hero moment 2, 19.30 to the end, over the high-angle wide.
 *
 * Four elements build in and then simply stay. Nothing fades out and the frame
 * never comes back down from 1.12 - the video ends on this.
 */
export const Hero2: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < HERO2_IN) {
    return null;
  }

  return (
    <AbsoluteFill>
      <HeroWord text="FOLLOW" at={HERO2_IN} size={260} />
      <HeroSatellite
        text="SO DROP A"
        at={sec(19.4)}
        x={300}
        y={1400}
        anchor="start"
      />
      <HeroSatellite
        text="DAY 0"
        at={sec(19.6)}
        x={1140}
        y={1700}
        anchor="end"
      />
      <HeroAccent text="see you tomorrow." at={sec(20.0)} />
    </AbsoluteFill>
  );
};
