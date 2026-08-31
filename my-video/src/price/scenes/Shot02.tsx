import React from "react";
import { AbsoluteFill, Interactive, interpolate } from "remotion";
import { Grid, WhiteStage } from "../lib/Studio";
import { Caption } from "../lib/Type";
import { CLAMP, OUT, SETTLE } from "../lib/motion";
import { CONTACT, fh, fw, sec } from "../lib/tokens";
import { Notes } from "../props/Notes";
import { useShot } from "../lib/shot";

/**
 * SHOT 2 - 2.40 to 5.40. The same locked-off white frame.
 *
 * There is no cut here: shot 1 whipped its contents out and this one carries
 * the identical backdrop, so only the object has changed. The bundle flies in
 * small from the upper right, grows toward centre and tumbles from a
 * three-quarter upright to a near-flat tilted plane by the end of the shot.
 */
export const Shot02: React.FC = () => {
  const { frame, visible } = useShot(1);

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill name="Shot 2 - Banded notes">
      <WhiteStage />
      <Grid />

      <Interactive.Div
        name="Note bundle"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: fh(56),
          translate: "0 -50%",
          display: "flex",
          justifyContent: "center",
          perspective: 1500,
        }}
      >
        <div
          style={{
            translate: `${interpolate(frame, [sec(2.4), sec(3.35)], [300, 0], { ...CLAMP, easing: OUT }).toFixed(1)}px ${interpolate(frame, [sec(2.4), sec(3.35)], [-380, 0], { ...CLAMP, easing: OUT }).toFixed(1)}px`,
            scale: interpolate(frame, [sec(2.4), sec(3.35)], [0.38, 1], {
              ...CLAMP,
              easing: OUT,
              output: "perceptual-scale",
            }),
            // The tumble: upright three-quarter through to nearly flat.
            rotate: `x ${interpolate(frame, [sec(2.4), sec(5.4)], [-14, 58], { ...CLAMP, easing: SETTLE }).toFixed(3)}deg`,
          }}
        >
          <div
            style={{
              rotate: `${interpolate(frame, [sec(2.4), sec(5.4)], [7, -4], { ...CLAMP, easing: SETTLE }).toFixed(3)}deg`,
              filter: CONTACT,
            }}
          >
            <Notes width={fw(72)} />
          </div>
        </div>
      </Interactive.Div>

      <Caption
        name="People don't reject prices"
        centre={31}
        lines={[
          {
            size: 47,
            weight: 400,
            words: [
              { text: "People don't", at: 2.4 },
              { text: "reject", at: 2.65 },
              { text: "prices", at: 2.9 },
            ],
          },
          {
            size: 54,
            weight: 700,
            words: [
              { text: "they reject", at: 3.5 },
              { text: "how", at: 3.75 },
              { text: "prices are", at: 4.0 },
              { text: "framed", at: 4.25 },
            ],
          },
        ]}
      />
    </AbsoluteFill>
  );
};
