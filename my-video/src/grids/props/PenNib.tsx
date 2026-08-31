import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OVERSHOOT, SETTLE, penBlurAt } from "../lib/Wall";
import { INK, RED, sec } from "../lib/tokens";

/** The pen floats furthest off the wall, so it throws the longest shadow. */
const PEN_SHADOW =
  "drop-shadow(16px 24px 24px rgba(74,66,60,0.34)) drop-shadow(4px 7px 9px rgba(74,66,60,0.20))";

/**
 * The bezier pen-tool prop: a glossy near-black nib, a small red square anchor
 * point sitting on its top vertex, and two thin handle arms ending in black
 * square handles.
 */
const NibArt: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size * 1.24}
    viewBox="0 0 200 248"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="grids-nib" x1="0.15" y1="0" x2="0.85" y2="1">
        <stop offset="0" stopColor="#33333A" />
        <stop offset="0.45" stopColor="#1E1E22" />
        <stop offset="1" stopColor="#0D0D10" />
      </linearGradient>
    </defs>

    {/* bezier handle arms, thin and black, drawn behind the anchor */}
    <path
      d="M 100 62 L 14 26 M 100 62 L 186 32"
      stroke={INK}
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <rect x="3" y="16" width="21" height="21" rx="2.5" fill={INK} />
    <rect x="176" y="22" width="21" height="21" rx="2.5" fill={INK} />

    {/* the nib body */}
    <path
      d="M 100 68 L 146 84 C 150 86, 152 90, 151 95 L 136 162 C 135 167, 133 171, 130 175 L 104 216 C 102 219, 98 219, 96 216 L 70 175 C 67 171, 65 167, 64 162 L 49 95 C 48 90, 50 86, 54 84 Z"
      fill="url(#grids-nib)"
    />
    {/* the engraved slit and vent hole */}
    <path
      d="M 100 128 L 100 200"
      stroke="#45454E"
      strokeWidth="6.5"
      strokeLinecap="round"
    />
    <circle cx="100" cy="116" r="9.5" fill="#45454E" />
    {/* the single soft gloss down the upper-left facet - no hard specular */}
    <path
      d="M 96 76 L 66 87 C 63 88, 62 91, 63 94 L 74 143 C 76 151, 84 150, 83 142 L 78 95 C 77 91, 79 88, 83 87 Z"
      fill="#FFFFFF"
      opacity="0.10"
    />

    {/* the anchor point, the one spot of brand red on the prop */}
    <rect x="87" y="49" width="26" height="26" rx="3" fill={RED} />
    <rect x="87" y="49" width="26" height="9" rx="3" fill="#E8564A" opacity="0.55" />
  </svg>
);

/**
 * Flies in from the right edge on an arc, comes to rest above and right of the
 * wordmark, then bobs slowly for the rest of the take. The blurred shadow is a
 * drop-shadow on the same element, so it drifts with the bob for free.
 */
export const PenNib: React.FC = () => {
  const frame = useCurrentFrame();
  const blur = penBlurAt(frame);

  // The arc: a long horizontal run in from the right that lifts through the
  // middle of the move and drops the last few pixels onto its resting mark.
  const x = interpolate(frame, [sec(1.9), sec(2.55)], [360, 0], {
    ...CLAMP,
    easing: SETTLE,
  });
  const arc = interpolate(
    frame,
    [sec(1.9), sec(2.22), sec(2.55)],
    [82, -34, 0],
    { ...CLAMP, easing: OVERSHOOT },
  );

  // Slow gentle bob, running on the master clock from the moment it lands.
  const bob = Math.sin((frame - sec(2.55)) / 13.5) * 7.5;
  const settled = interpolate(frame, [sec(2.4), sec(2.7)], [0, 1], CLAMP);

  // A small parallax lift when the composition repositions at 6.7s: the prop
  // travels less than the lockup, which keeps it reading as nearer the lens.
  const lift = interpolate(frame, [sec(6.7), sec(7.1)], [0, -58], {
    ...CLAMP,
    easing: SETTLE,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 524,
        top: 336,
        translate: `${x.toFixed(2)}px ${(arc + bob * settled + lift).toFixed(2)}px`,
        rotate: `${interpolate(frame, [sec(1.9), sec(2.55)], [-26, 0], { ...CLAMP, easing: SETTLE }).toFixed(2)}deg`,
        filter: blur > 0.05 ? `${PEN_SHADOW} url(#grids-hblur)` : PEN_SHADOW,
        opacity: interpolate(frame, [sec(1.9), sec(1.98)], [0, 1], CLAMP),
      }}
    >
      <NibArt size={138} />
    </div>
  );
};
