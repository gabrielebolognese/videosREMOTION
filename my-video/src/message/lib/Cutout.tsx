import { CONTACT } from "./tokens";

/**
 * The thin white paper border every photographic cut-out is trimmed with.
 *
 * A scissor edge is hard, so this cannot be a glow: it is eight zero-blur
 * drop-shadows fired at the border radius, which traces an octagonal offset
 * around whatever alpha the child has. At the border widths this piece uses
 * (3-6px) the octagon is indistinguishable from a true outline, and it costs
 * one filter chain instead of a mask.
 */
const OFFSETS: [number, number][] = [
  [1, 0],
  [0.7071, 0.7071],
  [0, 1],
  [-0.7071, 0.7071],
  [-1, 0],
  [-0.7071, -0.7071],
  [0, -1],
  [0.7071, -0.7071],
];

export const paperEdge = (width: number, colour = "#FFFFFF") =>
  OFFSETS.map(
    ([dx, dy]) =>
      `drop-shadow(${(dx * width).toFixed(2)}px ${(dy * width).toFixed(2)}px 0 ${colour})`,
  ).join(" ");

/**
 * Wraps a cut-out in its paper border plus its contact shadow. The shadow has
 * to come last in the chain so it is cast by the bordered silhouette rather
 * than by the artwork inside it.
 */
export const Cutout: React.FC<{
  /** Border width in pixels. 0 leaves the artwork untrimmed. */
  border?: number;
  shadow?: string;
  /** Extra filter applied to the artwork before it is trimmed. */
  inner?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ border = 4, shadow = CONTACT, inner, style, children }) => {
  const chain = [inner, border > 0 ? paperEdge(border) : undefined, shadow]
    .filter(Boolean)
    .join(" ");

  return <div style={{ filter: chain || undefined, ...style }}>{children}</div>;
};
