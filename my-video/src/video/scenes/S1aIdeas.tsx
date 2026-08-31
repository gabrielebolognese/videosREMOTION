import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CreamPage, Grain } from "../lib/Paper";
import { Bulb } from "../props/Bulb";
import { BluePin, Butterfly } from "../props/Doodads";

/** Shot A - 0.0s to 1.4s. Cream page, giant bulb lower left, text builds right-centre. */
export const S1aIdeas: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 1A - Ideas">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 42], [1, 1.03], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <CreamPage />

        <Interactive.Div
          name="Glass bulb"
          style={{
            position: "absolute",
            left: -150,
            top: 500,
            rotate: "-34deg",
            transformOrigin: "250px 400px",
            translate: interpolate(
              frame,
              [0, 16],
              ["-250px 240px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <Bulb width={500} />
        </Interactive.Div>

        <Interactive.Div
          name="Butterfly"
          style={{
            position: "absolute",
            right: 470,
            top: 258,
            rotate: "-14deg",
            opacity: interpolate(frame, [17, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [17, 32], ["46px 26px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <Butterfly size={96} />
        </Interactive.Div>

        <Interactive.Div
          name="Blue pushpin"
          style={{
            position: "absolute",
            right: 96,
            top: 706,
            rotate: "12deg",
            opacity: interpolate(frame, [25, 28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [25, 40], ["-34px 30px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <BluePin size={80} />
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            right: 56,
            top: 296,
            width: 500,
            textAlign: "right",
          }}
        >
          <div style={{ lineHeight: 1.06 }}>
            <Interactive.Div
              name="Word - Youve"
              style={{
                display: "inline-block",
                fontFamily: "Inter",
                fontSize: 62,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                marginRight: 20,
                color: "#000000",
                opacity: interpolate(frame, [1, 2], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [2, 5, 7], [0.62, 1.04, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                  output: "perceptual-scale",
                }),
              }}
            >
              You&rsquo;ve
            </Interactive.Div>
            <Interactive.Div
              name="Word - got the"
              style={{
                display: "inline-block",
                fontFamily: "Inter",
                fontSize: 62,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#000000",
                opacity: interpolate(frame, [7, 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [8, 11, 13], [0.62, 1.04, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                  output: "perceptual-scale",
                }),
              }}
            >
              got the
            </Interactive.Div>
          </div>

          <Interactive.Div
            name="Word - ideas"
            style={{
              display: "inline-block",
              fontFamily: "Inter",
              fontSize: 138,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              color: "#F0141E",
              opacity: interpolate(frame, [14, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [15, 18, 20], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            ideas
          </Interactive.Div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
              gap: 18,
            }}
          >
            <Interactive.Div
              name="Word - and"
              style={{
                fontFamily: "Inter",
                fontSize: 60,
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#B4B4AA",
                opacity: interpolate(frame, [22, 23], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [23, 26, 28], [0.62, 1.04, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                  output: "perceptual-scale",
                }),
              }}
            >
              and
            </Interactive.Div>
            <Interactive.Div
              name="Word - content"
              style={{
                fontFamily: "Inter",
                fontSize: 118,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.045em",
                color: "#F0141E",
                opacity: interpolate(frame, [28, 29], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [29, 32, 34], [0.62, 1.04, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                  output: "perceptual-scale",
                }),
              }}
            >
              content
            </Interactive.Div>
          </div>
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
