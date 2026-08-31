const OUTLINE =
  "M 196 96 C 250 62, 330 62, 376 100 C 424 106, 452 148, 442 194 C 458 232, 444 278, 408 298 C 396 336, 352 356, 306 344 C 268 366, 214 360, 190 330 C 142 332, 106 300, 106 260 C 76 236, 72 186, 100 158 C 100 118, 144 92, 196 96 Z";

/** The folds, laid on in two passes so the surface reads as gyri, not stripes. */
const FOLDS = [
  "M 158 124 C 192 134, 200 166, 174 180 C 150 192, 154 220, 180 228",
  "M 216 98 C 250 110, 256 144, 230 158 C 206 170, 212 198, 238 208",
  "M 282 92 C 316 104, 322 138, 296 152 C 272 164, 278 192, 304 202",
  "M 346 104 C 380 118, 384 152, 358 166 C 334 178, 340 206, 366 216",
  "M 402 140 C 428 154, 430 182, 408 194 C 390 204, 392 224, 410 232",
  "M 120 182 C 150 192, 156 218, 132 232 C 114 242, 116 262, 134 270",
  "M 192 250 C 224 262, 228 290, 204 302 C 186 312, 188 330, 204 338",
  "M 256 274 C 288 286, 292 312, 268 324",
  "M 322 250 C 352 262, 356 288, 334 300",
];

/**
 * A glossy anatomical brain in soft pink, with a visible cerebellum and a
 * brainstem, lit by the same broad top-front key as everything else.
 *
 * The gloss is two soft highlights rather than a hard specular - the brief
 * allows speculars only on the glossy props, and only gentle ones.
 */
export const Brain: React.FC<{ width: number }> = ({ width }) => (
  <svg
    width={width}
    height={width * (400 / 500)}
    viewBox="0 0 500 400"
    fill="none"
  >
    <defs>
      <radialGradient id="brain-flesh" cx="0.36" cy="0.28" r="0.84">
        <stop offset="0%" stopColor="#FBD9D4" />
        <stop offset="46%" stopColor="#F0B2AC" />
        <stop offset="100%" stopColor="#CE8880" />
      </radialGradient>
      <radialGradient id="brain-gloss" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <clipPath id="brain-clip">
        <path d={OUTLINE} />
      </clipPath>
    </defs>

    {/* brainstem, tucked under the mass */}
    <path
      d="M 268 330 C 272 356, 266 378, 246 390 L 214 372 C 232 360, 238 344, 234 322 Z"
      fill="#D89A92"
    />
    {/* cerebellum */}
    <path
      d="M 190 300 C 152 300, 128 322, 132 348 C 136 374, 172 388, 212 380 C 246 372, 262 348, 252 324 C 244 306, 220 300, 190 300 Z"
      fill="#DE9A93"
    />
    <path
      d="M 142 320 C 172 318, 214 322, 244 334 M 138 338 C 170 336, 214 340, 246 352 M 144 356 C 174 354, 208 358, 232 368"
      stroke="rgba(150,86,80,0.45)"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />

    <path d={OUTLINE} fill="url(#brain-flesh)" />
    <g clipPath="url(#brain-clip)">
      {FOLDS.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="rgba(158,92,86,0.42)"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {FOLDS.map((d, i) => (
        <path
          key={`hi-${i}`}
          d={d}
          stroke="rgba(255,232,228,0.5)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          transform="translate(-5 -6)"
        />
      ))}
      {/* the longitudinal fissure */}
      <path
        d="M 268 74 C 258 138, 276 214, 262 296"
        stroke="rgba(150,86,80,0.34)"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="196"
        cy="146"
        rx="96"
        ry="54"
        fill="url(#brain-gloss)"
        opacity="0.5"
        transform="rotate(-18 196 146)"
      />
      <ellipse
        cx="388"
        cy="204"
        rx="34"
        ry="62"
        fill="url(#brain-gloss)"
        opacity="0.3"
        transform="rotate(14 388 204)"
      />
    </g>
    <path
      d={OUTLINE}
      fill="none"
      stroke="rgba(150,86,80,0.34)"
      strokeWidth="3"
    />
  </svg>
);
