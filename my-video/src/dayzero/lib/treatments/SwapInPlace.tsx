import React from "react";
import { exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import { sec } from "../tokens";
import type { TreatmentBase } from "./common";

/**
 * SWAP IN PLACE
 *
 * The first word is replaced by the second in the same slot, on a hard swap.
 * Two short connective words that need to get out of the way, so nothing
 * moves except the word itself.
 */
export const SwapInPlace: React.FC<
  TreatmentBase & {
    first: Part[];
    second: Part[];
    /** Absolute seconds at which the second word takes the slot. */
    swapAt: number;
  }
> = ({ p, slot, first, second, swapAt, lift, seed = 0 }) => {
  const clock = usePhrase(p, 0.1);
  if (!clock.visible) return null;

  const swapped = clock.frame >= sec(swapAt);

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, -24, 0)}>
      <Run
        parts={swapped ? second : first}
        clock={
          // The second word runs its own entrance from the swap frame, so the
          // swap reads as a replacement rather than a continuation.
          swapped ? { ...clock, local: clock.frame - sec(swapAt) } : clock
        }
        entrance={p.entrance}
        lift={lift}
        seed={seed}
      />
    </Positioned>
  );
};
