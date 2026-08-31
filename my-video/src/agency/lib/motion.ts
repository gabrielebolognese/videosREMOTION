import type React from "react";
import { Easing, interpolate } from "remotion";
import { dur, FPS } from "./tokens";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Deceleration for anything settling into place. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** For things leaving. */
export const IN = Easing.bezier(0.55, 0, 1, 1);

export type Snap = { opacity: number; scale: number; blur: number };

/**
 * The one type entrance in this piece: a short scale-and-blur snap.
 *
 * Type never dissolves slowly here - it arrives, hard, in about a sixth of a
 * second. `from` above 1 gives the scale-down variant.
 */
export const snap = (
  local: number,
  atSeconds: number,
  { from = 0.82, length = 0.18, blur = 14 } = {},
): Snap => {
  const t = interpolate(local, [dur(atSeconds), dur(atSeconds + length)], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });
  return {
    opacity: interpolate(local, [dur(atSeconds), dur(atSeconds + length * 0.5)], [0, 1], CLAMP),
    scale: from + (1 - from) * t,
    blur: blur * (1 - Math.min(1, t * 1.6)),
  };
};

/** A fast fade-and-blur away. Used where a line has to clear the frame. */
export const clearOut = (local: number, atSeconds: number, length = 0.2) => {
  const t = interpolate(local, [dur(atSeconds), dur(atSeconds + length)], [0, 1], {
    ...CLAMP,
    easing: IN,
  });
  return { opacity: 1 - t, blur: 20 * t, scale: 1 + 0.06 * t };
};

/**
 * A prop whipping in: starts far off its mark and heavily blurred along the
 * direction of travel, decelerates hard and resolves sharp.
 */
export const whipIn = (
  local: number,
  atSeconds: number,
  length: number,
  { dx = 0, dy = 0, rot = 0, blur = 42, scaleFrom = 1 } = {},
) => {
  const t = interpolate(local, [dur(atSeconds), dur(atSeconds + length)], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });
  const inv = 1 - t;
  return {
    x: dx * inv,
    y: dy * inv,
    rot: rot * inv,
    scale: scaleFrom + (1 - scaleFrom) * t,
    blur: blur * inv * inv,
    opacity: interpolate(local, [dur(atSeconds), dur(atSeconds + length * 0.25)], [0, 1], CLAMP),
    t,
  };
};

/**
 * Residual life. Nothing that has settled is ever perfectly still - props keep
 * breathing by a couple of pixels and a fraction of a degree.
 */
export const drift = (frame: number, seed: number, amp = 1) => {
  const t = frame / FPS;
  return {
    x: Math.sin(t * 0.37 + seed * 1.7) * 4 * amp,
    y: Math.cos(t * 0.29 + seed * 2.3) * 5 * amp,
    rot: Math.sin(t * 0.23 + seed) * 0.8 * amp,
  };
};

/** Continuous rotation in degrees, from the absolute frame. */
export const spin = (frame: number, degPerSecond: number) => (frame / FPS) * degPerSecond;

export const blurStyle = (px: number): React.CSSProperties =>
  px > 0.06 ? { filter: `blur(${px}px)` } : {};
