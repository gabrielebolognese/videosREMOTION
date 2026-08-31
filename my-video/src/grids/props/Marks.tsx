import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OVERSHOOT, OUT } from "../lib/Wall";
import { CLAY_SOFT, RED, sec } from "../lib/tokens";

/**
 * The double brush swoosh: two hand-drawn tapered strokes, pinched at both
 * ends and heaviest through the middle. It is revealed by a clip running left
 * to right, which is what makes it read as a brush laid down rather than a
 * shape fading up.
 */
export const BrushSwoosh: React.FC<{
  width: number;
  /** 0 to 1, how much of the stroke has been laid down. */
  progress: number;
  opacity?: number;
}> = ({ width, progress, opacity = 1 }) => (
  <div
    style={{
      width,
      clipPath: `inset(0 ${((1 - progress) * 100).toFixed(2)}% 0 0)`,
      opacity,
    }}
  >
    <svg
      width={width}
      height={width * 0.175}
      viewBox="0 0 480 84"
      fill={RED}
      style={{ display: "block" }}
    >
      <path d="M 5 40 C 110 14, 300 4, 471 14 C 478 14, 479 26, 470 27 C 300 18, 118 28, 11 54 C 4 56, 0 42, 5 40 Z" />
      <path d="M 45 66 C 144 50, 282 45, 401 51 C 408 51, 409 61, 400 62 C 282 56, 146 62, 49 78 C 42 79, 38 68, 45 66 Z" />
    </svg>
  </div>
);

/** The single small white four-point sparkle, low on the right of the wall. */
export const Sparkle: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 630,
        top: 772,
        scale: interpolate(frame, [sec(1.3), sec(1.55)], [0, 1], {
          ...CLAMP,
          easing: OVERSHOOT,
          output: "perceptual-scale",
        }),
        rotate: `${interpolate(frame, [sec(1.3), sec(2.4)], [-40, 0], { ...CLAMP, easing: OUT }).toFixed(2)}deg`,
        filter: CLAY_SOFT,
      }}
    >
      <svg width="42" height="42" viewBox="0 0 60 60" fill="#FFFFFF">
        <path d="M 30 0 C 33 18, 42 27, 60 30 C 42 33, 33 42, 30 60 C 27 42, 18 33, 0 30 C 18 27, 27 18, 30 0 Z" />
      </svg>
    </div>
  );
};

/**
 * The 6x4 array of red dots at the top left, drawn on dot by dot in a quick
 * diagonal cascade so it reads as being printed rather than switched on.
 */
export const DotArray: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: React.ReactNode[] = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const start = sec(7.92) + (row + col) * 1.6;
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * 22 + 6}
          cy={row * 22 + 6}
          r={4.6}
          fill={RED}
          style={{
            transformOrigin: `${col * 22 + 6}px ${row * 22 + 6}px`,
            scale: interpolate(frame, [start, start + 5], [0, 1], {
              ...CLAMP,
              easing: OVERSHOOT,
              output: "perceptual-scale",
            }),
          }}
        />,
      );
    }
  }

  return (
    <svg
      width="122"
      height="78"
      viewBox="0 0 122 78"
      style={{ position: "absolute", left: 58, top: 86 }}
    >
      {dots}
    </svg>
  );
};
