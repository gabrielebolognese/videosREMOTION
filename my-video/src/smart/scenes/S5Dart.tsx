import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT, OVERSHOOT } from "../lib/motion";
import { cueIn, RED } from "../lib/tokens";
import { Row, W } from "../lib/Type";
import { WireBox, WorldB } from "../lib/Worlds";
import { Dart, Dartboard } from "../props/Dartboard";

const at = cueIn(11.7);

const CX = 360;
const CY = 700;
const BOARD = 400;

/** The frame the second dart bites. */
const IMPACT = at(14.0);

/** Places a dart by its point, with the body running out along `angle`. */
const stuck = (x: number, y: number, angle: number, length: number) => ({
  position: "absolute" as const,
  left: x,
  top: y - (length * (72 / 240)) / 2,
  rotate: `${angle}deg`,
  transformOrigin: `0px ${(length * (72 / 240)) / 2}px`,
});

/**
 * SHOT 5 - 11.7s to 15.7s. Static medium on the self-lit dartboard: it starts
 * tilted about 30 degrees, rotates upright and settles, then a second dart
 * arrives and the rim glow pulses on the bite.
 */
export const S5Dart: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse =
    interpolate(frame, [IMPACT, IMPACT + 4], [0, 1], CLAMP) *
    interpolate(frame, [IMPACT + 4, IMPACT + 16], [1, 0], CLAMP);

  const throwIn = interpolate(frame, [IMPACT - 8, IMPACT], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });

  return (
    <AbsoluteFill name="Shot 5 - and strategy">
      <WorldB lift={0.5} cy={55} />

      {/* the halo the board throws, punched harder for a beat on impact */}
      <div
        style={{
          position: "absolute",
          left: CX - 460,
          top: CY - 460,
          width: 920,
          height: 920,
          borderRadius: 920,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0) 70%)",
          opacity: 0.55 + pulse * 0.75,
        }}
      />

      <WireBox
        size={462}
        color="rgba(255,255,255,0.85)"
        style={{ position: "absolute", left: CX - 231, top: CY - 231 }}
      />

      {/* board and the dart already in it share one rotation */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 720,
          height: 1280,
          rotate: `${interpolate(frame, [8, 36], [30, 0], {
            ...CLAMP,
            easing: OVERSHOOT,
          }).toFixed(2)}deg`,
          transformOrigin: `${CX}px ${CY}px`,
        }}
      >
        <div style={{ position: "absolute", left: CX - BOARD / 2, top: CY - BOARD / 2 }}>
          <Dartboard size={BOARD} />
        </div>
        <div style={stuck(481, 598, -18, 180)}>
          <Dart length={180} />
        </div>
      </div>

      {/* the second dart, arriving from off frame upper left */}
      <div
        style={{
          ...stuck(290, 641, 210, 180),
          opacity: throwIn > 0 ? 1 : 0,
          translate: `${interpolate(throwIn, [0, 1], [-520, 0], CLAMP).toFixed(
            1,
          )}px ${interpolate(throwIn, [0, 1], [-300, 0], CLAMP).toFixed(1)}px`,
        }}
      >
        <Dart length={180} />
      </div>

      {/* upper third */}
      <Row top={196} name="And">
        <W
          start={at(11.9)}
          size={46}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.5)"
          haloStrength={0.7}
        >
          And
        </W>
      </Row>
      <Row top={248} name="strategy">
        <W
          start={at(12.2)}
          size={86}
          role="bold"
          color={RED}
          halo="rgba(255,13,13,0.9)"
        >
          strategy
        </W>
      </Row>

      {/* lower third, right aligned */}
      <Row top={982} right={56} align="flex-end" name="is where the">
        <W
          start={at(13.1)}
          size={40}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.45)"
          haloStrength={0.6}
          reveal="rise"
        >
          is where the
        </W>
      </Row>
      <Row top={1028} right={56} align="flex-end" name="real results">
        <W
          start={at(13.4)}
          size={66}
          role="bold"
          color={RED}
          halo="rgba(255,13,13,0.9)"
        >
          real results
        </W>
      </Row>
      <Row top={1118} right={56} align="flex-end" name="live">
        <W
          start={at(13.8)}
          size={36}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.45)"
          haloStrength={0.6}
          reveal="rise"
        >
          live
        </W>
      </Row>
    </AbsoluteFill>
  );
};
