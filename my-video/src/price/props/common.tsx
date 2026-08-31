import React from "react";

/**
 * The soft short contact shadow every hero object floats on. The key is broad
 * and comes from top-front, so the shadow sits almost directly underneath and
 * stays short - never the long hard shadow the brief rules out.
 */
export const ContactShadow: React.FC<{
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  opacity?: number;
  blur?: number;
}> = ({ cx, cy, rx, ry, opacity = 0.24, blur = 26 }) => (
  <ellipse
    cx={cx}
    cy={cy}
    rx={rx}
    ry={ry}
    fill="#767B82"
    opacity={opacity}
    style={{ filter: `blur(${blur}px)` }}
  />
);

/**
 * Brushed chrome. Two ramps: a flat one for rims and straight runs, and a
 * radial one for anything turned on a lathe - the dial, the coin faces. The
 * subtle rim from the upper right lives in the stop positions.
 */
export const ChromeDefs: React.FC<{ id: string }> = ({ id }) => (
  <>
    <linearGradient id={`${id}-chrome`} x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stopColor="#FDFDFD" />
      <stop offset="18%" stopColor="#B4B8BD" />
      <stop offset="38%" stopColor="#F2F3F5" />
      <stop offset="58%" stopColor="#8E939A" />
      <stop offset="80%" stopColor="#E4E6E9" />
      <stop offset="100%" stopColor="#A8ADB3" />
    </linearGradient>
    <radialGradient id={`${id}-disc`} cx="0.36" cy="0.28" r="0.86">
      <stop offset="0%" stopColor="#FBFBFC" />
      <stop offset="26%" stopColor="#D3D7DC" />
      <stop offset="56%" stopColor="#9EA3AA" />
      <stop offset="82%" stopColor="#E2E5E9" />
      <stop offset="100%" stopColor="#8E939A" />
    </radialGradient>
    {/* The fine brushed grain that separates chrome from plain grey. */}
    <pattern
      id={`${id}-brush`}
      width="6"
      height="6"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(28)"
    >
      <path d="M 0 0 L 0 6" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
      <path d="M 3 0 L 3 6" stroke="rgba(70,76,84,0.22)" strokeWidth="0.7" />
    </pattern>
  </>
);

/** The broad soft specular the key leaves on a glossy face. */
export const Specular: React.FC<{
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate?: number;
  opacity?: number;
  blur?: number;
}> = ({ cx, cy, rx, ry, rotate = 0, opacity = 0.42, blur = 14 }) => (
  <ellipse
    cx={cx}
    cy={cy}
    rx={rx}
    ry={ry}
    fill="#FFFFFF"
    opacity={opacity}
    transform={`rotate(${rotate} ${cx} ${cy})`}
    style={{ filter: `blur(${blur}px)` }}
  />
);
