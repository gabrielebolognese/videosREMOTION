import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import {
  BlurDefs,
  CLAMP,
  EdgeDefocus,
  GLIDE,
  Grain,
  LightSweep,
  Wall,
  penBlurAt,
  whipBlurAt,
} from "./lib/Wall";
import { Credits, LogoLockup, Tagline } from "./lib/Furniture";
import { Lockup } from "./lib/Type";
import { AppWindow } from "./props/AppWindow";
import { DotArray, Sparkle } from "./props/Marks";
import { PenNib } from "./props/PenNib";
import { Waves } from "./props/Waves";
import { DURATION, PAPER, sec } from "./lib/tokens";

/**
 * GRIDS - 10.0s, 9:16, 720x1280, 24fps, silent.
 *
 * One unbroken take. There is no <Series> and no cut anywhere in this tree:
 * every element animates against the master clock, and the six "shots" in the
 * tokens file are timeline labels for scrubbing, not boundaries in the render.
 *
 * The z-order is load-bearing. "design." is painted below the waves so the
 * wave edge masks it as it rises out from behind them at 1.9s; the window and
 * the pen sit above the waves so they read as floating in front of the stack.
 *
 * There is no <Audio> anywhere in this tree, by design.
 */
export const GridsOpener: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: PAPER, overflow: "hidden" }}>
      <BlurDefs vertical={whipBlurAt(frame)} horizontal={penBlurAt(frame)} />

      {/* The one camera move: an extremely slow push that runs unbroken from
          the first frame, slows through 7.9s and is at a full stop by 8.8s. */}
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, sec(8.8)], [1, 1.062], {
            ...CLAMP,
            easing: GLIDE,
            output: "perceptual-scale",
          }),
        }}
      >
        <Wall />
        <Sparkle />
        <Lockup />
        <Waves />
        <AppWindow />
        <PenNib />
        <DotArray />
        <LogoLockup />
        <Tagline />
        <Credits />
        <LightSweep />
      </AbsoluteFill>

      <EdgeDefocus />
      <Grain />
    </AbsoluteFill>
  );
};

/**
 * A preview window onto the master timeline. The negative offset means the
 * child still sees its absolute frame, so scrubbing a shot in the Studio shows
 * exactly the frames the full render produces - continuity included.
 */
export const GridsShot: React.FC<{ from: number }> = ({ from }) => (
  <Sequence from={-sec(from)} durationInFrames={DURATION}>
    <GridsOpener />
  </Sequence>
);
