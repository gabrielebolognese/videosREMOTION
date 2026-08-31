import React from "react";
import { GRAY } from "../lib/tokens";

/**
 * The oversized hook of shot 7: a thick pale grey vertical stem that lowers
 * from the top of frame and ends in a large open ring. Drawn in frame
 * coordinates so the scene can hang tiles off known clock positions.
 */
export const RingHook: React.FC<{
  cx: number;
  cy: number;
  /** Radius through the middle of the stroke. */
  r: number;
  band: number;
  stemWidth: number;
  width: number;
  height: number;
}> = ({ cx, cy, r, band, stemWidth, width, height }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    style={{ position: "absolute", left: 0, top: 0 }}
  >
    <rect
      x={cx - stemWidth / 2}
      y={-80}
      width={stemWidth}
      height={cy - r + band / 2 + 80}
      fill={GRAY}
    />
    <circle cx={cx} cy={cy} r={r} stroke={GRAY} strokeWidth={band} fill="none" />
  </svg>
);

export type TileKind = "chat" | "frame" | "letter" | "block" | "mark";

const FACE: Record<
  TileKind,
  { round: boolean; from: string; to: string }
> = {
  chat: { round: false, from: "#5AD46A", to: "#1E9B2C" },
  frame: { round: false, from: "#FF8A2B", to: "#E8258C" },
  letter: { round: true, from: "#2A4FB8", to: "#132A6E" },
  block: { round: false, from: "#4E9BE8", to: "#1F65B8" },
  mark: { round: true, from: "#FF5A4E", to: "#C40D12" },
};

/**
 * A generic coloured app tile. Every glyph here is invented - a plain chat
 * bubble, an outlined square, a single letterform, two block letters and an
 * abstract swoosh. No real brand, mark or product icon is referenced.
 */
export const AppTile: React.FC<{ size: number; kind: TileKind; id: string }> = ({
  size,
  kind,
  id,
}) => {
  const face = FACE[kind];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 112 112"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="0.55" y2="1">
          <stop offset="0%" stopColor={face.from} />
          <stop offset="100%" stopColor={face.to} />
        </linearGradient>
      </defs>

      <ellipse
        cx={56}
        cy={112}
        rx={40}
        ry={9}
        fill="rgba(40,40,44,0.20)"
        style={{ filter: "blur(6px)" }}
      />

      {face.round ? (
        <circle cx={56} cy={54} r={54} fill={`url(#${id}-face)`} />
      ) : (
        <rect
          x={2}
          y={0}
          width={108}
          height={108}
          rx={30}
          fill={`url(#${id}-face)`}
        />
      )}
      <ellipse
        cx={38}
        cy={22}
        rx={34}
        ry={13}
        fill="#FFFFFF"
        opacity={0.22}
        style={{ filter: "blur(5px)" }}
      />

      {kind === "chat" ? (
        <path
          d="M 30 30 H 82 A 10 10 0 0 1 92 40 V 64 A 10 10 0 0 1 82 74 H 52 L 34 88 V 74 H 30 A 10 10 0 0 1 20 64 V 40 A 10 10 0 0 1 30 30 Z"
          fill="#FFFFFF"
        />
      ) : null}
      {kind === "frame" ? (
        <g fill="none" stroke="#FFFFFF" strokeWidth={7}>
          <rect x={22} y={20} width={50} height={50} rx={14} />
          <rect x={44} y={42} width={50} height={50} rx={14} />
        </g>
      ) : null}
      {kind === "letter" ? (
        <text
          x={56}
          y={78}
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Poppins"
          fontWeight={800}
          fontSize={62}
        >
          N
        </text>
      ) : null}
      {kind === "block" ? (
        <text
          x={56}
          y={72}
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Poppins"
          fontWeight={800}
          fontSize={40}
          letterSpacing="-1"
        >
          AB
        </text>
      ) : null}
      {kind === "mark" ? (
        <path
          d="M 30 70 C 42 34 70 30 86 40 C 70 44 58 56 48 78 C 42 88 30 84 30 70 Z"
          fill="#FFFFFF"
        />
      ) : null}
    </svg>
  );
};
