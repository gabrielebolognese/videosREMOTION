import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP } from "../lib/motion";
import { cueIn, RED } from "../lib/tokens";
import { W } from "../lib/Type";
import { WorldB } from "../lib/Worlds";

const at = cueIn(6.9);

/** The frame the first line clears and the second one takes its place. */
const SWAP = at(8.05);

const stack: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 512,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 14,
};

/**
 * SHOT 3 - 6.9s to 9.1s. Locked static on empty black. One glowing line at
 * centre, cleared and replaced by a second halfway through.
 */
export const S3Traffic: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 3 - because traffic">
      <WorldB lift={0.7} cy={48} />

      <div
        style={{
          ...stack,
          opacity: interpolate(frame, [SWAP - 3, SWAP], [1, 0], CLAMP),
        }}
      >
        <W
          start={at(7.0)}
          size={46}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.5)"
          haloStrength={0.7}
          name="Because"
        >
          Because
        </W>
        <W
          start={at(7.5)}
          size={96}
          role="bold"
          color={RED}
          halo="rgba(255,13,13,0.9)"
          name="traffic"
        >
          traffic
        </W>
      </div>

      <div
        style={{ ...stack, opacity: frame >= SWAP + 1 ? 1 : 0 }}
      >
        <W
          start={at(8.1)}
          size={46}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.5)"
          haloStrength={0.7}
          name="without"
        >
          without
        </W>
        <W
          start={at(8.6)}
          size={88}
          role="bold"
          color={RED}
          halo="rgba(255,13,13,0.9)"
          name="strategy"
        >
          strategy
        </W>
      </div>
    </AbsoluteFill>
  );
};
