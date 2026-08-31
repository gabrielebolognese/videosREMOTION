import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../lib/Backdrop";
import { Idle, Reveal } from "../lib/Reveal";
import { key, MID_GREY, NEAR_BLACK, setup } from "../lib/tokens";
import { OrnamentPhoto, PhotoCard } from "../props/Cards";

/** The tail line prints word by word rather than all at once. */
const TAIL = ["Without", "single", "word", "Spoken."];

/**
 * Shot B - the hood ornament card. Reached by the reel's one hard cut, then
 * locked with its own slow push. Everything in it drifts up.
 */
export const ExpectationsShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell name="11 - Expectations" seed={30}>
      <div style={{ paddingLeft: 64, paddingTop: 196 }}>
        <Reveal
          name="Word - its set"
          start={3}
          drift="up"
          driftAmount={28}
          origin="0% 50%"
          style={setup(48, NEAR_BLACK)}
        >
          it&rsquo;s set
        </Reveal>
        <div style={{ marginTop: 6 }}>
          <Reveal
            name="Word - Expectations"
            start={14}
            drift="up"
            driftAmount={24}
            origin="0% 50%"
            scaleFrom={1.42}
            blur={24}
            ghost="#C6C4C1"
            color={NEAR_BLACK}
            style={{ ...key(100), letterSpacing: "-0.038em" }}
          >
            Expectations
          </Reveal>
        </div>
      </div>

      <Idle
        name="Hood ornament card"
        start={26}
        drift="up"
        amount={20}
        style={{ position: "absolute", left: 64, top: 452 }}
      >
        <Interactive.Div
          name="Card push"
          style={{
            // Holds with its own slow push after the card lands.
            scale: interpolate(frame, [26, 52, 87], [1.22, 1, 1.02], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.sin),
              output: "perceptual-scale",
            }),
            opacity: interpolate(frame, [26, 29], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            filter: `blur(${interpolate(frame, [26, 48], [22, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            })}px)`,
          }}
        >
          <PhotoCard width={592} height={444}>
            <OrnamentPhoto width={592} height={444} />
          </PhotoCard>
        </Interactive.Div>
      </Idle>

      <div
        style={{
          position: "absolute",
          left: 64,
          top: 952,
          display: "flex",
          gap: 10,
        }}
      >
        {TAIL.map((word, i) => (
          <Reveal
            key={word}
            name={`Tail word - ${word}`}
            start={48 + i * 7}
            drift="up"
            driftAmount={16}
            origin="0% 50%"
            scaleFrom={1.26}
            blur={12}
            duration={7}
            style={setup(32, NEAR_BLACK)}
          >
            {word}
          </Reveal>
        ))}
      </div>

      <Idle
        name="Rule"
        start={44}
        drift="up"
        amount={12}
        style={{ position: "absolute", left: 64, top: 1006 }}
      >
        <div
          style={{
            width: 120,
            height: 2,
            backgroundColor: MID_GREY,
            opacity: interpolate(frame, [44, 52], [0, 0.5], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </Idle>
    </SceneShell>
  );
};
