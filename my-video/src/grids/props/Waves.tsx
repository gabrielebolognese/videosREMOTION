import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, SETTLE } from "../lib/Wall";
import { HEIGHT, WAVE_REDS, WIDTH, sec } from "../lib/tokens";

/**
 * A band's top edge, sampled across the frame and a little past both sides so
 * the curve never shows a seam. 8px steps are dense enough that the sine reads
 * as a smooth extruded lip rather than a chain of facets.
 */
const edge = (base: number, amp: number, phase: number, freq: number) => {
  const pts: string[] = [];
  for (let x = -24; x <= WIDTH + 24; x += 8) {
    const y = base + Math.sin((x / WIDTH) * Math.PI * freq + phase) * amp;
    pts.push(`${x} ${y.toFixed(2)}`);
  }
  return pts;
};

/** Bands run back to front: each nearer layer sits lower and catches more key. */
const BANDS = [
  { base: 856, amp: 34, phase: 0.4, freq: 1.7, lip: "#C4483C" },
  { base: 936, amp: 30, phase: 2.1, freq: 1.5, lip: "#D45C4F" },
  { base: 1016, amp: 26, phase: 3.4, freq: 1.9, lip: "#E9695B" },
  { base: 1096, amp: 21, phase: 4.8, freq: 1.4, lip: "#F58978" },
];

const Band: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const band = BANDS[index];
  const pts = edge(band.base, band.amp, band.phase, band.freq);

  // Rise from below the bottom edge with a soft overshoot, layers a few frames
  // apart; then, on the whip at 6.7s, drop straight back out of frame.
  const rise = interpolate(
    frame,
    [sec(0.5) + index * 3, sec(0.5) + index * 3 + 22],
    [470, 0],
    { ...CLAMP, easing: SETTLE },
  );

  const exit = interpolate(
    frame,
    [sec(6.7) + index * 2, sec(6.7) + index * 2 + 22],
    [0, 540],
    { ...CLAMP, easing: Easing.bezier(0.55, 0, 0.9, 0.42) },
  );

  return (
    <AbsoluteFill
      style={{
        translate: `0px ${(rise + exit).toFixed(2)}px`,
        // Soft ambient occlusion in the crease above each band, so the stack
        // reads as separate extruded slabs instead of one flat silhouette.
        filter: "drop-shadow(3px -8px 13px rgba(88,16,9,0.42))",
      }}
    >
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          <linearGradient id={`grids-wave-${index}`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor={WAVE_REDS[index]} />
            <stop offset="1" stopColor={index === 3 ? "#C33628" : "#8E1A11"} />
          </linearGradient>
        </defs>
        <path
          d={`M ${pts.join(" L ")} L ${WIDTH + 24} ${HEIGHT + 60} L -24 ${HEIGHT + 60} Z`}
          fill={`url(#grids-wave-${index})`}
        />
        {/* the rounded lip along the top of the extrusion */}
        <path
          d={`M ${pts.join(" L ")}`}
          fill="none"
          stroke={band.lip}
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </AbsoluteFill>
  );
};

/** The stacked red waves filling the lower third. */
export const Waves: React.FC = () => (
  <AbsoluteFill name="Red waves">
    {BANDS.map((_, i) => (
      <Band key={i} index={i} />
    ))}
  </AbsoluteFill>
);
