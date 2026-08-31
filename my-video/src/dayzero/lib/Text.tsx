import React from "react";
import type { Entrance } from "./script";
import {
  type PhraseClock,
  drift,
  entranceAnim,
  partProgress,
  staggerFor,
} from "./motion";
import { FONT, LIFT, WHITE } from "./tokens";

/**
 * One typographic part of a phrase.
 *
 * A phrase is always built from several of these, because no phrase in this
 * piece is set at a single size and a single weight - the contrast inside the
 * phrase is where the typography lives.
 */
export type Part = {
  text: string;
  size: number;
  weight: number;
  colour?: string;
  opacity?: number;
  /** em. */
  tracking?: number;
  /** Baseline shift, px. Positive moves down. */
  dy?: number;
  /** Overrides the accumulated stagger, in seconds from the phrase start. */
  delay?: number;
};

export type Slot = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: number;
  align?: "left" | "right" | "center";
  rotate?: number;
};

/** Absolute placement inside the 1080x1920 frame. */
export const Positioned: React.FC<{
  slot: Slot;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ slot, style, children }) => (
  <div
    style={{
      position: "absolute",
      left: slot.left,
      right: slot.right,
      top: slot.top,
      bottom: slot.bottom,
      width: slot.width,
      textAlign: slot.align ?? "left",
      transform: slot.rotate ? `rotate(${slot.rotate}deg)` : undefined,
      transformOrigin: "center center",
      ...style,
    }}
  >
    {children}
  </div>
);

const partStyle = (p: Part): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: p.size,
  fontWeight: p.weight,
  color: p.colour ?? WHITE,
  letterSpacing: p.tracking === undefined ? undefined : `${p.tracking}em`,
  lineHeight: 1,
});

/**
 * A line of parts sharing one baseline, each arriving on its own delay.
 *
 * `maskWipe` is handled at the line level rather than the part level, because
 * a mask that wiped per word would read as a stagger, not as a shape crossing
 * the words.
 */
export const Run: React.FC<{
  parts: Part[];
  clock: PhraseClock;
  entrance: Entrance;
  /** Seconds from the phrase start before this line begins. */
  baseDelay?: number;
  /** Direction for `slide`, and the axis a mask wipes along. */
  dirSign?: number;
  /** The very slight dark lift, for type sitting over warm footage. */
  lift?: boolean;
  seed?: number;
  style?: React.CSSProperties;
}> = ({
  parts,
  clock,
  entrance,
  baseDelay = 0,
  dirSign = 1,
  lift = false,
  seed = 0,
  style,
}) => {
  const shadow = lift ? LIFT : undefined;

  if (entrance === "maskWipe") {
    const a = entranceAnim(entrance, partProgress(clock.local, baseDelay, entrance));
    const d = drift(clock.frame, seed);
    const hidden = (1 - a.reveal) * 100;
    return (
      <div
        style={{
          whiteSpace: "pre",
          // The shape crosses the words rather than the words fading in.
          clipPath:
            dirSign >= 0
              ? `inset(-25% ${hidden}% -25% -6%)`
              : `inset(-25% -6% -25% ${hidden}%)`,
          transform: `translate(${d.x}px, ${d.y}px)`,
          textShadow: shadow,
          ...style,
        }}
      >
        {parts.map((p, i) => (
          <span key={i} style={{ ...partStyle(p), opacity: p.opacity, position: "relative", top: p.dy }}>
            {p.text}
          </span>
        ))}
      </div>
    );
  }

  const perLetter = entrance === "letters";
  let cursor = baseDelay;

  return (
    <div style={{ whiteSpace: "pre", textShadow: shadow, ...style }}>
      {parts.map((part, i) => {
        const units = perLetter ? Array.from(part.text) : [part.text];

        return (
          <span key={i} style={{ whiteSpace: "pre" }}>
            {units.map((unit, j) => {
              const delay = part.delay !== undefined && j === 0 ? part.delay : cursor;
              if (part.delay !== undefined && j === 0) cursor = part.delay;
              cursor += perLetter ? 0.032 : staggerFor(part.text);

              const a = entranceAnim(
                entrance,
                partProgress(clock.local, delay, entrance),
                dirSign,
              );
              const d = drift(clock.frame, seed + i * 0.7 + j * 0.3);
              const settled = a.opacity >= 1 ? 1 : 0;

              return (
                <span
                  key={j}
                  style={{
                    ...partStyle(part),
                    display: "inline-block",
                    verticalAlign: "baseline",
                    opacity: a.opacity * (part.opacity ?? 1),
                    filter: a.blur > 0.05 ? `blur(${a.blur}px)` : undefined,
                    transform: `translate(${a.x + d.x * settled}px, ${a.y + (part.dy ?? 0) + d.y * settled}px) scale(${a.scale})`,
                  }}
                >
                  {unit === " " ? "\u00A0" : unit}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};
