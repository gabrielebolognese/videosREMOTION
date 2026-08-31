import React from "react";
import { AbsoluteFill } from "remotion";
import { SCRIPT } from "../lib/script";
import { Annotated, Satellite, StackedContrast, WordLadder } from "../lib/treatments";
import { W, WHITE } from "../lib/tokens";

/**
 * THE DESK SHOT - 7.30 to 10.58.
 *
 * The footage carries a big empty pale wall across the top, so the first three
 * phrases live up there and the frame stays quiet after the overload. The last
 * phrase deliberately runs past the 10.23 cut into the selfie shot.
 */
export const Desk: React.FC = () => (
  <AbsoluteFill>
    {/* "so that's" - small words pinned off a bigger one, up in the wall. */}
    <Satellite
      p={SCRIPT.soThats}
      slot={{ left: 96, top: 300 }}
      lift
      seed={21}
      leaderColour={WHITE}
      centre={[{ text: "that's", size: 168, weight: W.heavy }]}
      satellites={[
        {
          parts: [{ text: "so", size: 56, weight: W.light }],
          dx: 14,
          dy: -96,
          leader: { x1: 96, y1: -70, x2: 240, y2: -70 },
        },
      ]}
    />

    {/* "why i" - two short words with silence between them, so "i" lands late. */}
    <WordLadder
      p={SCRIPT.whyI}
      slot={{ left: 176, top: 690 }}
      lift
      seed={22}
      steps={[
        { parts: [{ text: "why", size: 136, weight: W.connective }], dx: 0, dy: 0, delay: 0 },
        { parts: [{ text: "i", size: 288, weight: W.hero }], dx: 308, dy: 96, delay: 0.34 },
      ]}
    />

    {/* "decided to" - weight split hard, ragged, upper third. */}
    <StackedContrast
      p={SCRIPT.decidedTo}
      slot={{ left: 92, top: 262 }}
      lift
      seed={23}
      indents={[0, 486]}
      gap={-16}
      lines={[
        [{ text: "decided", size: 178, weight: W.heavy }],
        [{ text: "to", size: 78, weight: W.whisper }],
      ]}
    />

    {/*
      "start a" - the ring is drawn from the absolute frame, so the footage cut
      at 10.23 lands in the middle of the draw and the annotation carries
      straight through it instead of restarting on the new shot.
    */}
    <Annotated
      p={SCRIPT.startA}
      slot={{ left: 104, top: 1392 }}
      lift
      seed={24}
      ringColour={WHITE}
      strokeWidth={7}
      ring={{ cx: 208, cy: 82, rx: 252, ry: 108, rotate: -7 }}
      parts={[
        { text: "start", size: 154, weight: W.stress },
        { text: " a", size: 68, weight: W.light, dy: -46 },
      ]}
    />
  </AbsoluteFill>
);
