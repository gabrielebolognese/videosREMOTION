import { Easing } from "remotion";
import { FPS } from "./tokens";

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Settles hard: most of the distance is covered in the first third. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** Leaves: accelerates away. */
export const IN = Easing.bezier(0.5, 0, 1, 1);
/** Lands just past its mark and comes back. Every word pop uses this. */
export const POP = Easing.bezier(0.22, 1.42, 0.36, 1);

/**
 * A word appears in one frame and is already at 105 percent - the brief asks
 * for a scale pop with no fade, so this is a step, not a ramp.
 */
export const SNAP_FRAMES = 1;
/** How long the 105 -> 100 settle takes. */
export const POP_FRAMES = 7;
/** Frames between two words of the same line, ~0.19s. */
export const STAGGER = 5.5;

/**
 * Residual life. Nothing here comes to a complete stop: a settled cut-out
 * keeps floating by a couple of pixels until the shot cuts. The camera is
 * locked off, so this drift is the only motion left once a shot has resolved.
 */
export const drift = (frame: number, seed: number, amount = 1) => {
  const t = frame / FPS;
  return {
    x: Math.sin(t * 0.54 + seed * 1.7) * 3.6 * amount,
    y: Math.cos(t * 0.41 + seed * 2.3) * 4.8 * amount,
    rot: Math.sin(t * 0.36 + seed) * 0.55 * amount,
  };
};
