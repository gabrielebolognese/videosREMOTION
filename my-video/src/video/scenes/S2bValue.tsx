import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CreamPage, Grain, Ribbon } from "../lib/Paper";
import { RedPin } from "../props/Doodads";
import { ClownFace } from "../props/Emoji";
import { NoEyeIcon, NoMoneyIcon, NoTargetIcon } from "../props/Icons";

/** Shot B - 7.5s to 9.6s. Cream page, grey note card pins in and prints three bullets. */
export const S2bValue: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 2B - Value">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 63], [1, 1.025], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <CreamPage rating="bottom" />

        <Ribbon
          sweep={interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <Interactive.Div
          name="Clown pattern"
          style={{ position: "absolute", inset: 0, rotate: "-11deg" }}
        >
          <div style={{ position: "absolute", left: -160, top: -60 }}>
            <ClownFace size={300} id="v-tl" />
          </div>
          <div style={{ position: "absolute", left: 580, top: 60 }}>
            <ClownFace size={300} id="v-tr" />
          </div>
          <div style={{ position: "absolute", left: -150, top: 1090 }}>
            <ClownFace size={300} id="v-bl" />
          </div>
          <div style={{ position: "absolute", left: 570, top: 1130 }}>
            <ClownFace size={300} id="v-br" />
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Grey note card"
          style={{
            position: "absolute",
            left: 118,
            top: 400,
            width: 484,
            height: 470,
            borderRadius: 12,
            backgroundColor: "#6E6E66",
            backgroundImage:
              "linear-gradient(158deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.14) 100%)",
            boxShadow: "0 26px 40px rgba(72,60,46,0.28)",
            padding: "54px 44px 40px 44px",
            rotate: interpolate(frame, [0, 10, 50, 58], ["15deg", "8deg", "8deg", "5.2deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            }),
            opacity: interpolate(frame, [0, 2], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [0, 11], [0.82, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
            translate: interpolate(frame, [0, 11], ["0px -70px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 202,
              top: -34,
              filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.35))",
            }}
          >
            <RedPin size={78} />
          </div>

          <div
            style={{
              fontFamily: "Inter",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              color: "#FFFFFF",
              lineHeight: 1,
              marginBottom: 36,
            }}
          >
            Value
          </div>

          <Interactive.Div
            name="Bullet - No eyeballs"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 26,
              fontFamily: "Inter",
              fontSize: 46,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              opacity: interpolate(frame, [14, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(frame, [15, 22], ["-26px 0px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            <NoEyeIcon size={50} />
            No eyeballs
          </Interactive.Div>

          <Interactive.Div
            name="Bullet - No impact"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 26,
              fontFamily: "Inter",
              fontSize: 46,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              opacity: interpolate(frame, [32, 33], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(frame, [33, 40], ["-26px 0px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            <NoTargetIcon size={50} />
            No impact
          </Interactive.Div>

          <Interactive.Div
            name="Bullet - No earnings"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontFamily: "Inter",
              fontSize: 46,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              opacity: interpolate(frame, [50, 51], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(frame, [51, 58], ["-26px 0px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            <NoMoneyIcon size={50} />
            No earnings
          </Interactive.Div>
        </Interactive.Div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
