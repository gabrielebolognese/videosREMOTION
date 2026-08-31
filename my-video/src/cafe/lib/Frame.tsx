import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Grain } from "./Wall";

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Settles hard. Everything in this piece decelerates into its mark. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** Lands just past its mark and comes back. Used for the pop-ins. */
export const OVERSHOOT = Easing.bezier(0.22, 1.42, 0.36, 1);
/** Even ease, for the long continuous camera moves. */
export const GLIDE = Easing.bezier(0.4, 0, 0.6, 1);

/**
 * Residual life. The brief asks for minimal parallax and no camera shake, so
 * this is deliberately tiny - a couple of pixels, under a degree.
 */
export const drift = (frame: number, seed: number, amount = 1) => {
  const t = frame / 30;
  return {
    x: Math.sin(t * 0.5 + seed * 1.7) * 2.4 * amount,
    y: Math.cos(t * 0.38 + seed * 2.3) * 3 * amount,
    rot: Math.sin(t * 0.31 + seed) * 0.5 * amount,
  };
};

/**
 * One shot of the film.
 *
 * Every cut here is hard - no whip pans, no dissolves - so this only carries
 * the camera move, the grain and the lateral drift. The card swaps in shots 4
 * to 6 are handled inside those scenes, because each one is different.
 */
export const Frame: React.FC<{
  name: string;
  duration: number;
  /** Camera scale across the shot. A falling pair is a pull back. */
  camera?: [number, number];
  /** Lateral drift in pixels across the shot. */
  panX?: number;
  panY?: number;
  grain?: number;
  /** Rising grain and vignette on the closing hold. */
  grainRamp?: boolean;
  children: React.ReactNode;
}> = ({
  name,
  duration,
  camera = [1, 1.02],
  panX = 0,
  panY = 0,
  grain = 1,
  grainRamp = false,
  children,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name={name}>
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, duration], camera, {
            ...CLAMP,
            easing: GLIDE,
            output: "perceptual-scale",
          }),
          translate:
            panX || panY
              ? `${interpolate(frame, [0, duration], [0, panX], {
                  ...CLAMP,
                  easing: GLIDE,
                }).toFixed(2)}px ${interpolate(frame, [0, duration], [0, panY], {
                  ...CLAMP,
                  easing: GLIDE,
                }).toFixed(2)}px`
              : undefined,
        }}
      >
        {children}
      </AbsoluteFill>
      <Grain
        amount={
          grain *
          (grainRamp
            ? interpolate(frame, [0, duration], [1, 1.9], CLAMP)
            : 1)
        }
      />
    </AbsoluteFill>
  );
};
