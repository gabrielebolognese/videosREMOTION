import { Badge } from "./Badge";

const BODY =
  "M 34 96 L 266 96 L 240 424 C 238 444, 224 454, 206 454 L 94 454 C 76 454, 62 444, 60 424 Z";

const MICROPRINT = [0, 1, 2, 3, 4, 5, 6];

/**
 * The hero object: a tall matte white reusable takeaway cup with a snap-on
 * lid and a slight taper.
 *
 * Soft touch plastic takes no hard specular, so the form is carried entirely
 * by a broad falloff across the body and a single soft edge light down the
 * left flank, matching the key.
 */
export const Cup: React.FC<{ width: number; badge?: boolean }> = ({
  width,
  badge = true,
}) => {
  const id = "cup";

  return (
    <svg
      width={width}
      height={width * (500 / 300)}
      viewBox="0 0 300 500"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0%" stopColor="#E4E7E4" />
          <stop offset="14%" stopColor="#FBFBFA" />
          <stop offset="52%" stopColor="#F6F6F6" />
          <stop offset="84%" stopColor="#E2E6E3" />
          <stop offset="100%" stopColor="#CFD6D1" />
        </linearGradient>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#E8ECE9" />
          <stop offset="20%" stopColor="#FCFCFB" />
          <stop offset="70%" stopColor="#EFF1EF" />
          <stop offset="100%" stopColor="#D2D9D4" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(120,138,128,0.10)" />
          <stop offset="42%" stopColor="rgba(120,138,128,0)" />
          <stop offset="100%" stopColor="rgba(96,112,104,0.22)" />
        </linearGradient>
        <clipPath id={`${id}-body-clip`}>
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* body */}
      <path d={BODY} fill={`url(#${id}-body)`} />
      <g clipPath={`url(#${id}-body-clip)`}>
        <rect x="0" y="0" width="300" height="500" fill={`url(#${id}-shade)`} />
        {/* soft edge light down the key side */}
        <path
          d="M 44 104 L 70 440"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        {/* the far flank falls away into shadow */}
        <path
          d="M 252 108 L 228 438"
          stroke="rgba(112,128,120,0.16)"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* snap on lid: rim, then a low dome with a sip opening */}
      <path
        d="M 24 62 L 276 62 L 272 92 C 272 100, 264 104, 254 104 L 46 104 C 36 104, 28 100, 28 92 Z"
        fill={`url(#${id}-lid)`}
      />
      <path
        d="M 40 34 C 40 24, 52 18, 68 18 L 232 18 C 248 18, 260 24, 260 34 L 276 62 L 24 62 Z"
        fill={`url(#${id}-lid)`}
      />
      <ellipse cx="150" cy="20" rx="110" ry="12" fill="#F4F6F4" />
      <ellipse cx="150" cy="20" rx="110" ry="12" fill="none" stroke="rgba(120,138,128,0.22)" strokeWidth="1.6" />
      <ellipse cx="196" cy="21" rx="26" ry="7" fill="#C9D2CC" />
      <path
        d="M 24 62 L 276 62"
        stroke="rgba(120,138,128,0.26)"
        strokeWidth="2"
      />
      <path
        d="M 46 26 C 44 40, 42 52, 42 62"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />

      {badge ? (
        <g transform="translate(94 214)">
          <Badge size={112} />
        </g>
      ) : null}

      {/* pale green micro print near the base, illegible by design */}
      {badge
        ? MICROPRINT.map((i) => (
            <rect
              key={i}
              x={112 + i * 12}
              y="404"
              width={i % 3 === 0 ? 9 : 6}
              height="4"
              rx="2"
              fill="rgba(10,107,61,0.34)"
            />
          ))
        : null}

      <path
        d={BODY}
        fill="none"
        stroke="rgba(120,138,128,0.28)"
        strokeWidth="1.8"
      />
    </svg>
  );
};
