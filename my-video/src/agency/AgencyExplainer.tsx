import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Grid } from "./lib/Grid";
import { Leaves } from "./lib/Leaves";
import { Grain, Studio } from "./lib/Studio";
import { BLACK, shotIn } from "./lib/tokens";
import { TopWordmark } from "./lib/Wordmark";
import { Shot01 } from "./scenes/Shot01";
import { Shot02 } from "./scenes/Shot02";
import { Shot03 } from "./scenes/Shot03";
import { Shot04 } from "./scenes/Shot04";
import { Shot05 } from "./scenes/Shot05";
import { Shot06 } from "./scenes/Shot06";
import { Shot07 } from "./scenes/Shot07";
import { Shot08 } from "./scenes/Shot08";
import { Shot09 } from "./scenes/Shot09";
import { Shot10 } from "./scenes/Shot10";
import { Shot11 } from "./scenes/Shot11";
import { Shot12 } from "./scenes/Shot12";
import { Shot13 } from "./scenes/Shot13";

/**
 * Greyscale agency explainer - 1080x1920, 60fps, 2010 frames, 33.5s.
 *
 * SILENT by design: there is no <Audio> anywhere in this tree and no audio
 * source of any kind, so the render carries no audio track at all.
 *
 * Nothing is wrapped in a <Sequence>. Every layer reads the absolute frame and
 * gates itself on its own shot window, which is what keeps the persistent
 * decorative layer - backdrop, grid, corner leaves, fixed wordmark - continuous
 * across all twelve hard cuts instead of restarting on each one.
 *
 * The final card owns the frame: shot 13 draws its own ground and the studio,
 * grid, leaves and top lock-up all stop before it.
 */
export const AgencyExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const onCard = frame >= shotIn(12);

  return (
    <AbsoluteFill>
      {onCard ? null : (
        <>
          <Studio />
          <Grid />
          <Leaves />
        </>
      )}

      <Shot01 />
      <Shot02 />
      <Shot03 />
      <Shot04 />
      <Shot05 />
      <Shot06 />
      <Shot07 />
      <Shot08 />
      <Shot09 />
      <Shot10 />
      <Shot11 />
      <Shot12 />
      <Shot13 />

      {onCard ? null : <TopWordmark colour={BLACK} />}

      {/* Very slight, over everything, so the whole frame shares one plate. */}
      <Grain opacity={onCard ? 0.05 : 0.055} />
    </AbsoluteFill>
  );
};
