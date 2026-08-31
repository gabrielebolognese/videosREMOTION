import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PaperField } from "../lib/Backdrop";
import { CLAMP, IN, OUT } from "../lib/motion";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { cueIn, shotFrames } from "../lib/tokens";
import { FamilyCutout } from "../props/Photos";

const DURATION = shotFrames(17.1, 18.25);
const at = cueIn(17.1);

/**
 * Shot 7 - 17.1s to 18.25s. Loved ones.
 *
 * The quickest beat in the piece, 35 frames. The family arrives as a doubled
 * exposure and resolves into one sharp layer while the frame drifts left.
 */
export const S7Loved: React.FC = () => {
  const frame = useCurrentFrame();

  // The ghost layer is gone by the time the second line of type has landed.
  const ghost = interpolate(frame, [0, 15], [1, 0], { ...CLAMP, easing: IN });

  return (
    <Shot
      name="Shot 7 - Loved ones"
      duration={DURATION}
      backdrop={<PaperField />}
      enter="crossBlur"
      exit="whip"
      exitDir={-1}
      push={[1, 1.02]}
    >
      <AbsoluteFill
        style={{
          translate: `${interpolate(frame, [0, DURATION], [0, -16], {
            ...CLAMP,
            easing: OUT,
          }).toFixed(2)}px 0`,
        }}
      >
        {/* the ghosted second exposure, sitting under the sharp layer */}
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 542,
            opacity: ghost * 0.62,
            filter: `blur(${(ghost * 9).toFixed(2)}px)`,
            translate: `${(ghost * 34).toFixed(2)}px ${(ghost * -18).toFixed(2)}px`,
            rotate: `${(ghost * 3).toFixed(2)}deg`,
          }}
        >
          <FamilyCutout width={512} />
        </div>

        <Prop
          name="Family of four"
          x={-14}
          y={534}
          rot={-1}
          fromX={-52}
          fromScale={1.05}
          travel={14}
          smear={56}
          seed={2}
          driftAmount={0.5}
          shadow="drop-shadow(0 22px 26px rgba(24,24,24,0.30))"
        >
          <FamilyCutout width={512} />
        </Prop>

        {/* a soft grey scrim so the white type keeps its edge on the sheet */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 400,
            height: 360,
            backgroundImage:
              "radial-gradient(56% 50% at 50% 50%, rgba(30,30,30,0.52) 0%, rgba(30,30,30,0.22) 55%, rgba(30,30,30,0) 76%)",
          }}
        />

        <Stack
          name="more time with / our loved ones"
          style={{ top: 486 }}
          lines={[
            {
              words: ["more", "time", "with"],
              start: at(17.2),
              size: 60,
              color: "#FFFFFF",
              glow: "edge",
              stagger: 2.4,
            },
            {
              words: ["our", "loved", "ones"],
              start: at(17.2) + 5,
              size: 78,
              color: "#FFFFFF",
              glow: "edge",
              offsetX: -28,
              stagger: 2.4,
            },
          ]}
        />
      </AbsoluteFill>
    </Shot>
  );
};
