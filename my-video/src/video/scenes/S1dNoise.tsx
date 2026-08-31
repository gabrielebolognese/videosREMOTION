import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CreamPage, Grain, Ribbon } from "../lib/Paper";
import { ClownFace } from "../props/Emoji";

/** Shot D - 4.9s to 6.0s. Cream page, grey ribbon sweep, tilted clown pattern, words above. */
export const S1dNoise: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 1D - Noise">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 33], [1, 1.025], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <CreamPage rating="bottom" />

        <Ribbon
          sweep={interpolate(frame, [0, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <Interactive.Div
          name="Clown pattern"
          style={{
            position: "absolute",
            inset: 0,
            rotate: "-11deg",
            scale: interpolate(frame, [0, 8], [0.86, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          <div style={{ position: "absolute", left: -150, top: 20 }}>
            <ClownFace size={300} id="tl" />
          </div>
          <div style={{ position: "absolute", left: 560, top: -70 }}>
            <ClownFace size={300} id="tr" />
          </div>
          <div style={{ position: "absolute", left: 150, top: 780 }}>
            <ClownFace size={430} id="c" />
          </div>
          <div style={{ position: "absolute", left: -170, top: 1010 }}>
            <ClownFace size={300} id="bl" />
          </div>
          <div style={{ position: "absolute", left: 590, top: 1100 }}>
            <ClownFace size={300} id="br" />
          </div>
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 470,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Interactive.Div
            name="Word - is just"
            style={{
              fontFamily: "Inter",
              fontSize: 62,
              fontWeight: 300,
              letterSpacing: "-0.03em",
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
            is just
          </Interactive.Div>
          <Interactive.Div
            name="Word - noise"
            style={{
              fontFamily: "Inter",
              fontSize: 154,
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-0.055em",
              lineHeight: 1.02,
              color: "#F0141E",
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
            noise
          </Interactive.Div>
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
