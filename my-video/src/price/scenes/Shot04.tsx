import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { Grid, Sparkles, WhiteStage } from "../lib/Studio";
import { Caption } from "../lib/Type";
import { CLAMP } from "../lib/motion";
import { BLACK, DIDONE, fw, sec } from "../lib/tokens";
import { useShot } from "../lib/shot";

/**
 * SHOT 4 - 9.80 to 11.60. Hard cut back to white.
 *
 * The one line in the piece that is not neo-grotesque: a Didone bold italic,
 * ranged left off the twelve-percent line rather than centred. The dashed
 * guide grid takes its last bow here and fades to nothing over the final half
 * second - after this shot it never returns.
 */
export const Shot04: React.FC = () => {
  const { frame, visible } = useShot(3);

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill name="Shot 4 - Same cost">
      <WhiteStage />
      <Sparkles id="s4" color={BLACK} opacity={0.5} from={9.8} span={5.5} />
      <Grid
        opacity={interpolate(frame, [sec(11.1), sec(11.6)], [0.12, 0], CLAMP)}
      />

      <Caption
        name="even though it's the same cost"
        centre={47}
        left={12}
        align="flex-start"
        lines={[
          {
            size: 42,
            weight: 700,
            family: DIDONE,
            italic: true,
            tracking: "-0.005em",
            maxWidth: fw(86),
            words: [
              { text: "even though", at: 9.78 },
              { text: "it's", at: 10.05 },
              { text: "the", at: 10.3 },
              { text: "same", at: 10.55 },
              { text: "cost", at: 10.8 },
            ],
          },
        ]}
      />
    </AbsoluteFill>
  );
};
