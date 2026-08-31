import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { PaperField } from "../lib/Backdrop";
import { CLAMP, OUT } from "../lib/motion";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { cueIn, INK, shotFrames } from "../lib/tokens";
import { Heart } from "../props/Heart";
import { Banknote, CashBrick } from "../props/Money";
import { Silhouette } from "../props/Silhouette";

const DURATION = shotFrames(11.15, 12.9);
const at = cueIn(11.15);

/**
 * Shot 5 - 11.15s to 12.9s. The question.
 *
 * The fastest block in the piece. Centred and symmetrical: the figure rises
 * into a full standing frame with the three things it has been offered half
 * out of frame behind it, and a sun comes up behind its head on the last beat.
 */
export const S5Figure: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Shot
      name="Shot 5 - The question"
      duration={DURATION}
      backdrop={<PaperField />}
      enter="crossBlur"
      exit="whip"
      exitDir={1}
      push={[1, 1.06]}
    >
      <Prop
        name="Heart - half out of frame"
        x={-118}
        y={548}
        rot={-12}
        fromX={-70}
        travel={16}
        smear={40}
        seed={6}
        defocus={2}
        driftAmount={1.2}
      >
        <Heart width={236} />
      </Prop>

      <Prop
        name="Cash brick - half out of frame"
        x={-104}
        y={886}
        rot={9}
        fromX={-90}
        travel={16}
        smear={40}
        seed={8}
        defocus={1.6}
        driftAmount={1.2}
      >
        <CashBrick width={286} />
      </Prop>

      <Prop
        name="Banknote - top right"
        x={432}
        y={186}
        rot={-12}
        fromX={110}
        fromY={-60}
        travel={18}
        smear={52}
        seed={9}
        defocus={1.2}
        driftAmount={1.4}
      >
        <Banknote width={332} />
      </Prop>

      {/* the sun coming up behind the figure */}
      <Interactive.Div
        name="Orange bloom"
        style={{
          position: "absolute",
          left: 360 - 340,
          top: 590 - 340,
          width: 680,
          height: 680,
          borderRadius: "50%",
          backgroundImage:
            "radial-gradient(circle, rgba(229,129,71,0.92) 0%, rgba(229,129,71,0.55) 32%, rgba(229,129,71,0.16) 60%, rgba(229,129,71,0) 76%)",
          opacity: interpolate(frame, [at(12.4), at(12.4) + 6], [0, 1], CLAMP),
          scale: interpolate(
            frame,
            [at(12.4), DURATION],
            [0.42, 1.16],
            { ...CLAMP, easing: OUT, output: "perceptual-scale" },
          ),
        }}
      />

      <Prop
        name="Suited silhouette"
        x={190}
        y={442}
        fromY={430}
        travel={20}
        smear={68}
        seed={2}
        driftAmount={0.4}
        zIndex={2}
        shadow="drop-shadow(0 -18px 30px rgba(24,24,24,0.22))"
      >
        <Silhouette width={340} />
      </Prop>

      <Stack
        name="would you take that offer?"
        style={{ top: 146, zIndex: 3 }}
        lines={[
          {
            words: ["would", "you", "take"],
            start: at(11.3),
            size: 64,
            color: INK,
            stagger: 0,
          },
          {
            words: ["that", "offer?"],
            start: at(11.3),
            size: 86,
            color: INK,
            offsetX: -40,
            stagger: 0,
          },
        ]}
      />
    </Shot>
  );
};
