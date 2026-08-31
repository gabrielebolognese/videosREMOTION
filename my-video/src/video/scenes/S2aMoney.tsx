import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BlackVoid, Grain, Vignette } from "../lib/Paper";
import { Briefcase } from "../props/Briefcase";

/** Shot A - 6.0s to 7.5s. Pure black, cash briefcase floating, text split top and bottom. */
export const S2aMoney: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 2A - Money">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 45], [1, 1.025], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <BlackVoid glow="red" />

        <Interactive.Div
          name="Cash briefcase"
          style={{
            position: "absolute",
            left: 46,
            top: 448,
            rotate: "-4deg",
            filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.85))",
            opacity: interpolate(frame, [0, 3], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [0, 14], [0.88, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
            translate: interpolate(frame, [0, 45], ["0px 14px", "0px -10px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.6, 1),
            }),
          }}
        >
          <Briefcase width={628} />
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 168,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Interactive.Div
            name="Word - And the"
            style={{
              fontFamily: "Inter",
              fontSize: 62,
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
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
            And the
          </Interactive.Div>
          <Interactive.Div
            name="Word - audience"
            style={{
              fontFamily: "Inter",
              fontSize: 126,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.04,
              color: "#F0141E",
              textShadow: "0 0 52px rgba(240,20,30,0.75)",
              opacity: interpolate(frame, [9, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [10, 13, 15], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            audience
          </Interactive.Div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 132,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Interactive.Div
            name="Word - is the real"
            style={{
              fontFamily: "Inter",
              fontSize: 58,
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: "#B4B4AA",
              opacity: interpolate(frame, [19, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [20, 23, 25], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            is the real
          </Interactive.Div>
          <Interactive.Div
            name="Word - money"
            style={{
              fontFamily: "Inter",
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.04,
              color: "#F0141E",
              textShadow: "0 0 52px rgba(240,20,30,0.6)",
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
            money
          </Interactive.Div>
        </div>
        <Vignette />
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
