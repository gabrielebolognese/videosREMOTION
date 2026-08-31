import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, IN, POP, POP_FRAMES, STAGGER } from "./motion";
import { CRIMSON, DISPLAY, HEAVY, INK, LEADING, SANS, TRACK } from "./tokens";

/**
 * One word of a line.
 *
 * The brief is specific about how type arrives here: it pops from 105 percent
 * to 100 and there is no fade. So opacity is a step, not a ramp - the word is
 * either not drawn or fully drawn - and the only thing that animates is the
 * settle. Nothing blurs, nothing slides.
 */
const Word: React.FC<{
  text: string;
  start: number;
  frame: number;
}> = ({ text, start, frame }) => {
  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        opacity: frame >= start ? 1 : 0,
        scale: interpolate(frame, [start, start + POP_FRAMES], [1.05, 1], {
          ...CLAMP,
          easing: POP,
          output: "perceptual-scale",
        }),
      }}
    >
      {text}
    </span>
  );
};

/**
 * A run of words sharing one treatment. A line is built from these, so a
 * single line can carry black base words and a crimson italic punch word
 * without the two being separate layers.
 */
export type Piece = {
  text: string;
  /** Swaps to the crimson italic display face. */
  punch?: boolean;
  /** Overrides the line size, for the words the brief calls oversized. */
  size?: number;
  color?: string;
  /** Splits on spaces so each word pops on its own beat. Default true. */
  split?: boolean;
};

export type LineSpec = {
  pieces: Piece[];
  /** Frame the first word of the line lands on. */
  start: number;
  size: number;
  align?: "left" | "right" | "center";
  /** Frames between consecutive words. */
  stagger?: number;
  /** Nudges the line off its alignment edge. */
  offsetX?: number;
  /** Extra space above the line. */
  gapAbove?: number;
  color?: string;
  /** Frame the line leaves. Omit and it holds to the end of the shot. */
  exitAt?: number;
  name?: string;
};

/** Flattens the pieces of a line into the tokens that actually pop. */
const tokensOf = (pieces: Piece[]) =>
  pieces.flatMap((piece) =>
    (piece.split === false ? [piece.text] : piece.text.split(" ")).map(
      (text) => ({ ...piece, text }),
    ),
  );

/**
 * One line of the kinetic stack. Renders in normal flow so a scene can drop it
 * into its own layout; `Stack` positions a group of them.
 */
export const Line: React.FC<LineSpec> = ({
  pieces,
  start,
  size,
  align = "left",
  stagger = STAGGER,
  offsetX = 0,
  gapAbove = 0,
  color = INK,
  exitAt,
  name,
}) => {
  const frame = useCurrentFrame();
  const tokens = tokensOf(pieces);

  // Exits are quicker than entrances: three frames and gone.
  const out =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 3], [0, 1], {
          ...CLAMP,
          easing: IN,
        });

  return (
    <Interactive.Div
      name={name ?? tokens.map((t) => t.text).join(" ")}
      style={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "baseline",
        // The line is shrink-wrapped inside the stack's column, so which edge
        // it hangs off is `alignSelf`, not `justifyContent`.
        alignSelf:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        gap: "0.26em",
        marginTop: gapAbove,
        fontFamily: SANS,
        fontWeight: HEAVY,
        fontSize: size,
        letterSpacing: TRACK,
        lineHeight: LEADING,
        color,
        translate: `${offsetX}px 0`,
        opacity: 1 - out,
      }}
    >
      {tokens.map((token, i) => (
        <span
          key={`${token.text}-${i}`}
          style={
            token.punch
              ? {
                  // The punch face is a display serif, so it needs its own
                  // size and tracking to sit on the same baseline as the sans.
                  fontFamily: DISPLAY,
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontSize: token.size ?? size * 1.14,
                  letterSpacing: "-0.015em",
                  color: token.color ?? CRIMSON,
                }
              : {
                  fontSize: token.size ?? undefined,
                  color: token.color ?? undefined,
                }
          }
        >
          <Word text={token.text} start={start + i * stagger} frame={frame} />
        </span>
      ))}
    </Interactive.Div>
  );
};

/**
 * The house type block: a run of lines in the upper third, each alternating
 * which edge it hangs off. Positioned absolutely by the scene.
 */
export const Stack: React.FC<{
  name: string;
  lines: LineSpec[];
  /** Inset from the frame edges, so the alternating lines have a margin. */
  inset?: number;
  style?: React.CSSProperties;
}> = ({ name, lines, inset = 46, style }) => {
  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left: inset,
        right: inset,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <Line key={i} {...line} />
      ))}
    </Interactive.Div>
  );
};
