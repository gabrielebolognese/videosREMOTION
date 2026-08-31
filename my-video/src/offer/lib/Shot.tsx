import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, IN, OUT, WHIP, WHIP_FRAMES } from "./motion";
import { Smear } from "./Smear";
import { Vignette } from "./Backdrop";
import { PAPER } from "./tokens";

export type Transition = "cut" | "whip" | "crossBlur";

/**
 * One shot of the reel.
 *
 * Carries the two things every shot shares: the slow continuous push in, and
 * the 4-frame transition on each end. Only the collage layer travels during a
 * whip - the sheet underneath stays on its mark and takes the smear, so the
 * pan never opens a hole at the frame edge.
 */
export const Shot: React.FC<{
  name: string;
  /** Length of this shot in frames, needed to time the outgoing whip. */
  duration: number;
  /** The flat sheet or backdrop. Pushes in, but never whips. */
  backdrop: React.ReactNode;
  /** Colour behind everything, so no transition can ever reveal black. */
  base?: string;
  enter?: Transition;
  exit?: Transition;
  /** +1 brings the collage in from the right, -1 from the left. */
  enterDir?: 1 | -1;
  exitDir?: 1 | -1;
  /** Camera push, as a scale pair across the whole shot. */
  push?: [number, number];
  /** Optional clockwise drift, in degrees, across the whole shot. */
  rotate?: [number, number];
  /** Decelerate the push instead of running it linear, for the final hold. */
  settle?: boolean;
  vignette?: number;
  children: React.ReactNode;
}> = ({
  name,
  duration,
  backdrop,
  base = PAPER,
  enter = "whip",
  exit = "whip",
  enterDir = 1,
  exitDir = 1,
  push = [1, 1.05],
  rotate,
  settle = false,
  vignette = 1,
  children,
}) => {
  const frame = useCurrentFrame();

  // 0 -> 1 across the incoming transition, and again across the outgoing one.
  const inP = interpolate(frame, [0, WHIP_FRAMES], [0, 1], {
    ...CLAMP,
    easing: WHIP,
  });
  const outP = interpolate(frame, [duration - WHIP_FRAMES, duration], [0, 1], {
    ...CLAMP,
    easing: IN,
  });

  const travel =
    (enter === "whip" ? (1 - inP) * 300 * enterDir : 0) +
    (exit === "whip" ? outP * -270 * exitDir : 0);

  const smear =
    (enter === "whip" ? (1 - inP) * 80 : 0) + (exit === "whip" ? outP * 92 : 0);

  const softBlur =
    (enter === "crossBlur" ? (1 - inP) * 26 : 0) +
    (exit === "crossBlur" ? outP * 22 : 0);

  return (
    <AbsoluteFill name={name} style={{ backgroundColor: base }}>
      <Smear
        amount={smear}
        blur={softBlur}
        style={{
          opacity:
            enter === "crossBlur" ? interpolate(frame, [0, 2], [0, 1], CLAMP) : 1,
        }}
      >
        <AbsoluteFill
          style={{
            scale: interpolate(frame, [0, duration], push, {
              ...CLAMP,
              easing: settle ? OUT : undefined,
              output: "perceptual-scale",
            }),
          }}
        >
          {backdrop}
        </AbsoluteFill>

        <AbsoluteFill
          name="Collage"
          style={{
            translate: `${travel.toFixed(2)}px 0`,
            scale: interpolate(frame, [0, duration], push, {
              ...CLAMP,
              easing: settle ? OUT : undefined,
              output: "perceptual-scale",
            }),
            rotate: rotate
              ? `${interpolate(frame, [0, duration], rotate, CLAMP).toFixed(3)}deg`
              : undefined,
          }}
        >
          {children}
        </AbsoluteFill>
      </Smear>
      <Vignette strength={vignette} />
    </AbsoluteFill>
  );
};
