import React from "react";
import { Placeholder } from "./Placeholder";
import { FONT } from "./tokens";

/**
 * The Claude mark, stubbed.
 *
 * The script names the brand three times and every one of them gets an actual
 * mark rather than plain text. The artwork does not exist yet, so the mark is
 * a labelled placeholder at the size the real one will occupy - never an emoji
 * and never an icon font.
 */
export const ClaudeMark: React.FC<{
  size: number;
  style?: React.CSSProperties;
}> = ({ size, style }) => (
  <Placeholder name="claude mark" width={size} height={size} style={style} />
);

/**
 * Mark plus wordmark, sitting on one baseline.
 *
 * `weight` and `size` drive the word; the mark is set to cap height so the
 * lockup reads as one object rather than an icon next to some text.
 */
export const ClaudeLockup: React.FC<{
  word: string;
  size: number;
  weight: number;
  colour: string;
  gap?: number;
  markScale?: number;
  style?: React.CSSProperties;
}> = ({ word, size, weight, colour, gap, markScale = 0.74, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: gap ?? size * 0.24,
      ...style,
    }}
  >
    <ClaudeMark size={size * markScale} />
    <span
      style={{
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        color: colour,
        lineHeight: 1,
      }}
    >
      {word}
    </span>
  </div>
);
