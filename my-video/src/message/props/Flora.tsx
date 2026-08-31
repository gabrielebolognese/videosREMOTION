import { AMBER, BURGUNDY, LILAC } from "../lib/tokens";

/**
 * One mallow flower: five notched petals, a pale throat and the dark veins
 * that run out of it. Drawn once and rotated into the clusters, so the whole
 * garden is a single shape seen from several angles.
 */
export const Mallow: React.FC<{ size: number; rotate?: number }> = ({
  size,
  rotate = 0,
}) => {
  const id = "mallow";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      style={{ rotate: `${rotate}deg` }}
    >
      <defs>
        <radialGradient id={`${id}-petal`} cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%" stopColor="#F3E4FA" />
          <stop offset="42%" stopColor="#C9A0E4" />
          <stop offset="100%" stopColor={LILAC} />
        </radialGradient>
      </defs>

      {[0, 72, 144, 216, 288].map((deg) => (
        <g key={deg} style={{ rotate: `${deg}deg`, transformOrigin: "100px 100px" }}>
          <path
            d="M 100 100
               C 78 88, 62 66, 62 44
               C 62 22, 78 8, 94 12
               C 98 4, 106 4, 110 12
               C 126 8, 142 22, 142 44
               C 142 66, 124 88, 100 100 Z"
            fill={`url(#${id}-petal)`}
          />
          <path
            d="M 100 96 C 96 74, 92 52, 88 30 M 100 96 C 104 74, 108 52, 112 30"
            stroke="rgba(110,50,150,0.34)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ))}

      {/* throat and stamen column */}
      <circle cx="100" cy="100" r="20" fill="#F6ECFB" />
      <circle cx="100" cy="100" r="11" fill={BURGUNDY} opacity="0.55" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={100 + Math.cos((deg * Math.PI) / 180) * 15}
          cy={100 + Math.sin((deg * Math.PI) / 180) * 15}
          r="3.4"
          fill={AMBER}
        />
      ))}
    </svg>
  );
};

/** The tiny white blossoms that fill the gaps between the mallows. */
export const Blossom: React.FC<{ size: number; rotate?: number }> = ({
  size,
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    style={{ rotate: `${rotate}deg` }}
  >
    {[0, 72, 144, 216, 288].map((deg) => (
      <ellipse
        key={deg}
        cx="50"
        cy="28"
        rx="16"
        ry="22"
        fill="#FFFFFF"
        stroke="rgba(150,130,160,0.22)"
        strokeWidth="2"
        style={{ rotate: `${deg}deg`, transformOrigin: "50px 50px" }}
      />
    ))}
    <circle cx="50" cy="50" r="9" fill={AMBER} opacity="0.85" />
  </svg>
);

type Bloom = {
  x: number;
  y: number;
  size: number;
  rot: number;
  /** A blossom instead of a mallow. */
  small?: boolean;
};

/**
 * A cluster of blooms, laid out by hand rather than scattered randomly - the
 * corners of these shots want a deliberate asymmetric spray, and a random
 * seed would change every time the file is touched.
 */
export const MallowCluster: React.FC<{
  scale?: number;
  blooms?: Bloom[];
}> = ({ scale = 1, blooms }) => {
  const set: Bloom[] =
    blooms ?? [
      { x: 0, y: 34, size: 128, rot: -12 },
      { x: 96, y: 0, size: 96, rot: 24 },
      { x: 58, y: 116, size: 78, rot: 8 },
      { x: 166, y: 74, size: 54, rot: -30, small: true },
      { x: 24, y: 148, size: 40, rot: 16, small: true },
      { x: 138, y: 6, size: 34, rot: -8, small: true },
    ];

  return (
    <div style={{ position: "relative", scale, transformOrigin: "0 0" }}>
      {set.map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x, top: b.y }}>
          {b.small ? (
            <Blossom size={b.size} rotate={b.rot} />
          ) : (
            <Mallow size={b.size} rotate={b.rot} />
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * The hummingbird that crosses the third shot. Wings are drawn as two blurred
 * fans rather than as feathers, which is what a real one gives a camera, and
 * the whole bird is small enough that the silhouette does the work.
 */
export const Hummingbird: React.FC<{ width: number }> = ({ width }) => {
  const id = "hummer";

  return (
    <svg
      width={width}
      height={width * (140 / 220)}
      viewBox="0 0 220 140"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#8FD8C6" />
          <stop offset="46%" stopColor="#4FA894" />
          <stop offset="100%" stopColor="#2C6B60" />
        </linearGradient>
      </defs>

      {/* the far wing, swept back and half transparent */}
      <path
        d="M 108 62 C 128 34, 168 16, 200 20 C 186 44, 154 66, 118 74 Z"
        fill={LILAC}
        opacity="0.42"
      />
      {/* body, head and the long straight bill */}
      <path
        d="M 96 58
           C 72 52, 50 56, 38 68
           C 26 80, 30 96, 48 100
           C 70 106, 98 98, 112 82
           C 122 70, 116 60, 96 58 Z"
        fill={`url(#${id}-body)`}
      />
      <circle cx="52" cy="72" r="17" fill={`url(#${id}-body)`} />
      <circle cx="46" cy="68" r="3.6" fill="#12201E" />
      <path
        d="M 36 74 L 2 84"
        stroke="#1D2A28"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* the gorget */}
      <path
        d="M 44 84 C 56 90, 70 92, 82 88 L 76 100 C 62 102, 50 98, 42 92 Z"
        fill={BURGUNDY}
        opacity="0.8"
      />
      {/* tail */}
      <path
        d="M 108 84 L 156 104 L 150 114 L 104 96 Z M 106 92 L 148 122 L 138 128 L 100 100 Z"
        fill="#2C6B60"
      />
      {/* the near wing, caught on the upstroke */}
      <path
        d="M 102 66 C 118 92, 152 118, 186 124 C 176 96, 148 72, 112 60 Z"
        fill={LILAC}
        opacity="0.62"
      />
    </svg>
  );
};
