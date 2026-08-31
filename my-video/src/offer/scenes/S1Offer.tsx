import { AbsoluteFill } from "remotion";
import { Barcode, PaperField } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { cueIn, INK, shotFrames } from "../lib/tokens";
import { CashBrick } from "../props/Money";
import { Jet } from "../props/Jet";

const DURATION = shotFrames(0, 3.4);
const at = cueIn(0);

/**
 * Shot 1 - 0.0s to 3.4s. The offer.
 *
 * Flat-on graphic composition on the printed sheet: the banknote jet cruising
 * the middle third, a brick tumbling into the lower third, a second one hung
 * in the top right corner, everything on its own parallax layer.
 */
export const S1Offer: React.FC = () => {
  return (
    <Shot
      name="Shot 1 - The offer"
      duration={DURATION}
      backdrop={<PaperField />}
      enter="cut"
      exit="whip"
      exitDir={1}
      push={[1, 1.05]}
      rotate={[0, 0.7]}
    >
      <AbsoluteFill>
        <Barcode left={40} top={44} />
      </AbsoluteFill>

      <Prop
        name="Cash brick - hung top right"
        x={452}
        y={26}
        rot={18}
        fromX={90}
        fromY={-70}
        fromScale={1.14}
        travel={18}
        smear={54}
        seed={4}
        defocus={1.4}
        driftAmount={1.4}
      >
        <CashBrick width={296} />
      </Prop>

      <Prop
        name="Banknote jet"
        x={-300}
        y={486}
        rot={5}
        fromX={-130}
        travel={22}
        smear={92}
        cruiseX={6}
        seed={1}
        driftAmount={0.6}
      >
        <Jet width={470} />
      </Prop>

      <Prop
        name="Cash brick - settled low"
        x={54}
        y={952}
        rot={-14}
        fromX={-300}
        fromY={330}
        fromRot={-58}
        fromScale={0.86}
        travel={24}
        smear={70}
        seed={2}
        driftAmount={0.8}
      >
        <CashBrick width={344} />
      </Prop>

      <Stack
        name="If someone / Offered you"
        style={{ top: 726 }}
        lines={[
          { words: ["If", "someone"], start: at(0.2), size: 60, color: INK },
          {
            words: ["Offered", "you"],
            start: at(0.7),
            size: 88,
            color: INK,
            offsetX: -42,
          },
        ]}
      />

      <Stack
        name="$100M / Right Now"
        style={{ top: 252 }}
        lines={[
          {
            words: ["$100M"],
            start: at(1.9),
            size: 122,
            color: INK,
            pop: true,
          },
          {
            words: ["Right", "Now"],
            start: at(2.4),
            size: 88,
            color: INK,
            offsetX: -38,
          },
        ]}
      />
    </Shot>
  );
};
