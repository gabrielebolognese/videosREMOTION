import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, Frame, OUT } from "../lib/Frame";
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
import { Table } from "../photos/Table";
import { PhotoCard } from "../props/PhotoCard";
import { Petal, Ribbon } from "../props/Scenery";

const DURATION = shotFrames(7.9, 8.95);
const at = cueIn(7.9);

/**
 * Shot 6 - 7.9s to 8.95s. Work sessions.
 *
 * Hard cut swap, no flash. The only thing marking the change is a 3% scale up
 * on the card that settles inside the first third of a second.
 */
export const S6Table: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Frame name="Shot 6 - Work sessions" duration={DURATION} camera={[1, 1.012]}>
      <Wall emblem={0} />

      <AbsoluteFill>
        <Ribbon path="wedgeTopLeft" />
        <Ribbon path="wedgeRight" />
      </AbsoluteFill>

      <Float
        name="Table card"
        x={CARD_X}
        y={CARD_Y}
        rot={2}
        travel={1}
        seed={3}
        driftAmount={0.3}
        zIndex={2}
        shadow="none"
      >
        <div
          style={{
            scale: interpolate(frame, [0, 11], [1.03, 1], {
              ...CLAMP,
              easing: OUT,
              output: "perceptual-scale",
            }),
          }}
        >
          <PhotoCard width={CARD_W} height={CARD_H}>
            <Table />
          </PhotoCard>
        </div>
      </Float>

      <Float
        name="Petal - top right"
        x={452}
        y={-140}
        rot={-8}
        travel={1}
        cruiseX={-1.1}
        cruiseY={0.5}
        tumble={-5}
        seed={7}
        driftAmount={2.6}
        defocus={38}
        opacity={0.46}
        shadow="none"
        zIndex={5}
      >
        <Petal size={410} />
      </Float>

      <Text
        start={at(7.95)}
        role="lightItalic"
        size={30}
        style={{ top: 194 }}
      >
        work sessions
      </Text>
    </Frame>
  );
};
