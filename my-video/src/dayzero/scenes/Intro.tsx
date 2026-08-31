import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { OUT } from "../lib/motion";
import { SCRIPT } from "../lib/script";
import {
  FrameBreak,
  LogoLockup,
  Vertical,
  WordLadder,
} from "../lib/treatments";
import { DARK, dur, sec, W, WHITE } from "../lib/tokens";

/**
 * The slab.
 *
 * It wipes in on the footage cut at 0.95 rather than on a phrase time, so the
 * graphic and the edit land together, and HUGE then drops onto it at its own
 * stated 1.04. This is the "one shape" the intro is asked for and it is what
 * gives the biggest word in the video something to hit.
 */
const Slab: React.FC = () => {
  const frame = useCurrentFrame();
  const inAt = sec(0.95);
  const outAt = sec(1.4);

  const wipe = interpolate(frame, [inAt, inAt + dur(0.14)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const leave = interpolate(frame, [outAt, outAt + dur(0.12)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < inAt || leave >= 1) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: -60,
        top: 960,
        width: 1200,
        height: 440,
        background: DARK,
        // Wipes in from the right, against the lockup that slid in from the
        // left, so the intro moves on more than one axis.
        clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`,
        transform: `translateX(${leave * -70}px)`,
        opacity: 1 - leave,
      }}
    />
  );
};

/**
 * THE INTRO - 0.15 to 1.97.
 *
 * The most elaborate composition in the piece, and deliberately so: four
 * phrases, four treatments, four entrance directions, a size jump from a 46px
 * whisper to a 500px frame break, and a shape landing on the cut between them.
 */
export const Intro: React.FC = () => (
  <AbsoluteFill>
    {/* "claude has" - the mark rides in from off frame on the left. */}
    <LogoLockup
      p={SCRIPT.claudeHas}
      slot={{ left: 74, top: 322 }}
      markSize={104}
      lift
      seed={1}
      parts={[
        { text: "claude", size: 132, weight: W.read },
        { text: " has", size: 54, weight: W.light, dy: -30 },
      ]}
    />

    {/* "a" - a whisper pinned to the left edge, with a rule dropping past it. */}
    <Vertical
      p={SCRIPT.a}
      slot={{ left: 96, top: 792 }}
      lift
      seed={2}
      units={[{ text: "a", size: 46, weight: W.light }]}
      rule={{ height: 300, offset: -30, colour: WHITE }}
    />

    <Slab />

    {/* "HUGE" - the biggest single word in the video, cropped on both edges. */}
    <FrameBreak
      p={SCRIPT.huge}
      slot={{}}
      text="HUGE"
      size={500}
      weight={W.hero}
      colour={WHITE}
      top={968}
      tracking={-0.055}
      seed={3}
    />

    {/* "library:" - stepping down and right, emptying the frame from the top. */}
    <WordLadder
      p={SCRIPT.library}
      slot={{ left: 96, top: 1226 }}
      lift
      seed={4}
      steps={[
        { parts: [{ text: "li", size: 100, weight: W.light }], dx: 0, dy: 0 },
        { parts: [{ text: "bra", size: 138, weight: W.medium }], dx: 116, dy: 96 },
        { parts: [{ text: "ry:", size: 182, weight: W.heavy }], dx: 292, dy: 214 },
      ]}
    />
  </AbsoluteFill>
);
