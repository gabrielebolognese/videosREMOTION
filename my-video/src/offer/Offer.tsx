import { AbsoluteFill, Series } from "remotion";
import { PAPER, SHOTS, shotFrames } from "./lib/tokens";
import { S1Offer } from "./scenes/S1Offer";
import { S2Health } from "./scenes/S2Health";
import { S3Watch } from "./scenes/S3Watch";
import { S4People } from "./scenes/S4People";
import { S5Figure } from "./scenes/S5Figure";
import { S6Money } from "./scenes/S6Money";
import { S7Loved } from "./scenes/S7Loved";
import { S8Peace } from "./scenes/S8Peace";

const SCENES = [
  S1Offer,
  S2Health,
  S3Watch,
  S4People,
  S5Figure,
  S6Money,
  S7Loved,
  S8Peace,
];

/**
 * THE OFFER - 21.2s, 9:16, 720x1280, 30fps, silent.
 *
 * Eight hard cuts at 3.4s, 5.85s, 8.6s, 11.15s, 12.9s, 17.1s and 18.25s. The
 * transitions are not dissolves: each shot carries its own 4-frame whip or
 * cross-blur at both ends, so the cut lands on the exact frame the brief asks
 * for and the smear does the work either side of it.
 *
 * There is no <Audio> anywhere in this tree, by design.
 */
export const Offer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: PAPER }}>
      <Series>
        {SHOTS.map((shot, i) => {
          const Scene = SCENES[i];
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
