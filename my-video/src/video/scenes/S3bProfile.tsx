import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BlackVoid, Grain, Vignette } from "../lib/Paper";

const COUNTERS = [
  { value: "19", label: "posts" },
  { value: "504", label: "followers" },
  { value: "68", label: "following" },
];

const THUMBS = [0, 1, 2, 3, 4, 5];

/** Shot B - 12.8s to 14.2s. Fictional app profile screen card, held steady on black. */
export const S3bProfile: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Shot 3B - Profile card">
      <BlackVoid glow="none" />

      <Interactive.Div
        name="Profile card"
        style={{
          position: "absolute",
          left: 108,
          top: 282,
          width: 504,
          borderRadius: 30,
          backgroundColor: "#0E0F10",
          border: "1.5px solid rgba(255,255,255,0.13)",
          boxShadow:
            "0 0 120px 10px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.12)",
          padding: 34,
          scale: interpolate(frame, [0, 42], [1, 1.01], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
          opacity: interpolate(frame, [0, 2], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              flexShrink: 0,
              backgroundImage:
                "linear-gradient(140deg, #4A4A52 0%, #23252A 60%, #35373E 100%)",
              border: "2px solid rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="46" height="46" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="14" r="7.4" fill="rgba(255,255,255,0.5)" />
              <path
                d="M 6 35 C 6 25 13 21 20 21 C 27 21 34 25 34 35 Z"
                fill="rgba(255,255,255,0.5)"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            {COUNTERS.map((c) => (
              <div key={c.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Inter",
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {c.value}
                </div>
                <div
                  style={{
                    fontFamily: "Inter",
                    fontSize: 17,
                    fontWeight: 400,
                    color: "#8C8C88",
                    marginTop: 2,
                  }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Inter",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            marginTop: 22,
          }}
        >
          @video__editor
        </div>

        <div
          style={{
            fontFamily: "Inter",
            fontSize: 21,
            fontWeight: 400,
            lineHeight: 1.42,
            color: "#9A9A94",
            marginTop: 10,
          }}
        >
          cuts, hooks and captions
          <br />
          posting into the void since 2023
          <br />
          open for edits
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <div
            style={{
              flex: 1,
              height: 50,
              borderRadius: 12,
              backgroundColor: "#1E2024",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter",
              fontSize: 21,
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Follow
          </div>
          <div
            style={{
              flex: 1,
              height: 50,
              borderRadius: 12,
              backgroundColor: "#1E2024",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter",
              fontSize: 21,
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Message
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            marginTop: 24,
          }}
        >
          {THUMBS.map((t) => (
            <div
              key={t}
              style={{
                width: 141,
                height: 141,
                backgroundImage:
                  "linear-gradient(150deg, #26282C 0%, #131417 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </Interactive.Div>

      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};
