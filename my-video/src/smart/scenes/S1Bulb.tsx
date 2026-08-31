import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, GLIDE } from "../lib/motion";
import { BLUEPRINT, cueIn, PURPLE } from "../lib/tokens";
import { Row, W } from "../lib/Type";
import { WorldA } from "../lib/Worlds";
import { Bulb } from "../props/Bulb";
import { Butterfly } from "../props/Emoji";

const at = cueIn(0);

/**
 * The second word is a swap, not a stack: only one of the three is ever on
 * screen, each cutting straight to the next on its cue.
 */
const SWAP = [
  { word: "website,", start: at(0.5) },
  { word: "content", start: at(1.3) },
  { word: "campaigns", start: at(2.0) },
];

const FLY_IN = at(0.2);
const FLY_OUT = at(1.5);

/**
 * SHOT 1 - 0.0s to 3.4s. Static wide, giant unlit bulb down the left third,
 * an almost imperceptible push in, and a butterfly crossing the frame.
 */
export const S1Bulb: React.FC = () => {
  const frame = useCurrentFrame();

  // Latest cue that has already landed; -1 before the first one.
  const active = SWAP.reduce((acc, s, i) => (frame >= s.start ? i : acc), -1);

  const flight = interpolate(frame, [FLY_IN, FLY_OUT], [0, 1], {
    ...CLAMP,
    easing: GLIDE,
  });

  return (
    <AbsoluteFill name="Shot 1 - got the">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 102], [1, 1.035], {
            ...CLAMP,
            easing: GLIDE,
            output: "perceptual-scale",
          }),
        }}
      >
        <WorldA drift={frame / 900} band="sweep" barcode />

        {/* faint blueprint square sitting behind the text block */}
        <svg
          width={720}
          height={1280}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <g stroke={BLUEPRINT} strokeWidth={1.6} fill="none">
            <rect x={326} y={498} width={314} height={314} />
            <path d="M 326 498 L 640 812 M 640 498 L 326 812" strokeWidth={1} />
            <circle cx={483} cy={655} r={157} strokeWidth={1} />
          </g>
          <g stroke="#B4B4B4" strokeWidth={2}>
            <path d="M 326 480 v -16 M 640 480 v -16 M 308 498 h -16" />
          </g>
        </svg>

        <div style={{ position: "absolute", left: -122, top: 280 }}>
          <Bulb width={440} />
        </div>

        {/* the butterfly crosses lower left to upper right, blurred by speed */}
        <div
          style={{
            position: "absolute",
            left: interpolate(flight, [0, 1], [-200, 840], CLAMP),
            top: interpolate(flight, [0, 1], [1210, 250], CLAMP),
            rotate: `${interpolate(flight, [0, 1], [-52, -34], CLAMP).toFixed(2)}deg`,
            filter: `blur(${interpolate(
              flight,
              [0, 0.12, 0.86, 1],
              [0, 9, 9, 0],
              CLAMP,
            ).toFixed(2)}px)`,
            opacity: flight > 0 && flight < 1 ? 1 : 0,
          }}
        >
          <Butterfly
            size={210}
            id="s1-fly"
            flutter={Math.sin(frame * 0.85)}
          />
        </div>

        {/* the fixed first line, and the word that swaps underneath it */}
        <Row top={556} left={336} right={30} align="flex-start" name="got the">
          <W start={0} size={46} role="light" reveal="rise">
            got the
          </W>
        </Row>
        {active >= 0 ? (
          <Row
            top={624}
            left={336}
            right={30}
            align="flex-start"
            name={SWAP[active].word}
          >
            <W
              key={active}
              start={SWAP[active].start}
              size={54}
              role="bold"
              color={PURPLE}
            >
              {SWAP[active].word}
            </W>
          </Row>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
