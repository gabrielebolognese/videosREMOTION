import React from "react";

/**
 * Two interlocking jigsaw pieces: one speckled mid-grey, one smooth
 * light-grey. They are drawn to meet but the shot holds them just short of
 * locking together.
 */
export const JigsawPiece: React.FC<{
  size: number;
  id: string;
  variant: "speckled" | "smooth";
  /** "tab" bulges right, "socket" is indented on the left. */
  edge: "tab" | "socket";
}> = ({ size, id, variant, edge }) => {
  const d =
    edge === "tab"
      ? "M16 16 H 196 V 84 C 232 70 232 138 196 124 V 192 H 16 Z"
      : "M20 16 H 200 V 192 H 20 V 124 C 56 138 56 70 20 84 Z";

  return (
    <svg width={size} height={size * 0.94} viewBox="0 0 236 208" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0.6" y2="1">
          {variant === "speckled" ? (
            <>
              <stop offset="0%" stopColor="#9B9A96" />
              <stop offset="52%" stopColor="#7C7B77" />
              <stop offset="100%" stopColor="#66655F" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#E7E6E1" />
              <stop offset="54%" stopColor="#D2D1CC" />
              <stop offset="100%" stopColor="#BCBBB6" />
            </>
          )}
        </linearGradient>
        <pattern id={`${id}-speck`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#4E4D49" opacity="0.5" />
          <circle cx="6.5" cy="6" r="1.1" fill="#3A3936" opacity="0.42" />
          <circle cx="7.5" cy="1.5" r="0.9" fill="#5E5D58" opacity="0.4" />
        </pattern>
        <filter id={`${id}-drop`} x="-30%" y="-30%" width="180%" height="180%">
          <feDropShadow dx="10" dy="16" stdDeviation="12" floodColor="#7A7975" floodOpacity="0.42" />
        </filter>
      </defs>

      <g filter={`url(#${id}-drop)`}>
        <path d={d} fill={`url(#${id}-fill)`} />
        {variant === "speckled" ? <path d={d} fill={`url(#${id}-speck)`} /> : null}
        <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.35} />
      </g>
    </svg>
  );
};
