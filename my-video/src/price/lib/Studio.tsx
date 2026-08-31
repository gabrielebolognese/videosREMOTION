import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, GLIDE, spin } from "./motion";
import { BLACK, EDGE_GREY, HEIGHT, WHITE, WIDTH, fh, fw, sec } from "./tokens";

/**
 * The white set.
 *
 * It is not a white fill: it is one large white rounded rectangle laid over
 * pure black, so all four corners keep a concave black wedge. The plate is
 * oversized by 16px on every side, which is enough that the extremely slow
 * rotation can never swing a straight edge into frame - only the corner arcs
 * move, which is the whole point of the gesture.
 *
 * The rotation is driven by the absolute composition frame, so it runs
 * continuously underneath every cut instead of snapping back at each one.
 */
export const WhiteStage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="White stage" style={{ backgroundColor: BLACK }}>
      <AbsoluteFill
        style={{
          // 1.15 degrees across the whole piece, centred on zero.
          rotate: `${(-0.58 + spin(frame, 0.056)).toFixed(4)}deg`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -16,
            top: -16,
            width: WIDTH + 32,
            height: HEIGHT + 32,
            borderRadius: 190,
            backgroundColor: WHITE,
            // The gentle grey falloff the brief asks for near the edges. It has
            // to stay well under the corner arcs or the wedges lose their edge.
            backgroundImage: `radial-gradient(116% 76% at 50% 44%, ${WHITE} 0%, ${WHITE} 58%, #F5F5F5 84%, ${EDGE_GREY} 100%)`,
            // The soft glossy lip along the inside of the rounded edge.
            boxShadow: `inset 0 0 90px rgba(150,152,156,0.20), inset 0 0 26px rgba(168,170,174,0.16)`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** The dark set: pure black, nothing else. */
export const BlackStage: React.FC = () => (
  <AbsoluteFill name="Black stage" style={{ backgroundColor: BLACK }} />
);

const GRID_COLS = 7;
const GRID_ROWS = 9;
const GRID_LEFT = fw(6);
const GRID_CELL = (fw(94) - GRID_LEFT) / GRID_COLS;
const GRID_TOP = (HEIGHT - GRID_ROWS * GRID_CELL) / 2;

/**
 * The faint dashed guide grid that sits behind the objects on the white
 * scenes: seven by nine squares with a small filled dot at every intersection.
 * It fades out entirely across shot 4 and never returns.
 */
export const Grid: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => {
  if (opacity <= 0.001) {
    return null;
  }

  const xs = Array.from({ length: GRID_COLS + 1 }, (_, i) => GRID_LEFT + i * GRID_CELL);
  const ys = Array.from({ length: GRID_ROWS + 1 }, (_, i) => GRID_TOP + i * GRID_CELL);

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style={{ position: "absolute", left: 0, top: 0, opacity, pointerEvents: "none" }}
    >
      <g stroke="#9BA0A6" strokeWidth={1.3} strokeDasharray="6 8">
        {xs.map((x, i) => (
          <line key={`v${i}`} x1={x} y1={ys[0]} x2={x} y2={ys[GRID_ROWS]} />
        ))}
        {ys.map((y, i) => (
          <line key={`h${i}`} x1={xs[0]} y1={y} x2={xs[GRID_COLS]} y2={y} />
        ))}
      </g>
      <g fill="#8F949A">
        {xs.map((x) => ys.map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} />))}
      </g>
    </svg>
  );
};

/** A four-pointed sparkle, drawn about its own centre with concave sides. */
const sparklePath = (rx: number, ry: number, waist = 0.15) => {
  const kx = rx * waist;
  const ky = ry * waist;
  return (
    `M 0 ${-ry} C ${kx} ${-ky}, ${kx} ${-ky}, ${rx} 0 ` +
    `C ${kx} ${ky}, ${kx} ${ky}, 0 ${ry} ` +
    `C ${-kx} ${ky}, ${-kx} ${ky}, ${-rx} 0 ` +
    `C ${-kx} ${-ky}, ${-kx} ${-ky}, 0 ${-ry} Z`
  );
};

type Shape = {
  /** Where it sits once it has drifted all the way in. */
  x: number;
  y: number;
  rx: number;
  ry: number;
  /** Degrees at the start of the piece, and degrees per second. */
  rot: number;
  spin: number;
  /** How far out it starts, along the drift direction. */
  dx: number;
  dy: number;
};

const SHAPES: Shape[] = [
  { x: 692, y: 118, rx: 232, ry: 178, rot: -18, spin: 0.9, dx: 58, dy: -44 },
  { x: 34, y: 1168, rx: 256, ry: 196, rot: 14, spin: -0.7, dx: -64, dy: 50 },
];

/**
 * The blurred four-pointed sparkles crossing the top-right and bottom-left
 * corners. Everything else in the piece is in focus; these carry heavy
 * directional smear, so the blur lives on the same group as the rotation and
 * is dragged around with it - the smear always runs along the long axis.
 */
export const Sparkles: React.FC<{
  color: string;
  /** Prefix for the filter ids: SVG ids are document-global. */
  id: string;
  opacity?: number;
  /** Seconds the drift inward is measured from, so it restarts per set. */
  from?: number;
  span?: number;
}> = ({ color, id, opacity = 1, from = 0, span = 12 }) => {
  const frame = useCurrentFrame();

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style={{ position: "absolute", left: 0, top: 0, opacity, pointerEvents: "none" }}
    >
      <defs>
        {SHAPES.map((_s, i) => (
          <filter
            key={i}
            id={`${id}-smear-${i}`}
            x="-140%"
            y="-140%"
            width="380%"
            height="380%"
          >
            <feGaussianBlur stdDeviation="34 13" />
          </filter>
        ))}
      </defs>

      {SHAPES.map((s, i) => {
        // The drift inward: a long, even glide that never quite arrives.
        const t = interpolate(frame, [sec(from), sec(from + span)], [1, 0], {
          ...CLAMP,
          easing: GLIDE,
        });
        return (
          <g
            key={i}
            transform={`translate(${(s.x + s.dx * t).toFixed(2)} ${(s.y + s.dy * t).toFixed(2)}) rotate(${(s.rot + spin(frame, s.spin)).toFixed(3)})`}
            filter={`url(#${id}-smear-${i})`}
          >
            <path d={sparklePath(s.rx, s.ry)} fill={color} />
          </g>
        );
      })}
    </svg>
  );
};

/**
 * The soft dark radial glow that sits behind a caption block on the black
 * scenes, so white type never floats on an unbroken void.
 */
export const CaptionGlow: React.FC<{
  /** Centre of the glow, as a percentage of frame height. */
  at: number;
  color?: string;
  strength?: number;
}> = ({ at, color = "232,0,1", strength = 0.42 }) => (
  <AbsoluteFill
    style={{
      backgroundImage: `radial-gradient(58% 22% at 50% ${((fh(at) / HEIGHT) * 100).toFixed(2)}%, rgba(${color},${strength}) 0%, rgba(${color},${(strength * 0.34).toFixed(3)}) 42%, rgba(${color},0) 78%)`,
      pointerEvents: "none",
    }}
  />
);
