import { useCurrentFrame } from "remotion";
import { dur, shotIn, shotOut } from "./tokens";

export type ShotClock = {
  /** Absolute composition frame. */
  frame: number;
  /** Frames since this shot started. */
  local: number;
  visible: boolean;
  start: number;
  end: number;
};

/**
 * The clock every shot runs on.
 *
 * `extraOut` lets a shot hold something past its own cut - used once, so the
 * type from shot 1 can blur away inside shot 2 the way the brief describes,
 * while the prop underneath still hard-cuts on the boundary.
 */
export const useShot = (n: number, extraOutSeconds = 0): ShotClock => {
  const frame = useCurrentFrame();
  const start = shotIn(n);
  const end = shotOut(n);
  return {
    frame,
    local: frame - start,
    visible: frame >= start && frame < end + dur(extraOutSeconds),
    start,
    end,
  };
};
