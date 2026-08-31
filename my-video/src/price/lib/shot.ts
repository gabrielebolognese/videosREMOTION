import { useCurrentFrame } from "remotion";
import { shotIn, shotOut } from "./tokens";

export type ShotClock = {
  /** Absolute composition frame. Every cue in the piece is written against it. */
  frame: number;
  /** Frames since this shot started, for the few effects that need it. */
  local: number;
  visible: boolean;
  start: number;
  end: number;
  duration: number;
};

/**
 * The clock a shot runs on.
 *
 * `extraOut` lets a shot hold its content past its own cut. Shot 1 uses it:
 * the caption and the vault whip left across the 2.40s boundary and finish
 * clearing the frame while shot 2 is already running underneath.
 */
export const useShot = (n: number, extraOutFrames = 0): ShotClock => {
  const frame = useCurrentFrame();
  const start = shotIn(n);
  const end = shotOut(n);
  return {
    frame,
    local: frame - start,
    visible: frame >= start && frame < end + extraOutFrames,
    start,
    end,
    duration: end - start,
  };
};
