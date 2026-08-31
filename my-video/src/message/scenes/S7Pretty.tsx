import { PinkField } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { BLUSH, CRIMSON, cueIn } from "../lib/tokens";
import { MallowCluster } from "../props/Flora";

const at = cueIn(17.5);

/**
 * Shot 7 - 17.5s to 19.7s. Just another pretty logo nobody buys from.
 *
 * The breath before the end card. The statue is gone and the blooms stay where
 * shot 6 left them, so the cut reads as a subtraction rather than a new set -
 * which leaves the middle of the frame empty for the three lines and nothing
 * else competing with them.
 */
export const S7Pretty: React.FC = () => {
  return (
    <Shot name="Shot 7 - Another pretty logo" base={BLUSH} backdrop={<PinkField />}>
      <Prop
        name="Mallow cluster - top left"
        x={-46}
        y={-30}
        rot={-16}
        start={at(17.5)}
        travel={1}
        cruiseX={0.22}
        cruiseY={0.14}
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
        start={at(17.5)}
        travel={1}
        cruiseX={-0.18}
        cruiseY={-0.1}
        seed={9}
        driftAmount={1.5}
        border={4}
      >
        <MallowCluster scale={0.86} />
      </Prop>

      <Stack
        name="Just another / pretty logo / nobody buys from"
        style={{ top: 448 }}
        lines={[
          {
            pieces: [{ text: "just another" }],
            start: at(17.7),
            size: 58,
            align: "left",
          },
          {
            pieces: [
              { text: "pretty", punch: true, size: 92 },
              { text: "logo" },
            ],
            start: at(18.2),
            size: 58,
            align: "right",
            stagger: 7,
            gapAbove: 6,
          },
          {
            pieces: [
              { text: "nobody" },
              // "crimson red bold, oversized" - the sans, not the display face.
              { text: "buys from", color: CRIMSON, size: 82 },
            ],
            start: at(18.85),
            size: 56,
            align: "left",
            stagger: 7,
            gapAbove: 14,
          },
        ]}
      />
    </Shot>
  );
};
