/**
 * Shared constants for THE OFFER.
 *
 * 9:16, 720x1280, 30fps, 21.2s, silent. Seconds are the source of truth: every
 * cue in the scenes is written as the second it lands on the master timeline
 * and converted here, so a shot can be retimed without rewriting its text.
 */

export const FPS = 30;
export const WIDTH = 720;
export const HEIGHT = 1280;

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);

/** A duration in seconds, left fractional so short staggers don't pile up. */
export const dur = (s: number) => s * FPS;

export const DURATION = sec(21.2); // 636

// Palette. Nothing in the piece introduces a colour outside this list.
export const PAPER = "#F4F4F4";
export const EDGE = "#8F8F8F";
export const INK = "#0A0A0A";
export const BRICK = "#A2372F";
export const BLUE = "#4A4EDE";
export const ORANGE = "#E58147";
export const MONEY = "#A9AD8E";
export const COPPER = "#B07A4A";

/** Very heavy geometric sans, set tight. 900 everywhere unless noted. */
export const FONT = "Poppins";
export const HEAVY = 900;
export const TRACK = "-0.045em";
export const LEADING = 0.92;

/** The eight shots, as boundaries on the master timeline. */
export const SHOTS = [
  { id: "S1-Offer", name: "1 - The offer", from: 0, to: 3.4 },
  { id: "S2-Health", name: "2 - Your health", from: 3.4, to: 5.85 },
  { id: "S3-Watch", name: "3 - Forty years", from: 5.85, to: 8.6 },
  { id: "S4-People", name: "4 - Friends", from: 8.6, to: 11.15 },
  { id: "S5-Figure", name: "5 - The question", from: 11.15, to: 12.9 },
  { id: "S6-Money", name: "6 - Money is important", from: 12.9, to: 17.1 },
  { id: "S7-Loved", name: "7 - Loved ones", from: 17.1, to: 18.25 },
  { id: "S8-Peace", name: "8 - Peace", from: 18.25, to: 21.2 },
] as const;

/** Length of a shot in frames, derived from its boundaries. */
export const shotFrames = (from: number, to: number) => sec(to) - sec(from);

/**
 * Turns a master-timeline second into a frame local to a shot.
 * `const at = cueIn(12.9)` then `at(13.3)` is "0.4s into this shot".
 */
export const cueIn = (shotFrom: number) => (absolute: number) =>
  sec(absolute) - sec(shotFrom);

/** Contact shadow every cutout sits on. */
export const CONTACT = "drop-shadow(0 16px 20px rgba(24,24,24,0.30))";
export const CONTACT_DEEP =
  "drop-shadow(0 26px 34px rgba(20,20,20,0.38)) drop-shadow(0 4px 6px rgba(20,20,20,0.20))";
