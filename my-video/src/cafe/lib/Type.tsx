import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT, OVERSHOOT } from "./Frame";
import { INK, SANS, SCRIPT, SERIF } from "./tokens";

export type Role = "light" | "lightItalic" | "heavy" | "serif" | "script";

/**
 * The five type roles.
 *
 * The light lines are tracked wide and set at 300; the punch words are either
 * Poppins 800 or Playfair italic, and always land at roughly twice the size.
 */
const ROLE: Record<Role, React.CSSProperties> = {
  light: {
    fontFamily: SANS,
    fontWeight: 300,
    letterSpacing: "0.18em",
  },
  lightItalic: {
    fontFamily: SANS,
    fontWeight: 300,
    fontStyle: "italic",
    letterSpacing: "0.05em",
  },
  heavy: {
    fontFamily: SANS,
    fontWeight: 800,
    letterSpacing: "-0.025em",
  },
  serif: {
    fontFamily: SERIF,
    fontWeight: 700,
    fontStyle: "italic",
    letterSpacing: "-0.01em",
  },
  script: {
    fontFamily: SCRIPT,
    fontWeight: 600,
    letterSpacing: "0.01em",
  },
};

/** Frames a word takes to arrive. Short - the cuts are on a fast beat grid. */
const ENTER = 6;

const Word: React.FC<{
  text: string;
  start: number;
  frame: number;
  anim: "pop" | "fade";
  fromScale: number;
}> = ({ text, start, frame, anim, fromScale }) => {
  const p = (frame - start) / ENTER;

  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        opacity: interpolate(p, [0, anim === "pop" ? 0.28 : 0.75], [0, 1], CLAMP),
        scale:
          anim === "pop"
            ? interpolate(p, [0, 1], [fromScale, 1], {
                ...CLAMP,
                easing: OVERSHOOT,
                output: "perceptual-scale",
              })
            : undefined,
        // A fade always carries a small upward slide with it, never a bare
        // opacity ramp - the brief asks for a fade with a 12px rise.
        translate:
          anim === "fade"
            ? `0px ${interpolate(p, [0, 1], [12, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px`
            : undefined,
      }}
    >
      {text}
    </span>
  );
};

/**
 * One line of type. Positioned by the caller through `style`; the words inside
 * animate one at a time when a stagger is given, or as one block when it is 0.
 */
export const Text: React.FC<{
  children: string;
  start: number;
  role: Role;
  size: number;
  /** Overrides the weight the role would otherwise set. */
  weight?: number;
  color?: string;
  anim?: "pop" | "fade";
  /** Where a pop starts from. The brief calls out 92% and 88% by name. */
  fromScale?: number;
  /** Frames between words. 0 animates the whole line as one block. */
  stagger?: number;
  rotate?: number;
  /** Slight right slant on the heavy sans, in degrees of skew. */
  slant?: number;
  tracking?: string;
  lineHeight?: number;
  align?: "flex-start" | "center" | "flex-end";
  /** Frame the line fades out, for the cross-faded card captions. */
  exitAt?: number;
  shadow?: string;
  style?: React.CSSProperties;
  name?: string;
}> = ({
  children,
  start,
  role,
  size,
  weight,
  color = INK,
  anim = "fade",
  fromScale = 0.92,
  stagger = 0,
  rotate = 0,
  slant = 0,
  tracking,
  lineHeight = 1,
  align = "center",
  exitAt,
  shadow = "0 3px 10px rgba(64,78,70,0.26)",
  style,
  name,
}) => {
  const frame = useCurrentFrame();
  const words = children.split(" ");

  const out =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 5], [0, 1], CLAMP);

  return (
    <Interactive.Div
      name={name ?? children}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: align,
        gap: "0.3em",
        fontSize: size,
        lineHeight,
        color,
        textShadow: shadow,
        opacity: 1 - out,
        rotate: rotate ? `${rotate}deg` : undefined,
        transform: slant ? `skewX(${-slant}deg)` : undefined,
        ...ROLE[role],
        ...(weight ? { fontWeight: weight } : null),
        ...(tracking ? { letterSpacing: tracking } : null),
        ...style,
      }}
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          text={word}
          start={start + i * stagger}
          frame={frame}
          anim={anim}
          fromScale={fromScale}
        />
      ))}
    </Interactive.Div>
  );
};
