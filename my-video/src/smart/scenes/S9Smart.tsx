import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OVERSHOOT } from "../lib/motion";
import { cueIn, PURPLE_2 } from "../lib/tokens";
import { Row, W } from "../lib/Type";
import { WorldA } from "../lib/Worlds";
import { SunglassesFace } from "../props/Emoji";

const at = cueIn(25.6);

/** Where the smiley sits, so shot 10 can grow its wipe out of the same point. */
export const SMILEY = { size: 380, left: 170, top: 560, cx: 360, cy: 750 };

/**
 * The body of shot 9, taken as a function of its own local frame.
 *
 * Shot 10 renders this too, one shot further along its clock, so the smiley
 * keeps bobbing underneath the circular wipe instead of snapping.
 */
export const Shot9Body: React.FC<{ frame: number }> = ({ frame }) => {
  const bob = Math.sin(frame * 0.12);

  return (
    <>
      <WorldA drift={(frame + 768) / 900} band="diagonal" barcode />

      <Row top={392} name="But not">
        <W start={at(25.9)} size={58} role="bold">
          But not
        </W>
      </Row>
      <Row top={452} name="smart">
        <W start={at(26.8)} size={200} role="bold" color={PURPLE_2}>
          smart
        </W>
      </Row>

      {/* the half-cropped second copy in the bottom left corner */}
      <div style={{ position: "absolute", left: -116, top: 992 }}>
        <SunglassesFace size={300} id="s9-crop" />
      </div>

      {/* the hero smiley, scaling in and then floating */}
      <div
        style={{
          position: "absolute",
          left: SMILEY.left,
          top: SMILEY.top,
          translate: `0px ${(bob * 9).toFixed(2)}px`,
          scale: interpolate(frame, [0, 14], [0.42, 1], {
            ...CLAMP,
            easing: OVERSHOOT,
            output: "perceptual-scale",
          }),
          transformOrigin: `${SMILEY.cx - SMILEY.left}px ${SMILEY.cy - SMILEY.top}px`,
        }}
      >
        <SunglassesFace size={SMILEY.size} id="s9-hero" />
      </div>
    </>
  );
};

/**
 * SHOT 9 - 25.6s to 27.9s. Off-white plane, the pale grey band crossing
 * diagonally, and "smart" running behind the smiley's head.
 */
export const S9Smart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 9 - but not smart">
      <Shot9Body frame={frame} />
    </AbsoluteFill>
  );
};
