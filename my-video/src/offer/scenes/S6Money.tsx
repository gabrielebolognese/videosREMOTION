import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { PaperField } from "../lib/Backdrop";
import { CLAMP, OUT } from "../lib/motion";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { BLUE, cueIn, INK, shotFrames } from "../lib/tokens";
import { DashedRing } from "../props/Details";
import { Banknote } from "../props/Money";

const DURATION = shotFrames(12.9, 17.1);
const at = cueIn(12.9);

/** The ring finishes drawing here, and turns for the rest of the shot. */
const RING_DRAWN = 30;

/**
 * Shot 6 - 12.9s to 17.1s. Money is important.
 *
 * The breathing shot: one note, one ring, an otherwise empty sheet, and the
 * only line turnover in the piece that wipes rather than cuts.
 */
export const S6Money: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Shot
      name="Shot 6 - Money is important"
      duration={DURATION}
      backdrop={<PaperField />}
      enter="whip"
      enterDir={1}
      exit="crossBlur"
      push={[1, 1.05]}
    >
      <Interactive.Div
        name="Dashed blue ring"
        style={{
          position: "absolute",
          left: 100,
          top: 107,
          filter: "drop-shadow(0 10px 16px rgba(30,32,120,0.22))",
        }}
      >
        <DashedRing
          size={520}
          progress={interpolate(frame, [8, RING_DRAWN], [0, 1], {
            ...CLAMP,
            easing: OUT,
          })}
          rotate={interpolate(frame, [RING_DRAWN, DURATION], [0, 64], CLAMP)}
        />
      </Interactive.Div>

      <Prop
        name="Hundred dollar note"
        x={160}
        y={280}
        rot={-2}
        fromX={180}
        fromScale={1.06}
        travel={20}
        smear={70}
        seed={3}
        driftAmount={2.2}
        shadow="drop-shadow(0 20px 26px rgba(24,24,24,0.30))"
      >
        <Banknote width={400} />
      </Prop>

      <Stack
        name="Money is Important / in so much"
        style={{ top: 706 }}
        lines={[
          {
            words: ["Money", "is", "Important"],
            start: at(13.3),
            size: 60,
            color: INK,
            exitAt: at(14.8),
            exitKind: "wipe",
          },
          {
            words: ["in", "so", "much"],
            start: at(13.9),
            size: 82,
            color: INK,
            offsetX: -44,
            exitAt: at(14.8),
            exitKind: "wipe",
          },
        ]}
      />

      <Stack
        name="as it gets us / those other things"
        style={{ top: 706 }}
        lines={[
          {
            words: ["as", "it", "gets", "us"],
            start: at(15.2),
            size: 62,
            color: INK,
          },
          {
            words: ["those", "other", "things"],
            start: at(15.9),
            // Three words spread across the 1.1s the brief gives them.
            stagger: 14,
            size: 64,
            color: BLUE,
            offsetX: -30,
          },
        ]}
      />
    </Shot>
  );
};
