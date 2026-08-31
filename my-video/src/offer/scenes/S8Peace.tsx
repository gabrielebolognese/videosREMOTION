import { useCurrentFrame } from "remotion";
import { PaperField } from "../lib/Backdrop";
import { STAGGER } from "../lib/motion";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { cueIn, FPS, shotFrames } from "../lib/tokens";
import { Dove } from "../props/Dove";
import { Jet } from "../props/Jet";
import { FamilyCutout } from "../props/Photos";
import { Statue } from "../props/Statue";

const DURATION = shotFrames(18.25, 21.2);
const at = cueIn(18.25);

/**
 * Shot 8 - 18.25s to 21.2s. Peace.
 *
 * The held composition. Everything that was offered and everything that was
 * asked for ends up in the same frame, the four text blocks stack up, and the
 * push eases to a full stop for the last 0.6s.
 */
export const S8Peace: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Shot
      name="Shot 8 - Peace"
      duration={DURATION}
      backdrop={<PaperField />}
      enter="whip"
      enterDir={-1}
      exit="cut"
      push={[1, 1.05]}
      settle
    >
      <Prop
        name="Banknote jet"
        x={296}
        y={296}
        rot={-16}
        fromX={520}
        fromRot={-26}
        travel={26}
        smear={96}
        start={4}
        seed={5}
        driftAmount={0.9}
      >
        <Jet width={420} />
      </Prop>

      <Prop
        name="Dove"
        x={424}
        y={46}
        rot={6}
        fromX={250}
        fromY={-150}
        travel={24}
        smear={64}
        start={12}
        seed={7}
        driftAmount={2.4}
        shadow="drop-shadow(0 14px 18px rgba(24,24,24,0.22))"
      >
        <div
          style={{
            // Hovering, not gliding: the wings keep working on the hold.
            scale: `1 ${(1 + 0.07 * Math.sin((frame / FPS) * Math.PI * 3.4)).toFixed(4)}`,
          }}
        >
          <Dove width={268} />
        </div>
      </Prop>

      <Prop
        name="Torch statue"
        x={396}
        y={640}
        rot={1}
        fromY={430}
        fromScale={0.68}
        travel={40}
        smear={58}
        start={18}
        seed={3}
        driftAmount={0.4}
        shadow="drop-shadow(0 -14px 30px rgba(24,24,24,0.22))"
      >
        <Statue width={288} />
      </Prop>

      <Prop
        name="Family of four"
        x={-14}
        y={534}
        rot={-1}
        fromX={-90}
        travel={16}
        smear={62}
        seed={2}
        driftAmount={0.4}
        zIndex={2}
        shadow="drop-shadow(0 22px 26px rgba(24,24,24,0.32))"
      >
        <FamilyCutout width={512} />
      </Prop>

      {/* a soft grey scrim so the white type keeps its edge on the sheet */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          backgroundImage:
            "radial-gradient(62% 26% at 50% 47%, rgba(28,28,28,0.52) 0%, rgba(28,28,28,0.20) 58%, rgba(28,28,28,0) 78%), radial-gradient(56% 14% at 46% 12%, rgba(28,28,28,0.48) 0%, rgba(28,28,28,0.16) 58%, rgba(28,28,28,0) 80%)",
        }}
      />

      <Stack
        name="mental peace and / well being"
        style={{ top: 116, zIndex: 4 }}
        lines={[
          {
            words: ["mental", "peace", "and"],
            start: at(18.4),
            size: 58,
            color: "#FFFFFF",
            glow: "edge",
          },
          {
            words: ["well", "being"],
            start: at(18.4) + STAGGER * 3,
            size: 78,
            color: "#FFFFFF",
            glow: "edge",
            offsetX: -44,
          },
        ]}
      />

      <Stack
        name="memories"
        style={{ top: 546, zIndex: 4 }}
        lines={[
          {
            words: ["memories"],
            start: at(18.6),
            size: 104,
            color: "#FFFFFF",
            glow: "edge",
          },
        ]}
      />

      <Stack
        name="happynes"
        style={{ top: 660, zIndex: 4 }}
        lines={[
          {
            words: ["happynes"],
            start: at(19.3),
            size: 86,
            color: "#FFFFFF",
            glow: "edge",
            offsetX: -30,
          },
        ]}
      />
    </Shot>
  );
};
