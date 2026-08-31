import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT, OVERSHOOT, Stage } from "../lib/Studio";
import { Line } from "../lib/Type";
import { cueIn, GREY, sec, shotFrames } from "../lib/tokens";
import { Card, WhiteClinic } from "../photos/Cards";
import { Brain } from "../props/Brain";
import { DrawnArrow, TrustBadge } from "../props/Marks";
import { CornerBurst } from "../props/StarBurst";

/**
 * Shot 5 - 8.8s to 10.3s. Instantly.
 *
 * The calm clinic card rises to centre and grows 15%, and the badge stamps
 * onto its corner: a hard scale-down impact with a small rotation settle.
 */
export const S5Instantly: React.FC = () => {
  const frame = useCurrentFrame();
  const at = cueIn(8.8);
  const stamp = at(9.5);

  return (
    <Stage
      name="Shot 5 - Instantly"
      duration={shotFrames(8.8, 10.3)}
      startsAt={sec(8.8)}
      camera={[1, 1.02]}
    >
      <CornerBurst x={520} y={1010} size={330} rot={-14} spin={4} blur={12} />

      <div
        style={{
          position: "absolute",
          left: 76,
          top: 604,
          translate: `0px ${interpolate(frame, [0, 22], [78, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px`,
          scale: interpolate(frame, [0, 22], [0.88, 1], {
            ...CLAMP,
            easing: OUT,
            output: "perceptual-scale",
          }),
        }}
      >
        <Card width={506} height={334}>
          <WhiteClinic />
        </Card>
      </div>

      {/* the stamp: overshoots small, then settles with a touch of rotation */}
      <div
        style={{
          position: "absolute",
          left: 468,
          top: 824,
          opacity: interpolate(frame, [stamp - 3, stamp], [0, 1], CLAMP),
          scale: interpolate(frame, [stamp - 3, stamp, stamp + 7], [2.1, 0.92, 1], {
            ...CLAMP,
            easing: OUT,
            output: "perceptual-scale",
          }),
          rotate: `${interpolate(frame, [stamp, stamp + 10], [-14, -7], { ...CLAMP, easing: OUT }).toFixed(2)}deg`,
          filter: "drop-shadow(6px 12px 16px rgba(60,60,60,0.3))",
        }}
      >
        <TrustBadge size={172} label="TRUSTED" />
      </div>

      <Line start={at(8.9)} role="serifLight" size={40} style={{ left: 96, top: 316 }}>
        you trust one
      </Line>
      <Line
        start={at(9.1)}
        role="serifBold"
        size={128}
        color={GREY}
        reveal="slideLeft"
        style={{ left: 74, top: 366 }}
      >
        Instantly
      </Line>
      {/* the short horizontal dash that follows it */}
      <div
        style={{
          position: "absolute",
          left: 610,
          top: 448,
          width: interpolate(frame, [at(9.1) + 8, at(9.1) + 18], [0, 74], {
            ...CLAMP,
            easing: OUT,
          }),
          height: 7,
          backgroundColor: GREY,
          borderRadius: 4,
        }}
      />
    </Stage>
  );
};

/**
 * Shot 6 - 10.3s to 12.2s. Spoken.
 *
 * Two words alone on an empty set. The star-bursts leave, and the frame blooms
 * to white across the last three quarters of a second.
 */
export const S6Spoken: React.FC = () => {
  const at = cueIn(10.3);

  return (
    <Stage
      name="Shot 6 - Spoken"
      duration={shotFrames(10.3, 12.2)}
      startsAt={sec(10.3)}
      camera={[1, 1.015]}
      bloomOut={22}
    >
      <CornerBurst x={520} y={-130} size={300} rot={10} spin={3} blur={12} cruiseX={2.6} cruiseY={-2} />
      <CornerBurst x={-160} y={1000} size={340} rot={-16} spin={-3} blur={13} cruiseX={-2.4} cruiseY={2.2} />

      <Line
        start={at(10.4)}
        role="serifLight"
        size={44}
        align="center"
        style={{ top: 516 }}
      >
        Without a word
      </Line>
      <Line
        start={at(10.9)}
        role="serifBold"
        size={172}
        color={GREY}
        reveal="scaleIn"
        align="center"
        style={{ top: 560 }}
      >
        Spoken
      </Line>
    </Stage>
  );
};

