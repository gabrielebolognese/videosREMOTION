import { RIBBON } from "../lib/tokens";

/** The two full diagonal sweeps, drawn as heavy strokes that can be drawn on. */
const BAND: Record<string, string> = {
  leftDown:
    "M -140 430 C 90 360, 300 620, 520 700 C 660 752, 760 800, 880 900",
  rightDown:
    "M 880 320 C 690 372, 616 700, 470 946 C 384 1092, 200 1180, -120 1206",
};

/** The wedges that hold at an edge, as filled shapes tapering to a point. */
const WEDGE: Record<string, string> = {
  wedgeLeft:
    "M -80 536 C 44 516, 136 558, 204 634 C 122 584, 26 588, -80 632 Z",
  wedgeRight:
    "M 800 676 C 676 654, 584 690, 516 764 C 598 716, 694 720, 800 772 Z",
  wedgeTopLeft:
    "M -80 218 C 44 194, 132 228, 196 300 C 118 254, 26 260, -80 306 Z",
};

/**
 * The emerald ribbon: a wide, smooth curved band sweeping diagonally through
 * the scene.
 *
 * Drawn as a heavy stroke along a bezier, with a paler inner stroke offset up
 * and left to give the band a turned edge. `sweep` draws it on.
 */
export const Ribbon: React.FC<{
  /** Which way it crosses the frame. */
  path: "leftDown" | "rightDown" | "wedgeLeft" | "wedgeRight" | "wedgeTopLeft";
  sweep?: number;
  width?: number;
  opacity?: number;
}> = ({ path, sweep = 1, width = 132, opacity = 1 }) => {
  const fill = `ribbon-${path}`;

  return (
    <svg
      width="720"
      height="1280"
      viewBox="0 0 720 1280"
      fill="none"
      style={{ position: "absolute", left: 0, top: 0, opacity }}
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#0B8B4A" />
          <stop offset="46%" stopColor={RIBBON} />
          <stop offset="100%" stopColor="#04562C" />
        </linearGradient>
      </defs>
      {path in WEDGE ? (
        /*
          A wedge is anchored off the frame edge and tapers to a point inside
          it. Drawing it as a round-capped stroke instead leaves a lozenge
          floating in the middle of the wall.
        */
        <g>
          <path d={WEDGE[path]} fill={`url(#${fill})`} />
          <path
            d={WEDGE[path]}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="6"
          />
        </g>
      ) : (
        <>
          <path
            d={BAND[path]}
            stroke={`url(#${fill})`}
            strokeWidth={width}
            strokeLinecap="round"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - sweep}
          />
          <path
            d={BAND[path]}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={width * 0.22}
            strokeLinecap="round"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - sweep}
            transform={`translate(0 ${(-width * 0.24).toFixed(1)})`}
          />
          <path
            d={BAND[path]}
            stroke="rgba(3,58,30,0.30)"
            strokeWidth={width * 0.16}
            strokeLinecap="round"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - sweep}
            transform={`translate(0 ${(width * 0.34).toFixed(1)})`}
          />
        </>
      )}
    </svg>
  );
};

/**
 * A four-lobed petal silhouette. These only ever appear heavily out of focus
 * in the foreground corners, so the shape is drawn simply and the blur is
 * applied by whatever is floating it.
 */
export const Petal: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <path
      d="M 100 100 C 100 40, 62 18, 40 40 C 18 62, 40 100, 100 100 C 40 100, 18 138, 40 160 C 62 182, 100 160, 100 100 C 100 160, 138 182, 160 160 C 182 138, 160 100, 100 100 C 160 100, 182 62, 160 40 C 138 18, 100 40, 100 100 Z"
      fill="#171B19"
    />
  </svg>
);

/**
 * The thin black dashed circle that draws itself clockwise around the trio.
 * Same trick as any dashed draw-on: the dash pattern is the artwork, so the
 * reveal has to happen through a mask whose own stroke is what animates.
 */
export const DashedRing: React.FC<{ size: number; progress: number }> = ({
  size,
  progress,
}) => (
  <svg width={size} height={size} viewBox="0 0 400 400" fill="none">
    <defs>
      <mask id="cafe-ring-draw">
        <circle
          cx="200"
          cy="200"
          r="184"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="20"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
          transform="rotate(-90 200 200)"
        />
      </mask>
    </defs>
    <g mask="url(#cafe-ring-draw)">
      <circle
        cx="200"
        cy="200"
        r="184"
        fill="none"
        stroke="#2B302D"
        strokeWidth="3"
        strokeDasharray="14 12"
      />
    </g>
  </svg>
);
