import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { HeroSatellite, HeroWord } from "../lib/Hero";
import { HERO1_FADE, HERO1_IN, HERO1_OUT } from "../lib/heroTiming";
import { dur, sec } from "../lib/tokens";

/**
 * Hero moment 1, 11.12 to 12.07, over the selfie shot.
 *
 * Two satellites and the big word, nothing else - there is no italic accent
 * line here, that belongs to hero moment 2 only. All three leave together on a
 * 0.10s fade while the frame punch-in unwinds underneath them.
 *
 * The punch-in itself lives on the composition root, because it has to take
 * the footage with it, not just this type.
 */
export const Hero1: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < HERO1_IN || frame >= HERO1_OUT) {
    return null;
  }

  const out =
    1 -
    interpolate(frame, [HERO1_FADE, HERO1_FADE + dur(0.1)], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill>
      <HeroWord text="100 DAYS" at={HERO1_IN} size={200} opacity={out} />
      <HeroSatellite
        text="A SERIES"
        at={sec(11.22)}
        x={300}
        y={1400}
        anchor="start"
        opacity={out}
      />
      <HeroSatellite
        text="OF CLAUDE"
        at={sec(11.42)}
        x={1140}
        y={1700}
        anchor="end"
        opacity={out}
      />
    </AbsoluteFill>
  );
};
