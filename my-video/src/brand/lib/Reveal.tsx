import {
  Easing,
  Interactive,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { glowFrom } from "./tokens";

export type Drift = "up" | "down" | "left" | "right";

const VECTOR: Record<Drift, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

/**
 * The idle drift is deliberately far longer than any shot, so nothing ever
 * reaches the end of its travel and stops - every element is still moving when
 * it leaves frame. `amount` at each call site is a relative weight; the gain
 * turns it into the real distance.
 */
const DRIFT_RAMP = 600;
const DRIFT_GAIN = 4;

/** Snap and settle are both stretched off the caller's `duration`. */
const SNAP_GAIN = 1.75;
const SETTLE_GAIN = 5;
const RISE_GAIN = 2;

/**
 * The idle layer every element sits in: a slow one-way drift, a soft breathing
 * glow, and a drop shadow tinted to the element's own text colour.
 *
 * One direction per group, shared by the text and the props in it - never one
 * element up and its neighbour down. Within a vertical drift the element
 * furthest along the direction of travel is given the larger `amount`, so the
 * gaps between lines only ever open up and can never close into an overlap.
 * Horizontal drifts leave vertical spacing untouched, so they run uniform.
 */
export const Idle: React.FC<{
  name: string;
  start: number;
  drift?: Drift;
  amount?: number;
  /** Hex colour of the text inside, used to tint the glow and the shadow. */
  glowColor?: string;
  /** Type size, so the shadow scales with the word rather than sitting flat. */
  fontSize?: number;
  block?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({
  name,
  start,
  drift,
  amount = 24,
  glowColor,
  fontSize,
  block = false,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const [dx, dy] = VECTOR[drift ?? "up"];
  const travel = drift ? amount * DRIFT_GAIN : 0;

  const glow = glowFrom(glowColor, 0.22);
  const shadow = glowFrom(glowColor, 0.3);
  const size = typeof fontSize === "number" ? fontSize : 0;
  const dropY = Math.max(2, size * 0.036).toFixed(1);
  const dropBlur = Math.max(7, size * 0.1).toFixed(1);

  return (
    <Interactive.Div
      name={name}
      style={{
        display: block ? "block" : "inline-block",
        ...style,
        translate: interpolate(
          frame,
          [start, start + DRIFT_RAMP],
          [
            "0px 0px",
            `${(dx * travel).toFixed(1)}px ${(dy * travel).toFixed(1)}px`,
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.sin),
          },
        ),
        // A tight white halo lifts the letterforms off the chevron watermark,
        // a wider bloom breathes around them, and a drop shadow in the word's
        // own colour grounds it - black text casts a black shadow.
        textShadow:
          glow && shadow
            ? `0 0 9px rgba(255,255,255,0.92), 0 0 ${(
                21 +
                Math.sin(frame / 48 + start * 0.37) * 7
              ).toFixed(1)}px ${glow}, 0 ${dropY}px ${dropBlur}px ${shadow}`
            : style?.textShadow,
      }}
    >
      {children}
    </Interactive.Div>
  );
};

/**
 * The single reveal used by every word and object in the reel.
 *
 * The element starts oversized, pale and defocused and snaps into sharp focus,
 * then keeps easing down into its final size long after it has read as landed,
 * so nothing in frame is ever completely still. No fades, no slides, no
 * typewriter.
 */
export const Reveal: React.FC<{
  name: string;
  start: number;
  /** How oversized the ghost starts. 1.34 for words, lower for big objects. */
  scaleFrom?: number;
  /** Blur of the ghost in pixels. */
  blur?: number;
  /** Base beat length. The snap and the settle are both scaled off it. */
  duration?: number;
  /** Optional ghost-grey to black colour ramp, e.g. the word "Instantly". */
  ghost?: string;
  color?: string;
  origin?: string;
  block?: boolean;
  drift?: Drift;
  driftAmount?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({
  name,
  start,
  scaleFrom = 1.34,
  blur = 16,
  duration = 8,
  ghost,
  color,
  origin = "50% 50%",
  block = false,
  drift,
  driftAmount,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const snap = Math.round(duration * SNAP_GAIN);
  const settle = Math.round(duration * SETTLE_GAIN);

  return (
    <Idle
      name={name}
      start={start}
      drift={drift}
      amount={driftAmount}
      glowColor={typeof style?.color === "string" ? style.color : undefined}
      fontSize={
        typeof style?.fontSize === "number" ? style.fontSize : undefined
      }
      block={block}
      style={style}
    >
      <div
        style={{
          display: block ? "block" : "inline-block",
          transformOrigin: origin,
          willChange: "filter, scale, opacity",
          opacity: interpolate(
            frame,
            [start, start + 2, start + Math.round(snap * 0.8)],
            [0, 0.42, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          filter: `blur(${interpolate(frame, [start, start + snap], [blur, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
          })}px)`,
          scale: interpolate(
            frame,
            [start, start + Math.round(snap * 0.72), start + settle],
            [scaleFrom, 0.97, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.sin),
              output: "perceptual-scale",
            },
          ),
          color:
            ghost && color
              ? interpolateColors(frame, [start, start + snap], [ghost, color])
              : undefined,
        }}
      >
        {children}
      </div>
    </Idle>
  );
};

/**
 * Same reveal, but the element also rises into place from below - used for the
 * props that "rise from below" rather than simply landing. The rise runs on a
 * long expo tail, so it is still creeping into place well after it arrives.
 */
export const RiseReveal: React.FC<{
  name: string;
  start: number;
  rise?: number;
  scaleFrom?: number;
  blur?: number;
  duration?: number;
  drift?: Drift;
  driftAmount?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({
  name,
  start,
  rise = 190,
  scaleFrom = 1.16,
  blur = 20,
  duration = 20,
  drift,
  driftAmount,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const travel = Math.round(duration * RISE_GAIN);

  return (
    <Idle
      name={name}
      start={start}
      drift={drift}
      amount={driftAmount}
      style={style}
    >
      <div
        style={{
          display: "inline-block",
          willChange: "filter, scale, opacity, translate",
          opacity: interpolate(frame, [start, start + 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(
            frame,
            [start, start + Math.round(travel * 0.45)],
            [blur, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            },
          )}px)`,
          translate: interpolate(
            frame,
            [start, start + travel],
            [`0px ${rise}px`, "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.12, 0.85, 0.26, 1),
            },
          ),
          scale: interpolate(
            frame,
            [start, start + Math.round(travel * 0.6), start + travel],
            [scaleFrom, 0.99, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.sin),
              output: "perceptual-scale",
            },
          ),
        }}
      >
        {children}
      </div>
    </Idle>
  );
};
