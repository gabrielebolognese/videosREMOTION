import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, ENTER_FRAMES, IN, OUT, OVERSHOOT, STAGGER } from "./motion";
import { FONT, HEAVY, INK, LEADING, TRACK } from "./tokens";

export type Glow = "none" | "soft" | "edge" | "blue";

const SHADOW: Record<Glow, string | undefined> = {
  none: undefined,
  // White type on the red backdrop, lifted off it by its own halo.
  soft: "0 0 22px rgba(255,255,255,0.38), 0 2px 10px rgba(80,16,12,0.45)",
  // White type over the paper collage, held by a thin soft dark edge.
  edge: "0 0 3px rgba(10,10,10,0.75), 0 3px 14px rgba(10,10,10,0.55), 0 0 46px rgba(10,10,10,0.40)",
  blue: "0 0 26px rgba(74,78,222,0.55), 0 2px 10px rgba(10,10,10,0.30)",
};

export type LineSpec = {
  words: string[];
  /** Frame the first word of the line starts arriving. */
  start: number;
  size: number;
  color?: string;
  weight?: number;
  /** Negative pushes the line left of the stack centre. */
  offsetX?: number;
  /** Frames between consecutive words. */
  stagger?: number;
  /** Scale overshoot instead of the blur-slide. */
  pop?: boolean;
  /** Reveal letter by letter, left to right. */
  letters?: boolean;
  /** Vertical gradient fill, top to bottom. */
  gradient?: [string, string];
  glow?: Glow;
  /** Frame the line leaves. Omit and it holds to the end of the shot. */
  exitAt?: number;
  exitKind?: "cut" | "wipe";
  tracking?: string;
  lineHeight?: number;
  name?: string;
};

/** One animated token - a whole word, or a single letter in `letters` mode. */
const Token: React.FC<{
  text: string;
  start: number;
  pop: boolean;
  frame: number;
  gradient?: [string, string];
}> = ({ text, start, pop, frame, gradient }) => {
  const p = (frame - start) / ENTER_FRAMES;

  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        opacity: interpolate(p, [0, 0.32], [0, 1], CLAMP),
        // The blur always clears before the movement does, so the word is
        // legible while it is still travelling.
        filter: `blur(${interpolate(p, [0, 0.62], [pop ? 14 : 18, 0], CLAMP).toFixed(2)}px)`,
        translate: pop
          ? undefined
          : `${interpolate(p, [0, 0.7, 1], [40, -8, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px 0`,
        scale: pop
          ? interpolate(p, [0, 1], [0.46, 1], {
              ...CLAMP,
              easing: OVERSHOOT,
              output: "perceptual-scale",
            })
          : undefined,
      }}
    >
      {/*
        A gradient fill has to sit on an element that carries no filter or
        transform of its own - `background-clip: text` stops painting as soon
        as the same box gets a filter - so it goes on an inner span.
      */}
      {gradient ? (
        <span
          style={{
            backgroundImage: `linear-gradient(180deg, ${gradient[0]} 6%, ${gradient[1]} 96%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {text}
        </span>
      ) : (
        text
      )}
    </span>
  );
};

/**
 * One line of the stack. Renders in normal flow so a scene can drop it into
 * its own layout; `Stack` is the wrapper that positions a pair of them.
 */
export const Line: React.FC<LineSpec> = ({
  words,
  start,
  size,
  color = INK,
  weight = HEAVY,
  offsetX = 0,
  stagger = STAGGER,
  pop = false,
  letters = false,
  gradient,
  glow = "none",
  exitAt,
  exitKind = "cut",
  tracking = TRACK,
  lineHeight = LEADING,
  name,
}) => {
  const frame = useCurrentFrame();

  // Exits are always quicker than entrances: three frames, then gone.
  const out =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 3], [0, 1], {
          ...CLAMP,
          easing: IN,
        });

  const tokens = letters
    ? words.join(" ").split("")
    : words;

  return (
    <Interactive.Div
      name={name ?? words.join(" ")}
      style={{
        display: "flex",
        flexWrap: "nowrap",
        gap: letters ? 0 : "0.24em",
        fontFamily: FONT,
        fontWeight: weight,
        fontSize: size,
        letterSpacing: tracking,
        lineHeight,
        color,
        textShadow: gradient ? undefined : SHADOW[glow],
        // White type over the paper collage needs an actual outline, not just
        // a halo, or the counters close up against the sheet.
        WebkitTextStroke: glow === "edge" ? "2px rgba(10,10,10,0.55)" : undefined,
        paintOrder: glow === "edge" ? "stroke fill" : undefined,
        filter:
          gradient && glow !== "none"
            ? "drop-shadow(0 8px 20px rgba(30,58,224,0.32))"
            : undefined,
        translate: `${offsetX + (exitKind === "cut" ? out * -26 : 0)}px 0`,
        opacity: exitKind === "cut" ? 1 - out : 1,
        clipPath:
          exitKind === "wipe"
            ? `inset(-24% ${(out * 104).toFixed(2)}% -24% -6%)`
            : undefined,
      }}
    >
      {tokens.map((token, i) => (
        <Token
          key={`${token}-${i}`}
          text={token}
          start={start + i * (letters ? stagger * 0.5 : stagger)}
          pop={pop}
          frame={frame}
          gradient={gradient}
        />
      ))}
    </Interactive.Div>
  );
};

/**
 * The house type block: two stacked lines, the second one larger and offset to
 * the left, words landing one at a time.
 */
export const Stack: React.FC<{
  name: string;
  lines: LineSpec[];
  align?: "center" | "left";
  style?: React.CSSProperties;
}> = ({ name, lines, align = "center", style }) => {
  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 2,
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <Line key={i} {...line} />
      ))}
    </Interactive.Div>
  );
};
