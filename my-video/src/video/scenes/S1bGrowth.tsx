import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BlackVoid, Grain, Vignette } from "../lib/Paper";
import { Typed } from "../lib/Typed";
import { SuitFigure } from "../props/SuitFigure";

/** Shot B - 1.4s to 3.2s. Pure black, halftone suit figure, text types inside the glowing head. */
export const S1bGrowth: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 1B - Growth">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 54], [1, 1.025], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <BlackVoid glow="white" />

        {/* faint red spill on the floor plane */}
        <Interactive.Div
          name="Red floor spill"
          style={{
            position: "absolute",
            left: 60,
            bottom: 0,
            width: 600,
            height: 260,
            borderRadius: "50%",
            backgroundColor: "rgba(240,20,30,0.22)",
            filter: "blur(60px)",
          }}
        />

        <Interactive.Div
          name="Halftone suit figure"
          style={{
            position: "absolute",
            left: 50,
            top: 390,
            opacity: interpolate(frame, [0, 4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [0, 10], [0.96, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          <SuitFigure width={620} />
        </Interactive.Div>

        <Interactive.Div
          name="Glowing head"
          style={{
            position: "absolute",
            left: 210,
            top: 238,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 120px 26px rgba(255,255,255,0.45)",
            scale: interpolate(frame, [0, 6], [0.7, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#000000",
              lineHeight: 1.1,
            }}
          >
            <Typed
              segments={[{ text: "But your", style: { color: "#000000" } }]}
              start={7}
              charsPerFrame={1.1}
            />
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            <Typed
              segments={[
                { text: "growth", style: { color: "#F0141E" } },
                { text: "?", style: { color: "#000000" } },
              ]}
              start={17}
              charsPerFrame={1.1}
            />
          </div>
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 92,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 22,
          }}
        >
          <Interactive.Div
            name="Word - still"
            style={{
              fontFamily: "Inter",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              color: "#FFFFFF",
              opacity: interpolate(frame, [33, 34], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(frame, [34, 42], ["0px 46px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            still
          </Interactive.Div>
          <Interactive.Div
            name="Word - stuck"
            style={{
              fontFamily: "Inter",
              fontSize: 92,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#B4B4AA",
              opacity: interpolate(frame, [40, 41], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(frame, [41, 49], ["0px 46px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            stuck
          </Interactive.Div>
        </div>
        <Vignette />
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
