import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, drift, OUT } from "./motion";
import { Smear } from "./Smear";
import { CONTACT } from "./tokens";

/**
 * One cutout on the sheet.
 *
 * Every prop in the piece arrives the same way: from an offset, under heavy
 * directional smear that clears as it settles, and then never quite stops -
 * it keeps drifting on its own parallax layer until the shot cuts.
 */
export const Prop: React.FC<{
  name: string;
  /** Settled position of the cutout box, in frame coordinates. */
  x: number;
  y: number;
  /** Where it travels in from, relative to the settled position. */
  fromX?: number;
  fromY?: number;
  fromRot?: number;
  fromScale?: number;
  /** Settled rotation. */
  rot?: number;
  start?: number;
  /** How long the entrance takes. */
  travel?: number;
  /** Peak horizontal smear during the entrance. */
  smear?: number;
  /** Continuous travel after settling, for the props that keep moving. */
  cruiseX?: number;
  cruiseY?: number;
  seed?: number;
  driftAmount?: number;
  /** Shallow depth of field: a permanent defocus on the far layers. */
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
  travel = 16,
  smear = 46,
  cruiseX = 0,
  cruiseY = 0,
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
  // The cruise runs on the raw frame, so a prop that crosses the frame keeps
  // moving at a constant rate long after its entrance has resolved.
  const cruise = Math.max(0, frame - start);

  return (
    <Smear
      amount={(1 - p) * smear}
      style={{
        inset: "auto",
        left: x,
        top: y,
        width: "auto",
        height: "auto",
        zIndex,
        opacity:
          opacity * interpolate(frame, [start, start + 2], [0, 1], CLAMP),
      }}
    >
      <Interactive.Div
        name={name}
        style={{
          filter: defocus > 0 ? `${shadow} blur(${defocus}px)` : shadow,
          translate: `${((1 - p) * fromX + d.x * p + cruise * cruiseX).toFixed(2)}px ${(
            (1 - p) * fromY +
            d.y * p +
            cruise * cruiseY
          ).toFixed(2)}px`,
          rotate: `${(rot + (1 - p) * fromRot + d.rot * p).toFixed(3)}deg`,
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
    </Smear>
  );
};
