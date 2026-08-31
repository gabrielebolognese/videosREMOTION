import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { fade } from "@remotion/transitions/fade";
import { flip } from "@remotion/transitions/flip";
import { filmBurn } from "@remotion/transitions/film-burn";
import { iris } from "@remotion/transitions/iris";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { pushCut } from "@remotion/transitions/push-cut";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Grain, HandleMark, LiftedBlacks } from "./lib/Backdrop";
import { NEAR_BLACK, TRANSITION_GROUND } from "./lib/tokens";
import { ExpectationsShot } from "./scenes/ExpectationsShot";
import {
  G10Design,
  G1NotWell,
  G2Doctor,
  G3Clinics,
  G4Playful,
  G5Calm,
  G6Instantly,
  G7Spoken,
  G8Brain,
  G9Vocabulary,
} from "./scenes/groups";
import { OutroShot } from "./scenes/OutroShot";

/**
 * 23.7s silent 9:16 branding carousel, 30fps, 711 frames.
 *
 * Twelve scenes joined by eleven boundaries, and no two are the same move:
 * slide up, slide down, page flip, film burn, wipe, clock wipe, iris, zoom
 * push cut, cross dissolve, a hard cut, then a diagonal wipe out to the outro.
 *
 * Scene durations include the frames their incoming transition overlaps, so
 * the readable time of each scene is unchanged and the total still lands on
 * 711: 859 frames of scenes minus 148 frames of overlap.
 *
 * There is no separate subtitle layer: the kinetic type in frame is the
 * burn-in, laid out in the upper and middle third exactly as the brief asks.
 */
export const BrandingCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: TRANSITION_GROUND }}>
      <AbsoluteFill
        name="Camera"
        style={{
          scale: interpolate(frame, [0, 711], [1, 1.05], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
          translate: interpolate(frame, [0, 711], ["0px 0px", "0px -18px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
        }}
      >
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={60}>
            <G1NotWell />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 16 })}
            presentation={slide({ direction: "from-bottom" })}
          />
          <TransitionSeries.Sequence durationInFrames={58}>
            <G2Doctor />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 14 })}
            presentation={slide({ direction: "from-top" })}
          />
          <TransitionSeries.Sequence durationInFrames={47}>
            <G3Clinics />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 14 })}
            presentation={flip({ direction: "from-right", perspective: 1500 })}
          />
          <TransitionSeries.Sequence durationInFrames={74}>
            <G4Playful />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 12 })}
            presentation={filmBurn({ seed: 4 })}
          />
          <TransitionSeries.Sequence durationInFrames={57}>
            <G5Calm />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 14 })}
            presentation={wipe({ direction: "from-left" })}
          />
          <TransitionSeries.Sequence durationInFrames={59}>
            <G6Instantly />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 16 })}
            presentation={clockWipe({ width, height })}
          />
          <TransitionSeries.Sequence durationInFrames={76}>
            <G7Spoken />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 14 })}
            presentation={iris({ width, height })}
          />
          <TransitionSeries.Sequence durationInFrames={104}>
            <G8Brain />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 18 })}
            presentation={pushCut({
              outgoingScale: 1.2,
              incomingStartScale: 0.84,
              incomingEndScale: 1,
              flashColor: NEAR_BLACK,
              flashOpacity: 0.14,
              flashFrames: 2,
            })}
          />
          <TransitionSeries.Sequence durationInFrames={63}>
            <G9Vocabulary />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 16 })}
            presentation={fade()}
          />
          <TransitionSeries.Sequence durationInFrames={73}>
            <G10Design />
          </TransitionSeries.Sequence>

          {/* The brief's hard cut - no transition element at all. */}
          <TransitionSeries.Sequence durationInFrames={87}>
            <ExpectationsShot />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            timing={linearTiming({ durationInFrames: 14 })}
            presentation={wipe({ direction: "from-bottom-left" })}
          />
          <TransitionSeries.Sequence durationInFrames={101}>
            <OutroShot />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>

      <LiftedBlacks />
      <Grain />
      <HandleMark />
    </AbsoluteFill>
  );
};
