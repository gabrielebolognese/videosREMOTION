import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { Entrance, Phrase } from "./script";
import { dur, FPS, sec } from "./tokens";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Settles: strong deceleration with room for a small overshoot. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** Leaves: accelerates away. Exits are always faster than entrances. */
export const IN = Easing.bezier(0.4, 0, 1, 1);

/** How long each entrance takes to resolve, in seconds. */
export const ENTER_SECONDS: Record<Entrance, number> = {
  stagger: 0.18,
  scaleIn: 0.34,
  maskWipe: 0.3,
  blurResolve: 0.16,
  slide: 0.26,
  letters: 0.16,
  scaleDown: 0.3,
};

/** Exits sit in the 0.10-0.20s band, always quicker than the way in. */
const EXIT_SECONDS = 0.14;

/**
 * Word stagger. Short words come faster, long words get a beat more, which
 * keeps a phrase reading at an even speed rather than an even rhythm.
 */
export const staggerFor = (word: string) =>
  Math.min(0.15, Math.max(0.06, 0.055 + word.length * 0.013));

export type Anim = {
  opacity: number;
  x: number;
  y: number;
  scale: number;
  blur: number;
  /** 0 = fully masked, 1 = fully revealed. */
  reveal: number;
};

const SETTLED: Anim = { opacity: 1, x: 0, y: 0, scale: 1, blur: 0, reveal: 1 };

/**
 * The seven entrances, as a single function of linear progress.
 *
 * Every one of them resolves an 8-14px blur in roughly 0.10s; what differs is
 * the direction the word arrives from, which is the part the eye actually
 * reads as a different entrance.
 */
export const entranceAnim = (
  kind: Entrance,
  p: number,
  dirSign = 1,
): Anim => {
  if (p >= 1) return SETTLED;
  const e = OUT(Math.max(0, p));
  // Blur always clears faster than the movement, so the word is legible while
  // it is still travelling.
  const blurP = interpolate(p, [0, 0.55], [0, 1], { ...CLAMP, easing: OUT });

  switch (kind) {
    case "stagger":
      return { opacity: e, x: 0, y: 30 * (1 - e), scale: 1, blur: 12 * (1 - blurP), reveal: 1 };
    case "scaleIn":
      // Settles from 0.86 with a small overshoot past 1.
      return {
        opacity: interpolate(p, [0, 0.35], [0, 1], CLAMP),
        x: 0,
        y: 0,
        scale: 0.86 + 0.14 * e + 0.035 * Math.sin(Math.PI * Math.min(1, p * 1.25)),
        blur: 10 * (1 - blurP),
        reveal: 1,
      };
    case "maskWipe":
      return { opacity: 1, x: 0, y: 0, scale: 1, blur: 0, reveal: e };
    case "blurResolve":
      return { opacity: interpolate(p, [0, 0.5], [0, 1], CLAMP), x: 0, y: 0, scale: 1.03 - 0.03 * e, blur: 14 * (1 - blurP), reveal: 1 };
    case "slide":
      return { opacity: interpolate(p, [0, 0.4], [0, 1], CLAMP), x: 170 * dirSign * (1 - e), y: 0, scale: 1, blur: 9 * (1 - blurP), reveal: 1 };
    case "letters":
      return { opacity: e, x: 0, y: 22 * (1 - e), scale: 1, blur: 10 * (1 - blurP), reveal: 1 };
    case "scaleDown":
      // Arrives oversized and slams down onto its mark.
      return {
        opacity: interpolate(p, [0, 0.22], [0.15, 1], CLAMP),
        x: 0,
        y: 0,
        scale: 1 + 0.62 * (1 - e) - 0.028 * Math.sin(Math.PI * Math.min(1, p * 1.15)),
        blur: 14 * (1 - blurP),
        reveal: 1,
      };
  }
};

/** Progress of one part of a phrase, given its own delay in seconds. */
export const partProgress = (
  local: number,
  delaySeconds: number,
  kind: Entrance,
) => (local - dur(delaySeconds)) / dur(ENTER_SECONDS[kind]);

export type PhraseClock = {
  frame: number;
  /** Frames since the phrase started. */
  local: number;
  /** 0 while holding, ramps to 1 as it leaves. */
  exit: number;
  visible: boolean;
  start: number;
  end: number;
};

/**
 * The clock every treatment runs on.
 *
 * Reads the absolute composition frame - no treatment is ever nested in a
 * Sequence - so a phrase that spans a footage cut simply does not notice it.
 */
export const usePhrase = (p: Phrase, exitSeconds = EXIT_SECONDS): PhraseClock => {
  const frame = useCurrentFrame();
  const start = sec(p.from);
  const end = sec(p.to);
  const exit = interpolate(frame, [end, end + dur(exitSeconds)], [0, 1], {
    ...CLAMP,
    easing: IN,
  });
  return {
    frame,
    local: frame - start,
    exit,
    visible: frame >= start && frame < end + dur(exitSeconds),
    start,
    end,
  };
};

/**
 * The residual life of anything that has settled. Nothing in this piece ever
 * comes to a complete stop; a settled word keeps breathing by a couple of
 * pixels and a fraction of a degree.
 */
export const drift = (frame: number, seed: number) => {
  const t = frame / FPS;
  return {
    x: Math.sin(t * 0.41 + seed * 1.7) * 3.2,
    y: Math.cos(t * 0.33 + seed * 2.3) * 3.6,
    rot: Math.sin(t * 0.29 + seed) * 0.7,
  };
};

/** Continuous rotation for objects, in degrees, from the absolute frame. */
export const spin = (frame: number, degPerSecond: number) =>
  (frame / FPS) * degPerSecond;

/**
 * The shared way things leave: a short slide plus a fade, always quicker than
 * the way they came in.
 */
export const exitStyle = (exit: number, dx = 0, dy = -26): React.CSSProperties => ({
  opacity: 1 - exit,
  transform: `translate(${dx * exit}px, ${dy * exit}px)`,
});
