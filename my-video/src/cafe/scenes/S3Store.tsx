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
import { PhotoCard } from "../props/PhotoCard";
import { Petal, Ribbon } from "../props/Scenery";

const DURATION = shotFrames(3.35, 5.7);
const at = cueIn(3.35);

/**
 * Shot 3 - 3.35s to 5.7s. The experience.
 *
 * The wall goes plain - the relief fades out entirely - and the card carries
 * the shot. The ribbon slices in behind it from the right and exits over the
 * back half of the shot.
 */
export const S3Store: React.FC = () => {
  const frame = useCurrentFrame();

  const parallax = interpolate(frame, [0, DURATION], [0, 1], CLAMP);

  return (
    <Frame name="Shot 3 - Experience" duration={DURATION} camera={[1, 1.05]}>
      <Wall emblem={0} />

      <AbsoluteFill
        style={{
          translate: `${interpolate(frame, [46, DURATION], [0, -150], {
            ...CLAMP,
            easing: OUT,
          }).toFixed(2)}px 0`,
          opacity: interpolate(frame, [50, DURATION], [1, 0], CLAMP),
        }}
      >
        <Ribbon
          path="rightDown"
          sweep={interpolate(frame, [5, 34], [0, 1], { ...CLAMP, easing: OUT })}
        />
      </AbsoluteFill>

      <Float
        name="Storefront card"
        x={CARD_X}
        y={CARD_Y}
        rot={2}
        fromY={CARD_H + 120}
        fromRot={0}
        travel={30}
        seed={1}
        driftAmount={0.4}
        zIndex={2}
        shadow="none"
      >
        <PhotoCard width={CARD_W} height={CARD_H}>
          <Storefront parallax={parallax} />
        </PhotoCard>
      </Float>

      <Float
        name="Petal - top left"
        x={-130}
        y={-80}
        rot={10}
        fromX={-60}
        fromY={-50}
        travel={40}
        tumble={4}
        seed={5}
        driftAmount={2.6}
        defocus={32}
        opacity={0.46}
        shadow="none"
        zIndex={5}
      >
        <Petal size={340} />
      </Float>
      <Float
        name="Petal - bottom right"
        x={534}
        y={1058}
        rot={-16}
        fromX={80}
        fromY={70}
        travel={44}
        tumble={-3}
        start={8}
        seed={8}
        driftAmount={2.8}
        defocus={36}
        opacity={0.4}
        shadow="none"
        zIndex={5}
      >
        <Petal size={360} />
      </Float>

      <Text
        start={at(3.7)}
        role="lightItalic"
        size={30}
        // Four words across the 0.4s the brief gives the line.
        stagger={4}
        style={{ top: 194 }}
      >
        They focused on experience
      </Text>
    </Frame>
  );
};
