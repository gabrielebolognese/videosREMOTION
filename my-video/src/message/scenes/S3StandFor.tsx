import { BurgundyArc, CreamField } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { CONTACT_DEEP, cueIn } from "../lib/tokens";
import { PhoneBust } from "../props/Busts";
import { Hummingbird } from "../props/Flora";

const at = cueIn(4.9);

/**
 * Shot 3 - 4.9s to 8.5s. And zero minutes deciding what you actually stand for.
 *
 * The longest text shot: four lines, alternating which edge they hang off, so
 * the eye zigzags down to the punch. The burgundy line draws in behind the
 * bust before the bust arrives, and the hummingbird crosses in the last second
 * to keep the frame alive while the last line holds.
 */
export const S3StandFor: React.FC = () => {
  return (
    <Shot
      name="Shot 3 - What you actually stand for"
      backdrop={
        <>
          <CreamField />
          <BurgundyArc start={at(4.95)} travel={26} />
        </>
      }
    >
      <Prop
        name="Marble bust with the phone"
        x={116}
        y={676}
        rot={1.5}
        fromY={470}
        start={at(4.98)}
        travel={22}
        seed={2}
        driftAmount={0.85}
        border={5}
        shadow={CONTACT_DEEP}
      >
        <PhoneBust width={500} />
      </Prop>

      <Prop
        name="Hummingbird crossing"
        x={-260}
        y={640}
        rot={-8}
        start={at(7.3)}
        travel={10}
        cruiseX={24}
        cruiseY={-1.4}
        seed={7}
        driftAmount={2.6}
        border={3}
        zIndex={4}
      >
        <Hummingbird width={168} />
      </Prop>

      <Stack
        name="And zero minutes / deciding / what you / actually stand for"
        style={{ top: 116 }}
        lines={[
          {
            pieces: [{ text: "and zero minutes" }],
            start: at(5.05),
            size: 58,
            align: "left",
          },
          {
            pieces: [{ text: "deciding" }],
            start: at(5.7),
            size: 62,
            align: "right",
            gapAbove: 4,
          },
          {
            pieces: [{ text: "what you" }],
            start: at(6.25),
            size: 58,
            align: "left",
            offsetX: 132,
            gapAbove: 4,
          },
          {
            pieces: [{ text: "actually stand for", punch: true, size: 92 }],
            start: at(6.9),
            size: 92,
            align: "left",
            stagger: 8,
            gapAbove: 10,
          },
        ]}
      />
    </Shot>
  );
};
