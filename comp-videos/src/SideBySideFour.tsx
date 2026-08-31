import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "800"],
  subsets: ["latin"],
});

export const SideBySideFourComposition = () => {
  return (
    <Composition
      id="SideBySideFour"
      component={SideBySideFourComparison}
      durationInFrames={1004}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

export const SideBySideFourComparison: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Canvas" style={{ backgroundColor: "#FFFFFF" }}>
      <Interactive.Div
        name="Headline line 1"
        style={{
          position: "absolute",
          top: 321,
          left: 511,
          width: 521,
          textAlign: "center",
          whiteSpace: "nowrap",
          fontFamily,
          fontSize: 64,
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: -1.2,
          wordSpacing: 4,
          color: "#6B6B76",
          opacity: interpolate(frame, [10, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [10, 34], ["0px 16px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Remade with
      </Interactive.Div>
      <Interactive.Div
        name="Headline line 2"
        style={{
          position: "absolute",
          top: 393,
          left: 511,
          width: 521,
          textAlign: "center",
          whiteSpace: "nowrap",
          fontFamily,
          fontSize: 64,
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: -1.2,
          wordSpacing: 4,
          color: "#6B6B76",
          opacity: interpolate(frame, [16, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [16, 40], ["0px 16px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <Interactive.Span
          name="Brand name"
          style={{ fontWeight: 800, color: "#000000", letterSpacing: -1.6 }}
        >
          FlashFX
        </Interactive.Span>{" "}
        (AI)
      </Interactive.Div>

      <Interactive.Div
        name="Card original"
        style={{
          position: "absolute",
          top: 595,
          left: 48,
          width: 427,
          height: 760,
          borderRadius: 30,
          overflow: "hidden",
          backgroundColor: "#F2F2F5",
          boxShadow:
            "0 26px 48px -20px rgba(16,16,28,0.26), 0 8px 18px -10px rgba(16,16,28,0.12)",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 36], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
          }),
        }}
      >
        <Video
          name="Original footage"
          src={staticFile("4d.mp4")}
          durationInFrames={33.47 * 30}
          objectFit="cover"
          style={{ width: 427, height: 760 }}
        />
        <Interactive.Div
          name="Edge ring original"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 427,
            height: 760,
            borderRadius: 30,
            boxShadow: "inset 0 0 0 1px rgba(16,16,28,0.07)",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Card remake"
        style={{
          position: "absolute",
          top: 512,
          left: 511,
          width: 521,
          height: 926,
          borderRadius: 36,
          overflow: "hidden",
          backgroundColor: "#F2F2F5",
          boxShadow:
            "0 38px 70px -24px rgba(16,16,28,0.32), 0 12px 26px -12px rgba(16,16,28,0.15)",
          opacity: interpolate(frame, [6, 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [6, 42], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
          }),
        }}
      >
        <Video
          name="Remake footage"
          src={staticFile("4.mp4")}
          durationInFrames={33.5 * 30}
          objectFit="cover"
          muted
          style={{ width: 521, height: 926 }}
        />
        <Interactive.Div
          name="Edge ring remake"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 521,
            height: 926,
            borderRadius: 36,
            boxShadow: "inset 0 0 0 1px rgba(16,16,28,0.07)",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Call to action"
        style={{
          position: "absolute",
          top: 1530,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontFamily,
          fontSize: 60,
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: -1.2,
          wordSpacing: 4,
          color: "#000000",
          opacity: interpolate(frame, [26, 48], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [26, 54], ["0px 18px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Link in bio
      </Interactive.Div>
    </AbsoluteFill>
  );
};
