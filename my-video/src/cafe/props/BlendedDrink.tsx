import { Badge } from "./Badge";

export type Flavour = "caramel" | "chocolate" | "matcha";

const DRINK: Record<Flavour, [string, string, string]> = {
  // base, shade, the crumb topping
  caramel: ["#D3AC7E", "#B98D5D", "#8F6337"],
  chocolate: ["#7E5741", "#5E3C2B", "#3E251A"],
  matcha: ["#A9C08A", "#87A268", "#5C7443"],
};

const CUP_BODY =
  "M 26 140 L 214 140 L 192 352 C 190 368, 178 376, 164 376 L 76 376 C 62 376, 50 368, 48 352 Z";

/**
 * A clear plastic blended-drink cup: swirled cream, dark drizzle, crumb, a
 * straight matte green straw and the same roundel on the front.
 *
 * The plastic reads as clear because the drink inside is inset from the cup
 * wall and the wall itself carries only a pale edge - no fill of its own.
 */
export const BlendedDrink: React.FC<{ width: number; flavour: Flavour }> = ({
  width,
  flavour,
}) => {
  const id = `drink-${flavour}`;
  const [base, shade, crumb] = DRINK[flavour];

  return (
    <svg
      width={width}
      height={width * (400 / 240)}
      viewBox="0 0 240 400"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-liquid`} x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor={shade} />
          <stop offset="26%" stopColor={base} />
          <stop offset="72%" stopColor={base} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <linearGradient id={`${id}-cream`} x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="52%" stopColor="#F6F1E7" />
          <stop offset="100%" stopColor="#DED5C6" />
        </linearGradient>
        <linearGradient id={`${id}-straw`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2F7A4C" />
          <stop offset="42%" stopColor="#4E9C68" />
          <stop offset="100%" stopColor="#255F3B" />
        </linearGradient>
        <clipPath id={`${id}-cup`}>
          <path d={CUP_BODY} />
        </clipPath>
      </defs>

      {/* straw, standing straight up out of the cream */}
      <rect x="150" y="18" width="17" height="150" rx="4" fill={`url(#${id}-straw)`} />
      <rect x="152" y="20" width="4" height="146" rx="2" fill="rgba(255,255,255,0.28)" />

      {/* the drink, inset from the cup wall so the plastic reads as clear */}
      <g clipPath={`url(#${id}-cup)`}>
        <path d={CUP_BODY} fill={`url(#${id}-liquid)`} transform="translate(0 6)" />
        <path
          d="M 40 260 C 80 250, 160 250, 200 260 L 200 400 L 40 400 Z"
          fill={shade}
          opacity="0.45"
        />
        {/* blended texture: a few paler streaks through the body */}
        <path
          d="M 62 200 C 96 192, 148 194, 182 202 M 58 240 C 92 232, 150 234, 186 242 M 66 300 C 98 294, 146 296, 178 302"
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 44 156 L 62 372"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* the clear wall */}
      <path
        d={CUP_BODY}
        fill="rgba(255,255,255,0.10)"
        stroke="rgba(255,255,255,0.62)"
        strokeWidth="3"
      />
      <path
        d="M 214 140 L 192 352"
        stroke="rgba(120,138,128,0.28)"
        strokeWidth="3"
        fill="none"
      />

      {/* swirled cream, three turns getting smaller */}
      <path
        d="M 22 140 C 22 118, 60 104, 120 104 C 180 104, 218 118, 218 140 C 218 154, 180 162, 120 162 C 60 162, 22 154, 22 140 Z"
        fill={`url(#${id}-cream)`}
      />
      <path
        d="M 44 110 C 44 92, 76 80, 120 80 C 164 80, 196 92, 196 110 C 196 122, 164 130, 120 130 C 76 130, 44 122, 44 110 Z"
        fill={`url(#${id}-cream)`}
      />
      <path
        d="M 66 82 C 66 66, 90 56, 120 56 C 150 56, 174 66, 174 82 C 174 92, 150 98, 120 98 C 90 98, 66 92, 66 82 Z"
        fill={`url(#${id}-cream)`}
      />
      <path
        d="M 92 58 C 92 46, 104 38, 120 38 C 136 38, 148 46, 148 58 C 148 66, 136 70, 120 70 C 104 70, 92 66, 92 58 Z"
        fill={`url(#${id}-cream)`}
      />
      <ellipse cx="120" cy="40" rx="16" ry="8" fill="#FFFFFF" />
      {/* the shadowed underside of each turn */}
      <path
        d="M 30 148 C 62 160, 178 160, 210 148 M 52 118 C 80 128, 160 128, 188 118 M 74 88 C 94 96, 146 96, 166 88"
        stroke="rgba(176,164,148,0.42)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* dark drizzle over the cream */}
      <path
        d="M 40 132 C 60 116, 76 138, 96 120 C 114 104, 130 126, 150 110 C 168 96, 186 116, 202 104"
        stroke={crumb}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M 74 88 C 90 76, 104 92, 120 80 C 136 68, 152 84, 166 74"
        stroke={crumb}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* crumb topping */}
      {[
        [86, 62],
        [112, 52],
        [138, 62],
        [70, 92],
        [156, 96],
        [104, 100],
        [128, 96],
        [56, 126],
        [178, 122],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 5 : 3.6} fill={crumb} />
      ))}

      <g transform="translate(92 236)">
        <Badge size={58} />
      </g>
    </svg>
  );
};
