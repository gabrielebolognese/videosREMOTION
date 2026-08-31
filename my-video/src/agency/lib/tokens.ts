/**
 * Shared constants for the greyscale agency explainer.
 *
 * Seconds are the source of truth. Shot boundaries are derived from the shot
 * durations rather than written out as frame numbers, so a cut cannot drift
 * away from the running order.
 */

export const FPS = 60;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Per-shot durations in seconds, in order. They sum to exactly 33.5s. */
export const SHOT_SECONDS = [
  1.8, 2.2, 2.9, 1.1, 1.3, 1.5, 1.6, 7.4, 2.0, 2.2, 1.4, 4.3, 3.8,
] as const;

export const TOTAL_SECONDS = SHOT_SECONDS.reduce((a, b) => a + b, 0);

/** Cumulative start time of each shot, in seconds. */
export const SHOT_IN: number[] = SHOT_SECONDS.reduce<number[]>(
  (acc, d, i) => [...acc, i === 0 ? 0 : acc[i - 1] + SHOT_SECONDS[i - 1]],
  [],
);

export const sec = (s: number) => Math.round(s * FPS);
/** Fractional on purpose: a 0.18s snap is 10.8 frames, not 11. */
export const dur = (s: number) => s * FPS;

export const DURATION = sec(TOTAL_SECONDS); // 2010

/** Absolute frame a shot starts on (0-indexed shot number). */
export const shotIn = (n: number) => sec(SHOT_IN[n]);
/** Absolute frame a shot ends on. */
export const shotOut = (n: number) => sec(SHOT_IN[n] + SHOT_SECONDS[n]);

// --- Palette. Strictly greyscale until the final card. -------------------
export const BG_TOP = "#F9F8F3";
export const BG_MID = "#F1F0EE";
export const BG_LOW = "#EAE9E4";
export const VIGNETTE = "#B9B8B4";
export const GREY = "#6E6E6E"; // mid-grey type
export const PILL = "#2E2E2E"; // dark pill fills
export const BLACK = "#171717"; // black shapes and props
export const CARD = "#1B1B1B"; // final card ground
export const SPEC = "#FFFFFF"; // specular highlights
export const LIGHT_GREY = "#9C9B97"; // the one "light-grey" type line

export const SANS = "Poppins"; // geometric sans, the whole type layer
export const TECHNO = "Chakra Petch"; // squared-off, the wordmark only
