import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BlackVoid, Grain, Vignette } from "../lib/Paper";

/** Shot C - 3.2s to 4.9s. Pure black empty frame, words pop in one by one, dead centre. */
export const S1cAudience: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 1C - Audience">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 51], [1, 1.025], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <BlackVoid glow="white" />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Interactive.Div
            name="Word - Because"
            style={{
              fontFamily: "Inter",
              fontSize: 68,
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              opacity: interpolate(frame, [2, 3], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [3, 6, 8], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            Because
          </Interactive.Div>

          <Interactive.Div
            name="Word - content"
            style={{
              fontFamily: "Inter",
              fontSize: 134,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.02,
              color: "#F0141E",
              opacity: interpolate(frame, [10, 11], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [11, 14, 16], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            content
          </Interactive.Div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 20,
              marginTop: 8,
            }}
          >
            <Interactive.Div
              name="Word - without"
              style={{
                fontFamily: "Inter",
                fontSize: 64,
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                opacity: interpolate(frame, [18, 19], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [19, 22, 24], [0.62, 1.04, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                  output: "perceptual-scale",
                }),
              }}
            >
              without
            </Interactive.Div>
            <Interactive.Div
              name="Word - an"
              style={{
                fontFamily: "Inter",
                fontSize: 64,
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "#B4B4AA",
                opacity: interpolate(frame, [25, 26], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [26, 29, 31], [0.62, 1.04, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.quad),
                  output: "perceptual-scale",
                }),
              }}
            >
              an
            </Interactive.Div>
          </div>

          <Interactive.Div
            name="Word - audience"
            style={{
              fontFamily: "Inter",
              fontSize: 122,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              color: "#F0141E",
              textShadow: "0 0 46px rgba(240,20,30,0.55)",
              opacity: interpolate(frame, [32, 33], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [33, 36, 38], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            audience
          </Interactive.Div>
        </AbsoluteFill>
        <Vignette />
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
