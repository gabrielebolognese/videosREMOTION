import { Easing } from "remotion";
import { FPS } from "./tokens";

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/**
 * The one entrance curve in the piece. The brief asks for ease-out settles
 * with *no overshoot*, so there is deliberately no elastic easing in here.
 */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** Slightly softer, for the heavy props that carry weight. */
export const SETTLE = Easing.bezier(0.22, 0.9, 0.24, 1);
/** Leaves: accelerates away. The 2.20s whip uses it. */
export const IN = Easing.bezier(0.55, 0, 1, 1);
/** Even acceleration, for sweeps and the slow drifts. */
export const GLIDE = Easing.bezier(0.4, 0, 0.6, 1);

/**
 * Residual life. A settled prop keeps breathing by a couple of pixels and a
 * fraction of a degree - driven by the absolute frame, so it never resets.
 */
export const drift = (frame: number, seed: number, amp = 1) => {
  const t = frame / FPS;
  return {
    x: Math.sin(t * 0.34 + seed * 1.7) * 3.2 * amp,
    y: Math.cos(t * 0.27 + seed * 2.3) * 4.4 * amp,
    rot: Math.sin(t * 0.21 + seed) * 0.7 * amp,
  };
};

/** Continuous rotation in degrees, from the absolute frame. */
export const spin = (frame: number, degPerSecond: number) =>
  (frame / FPS) * degPerSecond;
