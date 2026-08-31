import React from "react";
import { AbsoluteFill } from "remotion";
import { BlackStage, CaptionGlow, Sparkles } from "../lib/Studio";
import { Caption } from "../lib/Type";
import { PENDING_ON_BLACK, RED, RED_DEEP, WHITE } from "../lib/tokens";
import { useShot } from "../lib/shot";

/**
 * SHOT 6 - 15.30 to 16.45. The shortest cut in the piece, and a snap: back to
 * black, three words, nothing moving but the build and the sparkles.
 */
export const Shot06: React.FC = () => {
  const { visible } = useShot(5);

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill name="Shot 6 - Not accounting logic">
      <BlackStage />
      <Sparkles id="s6" color={RED_DEEP} opacity={0.85} from={15.3} span={4.4} />
      <CaptionGlow at={50} />

      <Caption
        name="not accounting logic"
        centre={50}
        color={WHITE}
        pending={PENDING_ON_BLACK}
        lines={[
          {
            size: 52,
            weight: 400,
            words: [
              { text: "not", at: 15.3 },
              { text: "accounting", at: 15.5 },
              { text: "logic", at: 15.72, weight: 800, size: 60, color: RED },
            ],
          },
        ]}
      />
    </AbsoluteFill>
  );
};
