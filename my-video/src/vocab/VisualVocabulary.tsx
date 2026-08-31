import { AbsoluteFill, Series } from "remotion";
import { PAPER, SHOTS, shotFrames } from "./lib/tokens";
import {
  S1Suppose,
  S2Doctor,
  S3Clinics,
  S4Compare,
} from "./scenes/Part1";
import {
  S5Instantly,
  S6Spoken,
  S7Brain,
  S8Vocabulary,
  S9Brands,
} from "./scenes/Part2";
import { S10Expect, S11Follow } from "./scenes/Part3";

export const VOCAB_SCENES = [
  S1Suppose,
  S2Doctor,
  S3Clinics,
  S4Compare,
  S5Instantly,
  S6Spoken,
  S7Brain,
  S8Vocabulary,
  S9Brands,
  S10Expect,
  S11Follow,
];

/**
 * VISUAL VOCABULARY - 23.6s, 9:16, 720x1280, 30fps, silent.
 *
 * Eleven blocks driven by text reveals rather than cuts. Only two cuts are
 * hard, at 17.9s and 20.8s; the rest are white blooms at 2.9s, 12.2s and
 * 14.4s, or soft fades on the content layer while the set stays lit.
 *
 * There is no <Audio> anywhere in this tree, by design.
 */
export const VisualVocabulary: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: PAPER }}>
      <Series>
        {SHOTS.map((shot, i) => {
          const Scene = VOCAB_SCENES[i];
          return (
            <Series.Sequence
              key={shot.id}
              durationInFrames={shotFrames(shot.from, shot.to)}
              name={shot.name}
            >
              <Scene />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
