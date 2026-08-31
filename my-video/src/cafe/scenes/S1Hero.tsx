import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT } from "../lib/Frame";
import { Float } from "../lib/Float";
import { Frame } from "../lib/Frame";
import { Text } from "../lib/Type";
import { Wall } from "../lib/Wall";
import { cueIn, NAVY, shotFrames } from "../lib/tokens";
import { Cup } from "../props/Cup";
import { Petal, Ribbon } from "../props/Scenery";

const DURATION = shotFrames(0, 2.1);
const at = cueIn(0);

/**
 * Shot 1 - 0.0s to 2.1s. The hero.
 *
 * Locked frontal on the embossed roundel with a slow continuous pull back. The
 * cup rises into frame and settles dead centre over the emblem; the ribbon
 * draws itself in behind it; two spare cups tumble through the corners.
 */
export const S1Hero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Frame name="Shot 1 - Hero cup" duration={DURATION} camera={[1.06, 1]}>
      <Wall />

      <AbsoluteFill>
        <Ribbon
          path="leftDown"
          sweep={interpolate(frame, [3, 30], [0, 1], { ...CLAMP, easing: OUT })}
        />
      </AbsoluteFill>

      <Float
        name="Tumbling cup - top right"
        x={548}
        y={70}
        rot={22}
        fromX={210}
        fromY={-190}
        fromRot={-40}
        travel={44}
        tumble={9}
        seed={4}
        driftAmount={1.4}
        defocus={1.6}
      >
        <Cup width={118} badge={false} />
      </Float>

      <Float
        name="Tumbling cup - bottom left"
        x={12}
        y={1040}
        rot={-26}
        fromX={-180}
        fromY={220}
        fromRot={44}
        travel={46}
        tumble={-7}
        start={5}
        seed={6}
        driftAmount={1.4}
        defocus={2.2}
      >
        <Cup width={104} badge={false} />
      </Float>

      <Float
        name="Hero cup"
        x={210}
        y={390}
        fromY={560}
        travel={30}
        seed={1}
        driftAmount={0.5}
        zIndex={3}
        shadow="drop-shadow(14px 22px 28px rgba(64,78,70,0.26))"
      >
        <Cup width={300} />
      </Float>

      {/* foreground bokeh, arriving late so it never fights the settle */}
      <Float
        name="Petal - top left"
        x={-70}
        y={-40}
        rot={12}
        fromX={-80}
        fromY={-70}
        travel={30}
        start={36}
        tumble={5}
        seed={8}
        driftAmount={2.4}
        defocus={30}
        opacity={0.5}
        shadow="none"
        zIndex={5}
      >
        <Petal size={300} />
      </Float>
      <Float
        name="Petal - bottom right"
        x={506}
        y={1046}
        rot={-18}
        fromX={110}
        fromY={110}
        travel={32}
        start={42}
        tumble={-4}
        seed={9}
        driftAmount={2.6}
        defocus={34}
        opacity={0.44}
        shadow="none"
        zIndex={5}
      >
        <Petal size={340} />
      </Float>

      <Text
        start={at(0.4)}
        role="script"
        size={40}
        color={NAVY}
        anim="fade"
        align="flex-start"
        shadow="0 2px 6px rgba(64,78,70,0.20)"
        style={{ top: 54, left: 52, right: "auto" }}
        name="Studio watermark"
      >
        studio
      </Text>

      <Text
        start={at(0.3)}
        role="light"
        size={30}
        stagger={3}
        anim="pop"
        rotate={-6}
        align="flex-end"
        style={{ top: 236, right: 62 }}
      >
        This is how
      </Text>
      <Text
        start={at(0.6)}
        role="heavy"
        size={62}
        anim="pop"
        fromScale={0.92}
        rotate={-6}
        slant={-6}
        align="flex-end"
        style={{ top: 282, right: 54 }}
      >
        one coffee chain
      </Text>

      <Text
        start={at(1.1)}
        role="light"
        size={26}
        align="flex-start"
        style={{ top: 904, left: 60 }}
      >
        built a
      </Text>
      <Text
        start={at(1.3)}
        role="serif"
        size={92}
        align="flex-start"
        style={{ top: 944, left: 52 }}
      >
        lifestyle
      </Text>
    </Frame>
  );
};
