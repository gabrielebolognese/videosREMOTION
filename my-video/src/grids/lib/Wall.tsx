import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { GRID_LINE, HEIGHT, PAPER, WIDTH, sec } from "./tokens";

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** The settle every entrance decelerates into. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
/** The short elastic overshoot the brief asks for on every entrance. */
export const OVERSHOOT = Easing.bezier(0.18, 1.62, 0.36, 1);
/** A softer overshoot for the heavy props that carry weight. */
export const SETTLE = Easing.bezier(0.22, 1.32, 0.4, 1);
/** Even acceleration, for wipes and sweeps. */
export const GLIDE = Easing.bezier(0.4, 0, 0.6, 1);
/** The whip: leaves hard, arrives soft. */
export const WHIP = Easing.bezier(0.7, 0, 0.16, 1);
/** Accelerating: for anything that exits the frame and does not come back. */
export const LEAVE = Easing.bezier(0.55, 0, 0.9, 0.42);

/** Nine squares across the frame, so the cell is a round 80px. */
export const CELL = WIDTH / 9;

/**
 * How much smear each of the two fast moves carries, on the master clock.
 * Both the element being smeared and the filter definition read these, so the
 * deviation can never drift out of step with the move that earned it.
 */
export const penBlurAt = (frame: number) =>
  interpolate(frame, [sec(1.9), sec(2.06), sec(2.5)], [0, 14, 0], CLAMP);

export const whipBlurAt = (frame: number) =>
  interpolate(frame, [sec(6.66), sec(6.79), sec(7.02)], [0, 11, 0], CLAMP);

/**
 * Directional blur filters, declared once at the top of the tree. CSS `blur()`
 * is isotropic, and the brief wants the smear to run along the direction of
 * travel - vertical for the 6.7s whip, horizontal for the pen tool's fly-in.
 * The deviations are driven per frame so the smear builds and clears.
 */
export const BlurDefs: React.FC<{ vertical: number; horizontal: number }> = ({
  vertical,
  horizontal,
}) => (
  <svg
    width="0"
    height="0"
    style={{ position: "absolute" }}
    aria-hidden
  >
    <defs>
      <filter id="grids-vblur" x="-30%" y="-60%" width="160%" height="220%">
        <feGaussianBlur stdDeviation={`0 ${vertical.toFixed(2)}`} />
      </filter>
      <filter id="grids-hblur" x="-60%" y="-30%" width="220%" height="160%">
        <feGaussianBlur stdDeviation={`${horizontal.toFixed(2)} 0`} />
      </filter>
    </defs>
  </svg>
);

/**
 * The printed square grid on the paper. It wipes on from the top-left corner
 * across the diagonal in the first two thirds of a second, then stays put for
 * the rest of the take.
 *
 * The wipe is a mask on the line layer rather than a stroke-dash animation:
 * the leading edge has to cross verticals and horizontals at the same moment
 * for it to read as paper being printed, not as lines being drawn.
 */
const Grid: React.FC = () => {
  const frame = useCurrentFrame();

  const sweep = interpolate(frame, [sec(0.08), sec(0.72)], [-18, 150], {
    ...CLAMP,
    easing: GLIDE,
  });

  return (
    <AbsoluteFill
      style={{
        maskImage: `linear-gradient(135deg, #000 ${(sweep - 16).toFixed(2)}%, rgba(0,0,0,0) ${(sweep + 5).toFixed(2)}%)`,
        WebkitMaskImage: `linear-gradient(135deg, #000 ${(sweep - 16).toFixed(2)}%, rgba(0,0,0,0) ${(sweep + 5).toFixed(2)}%)`,
      }}
    >
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <g stroke={GRID_LINE} strokeWidth="1.4" shapeRendering="crispEdges">
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={HEIGHT} />
          ))}
          {Array.from({ length: 17 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * CELL} x2={WIDTH} y2={i * CELL} />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Paper fibre. Two turbulence passes: a coarse mottle that never moves, so the
 * sheet keeps the same tooth all the way through, and nothing else. The moving
 * film grain is a separate layer above the whole render.
 */
const Fibre: React.FC = () => (
  <AbsoluteFill style={{ opacity: 0.09, mixBlendMode: "multiply" }}>
    <svg width={WIDTH} height={HEIGHT}>
      <filter id="grids-fibre">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.6 0.22"
          numOctaves={3}
          seed={7}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={WIDTH} height={HEIGHT} filter="url(#grids-fibre)" />
    </svg>
  </AbsoluteFill>
);

/**
 * The wall: warm off-white paper, a broad soft key falling from the upper
 * left, the printed grid, paper fibre and a soft corner vignette.
 */
export const Wall: React.FC = () => (
  <AbsoluteFill name="Paper wall" style={{ backgroundColor: PAPER }}>
    {/* broad diffuse key from the upper left, gentle falloff to the bottom */}
    <AbsoluteFill
      style={{
        backgroundImage:
          "radial-gradient(86% 60% at 22% 16%, rgba(255,250,238,0.66) 0%, rgba(255,250,238,0) 70%)",
      }}
    />
    <Grid />
    <Fibre />
    {/* soft vignette, darkest in the bottom corners where the key falls off */}
    <AbsoluteFill
      style={{
        backgroundImage:
          "radial-gradient(72% 56% at 46% 40%, rgba(118,106,94,0) 44%, rgba(118,106,94,0.36) 100%)",
        mixBlendMode: "multiply",
      }}
    />
  </AbsoluteFill>
);

/**
 * The slow soft light sweep that crosses the paper left to right through the
 * final hold. Wide, low contrast, and gone before the last frame settles.
 */
export const LightSweep: React.FC = () => {
  const frame = useCurrentFrame();

  const x = interpolate(frame, [sec(8.7), sec(10)], [-70, 165], {
    ...CLAMP,
    easing: GLIDE,
  });

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(
          frame,
          [sec(8.7), sec(9.0), sec(9.6), sec(10)],
          [0, 1, 1, 0],
          CLAMP,
        ),
        mixBlendMode: "screen",
        backgroundImage: `linear-gradient(104deg, rgba(255,255,255,0) ${(x - 30).toFixed(1)}%, rgba(255,255,255,0.30) ${x.toFixed(1)}%, rgba(255,255,255,0) ${(x + 30).toFixed(1)}%)`,
        pointerEvents: "none",
      }}
    />
  );
};

/** Subtle film grain over the finished render. */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ opacity: 0.038, mixBlendMode: "multiply", pointerEvents: "none" }}
    >
      <svg width={WIDTH} height={HEIGHT}>
        <filter id="grids-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={frame % 8}
            stitchTiles="stitch"
          />
        </filter>
        <rect width={WIDTH} height={HEIGHT} filter="url(#grids-grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * The whisper of defocus at the frame edges. A backdrop blur masked to a ring
 * around the centre - shallow enough that only the outer eighth of the frame
 * softens, which is all the brief asks for.
 */
export const EdgeDefocus: React.FC = () => (
  <AbsoluteFill
    style={{
      backdropFilter: "blur(2.6px)",
      WebkitBackdropFilter: "blur(2.6px)",
      maskImage:
        "radial-gradient(66% 62% at 50% 48%, rgba(0,0,0,0) 62%, #000 100%)",
      WebkitMaskImage:
        "radial-gradient(66% 62% at 50% 48%, rgba(0,0,0,0) 62%, #000 100%)",
      pointerEvents: "none",
    }}
  />
);
