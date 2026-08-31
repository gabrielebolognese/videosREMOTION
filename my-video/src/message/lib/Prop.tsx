import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, drift, OUT } from "./motion";
import { Cutout } from "./Cutout";
import { CONTACT } from "./tokens";

/**
 * One cut-out on the sheet.
 *
 * Every prop arrives the same way: it slides or pops from an offset, settles
 * on an ease-out, and then never quite stops - it floats on its own parallax
 * layer until the shot cuts. There is deliberately no motion blur anywhere in
 * the chain; the brief rules it out, so entrances stay crisp and are carried
 * by the easing alone.
 */
export const Prop: React.FC<{
  name: string;
  /** Settled position of the cut-out box, in frame coordinates. */
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
  /** Continuous travel after settling, in px per frame. */
  cruiseX?: number;
  cruiseY?: number;
  seed?: number;
  driftAmount?: number;
  /** Width of the white paper border. */
  border?: number;
  shadow?: string;
  /** Shallow natural blur, kept inside the far cut-outs only. */
  defocus?: number;
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
  cruiseX = 0,
  cruiseY = 0,
  seed = 1,
  driftAmount = 1,
  border = 4,
  shadow = CONTACT,
  defocus = 0,
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
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex,
        opacity: opacity * (frame >= start ? 1 : 0),
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
      <Cutout
        border={border}
        shadow={shadow}
        inner={defocus > 0 ? `blur(${defocus}px)` : undefined}
      >
        {children}
      </Cutout>
    </Interactive.Div>
  );
};
