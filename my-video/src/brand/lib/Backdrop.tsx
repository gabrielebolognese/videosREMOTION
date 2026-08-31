import { AbsoluteFill, useCurrentFrame } from "remotion";
import { StarBurst } from "../props/Stars";
import { ROUNDED } from "../fonts";
import { OFF_WHITE } from "./tokens";

/** One chevron every 230px, so the layer can loop on that interval. */
const CHEVRON_ROWS = 13;
const CHEVRON_PITCH = 230;

/**
 * Warm off-white to pale grey vertical gradient, a soft radial hotspot behind
 * the centre of frame, and the large faint zigzag chevron watermark running
 * vertically through it.
 */
export const StudioBackdrop: React.FC<{ scroll?: number }> = ({
  scroll = 0,
}) => {
  return (
    <AbsoluteFill name="Studio backdrop" style={{ backgroundColor: OFF_WHITE }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(180deg, #F7F6F4 0%, #F3F2F0 42%, #EAE9E6 100%)",
        }}
      />

      <AbsoluteFill
        name="Chevron watermark"
        style={{
          overflow: "hidden",
          // Loops on the chevron pitch so the watermark never runs out.
          translate: `0px ${-(((scroll * 0.05) % CHEVRON_PITCH) + CHEVRON_PITCH)}px`,
        }}
      >
        <svg width="720" height="1900" viewBox="0 0 720 1900" fill="none">
          {Array.from({ length: CHEVRON_ROWS }, (_, i) => (
            <path
              key={i}
              d={`M -60 ${i * CHEVRON_PITCH} L 360 ${i * CHEVRON_PITCH + 132} L 780 ${i * CHEVRON_PITCH}`}
              stroke="#EBEAE7"
              strokeWidth="54"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(58% 36% at 50% 44%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.44) 44%, rgba(255,255,255,0) 78%)",
        }}
      />
    </AbsoluteFill>
  );
};

type Star = {
  x: number;
  y: number;
  size: number;
  spikes: number;
  rotate: number;
  blur: number;
  drift: number;
};

/**
 * Deterministic field of corner stars. `seed` shifts the whole arrangement, so
 * every scene gets its own corners rather than repeating the same four stars.
 */
export const buildStarField = (
  count: number,
  from: number,
  seed = 0,
): Star[] =>
  Array.from({ length: count }, (_, n) => {
    const i = n + seed;
    return {
      y: from + n * 430 + ((seed * 53) % 120),
      x: i % 2 === 0 ? -78 + ((i * 37) % 66) : 552 + ((i * 53) % 118),
      size: 152 + ((i * 29) % 116),
      spikes: 6 + (i % 3),
      rotate: (i * 47) % 360,
      blur: 5 + ((i * 13) % 8),
      drift: 0.5 + ((i * 17) % 9) / 9,
    };
  });

/**
 * The floating star bursts. They sit behind everything in soft defocus and
 * parallax slower than the foreground text.
 */
export const StarField: React.FC<{
  stars: Star[];
  scroll?: number;
  parallax?: number;
}> = ({ stars, scroll = 0, parallax = 0.82 }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Star field"
      style={{ translate: `0px ${-scroll * parallax}px` }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: star.x,
            top:
              star.y + Math.sin((frame / 46) * star.drift + i) * 9 * star.drift,
            rotate: `${star.rotate + Math.sin(frame / 90 + i) * 3}deg`,
            filter: `blur(${star.blur}px)`,
            opacity: 0.5,
          }}
        >
          <StarBurst size={star.size} spikes={star.spikes} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

/**
 * Every scene is a complete plate - backdrop plus its own corner stars - so a
 * transition can slide, flip or burn the whole thing rather than just the type.
 * Grain, lifted blacks and the handle mark stay above the transition instead,
 * so they never wipe with it.
 */
export const SceneShell: React.FC<{
  name: string;
  seed: number;
  children: React.ReactNode;
}> = ({ name, seed, children }) => {
  const stars = buildStarField(4, -180, seed);

  return (
    <AbsoluteFill name={name}>
      <StudioBackdrop />
      <StarField stars={stars} parallax={0} />
      {children}
    </AbsoluteFill>
  );
};

/**
 * Very light 35mm grain. The seed follows the frame so the grain moves instead
 * of sitting static on the plate.
 */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: 0.055,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    >
      <svg width="720" height="1280" viewBox="0 0 720 1280">
        <filter id="bc-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={frame}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="720" height="1280" filter="url(#bc-grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/** Lifts the blacks slightly so nothing in frame prints as pure black. */
export const LiftedBlacks: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: "rgba(244,243,241,0.055)",
      mixBlendMode: "lighten",
      pointerEvents: "none",
    }}
  />
);

/** Tiny low-contrast handle mark centred at the very bottom edge. */
export const HandleMark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 22,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: ROUNDED,
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: "0.16em",
      color: "rgba(20,20,20,0.24)",
    }}
  >
    @northline.studio
  </div>
);
