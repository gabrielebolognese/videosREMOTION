import { PaperField } from "../lib/Backdrop";
import { STAGGER } from "../lib/motion";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { cueIn, INK, shotFrames } from "../lib/tokens";
import { PhotoCard } from "../props/Photos";

const DURATION = shotFrames(8.6, 11.15);
const at = cueIn(8.6);

/**
 * Shot 4 - 8.6s to 11.15s. Friends and relationships.
 *
 * An almost empty sheet with two photo cards locking into opposite corners.
 * The long second line breaks across two rows rather than shrinking - the word
 * cadence carries straight through the break, so it still reads as one line.
 */
export const S4People: React.FC = () => {
  return (
    <Shot
      name="Shot 4 - Friends"
      duration={DURATION}
      backdrop={<PaperField />}
      enter="crossBlur"
      exit="crossBlur"
      push={[1, 1.055]}
    >
      <Prop
        name="Photo card - friends on the sofa"
        x={26}
        y={168}
        rot={-7}
        fromX={-430}
        fromRot={-14}
        travel={22}
        smear={80}
        seed={1}
        driftAmount={0.8}
        shadow="none"
      >
        <PhotoCard width={338} scene="friends" />
      </Prop>

      <Prop
        name="Photo card - baking in the kitchen"
        x={324}
        y={876}
        rot={6}
        fromX={440}
        fromRot={13}
        travel={22}
        smear={80}
        start={5}
        seed={4}
        driftAmount={0.8}
        shadow="none"
      >
        <PhotoCard width={338} scene="kitchen" />
      </Prop>

      <Stack
        name="and lose all of your / friends and relationships"
        style={{ top: 552 }}
        lines={[
          {
            words: ["and", "lose", "all", "of", "your"],
            start: at(8.9),
            size: 48,
            color: INK,
          },
          {
            words: ["friends", "and"],
            start: at(9.9),
            size: 74,
            color: INK,
            offsetX: -18,
          },
          {
            words: ["relationships"],
            start: at(9.9) + STAGGER * 2,
            size: 74,
            color: INK,
            offsetX: -48,
          },
        ]}
      />
    </Shot>
  );
};
