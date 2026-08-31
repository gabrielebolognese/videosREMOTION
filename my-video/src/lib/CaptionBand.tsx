import React from "react";
import { useCurrentFrame } from "remotion";
import { CAPTIONS } from "./captions";
import { isHeroActive } from "./heroTiming";
import { OutlinedText } from "./Type";
import { sec, SNOW, TRACK_BAND } from "./tokens";

/**
 * The caption band.
 *
 * It does not animate. Units swap on their in frame and vanish on their out
 * frame with no fade, no rise, no blur and no scale - that hard swap is the
 * whole point of the band, and it is what lets the band carry the rhythm over
 * the quiet footage sections.
 *
 * It reads the absolute frame against one flat list, so a unit spanning a
 * footage cut is never re-keyed by it, and it stands down entirely for the
 * duration of a hero moment.
 */
export const CaptionBand: React.FC = () => {
  const frame = useCurrentFrame();

  if (isHeroActive(frame)) {
    return null;
  }

  const unit = CAPTIONS.find(
    (u) => frame >= sec(u.from) && frame < sec(u.to),
  );
  if (!unit) {
    return null;
  }

  return (
    <OutlinedText
      text={unit.text}
      x={720}
      y={1520}
      size={64}
      weight={700}
      tracking={TRACK_BAND}
      fill={SNOW}
      anchor="middle"
    />
  );
};
