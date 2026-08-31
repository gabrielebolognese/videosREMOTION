import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Badge } from "../props/Badge";
import { WALL_DEEP, WALL_LIGHT, WIDTH } from "./tokens";

/**
 * Faint film grain. Low enough to sit under the render rather than on it, but
 * the seed moves - a static plate reads as a texture, not as grain.
 */
export const Grain: React.FC<{ amount?: number }> = ({ amount = 1 }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: 0.038 * amount,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    >
      <svg width="720" height="1280" viewBox="0 0 720 1280">
        <filter id="cafegrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={frame % 12}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="720" height="1280" filter="url(#cafegrain)" />
      </svg>
    </AbsoluteFill>
  );
};

/** Gentle vignette in all four corners, falling to the wall edge grey. */
export const Vignette: React.FC<{ amount?: number }> = ({ amount = 1 }) => (
  <AbsoluteFill
    style={{
      backgroundImage: `radial-gradient(78% 60% at 46% 42%, rgba(179,184,180,0) 44%, rgba(179,184,180,${(
        0.34 * amount
      ).toFixed(3)}) 78%, rgba(151,158,153,${(0.62 * amount).toFixed(3)}) 100%)`,
      mixBlendMode: "multiply",
      pointerEvents: "none",
    }}
  />
);

/**
 * The seamless pale mint wall.
 *
 * The key is a broad diffused source up and to the left, so the wall itself
 * carries the falloff: brightest around the upper left third, dropping away to
 * the lower right before the vignette takes over at the corners.
 */
export const Wall: React.FC<{
  /** 0 hides the relief entirely, for the plain-wall card shots. */
  emblem?: number;
  /** Scale of the embossed roundel, as a fraction of frame width. */
  emblemScale?: number;
  /** Pixels the emblem is offset from centre, for the closing close-up. */
  emblemX?: number;
  emblemY?: number;
  emblemBlur?: number;
  vignette?: number;
}> = ({
  emblem = 1,
  emblemScale = 0.85,
  emblemX = 0,
  emblemY = 0,
  emblemBlur = 0,
  vignette = 1,
}) => {
  const size = WIDTH * emblemScale;

  return (
    <AbsoluteFill name="Mint wall" style={{ backgroundColor: WALL_DEEP }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(96% 72% at 34% 26%, ${WALL_LIGHT} 0%, ${WALL_DEEP} 62%, #C9D5CF 100%)`,
        }}
      />
      {emblem > 0 ? (
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: emblem,
            filter: emblemBlur > 0 ? `blur(${emblemBlur}px)` : undefined,
          }}
        >
          <div style={{ translate: `${emblemX}px ${emblemY}px` }}>
            <Badge size={size} variant="relief" />
          </div>
        </AbsoluteFill>
      ) : null}
      <Vignette amount={vignette} />
    </AbsoluteFill>
  );
};
