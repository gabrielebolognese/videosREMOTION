import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { RedField } from "../lib/Backdrop";
import { CLAMP, OUT } from "../lib/motion";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { BLUE, BRICK, cueIn, FPS, shotFrames } from "../lib/tokens";
import { Cable } from "../props/Details";
import { Heart } from "../props/Heart";
import { Stethoscope } from "../props/Stethoscope";

const DURATION = shotFrames(3.4, 5.85);
const at = cueIn(3.4);

/**
 * Shot 2 - 3.4s to 5.85s. Your health.
 *
 * The one section that swaps the sheet for a flat brick red backdrop. The
 * heart breathes on a slow scale pulse, the cable draws itself down the frame,
 * and the type turns over mid-shot: two white lines out, one blue one in.
 */
export const S2Health: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Shot
      name="Shot 2 - Your health"
      duration={DURATION}
      backdrop={<RedField />}
      base={BRICK}
      enter="whip"
      enterDir={1}
      exit="whip"
      exitDir={-1}
      push={[1, 1.04]}
      vignette={0.85}
    >
      <AbsoluteFill
        style={{
          translate: `0px ${interpolate(frame, [0, DURATION], [0, 22], CLAMP).toFixed(2)}px`,
        }}
      >
        <Cable
          sweep={interpolate(frame, [0, 16], [0, 1], {
            ...CLAMP,
            easing: OUT,
          })}
        />
      </AbsoluteFill>

      <Prop
        name="Anatomical heart"
        x={214}
        y={130}
        rot={-4}
        fromY={-60}
        fromScale={1.12}
        travel={18}
        smear={64}
        seed={3}
        driftAmount={0.7}
        shadow="drop-shadow(0 26px 34px rgba(58,10,8,0.55))"
      >
        <div
          style={{
            // Breathes at roughly one beat per second, never fully at rest.
            scale: (
              1 +
              0.032 * Math.sin((frame / FPS) * Math.PI * 1.8)
            ).toFixed(4),
          }}
        >
          <Heart width={318} glow />
        </div>
      </Prop>

      <Prop
        name="Stethoscope - drifting in from the right"
        x={498}
        y={790}
        rot={16}
        fromX={280}
        travel={26}
        smear={74}
        seed={5}
        driftAmount={1.3}
        shadow="drop-shadow(0 20px 26px rgba(58,10,8,0.5))"
      >
        <Stethoscope width={262} />
      </Prop>

      <Prop
        name="Stethoscope - lower left corner"
        x={-58}
        y={1002}
        rot={-24}
        fromX={-120}
        fromY={90}
        travel={22}
        smear={58}
        start={4}
        seed={7}
        driftAmount={1.1}
        defocus={1.2}
        shadow="drop-shadow(0 20px 26px rgba(58,10,8,0.5))"
      >
        <Stethoscope width={228} />
      </Prop>

      <Stack
        name="But in exchange / You had to give up"
        style={{ top: 616 }}
        lines={[
          {
            words: ["But", "in", "exchange"],
            start: at(3.6),
            size: 56,
            color: "#FFFFFF",
            glow: "soft",
            exitAt: at(5.0),
          },
          {
            words: ["You", "had", "to", "give", "up"],
            start: at(4.1),
            size: 68,
            color: "#FFFFFF",
            glow: "soft",
            offsetX: -30,
            exitAt: at(5.0),
          },
        ]}
      />

      <Stack
        name="YOUR HEALTH"
        style={{ top: 646 }}
        lines={[
          {
            words: ["YOUR", "HEALTH"],
            start: at(5.0),
            size: 80,
            color: BLUE,
            glow: "blue",
            letters: true,
            stagger: 3.4,
          },
        ]}
      />
    </Shot>
  );
};
