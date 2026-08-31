/**
 * Shared constants for GRIDS - the brand opener.
 *
 * 9:16, 720x1280, 24fps, 10.0s, silent. One unbroken take with zero cuts, so
 * every element reads the master frame directly and there is no per-shot
 * clock anywhere in the tree. The "shots" below are only timeline labels and
 * preview windows; nothing in the render branches on them.
 */

export const FPS = 24;
export const WIDTH = 720;
export const HEIGHT = 1280;

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);

/** A duration in seconds, left fractional so short staggers don't pile up. */
export const dur = (s: number) => s * FPS;

export const DURATION = sec(10); // 240

// Palette, straight from the brief.
export const PAPER = "#E6E3DE";
export const GRID_LINE = "#CFCBC4";
export const RED = "#D0281F";
export const RED_DEEP = "#A31D13";
export const INK = "#181818";
export const NAVY = "#343946";
export const WHITE = "#FFFFFF";

/** The four wave bands, back to front. Nearer layers catch more of the key. */
export const WAVE_REDS = ["#A31D13", "#B7241A", "#D0281F", "#E04A3C"] as const;

/** Traffic lights on the application window. */
export const DOT_RED = "#FF5F57";
export const DOT_AMBER = "#FEBC2E";
export const DOT_GREEN = "#28C840";

/**
 * Two faces carry the piece. Poppins is the geometric rounded sans of the
 * wordmark and the body lines; Archivo Black is the heavy grotesque that
 * "GRIDS" is set in, opened up with tracking to read wide.
 */
export const GEO = "Poppins";
export const GROTESQUE = "Archivo Black";

/** Broad soft key from the upper left: shadows fall down and to the right. */
export const CLAY =
  "drop-shadow(9px 16px 20px rgba(74,66,60,0.26)) drop-shadow(2px 4px 7px rgba(74,66,60,0.16))";

/** The lighter contact shadow used by the small props. */
export const CLAY_SOFT =
  "drop-shadow(6px 11px 15px rgba(74,66,60,0.22)) drop-shadow(1px 3px 5px rgba(74,66,60,0.14))";

/**
 * The six shots, as boundaries on the master timeline. They exist so the
 * Studio can scrub to a beat - the render itself is continuous.
 */
export const SHOTS = [
  { id: "Grids-1-Grid", name: "1 - Grid and waves", from: 0, to: 1.8 },
  { id: "Grids-2-Wordmark", name: "2 - design.", from: 1.8, to: 4.4 },
  { id: "Grids-3-Grids", name: "3 - GRIDS and window", from: 4.4, to: 6.6 },
  { id: "Grids-4-Whip", name: "4 - Whip reposition", from: 6.6, to: 7.9 },
  { id: "Grids-5-Furniture", name: "5 - Corner furniture", from: 7.9, to: 8.8 },
  { id: "Grids-6-Hold", name: "6 - Light sweep hold", from: 8.8, to: 10 },
] as const;

/** Length of a shot in frames, derived from its boundaries. */
export const shotFrames = (from: number, to: number) => sec(to) - sec(from);
