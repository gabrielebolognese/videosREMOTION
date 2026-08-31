import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT, OVERSHOOT } from "./Studio";
import { CHARCOAL, COND, GEO, LIFT, MARKER, SERIF } from "./tokens";

export type Role =
  | "serifLight"
  | "serifMedium"
  | "serifBold"
  | "serifRoman"
  | "marker"
  | "geo"
  | "cond";

const ROLE: Record<Role, React.CSSProperties> = {
  // The thin lead-in lines.
  serifLight: { fontFamily: SERIF, fontWeight: 400, fontStyle: "italic" },
  serifMedium: { fontFamily: SERIF, fontWeight: 500, fontStyle: "italic" },
  // The hero words.
  serifBold: { fontFamily: SERIF, fontWeight: 800, fontStyle: "italic" },
  serifRoman: { fontFamily: SERIF, fontWeight: 800 },
  // The three contrast faces, used only where the brief names them.
  marker: { fontFamily: MARKER, fontWeight: 700 },
  geo: { fontFamily: GEO, fontWeight: 800, fontStyle: "italic" },
  cond: { fontFamily: COND, fontWeight: 700, letterSpacing: "0.14em" },
};

export type Reveal =
  | "fadeRise"
  | "pop"
  | "scaleIn"
  | "slideLeft"
  | "blurPop"
  | "hold";

/** Frames a token takes to resolve. Fast ease-out, then dead still. */
const ENTER = 7;

const Token: React.FC<{
  text: string;
  start: number;
  frame: number;
  reveal: Reveal;
}> = ({ text, start, frame, reveal }) => {
  const p = (frame - start) / ENTER;

  const style: React.CSSProperties = {
    display: "inline-block",
    whiteSpace: "pre",
  };

  switch (reveal) {
    case "hold":
      style.opacity = 1;
      break;
    case "fadeRise":
      style.opacity = interpolate(p, [0, 0.8], [0, 1], CLAMP);
      style.translate = `0px ${interpolate(p, [0, 1], [20, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px`;
      break;
    case "pop":
      style.opacity = interpolate(p, [0, 0.24], [0, 1], CLAMP);
      style.scale = interpolate(p, [0, 1], [0.62, 1], {
        ...CLAMP,
        easing: OVERSHOOT,
        output: "perceptual-scale",
      });
      break;
    case "scaleIn":
      style.opacity = interpolate(p, [0, 0.3], [0, 1], CLAMP);
      style.scale = interpolate(p, [0, 1], [0.9, 1], {
        ...CLAMP,
        easing: OVERSHOOT,
        output: "perceptual-scale",
      });
      break;
    case "slideLeft":
      style.opacity = interpolate(p, [0, 0.34], [0, 1], CLAMP);
      style.translate = `${interpolate(p, [0, 1], [-150, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px 0`;
      break;
    case "blurPop":
      style.opacity = interpolate(p, [0, 0.3], [0, 1], CLAMP);
      style.filter = `blur(${interpolate(p, [0, 0.7], [18, 0], CLAMP).toFixed(2)}px)`;
      style.scale = interpolate(p, [0, 1], [0.9, 1], {
        ...CLAMP,
        easing: OVERSHOOT,
        output: "perceptual-scale",
      });
      break;
  }

  return <span style={style}>{text}</span>;
};

/**
 * One line of type.
 *
 * Splits into words by default, or into letters when `letters` is set, and
 * staggers whichever it produced. Positioned by the caller through `style`.
 */
export const Line: React.FC<{
  children: string;
  start: number;
  role: Role;
  size: number;
  color?: string;
  reveal?: Reveal;
  /** Frames between tokens. 0 reveals the whole line as one block. */
  stagger?: number;
  /** Split into letters instead of words, for the letter-by-letter pop. */
  letters?: boolean;
  tracking?: string;
  lineHeight?: number;
  align?: "flex-start" | "center" | "flex-end";
  shadow?: string;
  opacity?: number;
  style?: React.CSSProperties;
  name?: string;
}> = ({
  children,
  start,
  role,
  size,
  color = CHARCOAL,
  reveal = "fadeRise",
  stagger = 0,
  letters = false,
  tracking,
  lineHeight = 1,
  align = "flex-start",
  shadow = LIFT,
  opacity = 1,
  style,
  name,
}) => {
  const frame = useCurrentFrame();
  const tokens = letters ? children.split("") : children.split(" ");

  return (
    <Interactive.Div
      name={name ?? children}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: align,
        gap: letters ? 0 : "0.26em",
        fontSize: size,
        lineHeight,
        color,
        opacity,
        textShadow: shadow,
        ...ROLE[role],
        ...(tracking ? { letterSpacing: tracking } : null),
        ...style,
      }}
    >
      {tokens.map((token, i) => (
        <Token
          key={`${token}-${i}`}
          text={token}
          start={start + i * stagger}
          frame={frame}
          reveal={reveal}
        />
      ))}
    </Interactive.Div>
  );
};
