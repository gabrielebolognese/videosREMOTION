import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT } from "../lib/motion";
import { cueIn, GRAY, PURPLE } from "../lib/tokens";
import { Row, W } from "../lib/Type";
import { WorldA } from "../lib/Worlds";
import { RgbKeyboard } from "../props/Keyboard";

const at = cueIn(24.0);

/**
 * SHOT 8 - 24.0s to 25.6s. The keyboard slides up out of the bottom right
 * corner at a three quarter angle while its backlight crawls left to right.
 */
export const S8Keyboard: React.FC = () => {
  const frame = useCurrentFrame();

  const slide = interpolate(frame, [0, 18], [0, 1], { ...CLAMP, easing: OUT });

  return (
    <AbsoluteFill name="Shot 8 - working hard">
      <WorldA drift={(frame + 720) / 900} band="none" barcode />

      <div
        style={{
          position: "absolute",
          left: 190,
          top: 862,
          rotate: "-12deg",
          transformOrigin: "0px 0px",
          translate: `${interpolate(slide, [0, 1], [300, 0], CLAMP).toFixed(
            1,
          )}px ${interpolate(slide, [0, 1], [340, 0], CLAMP).toFixed(1)}px`,
        }}
      >
        <RgbKeyboard width={620} phase={-frame * 4} />
      </div>

      <Row top={464} left={54} align="flex-start" gap={14} name="Your marketing is">
        <W start={at(24.2)} size={42} role="light">
          Your
        </W>
        <W start={at(24.2) + 2} size={42} role="light">
          marketing
        </W>
        <W start={at(24.2) + 4} size={42} role="light" color={GRAY}>
          is
        </W>
      </Row>
      <Row top={526} left={54} align="flex-start" name="working">
        <W start={at(24.7)} size={76} role="bold" color={PURPLE}>
          working
        </W>
      </Row>
      <Row top={616} left={54} align="flex-start" name="hard">
        <W start={at(25.1)} size={76} role="bold" color={PURPLE}>
          hard
        </W>
      </Row>
    </AbsoluteFill>
  );
};
