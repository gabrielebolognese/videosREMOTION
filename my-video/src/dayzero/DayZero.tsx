import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { Backgrounds } from "./lib/Backgrounds";
import { Stars } from "./lib/Stars";
import { Intro } from "./scenes/Intro";
import { BRoll } from "./scenes/BRoll";
import { Desk } from "./scenes/Desk";
import { EndCard } from "./scenes/EndCard";
import { Outro } from "./scenes/Outro";
import { Overload } from "./scenes/Overload";
import { Selfie } from "./scenes/Selfie";
import { DARK, DURATION, HOLE_IN, HOLE_OUT, SRC } from "./lib/tokens";

// Source is 1440x2560, composition is 1080x1920 - the same 9:16, so this is a
// clean scale to fill with nothing cropped.
const FOOTAGE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/**
 * DAY ZERO - one composition, 1080x1920, 60fps, 1271 frames.
 *
 * Only the footage is wrapped in Sequences, and only so it can be trimmed
 * around the 2.10-7.30 hole. Every graphics layer sits directly under the
 * composition and therefore reads the ABSOLUTE frame, which is what keeps the
 * star rotation continuous across every cut and lets a phrase like "start a"
 * span the 10.23 footage cut without restarting.
 */
export const DayZero: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: DARK }}>
      {/*
        The source audio, untouched, across the whole runtime - including under
        the hole where the picture is gone. The picture below is muted so it
        cannot double up on this.
      */}
      <Audio src={staticFile(SRC)} />

      {/*
        Picture in two pieces with 2.10-7.30 cut out of it. The second piece is
        trimmed to its own start so it stays frame-locked to the audio: source
        frame 438 lands on composition frame 438.
      */}
      <Sequence  durationInFrames={HOLE_IN} name="Footage 0.00-2.10">
        <OffthreadVideo src={staticFile(SRC)} muted style={FOOTAGE} />
      </Sequence>

      <Sequence
        from={HOLE_OUT}
        durationInFrames={DURATION - HOLE_OUT}
        name="Footage 7.30-21.18"
      >
        <OffthreadVideo
          src={staticFile(SRC)}
          muted
          trimBefore={HOLE_OUT}
          style={FOOTAGE}
        />
      </Sequence>

      <Backgrounds />
      <Stars />

      <Intro />
      <Overload />
      <Desk />
      <Selfie />
      <BRoll />
      <Outro />
      <EndCard />
    </AbsoluteFill>
  );
};
