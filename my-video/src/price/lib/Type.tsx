import React from "react";
import { Interactive, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { CLAMP, OUT } from "./motion";
import {
  BLACK,
  PENDING_ON_WHITE,
  SANS,
  TRACK,
  fh,
  fw,
  sec,
} from "./tokens";

/** Frames a word takes to fade up. */
const FADE = 6;
/** Frames the snap to full scale and full contrast takes. Short by design. */
const SNAP = 4;
/** How long the last word of a block waits before it snaps, in seconds. */
const CADENCE = 0.25;

export type Word = {
  text: string;
  /** The second this word lands on, on the master timeline. */
  at: number;
  /** Per-word overrides. Only shot 6 needs them. */
  weight?: number;
  color?: string;
  size?: number;
};

export type CaptionLine = {
  words: Word[];
  size: number;
  weight?: number;
  color?: string;
  family?: string;
  italic?: boolean;
  tracking?: string;
  lineHeight?: number;
  /** Wrapping width. A long bold line breaks rather than leaving the frame. */
  maxWidth?: number;
};

/**
 * One word.
 *
 * It is always in the flow, from the first frame of the shot - only `opacity`
 * gates it. That is deliberate: `scale` and `opacity` do not affect layout, so
 * a block never reflows as it builds and the kerning of the words already on
 * screen cannot shift when the next one lands.
 */
const Token: React.FC<{
  word: Word;
  /** The second this word snaps: when the next word in the block lands. */
  settleAt: number;
  pending: string;
  settled: string;
  weight: number;
  size: number;
}> = ({ word, settleAt, pending, settled, weight, size }) => {
  const frame = useCurrentFrame();

  const settle = interpolate(frame, [sec(settleAt), sec(settleAt) + SNAP], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });

  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        fontWeight: word.weight ?? weight,
        fontSize: word.size ?? size,
        opacity: interpolate(frame, [sec(word.at), sec(word.at) + FADE], [0, 1], CLAMP),
        // 92% until the next word lands, then a hard snap to full size.
        scale: interpolate(settle, [0, 1], [0.92, 1], {
          ...CLAMP,
          output: "perceptual-scale",
        }),
        color: interpolateColors(settle, [0, 1], [pending, word.color ?? settled]),
      }}
    >
      {word.text}
    </span>
  );
};

/**
 * The house caption block: stacked lines, centred, words landing one at a
 * time at four a second. Every cue is an absolute master-timeline second.
 */
export const Caption: React.FC<{
  name: string;
  lines: CaptionLine[];
  /** Centre of the block, as a percentage of frame height. */
  centre: number;
  /** Left edge as a percentage of frame width. Omit to centre horizontally. */
  left?: number;
  /** The mid grey a word fades up in. */
  pending?: string;
  /** Full-contrast colour a word snaps to. */
  color?: string;
  align?: "center" | "flex-start";
  gap?: number;
  style?: React.CSSProperties;
}> = ({
  name,
  lines,
  centre,
  left,
  pending = PENDING_ON_WHITE,
  color = BLACK,
  align = "center",
  gap = 2,
  style,
}) => {
  // Every word in the block, in landing order, so a word can find the cue it
  // snaps on - which may well be the first word of the *next* line.
  const cues = Array.from(
    new Set(lines.flatMap((l) => l.words.map((w) => w.at))),
  ).sort((a, b) => a - b);

  const settleFor = (at: number) => {
    const next = cues.find((c) => c > at);
    return next ?? at + CADENCE;
  };

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left: left === undefined ? 0 : fw(left),
        right: left === undefined ? 0 : undefined,
        top: fh(centre),
        translate: "0 -50%",
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        gap,
        textAlign: align === "center" ? "center" : "left",
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: align,
            // Shot 6 mixes two sizes on one line; baseline keeps them sitting
            // on the same rule instead of each centring in the row box.
            alignItems: "baseline",
            columnGap: "0.28em",
            rowGap: 0,
            maxWidth: line.maxWidth ?? fw(88),
            fontFamily: line.family ?? SANS,
            fontStyle: line.italic ? "italic" : undefined,
            fontSize: line.size,
            letterSpacing: line.tracking ?? TRACK,
            lineHeight: line.lineHeight ?? 1.06,
          }}
        >
          {line.words.map((word, j) => (
            <Token
              key={`${word.text}-${j}`}
              word={word}
              settleAt={settleFor(word.at)}
              pending={pending}
              settled={line.color ?? color}
              weight={line.weight ?? 400}
              size={line.size}
            />
          ))}
        </div>
      ))}
    </Interactive.Div>
  );
};

/**
 * A block of type that is simply present, with no build at all. The credit
 * paragraph under the phone panel and the end-card wordmark use it.
 */
export const Fixed: React.FC<{
  name: string;
  /** Centre of the block, as a percentage of frame height. */
  centre: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ name, centre, children, style }) => (
  <Interactive.Div
    name={name}
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: fh(centre),
      translate: "0 -50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: SANS,
      letterSpacing: TRACK,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);
