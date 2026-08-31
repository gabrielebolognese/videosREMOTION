import React from "react";
import { exitStyle, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import type { TreatmentBase } from "./common";

/**
 * SPLIT COLOUR
 *
 * One line, held, carrying two tones across it. Used once, on the last words,
 * where the phrase has to sit still and finish rather than perform.
 */
export const SplitColour: React.FC<TreatmentBase & { parts: Part[] }> = ({
  p,
  slot,
  parts,
  lift,
  seed = 0,
}) => {
  const clock = usePhrase(p, 0.2);
  if (!clock.visible) return null;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -12)}>
      <Run parts={parts} clock={clock} entrance={p.entrance} lift={lift} seed={seed} />
    </Positioned>
  );
};
