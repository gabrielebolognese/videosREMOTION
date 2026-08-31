import React from "react";
import { AbsoluteFill } from "remotion";
import { BLUEPRINT, GRAY, HEIGHT, PAPER, WIDTH } from "./tokens";

/**
 * The blueprint furniture: a faint construction lattice across the middle of
 * the plane and four small crop marks just inside the corners. Setup marks,
 * not content - they sit a hair above the paper and never compete with type.
 */
const Blueprint: React.FC<{ opacity: number }> = ({ opacity }) => {
  const xs = [60, 180, 300, 420, 540, 660];
  const ys = [200, 320, 440, 560, 680, 800, 920, 1040];

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style={{ position: "absolute", left: 0, top: 0, opacity }}
    >
      <g stroke={BLUEPRINT} strokeWidth={1} opacity={0.7}>
        {xs.map((x) => (
          <line key={`v${x}`} x1={x} y1={160} x2={x} y2={1120} />
        ))}
        {ys.map((y) => (
          <line key={`h${y}`} x1={40} y1={y} x2={680} y2={y} />
        ))}
      </g>
      {/* crop marks, just inside each corner */}
      <g stroke="#B4B4B4" strokeWidth={2}>
        <path d="M 40 84 h 34 M 40 84 v 34" fill="none" />
        <path d="M 680 84 h -34 M 680 84 v 34" fill="none" />
        <path d="M 40 1196 h 34 M 40 1196 v -34" fill="none" />
        <path d="M 680 1196 h -34 M 680 1196 v -34" fill="none" />
      </g>
    </svg>
  );
};

/** The small black barcode block that holds in the top right of world A. */
export const Barcode: React.FC<{ x?: number; y?: number }> = ({
  x = 566,
  y = 64,
}) => {
  const bars = [4, 2, 6, 2, 3, 8, 2, 4, 2, 7, 3, 2, 5, 2, 4, 6, 2, 3];
  let cursor = 0;

  return (
    <svg
      width={116}
      height={62}
      viewBox="0 0 116 62"
      style={{ position: "absolute", left: x, top: y }}
    >
      {bars.map((w, i) => {
        const bx = cursor;
        cursor += w + 2;
        return i % 2 === 0 ? (
          <rect key={i} x={bx} y={0} width={w} height={44} fill="#000000" />
        ) : null;
      })}
      <rect x={0} y={52} width={92} height={6} fill="#000000" opacity={0.55} />
    </svg>
  );
};

/**
 * The oversized pale grey graphic that drifts through world A: a heavy curved
 * band that in the "sweep" reading resolves into a ring and stem, and in the
 * "diagonal" reading just crosses the frame corner to corner.
 */
const Band: React.FC<{ variant: "sweep" | "diagonal"; drift: number }> = ({
  variant,
  drift,
}) => (
  <AbsoluteFill
    style={{
      translate: `${(drift * 34).toFixed(2)}px ${(drift * -22).toFixed(2)}px`,
    }}
  >
    <svg width={WIDTH} height={HEIGHT} viewBox="0 0 720 1280" fill="none">
      {variant === "sweep" ? (
        <>
          <circle
            cx={604}
            cy={268}
            r={182}
            stroke={GRAY}
            strokeWidth={148}
            fill="none"
          />
          <path
            d="M -170 1330 C 60 1040, 210 730, 474 402"
            stroke={GRAY}
            strokeWidth={148}
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <path
          d="M -160 1060 C 150 900, 300 700, 880 300"
          stroke={GRAY}
          strokeWidth={150}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  </AbsoluteFill>
);

/**
 * World A: the clean off-white seamless plane. Flat, even, shadowless key -
 * the only modelling in the whole world is the contact shadow each floating
 * object carries with it.
 */
export const WorldA: React.FC<{
  /** 0..1 over the whole piece, so the band never resets at a cut. */
  drift?: number;
  band?: "sweep" | "diagonal" | "none";
  blueprint?: number;
  barcode?: boolean;
}> = ({ drift = 0, band = "sweep", blueprint = 1, barcode = false }) => (
  <AbsoluteFill name="World A" style={{ backgroundColor: PAPER }}>
    {band === "none" ? null : <Band variant={band} drift={drift} />}
    {blueprint > 0 ? <Blueprint opacity={blueprint} /> : null}
    {barcode ? <Barcode /> : null}
  </AbsoluteFill>
);

/**
 * World B: the pure black void. A single soft radial lift behind centre frame
 * stands in for the hard rim light's spill; everything else falls to black.
 */
export const WorldB: React.FC<{ lift?: number; cy?: number }> = ({
  lift = 1,
  cy = 46,
}) => (
  <AbsoluteFill name="World B" style={{ backgroundColor: "#000000" }}>
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(52% 32% at 50% ${cy}%, rgba(255,255,255,${(
          0.1 * lift
        ).toFixed(3)}) 0%, rgba(255,255,255,0) 100%)`,
      }}
    />
  </AbsoluteFill>
);

/**
 * A thin wireframe selection box with corner handles - the same device in
 * shot 4 (around the clown) and shot 5 (around the dartboard), in ink on the
 * paper world and in white on the black one.
 */
export const WireBox: React.FC<{
  size: number;
  color: string;
  handle?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}> = ({ size, color, handle = 13, strokeWidth = 1.6, style }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    style={{ overflow: "visible", ...style }}
  >
    <rect
      x={0}
      y={0}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    {[
      [0, 0],
      [size, 0],
      [0, size],
      [size, size],
    ].map(([hx, hy], i) => (
      <rect
        key={i}
        x={hx - handle / 2}
        y={hy - handle / 2}
        width={handle}
        height={handle}
        fill={color}
      />
    ))}
    {/* midpoint ticks, so the box reads as a live selection */}
    {[
      [size / 2, 0],
      [size / 2, size],
      [0, size / 2],
      [size, size / 2],
    ].map(([hx, hy], i) => (
      <rect
        key={`m${i}`}
        x={hx - handle / 2.6}
        y={hy - handle / 2.6}
        width={handle / 1.3}
        height={handle / 1.3}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    ))}
  </svg>
);
