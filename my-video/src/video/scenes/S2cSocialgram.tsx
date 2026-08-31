import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CreamPage, Grain } from "../lib/Paper";
import { SocialgramMark } from "../props/Wordmark";

/** Shot C - 9.6s to 12.0s. Clean cream page, wordmark scales in, red circle strokes around it. */
export const S2cSocialgram: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 2C - Socialgram">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 72], [1, 1.02], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <CreamPage rating="bottom" />

        <Interactive.Div
          name="Wordmark group"
          style={{
            position: "absolute",
            left: 40,
            top: 420,
            width: 640,
            height: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: interpolate(frame, [0, 11, 30, 44], [0.55, 1, 1, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
              output: "perceptual-scale",
            }),
            translate: interpolate(
              frame,
              [30, 44],
              ["0px 0px", "0px -186px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            opacity: interpolate(frame, [0, 2], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <svg
            width="640"
            height="280"
            viewBox="0 0 640 280"
            fill="none"
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <path
              d="M 52 132 C 56 62 190 22 330 20 C 474 18 598 60 602 132 C 606 206 470 262 320 262 C 172 262 44 224 42 150 C 41 106 96 68 176 46"
              stroke="#F0141E"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [12, 23], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.32, 0, 0.24, 1),
              })}
            />
          </svg>
          <SocialgramMark fontSize={88} />
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 540,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Interactive.Div
            name="Word - doesnt"
            style={{
              fontFamily: "Inter",
              fontSize: 50,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#000000",
              opacity: interpolate(frame, [44, 45], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [45, 48, 50], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            doesn&rsquo;t
          </Interactive.Div>
          <Interactive.Div
            name="Word - reward"
            style={{
              fontFamily: "Inter",
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              color: "#F0141E",
              opacity: interpolate(frame, [53, 54], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [54, 57, 59], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            reward
          </Interactive.Div>
          <Interactive.Div
            name="Word - effort"
            style={{
              fontFamily: "Inter",
              fontSize: 50,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#B4B4AA",
              opacity: interpolate(frame, [62, 63], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [63, 66, 68], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            effort
          </Interactive.Div>
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
