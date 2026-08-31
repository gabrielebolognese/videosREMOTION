import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OVERSHOOT, Stage } from "../lib/Studio";
import { Line } from "../lib/Type";
import { cueIn, GHOST, sec, shotFrames } from "../lib/tokens";
import { Card, RedClinic, WhiteClinic } from "../photos/Cards";
import { ClinicTile, DoctorIcon } from "../props/Marks";
import { CornerBurst } from "../props/StarBurst";

/**
 * Shot 1 - 0.0s to 1.7s. Let's suppose.
 *
 * A left-aligned staggered stack in the upper-middle third: thin line, hero
 * word three times its size, small tail line offset right.
 */
export const S1Suppose: React.FC = () => {
  const at = cueIn(0);

  return (
    <Stage
      name="Shot 1 - Let's suppose"
      duration={shotFrames(0, 1.7)}
      startsAt={0}
      camera={[1, 1.02]}
      fadeIn={0}
    >
      <CornerBurst x={506} y={-118} size={310} rot={18} spin={3} blur={10} />
      <CornerBurst x={-168} y={936} size={420} rot={-12} spin={-2} blur={13} />

      <Line start={at(0)} role="serifLight" size={42} style={{ left: 92, top: 372 }}>
        Let&apos;s suppose
      </Line>
      <Line
        start={at(0.4)}
        role="serifBold"
        size={152}
        reveal="pop"
        style={{ left: 84, top: 408 }}
      >
        you&apos;re
      </Line>
      <Line
        start={at(0.9)}
        role="serifLight"
        size={42}
        style={{ left: 248, top: 586 }}
      >
        not feeling well
      </Line>
    </Stage>
  );
};

/**
 * Shot 2 - 1.7s to 2.9s. Doctor.
 *
 * The hero word repeats behind itself: two oversized ghosts at 8% sliding
 * down out of frame, and two close trailing duplicates in #E8E8E8.
 */
export const S2Doctor: React.FC = () => {
  const frame = useCurrentFrame();
  const at = cueIn(1.7);
  const slide = interpolate(frame, [0, shotFrames(1.7, 2.9)], [0, 90], CLAMP);

  return (
    <Stage
      name="Shot 2 - Doctor"
      duration={shotFrames(1.7, 2.9)}
      startsAt={sec(1.7)}
      camera={[1, 1.015]}
      bloomOut={7}
    >
      {/* oversized ghost repeats, cropped by the frame edge */}
      <Line
        start={at(1.7)}
        role="serifBold"
        size={300}
        color="#9AA0A4"
        opacity={0.08}
        reveal="hold"
        shadow="none"
        style={{ left: -110, top: 120 + slide }}
        name="Ghost repeat A"
      >
        Doctor
      </Line>
      <Line
        start={at(1.7)}
        role="serifBold"
        size={300}
        color="#9AA0A4"
        opacity={0.08}
        reveal="hold"
        shadow="none"
        style={{ left: 210, top: 700 + slide * 1.4 }}
        name="Ghost repeat B"
      >
        Doctor
      </Line>

      <CornerBurst
        x={512}
        y={980}
        size={330}
        rot={-24}
        spin={7}
        blur={11}
        fromX={140}
        fromY={140}
        travel={30}
      />

      <div
        style={{
          position: "absolute",
          left: 240,
          top: 618,
          scale: interpolate(frame, [2, 18], [0.7, 1], {
            ...CLAMP,
            easing: OVERSHOOT,
            output: "perceptual-scale",
          }),
          opacity: interpolate(frame, [2, 8], [0, 1], CLAMP),
          filter: "drop-shadow(8px 16px 20px rgba(60,60,60,0.24))",
        }}
      >
        <DoctorIcon size={240} />
      </div>

      <Line start={at(1.7)} role="serifLight" size={40} style={{ left: 152, top: 300 }}>
        and need a
      </Line>
      {/* the two trailing duplicates, drawn under the word itself */}
      <Line
        start={at(1.9)}
        role="serifBold"
        size={128}
        color={GHOST}
        reveal="pop"
        shadow="none"
        style={{ left: 166, top: 372 }}
        name="Doctor trail 2"
      >
        Doctor
      </Line>
      <Line
        start={at(1.9)}
        role="serifBold"
        size={128}
        color="#DCDCDC"
        reveal="pop"
        shadow="none"
        style={{ left: 150, top: 358 }}
        name="Doctor trail 1"
      >
        Doctor
      </Line>
      <Line
        start={at(1.9)}
        role="serifBold"
        size={128}
        reveal="pop"
        style={{ left: 134, top: 344 }}
      >
        Doctor
      </Line>
    </Stage>
  );
};

