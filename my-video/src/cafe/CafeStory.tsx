import { AbsoluteFill, Series } from "remotion";
import { SHOTS, shotFrames, WALL_DEEP } from "./lib/tokens";
import { S1Hero } from "./scenes/S1Hero";
import { S2Trio } from "./scenes/S2Trio";
import { S3Store } from "./scenes/S3Store";
import { S4Transit } from "./scenes/S4Transit";
import { S5Interior } from "./scenes/S5Interior";
import { S6Table } from "./scenes/S6Table";
import { S7Return } from "./scenes/S7Return";
import { S8Close } from "./scenes/S8Close";

const SCENES = [
  S1Hero,
  S2Trio,
  S3Store,
  S4Transit,
  S5Interior,
  S6Table,
  S7Return,
  S8Close,
];

/**
 * THE FEELING - 12.0s, 9:16, 720x1280, 30fps, silent.
 *
 * Eight shots on a steady beat grid, cutting at 2.1s, 3.35s, 5.7s, 6.6s, 7.9s,
 * 8.95s and 9.95s. Every cut is hard; the only transitions that are not are
 * the three card swaps in the middle, and each of those lives inside the shot
 * it belongs to - a vertical carousel, a white bloom, and a bare 3% scale up.
 *
 * There is no <Audio> anywhere in this tree, by design.
 */
export const CafeStory: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: WALL_DEEP }}>
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
