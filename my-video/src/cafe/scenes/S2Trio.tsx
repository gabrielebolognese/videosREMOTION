import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, Frame, OUT } from "../lib/Frame";
import { Float } from "../lib/Float";
import { Text } from "../lib/Type";
import { Wall } from "../lib/Wall";
import { cueIn, shotFrames } from "../lib/tokens";
import { BlendedDrink } from "../props/BlendedDrink";
import { DashedRing, Petal } from "../props/Scenery";

const DURATION = shotFrames(2.1, 3.35);
const at = cueIn(2.1);

/**
 * Shot 2 - 2.1s to 3.35s. More than just coffee.
 *
 * Same wall, subject smaller. The trio floats up a few pixels and settles
 * while a thin dashed circle draws itself clockwise around all three.
 */
export const S2Trio: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Frame
      name="Shot 2 - More than coffee"
      duration={DURATION}
      camera={[1, 1.02]}
    >
      <Wall />

      <Interactive.Div
        name="Dashed circle"
        style={{ position: "absolute", left: 142, top: 452 }}
      >
        <DashedRing
          size={436}
          // Drawn clockwise across 0.7s, exactly as the brief specifies.
          progress={interpolate(frame, [2, 23], [0, 1], {
            ...CLAMP,
            easing: OUT,
          })}
        />
      </Interactive.Div>

      <Float
        name="Caramel blend"
        x={132}
        y={498}
        rot={-5}
        fromY={16}
        travel={22}
        seed={2}
        driftAmount={0.8}
        defocus={0.8}
      >
        <BlendedDrink width={178} flavour="caramel" />
      </Float>

      <Float
        name="Matcha blend"
        x={412}
        y={498}
        rot={5}
        fromY={16}
        travel={22}
        start={2}
        seed={3}
        driftAmount={0.8}
        defocus={0.8}
      >
        <BlendedDrink width={178} flavour="matcha" />
      </Float>

      <Float
        name="Chocolate blend"
        x={262}
        y={548}
        fromY={18}
        travel={24}
        start={1}
        seed={1}
        driftAmount={0.6}
        zIndex={3}
        shadow="drop-shadow(10px 16px 22px rgba(64,78,70,0.24))"
      >
        <BlendedDrink width={196} flavour="chocolate" />
      </Float>

      <Float
        name="Petal - top right"
        x={520}
        y={-90}
        rot={-14}
        fromX={90}
        fromY={-60}
        travel={34}
        tumble={-5}
        seed={7}
        driftAmount={2.4}
        defocus={30}
        opacity={0.46}
        shadow="none"
        zIndex={5}
      >
        <Petal size={310} />
      </Float>
      <Float
        name="Petal - bottom left"
        x={-116}
        y={1024}
        rot={16}
        fromX={-70}
        fromY={80}
        travel={36}
        tumble={4}
        start={3}
        seed={9}
        driftAmount={2.6}
        defocus={34}
        opacity={0.42}
        shadow="none"
        zIndex={5}
      >
        <Petal size={330} />
      </Float>

      <Text
        start={at(2.15)}
        role="light"
        weight={500}
        size={34}
        tracking="0.1em"
        style={{ top: 300 }}
      >
        More than
      </Text>
      <Text
        start={at(2.55)}
        role="serif"
        size={86}
        anim="pop"
        style={{ top: 906 }}
      >
        just coffee
      </Text>
    </Frame>
  );
};