/**
 * Shot 3 - 2.9s to 4.2s. Clinics.
 *
 * Out of the first white bloom. Two identical tiles drop into the lower half
 * and settle with a small bounce, the monogram clear behind everything.
 */
export const S3Clinics: React.FC = () => {
  const frame = useCurrentFrame();
  const at = cueIn(2.9);

  return (
    <Stage
      name="Shot 3 - Clinics"
      duration={shotFrames(2.9, 4.2)}
      startsAt={sec(2.9)}
      camera={[1.01, 1]}
      bloomIn={8}
      fadeIn={0}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 268,
            top: 616 + i * 220,
            opacity: interpolate(frame, [10 + i * 4, 15 + i * 4], [0, 1], CLAMP),
            translate: `0px ${interpolate(
              frame,
              [10 + i * 4, 26 + i * 4],
              [-70, 0],
              { ...CLAMP, easing: OVERSHOOT },
            ).toFixed(2)}px`,
            filter: "drop-shadow(8px 16px 20px rgba(60,60,60,0.26))",
          }}
        >
          <ClinicTile size={184} />
        </div>
      ))}

      <Line
        start={at(3.0)}
        role="serifLight"
        size={42}
        align="center"
        style={{ top: 228 }}
      >
        you see two
      </Line>
      <Line
        start={at(3.2)}
        role="serifBold"
        size={168}
        reveal="scaleIn"
        align="center"
        style={{ top: 272 }}
      >
        Clinics
      </Line>
    </Stage>
  );
};

/**
 * Shot 4 - 4.2s to 8.8s. The comparison.
 *
 * The slowest passage in the piece: two builds, each a line then a card, with
 * the two contrast faces carrying the punch words - the marker for the loud
 * clinic, the geometric sans for the calm one.
 */
export const S4Compare: React.FC = () => {
  const frame = useCurrentFrame();
  const at = cueIn(4.2);

  const cardIn = (start: number) => ({
    opacity: interpolate(frame, [start, start + 6], [0, 1], CLAMP),
    scale: interpolate(frame, [start, start + 20], [0.9, 1], {
      ...CLAMP,
      easing: OVERSHOOT,
      output: "perceptual-scale" as const,
    }),
  });

  return (
    <Stage
      name="Shot 4 - The comparison"
      duration={shotFrames(4.2, 8.8)}
      startsAt={sec(4.2)}
      camera={[1, 1.03]}
    >
      <CornerBurst x={534} y={-136} size={280} rot={12} spin={2} blur={11} />
      <CornerBurst x={-152} y={1030} size={330} rot={-18} spin={-2} blur={13} />

      <Line
        start={at(4.2)}
        role="serifLight"
        size={34}
        align="center"
        style={{ top: 70 }}
      >
        one is bright red with
      </Line>
      <Line
        start={at(5.2)}
        role="marker"
        size={78}
        reveal="pop"
        letters
        stagger={1.7}
        align="center"
        style={{ top: 104 }}
      >
        Playful Fonts
      </Line>
      <div style={{ position: "absolute", left: 140, top: 212, ...cardIn(12) }}>
        <Card width={440} height={290}>
          <RedClinic />
        </Card>
      </div>

      <Line
        start={at(6.5)}
        role="serifLight"
        size={34}
        align="center"
        style={{ top: 540 }}
      >
        the other is clean white with
      </Line>
      <Line
        start={at(7.6)}
        role="geo"
        size={58}
        color="#2092F5"
        reveal="blurPop"
        align="center"
        style={{ top: 578 }}
      >
        Calm Blue text
      </Line>
      <div style={{ position: "absolute", left: 140, top: 674, ...cardIn(81) }}>
        <Card width={440} height={290}>
          <WhiteClinic />
        </Card>
      </div>
    </Stage>
  );
};
