import React from "react";
import { AbsoluteFill, Interactive, interpolate } from "remotion";
import { WhiteStage } from "../lib/Studio";
import { Caption, Fixed } from "../lib/Type";
import { CLAMP, OUT } from "../lib/motion";
import { fh, fw, sec } from "../lib/tokens";
import { PhonePanel } from "../props/Phones";
import { useShot } from "../lib/shot";

const CREDIT =
  "A fast, high-energy look at ambition, excess, and unchecked greed, showing how charisma and confidence can bend reality in high-stakes environments";

/**
 * SHOT 7 - 16.45 to 18.90. Hard cut to a clean white frame: no sparkles, no
 * grid, nothing behind the panel but the set.
 *
 * The monochrome phone photograph enters from the bottom left oversized and
 * tilted, straightens as it climbs and fills 22 to 78 percent of frame height
 * by 17.80. The credit paragraph underneath simply appears at 16.90 and never
 * animates - it is a caption card, not part of the build.
 */
export const Shot07: React.FC = () => {
  const { frame, visible } = useShot(6);

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill name="Shot 7 - Phone pinwheel">
      <WhiteStage />

      <Interactive.Div
        name="Phone photograph"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: fh(50),
          translate: "0 -50%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            translate: `${interpolate(frame, [sec(16.45), sec(17.8)], [-270, 0], { ...CLAMP, easing: OUT }).toFixed(1)}px ${interpolate(frame, [sec(16.45), sec(17.8)], [540, 0], { ...CLAMP, easing: OUT }).toFixed(1)}px`,
            scale: interpolate(frame, [sec(16.45), sec(17.8)], [1.55, 1], {
              ...CLAMP,
              easing: OUT,
              output: "perceptual-scale",
            }),
            rotate: `${interpolate(frame, [sec(16.45), sec(17.8)], [-13, 0], { ...CLAMP, easing: OUT }).toFixed(3)}deg`,
          }}
        >
          <PhonePanel height={fh(56)} />
        </div>
      </Interactive.Div>

      <Caption
        name="Framing changes how"
        centre={15}
        lines={[
          {
            size: 40,
            weight: 400,
            words: [
              { text: "Framing", at: 16.55 },
              { text: "changes how", at: 16.95 },
            ],
          },
          {
            size: 46,
            weight: 700,
            maxWidth: fw(90),
            words: [
              { text: "expensive", at: 17.25 },
              { text: "something", at: 17.55 },
              { text: "feels", at: 17.85 },
            ],
          },
        ]}
      />

      {frame >= sec(16.9) ? (
        <Fixed
          name="Credit block"
          centre={87.5}
          style={{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.32,
            color: "#000000",
            textAlign: "center",
            maxWidth: fw(84),
            left: fw(8),
            right: fw(8),
          }}
        >
          <div style={{ width: "100%" }}>{CREDIT}</div>
        </Fixed>
      ) : null}
    </AbsoluteFill>
  );
};
