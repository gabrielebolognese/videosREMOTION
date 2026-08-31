import React from "react";

// Cheap isometric projection: x runs right along the keyboard, y runs away
// from camera. Everything is baked into the SVG, so no CSS 3D is needed.
const px = (x: number, y: number) => 44 + x + y * 0.36;
const py = (x: number, y: number) => 344 - x * 0.1 - y * 0.58;

const quad = (x: number, y: number, w: number, d: number, lift: number) =>
  [
    `${px(x, y)},${py(x, y) - lift}`,
    `${px(x + w, y)},${py(x + w, y) - lift}`,
    `${px(x + w, y + d)},${py(x + w, y + d) - lift}`,
    `${px(x, y + d)},${py(x, y + d) - lift}`,
  ].join(" ");

const frontFace = (x: number, y: number, w: number, lift: number) =>
  [
    `${px(x, y)},${py(x, y) - lift}`,
    `${px(x + w, y)},${py(x + w, y) - lift}`,
    `${px(x + w, y)},${py(x + w, y)}`,
    `${px(x, y)},${py(x, y)}`,
  ].join(" ");

const rightFace = (x: number, y: number, d: number, lift: number) =>
  [
    `${px(x, y)},${py(x, y) - lift}`,
    `${px(x, y + d)},${py(x, y + d) - lift}`,
    `${px(x, y + d)},${py(x, y + d)}`,
    `${px(x, y)},${py(x, y)}`,
  ].join(" ");

const ROWS = [0, 1, 2, 3, 4];
const COLS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

/**
 * Black mechanical keyboard with a full rainbow RGB backlight. `phase` shifts
 * the hue ramp, so the scene can crawl the colour slowly left to right across
 * the keys without the artwork knowing anything about time.
 */
export const RgbKeyboard: React.FC<{ width: number; phase: number }> = ({
  width,
  phase,
}) => (
  <svg
    width={width}
    height={width * (430 / 780)}
    viewBox="0 0 780 430"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="rgb-top" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#26292D" />
        <stop offset="100%" stopColor="#0E1113" />
      </linearGradient>
      <linearGradient id="rgb-cap" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#33383D" />
        <stop offset="100%" stopColor="#15181B" />
      </linearGradient>
      <filter id="rgb-bleed" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>

    {/* the one contact shadow the flat world allows */}
    <ellipse cx="392" cy="372" rx="320" ry="30" fill="rgba(40,40,44,0.22)" />

    {/* chassis */}
    <polygon points={frontFace(0, 0, 600, 0)} fill="#08090A" />
    <polygon
      points={[
        `${px(0, 0)},${py(0, 0)}`,
        `${px(600, 0)},${py(600, 0)}`,
        `${px(600, 0)},${py(600, 0) + 26}`,
        `${px(0, 0)},${py(0, 0) + 26}`,
      ].join(" ")}
      fill="#0A0C0D"
    />
    <polygon
      points={[
        `${px(600, 0)},${py(600, 0)}`,
        `${px(600, 236)},${py(600, 236)}`,
        `${px(600, 236)},${py(600, 236) + 26}`,
        `${px(600, 0)},${py(600, 0) + 26}`,
      ].join(" ")}
      fill="#141719"
    />
    <polygon points={quad(0, 0, 600, 236, 0)} fill="url(#rgb-top)" />

    {/* the RGB wash bleeding out from under the caps */}
    <g filter="url(#rgb-bleed)" opacity={0.95}>
      {ROWS.map((r) =>
        COLS.map((c) => {
          const x = 16 + c * 40;
          const y = 20 + r * 40;
          const hue = (c / COLS.length) * 320 + r * 6 + phase;
          return (
            <polygon
              key={`g${r}-${c}`}
              points={quad(x - 4, y - 4, 42, 42, 9)}
              fill={`hsl(${hue % 360} 96% 58%)`}
            />
          );
        }),
      )}
    </g>

    {/* keycaps, dark on top with a lit legend slot */}
    {ROWS.map((r) =>
      COLS.map((c) => {
        const x = 16 + c * 40;
        const y = 20 + r * 40;
        const hue = (c / COLS.length) * 320 + r * 6 + phase;
        return (
          <g key={`${r}-${c}`}>
            <polygon points={frontFace(x, y, 34, 13)} fill="#101315" />
            <polygon points={rightFace(x + 34, y, 34, 13)} fill="#191D20" />
            <polygon points={quad(x, y, 34, 34, 13)} fill="url(#rgb-cap)" />
            <polygon
              points={quad(x + 9, y + 10, 16, 15, 14)}
              fill={`hsl(${hue % 360} 96% 66%)`}
              opacity={0.92}
            />
            <polygon
              points={quad(x + 5, y + 5, 24, 24, 14)}
              fill="#FFFFFF"
              opacity={0.05}
            />
          </g>
        );
      }),
    )}

    {/* hard specular along the front lip */}
    <polyline
      points={`${px(6, 0)},${py(6, 0) + 5} ${px(594, 0)},${py(594, 0) + 5}`}
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="2.5"
      fill="none"
    />
  </svg>
);
