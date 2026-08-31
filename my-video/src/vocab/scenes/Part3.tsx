import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT, OVERSHOOT, Stage } from "../lib/Studio";
import { Line } from "../lib/Type";
import { cueIn, GREY, sec, shotFrames } from "../lib/tokens";
import { Card, Ornament } from "../photos/Cards";
import { DotMark, DrawnArrow, LimeBlobs } from "../props/Marks";

/**
 * Shot 10 - 17.9s to 20.8s. Expectations.
 *
 * The first hard cut in the piece. A tall card fills the lower two thirds and
 * the camera creeps into it while the tail line types on word by word.
 */
export const S10Expect: React.FC = () => {
  const frame = useCurrentFrame();
  const at = cueIn(17.9);
  const DURATION = shotFrames(17.9, 20.8);

  return (
    <Stage
      name="Shot 10 - Expectations"
      duration={DURATION}
      startsAt={sec(17.9)}
      camera={[1, 1.02]}
      fadeIn={0}
    >
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 322,
          opacity: interpolate(frame, [0, 5], [0, 1], CLAMP),
          scale: interpolate(frame, [0, 16], [0.88, 1], {
            ...CLAMP,
            easing: OVERSHOOT,
            output: "perceptual-scale",
          }),
        }}
      >
        {/* the very slow zoom lives inside the card, not on the camera */}
        <Card width={560} height={880}>
          <div
            style={{
              width: "100%",
              height: "100%",
              scale: interpolate(frame, [0, DURATION], [1, 1.07], {
                ...CLAMP,
                output: "perceptual-scale",
              }),
            }}
          >
            <Ornament />
          </div>
        </Card>
      </div>

      <Line start={at(17.9)} role="serifLight" size={36} style={{ left: 84, top: 80 }}>
        it&apos;s set
      </Line>
      <Line
        start={at(18.1)}
        role="serifBold"
        size={100}
        color={GREY}
        reveal="pop"
        style={{ left: 72, top: 116 }}
      >
        Expectations
      </Line>
      <Line
        start={at(18.6)}
        role="serifLight"
        size={34}
        // Four words typed across the 1.7s the brief gives the line.
        stagger={17}
        style={{ left: 84, top: 244 }}
      >
        Without single word Spoken
      </Line>
    </Stage>
  );
};

/**
 * Shot 11 - 20.8s to 23.6s. The end card.
 *
 * The second hard cut, and the only shot with no monogram: a plain gradient,
 * a centred call to action, and the lime shapes coming over the bottom-right
 * corner.
 */
export const S11Follow: React.FC = () => {
  const frame = useCurrentFrame();
  const at = cueIn(20.8);

  return (
    <Stage
      name="Shot 11 - End card"
      duration={shotFrames(20.8, 23.6)}
      startsAt={sec(20.8)}
      camera={[1, 1.015]}
      monogram={0}
      fadeIn={0}
      fadeOut={0}
    >
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 188,
          opacity: interpolate(frame, [0, 6], [0, 1], CLAMP),
          scale: interpolate(frame, [0, 18], [0.6, 1], {
            ...CLAMP,
            easing: OVERSHOOT,
            output: "perceptual-scale",
          }),
        }}
      >
        <DotMark size={122} />
      </div>

      <Line
        start={at(20.9)}
        role="serifMedium"
        size={50}
        align="center"
        style={{ top: 396 }}
      >
        For more
      </Line>
      <Line
        start={at(21.1)}
        role="serifBold"
        size={78}
        align="center"
        style={{ top: 454 }}
      >
        Branding tips
      </Line>
      <Line
        start={at(21.3)}
        role="serifMedium"
        size={50}
        align="center"
        style={{ top: 556 }}
      >
        Follow
      </Line>

      <DrawnArrow x={418} y={604} width={148} start={at(21.5)} rotate={8} />

      <Line
        start={at(21.9)}
        role="serifRoman"
        size={66}
        reveal="pop"
        align="center"
        style={{ top: 742 }}
      >
        The Design Studio
      </Line>

      <div
        style={{
          position: "absolute",
          left: 352,
          top: 892,
          translate: `${interpolate(frame, [4, 30], [320, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px ${interpolate(
            frame,
            [4, 30],
            [260, 0],
            { ...CLAMP, easing: OUT },
          ).toFixed(2)}px`,
        }}
      >
        <LimeBlobs size={430} />
      </div>
    </Stage>
  );
};
