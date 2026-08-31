import React from "react";
import { AbsoluteFill } from "remotion";
import { SCRIPT } from "../lib/script";
import {
  LogoLockup,
  MaskReveal,
  NumeralHero,
  SwapInPlace,
  WordLadder,
} from "../lib/treatments";
import { RED, W, WHITE } from "../lib/tokens";

/**
 * THE B-ROLL - 14.18 to 16.58.
 *
 * The only stretch in the video with no subject to work around, so the
 * compositions take the whole frame. The second numeral hero is deliberately
 * built the opposite way round from the series title: that one was a left
 * aligned lockup across the top band, this one is a centred stack.
 */
export const BRoll: React.FC = () => (
  <AbsoluteFill>
    {/* "100 days" - centred stack, the numeral carrying the whole frame. */}
    <NumeralHero
      p={SCRIPT.hundredDays}
      slot={{ left: 0, top: 0 }}
      lift
      seed={41}
      numeral={{
        text: "100",
        size: 440,
        weight: W.hero,
        colour: RED,
        left: 58,
        top: 546,
        tracking: -0.06,
      }}
      around={[
        {
          parts: [{ text: "days", size: 148, weight: W.whisper, tracking: 0.3 }],
          left: 92,
          top: 1006,
          delay: 0.16,
        },
      ]}
    />

    {/* "i'll be" - one slot, one word replacing the other. Gets out of the way. */}
    <SwapInPlace
      p={SCRIPT.illBe}
      slot={{ left: 92, top: 1392 }}
      lift
      seed={42}
      swapAt={14.77}
      first={[{ text: "i'll", size: 118, weight: W.light }]}
      second={[{ text: "be", size: 132, weight: W.heavy }]}
    />

    {/* "teaching one" - a ladder using the open room. */}
    <WordLadder
      p={SCRIPT.teachingOne}
      slot={{ left: 88, top: 1140 }}
      lift
      seed={43}
      steps={[
        { parts: [{ text: "teaching", size: 120, weight: W.connective }], dx: 0, dy: 0 },
        { parts: [{ text: "one", size: 238, weight: W.hero }], dx: 214, dy: 116, delay: 0.2 },
      ]}
    />

    {/* "claude skill" - the third mark, anchored onto the laptop screen. */}
    <LogoLockup
      p={SCRIPT.claudeSkill}
      slot={{ left: 132, top: 742 }}
      lift
      seed={44}
      markSize={98}
      parts={[
        { text: "claude", size: 108, weight: W.read },
        { text: " skill", size: 58, weight: W.light, dy: -26 },
      ]}
    >
      <div
        style={{
          width: 452,
          height: 4,
          marginTop: 30,
          background: WHITE,
          opacity: 0.65,
        }}
      />
    </LogoLockup>

    {/* "per day." - wiped in, and cleared out before the cut at 16.78. */}
    <MaskReveal
      p={SCRIPT.perDay}
      slot={{ left: 96, top: 1414 }}
      lift
      seed={45}
      width={640}
      barHeight={210}
      barColour={WHITE}
      lines={[
        [
          { text: "per", size: 92, weight: W.light },
          { text: " day.", size: 172, weight: W.stress },
        ],
      ]}
    />

  </AbsoluteFill>
);
