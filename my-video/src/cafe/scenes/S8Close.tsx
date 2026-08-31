import { Frame } from "../lib/Frame";
import { Float } from "../lib/Float";
import { Text } from "../lib/Type";
import { Wall } from "../lib/Wall";
import { cueIn, shotFrames } from "../lib/tokens";
import { Cup } from "../props/Cup";
import { Petal } from "../props/Scenery";

const DURATION = shotFrames(9.95, 12);
const at = cueIn(9.95);

/** Every closing line hangs off this one axis. */
const AXIS = 268;

/**
 * Shot 8 - 9.95s to 12.0s. The feeling.
 *
 * A tight close-up: the cup cropped at the left edge, the relief blown up and
 * pushed off to the right and thrown out of focus behind it. Everything has
 * landed by 11.4s, and the last six frames are a dead hold.
 */
export const S8Close: React.FC = () => {
  return (
    <Frame
      name="Shot 8 - The feeling"
      duration={DURATION}
      camera={[1.06, 1]}
      panX={-18}
      grainRamp
    >
      <Wall emblemScale={1.62} emblemX={168} emblemY={-30} emblemBlur={16} vignette={1.25} />

      <Float
        name="Hero cup - cropped"
        x={-192}
        y={378}
        rot={10}
        travel={1}
        seed={1}
        driftAmount={0.45}
        shadow="drop-shadow(18px 26px 34px rgba(64,78,70,0.24))"
      >
        <Cup width={462} />
      </Float>

      <Float
        name="Petal - top right"
        x={512}
        y={-136}
        rot={-9}
        travel={1}
        tumble={-4}
        seed={6}
        driftAmount={2.2}
        defocus={36}
        opacity={0.44}
        shadow="none"
        zIndex={5}
      >
        <Petal size={340} />
      </Float>

      <Text
        start={at(10.35)}
        role="lightItalic"
        size={34}
        align="flex-start"
        style={{ top: 428, left: AXIS }}
      >
        It was
      </Text>
      <Text
        start={at(10.5)}
        role="heavy"
        size={88}
        anim="pop"
        align="flex-start"
        style={{ top: 466, left: AXIS - 4 }}
      >
        about
      </Text>
      <Text
        start={at(10.9)}
        role="lightItalic"
        size={28}
        align="flex-start"
        style={{ top: 584, left: AXIS }}
      >
        the
      </Text>
      <Text
        start={at(11.05)}
        role="serif"
        size={132}
        anim="pop"
        fromScale={0.88}
        align="flex-start"
        style={{ top: 618, left: AXIS - 7 }}
      >
        feeling
      </Text>
    </Frame>
  );
};
