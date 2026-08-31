import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CreamPage, Grain } from "../lib/Paper";
import { MechanicalKeyboard } from "../props/Keyboard";

/** Shot C - 14.2s to 15.6s. Cream page, tilted keyboard rises from bottom right. */
export const S3cKeyboard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 3C - Keyboard">
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
        <CreamPage rating="top" />

        <Interactive.Div
          name="Mechanical keyboard"
          style={{
            position: "absolute",
            left: -20,
            top: 742,
            rotate: "-6deg",
            filter: "drop-shadow(0 26px 34px rgba(80,64,48,0.34))",
            translate: interpolate(
              frame,
              [0, 16],
              ["120px 300px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <MechanicalKeyboard width={880} />
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 258,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Interactive.Div
            name="Word - Your contents"
            style={{
              fontFamily: "Inter",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "#000000",
              opacity: interpolate(frame, [3, 4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [4, 7, 9], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            Your content&rsquo;s
          </Interactive.Div>
          <Interactive.Div
            name="Word - working"
            style={{
              fontFamily: "Inter",
              fontSize: 126,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.06,
              color: "#F0141E",
              opacity: interpolate(frame, [12, 13], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [13, 16, 18], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            working
          </Interactive.Div>
          <Interactive.Div
            name="Word - hard"
            style={{
              fontFamily: "Inter",
              fontSize: 126,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.06,
              color: "#F0141E",
              textShadow: "0 0 40px rgba(240,20,30,0.45)",
              opacity: interpolate(frame, [21, 22], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [22, 25, 27], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            hard
          </Interactive.Div>
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
