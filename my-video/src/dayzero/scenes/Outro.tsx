import React from "react";
import { AbsoluteFill } from "remotion";
import { SCRIPT } from "../lib/script";
import {
  Chip,
  MaskReveal,
  NumeralHero,
  Satellite,
  SplitColour,
  Stencil,
} from "../lib/treatments";
import { DARK, RED, W, WHITE } from "../lib/tokens";

/**
 * THE OUTRO - 16.89 to 20.81.
 *
 * Back to the high angle wide: the subject stands small and centred, so the
 * top quarter and the bottom third are open and the hook takes the middle.
 */
export const Outro: React.FC = () => (
  <AbsoluteFill>
    {/* "and this..." - quiet, pinned into the open top quarter. */}
    <Satellite
      p={SCRIPT.andThis}
      slot={{ left: 104, top: 340 }}
      lift
      seed={51}
      leaderColour={WHITE}
      centre={[{ text: "this", size: 156, weight: W.read }]}
      satellites={[
        {
          parts: [{ text: "and", size: 54, weight: W.light }],
          dx: 8,
          dy: -84,
          leader: { x1: 118, y1: -58, x2: 244, y2: -58 },
        },
        { parts: [{ text: "...", size: 62, weight: W.whisper }], dx: 300, dy: 96, delay: 0.24 },
      ]}
    />

    {/*
      "is day 0," - THE HOOK.
      The 0 is set large enough that its counter frames the standing figure, so
      the numeral takes the whole frame without burying the subject in it.
    */}
    <NumeralHero
      p={SCRIPT.isDayZero}
      slot={{ left: 0, top: 0 }}
      seed={52}
      numeral={{
        text: "0",
        size: 1980,
        weight: W.hero,
        colour: RED,
        left: -203,
        top: 188,
      }}
      around={[
        {
          parts: [
            { text: "is", size: 68, weight: W.whisper },
            { text: " day", size: 104, weight: W.stress },
          ],
          left: 96,
          top: 286,
          delay: 0.18,
        },
        {
          parts: [{ text: ",", size: 190, weight: W.light }],
          left: 906,
          top: 1330,
          delay: 0.3,
        },
      ]}
    />

    {/* "so drop a" - knocked out of a block sitting on the open tile floor. */}
    <Stencil
      p={SCRIPT.soDropA}
      slot={{ left: 70, top: 1348 }}
      seed={53}
      width={942}
      height={286}
      radius={12}
      block={WHITE}
      lines={[
        {
          x: 46,
          y: 196,
          parts: [
            { text: "so ", size: 78, weight: W.light },
            { text: "drop", size: 156, weight: W.hero },
            { text: " a", size: 78, weight: W.light },
          ],
        },
      ]}
    />

    {/* "follow," - one filled chip, punchy, in a new zone. */}
    <Chip
      p={SCRIPT.follow}
      slot={{ right: 72, top: 628, align: "right" }}
      lift
      seed={54}
      dirSign={1}
      chips={[
        { text: "follow,", size: 134, weight: W.heavy, fill: WHITE, colour: DARK, rotate: -1.5 },
      ]}
    />

    {/* "and see you" - small, receding, wiped in. */}
    <MaskReveal
      p={SCRIPT.andSeeYou}
      slot={{ left: 104, top: 306 }}
      lift
      seed={55}
      width={460}
      barHeight={130}
      barColour={WHITE}
      lines={[
        [
          { text: "and see ", size: 56, weight: W.light },
          { text: "you", size: 98, weight: W.medium },
        ],
      ]}
    />

    {/* "tomorrow." - the last words. One line, held, and left to sit. */}
    <SplitColour
      p={SCRIPT.tomorrow}
      slot={{ left: 0, top: 968, width: 1080, align: "center" }}
      lift
      seed={56}
      parts={[
        { text: "tomorrow", size: 152, weight: W.heavy },
        { text: ".", size: 152, weight: W.whisper, colour: "rgba(255,255,255,0.42)" },
      ]}
    />
  </AbsoluteFill>
);
