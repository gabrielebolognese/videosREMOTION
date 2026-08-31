import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { CreamField, InkCorners } from "../lib/Backdrop";
import { CLAMP, POP, POP_FRAMES } from "../lib/motion";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import {
  CONDENSED,
  CONTACT_DEEP,
  CRIMSON,
  cueIn,
  WORDMARK,
} from "../lib/tokens";
import { ArmSilhouette, BanknoteArm, BulbArm } from "../props/Hands";

const at = cueIn(19.7);

/**
 * The single frame in the whole piece that is not a hard cut: the flat black
 * arm is replaced by the two photographic ones over two frames, which puts
 * exactly one frame on screen with both of them at half strength.
 */
const SWAP = at(20.9);

/**
 * Shot 8 - 19.7s to 22.8s. End card.
 *
 * Cream, one torn corner, and the two forearms - money and idea - brought in
 * from opposite corners until the note and the bulb almost touch. The headline
 * and the wordmark lock at the top and hold to the last frame.
 */
export const S8Follow: React.FC = () => {
  const frame = useCurrentFrame();

  // Two frames wide, so frame SWAP itself is the one blended frame.
  const toArms = interpolate(frame, [SWAP - 1, SWAP + 1], [0, 1], CLAMP);

  return (
    <Shot
      name="Shot 8 - Follow before your competitor"
      backdrop={<CreamField />}
      overlay={
        <InkCorners
          start={at(19.75)}
          travel={7}
          bottomLeft={false}
          distance={1.3}
        />
      }
    >
      <Prop
        name="Black arm silhouette"
        x={128}
        y={672}
        rot={-2}
        fromY={180}
        fromScale={0.94}
        start={at(19.8)}
        travel={16}
        seed={4}
        driftAmount={0.7}
        border={0}
        opacity={1 - toArms}
      >
        <ArmSilhouette width={462} />
      </Prop>

      <Prop
        name="Forearm with the banknote"
        x={-30}
        y={618}
        rot={-3}
        fromX={-130}
        fromY={-96}
        start={SWAP - 1}
        travel={18}
        seed={1}
        driftAmount={1.1}
        border={5}
        shadow={CONTACT_DEEP}
        opacity={toArms}
      >
        <BanknoteArm width={420} />
      </Prop>

      <Prop
        name="Forearm with the lightbulb"
        x={250}
        y={704}
        rot={2}
        fromX={140}
        fromY={110}
        start={SWAP - 1}
        travel={18}
        seed={6}
        driftAmount={1.2}
        border={5}
        shadow={CONTACT_DEEP}
        opacity={toArms}
      >
        <BulbArm width={420} />
      </Prop>

      <Stack
        name="Follow before your / competitor figures this out"
        style={{ top: 146 }}
        lines={[
          {
            pieces: [{ text: "Follow before your" }],
            start: at(19.95),
            size: 58,
            align: "center",
            stagger: 6,
          },
          {
            pieces: [{ text: "competitor figures this out" }],
            start: at(20.5),
            size: 52,
            align: "center",
            stagger: 6,
            gapAbove: 6,
          },
        ]}
      />

      <Interactive.Div
        name="Brand wordmark"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 306,
          textAlign: "center",
          fontFamily: CONDENSED,
          fontWeight: 700,
          fontSize: 62,
          letterSpacing: "0.06em",
          color: CRIMSON,
          opacity: frame >= at(21.3) ? 1 : 0,
          scale: interpolate(
            frame,
            [at(21.3), at(21.3) + POP_FRAMES],
            [1.05, 1],
            { ...CLAMP, easing: POP, output: "perceptual-scale" },
          ),
        }}
      >
        {WORDMARK}
      </Interactive.Div>
    </Shot>
  );
};
