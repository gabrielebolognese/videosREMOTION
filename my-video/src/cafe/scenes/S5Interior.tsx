import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, Frame } from "../lib/Frame";
import { Float } from "../lib/Float";
import { Text } from "../lib/Type";
import { Wall } from "../lib/Wall";
import {
  CARD_H,
  CARD_W,
  CARD_X,
  CARD_Y,
  cueIn,
  shotFrames,
} from "../lib/tokens";
import { Interior } from "../photos/Interior";
import { Bloom, PhotoCard } from "../props/PhotoCard";
import { Petal, Ribbon } from "../props/Scenery";

const DURATION = shotFrames(6.6, 7.9);
const at = cueIn(6.6);

/**
 * Shot 5 - 6.6s to 7.9s. Cozy cafés.
 *
 * The swap here is a bloom: the card blows to near white for four frames and
 * the new interior resolves out of it. The caption comes up out of the same
 * flash rather than after it.
 */
export const S5Interior: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Frame name="Shot 5 - Cozy cafes" duration={DURATION} camera={[1, 1.015]}>
      <Wall emblem={0} />

      <AbsoluteFill>
        <Ribbon path="wedgeTopLeft" />
        <Ribbon path="wedgeRight" />
      </AbsoluteFill>

      <Float
        name="Interior card"
        x={CARD_X}
        y={CARD_Y}
        rot={2}
        travel={1}
        seed={2}
        driftAmount={0.3}
        zIndex={2}
        shadow="none"
      >
        <div style={{ position: "relative" }}>
          <PhotoCard width={CARD_W} height={CARD_H}>
            <Interior pan={interpolate(frame, [0, DURATION], [0, 1], CLAMP)} />
          </PhotoCard>
          {/* four frames of white, then the image resolves out of it */}
          <Bloom
            amount={interpolate(frame, [0, 4, 10], [0.94, 0.86, 0], CLAMP)}
          />
        </div>
      </Float>

      <Float
        name="Petal - top right"
        x={498}
        y={-110}
        rot={-10}
        travel={1}
        tumble={-4}
        seed={6}
        driftAmount={2.8}
        defocus={32}
        opacity={0.44}
        shadow="none"
        zIndex={5}
      >
        <Petal size={320} />
      </Float>

      <Text
        start={at(6.7)}
        role="lightItalic"
        size={30}
        style={{ top: 194 }}
      >
        cozy cafés
      </Text>
    </Frame>
  );
};
