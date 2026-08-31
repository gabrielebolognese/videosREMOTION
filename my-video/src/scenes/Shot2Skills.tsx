import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Placeholder } from "../lib/Placeholder";
import { exitState, MotionBlurFilter, RevealLine } from "../lib/Reveal";
import { FULLSCREEN_FLIP, FULLSCREEN_IN } from "../lib/Spikes";
import { OBJECT_SPRING, sec, SNOW } from "../lib/tokens";

const ENTER = sec(5.28); // 317
const SETTLE = sec(5.58); // 335
const EXIT = sec(6.78); // 407

const TILE = 620;
const CENTRE_X = 720;
const CENTRE_Y = 1560;

/**
 * Shot 2, 5.22 to 6.95. Full-screen, dark, no source video.
 *
 * The skill tile stack drops in from 900px below on a spring, settles at 5.58
 * and then never stops moving - it keeps turning on Y and floating while the
 * two lines of type build above it, and it is still turning as it wipes out.
 * Both lines then leave together as units at 6.78, clearing the frame by 6.93
 * and leaving one deliberately near-empty frame before the cut.
 */
export const Shot2Skills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrive = spring({
    frame: frame - ENTER,
    fps,
    config: OBJECT_SPRING,
    durationInFrames: SETTLE - ENTER,
  });

  if (frame < FULLSCREEN_IN || frame >= FULLSCREEN_FLIP) {
    return null;
  }

  const exit = exitState(frame, EXIT, 700);

  // Idle runs from the settle onward and is never switched off: it carries on
  // underneath the exit wipe rather than snapping still at 6.78.
  const idle = Math.max(0, (frame - SETTLE) / fps);
  const spinY = 9 * idle;
  const float = 4 * Math.sin(2 * Math.PI * 0.4 * idle);

  const rise = 900 * (1 - arrive);
  const scale = 1.16 - 0.16 * arrive;
  const smear = 26 * Math.max(0, 1 - arrive);

  const filters: string[] = [];
  if (smear > 0.05) {
    filters.push("url(#tile-motion-blur)");
  }
  if (exit.blur > 0.05) {
    filters.push(`blur(${exit.blur}px)`);
  }

  const objectOpacity =
    Math.min(1, Math.max(0, arrive)) * Math.max(0, exit.opacity);

  return (
    <AbsoluteFill style={{ perspective: 2000 }}>
      {/* The stack rises, so its motion blur is vertical. */}
      <MotionBlurFilter id="tile-motion-blur" x={0} y={smear} />

      {objectOpacity > 0 ? (
        <div
          style={{
            position: "absolute",
            left: CENTRE_X - TILE / 2,
            top: CENTRE_Y - TILE / 2,
            width: TILE,
            height: TILE,
            opacity: objectOpacity,
            transform: `translate(${exit.dx}px, ${rise + float}px) scale(${scale}) rotateY(${spinY}deg)`,
            filter: filters.length > 0 ? filters.join(" ") : undefined,
          }}
        >
          <Placeholder name="skill tile stack" width={TILE} height={TILE} />
        </div>
      ) : null}

      <RevealLine
        y={880}
        size={38}
        weight={400}
        colour={SNOW}
        exitAt={EXIT}
        words={[
          { text: "are", at: sec(5.29) },
          { text: "you", at: sec(5.47) },
        ]}
      />

      <RevealLine
        y={972}
        size={76}
        weight={700}
        colour={SNOW}
        exitAt={EXIT}
        words={[
          { text: "even", at: sec(5.8) },
          { text: "keeping", at: sec(6.14) },
          { text: "up?", at: sec(6.48) },
        ]}
      />
    </AbsoluteFill>
  );
};
