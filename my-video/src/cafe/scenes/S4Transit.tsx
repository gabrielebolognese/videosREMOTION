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
import { Storefront } from "../photos/Storefront";
import { Transit } from "../photos/Transit";
import { PhotoCard } from "../props/PhotoCard";
import { Petal, Ribbon } from "../props/Scenery";

const DURATION = shotFrames(5.7, 6.6);
const at = cueIn(5.7);

/** The carousel: both cards travel the same distance on the same curve. */
const SWAP = 13;

/**
 * Shot 4 - 5.7s to 6.6s. Morning routines.
 *
 * A vertical carousel swap. The building card leaves upward while the transit
 * card arrives from below on the identical curve, so the two read as one strip
 * moving rather than two cards crossing.
 */
export const S4Transit: React.FC = () => {
  const frame = useCurrentFrame();

  const slide = interpolate(frame, [0, SWAP], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });
  const travel = CARD_H + 130;

  return (
    <Frame name="Shot 4 - Morning routines" duration={DURATION} camera={[1, 1.01]}>
      <Wall emblem={0} />

      <AbsoluteFill>
        <Ribbon path="wedgeLeft" />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: CARD_X,
          top: CARD_Y,
          rotate: "2deg",
          translate: `0px ${(-slide * travel).toFixed(2)}px`,
          zIndex: 2,
        }}
      >
        <PhotoCard width={CARD_W} height={CARD_H}>
          <Storefront parallax={1} />
        </PhotoCard>
      </div>

      <div
        style={{
          position: "absolute",
          left: CARD_X,
          top: CARD_Y,
          rotate: "2deg",
          translate: `0px ${((1 - slide) * travel).toFixed(2)}px`,
          zIndex: 2,
        }}
      >
        <PhotoCard width={CARD_W} height={CARD_H}>
          {/* the exposure comes up across the shot */}
          <Transit lift={interpolate(frame, [0, DURATION], [0, 1], CLAMP)} />
        </PhotoCard>
      </div>

      <Float
        name="Petal - top right"
        x={512}
        y={-100}
        rot={-12}
        fromX={70}
        fromY={-40}
        travel={40}
        tumble={-4}
        seed={4}
        driftAmount={2.6}
        defocus={32}
        opacity={0.44}
        shadow="none"
        zIndex={5}
      >
        <Petal size={330} />
      </Float>

      <Text
        start={at(5.85)}
        role="lightItalic"
        size={30}
        style={{ top: 194 }}
      >
        Morning routines
      </Text>
    </Frame>
  );
};
