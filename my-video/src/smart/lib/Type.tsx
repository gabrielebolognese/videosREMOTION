import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT, OVERSHOOT } from "./motion";
import { BLACK, glow, SANS } from "./tokens";

export type Role = "light" | "book" | "semi" | "bold" | "boldItalic";

const ROLE: Record<Role, React.CSSProperties> = {
  // Connector words: "got the", "is just", "But your", "stuck in a".
  light: { fontWeight: 300 },
  book: { fontWeight: 400 },
  // The note body rows in shot 6.
  semi: { fontWeight: 600 },
  // Every keyword.
  bold: { fontWeight: 800 },
  // "Same Place" only.
  boldItalic: { fontWeight: 800, fontStyle: "italic" },
};

export type Reveal = "pop" | "rise" | "hold";

/** Frames a word takes to resolve: a hard three-frame crest, then still. */
const ENTER = 6;

/**
 * One word.
 *
 * Every word in the piece enters on its own cue, so the cue lives on the word
 * rather than on the line, and lines are plain flex rows around these.
 */
export const W: React.FC<{
  children: React.ReactNode;
  /** Frame local to the shot that this word lands on. */
  start: number;
  size: number;
  role?: Role;
  color?: string;
  /** Colour of the outer glow. Omitted on the flat off-white world. */
  halo?: string;
  /** Multiplies the glow radius, so the CTA can pulse on its last frames. */
  haloStrength?: number;
  reveal?: Reveal;
  tracking?: string;
  style?: React.CSSProperties;
  name?: string;
}> = ({
  children,
  start,
  size,
  role = "light",
  color = BLACK,
  halo,
  haloStrength = 1,
  reveal = "pop",
  tracking,
  style,
  name,
}) => {
  const frame = useCurrentFrame();
  const p = (frame - start) / ENTER;

  return (
    <Interactive.Div
      name={name ?? (typeof children === "string" ? children : "word")}
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        fontFamily: SANS,
        fontSize: size,
        lineHeight: 1,
        color,
        letterSpacing: tracking ?? "-0.01em",
        ...ROLE[role],
        ...(halo ? { textShadow: glow(halo, haloStrength) } : null),
        ...(reveal === "hold"
          ? { opacity: 1 }
          : reveal === "rise"
            ? {
                opacity: interpolate(p, [0, 0.7], [0, 1], CLAMP),
                translate: `0px ${interpolate(p, [0, 1], [20, 0], {
                  ...CLAMP,
                  easing: OUT,
                }).toFixed(2)}px`,
              }
            : {
                opacity: interpolate(p, [0, 0.26], [0, 1], CLAMP),
                scale: interpolate(p, [0, 1], [0.58, 1], {
                  ...CLAMP,
                  easing: OVERSHOOT,
                  output: "perceptual-scale",
                }),
              }),
        ...style,
      }}
    >
      {children}
    </Interactive.Div>
  );
};

/**
 * A row of words, positioned absolutely by the caller.
 *
 * `top` is the top edge of the row box; rows are stacked by hand rather than
 * flowed, because the brief pins several of them to thirds of the frame.
 */
export const Row: React.FC<{
  children: React.ReactNode;
  top: number;
  left?: number;
  right?: number;
  align?: "flex-start" | "center" | "flex-end";
  gap?: number;
  style?: React.CSSProperties;
  name?: string;
}> = ({
  children,
  top,
  left = 0,
  right = 0,
  align = "center",
  gap = 14,
  style,
  name,
}) => (
  <Interactive.Div
    name={name ?? "row"}
    style={{
      position: "absolute",
      top,
      left,
      right,
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "baseline",
      justifyContent: align,
      gap,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);
