import React from "react";
import {
  HEIGHT,
  OUTLINE,
  OUTLINE_WIDTH,
  RED,
  SANS,
  SHADOW,
  WIDTH,
} from "./tokens";

/**
 * Splits a string so every run of digits is painted red and everything else
 * keeps the passed colour.
 *
 * The red is reserved for numerals, and the only numerals anywhere in the copy
 * are "100" and "0" - so driving it off the digits rather than off hand-written
 * spans makes it impossible to miss one or to leak red onto a word.
 */
export const numerals = (
  text: string,
  base: string,
  accent: string = RED,
) => {
  const runs: { text: string; fill: string }[] = [];
  const re = /\d+/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      runs.push({ text: text.slice(last, m.index), fill: base });
    }
    runs.push({ text: m[0], fill: accent });
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    runs.push({ text: text.slice(last), fill: base });
  }
  return runs;
};

type OutlinedProps = {
  text: string;
  x: number;
  /** SVG y is the baseline, which is how every y in the brief is specified. */
  y: number;
  size: number;
  weight: number;
  /** In em, applied by the browser after every character. */
  tracking: number;
  fill: string;
  anchor?: "start" | "middle" | "end";
  family?: string;
  italic?: boolean;
  opacity?: number;
  /** Vertical offset, used by the reveal to drop the line into place. */
  dy?: number;
  blur?: number;
  scale?: number;
  scaleOrigin?: [number, number];
  /** Colour the digit runs resolve to. Red once settled, ghost while entering. */
  numeralFill?: string;
  /** Whether digits inside `text` should be picked out at all. */
  paintNumerals?: boolean;
};

/**
 * A single line of type carrying the shared treatment: a 1px #0A0A0A outline
 * drawn behind the fill, plus a 0x / 2y / 6blur shadow in 55% black.
 *
 * Used by the caption band and by all six hero elements, which the brief
 * requires to look identical in that respect.
 */
export const OutlinedText: React.FC<OutlinedProps> = ({
  text,
  x,
  y,
  size,
  weight,
  tracking,
  fill,
  anchor = "middle",
  family = SANS,
  italic = false,
  opacity = 1,
  dy = 0,
  blur = 0,
  scale = 1,
  scaleOrigin,
  numeralFill = RED,
  paintNumerals = true,
}) => {
  const runs = paintNumerals
    ? numerals(text, fill, numeralFill)
    : [{ text, fill }];
  const [ox, oy] = scaleOrigin ?? [x, y];

  const transforms: string[] = [];
  if (dy !== 0) {
    transforms.push(`translate(0 ${dy})`);
  }
  if (scale !== 1) {
    transforms.push(
      `translate(${ox} ${oy}) scale(${scale}) translate(${-ox} ${-oy})`,
    );
  }

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        filter: SHADOW,
        overflow: "visible",
      }}
    >
      <g
        transform={transforms.length > 0 ? transforms.join(" ") : undefined}
        opacity={opacity}
        style={blur > 0.05 ? { filter: `blur(${blur}px)` } : undefined}
      >
        <text
          x={x}
          y={y}
          textAnchor={anchor}
          fill={fill}
          stroke={OUTLINE}
          strokeWidth={OUTLINE_WIDTH}
          strokeLinejoin="round"
          paintOrder="stroke"
          style={{
            fontFamily: family,
            fontWeight: weight,
            fontSize: size,
            fontStyle: italic ? "italic" : "normal",
            letterSpacing: `${tracking}em`,
            whiteSpace: "pre",
          }}
        >
          {runs.map((run, i) => (
            <tspan key={i} fill={run.fill}>
              {run.text}
            </tspan>
          ))}
        </text>
      </g>
    </svg>
  );
};
