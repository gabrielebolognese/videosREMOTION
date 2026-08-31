import { NAVY } from "../lib/tokens";

/**
 * The mark that stands in for the brand: an abstract calligraphic flourish in
 * the Arabic manner - one loaded downstroke, a long horizontal sweep and two
 * floating points. It is deliberately not script and spells nothing; it only
 * has to read as "a logo somebody paid for" at 60 pixels wide.
 */
export const CalligraphicMark: React.FC<{
  width: number;
  colour?: string;
  opacity?: number;
}> = ({ width, colour = "#FFFFFF", opacity = 1 }) => (
  <svg
    width={width}
    height={width * (120 / 200)}
    viewBox="0 0 200 120"
    fill="none"
    style={{ opacity }}
  >
    {/* the long sweep, thick in the belly and tapering out to the left */}
    <path
      d="M 12 78 C 34 96, 74 102, 110 92 C 142 84, 162 62, 158 42
         C 155 27, 140 20, 127 27 C 116 33, 113 47, 122 55
         C 130 62, 143 60, 148 51"
      stroke={colour}
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
    />
    {/* the downstroke that crosses it */}
    <path
      d="M 72 22 C 78 44, 80 66, 76 92"
      stroke={colour}
      strokeWidth="9"
      strokeLinecap="round"
      fill="none"
    />
    {/* the tail, thinning as it leaves */}
    <path
      d="M 150 84 C 166 88, 180 86, 190 78"
      stroke={colour}
      strokeWidth="5.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="44" cy="40" r="6.5" fill={colour} />
    <circle cx="103" cy="16" r="5" fill={colour} />
  </svg>
);

/**
 * The navy oversized cotton tee, front on: dropped shoulders, wide short
 * sleeves, a ribbed crew collar with the woven label showing through it, and
 * the calligraphic mark small on the chest.
 */
export const Tee: React.FC<{ width: number }> = ({ width }) => {
  const id = "tee";

  return (
    <svg
      width={width}
      height={width * (620 / 600)}
      viewBox="0 0 600 620"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-cotton`} x1="0.14" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#3C4A66" />
          <stop offset="42%" stopColor={NAVY} />
          <stop offset="100%" stopColor="#1A2334" />
        </linearGradient>
      </defs>

      {/* body, dropped shoulders, both sleeves */}
      <path
        d="M 232 62
           C 200 66, 150 82, 112 106
           L 44 206
           C 36 220, 40 234, 54 242
           L 128 286
           C 140 292, 152 288, 156 276
           L 176 224
           L 176 560
           L 424 560
           L 424 224
           L 444 276
           C 448 288, 460 292, 472 286
           L 546 242
           C 560 234, 564 220, 556 206
           L 488 106
           C 450 82, 400 66, 368 62
           C 356 96, 330 116, 300 116
           C 270 116, 244 96, 232 62 Z"
        fill={`url(#${id}-cotton)`}
      />

      {/* the ribbed collar */}
      <path
        d="M 232 62 C 244 96, 270 116, 300 116 C 330 116, 356 96, 368 62
           C 356 52, 330 46, 300 46 C 270 46, 244 52, 232 62 Z"
        fill="#2E3C58"
      />
      <path
        d="M 240 66 C 252 96, 274 112, 300 112 C 326 112, 348 96, 360 66"
        stroke="rgba(12,18,30,0.55)"
        strokeWidth="5"
        fill="none"
      />
      {/* the woven neck label, seen through the collar opening */}
      <path d="M 282 50 L 320 50 L 320 74 L 282 74 Z" fill="#E8E2D4" />
      <path
        d="M 288 58 L 314 58 M 288 66 L 308 66"
        stroke="rgba(60,74,102,0.65)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* sleeve hems and the bottom hem, stitched */}
      <path
        d="M 132 282 L 160 226 M 468 282 L 440 226"
        stroke="rgba(12,18,30,0.45)"
        strokeWidth="6"
      />
      <path
        d="M 176 536 L 424 536"
        stroke="rgba(12,18,30,0.45)"
        strokeWidth="5"
      />
      <path
        d="M 176 546 L 424 546"
        stroke="rgba(120,140,180,0.20)"
        strokeWidth="2.5"
        strokeDasharray="9 8"
      />

      {/* the way an oversized tee actually hangs: soft vertical breaks */}
      <path
        d="M 214 190 C 208 290, 206 410, 210 530
           M 300 168 C 298 300, 298 420, 300 532
           M 386 190 C 392 290, 394 410, 390 530"
        stroke="rgba(12,18,30,0.22)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 250 200 C 246 300, 246 420, 250 528"
        stroke="rgba(150,172,214,0.16)"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* daylight from the upper left, caught on the near shoulder */}
      <path
        d="M 150 116 C 180 92, 214 76, 240 70 L 250 108 C 224 116, 194 132, 172 152 Z"
        fill="rgba(190,206,236,0.18)"
      />

      <g style={{ translate: "232px 250px" }}>
        <CalligraphicMark width={136} opacity={0.94} />
      </g>
    </svg>
  );
};

/**
 * The pale sky-textured panel the tee is pinned against - a flat rectangle of
 * washed blue with two soft cloud banks, torn along the bottom edge so it
 * reads as a piece of a photograph rather than a drawn box.
 */
export const SkyPanel: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const id = "sky";

  return (
    <svg width={width} height={height} viewBox="0 0 520 640" fill="none">
      <defs>
        <linearGradient id={`${id}-air`} x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#B7D5EA" />
          <stop offset="55%" stopColor="#CDE3F1" />
          <stop offset="100%" stopColor="#E3EEF5" />
        </linearGradient>
      </defs>
      <path
        d="M 0 0 L 520 0 L 520 596 L 452 620 L 372 600 L 288 626 L 196 602
           L 108 624 L 30 604 L 0 622 Z"
        fill={`url(#${id}-air)`}
      />
      <ellipse cx="150" cy="190" rx="130" ry="52" fill="rgba(255,255,255,0.62)" />
      <ellipse cx="248" cy="168" rx="92" ry="40" fill="rgba(255,255,255,0.52)" />
      <ellipse cx="392" cy="356" rx="118" ry="44" fill="rgba(255,255,255,0.44)" />
      <ellipse cx="96" cy="452" rx="104" ry="36" fill="rgba(255,255,255,0.32)" />
    </svg>
  );
};
