import React from "react";
import { AbsoluteFill } from "remotion";
import { ClaudeLockup } from "../lib/ClaudeMark";
import { SCRIPT } from "../lib/script";
import { Chip, InlineJump, NumeralHero, Rotated, Vertical } from "../lib/treatments";
import { DARK, RED, W, WHITE } from "../lib/tokens";

/**
 * THE SELFIE - 10.69 to 13.57.
 *
 * In the actual footage the face sits centre in the upper half and the raised
 * forearm sweeps the lower right, so everything here lives in the open top
 * band, the far right column, or the upper left wall. Nothing is allowed on
 * the face, which occupies roughly x 420-780, y 630-1060.
 */
export const Selfie: React.FC = () => (
  <AbsoluteFill>
    {/* "series:" - down the hard right edge, weight climbing as it descends. */}
    <Vertical
      p={SCRIPT.series}
      slot={{ right: 62, top: 292, align: "right" }}
      lift
      seed={31}
      lineGap={-22}
      units={[
        { text: "s", size: 88, weight: W.whisper },
        { text: "e", size: 88, weight: W.light },
        { text: "r", size: 88, weight: W.connective },
        { text: "i", size: 88, weight: W.medium },
        { text: "e", size: 88, weight: W.read },
        { text: "s", size: 88, weight: W.heavy },
        { text: ":", size: 88, weight: W.hero },
      ]}
    />

    {/*
      "100 days of claude." - the series title, and the fullest of the three
      lockups. Held entirely inside the open top band so the face and the
      forearm keep the rest of the frame.
    */}
    <NumeralHero
      p={SCRIPT.seriesTitle}
      slot={{ left: 0, top: 0 }}
      lift
      seed={32}
      numeral={{
        text: "100",
        size: 300,
        weight: W.hero,
        colour: RED,
        left: 62,
        top: 118,
        tracking: -0.05,
      }}
      around={[
        { parts: [{ text: "days", size: 104, weight: W.light }], left: 646, top: 186, delay: 0.14 },
        { parts: [{ text: "of", size: 62, weight: W.connective }], left: 650, top: 312, delay: 0.22 },
      ]}
    >
      <div style={{ position: "absolute", left: 62, top: 452 }}>
        <ClaudeLockup word="claude." size={108} weight={W.read} colour={WHITE} markScale={0.72} />
      </div>
    </NumeralHero>

    {/* "where" - small and quick, right side, below the face and above the arm. */}
    <Chip
      p={SCRIPT.where}
      slot={{ right: 64, top: 1148, align: "right" }}
      lift
      seed={33}
      dirSign={1}
      chips={[{ text: "where", size: 72, weight: W.read, fill: WHITE, colour: DARK, rotate: -2 }]}
    />

    {/* "every single" - "every" keeps stretching while the voice draws it out. */}
    <InlineJump
      p={SCRIPT.everySingle}
      slot={{ left: 76, top: 286 }}
      lift
      seed={34}
      stretch={{ index: 0, to: 1.16 }}
      parts={[
        { text: "every", size: 152, weight: W.heavy },
        { text: " single", size: 66, weight: W.light, dy: -52 },
      ]}
    />

    {/* "day for" - off square, upper right, exiting hard into the whip. */}
    <Rotated
      p={SCRIPT.dayFor}
      slot={{ right: 74, top: 356, align: "right" }}
      lift
      seed={35}
      angle={4.5}
      gap={-18}
      indents={[0, 0]}
      lines={[
        [{ text: "day", size: 186, weight: W.hero }],
        [{ text: "for", size: 72, weight: W.light }],
      ]}
    />
  </AbsoluteFill>
);
