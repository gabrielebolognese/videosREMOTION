import { AbsoluteFill, Series } from "remotion";
import { SHOTS, shotFrames } from "./lib/tokens";
import { S1Bulb } from "./scenes/S1Bulb";
import { S2Crowd } from "./scenes/S2Crowd";
import { S3Traffic } from "./scenes/S3Traffic";
import { S4Noise } from "./scenes/S4Noise";
import { S5Dart } from "./scenes/S5Dart";
import { S6Note } from "./scenes/S6Note";
import { S7Ring } from "./scenes/S7Ring";
import { S8Keyboard } from "./scenes/S8Keyboard";
import { S9Smart } from "./scenes/S9Smart";
import { S10Cta } from "./scenes/S10Cta";

export const SMART_SCENES = [
  S1Bulb,
  S2Crowd,
  S3Traffic,
  S4Noise,
  S5Dart,
  S6Note,
  S7Ring,
  S8Keyboard,
  S9Smart,
  S10Cta,
];

/**
 * SMART MOVES - video nine. 30.0s, 9:16, 720x1280, 30fps, silent.
 *
 * Ten shots, nine of them separated by hard cuts on the beats at 3.4, 6.9,
 * 9.1, 11.7, 15.7, 20.3, 24.0 and 25.6s. The only transition that is not a cut
 * is the circular wipe that opens shot 10 at 27.9s, and that is drawn inside
 * shot 10 rather than between the two - shot 10 re-renders shot 9's body one
 * shot further along its own clock and grows a black disc out of it.
 *
 * The piece alternates two worlds: an off-white seamless plane with blueprint
 * furniture and a drifting pale grey band, and a pure black void lit only by
 * rim light and the glow the type carries itself.
 *
 * There is no <Audio> anywhere in this tree, by design.
 */
export const SmartMoves: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Series>
        {SHOTS.map((shot, i) => {
          const Scene = SMART_SCENES[i];
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
