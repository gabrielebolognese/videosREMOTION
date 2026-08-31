import React from "react";
import { AbsoluteFill } from "remotion";
import { Debris } from "../lib/Debris";
import { SCRIPT } from "../lib/script";
import {
  Chip,
  FrameBreak,
  InlineJump,
  MaskReveal,
  Rotated,
  StackedContrast,
  Stencil,
} from "../lib/treatments";
import { DARK, W, WHITE } from "../lib/tokens";

/**
 * THE FULL-SCREEN SCENE - 2.10 to 7.30. Black field, no footage at all.
 *
 * The scene is the argument the script is making, so it is built as one: the
 * list accumulates behind the words until the frame is overloaded at "i
 * mean...", then drains across "are you" and "even keeping" until "up?" lands
 * alone on white. There are no cuts inside it - the density carries it.
 *
 * Nothing here takes the dark lift; the black field is doing that job.
 */
export const Overload: React.FC = () => (
  <AbsoluteFill>
    <Debris />

    {/* "thousands of" - sparse, a small pair of words in a lot of black. */}
    <StackedContrast
      p={SCRIPT.thousandsOf}
      slot={{ left: 104, top: 322 }}
      seed={11}
      indents={[0, 54]}
      gap={-8}
      lines={[
        [{ text: "thousands", size: 96, weight: W.light, tracking: -0.02 }],
        [{ text: "of", size: 168, weight: W.stress }],
      ]}
    />

    {/* "skills, plugins," - the pile-up starts. One chip per word. */}
    <Chip
      p={SCRIPT.skillsPlugins}
      slot={{ left: 84, top: 660 }}
      seed={12}
      dirSign={-1}
      gap={20}
      chips={[
        { text: "skills,", size: 78, weight: W.read, rotate: -2 },
        { text: "plugins,", size: 70, weight: W.medium, dx: 96, rotate: 1.5 },
      ]}
    />

    {/* "connectors." - knocked out of a block that scales into place. */}
    <Stencil
      p={SCRIPT.connectors}
      slot={{ left: 66, top: 1010 }}
      seed={13}
      width={948}
      height={196}
      radius={10}
      block={WHITE}
      lines={[
        {
          x: 44,
          y: 146,
          parts: [
            { text: "connectors", size: 128, weight: W.hero },
            { text: ".", size: 128, weight: W.light },
          ],
        },
      ]}
    />

    {/* "i mean..." - one line, "mean" three times its neighbours. */}
    <InlineJump
      p={SCRIPT.iMean}
      slot={{ right: 72, top: 1352, align: "right" }}
      seed={14}
      parts={[
        { text: "i ", size: 74, weight: W.connective },
        { text: "mean", size: 236, weight: W.heavy, dy: 16 },
        { text: "...", size: 96, weight: W.light, dy: -78 },
      ]}
    />

    {/* "are you" - a few degrees off square, in a new zone, as it clears. */}
    <Rotated
      p={SCRIPT.areYou}
      slot={{ left: 132, top: 404 }}
      angle={-5.5}
      seed={15}
      gap={-14}
      indents={[0, 78]}
      lines={[
        [{ text: "are", size: 86, weight: W.light }],
        [{ text: "you", size: 196, weight: W.heavy }],
      ]}
    />

    {/* "even keeping" - a bar wipes across, on a nearly empty frame. */}
    <MaskReveal
      p={SCRIPT.evenKeeping}
      slot={{ left: 104, top: 1264 }}
      seed={16}
      width={720}
      barHeight={250}
      barColour={WHITE}
      gap={-10}
      indents={[0, 44]}
      lines={[
        [{ text: "even", size: 92, weight: W.light }],
        [{ text: "keeping", size: 178, weight: W.stress }],
      ]}
    />

    {/* "up?" - fourteen frames, black on white, alone. */}
    <FrameBreak
      p={SCRIPT.up}
      slot={{}}
      text="up?"
      size={620}
      weight={W.hero}
      colour={DARK}
      top={700}
      tracking={-0.06}
      seed={17}
    />
  </AbsoluteFill>
);
