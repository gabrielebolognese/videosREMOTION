import React from "react";
import { AbsoluteFill } from "remotion";
import { BlackStage } from "../lib/Studio";
import { Caption, Fixed } from "../lib/Type";
import { DIDONE, PENDING_ON_BLACK, WHITE, fh } from "../lib/tokens";
import { useShot } from "../lib/shot";

/**
 * SHOT 8 - 18.90 to 20.80. Flat black, no sparkles, no glow.
 *
 * The wordmark is present from the cut and nothing about it moves; the only
 * thing that happens in the last two seconds is the four words of the follow
 * line arriving underneath it. The mark itself is generic by design - four
 * lowercase letters, a heavy full stop and a superscript trademark, and no
 * reference to any real brand.
 */
export const Shot08: React.FC = () => {
  const { visible } = useShot(7);

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill name="Shot 8 - End card">
      <BlackStage />

      <Fixed
        name="Wordmark"
        centre={47}
        style={{
          fontFamily: DIDONE,
          fontSize: fh(9),
          fontWeight: 900,
          letterSpacing: "-0.015em",
          lineHeight: 1,
          color: WHITE,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <span>vora.</span>
          <span
            style={{
              fontFamily: DIDONE,
              fontSize: fh(2.1),
              fontWeight: 500,
              lineHeight: 1,
              marginTop: fh(0.9),
              marginLeft: fh(0.5),
            }}
          >
            &#174;
          </span>
        </div>
      </Fixed>

      <Caption
        name="Follow for more branding secrets"
        centre={56}
        color={WHITE}
        pending={PENDING_ON_BLACK}
        lines={[
          {
            size: 32,
            weight: 400,
            words: [
              { text: "Follow for", at: 19.15 },
              { text: "more", at: 19.45 },
              { text: "branding", at: 19.72 },
              { text: "secrets", at: 20.0 },
            ],
          },
        ]}
      />
    </AbsoluteFill>
  );
};
