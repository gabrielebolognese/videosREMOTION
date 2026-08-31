import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BlackVoid, Grain, Vignette } from "../lib/Paper";

/** Shot E - 16.4s to 17.8s. Pure black, final line pops in centred, holds on the last frame. */
export const S3eDm: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 3E - DM">
      <BlackVoid glow="none" />

      <Interactive.Div
        name="Red glow"
        style={{
          position: "absolute",
          left: 40,
          top: 420,
          width: 640,
          height: 440,
          borderRadius: 320,
          backgroundColor: "rgba(240,20,30,0.26)",
          filter: "blur(90px)",
          opacity: interpolate(frame, [0, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 22,
          }}
        >
          <Interactive.Div
            name="Word - Hit the"
            style={{
              fontFamily: "Inter",
              fontSize: 64,
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
            Hit the
          </Interactive.Div>
          <Interactive.Div
            name="Word - DM"
            style={{
              fontFamily: "Inter",
              fontSize: 128,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "#F0141E",
              textShadow: "0 0 54px rgba(240,20,30,0.85)",
              opacity: interpolate(frame, [8, 9], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [9, 12, 14], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            DM
          </Interactive.Div>
        </div>

        <Interactive.Div
          name="Word - button to"
          style={{
            fontFamily: "Inter",
            fontSize: 64,
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            marginTop: 6,
            opacity: interpolate(frame, [15, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [16, 19, 21], [0.62, 1.04, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
              output: "perceptual-scale",
            }),
          }}
        >
          button to
        </Interactive.Div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 22,
            marginTop: 6,
          }}
        >
          <Interactive.Div
            name="Word - fix"
            style={{
              fontFamily: "Inter",
              fontSize: 128,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "#F0141E",
              textShadow: "0 0 54px rgba(240,20,30,0.85)",
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
            fix
          </Interactive.Div>
          <Interactive.Div
            name="Word - that"
            style={{
              fontFamily: "Inter",
              fontSize: 64,
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
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
            that
          </Interactive.Div>
        </div>
      </AbsoluteFill>

      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};
