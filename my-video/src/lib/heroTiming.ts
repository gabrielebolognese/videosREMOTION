import { interpolate } from "remotion";
import { EASE_OUT } from "./Reveal";
import { dur, sec } from "./tokens";

/** Hero moment 1 punches in at 11.12 and lets go again at 12.07. */
export const HERO1_IN = sec(11.12);
export const HERO1_FADE = sec(11.97);
export const HERO1_OUT = sec(12.07);

/** Hero moment 2 punches in at 19.30 and never lets go. */
export const HERO2_IN = sec(19.3);

/**
 * True while either hero moment owns the frame. The caption band checks this
 * and refuses to draw: the band and a hero never run together.
 */
export const isHeroActive = (frame: number) =>
  (frame >= HERO1_IN && frame < HERO1_OUT) || frame >= HERO2_IN;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * The punch-in applied to the whole frame, footage included, about its centre.
 *
 * Hero 1 goes to 1.12 over 0.25s, holds, then comes back to 1.00 over 0.10s.
 * Hero 2 goes to 1.12 over 0.25s and stays there - the video ends punched in.
 */
export const heroFrameScale = (frame: number) => {
  if (frame >= HERO2_IN) {
    return interpolate(frame, [HERO2_IN, HERO2_IN + dur(0.25)], [1, 1.12], {
      ...CLAMP,
      easing: EASE_OUT,
    });
  }

  if (frame >= HERO1_IN && frame < HERO1_OUT) {
    if (frame < HERO1_FADE) {
      return interpolate(frame, [HERO1_IN, HERO1_IN + dur(0.25)], [1, 1.12], {
        ...CLAMP,
        easing: EASE_OUT,
      });
    }
    return interpolate(
      frame,
      [HERO1_FADE, HERO1_FADE + dur(0.1)],
      [1.12, 1],
      { ...CLAMP, easing: EASE_OUT },
    );
  }

  return 1;
};
