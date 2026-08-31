import { Interactive, useCurrentFrame } from "remotion";
import { AMBER, CONDENSED, CRIMSON, INK, LILAC } from "./tokens";

/**
 * The horizontal offsets a word is thrown through as it lands. A fixed list
 * rather than a random walk: the tear has to be identical on every render, and
 * four frames is short enough that a deliberate sequence beats noise.
 */
const ENTRY_OFFSETS = [30, -22, 13, -6, 0];

/** The three bands a word is torn into on the swap frame. */
const TEAR_BANDS: { inset: string; dx: number }[] = [
  { inset: "0 0 62% 0", dx: 22 },
  { inset: "38% 0 30% 0", dx: -28 },
  { inset: "70% 0 0 0", dx: 14 },
];

const base = (size: number): React.CSSProperties => ({
  fontFamily: CONDENSED,
  fontWeight: 700,
  fontSize: size,
  lineHeight: 0.86,
  letterSpacing: "0.005em",
  textTransform: "uppercase",
  whiteSpace: "pre",
});

/**
 * One condensed-caps word, offset hard on entry and torn into chromatic bands
 * on the single frame it is replaced.
 */
const GlitchWord: React.FC<{
  text: string;
  /** Frame this word appears on. */
  start: number;
  /** Frame it is torn on, if it is. */
  tearAt?: number;
  size: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}> = ({ text, start, tearAt, size, fill, stroke, strokeWidth }) => {
  const frame = useCurrentFrame();

  if (frame < start) {
    return null;
  }

  const dx = ENTRY_OFFSETS[frame - start] ?? 0;
  const tearing = tearAt !== undefined && frame === tearAt;

  const face: React.CSSProperties = {
    ...base(size),
    color: fill,
    WebkitTextStroke: `${strokeWidth}px ${stroke}`,
    paintOrder: "stroke fill",
  };

  if (!tearing) {
    return <div style={{ ...face, translate: `${dx}px 0` }}>{text}</div>;
  }

  // One frame only: the word splits into three bands that slide apart, with a
  // crimson and a lilac ghost either side of them.
  return (
    <div style={{ position: "relative" }}>
      <div style={{ ...face, opacity: 0 }}>{text}</div>
      <div
        style={{
          ...face,
          position: "absolute",
          inset: 0,
          color: CRIMSON,
          WebkitTextStroke: "0px transparent",
          translate: "-9px 0",
          mixBlendMode: "multiply",
        }}
      >
        {text}
      </div>
      <div
        style={{
          ...face,
          position: "absolute",
          inset: 0,
          color: LILAC,
          WebkitTextStroke: "0px transparent",
          translate: "9px 0",
          mixBlendMode: "multiply",
        }}
      >
        {text}
      </div>
      {TEAR_BANDS.map((band, i) => (
        <div
          key={i}
          style={{
            ...face,
            position: "absolute",
            inset: 0,
            clipPath: `inset(${band.inset})`,
            translate: `${band.dx}px 0`,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

/**
 * The glitch beat: two stacked condensed-caps words, the lower one swapping
 * from MESSAGE to MEMORY mid-shot on a single torn frame. It is the only
 * moment in the piece where type does anything other than pop.
 */
export const GlitchStack: React.FC<{
  top: string;
  bottomA: string;
  bottomB: string;
  /** Frame the pair lands. */
  start: number;
  /** Frame the lower word is replaced. */
  swapAt: number;
  size: number;
  style?: React.CSSProperties;
}> = ({ top, bottomA, bottomB, start, swapAt, size, style }) => {
  const frame = useCurrentFrame();
  const swapped = frame >= swapAt;

  return (
    <Interactive.Div
      name={`${top} ${bottomA} / ${bottomB}`}
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        ...style,
      }}
    >
      <GlitchWord
        text={top}
        start={start}
        size={size}
        fill="#FFFFFF"
        stroke={INK}
        strokeWidth={2.5}
      />
      {swapped ? (
        <GlitchWord
          text={bottomB}
          start={swapAt}
          tearAt={swapAt}
          size={size}
          fill={AMBER}
          stroke="#FFFFFF"
          strokeWidth={3}
        />
      ) : (
        <GlitchWord
          text={bottomA}
          start={start + 1}
          size={size}
          fill={AMBER}
          stroke="#FFFFFF"
          strokeWidth={3}
        />
      )}
    </Interactive.Div>
  );
};
