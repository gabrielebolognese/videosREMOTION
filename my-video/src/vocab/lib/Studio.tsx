import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { PAPER, PAPER_EDGE } from "./tokens";

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Every reveal in the piece uses this, then holds dead still. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** The slight scale overshoot the brief asks for on every punch word. */
export const OVERSHOOT = Easing.bezier(0.2, 1.5, 0.34, 1);
export const GLIDE = Easing.bezier(0.4, 0, 0.6, 1);

/**
 * The monogram baked into the backdrop: a giant tone-on-tone zigzag, a
 * lightning-bolt W in slightly darker grey, drifting very slowly.
 *
 * `drift` runs on the absolute composition frame rather than the shot frame,
 * so the monogram never resets at a cut - it is part of the set, not the shot.
 */
export const Monogram: React.FC<{ drift: number; strength?: number }> = ({
  drift,
  strength = 1,
}) => (
  <AbsoluteFill
    style={{
      translate: `${(drift * 26).toFixed(2)}px ${(drift * -18).toFixed(2)}px`,
      opacity: strength,
    }}
  >
    <svg width="720" height="1280" viewBox="0 0 720 1280" fill="none">
      <path
        d="M 84 286 L 246 946 L 362 566 L 476 946 L 646 286"
        stroke="#E5E5E5"
        strokeWidth="104"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        fill="none"
      />
      <path
        d="M 84 286 L 246 946 L 362 566 L 476 946 L 646 286"
        stroke="#EDEDED"
        strokeWidth="34"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        fill="none"
      />
    </svg>
  </AbsoluteFill>
);

/** Very light film grain, low enough to sit under the render. */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: 0.032,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    >
      <svg width="720" height="1280" viewBox="0 0 720 1280">
        <filter id="vocabgrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.95"
            numOctaves={2}
            seed={frame % 10}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="720" height="1280" filter="url(#vocabgrain)" />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * The infinite seamless studio backdrop: off-white falling to light grey at
 * the edges, a soft radial glow behind the centre of frame, and the monogram.
 */
export const Studio: React.FC<{
  /** 0 removes the monogram entirely, for the end card. */
  monogram?: number;
  drift?: number;
}> = ({ monogram = 1, drift = 0 }) => (
  <AbsoluteFill name="Studio backdrop" style={{ backgroundColor: PAPER_EDGE }}>
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(78% 52% at 50% 44%, ${PAPER} 0%, #F2F2F2 52%, ${PAPER_EDGE} 100%)`,
      }}
    />
    {monogram > 0 ? <Monogram drift={drift} strength={monogram} /> : null}
    {/* gentle bloom in the centre */}
    <AbsoluteFill
      style={{
        backgroundImage:
          "radial-gradient(44% 28% at 50% 44%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 100%)",
      }}
    />
    {/* falloff toward the frame edges */}
    <AbsoluteFill
      style={{
        backgroundImage:
          "radial-gradient(82% 60% at 50% 46%, rgba(190,190,190,0) 52%, rgba(178,178,178,0.42) 100%)",
        mixBlendMode: "multiply",
      }}
    />
  </AbsoluteFill>
);

/**
 * One shot.
 *
 * Only two cuts in the piece are hard; everything else is a white bloom or a
 * soft fade. Because the backdrop never changes, a soft fade is a fade on the
 * content layer alone - the set stays lit underneath and nothing flickers.
 */
export const Stage: React.FC<{
  name: string;
  duration: number;
  /** Frame this shot starts on, so the monogram drift survives every cut. */
  startsAt: number;
  camera?: [number, number];
  monogram?: number;
  /** Frames of white the shot resolves out of. */
  bloomIn?: number;
  /** Frames of white the shot blooms into at its end. */
  bloomOut?: number;
  /** Frames the content layer takes to fade up. 0 is a hard cut. */
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}> = ({
  name,
  duration,
  startsAt,
  camera = [1, 1.02],
  monogram = 1,
  bloomIn = 0,
  bloomOut = 0,
  fadeIn = 5,
  fadeOut = 5,
  children,
}) => {
  const frame = useCurrentFrame();

  const bloom = Math.max(
    bloomIn > 0 ? interpolate(frame, [0, bloomIn], [1, 0], CLAMP) : 0,
    bloomOut > 0
      ? interpolate(frame, [duration - bloomOut, duration], [0, 1], {
          ...CLAMP,
          easing: GLIDE,
        })
      : 0,
  );

  return (
    <AbsoluteFill name={name}>
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, duration], camera, {
            ...CLAMP,
            easing: GLIDE,
            output: "perceptual-scale",
          }),
        }}
      >
        <Studio monogram={monogram} drift={(frame + startsAt) / 708} />
        <AbsoluteFill
          style={{
            opacity:
              (fadeIn > 0 ? interpolate(frame, [0, fadeIn], [0, 1], CLAMP) : 1) *
              (fadeOut > 0
                ? interpolate(frame, [duration - fadeOut, duration], [1, 0], CLAMP)
                : 1),
          }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
      <Grain />
      {bloom > 0.001 ? (
        <AbsoluteFill
          style={{ backgroundColor: "#FFFFFF", opacity: bloom }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
