import { Frame } from "../lib/Frame";
import { Float } from "../lib/Float";
import { Text } from "../lib/Type";
import { Wall } from "../lib/Wall";
import { cueIn, shotFrames } from "../lib/tokens";
import { Cup } from "../props/Cup";
import { Petal } from "../props/Scenery";

const DURATION = shotFrames(8.95, 9.95);
const at = cueIn(8.95);

/**
 * Shot 7 - 8.95s to 9.95s. It wasn't about coffee.
 *
 * Back to the opening frame, but emptied: the relief has returned, the ribbon
 * has not, and the cup sits small and centred with a single petal in the top
 * right corner.
 */
export const S7Return: React.FC = () => {
  return (
    <Frame
      name="Shot 7 - It wasn't about coffee"
      duration={DURATION}
      camera={[1, 1.03]}
    >
      <Wall vignette={1.2} />

      <Float
        name="Hero cup"
        x={255}
        y={470}
        travel={1}
        cruiseY={-0.22}
        seed={1}
        driftAmount={0.5}
        shadow="drop-shadow(10px 16px 22px rgba(64,78,70,0.24))"
      >
        <Cup width={210} />
      </Float>

      <Float
        name="Petal - top right"
        x={506}
        y={-120}
        rot={-11}
        travel={1}
        tumble={-3}
        seed={5}
        driftAmount={2.4}
        defocus={32}
        opacity={0.42}
        shadow="none"
        zIndex={5}
      >
        <Petal size={320} />
      </Float>

      <Text start={at(9.05)} role="lightItalic" size={36} style={{ top: 292 }}>
        It wasn&apos;t
      </Text>
      <Text start={at(9.35)} role="lightItalic" size={28} style={{ top: 876 }}>
        about
      </Text>
      <Text
        start={at(9.5)}
        role="serif"
        size={96}
        anim="pop"
        style={{ top: 916 }}
      >
        coffee
      </Text>
    </Frame>
  );
};
