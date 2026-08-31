import { BRAIN_PINK } from "../lib/tokens";

const OUTLINE =
  "M 200 26 C 150 10, 104 24, 84 58 C 48 62, 24 96, 34 132 C 12 158, 20 198, 46 216 C 52 250, 86 270, 120 262 C 142 290, 188 294, 212 270 C 252 288, 294 268, 302 236 C 338 230, 362 198, 348 164 C 372 138, 364 96, 334 78 C 326 42, 286 18, 250 32 C 236 22, 218 20, 200 26 Z";

/** A single gyrus: a wavy line built from alternating quadratic arcs. */
const squiggle = (
  x0: number,
  x1: number,
  y: number,
  amp: number,
  segments: number,
  bow: number,
) => {
  const dx = (x1 - x0) / segments;
  const at = (i: number) => {
    const t = i / segments;
    return y + bow * (t - 0.5) * (t - 0.5) * 4;
  };

  let d = `M ${x0} ${at(0).toFixed(1)}`;
  for (let i = 0; i < segments; i++) {
    const cx = x0 + dx * i + dx / 2;
    const cy = (at(i) + at(i + 1)) / 2 + (i % 2 === 0 ? -amp : amp);
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${(x0 + dx * (i + 1)).toFixed(1)} ${at(i + 1).toFixed(1)}`;
  }
  return d;
};

/** Deterministic jitter, so the folds meander instead of running in rows. */
const jitter = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Left lobe folds then right lobe folds. Every gyrus gets its own length,
 * amplitude, bow and tilt so no two run parallel.
 */
const GYRI = Array.from({ length: 24 }, (_, i) => {
  const right = i >= 12;
  const row = i % 12;
  const from = right ? 186 : 24;
  const to = right ? 362 : 176;

  const y = 38 + row * 22 + jitter(i, 1) * 16;
  const x0 = from + jitter(i, 2) * 46;
  const x1 = to - jitter(i, 3) * 52;

  return {
    d: squiggle(
      x0,
      x1,
      y,
      7 + jitter(i, 4) * 9,
      2 + Math.floor(jitter(i, 5) * 3),
      -32 + jitter(i, 6) * 64,
    ),
    tilt: -15 + jitter(i, 7) * 30,
    pivot: `${((x0 + x1) / 2).toFixed(0)} ${y.toFixed(0)}`,
  };
});

/**
 * Anatomical brain in pale pink, with dense visible gyri, a cerebellum at the
 * lower right, a short stem, a soft specular on the upper left and a shaded
 * underside.
 */
export const Brain: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * 0.82}
      viewBox="0 0 400 328"
      fill="none"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="bc-brain-body" cx="0.34" cy="0.24" r="0.88">
          <stop offset="0%" stopColor="#FBE6E4" />
          <stop offset="44%" stopColor={BRAIN_PINK} />
          <stop offset="100%" stopColor="#BC7B77" />
        </radialGradient>
        <radialGradient id="bc-brain-spec" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.78)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <clipPath id="bc-brain-clip">
          <path d={OUTLINE} />
        </clipPath>
      </defs>

      <path d={OUTLINE} fill="url(#bc-brain-body)" />

      <g clipPath="url(#bc-brain-clip)">
        {GYRI.map((gyrus, i) => (
          <g
            key={i}
            transform={`rotate(${gyrus.tilt.toFixed(1)} ${gyrus.pivot})`}
          >
            <path
              d={gyrus.d}
              stroke="#A9635F"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              d={gyrus.d}
              stroke="#F6D5D3"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
              transform="translate(0 -4.5)"
            />
          </g>
        ))}

        <path
          d="M 178 22 C 168 92, 172 178, 192 272"
          stroke="#96504C"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        <path
          d="M 238 224 C 276 202, 328 214, 344 246 C 360 280, 332 306, 294 304 C 252 302, 220 256, 238 224 Z"
          fill="#D9948F"
        />
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M ${240 + i * 3} ${238 + i * 9} C ${276 + i * 3} ${222 + i * 9}, ${314 + i} ${230 + i * 9}, ${342} ${250 + i * 7}`}
            stroke="#A9635F"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.72"
          />
        ))}

        <path
          d="M 206 266 C 214 292, 224 310, 242 320 L 208 324 C 194 310, 190 288, 194 268 Z"
          fill="#CE8985"
        />

        <ellipse
          cx="126"
          cy="82"
          rx="88"
          ry="56"
          fill="url(#bc-brain-spec)"
          opacity="0.5"
        />
        <path
          d="M 20 214 C 80 274, 200 302, 330 266 L 372 328 L 12 328 Z"
          fill="rgba(140,78,74,0.2)"
        />
      </g>

      <path
        d={OUTLINE}
        stroke="rgba(150,80,76,0.28)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};
