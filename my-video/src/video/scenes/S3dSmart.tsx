import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CreamPage, Grain, Ribbon } from "../lib/Paper";
import { SunglassesFace } from "../props/Emoji";

/** Shot D - 15.6s to 16.4s. Cream page with ribbon, sunglasses emoji pops in from lower left. */
export const S3dSmart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 3D - Smart">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 24], [1, 1.025], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <CreamPage rating="top" />

        <Ribbon
          sweep={interpolate(frame, [0, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <Interactive.Div
          name="Sunglasses emoji"
          style={{
            position: "absolute",
            left: -30,
            top: 830,
            rotate: "-8deg",
            filter: "drop-shadow(0 22px 30px rgba(90,70,40,0.3))",
            opacity: interpolate(frame, [0, 2], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [0, 5, 8], [0.5, 1.06, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
              output: "perceptual-scale",
            }),
            translate: interpolate(frame, [0, 12], ["-90px 110px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <SunglassesFace size={430} />
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 452,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Interactive.Div
            name="Word - But not"
            style={{
              fontFamily: "Inter",
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "#000000",
              opacity: interpolate(frame, [0, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [1, 4, 6], [0.62, 1.04, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
                output: "perceptual-scale",
              }),
            }}
          >
            But not
          </Interactive.Div>
          <Interactive.Div
            name="Word - smart"
            style={{
              fontFamily: "Inter",
              fontSize: 148,
              fontWeight: 900,
              letterSpacing: "-0.055em",
              lineHeight: 1.04,
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
            smart
          </Interactive.Div>
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
