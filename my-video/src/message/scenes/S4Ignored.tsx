import { PinkField } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { BLUSH, CONTACT_DEEP, cueIn } from "../lib/tokens";
import { ChessQueen, Recliner } from "../props/Objects";

const at = cueIn(8.5);

/**
 * Shot 4 - 8.5s to 12.2s. Looks expensive and still gets ignored.
 *
 * The two queens are pushed into opposite corners so the diagonal between them
 * runs straight through the type, and the five lines are indented one step at
 * a time down that diagonal. The reclining silhouette only arrives for the
 * last second, under the punch line.
 */
export const S4Ignored: React.FC = () => {
  return (
    <Shot name="Shot 4 - Gets ignored" base={BLUSH} backdrop={<PinkField />}>
      <Prop
        name="Chess queen - top left"
        x={-58}
        y={54}
        rot={-44}
        fromX={-150}
        fromY={-90}
        fromRot={-64}
        start={at(8.52)}
        travel={20}
        seed={4}
        driftAmount={1.5}
        border={5}
        defocus={1.1}
      >
        <ChessQueen width={222} />
      </Prop>

      <Prop
        name="Chess queen - bottom right"
        x={452}
        y={848}
        rot={42}
        fromX={190}
        fromY={150}
        fromRot={66}
        start={at(8.62)}
        travel={22}
        seed={8}
        driftAmount={1.3}
        border={5}
        shadow={CONTACT_DEEP}
      >
        <ChessQueen width={268} />
      </Prop>

      <Prop
        name="Reclining silhouette on the armchair"
        x={-36}
        y={952}
        rot={-2}
        fromY={330}
        start={at(11.2)}
        travel={18}
        seed={5}
        driftAmount={0.6}
        border={5}
        shadow={CONTACT_DEEP}
        zIndex={3}
      >
        <Recliner width={520} />
      </Prop>

      <Stack
        name="That's why / your brand looks / expensive / and still / gets ignored"
        style={{ top: 104 }}
        lines={[
          {
            pieces: [{ text: "that's why" }],
            start: at(8.65),
            size: 56,
            align: "left",
          },
          {
            pieces: [
              { text: "your" },
              { text: "brand", punch: true, size: 72 },
              { text: "looks" },
            ],
            start: at(9.2),
            size: 56,
            align: "left",
            offsetX: 34,
            stagger: 6,
            gapAbove: 4,
          },
          {
            pieces: [{ text: "expensive" }],
            start: at(9.8),
            size: 60,
            align: "left",
            offsetX: 74,
            gapAbove: 4,
          },
          {
            pieces: [{ text: "and still" }],
            start: at(10.35),
            size: 56,
            align: "left",
            offsetX: 118,
            gapAbove: 4,
          },
          {
            pieces: [{ text: "gets ignored", punch: true, size: 98 }],
            start: at(10.95),
            size: 98,
            align: "left",
            offsetX: 22,
            stagger: 8,
            gapAbove: 10,
          },
        ]}
      />
    </Shot>
  );
};
