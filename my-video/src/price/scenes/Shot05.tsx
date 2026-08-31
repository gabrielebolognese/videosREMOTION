import React from "react";
import { AbsoluteFill, Interactive, interpolate } from "remotion";
import { Sparkles, WhiteStage } from "../lib/Studio";
import { Caption } from "../lib/Type";
import { CLAMP, OUT } from "../lib/motion";
import { BLACK, FPS, fh, fw, sec } from "../lib/tokens";
import { PriceCard } from "../props/PriceCard";
import { useShot } from "../lib/shot";

/**
 * SHOT 5 - 11.60 to 15.30. No cut from shot 4: the same white frame and the
 * same two black sparkles, still drifting inward on the same clock. Only the
 * caption jumps, up to the top third, and the card arrives underneath it.
 *
 * The card rises from the bottom right oversized and tilted back, scales down
 * and rotates upright as it climbs, and is dead centre by 13.20 - after which
 * it holds on a one-degree float and nothing on it ever animates.
 */
export const Shot05: React.FC = () => {
  const { frame, visible } = useShot(4);

  if (!visible) {
    return null;
  }

  // The residual float, once the card has settled. One degree, peak to peak.
  const float = Math.sin(((frame - sec(13.2)) / FPS) * 1.15) * 0.5;
  const settled = interpolate(frame, [sec(13.2), sec(13.5)], [0, 1], CLAMP);

  return (
    <AbsoluteFill name="Shot 5 - Pricing card">
      <WhiteStage />
      <Sparkles id="s5" color={BLACK} opacity={0.5} from={9.8} span={5.5} />

      <Interactive.Div
        name="Pricing card"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: fh(55),
          translate: "0 -50%",
          display: "flex",
          justifyContent: "center",
          perspective: 1800,
        }}
      >
        <div
          style={{
            translate: `${interpolate(frame, [sec(11.6), sec(13.2)], [250, 0], { ...CLAMP, easing: OUT }).toFixed(1)}px ${interpolate(frame, [sec(11.6), sec(13.2)], [600, 0], { ...CLAMP, easing: OUT }).toFixed(1)}px`,
            scale: interpolate(frame, [sec(11.6), sec(13.2)], [1.5, 1], {
              ...CLAMP,
              easing: OUT,
              output: "perceptual-scale",
            }),
            // Tilted back on the way in, upright by the time it arrives.
            rotate: `x ${interpolate(frame, [sec(11.6), sec(13.2)], [28, 0], { ...CLAMP, easing: OUT }).toFixed(3)}deg`,
          }}
        >
          <div
            style={{
              rotate: `${(
                interpolate(frame, [sec(11.6), sec(13.2)], [13, 0], { ...CLAMP, easing: OUT }) +
                float * settled
              ).toFixed(3)}deg`,
            }}
          >
            <PriceCard height={fh(43.8)} />
          </div>
        </div>
      </Interactive.Div>

      <Caption
        name="Strong brands frame prices"
        centre={27.5}
        lines={[
          {
            size: 38,
            weight: 400,
            maxWidth: fw(90),
            words: [
              { text: "Strong", at: 11.6 },
              { text: "brands", at: 11.85 },
              { text: "frame", at: 12.1 },
              { text: "prices", at: 12.35 },
              { text: "in", at: 12.6 },
              { text: "ways", at: 12.85 },
            ],
          },
          {
            size: 44,
            weight: 700,
            maxWidth: fw(88),
            words: [
              { text: "that match", at: 13.1 },
              { text: "daily", at: 13.35 },
              { text: "behavior", at: 13.6 },
            ],
          },
        ]}
      />
    </AbsoluteFill>
  );
};
