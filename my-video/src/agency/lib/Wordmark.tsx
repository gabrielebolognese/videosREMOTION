import React from "react";
import { TECHNO } from "./tokens";

/**
 * The agency wordmark lock-up, stubbed.
 *
 * No real brand appears anywhere in this piece, so the mark is an explicit
 * placeholder: two stacked words in a squared-off techno sans, a small
 * registered mark at the upper right, and a thin underline carrying four dots
 * beneath the lower word. Built at the size the real lock-up will occupy.
 */
export const Wordmark: React.FC<{
  size: number;
  colour: string;
  opacity?: number;
  style?: React.CSSProperties;
  /** Overrides, so the end card can feed in scrambled glyphs mid-reveal. */
  line1?: string;
  line2?: string;
  /** 0-1 wipe on the underline and dots. */
  reveal?: number;
}> = ({
  size,
  colour,
  opacity = 1,
  style,
  line1 = "AGENCY",
  line2 = "WORDMARK",
  reveal = 1,
}) => {
  const gap = size * 0.06;
  const ruleWidth = size * 6.1;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        fontFamily: TECHNO,
        color: colour,
        lineHeight: 1,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: size, fontWeight: 700, letterSpacing: `${size * 0.09}px` }}>
            {line1}
          </span>
          <span
            style={{
              fontSize: size,
              fontWeight: 700,
              letterSpacing: `${size * 0.012}px`,
              marginTop: gap,
            }}
          >
            {line2}
          </span>
        </div>
        <span style={{ fontSize: size * 0.34, fontWeight: 600, marginLeft: size * 0.12 }}>®</span>
      </div>

      <div style={{ marginTop: gap * 2.2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: ruleWidth * reveal,
            height: Math.max(1, size * 0.045),
            background: colour,
          }}
        />
        <div style={{ display: "flex", gap: size * 0.28, marginTop: size * 0.16 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: size * 0.12,
                height: size * 0.12,
                borderRadius: "50%",
                background: colour,
                opacity: reveal > (i + 1) / 5 ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/** The small black lock-up that stays locked to the top centre, shots 1-12. */
export const TopWordmark: React.FC<{ colour: string }> = ({ colour }) => (
  <div
    style={{
      position: "absolute",
      top: 96,
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
    }}
  >
    <Wordmark size={21} colour={colour} />
  </div>
);
