import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT } from "../lib/Studio";
import { CHARCOAL, LIME, RED } from "../lib/tokens";

/**
 * A flat solid black pictogram of a generic medical professional: round head,
 * shoulders, and a stethoscope drawn as an outline across the chest.
 */
export const DoctorIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="54" r="36" fill={CHARCOAL} />
    <path
      d="M 100 98 C 58 98, 30 126, 26 178 C 26 186, 30 190, 38 190 L 162 190 C 170 190, 174 186, 174 178 C 170 126, 142 98, 100 98 Z"
      fill={CHARCOAL}
    />
    {/* the coat opening, cut back out of the shoulders */}
    <path d="M 84 100 L 100 140 L 116 100 L 108 96 L 92 96 Z" fill="#FAFAFA" />
    {/* stethoscope: the yoke round the neck, tubing down, chestpiece */}
    <path
      d="M 78 104 C 70 132, 74 156, 92 166 C 108 174, 122 166, 126 150"
      stroke="#FAFAFA"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 122 104 C 128 124, 128 140, 126 150"
      stroke="#FAFAFA"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="128" cy="158" r="13" fill="none" stroke="#FAFAFA" strokeWidth="7" />
  </svg>
);

/**
 * A dark rounded-square tile holding a white line-art clinic building with a
 * cross above the entrance.
 */
export const ClinicTile: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <rect x="0" y="0" width="200" height="200" rx="42" fill={CHARCOAL} />
    <g stroke="#FAFAFA" strokeWidth="7" fill="none" strokeLinejoin="round">
      <path d="M 44 156 L 44 78 L 100 48 L 156 78 L 156 156 Z" />
      <path d="M 28 156 L 172 156" strokeLinecap="round" />
      <path d="M 86 156 L 86 118 L 114 118 L 114 156" />
      <path d="M 64 96 L 78 96 M 122 96 L 136 96" strokeLinecap="round" />
      <path d="M 100 66 L 100 96 M 86 81 L 114 81" strokeLinecap="round" />
    </g>
  </svg>
);

/**
 * The scalloped red badge that stamps onto the card: three small white stars
 * over short white capitals.
 */
const starPath = (cx: number, cy: number, outer: number) => {
  const inner = outer * 0.42;
  return (
    Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      return `${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`;
    }).join(" L ") + " Z"
  );
};

export const TrustBadge: React.FC<{ size: number; label: string }> = ({
  size,
  label,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    {/* the scallop, made of overlapping discs around the rim */}
    {Array.from({ length: 22 }, (_, i) => {
      const a = (i / 22) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={100 + Math.cos(a) * 88}
          cy={100 + Math.sin(a) * 88}
          r="14"
          fill={RED}
        />
      );
    })}
    <circle cx="100" cy="100" r="88" fill={RED} />
    <circle
      cx="100"
      cy="100"
      r="74"
      fill="none"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="3"
    />
    {[68, 100, 132].map((cx) => (
      <path key={cx} d={`M ${starPath(cx, 74, 15)}`} fill="#FFFFFF" />
    ))}
    <text
      x="100"
      y="128"
      fill="#FFFFFF"
      fontFamily="Oswald"
      fontWeight="700"
      fontSize="27"
      letterSpacing="2.5"
      textAnchor="middle"
    >
      {label}
    </text>
  </svg>
);

/**
 * A hand-drawn thin black arrow that draws itself on, loops once, and points
 * where it is told. `progress` runs 0 to 1.
 */
export const CurlyArrow: React.FC<{
  width: number;
  progress: number;
  /** Mirrors the loop so the same drawing can point down-left or down-right. */
  flip?: boolean;
}> = ({ width, progress, flip = false }) => {
  const d =
    "M 12 18 C 74 6, 128 22, 132 58 C 135 84, 108 96, 92 82 C 78 70, 88 48, 110 50 C 148 54, 168 96, 150 138";

  return (
    <svg
      width={width}
      height={width * (170 / 190)}
      viewBox="0 0 190 170"
      fill="none"
      style={{ scale: flip ? "-1 1" : undefined }}
    >
      <path
        d={d}
        stroke="#141414"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
      />
      {/* the head only appears once the shaft has finished drawing */}
      <path
        d="M 128 116 L 150 140 L 168 112"
        stroke="#141414"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={interpolate(progress, [0.86, 1], [0, 1], CLAMP)}
      />
    </svg>
  );
};

/** Convenience wrapper: the arrow drawing itself from a given frame. */
export const DrawnArrow: React.FC<{
  x: number;
  y: number;
  width: number;
  start: number;
  frames?: number;
  rotate?: number;
  flip?: boolean;
}> = ({ x, y, width, start, frames = 18, rotate = 0, flip = false }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        rotate: `${rotate}deg`,
      }}
    >
      <CurlyArrow
        width={width}
        flip={flip}
        progress={interpolate(frame, [start, start + frames], [0, 1], {
          ...CLAMP,
          easing: OUT,
        })}
      />
    </div>
  );
};

/** The four connected dots that make the little lime zigzag mark. */
export const DotMark: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 200 124" fill="none">
    <path
      d="M 22 96 L 74 28 L 126 96 L 178 28"
      stroke={LIME}
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {[
      [22, 96],
      [74, 28],
      [126, 96],
      [178, 28],
    ].map(([cx, cy]) => (
      <circle key={cx} cx={cx} cy={cy} r="17" fill={LIME} />
    ))}
  </svg>
);

/** The two organic lime shapes that slide in over the bottom-right corner. */
export const LimeBlobs: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" fill="none">
    <path
      d="M 118 214 C 150 142, 244 116, 306 152 C 372 190, 392 282, 350 340 C 306 400, 206 404, 156 356 C 110 312, 96 264, 118 214 Z"
      fill={LIME}
    />
    <circle cx="98" cy="332" r="74" fill={LIME} />
  </svg>
);
