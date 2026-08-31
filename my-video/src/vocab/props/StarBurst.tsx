import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT } from "../lib/Studio";
import { PROP } from "../lib/tokens";

/**
 * A matte charcoal faceted star-burst spike, like a folded paper caltrop.
 *
 * Built from six triangular facets around a common centre, each shaded a
 * different value so the form reads as folded rather than flat. These only
 * ever appear cropped in a corner and heavily out of focus.
 */
export const StarBurst: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <defs>
      <linearGradient id="burst-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5A5A5A" />
        <stop offset="100%" stopColor="#333333" />
      </linearGradient>
      <linearGradient id="burst-b" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#484848" />
        <stop offset="100%" stopColor="#282828" />
      </linearGradient>
    </defs>
    {/* four long spikes on the diagonals, folded down the centre line */}
    <path d="M 100 100 L 12 4 L 100 44 Z" fill="url(#burst-a)" />
    <path d="M 100 100 L 100 44 L 188 4 Z" fill={PROP} />
    <path d="M 100 100 L 188 4 L 156 100 Z" fill="url(#burst-b)" />
    <path d="M 100 100 L 156 100 L 188 196 Z" fill="#353535" />
    <path d="M 100 100 L 188 196 L 100 156 Z" fill="url(#burst-a)" />
    <path d="M 100 100 L 100 156 L 12 196 Z" fill="#2C2C2C" />
    <path d="M 100 100 L 12 196 L 44 100 Z" fill="url(#burst-b)" />
    <path d="M 100 100 L 44 100 L 12 4 Z" fill="#3A3A3A" />
    {/* the folded crease catching the key */}
    <path
      d="M 100 44 L 100 100 L 156 100"
      stroke="rgba(255,255,255,0.14)"
      strokeWidth="2.5"
      fill="none"
    />
  </svg>
);

/**
 * A star-burst floating in a corner: cropped, soft-focus, and turning slowly.
 * Nothing in this piece uses these sharp, so the blur is baked in here.
 */
export const CornerBurst: React.FC<{
  x: number;
  y: number;
  size: number;
  rot?: number;
  /** Degrees per second. */
  spin?: number;
  blur?: number;
  opacity?: number;
  start?: number;
  fromX?: number;
  fromY?: number;
  travel?: number;
  /** Continuous drift per frame, for the shot where they leave. */
  cruiseX?: number;
  cruiseY?: number;
}> = ({
  x,
  y,
  size,
  rot = 0,
  spin = 4,
  blur = 9,
  opacity = 1,
  start = 0,
  fromX = 0,
  fromY = 0,
  travel = 26,
  cruiseX = 0,
  cruiseY = 0,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + travel], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });
  const t = Math.max(0, frame - start);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        filter: `blur(${blur}px) drop-shadow(10px 18px 20px rgba(60,60,60,0.20))`,
        opacity: opacity * interpolate(frame, [start, start + 4], [0, 1], CLAMP),
        translate: `${((1 - p) * fromX + t * cruiseX).toFixed(2)}px ${((1 - p) * fromY + t * cruiseY).toFixed(2)}px`,
        rotate: `${(rot + (spin * t) / 30).toFixed(2)}deg`,
      }}
    >
      <StarBurst size={size} />
    </div>
  );
};
