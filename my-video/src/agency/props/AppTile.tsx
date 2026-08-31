import React from "react";

/**
 * Generic abstract glyphs only. Nothing here is a recognisable app icon or a
 * trademarked mark - a play triangle, a speech bubble, a globe, a camera
 * outline, a share node, and a set of letter-free shapes.
 */
export type Glyph =
  | "play"
  | "bubble"
  | "globe"
  | "camera"
  | "share"
  | "loop"
  | "wedge"
  | "grid"
  | "ring";

const glyph = (kind: Glyph) => {
  switch (kind) {
    case "play":
      return <path d="M40 30 L 76 54 L 40 78 Z" fill="#EDECE8" />;
    case "bubble":
      return (
        <path
          d="M28 32 H 84 A 10 10 0 0 1 94 42 V 70 A 10 10 0 0 1 84 80 H 52 L 36 94 V 80 H 28 A 10 10 0 0 1 18 70 V 42 A 10 10 0 0 1 28 32 Z"
          fill="#EDECE8"
          transform="scale(0.84) translate(10 4)"
        />
      );
    case "globe":
      return (
        <g fill="none" stroke="#EDECE8" strokeWidth={5}>
          <circle cx={56} cy={56} r={30} />
          <ellipse cx={56} cy={56} rx={13} ry={30} />
          <line x1={26} y1={56} x2={86} y2={56} />
        </g>
      );
    case "camera":
      return (
        <g fill="none" stroke="#EDECE8" strokeWidth={5}>
          <rect x={26} y={36} width={60} height={44} rx={10} />
          <circle cx={56} cy={58} r={13} />
        </g>
      );
    case "share":
      return (
        <g stroke="#EDECE8" strokeWidth={5} fill="#EDECE8">
          <circle cx={78} cy={34} r={8} />
          <circle cx={34} cy={56} r={8} />
          <circle cx={78} cy={78} r={8} />
          <line x1={40} y1={52} x2={72} y2={38} />
          <line x1={40} y1={60} x2={72} y2={74} />
        </g>
      );
    case "loop":
      return (
        <g fill="none" stroke="#EDECE8" strokeWidth={7}>
          <circle cx={44} cy={56} r={18} />
          <circle cx={70} cy={56} r={18} />
        </g>
      );
    case "wedge":
      return <path d="M28 82 L 56 26 L 84 82 Z" fill="none" stroke="#EDECE8" strokeWidth={6} />;
    case "grid":
      return (
        <g fill="#EDECE8">
          {[0, 1].map((r) =>
            [0, 1].map((c) => (
              <rect key={`${r}${c}`} x={32 + c * 26} y={32 + r * 26} width={18} height={18} rx={5} />
            )),
          )}
        </g>
      );
    case "ring":
      return <circle cx={56} cy={56} r={24} fill="none" stroke="#EDECE8" strokeWidth={9} />;
  }
};

/** A glossy rounded-square tile. */
export const AppTile: React.FC<{ size: number; kind: Glyph; id: string }> = ({ size, kind, id }) => (
  <svg width={size} height={size} viewBox="0 0 112 112" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#4A4A4A" />
        <stop offset="38%" stopColor="#1E1E1E" />
        <stop offset="100%" stopColor="#101010" />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={112} height={112} rx={30} fill={`url(#${id}-tile)`} />
    <rect x={0} y={0} width={112} height={112} rx={30} fill="none" stroke="#7A7A7A" strokeWidth={1.6} opacity={0.5} />
    <ellipse cx={34} cy={22} rx={40} ry={14} fill="#FFFFFF" opacity={0.16} style={{ filter: "blur(7px)" }} />
    {glyph(kind)}
  </svg>
);
