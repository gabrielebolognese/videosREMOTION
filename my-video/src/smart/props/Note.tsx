import React from "react";
import { PIN } from "../lib/tokens";

/**
 * The grey paper note of shot 6 and the glossy green pushpin holding it up.
 * Text is laid over this by the scene, so the sheet is artwork only.
 */
export const PaperNote: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <svg
    width={width}
    height={height + 46}
    viewBox={`0 0 ${width} ${height + 46}`}
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="note-sheet" x1="0.1" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#D6D6D6" />
        <stop offset="46%" stopColor="#C7C7C7" />
        <stop offset="100%" stopColor="#B4B4B4" />
      </linearGradient>
      <radialGradient id="note-pin" cx="0.32" cy="0.26" r="0.82">
        <stop offset="0%" stopColor="#9BF0A4" />
        <stop offset="44%" stopColor={PIN} />
        <stop offset="100%" stopColor="#186B1E" />
      </radialGradient>
      <linearGradient id="note-needle" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5A6066" />
        <stop offset="45%" stopColor="#D2D8DD" />
        <stop offset="100%" stopColor="#4A5055" />
      </linearGradient>
    </defs>

    {/* the sheet, with its one soft contact shadow */}
    <rect
      x={10}
      y={40}
      width={width - 20}
      height={height}
      rx={6}
      fill="rgba(40,40,44,0.20)"
      style={{ filter: "blur(18px)", translate: "0px 18px" }}
    />
    <rect
      x={10}
      y={34}
      width={width - 20}
      height={height}
      rx={6}
      fill="url(#note-sheet)"
    />
    <rect
      x={10}
      y={34}
      width={width - 20}
      height={height}
      rx={6}
      fill="none"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth={1.6}
    />

    {/* pushpin: needle behind, glossy dome in front */}
    <rect
      x={width / 2 - 5}
      y={26}
      width={10}
      height={44}
      rx={5}
      fill="url(#note-needle)"
    />
    <ellipse cx={width / 2} cy={34} rx={30} ry={11} fill="#1C7A22" />
    <circle cx={width / 2} cy={30} r={30} fill="url(#note-pin)" />
    <ellipse
      cx={width / 2 - 9}
      cy={20}
      rx={12}
      ry={7}
      fill="rgba(255,255,255,0.7)"
      style={{ rotate: "-24deg", transformOrigin: `${width / 2 - 9}px 20px` }}
    />
  </svg>
);

export type GlyphKind = "megaphone" | "people" | "chart";

/**
 * Simple generic black pictograms for the three note rows. Nothing here is a
 * logo or a platform mark - a cone megaphone, three heads and shoulders, and a
 * rising bar chart with an arrow.
 */
export const Glyph: React.FC<{ kind: GlyphKind; size: number }> = ({
  kind,
  size,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {kind === "megaphone" ? (
      <g fill="#0A0A0A">
        <path d="M 8 26 L 20 26 L 44 12 L 44 52 L 20 38 L 8 38 Z" />
        <path d="M 22 40 L 32 40 L 34 58 L 26 58 Z" />
        <g stroke="#0A0A0A" strokeWidth={4} strokeLinecap="round" fill="none">
          <path d="M 50 24 q 8 8 0 16" />
          <path d="M 56 17 q 14 15 0 30" />
        </g>
      </g>
    ) : null}
    {kind === "people" ? (
      <g fill="#0A0A0A">
        <circle cx={32} cy={19} r={10} />
        <path d="M 14 52 a 18 18 0 0 1 36 0 Z" />
        <circle cx={12} cy={26} r={8} />
        <path d="M 0 52 a 13 13 0 0 1 24 -3 Z" />
        <circle cx={52} cy={26} r={8} />
        <path d="M 40 49 a 13 13 0 0 1 24 3 Z" />
      </g>
    ) : null}
    {kind === "chart" ? (
      <g fill="#0A0A0A">
        <rect x={6} y={38} width={12} height={20} rx={2} />
        <rect x={26} y={28} width={12} height={30} rx={2} />
        <rect x={46} y={16} width={12} height={42} rx={2} />
        <path
          d="M 8 26 L 26 14 L 38 20 L 58 4"
          stroke="#0A0A0A"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M 44 4 L 60 4 L 60 18 Z" />
      </g>
    ) : null}
  </svg>
);
