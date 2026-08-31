import { PinkField } from "../lib/Backdrop";
import { GlitchStack } from "../lib/Glitch";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { BLUSH, CONTACT_DEEP, cueIn } from "../lib/tokens";
import { DespairBust } from "../props/Busts";
import { MallowCluster } from "../props/Flora";

const at = cueIn(15.9);

/**
 * Shot 6 - 15.9s to 17.5s. No message, no memory.
 *
 * The shortest shot and the only one that breaks the pop-in rule: the two
 * condensed words are thrown in on a hard horizontal offset, and 0.8s later
 * the lower one is replaced on a single torn frame. Everything else in the
 * frame - the blooms, the bust - is there to be knocked off balance by it.
 */
export const S6NoMemory: React.FC = () => {
  return (
    <Shot name="Shot 6 - No message, no memory" base={BLUSH} backdrop={<PinkField />}>
      <Prop
        name="Mallow cluster - top left"
        x={-46}
        y={-30}
        rot={-16}
        fromScale={0.42}
        start={at(15.92)}
        travel={12}
        seed={3}
        driftAmount={1.7}
        border={4}
      >
        <MallowCluster scale={0.92} />
      </Prop>

      <Prop
        name="Mallow cluster - lower right"
        x={430}
        y={1010}
        rot={22}
        fromScale={0.42}
        start={at(16.02)}
        travel={12}
        seed={9}
        driftAmount={1.5}
        border={4}
        zIndex={3}
      >
        <MallowCluster scale={0.86} />
      </Prop>

      <Prop
        name="Despairing marble bust"
        x={218}
        y={636}
        rot={1}
        fromY={430}
        start={at(15.94)}
        travel={18}
        seed={2}
        driftAmount={0.9}
        border={5}
        shadow={CONTACT_DEEP}
        zIndex={2}
      >
        <DespairBust width={470} />
      </Prop>

      <GlitchStack
        top="NO"
        bottomA="MESSAGE"
        bottomB="MEMORY"
        start={at(16.0)}
        swapAt={at(16.7)}
        size={76}
        style={{ left: 356, top: 268, zIndex: 5 }}
      />
    </Shot>
  );
};
