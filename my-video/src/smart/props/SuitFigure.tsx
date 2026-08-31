import React from "react";

/**
 * The only "person" in the piece: an anonymous torso in a sharp black
 * two-button suit, white shirt and black tie, hands in pockets. There is no
 * head here at all - the glowing sphere that replaces it is a separate
 * component, so a scene can put type inside it.
 *
 * World B lights this from behind, so the artwork carries a hard white rim
 * down both shoulders and the outer flanks, and nothing else.
 */
export const SuitFigure: React.FC<{ width: number }> = ({ width }) => (
  <svg
    width={width}
    height={width * (900 / 460)}
    viewBox="0 0 460 900"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="suit-cloth" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor="#141619" />
        <stop offset="46%" stopColor="#0A0B0D" />
        <stop offset="100%" stopColor="#040405" />
      </linearGradient>
      <linearGradient id="suit-lapel" x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0%" stopColor="#22252A" />
        <stop offset="100%" stopColor="#0B0C0E" />
      </linearGradient>
      <linearGradient id="suit-tie" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#080809" />
        <stop offset="42%" stopColor="#1D2024" />
        <stop offset="100%" stopColor="#050506" />
      </linearGradient>
      <linearGradient id="suit-shirt" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#E6E8EA" />
        <stop offset="100%" stopColor="#BFC4C8" />
      </linearGradient>
    </defs>

    {/* the jacket opening, then the shirt and tie filling it */}
    <path
      d="M 160 24 L 118 78 Q 58 104 50 176 L 30 900 L 430 900 L 410 176 Q 402 104 342 78 L 300 24 L 230 292 Z"
      fill="url(#suit-cloth)"
    />
    <path d="M 160 24 L 300 24 L 230 292 Z" fill="url(#suit-shirt)" />
    <path
      d="M 204 40 L 256 40 L 264 232 L 230 274 L 196 232 Z"
      fill="url(#suit-tie)"
    />
    <path
      d="M 204 40 L 256 40 L 264 232 L 230 274 L 196 232 Z"
      fill="none"
      stroke="rgba(255,255,255,0.26)"
      strokeWidth="1.6"
    />
    {/* knot, then the collar points folding over the shirt */}
    <path d="M 206 24 L 254 24 L 262 66 L 198 66 Z" fill="#12151A" />
    <path d="M 160 24 L 220 60 L 188 122 Z" fill="#FFFFFF" />
    <path d="M 300 24 L 240 60 L 272 122 Z" fill="#FFFFFF" />

    {/* lapels, lying along the outside of the opening */}
    <path
      d="M 160 24 L 222 292 L 194 344 L 100 116 Z"
      fill="url(#suit-lapel)"
    />
    <path
      d="M 300 24 L 238 292 L 266 344 L 360 116 Z"
      fill="url(#suit-lapel)"
    />
    <path
      d="M 160 24 L 222 292 M 300 24 L 238 292"
      stroke="rgba(255,255,255,0.42)"
      strokeWidth="2.2"
      fill="none"
    />
    {/* jacket closure line and the two buttons */}
    <path
      d="M 230 300 L 238 900"
      stroke="rgba(255,255,255,0.16)"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="248" cy="352" r="9" fill="#1E2126" />
    <circle
      cx="248"
      cy="352"
      r="9"
      fill="none"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="1.6"
    />
    <circle cx="250" cy="428" r="9" fill="#1E2126" />
    <circle
      cx="250"
      cy="428"
      r="9"
      fill="none"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="1.6"
    />

    {/* arms hanging, forearms angling in, hands lost in the hip pockets */}
    <g>
      <path
        d="M 92 128 C 60 190 52 300 62 388 C 70 452 104 486 148 494"
        stroke="#0B0C0E"
        strokeWidth="86"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 368 128 C 400 190 408 300 398 388 C 390 452 356 486 312 494"
        stroke="#0B0C0E"
        strokeWidth="86"
        strokeLinecap="round"
        fill="none"
      />
      {/* the pocket openings the hands disappear into */}
      <path
        d="M 132 476 L 210 468 M 328 476 L 250 468"
        stroke="#000000"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 132 470 L 210 462 M 328 470 L 250 462"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* a sliver of white cuff at each wrist */}
      <path
        d="M 118 452 L 152 470"
        stroke="#E9EBED"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 342 452 L 308 470"
        stroke="#E9EBED"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </g>

    {/* hard rim light: both shoulders, then down the outer flanks */}
    <path
      d="M 160 26 L 120 80 Q 60 106 52 178"
      stroke="rgba(255,255,255,0.95)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 300 26 L 340 80 Q 400 106 408 178"
      stroke="rgba(255,255,255,0.95)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 62 196 C 44 320 36 560 30 900"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 398 196 C 416 320 424 560 430 900"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/**
 * The glowing white sphere that stands in for the head - a floating speech
 * bubble, tail and all. Anything passed as children sits inside it.
 */
export const GlowHead: React.FC<{
  size: number;
  /** Scales the halo, so a far-back figure in the crowd glows less. */
  halo?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ size, halo = 1, children, style }) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: size,
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    {/* the halo, drawn as a gradient so the pull back cannot band it */}
    <div
      style={{
        position: "absolute",
        left: -size * 1.2,
        top: -size * 1.2,
        width: size * 3.4,
        height: size * 3.4,
        borderRadius: size * 3.4,
        background: `radial-gradient(circle, rgba(255,255,255,${(
          0.95 * halo
        ).toFixed(2)}) 0%, rgba(255,255,255,${(0.42 * halo).toFixed(
          2,
        )}) 30%, rgba(216,232,255,${(0.14 * halo).toFixed(
          2,
        )}) 46%, rgba(216,232,255,0) 68%)`,
        pointerEvents: "none",
      }}
    />
    {/* the speech-bubble tail, tucked under the lower left of the sphere */}
    <div
      style={{
        position: "absolute",
        left: size * 0.12,
        top: size * 0.86,
        width: size * 0.19,
        height: size * 0.19,
        borderRadius: size,
        backgroundColor: "#FFFFFF",
      }}
    />
    {children}
  </div>
);
