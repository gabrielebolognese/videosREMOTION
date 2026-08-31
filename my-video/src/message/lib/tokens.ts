/**
 * Shared constants for THE MESSAGE (video eight).
 *
 * 9:16, 720x1280, 30fps, 22.8s, silent. Seconds are the source of truth: every
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

export const DURATION = sec(22.8); // 684

// Palette. Nothing in the piece introduces a colour outside this list.
export const CREAM = "#FDF4E5";
export const BLUSH = "#FAD9D5";
export const CRIMSON = "#C8102E";
export const BURGUNDY = "#6E0F1E";
export const INK = "#111111";
export const NAVY = "#26334E";
export const AMBER = "#E08A2E";
export const LILAC = "#A96FD0";

/** The white scissor border every cut-out is trimmed with. */
export const PAPER_WHITE = "#FFFFFF";

/**
 * Two faces carry the whole piece. The base voice is a rounded geometric sans
 * set heavy and lowercase; the punch words swap to a display serif in italic,
 * which is the only thing in frame that leans.
 */
export const SANS = "Nunito";
export const DISPLAY = "Playfair Display";
/** Bold condensed caps, used only for the glitch beat and the wordmark. */
export const CONDENSED = "Oswald";

export const HEAVY = 900;
export const TRACK = "-0.035em";
export const LEADING = 0.94;

/**
 * The end card placeholder. The brief specifies a bracketed slot rather than a
 * real mark - swap this one string for the client wordmark when there is one.
 */
export const WORDMARK = "[BRAND WORDMARK]";

/** The eight shots, as boundaries on the master timeline. */
export const SHOTS = [
  { id: "M1-Nobody", name: "1 - Nobody's gonna tell you", from: 0, to: 2.6 },
  { id: "M2-Logo", name: "2 - Perfecting a logo", from: 2.6, to: 4.9 },
  { id: "M3-StandFor", name: "3 - What you stand for", from: 4.9, to: 8.5 },
  { id: "M4-Ignored", name: "4 - Gets ignored", from: 8.5, to: 12.2 },
  { id: "M5-Weapon", name: "5 - The weapon", from: 12.2, to: 15.9 },
  { id: "M6-NoMemory", name: "6 - No message, no memory", from: 15.9, to: 17.5 },
  { id: "M7-Pretty", name: "7 - Another pretty logo", from: 17.5, to: 19.7 },
  { id: "M8-Follow", name: "8 - End card", from: 19.7, to: 22.8 },
] as const;

/** Length of a shot in frames, derived from its boundaries. */
export const shotFrames = (from: number, to: number) => sec(to) - sec(from);

/**
 * Turns a master-timeline second into a frame local to a shot.
 * `const at = cueIn(8.5)` then `at(9.2)` is "0.7s into this shot".
 */
export const cueIn = (shotFrom: number) => (absolute: number) =>
  sec(absolute) - sec(shotFrom);

/**
 * Contact shadow under a cut-out. Deliberately soft and shallow - the brief
 * allows exactly one diffuse shadow on the background, so these only need to
 * lift the paper off the sheet by a millimetre.
 */
export const CONTACT = "drop-shadow(0 10px 14px rgba(46,30,26,0.20))";
export const CONTACT_DEEP =
  "drop-shadow(0 18px 22px rgba(46,30,26,0.26)) drop-shadow(0 3px 4px rgba(46,30,26,0.14))";
