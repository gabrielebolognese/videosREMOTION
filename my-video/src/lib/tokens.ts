/**
 * Shared constants for the 100 DAYS reel.
 *
 * Seconds are the source of truth for this whole build. Anything that needs a
 * frame number derives it here with `sec()` rather than hardcoding an integer,
 * so a timestamp can never drift away from the timeline in the brief.
 */

export const FPS = 60;
export const WIDTH = 1440;
export const HEIGHT = 2560;
export const DURATION = 1271;

export const SRC = "0829.mp4";

/** A timeline second, rounded to the frame it lands on. */
export const sec = (s: number) => Math.round(s * FPS);

/**
 * A duration in seconds expressed in frames, deliberately left fractional:
 * 0.12s is 7.2 frames, not 7, and rounding it would push every reveal a frame
 * early over the course of the reel.
 */
export const dur = (s: number) => s * FPS;

// Two tones and one accent.
export const INK = "#111111"; // text and spikes on light
export const PAPER = "#F7F7F7"; // light backdrop
export const VOID = "#060706"; // dark backdrop
export const SNOW = "#FFFFFF"; // text on dark
export const GHOST = "#B8B8B8"; // every word enters here
export const RED = "#DF0001"; // numerals only, nothing else

export const SANS = "Inter Tight";
export const SERIF = "Playfair Display";

/** Tracking. Hero words and the caption band opt out of the -0.02em default. */
export const TRACK_DEFAULT = -0.02;
export const TRACK_BAND = 0.02;
export const TRACK_HERO = 0.08;

export const LINE_HEIGHT = 1.05;

/** The caption band treatment, shared verbatim by every hero element. */
export const OUTLINE = "#0A0A0A";
export const OUTLINE_WIDTH = 1;
export const SHADOW = "drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.55))";

/**
 * Safe area for content that settles. Bleeding decoration (the corner spikes)
 * and the off-frame start of an entering object are the stated exceptions.
 */
export const SAFE_TOP = 307;
export const SAFE_BOTTOM = 2099;

/**
 * The spring shared by both full-screen objects.
 *
 * The brief gives "damping 0.7 ... overshooting about 5%", which is a damping
 * RATIO - Remotion's spring takes the coefficient, and a coefficient of 0.7
 * against this mass and stiffness would overshoot by 88%, not 5%. Converting
 * with c = 2 * zeta * sqrt(k * m) puts the overshoot at 4.6%, which is the
 * stated behaviour.
 */
export const OBJECT_SPRING = {
  damping: 2 * 0.7 * Math.sqrt(120 * 0.6),
  mass: 0.6,
  stiffness: 120,
};
