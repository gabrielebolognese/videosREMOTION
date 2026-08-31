import React from "react";
import { useCurrentFrame } from "remotion";
import { drift } from "./motion";
import { BLACK, HEIGHT, WIDTH } from "./tokens";

/** One pointed olive leaf, drawn from the origin pointing along +x. */
const leaf = (len: number, wide: number) =>
  `M0 0 C ${len * 0.26} ${-wide} ${len * 0.72} ${-wide * 0.92} ${len} 0 ` +
  `C ${len * 0.72} ${wide * 0.92} ${len * 0.26} ${wide} 0 0 Z`;

type Blade = { angle: number; len: number; wide: number; x: number; y: number };

const CLUSTER: Blade[] = [
  { angle: 8, len: 300, wide: 54, x: 0, y: 0 },
  { angle: 38, len: 258, wide: 46, x: 6, y: 4 },
  { angle: 66, len: 286, wide: 50, x: 10, y: 10 },
  { angle: -18, len: 232, wide: 42, x: 4, y: -6 },
  { angle: 96, len: 210, wide: 38, x: 16, y: 18 },
  { angle: 24, len: 176, wide: 30, x: 78, y: 34 },
];

const Cluster: React.FC<{ scale: number; rotate: number }> = ({ scale, rotate }) => (
  <g transform={`rotate(${rotate}) scale(${scale})`}>
    {CLUSTER.map((b, i) => (
      <path
        key={i}
        d={leaf(b.len, b.wide)}
        fill={BLACK}
        transform={`translate(${b.x} ${b.y}) rotate(${b.angle})`}
      />
    ))}
    {/* Stem. */}
    <path
      d="M-10 -4 C 60 26 120 62 168 118"
      stroke={BLACK}
      strokeWidth={9}
      fill="none"
      strokeLinecap="round"
    />
  </g>
);

/**
 * The persistent decorative layer: a flat matte-black leaf cluster intruding
 * from the top left with a soft drop shadow, and a matching, softly blurred
 * cluster in the bottom right. In every shot except the final card.
 */
export const Leaves: React.FC = () => {
  const frame = useCurrentFrame();
  const a = drift(frame, 0.4, 0.5);
  const b = drift(frame, 2.1, 0.5);

  return (
    <>
      <svg
        width={WIDTH}
        height={HEIGHT}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
          filter: "drop-shadow(18px 26px 26px rgba(23,23,23,0.22))",
        }}
      >
        <g transform={`translate(${-46 + a.x} ${-30 + a.y}) rotate(${a.rot})`}>
          <Cluster scale={1} rotate={12} />
        </g>
      </svg>

      {/* The bottom-right twin sits softly out of focus. */}
      <svg
        width={WIDTH}
        height={HEIGHT}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
          filter: "blur(11px)",
          opacity: 0.85,
        }}
      >
        <g transform={`translate(${WIDTH + 40 + b.x} ${HEIGHT + 26 + b.y}) rotate(${180 + b.rot})`}>
          <Cluster scale={1.14} rotate={16} />
        </g>
      </svg>
    </>
  );
};
