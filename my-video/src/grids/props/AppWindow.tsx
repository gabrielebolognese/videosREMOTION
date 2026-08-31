import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OVERSHOOT, SETTLE } from "../lib/Wall";
import {
  CLAY,
  DOT_AMBER,
  DOT_GREEN,
  DOT_RED,
  INK,
  NAVY,
  RED,
  RED_DEEP,
  WHITE,
  sec,
} from "../lib/tokens";

/** The four white tool icons on the left rail, drawn as paths so the rail
 *  never depends on a webfont having loaded. */
const RailIcons: React.FC = () => (
  <g fill={WHITE}>
    {/* capital T */}
    <rect x="22" y="70" width="30" height="6" rx="2" />
    <rect x="34" y="70" width="6" height="26" rx="2" />
    {/* pencil */}
    <path d="M 46 126 L 52 132 L 33 151 L 24 154 L 27 145 Z" />
    <path d="M 47 118 L 54 125 L 50 129 L 43 122 Z" />
    {/* hollow square */}
    <path
      d="M 23 176 h 30 v 30 h -30 Z"
      fill="none"
      stroke={WHITE}
      strokeWidth="5.5"
      strokeLinejoin="round"
    />
    {/* stacked layers */}
    <path d="M 37 228 L 55 237 L 37 246 L 19 237 Z" />
    <path d="M 37 250 L 51 243 L 55 245 L 37 254 L 19 245 L 23 243 Z" opacity="0.72" />
  </g>
);

/**
 * The 3D application window: navy chassis with a thicker lit slab behind it,
 * traffic lights, a tool rail, and a white canvas holding a flat red mountain
 * with a circle sun, framed by four selection handles.
 */
const WindowArt: React.FC<{ width: number }> = ({ width }) => (
  <svg
    width={width}
    height={width * 0.78}
    viewBox="0 0 400 312"
    fill="none"
    style={{ overflow: "visible" }}
  >
    {/* the extruded slab that gives the chassis its thickness */}
    <rect x="8" y="14" width="386" height="292" rx="24" fill="#22252E" />
    <rect x="2" y="6" width="386" height="292" rx="24" fill={NAVY} />

    {/* traffic lights */}
    <circle cx="28" cy="28" r="7" fill={DOT_RED} />
    <circle cx="52" cy="28" r="7" fill={DOT_AMBER} />
    <circle cx="76" cy="28" r="7" fill={DOT_GREEN} />

    {/* the tool rail */}
    <rect x="12" y="48" width="52" height="240" rx="16" fill="#2A2D38" />
    <RailIcons />

    {/* the canvas */}
    <rect x="76" y="48" width="300" height="240" rx="12" fill={WHITE} />
    <g>
      {/* flat red mountain and circle sun */}
      <circle cx="306" cy="104" r="21" fill={RED} />
      <path d="M 150 246 L 218 132 L 286 246 Z" fill={RED} />
      {/* four selection handles framing the graphic */}
      {[
        [144, 78],
        [334, 78],
        [144, 252],
        [334, 252],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 6}
          y={y - 6}
          width="12"
          height="12"
          fill={INK}
        />
      ))}
    </g>
  </svg>
);

/** The chunky 3D cursor arrow that overlaps the window's bottom-right corner. */
const CursorArrow: React.FC<{ width: number }> = ({ width }) => (
  <svg
    width={width}
    height={width * 1.32}
    viewBox="0 0 100 132"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <path
      d="M 16 20 L 88 78 L 54 82 L 70 116 L 48 126 L 33 92 L 12 114 Z"
      fill={RED_DEEP}
    />
    <path
      d="M 10 12 L 82 70 L 48 74 L 64 108 L 42 118 L 27 84 L 6 106 Z"
      fill={RED}
    />
    <path
      d="M 10 12 L 46 41 L 26 60 L 6 78 Z"
      fill="#E8564A"
      opacity="0.5"
    />
  </svg>
);

/**
 * Slides up and in from the bottom-right corner, rotates back to a near-flat
 * angle and settles below the type; at 6.7s it rises and grows slightly into
 * the centre-lower area as the waves drop out from under it.
 */
export const AppWindow: React.FC = () => {
  const frame = useCurrentFrame();

  const entry = interpolate(frame, [sec(4.6), sec(5.35)], [0, 1], {
    ...CLAMP,
    easing: SETTLE,
  });
  const reflow = interpolate(frame, [sec(6.68), sec(7.2)], [0, 1], {
    ...CLAMP,
    easing: SETTLE,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 170,
        top: 806,
        // A single shallow perspective for the prop, well short of anything
        // that would read as a wide lens on the frame itself.
        perspective: "1400px",
        opacity: interpolate(frame, [sec(4.6), sec(4.7)], [0, 1], CLAMP),
      }}
    >
      <div
        style={{
          translate: `${interpolate(entry, [0, 1], [286, 0]).toFixed(2)}px ${(interpolate(entry, [0, 1], [408, 0]) + interpolate(reflow, [0, 1], [0, -34])).toFixed(2)}px`,
          scale: interpolate(entry, [0, 1], [0.86, 1], {
            output: "perceptual-scale",
          }) * interpolate(reflow, [0, 1], [1, 1.1], {
            output: "perceptual-scale",
          }),
          rotate: `y ${(interpolate(entry, [0, 1], [-24, -5]) + interpolate(reflow, [0, 1], [0, 2])).toFixed(2)}deg`,
          filter: CLAY,
          transformOrigin: "50% 100%",
        }}
      >
        <div style={{ rotate: `${interpolate(entry, [0, 1], [9, 0]).toFixed(2)}deg` }}>
          <WindowArt width={380} />
          <div
            style={{
              position: "absolute",
              left: 296,
              top: 214,
              scale: interpolate(frame, [sec(5.6), sec(5.85)], [0, 1], {
                ...CLAMP,
                easing: OVERSHOOT,
                output: "perceptual-scale",
              }),
              transformOrigin: "12% 10%",
              filter: "drop-shadow(6px 9px 11px rgba(74,66,60,0.30))",
            }}
          >
            <CursorArrow width={86} />
          </div>
        </div>
      </div>
    </div>
  );
};
