// Cheap isometric projection: x runs right along the keyboard, y runs away
// from camera. Everything is baked into the SVG so no CSS 3D is needed.
const px = (x: number, y: number) => 40 + x * 1 + y * 0.36;
const py = (x: number, y: number) => 342 - x * 0.1 - y * 0.58;

const quad = (
  x: number,
  y: number,
  w: number,
  d: number,
  lift: number,
): string =>
  [
    `${px(x, y)},${py(x, y) - lift}`,
    `${px(x + w, y)},${py(x + w, y) - lift}`,
    `${px(x + w, y + d)},${py(x + w, y + d) - lift}`,
    `${px(x, y + d)},${py(x, y + d) - lift}`,
  ].join(" ");

const frontFace = (x: number, y: number, w: number, lift: number): string =>
  [
    `${px(x, y)},${py(x, y) - lift}`,
    `${px(x + w, y)},${py(x + w, y) - lift}`,
    `${px(x + w, y)},${py(x + w, y)}`,
    `${px(x, y)},${py(x, y)}`,
  ].join(" ");

const rightFace = (
  x: number,
  y: number,
  d: number,
  lift: number,
): string =>
  [
    `${px(x, y)},${py(x, y) - lift}`,
    `${px(x, y + d)},${py(x, y + d) - lift}`,
    `${px(x, y + d)},${py(x, y + d)}`,
    `${px(x, y)},${py(x, y)}`,
  ].join(" ");

const ROWS = [0, 1, 2, 3, 4];
const COLS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const RED_KEYS = ["0-0", "4-13", "2-6"];

/** Photoreal-leaning black mechanical keyboard on a small wooden riser leg. */
export const MechanicalKeyboard: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * (430 / 780)}
      viewBox="0 0 780 430"
      fill="none"
    >
      <defs>
        <linearGradient id="kbtop" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#26292D" />
          <stop offset="100%" stopColor="#101315" />
        </linearGradient>
        <linearGradient id="kbwood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B98450" />
          <stop offset="55%" stopColor="#8E5F33" />
          <stop offset="100%" stopColor="#5F3E20" />
        </linearGradient>
        <linearGradient id="kbcap" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#3A3F44" />
          <stop offset="100%" stopColor="#1E2226" />
        </linearGradient>
        <linearGradient id="kbcapred" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#FF4B52" />
          <stop offset="100%" stopColor="#B00C14" />
        </linearGradient>
      </defs>

      {/* contact shadow */}
      <ellipse cx="380" cy="368" rx="300" ry="30" fill="rgba(60,45,30,0.18)" />

      {/* wooden riser leg under the back edge */}
      <polygon
        points={`${px(490, 236)},${py(490, 236) + 4} ${px(560, 236)},${
          py(560, 236) + 4
        } ${px(560, 236)},${py(560, 236) + 34} ${px(490, 236)},${
          py(490, 236) + 34
        }`}
        fill="url(#kbwood)"
      />
      <polygon
        points={`${px(490, 236)},${py(490, 236) + 4} ${px(490, 260)},${
          py(490, 260) + 4
        } ${px(490, 260)},${py(490, 260) + 34} ${px(490, 236)},${
          py(490, 236) + 34
        }`}
        fill="#4A3018"
      />

      {/* keyboard body: side walls then top plate */}
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
      <polygon points={quad(0, 0, 600, 236, 0)} fill="url(#kbtop)" />
      <polygon
        points={quad(0, 0, 600, 236, 0)}
        fill="none"
        stroke="rgba(255,255,255,0.24)"
        strokeWidth="2"
      />

      {/* keycaps */}
      {ROWS.map((r) =>
        COLS.map((c) => {
          const x = 16 + c * 40;
          const y = 20 + r * 40;
          const red = RED_KEYS.includes(`${r}-${c}`);
          return (
            <g key={`${r}-${c}`}>
              <polygon
                points={frontFace(x, y, 34, 13)}
                fill={red ? "#7E080E" : "#121517"}
              />
              <polygon
                points={rightFace(x + 34, y, 34, 13)}
                fill={red ? "#950A11" : "#191D20"}
              />
              <polygon
                points={quad(x, y, 34, 34, 13)}
                fill={red ? "url(#kbcapred)" : "url(#kbcap)"}
              />
              <polygon
                points={quad(x + 6, y + 6, 22, 22, 14)}
                fill="rgba(255,255,255,0.055)"
              />
            </g>
          );
        }),
      )}

      {/* hard specular running along the front lip */}
      <polyline
        points={`${px(6, 0)},${py(6, 0) + 5} ${px(594, 0)},${py(594, 0) + 5}`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
};
