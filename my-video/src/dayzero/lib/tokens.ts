/**
 * Shared constants for the DAY ZERO reel.
 *
 * Seconds are the source of truth. Nothing in this piece writes a frame number
 * by hand; every time derives from `sec()` so a phrase can never drift away
 * from the voice it was measured against.
 */

export const FPS = 60;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 1271;

export const SRC = "raw.mp4";

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);

/**
 * A duration in seconds expressed in frames, left fractional on purpose:
 * 0.10s is 6 frames but a 0.06s stagger is 3.6, and rounding every stagger
 * would pile up into visible drift across a phrase.
 */
export const dur = (s: number) => s * FPS;

// The premium switch: two graphic states, one accent.
export const LIGHT = "#F7F7F7";
export const DARK = "#060706";
export const WHITE = "#FFFFFF";
export const RED = "#DF0001";

export const FONT = "Lexend";

/**
 * The full weight range is in play. Whispers and small labels at the bottom,
 * hero words at the top. No phrase is ever set at a single weight.
 */
export const W = {
  whisper: 100,
  light: 200,
  connective: 300,
  regular: 400,
  medium: 500,
  read: 600,
  stress: 700,
  heavy: 800,
  hero: 900,
} as const;

/**
 * A very slight dark lift, used only where type sits over warm footage and
 * legibility actually demands it. Never on the black or light states, which
 * carry their own contrast.
 */
export const LIFT = "0 2px 10px rgba(6,7,6,0.34), 0 0 44px rgba(6,7,6,0.26)";

/** The window where the source video is not rendered at all. */
export const HOLE_IN = sec(2.1); // 126
export const HOLE_OUT = sec(7.3); // 438

/** The single white flash inside the hole. Fourteen frames, never repeated. */
export const FLASH_IN = sec(7.06); // 424

/** The end card. Hard cut in, holds to the last frame. */
export const ENDCARD_IN = sec(20.81); // 1249

/** True on the two light states: the punchline flash and the end card. */
export const isLightState = (frame: number) =>
  (frame >= FLASH_IN && frame < HOLE_OUT) || frame >= ENDCARD_IN;

/** True inside the black full-screen scene, up to the flash. */
export const isBlackState = (frame: number) =>
  frame >= HOLE_IN && frame < FLASH_IN;
