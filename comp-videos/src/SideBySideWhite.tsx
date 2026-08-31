import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
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
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export const SideBySideWhiteComposition = () => {
  return (
    <Composition
      id="SideBySideWhite"
      component={SideBySideWhiteComparison}
      durationInFrames={637}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

export const SideBySideWhiteComparison: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Canvas" style={{ backgroundColor: "#FFFFFF" }}>
      <Interactive.Div
        name="Headline"
        style={{
          position: "absolute",
          top: 272,
          left: 516,
          width: 500,
          textAlign: "center",
          fontFamily,
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1.6,
          color: "#0B0B0F",
          opacity: interpolate(frame, [12, 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [12, 38], ["0px 18px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Remade with FlashFX (AI)
      </Interactive.Div>

      <Interactive.Div
        name="Card original"
        style={{
          position: "absolute",
          top: 540,
          left: 64,
          width: 416,
          height: 832,
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: "#F2F2F5",
          boxShadow:
            "0 34px 64px -26px rgba(14,14,20,0.34), 0 10px 22px -12px rgba(14,14,20,0.16), inset 0 0 0 1px rgba(14,14,20,0.06)",
          opacity: interpolate(frame, [6, 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [6, 40], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
          }),
        }}
      >
        <Video
          name="Original footage"
          src={staticFile("2d.mp4")}
          durationInFrames={637}
          objectFit="cover"
          style={{ width: 416, height: 832 }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Card remake"
        style={{
          position: "absolute",
          top: 456,
          left: 516,
          width: 500,
          height: 1000,
          borderRadius: 34,
          overflow: "hidden",
          backgroundColor: "#F2F2F5",
          boxShadow:
            "0 48px 84px -30px rgba(14,14,20,0.40), 0 14px 30px -14px rgba(14,14,20,0.20), inset 0 0 0 1px rgba(14,14,20,0.06)",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 34], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
          }),
        }}
      >
        <Video
          name="Remake footage"
          src={staticFile("2.mp4")}
          durationInFrames={638}
          objectFit="cover"
          muted
          style={{ width: 500, height: 1000 }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Link in bio"
        style={{
          position: "absolute",
          top: 1540,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontFamily,
          fontSize: 60,
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: -1.4,
          color: "#0B0B0F",
          opacity: interpolate(frame, [24, 46], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [24, 52], ["0px 18px", "0px 0px"], {
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
