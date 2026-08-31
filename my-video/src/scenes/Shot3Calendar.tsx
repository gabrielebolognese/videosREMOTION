import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Placeholder } from "../lib/Placeholder";
import { MotionBlurFilter, RevealLine } from "../lib/Reveal";
import { FULLSCREEN_FLIP, FULLSCREEN_OUT } from "../lib/Spikes";
import { INK, OBJECT_SPRING, sec } from "../lib/tokens";

const ENTER = sec(7.02); // 421
const SETTLE = sec(7.4); // 444

const BLOCK = 560;
const CENTRE_X = 720;
const CENTRE_Y = 1580;

/**
 * Shot 3, 6.95 to 10.23. Full-screen, light, no source video.
 *
 * The calendar block flies in from 780px right on the same spring the tile
 * stack used, settles at 7.40 and then tumbles on two axes for the rest of the
 * shot. Nothing here exits: the last word lands at 10.03, everything holds,
 * and the hard cut at 10.23 does the work while the block is still moving.
 */
export const Shot3Calendar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrive = spring({
    frame: frame - ENTER,
    fps,
    config: OBJECT_SPRING,
    durationInFrames: SETTLE - ENTER,
  });

  if (frame < FULLSCREEN_FLIP || frame >= FULLSCREEN_OUT) {
    return null;
  }

  const idle = Math.max(0, (frame - SETTLE) / fps);
  const spinX = -10 * idle;
  const spinY = 6 * idle;
  const float = 4 * Math.sin(2 * Math.PI * 0.4 * idle);

  const slide = 780 * (1 - arrive);
  const scale = 1.14 - 0.14 * arrive;
  const smear = 24 * Math.max(0, 1 - arrive);
  const opacity = Math.min(1, Math.max(0, arrive));

  return (
    <AbsoluteFill style={{ perspective: 2000 }}>
      {/* The block flies in from the right, so its motion blur is horizontal. */}
      <MotionBlurFilter id="calendar-motion-blur" x={smear} y={0} />

      {opacity > 0 ? (
        <div
          style={{
            position: "absolute",
            left: CENTRE_X - BLOCK / 2,
            top: CENTRE_Y - BLOCK / 2,
            width: BLOCK,
            height: BLOCK,
            opacity,
            transform: `translate(${slide}px, ${float}px) scale(${scale}) rotateX(${spinX}deg) rotateY(${spinY}deg)`,
            filter: smear > 0.05 ? "url(#calendar-motion-blur)" : undefined,
          }}
        >
          <Placeholder name="calendar block" width={BLOCK} height={BLOCK} />
        </div>
      ) : null}

      <RevealLine
        y={880}
        size={38}
        weight={400}
        colour={INK}
        words={[
          { text: "so", at: sec(7.06) },
          { text: "that's", at: sec(7.42) },
          { text: "why", at: sec(7.96) },
        ]}
      />

      <RevealLine
        y={972}
        size={76}
        weight={700}
        colour={INK}
        words={[
          { text: "i", at: sec(8.24) },
          { text: "decided", at: sec(8.84) },
          { text: "to", at: sec(9.43) },
          { text: "start", at: sec(9.91) },
        ]}
      />
    </AbsoluteFill>
  );
};
