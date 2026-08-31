import { Interactive } from "remotion";
import { PaperField } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Line, Stack } from "../lib/Type";
import { cueIn, INK, shotFrames } from "../lib/tokens";
import { PocketWatch } from "../props/PocketWatch";

const DURATION = shotFrames(5.85, 8.6);
const at = cueIn(5.85);

/**
 * Shot 3 - 5.85s to 8.6s. Forty years.
 *
 * Back to the sheet, on one big object: the watch swings in from the bottom
 * right, rotates a few degrees and settles, chain running out of frame. The
 * numeral is the only gradient fill in the piece.
 */
export const S3Watch: React.FC = () => {
  return (
    <Shot
      name="Shot 3 - Forty years"
      duration={DURATION}
      backdrop={<PaperField />}
      enter="whip"
      enterDir={-1}
      exit="crossBlur"
      push={[1, 1.07]}
    >
      <Prop
        name="Copper pocket watch"
        x={92}
        y={516}
        rot={-6}
        fromX={300}
        fromY={430}
        fromRot={26}
        fromScale={1.08}
        travel={30}
        smear={86}
        seed={2}
        driftAmount={0.9}
        shadow="drop-shadow(0 30px 38px rgba(24,24,24,0.38))"
      >
        <PocketWatch width={624} />
      </Prop>

      <Stack
        name="You had to fast forward"
        style={{ top: 188 }}
        lines={[
          {
            words: ["You", "had", "to", "fast", "forward"],
            start: at(6.1),
            size: 50,
            color: INK,
          },
        ]}
      />

      <Interactive.Div
        name="40 years of your life"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 268,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 22,
        }}
      >
        <Line
          words={["40"]}
          start={at(7.2)}
          size={218}
          pop
          gradient={["#2036D8", "#7FC4FF"]}
          glow="blue"
          name="40"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            paddingTop: 26,
          }}
        >
          <Line words={["years", "of"]} start={at(7.55)} size={60} color={INK} />
          <Line
            words={["your", "life"]}
            start={at(7.85)}
            size={60}
            color={INK}
            offsetX={-8}
          />
        </div>
      </Interactive.Div>
    </Shot>
  );
};
