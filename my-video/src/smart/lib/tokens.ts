/**
 * Shared constants for SMART MOVES - video nine.
 *
 * 9:16, 720x1280, 30fps, exactly 30.0s, silent. The brief is written in
 * seconds and every word cue is quoted as the second it lands on the master
 * timeline, so seconds stay the source of truth and frames are derived.
 */

export const FPS = 30;
export const WIDTH = 720;
export const HEIGHT = 1280;

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);

/** A duration in seconds, left fractional so short staggers don't pile up. */
export const dur = (s: number) => s * FPS;

export const DURATION = sec(30); // 900

// --- Palette, exactly as the brief names it. -----------------------------
export const PAPER = "#E8E8E8"; // world A seamless plane
export const GRAY = "#C3C3C3"; // the oversized curved band / ring / stem
export const BLACK = "#000000"; // world B void, and the type on world A
export const PURPLE = "#7100FB"; // shots 1 and 8
export const PURPLE_2 = "#9300F2"; // shot 9 only
export const RED = "#FF0D0D"; // every glowing keyword on black
export const NAVY = "#2E3192"; // "noise", shot 4 only
export const LAVENDER = "#A5A4C4"; // the S-curved band behind the clown
export const PIN = "#2FB733"; // the pushpin in shot 6

/** Construction furniture on world A: blueprint lines, crop marks, boxes. */
export const BLUEPRINT = "#CFCFCF";
export const WIRE = "#1A1A1A";

/** Geometric rounded sans, the whole type layer. */
export const SANS = "Poppins";

/**
 * World A is flat and shadowless, so every floating object gets exactly one
 * soft contact shadow underneath it and nothing else.
 */
export const CONTACT =
  "drop-shadow(0 26px 30px rgba(40,40,44,0.22)) drop-shadow(0 6px 10px rgba(40,40,44,0.14))";

/** Outer glow for a keyword on the black world. */
export const glow = (color: string, strength = 1) =>
  [
    `0 0 ${(10 * strength).toFixed(0)}px ${color}`,
    `0 0 ${(26 * strength).toFixed(0)}px ${color}`,
    `0 0 ${(58 * strength).toFixed(0)}px ${color}`,
  ].join(", ");

/** The ten shots, as boundaries on the master timeline. */
export const SHOTS = [
  { id: "Smart-01-Bulb", name: "1 - Got the bulb", from: 0, to: 3.4 },
  { id: "Smart-02-Crowd", name: "2 - But your growth", from: 3.4, to: 6.9 },
  { id: "Smart-03-Traffic", name: "3 - Because traffic", from: 6.9, to: 9.1 },
  { id: "Smart-04-Noise", name: "4 - Is just noise", from: 9.1, to: 11.7 },
  { id: "Smart-05-Dart", name: "5 - And strategy", from: 11.7, to: 15.7 },
  { id: "Smart-06-Note", name: "6 - Value", from: 15.7, to: 20.3 },
  { id: "Smart-07-Ring", name: "7 - Smart moves", from: 20.3, to: 24.0 },
  { id: "Smart-08-Keyboard", name: "8 - Working hard", from: 24.0, to: 25.6 },
  { id: "Smart-09-Smart", name: "9 - But not smart", from: 25.6, to: 27.9 },
  { id: "Smart-10-Cta", name: "10 - Hit the DM button", from: 27.9, to: 30.0 },
] as const;

/** Length of a shot in frames, derived from its boundaries. */
export const shotFrames = (from: number, to: number) => sec(to) - sec(from);

/**
 * Turns a master-timeline second into a frame local to a shot.
 * `const at = cueIn(11.7)` then `at(13.4)` is "1.7s into this shot".
 */
export const cueIn = (shotFrom: number) => (absolute: number) =>
  sec(absolute) - sec(shotFrom);
