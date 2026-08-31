import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, drift, OUT } from "./Frame";
import { CONTACT } from "./tokens";

/**
 * One object floating a few centimetres off the wall.
 *
 * Everything here decelerates into its mark and then keeps a couple of pixels
 * of life; nothing snaps, and nothing travels fast enough to need motion blur.
 */
export const Float: React.FC<{
  name: string;
  x: number;
  y: number;
  /** Where it travels in from, relative to the settled position. */
  fromX?: number;
  fromY?: number;
  fromRot?: number;
  fromScale?: number;
  rot?: number;
  start?: number;
  travel?: number;
  /** Continuous travel after settling, per frame. */
  cruiseX?: number;
  cruiseY?: number;
  /** Continuous rotation, in degrees per second. */
  tumble?: number;
  seed?: number;
  driftAmount?: number;
  /** Depth of field. The foreground petals run very high here. */
  defocus?: number;
  shadow?: string;
  opacity?: number;
  zIndex?: number;
  children: React.ReactNode;
}> = ({
  name,
  x,
  y,
  fromX = 0,
  fromY = 0,
  fromRot = 0,
  fromScale = 1,
  rot = 0,
  start = 0,
  travel = 20,
  cruiseX = 0,
  cruiseY = 0,
  tumble = 0,
  seed = 1,
  driftAmount = 1,
  defocus = 0,
  shadow = CONTACT,
  opacity = 1,
  zIndex,
  children,
}) => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [start, start + travel], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });
  const d = drift(frame, seed, driftAmount);
  const cruise = Math.max(0, frame - start);

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex,
        opacity: opacity * interpolate(frame, [start, start + 3], [0, 1], CLAMP),
        // "none" is not a filter function, so it can never be composed with
        // a blur - a shadow of "none" has to drop out of the list entirely.
        filter:
          [shadow === "none" ? "" : shadow, defocus > 0 ? `blur(${defocus}px)` : ""]
            .filter(Boolean)
            .join(" ") || undefined,
        translate: `${((1 - p) * fromX + d.x * p + cruise * cruiseX).toFixed(2)}px ${(
          (1 - p) * fromY +
          d.y * p +
          cruise * cruiseY
        ).toFixed(2)}px`,
        rotate: `${(
          rot +
          (1 - p) * fromRot +
          d.rot * p +
          (tumble * cruise) / 30
        ).toFixed(3)}deg`,
        scale:
          fromScale === 1
            ? undefined
            : interpolate(p, [0, 1], [fromScale, 1], {
                ...CLAMP,
                output: "perceptual-scale",
              }),
      }}
    >
      {children}
    </Interactive.Div>
  );
};
