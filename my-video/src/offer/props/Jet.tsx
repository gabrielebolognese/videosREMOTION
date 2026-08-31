import { MoneyPaperDefs } from "./Money";

const FUSELAGE =
  "M 874 214 C 806 176, 700 158, 560 152 C 430 146, 300 148, 206 156 C 150 161, 96 166, 46 176 C 74 202, 108 226, 158 240 C 268 266, 440 268, 596 256 C 720 246, 824 232, 874 214 Z";

const WING =
  "M 494 232 C 432 266, 362 304, 314 328 L 246 336 C 296 300, 352 260, 398 226 Z";

const WINDOWS = Array.from({ length: 9 }, (_, i) => 318 + i * 44);

/**
 * A small private jet whose fuselage, wings and tail are wrapped in the same
 * pale green banknote paper as the bricks - the guilloche runs over the whole
 * airframe, and the wrap seams are the only thing that gives away that it is
 * paper rather than paint.
 */
export const Jet: React.FC<{ width: number }> = ({ width }) => {
  const id = "jet";

  return (
    <svg
      width={width}
      height={width * (430 / 900)}
      viewBox="0 0 900 430"
      fill="none"
    >
      <defs>
        <MoneyPaperDefs id={id} />
        <linearGradient id={`${id}-form`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="34%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="72%" stopColor="rgba(38,50,30,0.10)" />
          <stop offset="100%" stopColor="rgba(30,40,24,0.42)" />
        </linearGradient>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.34)" />
          <stop offset="100%" stopColor="rgba(30,40,24,0.34)" />
        </linearGradient>
        <clipPath id={`${id}-hull`}>
          <path d={FUSELAGE} />
        </clipPath>
        <clipPath id={`${id}-wing`}>
          <path d={WING} />
        </clipPath>
      </defs>

      {/* far wing, sitting behind the body */}
      <path
        d="M 470 196 C 420 172, 366 146, 330 128 L 286 132 C 328 156, 380 184, 424 204 Z"
        fill="#7E8368"
      />

      {/* vertical stabiliser and the T-tail plane */}
      <path d="M 268 150 L 176 28 L 128 34 L 196 156 Z" fill={`url(#${id}-field)`} />
      <path
        d="M 268 150 L 176 28 L 128 34 L 196 156 Z"
        fill={`url(#${id}-wave)`}
        opacity="0.75"
      />
      <path
        d="M 268 150 L 176 28 L 128 34 L 196 156 Z"
        fill={`url(#${id}-panel)`}
      />
      <path
        d="M 268 150 L 176 28 L 128 34 L 196 156 Z"
        fill="none"
        stroke="rgba(40,54,32,0.42)"
        strokeWidth="2"
      />
      <path d="M 176 30 L 58 12 L 48 28 L 166 46 Z" fill="#B6BA9C" />
      <path
        d="M 176 30 L 58 12 L 48 28 L 166 46 Z"
        fill="none"
        stroke="rgba(40,54,32,0.42)"
        strokeWidth="2"
      />

      {/* fuselage, wrapped */}
      <path d={FUSELAGE} fill={`url(#${id}-field)`} />
      <g clipPath={`url(#${id}-hull)`}>
        <rect x="0" y="0" width="900" height="430" fill={`url(#${id}-wave)`} />
        <rect
          x="0"
          y="0"
          width="900"
          height="430"
          fill={`url(#${id}-hatch)`}
          opacity="0.55"
        />
        {/* the printed portrait oval, wrapping over the flank */}
        <ellipse cx="672" cy="204" rx="52" ry="40" fill="rgba(74,92,60,0.4)" />
        <ellipse
          cx="672"
          cy="204"
          rx="52"
          ry="40"
          fill="none"
          stroke="rgba(48,66,40,0.4)"
          strokeWidth="2"
        />
        <text
          x="330"
          y="228"
          fill="rgba(40,58,34,0.68)"
          fontFamily="Poppins"
          fontWeight="800"
          fontSize="36"
          textAnchor="middle"
        >
          100
        </text>
        {/* paper wrap seams */}
        <path
          d="M 452 140 C 458 190, 458 226, 448 278"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="2.4"
          fill="none"
        />
        <path
          d="M 246 148 C 252 194, 252 224, 244 268"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 744 152 C 750 192, 750 220, 742 258"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth="2"
          fill="none"
        />
        <rect x="0" y="0" width="900" height="430" fill={`url(#${id}-form)`} />
      </g>
      <path
        d={FUSELAGE}
        fill="none"
        stroke="rgba(40,54,32,0.48)"
        strokeWidth="2.2"
      />

      {/* cabin windows and cockpit glass */}
      {WINDOWS.map((x) => (
        <rect
          key={x}
          x={x}
          y="182"
          width="19"
          height="15"
          rx="6"
          fill="#2E3A28"
          opacity="0.62"
        />
      ))}
      <path
        d="M 780 186 C 802 180, 826 186, 838 196 L 792 206 Z"
        fill="#2E3A28"
        opacity="0.72"
      />

      {/* rear mounted engine with its pylon */}
      <path d="M 352 190 L 400 182 L 402 202 L 354 208 Z" fill="#7E8368" />
      <rect
        x="236"
        y="170"
        width="132"
        height="52"
        rx="26"
        fill={`url(#${id}-field)`}
      />
      <rect
        x="236"
        y="170"
        width="132"
        height="52"
        rx="26"
        fill={`url(#${id}-panel)`}
      />
      <rect
        x="236"
        y="170"
        width="132"
        height="52"
        rx="26"
        fill="none"
        stroke="rgba(40,54,32,0.45)"
        strokeWidth="2"
      />
      <ellipse cx="248" cy="196" rx="11" ry="24" fill="#2A3324" opacity="0.8" />

      {/* near wing */}
      <path d={WING} fill={`url(#${id}-field)`} />
      <g clipPath={`url(#${id}-wing)`}>
        <rect x="0" y="0" width="900" height="430" fill={`url(#${id}-wave)`} opacity="0.7" />
        <rect x="0" y="0" width="900" height="430" fill={`url(#${id}-panel)`} />
      </g>
      <path d={WING} fill="none" stroke="rgba(40,54,32,0.45)" strokeWidth="2" />
      <path
        d="M 314 328 L 300 356 L 262 350 L 246 336 Z"
        fill="#9DA184"
        stroke="rgba(40,54,32,0.45)"
        strokeWidth="2"
      />

      {/* top highlight, the light source is broad and above */}
      <path
        d="M 852 208 C 780 176, 660 160, 540 156 C 420 152, 300 154, 214 162"
        stroke="rgba(255,255,255,0.72)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
