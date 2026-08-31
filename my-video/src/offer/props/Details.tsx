import { BLUE } from "../lib/tokens";

/**
 * The pale cream cable that snakes down the whole red frame in a long S.
 * Drawn at composition size so the curve can run off both ends.
 */
export const Cable: React.FC<{ sweep?: number }> = ({ sweep = 1 }) => {
  const d =
    "M 64 -60 C 156 152, 22 330, 82 520 C 144 702, 208 800, 146 980 C 100 1110, 42 1200, 74 1340";

  return (
    <svg width="720" height="1280" viewBox="0 0 720 1280" fill="none">
      <defs>
        <linearGradient id="cable-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B9B0A0" />
          <stop offset="34%" stopColor="#EFE8D8" />
          <stop offset="70%" stopColor="#DCD3C0" />
          <stop offset="100%" stopColor="#A79E8E" />
        </linearGradient>
      </defs>
      <path
        d={d}
        stroke="rgba(60,14,10,0.35)"
        strokeWidth="28"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - sweep}
        transform="translate(6 8)"
      />
      <path
        d={d}
        stroke="url(#cable-body)"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - sweep}
      />
      <path
        d={d}
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - sweep}
        transform="translate(-7 -2)"
      />
    </svg>
  );
};

/**
 * The thick dashed electric blue circle that draws itself around the banknote.
 *
 * A dash pattern cannot draw itself on with a dash offset - that is what the
 * pattern already uses - so the ring is revealed through a mask whose own
 * stroke is the thing being drawn.
 */
export const DashedRing: React.FC<{
  size: number;
  /** 0 to 1, how much of the ring has been drawn. */
  progress: number;
  /** Clockwise rotation of the finished ring, in degrees. */
  rotate?: number;
}> = ({ size, progress, rotate = 0 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none">
      <defs>
        <mask id="ring-draw">
          <circle
            cx="200"
            cy="200"
            r="176"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="48"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - progress}
            transform="rotate(-90 200 200)"
          />
        </mask>
      </defs>
      <g mask="url(#ring-draw)" transform={`rotate(${rotate} 200 200)`}>
        <circle
          cx="200"
          cy="200"
          r="176"
          fill="none"
          stroke={BLUE}
          strokeWidth="20"
          strokeLinecap="butt"
          strokeDasharray="30 22"
        />
      </g>
    </svg>
  );
};
