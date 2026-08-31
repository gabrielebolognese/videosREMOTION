import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { OUT } from "../lib/motion";
import { useShot } from "../lib/shot";
import { scrambleText } from "../lib/Type";
import { Wordmark } from "../lib/Wordmark";
import { CARD, dur, HEIGHT, SANS, WIDTH } from "../lib/tokens";

/**
 * SHOT 13 - 3.8s. The end card.
 *
 * Hard cut to a near-black ground with a very faint warm cast and a soft
 * concentric swirl just visible behind. The wordmark assembles glyph by glyph
 * on a digital scramble, the tagline resolves under it, the URL holds at the
 * bottom, and then everything sits still for the final beat.
 *
 * No leaves, no grid, no top lock-up: this card owns the frame.
 */
export const Shot13: React.FC = () => {
  const clock = useShot(12);
  if (!clock.visible) return null;

  const l1 = scrambleText("AGENCY", clock.local, 0.18, 1.0).join("");
  const l2 = scrambleText("WORDMARK", clock.local, 0.3, 1.1).join("");
  const rule = interpolate(clock.local, [dur(1.2), dur(1.62)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const tagline = interpolate(clock.local, [dur(1.5), dur(1.86)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const url = interpolate(clock.local, [dur(1.9), dur(2.24)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  return (
    <AbsoluteFill style={{ background: CARD }}>
      {/* The faint warm cast, barely there. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(62% 40% at 50% 44%, rgba(58,52,44,0.55) 0%, rgba(27,27,27,0) 100%)",
        }}
      />

      {/* Soft concentric swirl, just visible. */}
      <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", left: 0, top: 0, opacity: 0.05 }}>
        {Array.from({ length: 13 }, (_, i) => (
          <ellipse
            key={i}
            cx={540}
            cy={860}
            rx={90 + i * 74}
            ry={70 + i * 62}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={1.6}
            transform={`rotate(${i * 7} 540 860)`}
          />
        ))}
      </svg>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Wordmark size={72} colour="#FFFFFF" line1={l1} line2={l2} reveal={rule} />

        <div
          style={{
            marginTop: 116,
            fontFamily: SANS,
            fontSize: 48,
            fontWeight: 300,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            opacity: tagline,
            transform: `translateY(${(1 - tagline) * 12}px)`,
          }}
        >
          Systems-First Growth Agency
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 116,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontFamily: SANS,
          fontSize: 32,
          fontWeight: 300,
          color: "#FFFFFF",
          letterSpacing: "0.01em",
          opacity: url * 0.9,
        }}
      >
        www.placeholder-domain.com
      </div>
    </AbsoluteFill>
  );
};
