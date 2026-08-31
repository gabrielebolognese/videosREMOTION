import React from "react";
import { AbsoluteFill } from "remotion";
import { BlackStage, CaptionGlow, Sparkles } from "../lib/Studio";
import { Caption } from "../lib/Type";
import { PENDING_ON_BLACK, RED, RED_DEEP, WHITE } from "../lib/tokens";
import { useShot } from "../lib/shot";

/**
 * SHOT 3 - 5.40 to 9.80. Hard cut to full-frame black.
 *
 * The longest hold in the piece, and the only shot with no object at all: two
 * blurred red sparkles crossing the corners, a dark red bloom behind the
 * type, and the two numbers left on screen for two and a third seconds after
 * the last word lands.
 */
export const Shot03: React.FC = () => {
  const { visible } = useShot(2);

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill name="Shot 3 - $1 a day">
      <BlackStage />
      <Sparkles id="s3" color={RED_DEEP} opacity={0.85} from={5.4} span={4.4} />
      <CaptionGlow at={50.5} />

      <Caption
        name="$1 a day feels lighter than"
        centre={50.5}
        color={WHITE}
        pending={PENDING_ON_BLACK}
        lines={[
          {
            size: 46,
            weight: 400,
            words: [
              { text: "$1", at: 5.42 },
              { text: "a", at: 5.67 },
              { text: "day", at: 5.92 },
              { text: "feels", at: 6.17 },
              { text: "lighter", at: 6.42 },
              { text: "than", at: 6.67 },
            ],
          },
          {
            size: 64,
            weight: 800,
            color: RED,
            words: [
              { text: "$365", at: 6.92 },
              { text: "a", at: 7.17 },
              { text: "year", at: 7.42 },
            ],
          },
        ]}
      />
    </AbsoluteFill>
  );
};
