import { AbsoluteFill, Series } from "remotion";
import { CREAM, SHOTS, shotFrames } from "./lib/tokens";
import { S1Nobody } from "./scenes/S1Nobody";
import { S2Logo } from "./scenes/S2Logo";
import { S3StandFor } from "./scenes/S3StandFor";
import { S4Ignored } from "./scenes/S4Ignored";
import { S5Weapon } from "./scenes/S5Weapon";
import { S6NoMemory } from "./scenes/S6NoMemory";
import { S7Pretty } from "./scenes/S7Pretty";
import { S8Follow } from "./scenes/S8Follow";

export const MESSAGE_SCENES = [
  S1Nobody,
  S2Logo,
  S3StandFor,
  S4Ignored,
  S5Weapon,
  S6NoMemory,
  S7Pretty,
  S8Follow,
];

/**
 * THE MESSAGE - 22.8s, 9:16, 720x1280, 30fps, silent.
 *
 * Eight butt cuts at 2.6s, 4.9s, 8.5s, 12.2s, 15.9s, 17.5s and 19.7s. There
 * are no transitions between shots at all - no whips, no dissolves, no camera
 * moves - so every boundary lands on the exact frame the brief asks for. The
 * only blended frame in the piece is inside shot 8, where the black arm hands
 * over to the two photographic ones.
 *
 * The camera is locked off throughout: everything that moves is a paper layer
 * sliding, floating or popping on the sheet.
 *
 * There is no <Audio> anywhere in this tree, by design.
 */
export const TheMessage: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <Series>
        {SHOTS.map((shot, i) => {
          const Scene = MESSAGE_SCENES[i];
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
