import React from "react";
import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { measureLine } from "./measure";
import { dur, GHOST, HEIGHT, SANS, TRACK_DEFAULT, WIDTH } from "./tokens";

const REVEAL_EASE = Easing.bezier(0.22, 1, 0.36, 1);
const EASE_IN = Easing.bezier(0.42, 0, 1, 1);
export const EASE_OUT = Easing.bezier(0, 0, 0.58, 1);

/** A word takes 0.12s to arrive and resolves out of ghost grey in 0.08s. */
export const REVEAL_FRAMES = dur(0.12);
const COLOUR_FRAMES = dur(0.08);
/** A line, or an object, takes 0.15s to leave. */
export const EXIT_FRAMES = dur(0.15);

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type RevealState = {
  opacity: number;
  dy: number;
  blur: number;
  fill: string;
};

/**
 * The single word-entry gesture for the whole reel: fade 0 to 1, unblur from
 * 13px, rise 18px into place over 0.12s on cubic-bezier(0.22, 1, 0.36, 1),
 * with the colour resolving from ghost grey to its final value over the first
 * 0.08s.
 *
 * Used by both full-screen scenes and by the hero satellite lines, so the
 * gesture is written down exactly once.
 */
export const revealState = (
  frame: number,
  start: number,
  finalColour: string,
): RevealState => {
  const t = frame - start;
  const p = interpolate(t, [0, REVEAL_FRAMES], [0, 1], {
    ...CLAMP,
    easing: REVEAL_EASE,
  });

  return {
    opacity: p,
    dy: 18 * (1 - p),
    blur: 13 * (1 - p),
    fill: interpolateColors(
      interpolate(t, [0, COLOUR_FRAMES], [0, 1], CLAMP),
      [0, 1],
      [GHOST, finalColour],
    ),
  };
};

export type ExitState = { opacity: number; dx: number; blur: number };

/**
 * Lines leave as a unit, never word by word: slide left, blur to 53px and fade
 * out over 0.15s ease-in. The tile stack in shot 2 leaves on the same gesture,
 * just 700px instead of 690px.
 */
export const exitState = (
  frame: number,
  start: number,
  distance: number,
): ExitState => {
  const p = interpolate(frame - start, [0, EXIT_FRAMES], [0, 1], {
    ...CLAMP,
    easing: EASE_IN,
  });

  return { opacity: 1 - p, dx: -distance * p, blur: 53 * p };
};

/**
 * Directional gaussian blur for an entering object.
 *
 * The two axes are driven independently so the smear runs along the direction
 * of travel rather than spreading evenly - the tile stack rises, so it blurs
 * vertically; the calendar block flies in from the right, so it blurs
 * horizontally. Neither axis is ever passed a hard zero, which some renderers
 * treat as "disable this primitive" rather than "no blur on this axis".
 */
export const MotionBlurFilter: React.FC<{
  id: string;
  x: number;
  y: number;
}> = ({ id, x, y }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <filter
      id={id}
      x="-60%"
      y="-60%"
      width="220%"
      height="220%"
      colorInterpolationFilters="sRGB"
    >
      <feGaussianBlur
        stdDeviation={`${Math.max(x, 0.01)} ${Math.max(y, 0.01)}`}
      />
    </filter>
  </svg>
);

type RevealLineProps = {
  /** Each word with the absolute composition frame it arrives on. */
  words: { text: string; at: number }[];
  /** Baseline. */
  y: number;
  size: number;
  weight: number;
  colour: string;
  tracking?: number;
  /** Absolute frame the whole line wipes out on. Omit for a line that holds. */
  exitAt?: number;
};

/**
 * One line of a full-screen scene: words arrive one at a time, the line leaves
 * as a unit.
 *
 * The line is laid out once at its final width and every word is drawn in the
 * slot it will keep, so a word that has already settled never gets nudged
 * sideways by the next one arriving.
 */
export const RevealLine: React.FC<RevealLineProps> = ({
  words,
  y,
  size,
  weight,
  colour,
  tracking = TRACK_DEFAULT,
  exitAt,
}) => {
  const frame = useCurrentFrame();
  const font = `${weight} ${size}px "${SANS}"`;
  const { total, offsets } = measureLine(
    words.map((w) => w.text),
    font,
    tracking * size,
  );
  const left = WIDTH / 2 - total / 2;

  const exit = exitAt === undefined ? null : exitState(frame, exitAt, 690);
  if (exit && exit.opacity <= 0) {
    return null;
  }

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <g
        transform={exit && exit.dx !== 0 ? `translate(${exit.dx} 0)` : undefined}
        opacity={exit ? exit.opacity : 1}
        style={
          exit && exit.blur > 0.05
            ? { filter: `blur(${exit.blur}px)` }
            : undefined
        }
      >
        {words.map((word, i) => {
          const r = revealState(frame, word.at, colour);
          if (r.opacity <= 0) {
            return null;
          }

          return (
            <text
              key={i}
              x={left + offsets[i]}
              y={y}
              textAnchor="start"
              fill={r.fill}
              opacity={r.opacity}
              transform={r.dy === 0 ? undefined : `translate(0 ${r.dy})`}
              style={{
                fontFamily: SANS,
                fontWeight: weight,
                fontSize: size,
                letterSpacing: `${tracking}em`,
                whiteSpace: "pre",
                ...(r.blur > 0.05 ? { filter: `blur(${r.blur}px)` } : {}),
              }}
            >
              {word.text}
            </text>
          );
        })}
      </g>
    </svg>
  );
};
