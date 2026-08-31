/**
 * Shared constants for THE FEELING.
 *
 * 9:16, 720x1280, 30fps, 12.0s, silent. Seconds are the source of truth: the
 * cuts sit on a steady beat grid and every text cue is written as the second
 * it lands on the master timeline, then converted here.
 */

export const FPS = 30;
export const WIDTH = 720;
export const HEIGHT = 1280;

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);

/** A duration in seconds, left fractional so short staggers don't pile up. */
export const dur = (s: number) => s * FPS;

export const DURATION = sec(12); // 360

// Palette. Muted and low contrast throughout; nothing here is saturated.
export const WALL_LIGHT = "#DDEAE3";
export const WALL_DEEP = "#D4DFD9";
export const WALL_EDGE = "#B3B8B4";
export const RIBBON = "#09763F";
export const BADGE = "#0A6B3D";
export const INK = "#2B302D";
export const CUP = "#F6F6F6";
export const NAVY = "#25324A";

/**
 * Four type roles. The light lines and the punch words are never the same
 * family weight: light geometric sans against a heavy sans or a bold italic
 * serif, with the punch roughly twice the size.
 */
export const SANS = "Poppins";
export const SERIF = "Playfair Display";
export const SCRIPT = "Caveat";

/** The eight shots, as boundaries on the master timeline. */
export const SHOTS = [
  { id: "Cafe-1-Hero", name: "1 - Hero cup", from: 0, to: 2.1 },
  { id: "Cafe-2-Trio", name: "2 - More than coffee", from: 2.1, to: 3.35 },
  { id: "Cafe-3-Store", name: "3 - Experience", from: 3.35, to: 5.7 },
  { id: "Cafe-4-Transit", name: "4 - Morning routines", from: 5.7, to: 6.6 },
  { id: "Cafe-5-Interior", name: "5 - Cozy cafes", from: 6.6, to: 7.9 },
  { id: "Cafe-6-Table", name: "6 - Work sessions", from: 7.9, to: 8.95 },
  { id: "Cafe-7-Return", name: "7 - It wasn't about coffee", from: 8.95, to: 9.95 },
  { id: "Cafe-8-Close", name: "8 - The feeling", from: 9.95, to: 12 },
] as const;

/** Length of a shot in frames, derived from its boundaries. */
export const shotFrames = (from: number, to: number) => sec(to) - sec(from);

/**
 * Turns a master-timeline second into a frame local to a shot.
 * `const at = cueIn(9.95)` then `at(11.05)` is "1.1s into this shot".
 */
export const cueIn = (shotFrom: number) => (absolute: number) =>
  sec(absolute) - sec(shotFrom);

/**
 * The card geometry every middle shot shares. 66% of frame height at 3:4, sat
 * slightly below centre - shots 3 to 6 all land on exactly this rectangle, so
 * a swap never moves the frame the viewer is reading.
 */
export const CARD_H = Math.round(HEIGHT * 0.66);
export const CARD_W = Math.round(CARD_H * 0.75);
export const CARD_X = Math.round((WIDTH - CARD_W) / 2);
export const CARD_Y = Math.round(HEIGHT * 0.545 - CARD_H / 2);

/** Contact shadows: soft edged, low opacity, offset down and right. */
export const CONTACT = "drop-shadow(9px 14px 20px rgba(64,78,70,0.22))";
export const CONTACT_SOFT = "drop-shadow(6px 9px 14px rgba(64,78,70,0.16))";
