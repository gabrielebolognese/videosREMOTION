import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BG_LOW, BG_MID, BG_TOP, HEIGHT, VIGNETTE, WIDTH } from "./tokens";

/**
 * Very slight film grain. The turbulence seed is driven by the frame so the
 * grain moves instead of sitting static on the plate. Kept low - the negative
 * brief calls out heavy grain and banding on the white backdrop, and this is
 * mostly here to break up the gradient.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width={WIDTH} height={HEIGHT}>
        <filter id="agency-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={frame % 97}
            stitchTiles="stitch"
          />
        </filter>
        <rect width={WIDTH} height={HEIGHT} filter="url(#agency-grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * The seamless studio: a warm off-white paper ground falling off toward the
 * bottom, a soft radial glow sitting behind centre frame, and a gentle dark
 * vignette closing all four edges.
 */
export const Studio: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_MID} 46%, ${BG_LOW} 100%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(58% 34% at 50% 44%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(78% 58% at 50% 48%, rgba(185,184,180,0) 55%, ${VIGNETTE} 130%)`,
        opacity: 0.62,
      }}
    />
  </AbsoluteFill>
);
