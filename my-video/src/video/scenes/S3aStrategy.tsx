import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CreamPage, Grain } from "../lib/Paper";
import { SocialgramMark } from "../props/Wordmark";

/**
 * Shot A - 12.0s to 12.8s. The red word lands under the line carried over from
 * the wordmark shot, then a solid black circle wipes the frame to black.
 */
export const S3aStrategy: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 3A - Strategy">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 24], [1, 1.02], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <CreamPage rating="bottom" />

        {/* carried over from the previous shot, held still */}
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 420,
            width: 640,
            height: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: 0.6,
            translate: "0px -186px",
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
            />
          </svg>
          <SocialgramMark fontSize={88} />
        </div>

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
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 50,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#000000",
            }}
          >
            doesn&rsquo;t
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              color: "#F0141E",
            }}
          >
            reward
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 50,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#B4B4AA",
            }}
          >
            effort
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 690,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Interactive.Div
            name="Word - It rewards"
            style={{
              fontFamily: "Inter",
              fontSize: 50,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#000000",
              opacity: interpolate(frame, [-1, 0], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [0, 3, 5], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            It rewards
          </Interactive.Div>
          <Interactive.Div
            name="Word - strategy"
            style={{
              fontFamily: "Inter",
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.06,
              color: "#F0141E",
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
            strategy
          </Interactive.Div>
        </div>
      </AbsoluteFill>
      <Grain />

      {/* six frame circular wipe to black */}
      <Interactive.Div
        name="Black circle wipe"
        style={{
          position: "absolute",
          left: -390,
          top: -110,
          width: 1500,
          height: 1500,
          borderRadius: 750,
          backgroundColor: "#000000",
          scale: interpolate(frame, [18, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.5, 0, 0.7, 0.4),
            output: "perceptual-scale",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
