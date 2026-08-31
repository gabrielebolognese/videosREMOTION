/**
 * A solid black faceless silhouette of a man in a fitted suit: white shirt
 * collar, dark tie, hands in pockets, feet apart.
 *
 * Everything except the collar is one value of black; the shape has to carry
 * the read, so the shoulders are square, the jacket is nipped at the waist and
 * the forearms angle into the hip pockets rather than hanging.
 */
export const Silhouette: React.FC<{ width: number }> = ({ width }) => {
  const id = "figure";

  return (
    <svg
      width={width}
      height={width * (940 / 420)}
      viewBox="0 0 420 940"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-cloth`} x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#141414" />
          <stop offset="55%" stopColor="#0A0A0A" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>

      {/* head and neck */}
      <path d="M 186 128 L 234 128 L 236 186 L 184 186 Z" fill="#0A0A0A" />
      <ellipse cx="210" cy="84" rx="58" ry="70" fill={`url(#${id}-cloth)`} />

      {/* white shirt behind the lapels */}
      <path d="M 172 156 L 248 156 L 244 268 L 210 300 L 176 268 Z" fill="#F6F6F4" />
      {/* collar points */}
      <path d="M 172 154 L 214 176 L 190 216 Z" fill="#FFFFFF" />
      <path d="M 248 154 L 206 176 L 230 216 Z" fill="#FFFFFF" />
      {/* tie */}
      <path
        d="M 210 174 L 226 190 L 220 200 L 232 292 L 210 314 L 188 292 L 200 200 L 194 190 Z"
        fill="#1B1B1F"
      />
      <path
        d="M 210 174 L 226 190 L 220 200 L 232 292 L 210 314 L 188 292 L 200 200 L 194 190 Z"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="2"
      />

      {/* jacket: square shoulders, nipped waist, arms folded into the body */}
      <path
        d="M 188 150
           C 148 154, 116 168, 96 190
           C 70 220, 58 268, 54 322
           L 44 452
           C 40 496, 48 528, 62 552
           L 96 540
           C 96 478, 100 430, 108 396
           L 112 560
           L 308 560
           L 312 396
           C 320 430, 324 478, 324 540
           L 358 552
           C 372 528, 380 496, 376 452
           L 366 322
           C 362 268, 350 220, 324 190
           C 304 168, 272 154, 232 150
           L 210 308 Z"
        fill={`url(#${id}-cloth)`}
      />
      {/* lapel break, cut just deep enough to read against the shirt */}
      <path
        d="M 188 150 L 210 308 L 186 372 L 150 196 Z"
        fill="#111111"
      />
      <path
        d="M 232 150 L 210 308 L 234 372 L 270 196 Z"
        fill="#111111"
      />

      {/* hands going into the hip pockets */}
      <path
        d="M 62 486 C 78 470, 100 462, 118 468 L 120 508 C 100 514, 78 512, 62 502 Z"
        fill="#050505"
      />
      <path
        d="M 358 486 C 342 470, 320 462, 302 468 L 300 508 C 320 514, 342 512, 358 502 Z"
        fill="#050505"
      />
      <path
        d="M 100 470 L 128 462 M 292 462 L 320 470"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="3"
      />

      {/* trousers, feet apart */}
      <path
        d="M 114 552 L 202 552 L 196 760 L 178 892 L 106 892 L 116 760 Z"
        fill={`url(#${id}-cloth)`}
      />
      <path
        d="M 218 552 L 306 552 L 304 760 L 314 892 L 242 892 L 224 760 Z"
        fill={`url(#${id}-cloth)`}
      />
      <path
        d="M 210 556 L 210 620"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="4"
      />

      {/* shoes */}
      <path
        d="M 106 886 L 178 886 L 182 912 C 182 924, 172 930, 152 930 L 84 930 C 74 930, 70 922, 76 914 Z"
        fill="#000000"
      />
      <path
        d="M 242 886 L 314 886 L 344 914 C 350 922, 346 930, 336 930 L 268 930 C 248 930, 238 924, 238 912 Z"
        fill="#000000"
      />
    </svg>
  );
};