/**
 * Shot 7 - 12.2s to 14.4s. Brian.
 *
 * The brain sits between the lines rather than beside them: it overlaps the
 * baseline of the hero word above it and the tops of the line below.
 */
export const S7Brain: React.FC = () => {
  const frame = useCurrentFrame();
  const at = cueIn(12.2);

  return (
    <Stage
      name="Shot 7 - Brian"
      duration={shotFrames(12.2, 14.4)}
      startsAt={sec(12.2)}
      camera={[1, 1.03]}
      bloomIn={8}
      bloomOut={7}
      fadeIn={0}
    >
      <div
        style={{
          position: "absolute",
          left: 168,
          top: 428,
          opacity: interpolate(frame, [6, 14], [0, 1], CLAMP),
          scale: interpolate(frame, [6, 26], [0.9, 1], {
            ...CLAMP,
            easing: OVERSHOOT,
            output: "perceptual-scale",
          }),
          // turning almost imperceptibly, and lit from the same key
          rotate: `${interpolate(frame, [0, shotFrames(12.2, 14.4)], [-1.6, 1.4], CLAMP).toFixed(3)}deg`,
          filter: "drop-shadow(-14px 20px 26px rgba(60,60,60,0.24))",
        }}
      >
        <Brain width={384} />
      </div>

      <Line start={at(12.3)} role="serifLight" size={42} style={{ left: 96, top: 258 }}>
        Because Your
      </Line>
      <Line
        start={at(12.5)}
        role="serifBold"
        size={168}
        reveal="pop"
        style={{ left: 84, top: 300 }}
      >
        Brian
      </Line>
      <Line
        start={at(13.1)}
        role="serifBold"
        size={104}
        color={GREY}
        style={{ left: 96, top: 716 }}
      >
        read visual
      </Line>
      <Line
        start={at(13.6)}
        role="serifLight"
        size={36}
        style={{ left: 100, top: 846 }}
      >
        before logic kicks in.
      </Line>
    </Stage>
  );
};

/**
 * Shot 8 - 14.4s to 16.3s. Visual vocabulary.
 *
 * A three-line stack, each line indented further right than the last.
 */
export const S8Vocabulary: React.FC = () => {
  const at = cueIn(14.4);

  return (
    <Stage
      name="Shot 8 - Visual vocabulary"
      duration={shotFrames(14.4, 16.3)}
      startsAt={sec(14.4)}
      camera={[1, 1.02]}
      bloomIn={8}
      fadeIn={0}
    >
      <CornerBurst x={512} y={-142} size={340} rot={14} spin={3} blur={11} />

      <Line start={at(14.9)} role="serifLight" size={44} style={{ left: 96, top: 448 }}>
        that&apos;s
      </Line>
      <Line
        start={at(15.1)}
        role="serifBold"
        size={168}
        reveal="pop"
        style={{ left: 138, top: 490 }}
      >
        Visual
      </Line>
      <Line
        start={at(15.5)}
        role="serifBold"
        size={108}
        color={GREY}
        reveal="slideLeft"
        style={{ left: 182, top: 656 }}
      >
        Vocabulary.
      </Line>
    </Stage>
  );
};

/**
 * Shot 9 - 16.3s to 17.9s. Brands.
 *
 * The curly arrow draws itself between the second and third lines and points
 * down-left at the final word.
 */
export const S9Brands: React.FC = () => {
  const at = cueIn(16.3);

  return (
    <Stage
      name="Shot 9 - Brands"
      duration={shotFrames(16.3, 17.9)}
      startsAt={sec(16.3)}
      camera={[1, 1.01]}
    >
      <CornerBurst x={506} y={1000} size={320} rot={-20} spin={4} blur={12} fromY={120} />

      <Line
        start={at(16.4)}
        role="serifBold"
        size={130}
        reveal="pop"
        style={{ left: 92, top: 386 }}
      >
        Design
      </Line>
      <Line
        start={at(16.7)}
        role="serifMedium"
        size={54}
        style={{ left: 152, top: 534 }}
      >
        doesn&apos;t decorate
      </Line>

      <DrawnArrow x={392} y={584} width={158} start={at(17.0)} flip rotate={-6} />

      <Line
        start={at(17.3)}
        role="serifBold"
        size={158}
        color={GREY}
        reveal="slideLeft"
        style={{ left: 80, top: 688 }}
      >
        Brands
      </Line>
    </Stage>
  );
};
