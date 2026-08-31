/**
 * The muscle itself.
 *
 * Three things stop this reading as a valentine, or worse, a leaf: the top is
 * one continuous dome with no cleft, the apex is blunt and hangs left of the
 * vertical axis, and the flanks are different shapes from each other.
 */
const MASS =
  "M 256 176 C 350 170, 430 214, 450 296 C 468 368, 442 438, 390 490 C 350 530, 298 562, 254 578 C 236 584, 218 578, 208 564 C 166 516, 118 448, 98 378 C 76 302, 112 214, 192 184 C 212 178, 234 176, 256 176 Z";

/**
 * A glossy crimson anatomical heart: ventricle mass, aortic arch, pulmonary
 * trunk and vena cava standing clear of the top, the coronary tree tracked
 * asymmetrically down the front, and wet highlights on the form.
 */
export const Heart: React.FC<{ width: number; glow?: boolean }> = ({
  width,
  glow = false,
}) => {
  const id = "heart";

  return (
    <svg
      width={width}
      height={width * (640 / 520)}
      viewBox="0 0 520 640"
      fill="none"
    >
      <defs>
        <radialGradient id={`${id}-flesh`} cx="0.34" cy="0.26" r="0.88">
          <stop offset="0%" stopColor="#E4515A" />
          <stop offset="32%" stopColor="#C42430" />
          <stop offset="72%" stopColor="#98131E" />
          <stop offset="100%" stopColor="#640B13" />
        </radialGradient>
        <linearGradient id={`${id}-artery`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#DE8478" />
          <stop offset="52%" stopColor="#BC4B44" />
          <stop offset="100%" stopColor="#8E2422" />
        </linearGradient>
        <linearGradient id={`${id}-vein`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#A87C90" />
          <stop offset="100%" stopColor="#5F2F49" />
        </linearGradient>
        <radialGradient id={`${id}-gloss`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <clipPath id={`${id}-mass`}>
          <path d={MASS} />
        </clipPath>
        {glow ? (
          <filter id={`${id}-rim`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        ) : null}
      </defs>

      {glow ? (
        <g filter={`url(#${id}-rim)`} opacity="0.5">
          <path d={MASS} fill="#FF6A63" />
        </g>
      ) : null}

      {/*
        The great vessels stand well clear of the top of the muscle - the
        moment they are tucked behind it the whole thing turns into a heart
        symbol. Drawn as heavy round-capped strokes, so they read as tubes.
      */}
      <path
        d="M 148 250 C 130 194, 126 148, 136 104"
        stroke={`url(#${id}-vein)`}
        strokeWidth="44"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 206 224 C 192 156, 198 104, 228 66"
        stroke="#B23A38"
        strokeWidth="54"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 262 214 C 266 132, 302 78, 358 84 C 406 90, 430 132, 432 190"
        stroke={`url(#${id}-artery)`}
        strokeWidth="58"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 262 214 C 266 132, 302 78, 358 84 C 406 90, 430 132, 432 190"
        stroke="rgba(255,178,168,0.4)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        transform="translate(-14 -8)"
      />
      <path
        d="M 372 152 C 402 126, 442 128, 464 152"
        stroke={`url(#${id}-vein)`}
        strokeWidth="32"
        strokeLinecap="round"
        fill="none"
      />

      <path d={MASS} fill={`url(#${id}-flesh)`} />

      <g clipPath={`url(#${id}-mass)`}>
        {/* right atrium, lifted a shade off the ventricle mass */}
        <path
          d="M 104 268 C 148 210, 224 190, 274 216 C 254 274, 186 302, 122 296 Z"
          fill="#A81823"
          opacity="0.5"
        />
        {/* the atrial appendage lobe on the far side */}
        <path
          d="M 380 208 C 418 224, 436 262, 422 296 C 390 288, 362 262, 358 228 Z"
          fill="#8E1019"
          opacity="0.45"
        />
        {/* the left ventricle mass, a shade heavier than the right */}
        <path
          d="M 322 214 C 400 244, 444 316, 428 388 C 414 452, 356 518, 286 552 C 316 470, 330 372, 322 214 Z"
          fill="#7E0D16"
          opacity="0.32"
        />
        {/* coronary sulcus - the groove that divides atria from ventricles */}
        <path
          d="M 108 286 C 190 344, 320 344, 424 282"
          stroke="#78101A"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/*
          Few vessels, drawn heavy. A dense web of thin branches off a central
          spine stops reading as a coronary tree and starts reading as leaf
          venation, so there are two trunks here and three branches, no more.
        */}
        <path
          d="M 326 216 C 306 300, 278 396, 254 476 C 242 518, 234 548, 232 566"
          stroke="#7A0E17"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 306 288 C 344 314, 376 348, 396 388"
          stroke="#7A0E17"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 274 400 C 306 428, 328 460, 340 494"
          stroke="#7A0E17"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 282 220 C 208 240, 148 288, 122 356 C 110 392, 112 428, 128 460"
          stroke="#7A0E17"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 326 216 C 306 300, 278 396, 254 476"
          stroke="rgba(255,146,138,0.34)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          transform="translate(-6 -4)"
        />

        {/* wet highlights */}
        <ellipse
          cx="184"
          cy="322"
          rx="76"
          ry="48"
          fill={`url(#${id}-gloss)`}
          opacity="0.5"
          transform="rotate(-34 184 322)"
        />
        <ellipse
          cx="398"
          cy="316"
          rx="28"
          ry="58"
          fill={`url(#${id}-gloss)`}
          opacity="0.3"
          transform="rotate(16 398 316)"
        />
        <ellipse
          cx="300"
          cy="500"
          rx="26"
          ry="46"
          fill={`url(#${id}-gloss)`}
          opacity="0.18"
          transform="rotate(-26 300 500)"
        />
      </g>

      <path d={MASS} fill="none" stroke="rgba(72,7,13,0.5)" strokeWidth="3" />
    </svg>
  );
};
