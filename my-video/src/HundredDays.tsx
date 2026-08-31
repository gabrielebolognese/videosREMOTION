import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CaptionBand } from "./lib/CaptionBand";
import { heroFrameScale } from "./lib/heroTiming";
import {
  Backdrops,
  FULLSCREEN_IN,
  FULLSCREEN_OUT,
  Spikes,
} from "./lib/Spikes";
import { DURATION, HEIGHT, SRC, VOID, WIDTH } from "./lib/tokens";
import { Hero1 } from "./scenes/Hero1";
import { Hero2 } from "./scenes/Hero2";
import { Shot2Skills } from "./scenes/Shot2Skills";
import { Shot3Calendar } from "./scenes/Shot3Calendar";

// The source is already 1440x2560, so this is 1:1 - untrimmed and unscaled.
const FOOTAGE: React.CSSProperties = {
  width: WIDTH,
  height: HEIGHT,
  objectFit: "cover",
};

/**
 * 100 DAYS - one composition, 1440x2560, 60fps, 1271 frames.
 *
 * Layer order, bottom to top: source footage, the two full-screen backdrops,
 * the corner spikes, the full-screen scenes, the caption band, the heroes.
 *
 * Only the footage is wrapped in Sequences, and only so it can be trimmed.
 * Every graphics layer sits directly under the composition, which means each
 * one reads the ABSOLUTE frame from useCurrentFrame(). That is what keeps the
 * spike rotation continuous across the 6.95 cut and what lets a caption unit
 * span a footage cut without being re-keyed by it.
 */
export const HundredDays: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = heroFrameScale(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: VOID }}>
      {/*
        The source audio, untouched, across the whole runtime - including
        underneath the two full-screen scenes where the picture is gone. One
        element, no trim, no ducking, no separate encode. The picture below is
        muted so it cannot double up on this.
      */}
      <Audio src={staticFile(SRC)} />

      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/*
          Picture in two pieces with the 5.22-10.23 hole cut out of it. The
          second piece is trimmed to its own start so it stays frame-locked to
          the audio: source frame 614 lands on composition frame 614.
        */}
        <Sequence
          
          durationInFrames={FULLSCREEN_IN}
          name="Footage 0.00-5.22"
        >
          <OffthreadVideo src={staticFile(SRC)} muted style={FOOTAGE} />
        </Sequence>

        <Sequence
          from={FULLSCREEN_OUT}
          durationInFrames={DURATION - FULLSCREEN_OUT}
          name="Footage 10.23-21.18"
        >
          <OffthreadVideo
            src={staticFile(SRC)}
            muted
            trimBefore={FULLSCREEN_OUT}
            style={FOOTAGE}
          />
        </Sequence>

        <Backdrops />
        <Spikes />
        <Shot2Skills />
        <Shot3Calendar />
        <CaptionBand />
        <Hero1 />
        <Hero2 />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
