import { Easing } from "remotion";

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Fast resolve, then dead still. Everything that enters uses this. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** The three-frame scale overshoot the brief puts on every word pop. */
export const OVERSHOOT = Easing.bezier(0.18, 1.62, 0.36, 1);

/** Springier still, for the app tiles landing on the ring. */
export const SPRING = Easing.bezier(0.16, 1.9, 0.4, 1);

/** Slow symmetric move, for camera pushes and the one speed ramp. */
export const GLIDE = Easing.bezier(0.4, 0, 0.6, 1);

/** The 4.5s pull back: leaves hard, arrives soft. */
export const RAMP = Easing.bezier(0.05, 0.86, 0.16, 1);
