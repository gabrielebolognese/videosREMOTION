/**
 * Shared constants for VISUAL VOCABULARY.
 *
 * 9:16, 720x1280, 30fps, 23.6s, silent. The piece is driven by text reveals
 * rather than cuts, so seconds are the source of truth and every word cue is
 * written as the second it lands on the master timeline.
 */

export const FPS = 30;
export const WIDTH = 720;
export const HEIGHT = 1280;

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);

/** A duration in seconds, left fractional so short staggers don't pile up. */
export const dur = (s: number) => s * FPS;

export const DURATION = sec(23.6); // 708

// Palette.
export const PAPER = "#FAFAFA";
export const PAPER_EDGE = "#DEDEDE";
export const CHARCOAL = "#313131";
export const GREY = "#8A8A8A";
export const BLUE = "#2092F5";
export const RED = "#E90000";
export const LIME = "#D5E72F";
export const PINK = "#F0B2AC";
export const PROP = "#3E3E3E";
export const GHOST = "#E8E8E8";

/**
 * Two families run the whole piece: a high contrast Didone-ish italic serif for
 * everything, and two contrast faces used only where the brief names them.
 */
export const SERIF = "Playfair Display";
export const MARKER = "Caveat";
export const GEO = "Poppins";
export const COND = "Oswald";

/** Letters are physical objects floating above the backdrop. */
export const LIFT =
  "0 12px 24px rgba(49,49,49,0.18), 0 3px 7px rgba(49,49,49,0.12)";

/** The eleven shots, as boundaries on the master timeline. */
export const SHOTS = [
  { id: "Vocab-01-Suppose", name: "1 - Let's suppose", from: 0, to: 1.7 },
  { id: "Vocab-02-Doctor", name: "2 - Doctor", from: 1.7, to: 2.9 },
  { id: "Vocab-03-Clinics", name: "3 - Clinics", from: 2.9, to: 4.2 },
  { id: "Vocab-04-Compare", name: "4 - The comparison", from: 4.2, to: 8.8 },
  { id: "Vocab-05-Instantly", name: "5 - Instantly", from: 8.8, to: 10.3 },
  { id: "Vocab-06-Spoken", name: "6 - Spoken", from: 10.3, to: 12.2 },
  { id: "Vocab-07-Brain", name: "7 - Brian", from: 12.2, to: 14.4 },
  { id: "Vocab-08-Vocabulary", name: "8 - Visual vocabulary", from: 14.4, to: 16.3 },
  { id: "Vocab-09-Brands", name: "9 - Brands", from: 16.3, to: 17.9 },
  { id: "Vocab-10-Expect", name: "10 - Expectations", from: 17.9, to: 20.8 },
  { id: "Vocab-11-Follow", name: "11 - End card", from: 20.8, to: 23.6 },
] as const;

/** Length of a shot in frames, derived from its boundaries. */
export const shotFrames = (from: number, to: number) => sec(to) - sec(from);

/**
 * Turns a master-timeline second into a frame local to a shot.
 * `const at = cueIn(12.2)` then `at(13.6)` is "1.4s into this shot".
 */
export const cueIn = (shotFrom: number) => (absolute: number) =>
  sec(absolute) - sec(shotFrom);

/** Soft blurred contact shadow, down and slightly right. */
export const CONTACT =
  "drop-shadow(10px 20px 26px rgba(66,70,74,0.30)) drop-shadow(2px 4px 9px rgba(66,70,74,0.18))";
