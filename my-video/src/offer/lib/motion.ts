import { Easing } from "remotion";
import { FPS } from "./tokens";

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Settles hard: most of the distance is covered in the first third. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** Leaves: accelerates away. Exits are always faster than entrances. */
export const IN = Easing.bezier(0.5, 0, 1, 1);
/** Lands past its mark and comes back. Used for the pops. */
export const OVERSHOOT = Easing.bezier(0.2, 1.5, 0.35, 1);
/** The whip itself: rips out of the frame, decelerates into the new one. */
export const WHIP = Easing.bezier(0.05, 0.85, 0.2, 1);

/** How long a word takes to resolve from blur to sharp. */
export const ENTER_FRAMES = 5;
/** Frames between two words of the same line. */
export const STAGGER = 3.2;
/** Length of every transition: 4 frames of smear. */
export const WHIP_FRAMES = 4;

/**
 * Residual life. Nothing in this piece comes to a complete stop before the
 * final frame: a settled cutout keeps breathing by a couple of pixels.
 */
export const drift = (frame: number, seed: number, amount = 1) => {
  const t = frame / FPS;
  return {
    x: Math.sin(t * 0.62 + seed * 1.7) * 3.4 * amount,
    y: Math.cos(t * 0.48 + seed * 2.3) * 4.2 * amount,
    rot: Math.sin(t * 0.41 + seed) * 0.8 * amount,
  };
};

/** Continuous rotation in degrees, from the local frame. */
export const spin = (frame: number, degPerSecond: number) =>
  (frame / FPS) * degPerSecond;
