import React from "react";

/**
 * The soft grounded shadow every prop sits on. Key is upper left, so the
 * shadow falls to the lower right.
 */
export const ContactShadow: React.FC<{
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  opacity?: number;
  blur?: number;
}> = ({ cx, cy, rx, ry, opacity = 0.26, blur = 26 }) => (
  <ellipse
    cx={cx}
    cy={cy}
    rx={rx}
    ry={ry}
    fill="#8C8B87"
    opacity={opacity}
    style={{ filter: `blur(${blur}px)` }}
  />
);

/**
 * Black lacquer. A broad soft key from the upper left gives these props a long
 * vertical specular streak down one side and a lifted rim along the top.
 */
export const LacquerDefs: React.FC<{ id: string; angle?: number }> = ({ id, angle = 12 }) => (
  <defs>
    <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0" gradientTransform={`rotate(${angle} 0.5 0.5)`}>
      <stop offset="0%" stopColor="#0B0B0B" />
      <stop offset="16%" stopColor="#3E3E3E" />
      <stop offset="30%" stopColor="#151515" />
      <stop offset="62%" stopColor="#0D0D0D" />
      <stop offset="84%" stopColor="#4A4A4A" />
      <stop offset="100%" stopColor="#141414" />
    </linearGradient>
    <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F2F2F2" />
      <stop offset="26%" stopColor="#9C9C9C" />
      <stop offset="52%" stopColor="#E8E8E8" />
      <stop offset="74%" stopColor="#6A6A6A" />
      <stop offset="100%" stopColor="#D2D2D2" />
    </linearGradient>
    <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#6E6E6E" />
      <stop offset="40%" stopColor="#1A1A1A" />
      <stop offset="100%" stopColor="#0A0A0A" />
    </linearGradient>
    <radialGradient id={`${id}-sphere`} cx="0.34" cy="0.28" r="0.82">
      <stop offset="0%" stopColor="#8E8E8E" />
      <stop offset="24%" stopColor="#2A2A2A" />
      <stop offset="68%" stopColor="#0C0C0C" />
      <stop offset="100%" stopColor="#242424" />
    </radialGradient>
  </defs>
);

/** The long vertical specular streak that reads as glossy lacquer. */
export const Specular: React.FC<{
  x: number;
  y: number;
  rx: number;
  ry: number;
  opacity?: number;
  blur?: number;
  rotate?: number;
}> = ({ x, y, rx, ry, opacity = 0.55, blur = 5, rotate = 0 }) => (
  <ellipse
    cx={x}
    cy={y}
    rx={rx}
    ry={ry}
    fill="#FFFFFF"
    opacity={opacity}
    transform={`rotate(${rotate} ${x} ${y})`}
    style={{ filter: `blur(${blur}px)` }}
  />
);

/** A dashed lattice patch, used inside the magnifying glass lens. */
export const GridPatch: React.FC<{ size: number; step: number; colour?: string }> = ({
  size,
  step,
  colour = "#C7C6C1",
}) => {
  const n = Math.ceil(size / step);
  const lines = Array.from({ length: n + 1 }, (_, i) => -size / 2 + i * step);
  return (
    <g stroke={colour} strokeWidth={2.2} strokeDasharray="13 17" opacity={0.7}>
      {lines.map((v, i) => (
        <React.Fragment key={i}>
          <line x1={v} y1={-size / 2} x2={v} y2={size / 2} />
          <line x1={-size / 2} y1={v} x2={size / 2} y2={v} />
        </React.Fragment>
      ))}
    </g>
  );
};
