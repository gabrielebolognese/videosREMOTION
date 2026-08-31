import { AbsoluteFill, useCurrentFrame } from "remotion";
import { cueIn, LAVENDER, NAVY, WIRE } from "../lib/tokens";
import { Row, W } from "../lib/Type";
import { WireBox, WorldA } from "../lib/Worlds";
import { ClownFace } from "../props/Emoji";

const at = cueIn(9.1);

const CLOWN = 384;

/**
 * SHOT 4 - 9.1s to 11.7s. Flat graphic space: a thick lavender S-curve running
 * top to bottom, the clown held in a selection box at dead centre, and two
 * ghosted copies cropped into opposite corners.
 */
export const S4Noise: React.FC = () => {
  const frame = useCurrentFrame();

  const bob = Math.sin(frame * 0.13);

  return (
    <AbsoluteFill name="Shot 4 - is just noise">
      <WorldA drift={(frame + 273) / 900} band="none" blueprint={0.7} />

      {/* the lavender S running the full height of the plane */}
      <svg
        width={720}
        height={1280}
        viewBox="0 0 720 1280"
        style={{ position: "absolute", left: 0, top: 0 }}
        fill="none"
      >
        <path
          d="M 560 -80 C 560 240, 160 320, 160 620 C 160 920, 580 980, 560 1360"
          stroke={LAVENDER}
          strokeWidth={118}
          strokeLinecap="round"
        />
      </svg>

      {/* the two half-cropped ghosts */}
      <div style={{ position: "absolute", left: 508, top: -96 }}>
        <ClownFace size={310} id="s4-ghost-a" ghost />
      </div>
      <div style={{ position: "absolute", left: -118, top: 1044 }}>
        <ClownFace size={310} id="s4-ghost-b" ghost />
      </div>

      {/* the hero clown, bobbing inside its selection box */}
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 720,
          translate: `0px ${(bob * 11).toFixed(2)}px`,
          scale: (1 + bob * 0.022).toFixed(4),
        }}
      >
        <WireBox
          size={430}
          color={WIRE}
          style={{ position: "absolute", left: -215, top: -207 }}
        />
        <div style={{ position: "absolute", left: -CLOWN / 2, top: -CLOWN / 2 }}>
          <ClownFace size={CLOWN} id="s4-hero" />
        </div>
      </div>

      <Row top={400} gap={16} name="is just">
        <W start={at(9.5)} size={52} role="light">
          is
        </W>
        <W start={at(10.0)} size={52} role="light">
          just
        </W>
      </Row>
      <Row top={458} name="noise">
        <W start={at(10.4)} size={112} role="bold" color={NAVY}>
          noise
        </W>
      </Row>
    </AbsoluteFill>
  );
};
