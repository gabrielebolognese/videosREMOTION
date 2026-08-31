import { CreamField, InkCorners } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { CONTACT_DEEP, cueIn } from "../lib/tokens";
import { Thinker } from "../props/Thinker";

const at = cueIn(0);

/**
 * Shot 1 - 0.0s to 2.6s. Nobody's gonna tell you this.
 *
 * Cream sheet, dotted grid through the middle band, torn ink pushing in at two
 * opposite corners. The thinker slides up off the bottom edge into the lower
 * two thirds and then only floats, which leaves the whole upper third for the
 * three lines to land in.
 */
export const S1Nobody: React.FC = () => {
  return (
    <Shot
      name="Shot 1 - Nobody's gonna tell you"
      backdrop={<CreamField grid gridBand={[26, 78]} />}
      overlay={<InkCorners start={at(0)} travel={8} />}
    >
      <Prop
        name="Marble thinker with laptop"
        x={92}
        y={718}
        rot={-1.5}
        fromY={430}
        start={at(0.1)}
        travel={20}
        seed={2}
        driftAmount={0.9}
        border={5}
        shadow={CONTACT_DEEP}
      >
        <Thinker width={540} />
      </Prop>

      <Stack
        name="Nobody's gonna / tell you this about / your brand"
        style={{ top: 128 }}
        lines={[
          {
            pieces: [{ text: "nobody's gonna" }],
            start: at(0.15),
            size: 62,
            align: "left",
          },
          {
            pieces: [{ text: "tell you", punch: true }, { text: "this about" }],
            start: at(0.75),
            size: 58,
            align: "left",
            offsetX: 26,
            stagger: 7,
            gapAbove: 6,
          },
          {
            pieces: [{ text: "your brand", punch: true, size: 104 }],
            start: at(1.75),
            size: 104,
            align: "right",
            stagger: 8,
            gapAbove: 10,
          },
        ]}
      />
    </Shot>
  );
};
