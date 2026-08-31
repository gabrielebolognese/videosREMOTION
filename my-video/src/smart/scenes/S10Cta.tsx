import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, GLIDE } from "../lib/motion";
import { cueIn, RED } from "../lib/tokens";
import { Row, W } from "../lib/Type";
import { WorldB } from "../lib/Worlds";
import { Shot9Body, SMILEY } from "./S9Smart";

const at = cueIn(27.9);

/** Frames shot 9 had already run when this one starts, so the bob continues. */
const CARRY = 69;

/** Reaches past the far corner of the frame from the smiley's centre. */
const FULL = 900;

/**
 * SHOT 10 - 27.9s to 30.0s. The only non-cut transition in the piece: a black
 * circle grows out of the smiley, swallows the off-white world, and leaves the
 * call to action assembling on black.
 */
export const S10Cta: React.FC = () => {
  const frame = useCurrentFrame();

  const r = interpolate(frame, [0, 17], [0, FULL], {
    ...CLAMP,
    easing: GLIDE,
  });

  // A slow sine over the tail of the shot, so the CTA breathes on the hold.
  const pulse = interpolate(frame, [46, 62], [0, 1], CLAMP);
  const halo = 1 + pulse * 0.85;

  return (
    <AbsoluteFill name="Shot 10 - hit the DM button">
      <Shot9Body frame={CARRY + frame} />

      {/* the circular wipe */}
      <div
        style={{
          position: "absolute",
          left: SMILEY.cx - r,
          top: SMILEY.cy - r,
          width: r * 2,
          height: r * 2,
          borderRadius: FULL * 2,
          backgroundColor: "#000000",
        }}
      />
      <AbsoluteFill
        style={{ opacity: interpolate(frame, [14, 24], [0, 1], CLAMP) }}
      >
        <WorldB lift={0.8} cy={50} />
      </AbsoluteFill>

      <Row top={512} name="Hit the">
        <W
          start={at(28.6)}
          size={48}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.55)"
          haloStrength={0.7 * halo}
        >
          Hit the
        </W>
      </Row>
      <Row top={568} name="DM">
        <W
          start={at(28.9)}
          size={150}
          role="bold"
          color={RED}
          halo="rgba(255,13,13,0.95)"
          haloStrength={halo}
          tracking="-0.03em"
        >
          DM
        </W>
      </Row>
      <Row top={752} name="button">
        <W
          start={at(29.2)}
          size={48}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.55)"
          haloStrength={0.7 * halo}
        >
          button
        </W>
      </Row>
    </AbsoluteFill>
  );
};
