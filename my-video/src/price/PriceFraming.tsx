import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { BLACK, SHOTS, shotIn } from "./lib/tokens";
import { Shot01 } from "./scenes/Shot01";
import { Shot02 } from "./scenes/Shot02";
import { Shot03 } from "./scenes/Shot03";
import { Shot04 } from "./scenes/Shot04";
import { Shot05 } from "./scenes/Shot05";
import { Shot06 } from "./scenes/Shot06";
import { Shot07 } from "./scenes/Shot07";
import { Shot08 } from "./scenes/Shot08";

/**
 * PRICE FRAMING - 20.8s, 9:16, 720x1280, 60fps, silent.
 *
 * Eight shots, eight hard straight cuts, no dissolves and no transition
 * effects anywhere. Nothing is wrapped in a <Sequence>: every shot sits
 * directly under the composition and gates itself on the absolute frame.
 *
 * That is what lets the white plate keep rotating, the guide grid keep its
 * place and the sparkles keep drifting straight through a cut instead of
 * resetting at each one - and it is what lets shot 1 whip its caption and its
 * object out to the left across the 2.40 boundary while shot 2 is already
 * running underneath.
 *
 * There is no <Audio> anywhere in this tree, by design.
 */
export const PriceFraming: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: BLACK,
      // Subpixel antialiasing paints coloured fringes along the stems of the
      // caption type, which on a piece this clean reads as exactly the
      // chromatic aberration the brief rules out. Grayscale AA instead.
      WebkitFontSmoothing: "antialiased",
    }}
  >
    <Shot01 />
    <Shot02 />
    <Shot03 />
    <Shot04 />
    <Shot05 />
    <Shot06 />
    <Shot07 />
    <Shot08 />
  </AbsoluteFill>
);

/**
 * One preview per shot, for the Studio.
 *
 * Because the shots read the master clock, a shot cannot simply be mounted on
 * its own - it would sit outside its own window and render nothing. Trimming
 * the whole piece instead starts the children's clock at the cut, which gives
 * a real preview with the backdrop rotation and the sparkle drift already at
 * the position they reach by that point in the timeline.
 */
export const PRICE_SHOT_PREVIEWS = SHOTS.map((_shot, i) => {
  const Preview: React.FC = () => (
    <Sequence trimBefore={shotIn(i)} layout="absolute-fill">
      <PriceFraming />
    </Sequence>
  );
  return Preview;
});
