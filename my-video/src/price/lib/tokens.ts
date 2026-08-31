/**
 * Shared constants for PRICE FRAMING.
 *
 * 9:16, 720x1280, 60fps, 20.8s, silent. Eight hard cuts and no dissolves, so
 * the running order is the spine: shot boundaries are derived from the shot
 * durations below and never written out as frame numbers.
 *
 * Every cue in the scenes is written as the second it lands on the *master*
 * timeline, because that is how the brief specifies them. Scenes therefore
 * read the absolute composition frame rather than a per-shot clock - which is
 * also what keeps the backdrop rotation, the grid and the sparkle drift
 * continuous straight through a cut.
 */

export const FPS = 60;
export const WIDTH = 720;
export const HEIGHT = 1280;

/** Per-shot durations in seconds, in order. They sum to exactly 20.8s. */
export const SHOT_SECONDS = [2.4, 3.0, 4.4, 1.8, 3.7, 1.15, 2.45, 1.9] as const;

export const TOTAL_SECONDS = SHOT_SECONDS.reduce((a, b) => a + b, 0);

/** Cumulative start time of each shot, in seconds. */
export const SHOT_IN: number[] = SHOT_SECONDS.reduce<number[]>(
  (acc, _d, i) => [...acc, i === 0 ? 0 : acc[i - 1] + SHOT_SECONDS[i - 1]],
  [],
);

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);
/** Fractional on purpose: a 0.18s snap is 10.8 frames, not 11. */
export const dur = (s: number) => s * FPS;

export const DURATION = sec(TOTAL_SECONDS); // 1248

/** Absolute frame a shot starts on (0-indexed shot number). */
export const shotIn = (n: number) => sec(SHOT_IN[n]);
/** Absolute frame a shot ends on. */
export const shotOut = (n: number) => sec(SHOT_IN[n] + SHOT_SECONDS[n]);

/**
 * The brief positions everything as a percentage of the frame. These two turn
 * that straight into pixels so a scene never carries a bare number.
 */
export const fh = (percent: number) => (percent / 100) * HEIGHT;
export const fw = (percent: number) => (percent / 100) * WIDTH;

// --- Palette. Nothing outside this list appears in the piece. ------------
export const WHITE = "#FFFFFF";
export const EDGE_GREY = "#E9E9E9";
export const BLACK = "#000000";

export const LIME = "#7CFF5E";
export const LIME_HI = "#B8FC98";
export const LIME_LOW = "#3CC22B";

export const RED = "#F80012";
export const RED_DEEP = "#E80001";

export const BAND_BLUE = "#4272CF";
export const NOTE_INK = "#12151F";
export const NOTE_EDGE = "#C9CEDA";

export const CARD_TOP = "#EDE9FD";
export const CARD_BOT = "#E9EDFC";
export const BADGE = "#B58CD3";
export const BUTTON = "#141613";

/** The mid grey a caption word fades up in before it snaps to full contrast. */
export const PENDING_ON_WHITE = "#8C8C8C";
export const PENDING_ON_BLACK = "#787878";

/** Neo-grotesque for every caption and every piece of UI on the card. */
export const SANS = "Inter";
/** High-contrast Didone, for shot 4 and the wordmark only. */
export const DIDONE = "Playfair Display";
/** Tight tracking, on every caption. */
export const TRACK = "-0.025em";

/**
 * The eight shots. `from`/`to` are derived, not authored - they exist so the
 * Studio can scrub to a beat and so Root can register a preview per shot.
 */
export const SHOTS = SHOT_SECONDS.map((d, i) => ({
  id: [
    "Price-1-Vault",
    "Price-2-Notes",
    "Price-3-ADay",
    "Price-4-SameCost",
    "Price-5-Card",
    "Price-6-Logic",
    "Price-7-Phones",
    "Price-8-Wordmark",
  ][i],
  name: [
    "1 - Wallet vault",
    "2 - Banded notes",
    "3 - $1 a day",
    "4 - Same cost",
    "5 - Pricing card",
    "6 - Not accounting logic",
    "7 - Phone pinwheel",
    "8 - End card",
  ][i],
  from: SHOT_IN[i],
  to: SHOT_IN[i] + d,
}));

/** Length of a shot in frames, derived from its boundaries. */
export const shotFrames = (n: number) => shotOut(n) - shotIn(n);

/** Soft short contact shadow, key from top-front so it sits almost under. */
export const CONTACT =
  "drop-shadow(0 26px 30px rgba(96,102,110,0.26)) drop-shadow(0 6px 10px rgba(96,102,110,0.16))";
