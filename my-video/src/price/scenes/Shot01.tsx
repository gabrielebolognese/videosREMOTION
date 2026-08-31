import React from "react";
import { AbsoluteFill, Interactive, interpolate } from "remotion";
import { Grid, WhiteStage } from "../lib/Studio";
import { Caption } from "../lib/Type";
import { CLAMP, IN, OUT } from "../lib/motion";
import { CONTACT, fh, fw, sec } from "../lib/tokens";
import { Vault } from "../props/Vault";
import { useShot } from "../lib/shot";

/**
 * SHOT 1 - 0.00 to 2.40. Locked-off white frame.
 *
 * The vault rises in from the bottom left, settles just below centre and
 * turns slowly on its vertical axis while it drifts a few pixels up. At 2.20
 * the caption and the object leave together to the left: an in-scene swap
 * rather than a cut, which is why the backdrop underneath never moves.
 */
export const Shot01: React.FC = () => {
  const { frame, visible } = useShot(0);

  if (!visible) {
    return null;
  }

  // The 0.2s whip that carries the caption and the object off to the left.
  const whip = interpolate(frame, [sec(2.2), sec(2.4)], [0, 1], {
    ...CLAMP,
    easing: IN,
  });

  return (
    <AbsoluteFill name="Shot 1 - Wallet vault">
      <WhiteStage />
      <Grid />

      <AbsoluteFill
        name="Swap group"
        style={{
          // Scale up 20% and whip left, about the caption block's own centre.
          transformOrigin: `50% ${fh(40)}px`,
          scale: interpolate(whip, [0, 1], [1, 1.2], {
            ...CLAMP,
            output: "perceptual-scale",
          }),
          translate: `${(whip * -900).toFixed(1)}px 0`,
        }}
      >
        <Interactive.Div
          name="Vault"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: fh(58),
            translate: "0 -50%",
            display: "flex",
            justifyContent: "center",
            // The turn on the vertical axis needs somewhere to sit.
            perspective: 1700,
          }}
        >
          <div
            style={{
              translate: `${interpolate(frame, [0, sec(0.9)], [-150, 0], { ...CLAMP, easing: OUT }).toFixed(1)}px ${(
                interpolate(frame, [0, sec(0.9)], [430, 0], { ...CLAMP, easing: OUT }) +
                // and a few pixels of upward drift once it has arrived
                interpolate(frame, [sec(0.9), sec(2.2)], [0, -14], { ...CLAMP, easing: OUT })
              ).toFixed(1)}px`,
              scale: interpolate(frame, [0, sec(0.9)], [0.88, 1], {
                ...CLAMP,
                easing: OUT,
                output: "perceptual-scale",
              }),
              // About fifteen degrees of turn across the whole shot.
              rotate: `y ${interpolate(frame, [sec(0.3), sec(2.2)], [-10, 5], { ...CLAMP, easing: OUT }).toFixed(3)}deg`,
              filter: CONTACT,
            }}
          >
            <Vault
              width={fw(64)}
              sweep={interpolate(frame, [sec(0.4), sec(2.2)], [0, 1], CLAMP)}
            />
          </div>
        </Interactive.Div>

        <Caption
          name="here's the branding secret"
          centre={32.5}
          lines={[
            {
              size: 46,
              weight: 400,
              words: [
                { text: "here's", at: 0.0 },
                { text: "the", at: 0.25 },
                { text: "branding", at: 0.5 },
                { text: "secret", at: 0.75 },
              ],
            },
            {
              size: 53,
              weight: 700,
              words: [
                { text: "no one", at: 1.0 },
                { text: "tells", at: 1.25 },
                { text: "you", at: 1.5 },
              ],
            },
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
