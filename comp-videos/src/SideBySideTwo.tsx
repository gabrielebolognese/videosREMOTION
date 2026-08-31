import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SideBySideTwoComposition = () => {
  return (
    <Composition
      id="SideBySideTwo"
      component={SideBySideTwoComparison}
      durationInFrames={534}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

export const SideBySideTwoComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill name="Canvas" style={{ backgroundColor: "#E8E8ED" }}>
      <Interactive.Div
        name="Moving grid"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "linear-gradient(to right, rgba(23,23,26,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,23,26,0.065) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: interpolate(
            frame,
            [0, durationInFrames],
            ["0px 0px", "-288px -216px"],
            {
              easing: Easing.linear,
            },
          ),
        }}
      />
      <Interactive.Div
        name="Depth vignette"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "radial-gradient(115% 70% at 50% 44%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.12) 48%, rgba(30,30,40,0.09) 100%)",
        }}
      />

      <Interactive.Div
        name="Label original"
        style={{
          position: "absolute",
          top: 493,
          left: 48,
          width: 390,
          textAlign: "center",
          fontFamily:
            '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
          fontSize: 68,
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: -1.5,
          color: "#87878F",
          opacity: interpolate(frame, [6, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [6, 30], ["0px 16px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        original
      </Interactive.Div>
      <Interactive.Div
        name="Label remake"
        style={{
          position: "absolute",
          top: 258,
          left: 470,
          width: 562,
          textAlign: "center",
          fontFamily:
            '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1.5,
          color: "#17171A",
          opacity: interpolate(frame, [12, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [12, 36], ["0px 16px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        remade with flashfx
      </Interactive.Div>

      <Interactive.Div
        name="Card original"
        style={{
          position: "absolute",
          top: 597,
          left: 48,
          width: 390,
          height: 722,
          borderRadius: 26,
          overflow: "hidden",
          backgroundColor: "#E3E3E8",
          boxShadow:
            "0 26px 50px -20px rgba(22,22,32,0.28), 0 5px 14px -6px rgba(22,22,32,0.12), inset 0 0 0 1px rgba(23,23,26,0.10)",
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
          name="Original footage"
          src={staticFile("1d.mp4")}
          durationInFrames={536}
          objectFit="cover"
          style={{ width: 390, height: 722 }}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Card remake"
        style={{
          position: "absolute",
          top: 438,
          left: 470,
          width: 562,
          height: 1040,
          borderRadius: 34,
          overflow: "hidden",
          backgroundColor: "#E3E3E8",
          boxShadow:
            "0 40px 74px -24px rgba(22,22,32,0.34), 0 8px 22px -8px rgba(22,22,32,0.16), inset 0 0 0 1px rgba(23,23,26,0.10)",
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
          name="Remake footage"
          src={staticFile("1.mp4")}
          durationInFrames={534}
          objectFit="cover"
          muted
          style={{ width: 562, height: 1040 }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Call to action"
        style={{
          position: "absolute",
          top: 1554,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
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
        <Interactive.Div
          name="Link in bio pill"
          style={{
            padding: "22px 58px",
            borderRadius: 999,
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 18px 38px -16px rgba(22,22,32,0.28), 0 2px 6px -2px rgba(22,22,32,0.10)",
            fontFamily:
              '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: -1,
            color: "#17171A",
            whiteSpace: "nowrap",
          }}
        >
          link in bio
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
