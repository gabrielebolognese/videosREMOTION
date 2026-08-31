import React from "react";
import { interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { EASE_OUT, revealState } from "./Reveal";
import { OutlinedText } from "./Type";
import {
  dur,
  GHOST,
  RED,
  SERIF,
  SNOW,
  TRACK_DEFAULT,
  TRACK_HERO,
} from "./tokens";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** How far the digit runs have resolved out of ghost grey. */
const numeralColour = (frame: number, at: number) =>
  interpolateColors(
    interpolate(frame - at, [0, dur(0.08)], [0, 1], CLAMP),
    [0, 1],
    [GHOST, RED],
  );

/**
 * The big word at the centre of a hero moment.
 *
 * It arrives already visible - 45% opacity, ghost grey, 1.10 scale - and
 * settles opaque at 1.00 over 0.40s ease-out, with the colour resolving on the
 * usual 0.08s. Scaled about the optical centre of the caps rather than the
 * baseline, so it grows out of itself instead of hanging off its own feet.
 */
export const HeroWord: React.FC<{
  text: string;
  at: number;
  size: number;
  opacity?: number;
}> = ({ text, at, size, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - at, [0, dur(0.4)], [0, 1], {
    ...CLAMP,
    easing: EASE_OUT,
  });
  const settled = interpolate(frame - at, [0, dur(0.08)], [0, 1], CLAMP);

  return (
    <OutlinedText
      text={text}
      x={720}
      y={1560}
      size={size}
      weight={900}
      tracking={TRACK_HERO}
      fill={interpolateColors(settled, [0, 1], [GHOST, SNOW])}
      numeralFill={numeralColour(frame, at)}
      opacity={(0.45 + 0.55 * p) * opacity}
      scale={1.1 - 0.1 * p}
      scaleOrigin={[720, 1560 - size * 0.35]}
    />
  );
};

/**
 * A hero satellite line. Uses the same word-entry gesture as the full-screen
 * scenes - fade, unblur, rise, resolve out of ghost grey - but as one unit,
 * because the timeline gives the whole line a single in time.
 */
export const HeroSatellite: React.FC<{
  text: string;
  at: number;
  x: number;
  y: number;
  anchor: "start" | "end";
  opacity?: number;
}> = ({ text, at, x, y, anchor, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const r = revealState(frame, at, SNOW);
  if (r.opacity <= 0 || opacity <= 0) {
    return null;
  }

  return (
    <OutlinedText
      text={text}
      x={x}
      y={y}
      size={34}
      weight={700}
      tracking={TRACK_DEFAULT}
      fill={r.fill}
      numeralFill={numeralColour(frame, at)}
      anchor={anchor}
      opacity={r.opacity * opacity}
      dy={r.dy}
      blur={r.blur}
    />
  );
};

/** The italic serif accent. Hero moment 2 only. */
export const HeroAccent: React.FC<{ text: string; at: number }> = ({
  text,
  at,
}) => {
  const frame = useCurrentFrame();
  const r = revealState(frame, at, SNOW);
  if (r.opacity <= 0) {
    return null;
  }

  return (
    <OutlinedText
      text={text}
      x={720}
      y={1830}
      size={46}
      weight={400}
      tracking={TRACK_DEFAULT}
      fill={r.fill}
      family={SERIF}
      italic
      anchor="middle"
      opacity={r.opacity}
      dy={r.dy}
      blur={r.blur}
    />
  );
};
