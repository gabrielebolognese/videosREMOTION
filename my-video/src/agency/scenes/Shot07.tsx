import React from "react";
import { AbsoluteFill } from "remotion";
import { blurStyle, clearOut } from "../lib/motion";
import { useShot } from "../lib/shot";
import { Typewriter } from "../lib/Type";
import { BLACK, SHOT_SECONDS } from "../lib/tokens";

/**
 * SHOT 7 - 1.6s. "But before ads..."
 *
 * Hard cut to an empty backdrop: grid, corner leaves and the fixed wordmark
 * only. The line assembles character by character, centre-locked, then holds.
 *
 * Held a fifth of a second past its own cut so it can fade out under the top
 * of shot 8, which is how that shot opens.
 */
export const Shot07: React.FC = () => {
  const clock = useShot(6, 0.25);
  if (!clock.visible) return null;

  const out = clearOut(clock.local, SHOT_SECONDS[6], 0.2);

  return (
    <AbsoluteFill style={{ opacity: out.opacity, ...blurStyle(out.blur) }}>
      <Typewriter
        local={clock.local}
        at={0.12}
        over={0.7}
        text="But before ads..."
        size={94}
        weight={600}
        colour={BLACK}
        place={{ left: 0, top: 892, width: 1080, align: "center" }}
      />
    </AbsoluteFill>
  );
};
