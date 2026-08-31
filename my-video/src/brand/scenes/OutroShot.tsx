import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../lib/Backdrop";
import { Idle, Reveal } from "../lib/Reveal";
import { key, NEAR_BLACK, setup } from "../lib/tokens";
import { CurvedArrow, ThreeDotMark, YellowBlobs } from "../props/Icons";

/**
 * Shot C - the outro card. The first 14 frames are the slat wipe in from shot
 * B, so everything here is offset behind it. Drifts up.
 */
export const OutroShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneShell name="12 - Outro" seed={33}>
      <Idle
        name="Yellow blobs"
        start={74}
        drift="up"
        amount={10}
        style={{ position: "absolute", right: -70, bottom: -50 }}
      >
        <Interactive.Div
          name="Blob entry"
          style={{
            translate: interpolate(
              frame,
              [74, 98],
              ["120px 240px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <YellowBlobs width={420} />
        </Interactive.Div>
      </Idle>

      <div
        style={{
          position: "absolute",
          inset: 0,
          textAlign: "center",
        }}
      >
        <div style={{ marginTop: 186 }}>
          <Reveal
            name="Three dot mark"
            start={16}
            drift="up"
            driftAmount={32}
            scaleFrom={1.5}
            blur={20}
            duration={9}
          >
            <ThreeDotMark size={156} />
          </Reveal>
        </div>

        <div style={{ marginTop: 46 }}>
          <Reveal
            name="Word - For more"
            start={26}
            drift="up"
            driftAmount={28}
            style={setup(56)}
          >
            For more
          </Reveal>
        </div>
        <div style={{ marginTop: 8 }}>
          <Reveal
            name="Word - Branding tips"
            start={38}
            drift="up"
            driftAmount={24}
            scaleFrom={1.42}
            blur={24}
            style={key(86)}
          >
            Branding tips
          </Reveal>
        </div>
        <div style={{ marginTop: 26 }}>
          <Reveal
            name="Word - Follow"
            start={50}
            drift="up"
            driftAmount={20}
            style={setup(60)}
          >
            Follow
          </Reveal>
        </div>

        <Idle
          name="Hand drawn arrow"
          start={60}
          drift="up"
          amount={16}
          style={{ position: "absolute", left: 268, top: 726 }}
        >
          <CurvedArrow
            width={158}
            progress={interpolate(frame, [60, 76], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            })}
          />
        </Idle>

        <div style={{ position: "absolute", left: 0, right: 0, top: 936 }}>
          <Reveal
            name="Studio name"
            start={72}
            drift="up"
            driftAmount={12}
            scaleFrom={1.36}
            blur={20}
            style={{ ...key(62), color: NEAR_BLACK }}
          >
            Northline Studio
          </Reveal>
        </div>
      </div>
    </SceneShell>
  );
};
