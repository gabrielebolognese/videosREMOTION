/**
 * A crowded transit concourse from a high angle, graded deep teal and cyan.
 *
 * Every commuter is drawn as a smeared trail with a denser head, so the crowd
 * reads as a long exposure; the one figure who is not moving is the only sharp
 * thing in the frame, which is the whole point of the shot.
 */

const CROWD = [
  [92, 402, 62, -14, 0.5],
  [176, 372, 78, 9, 0.42],
  [268, 420, 54, -6, 0.55],
  [352, 386, 86, 12, 0.4],
  [446, 414, 66, -10, 0.5],
  [124, 470, 92, 7, 0.46],
  [232, 492, 70, -12, 0.52],
  [330, 470, 96, 10, 0.44],
  [432, 500, 58, -8, 0.5],
  [70, 546, 104, 8, 0.42],
  [180, 566, 76, -9, 0.48],
  [286, 552, 110, 11, 0.4],
  [400, 578, 82, -7, 0.46],
  [500, 548, 68, 9, 0.44],
  [140, 640, 122, -10, 0.38],
  [420, 648, 116, 9, 0.38],
  [206, 336, 48, 6, 0.34],
  [312, 330, 56, -7, 0.32],
  [402, 342, 44, 8, 0.3],
  [150, 322, 40, -5, 0.3],
  [488, 356, 50, 7, 0.32],
  [58, 372, 44, 9, 0.3],
] as const;

export const Transit: React.FC<{ lift?: number }> = ({ lift = 0 }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 800" fill="none">
      <defs>
        <linearGradient id="tr-floor" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#12454F" />
          <stop offset="46%" stopColor="#1B6472" />
          <stop offset="100%" stopColor="#2A8896" />
        </linearGradient>
        <radialGradient id="tr-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(126,224,232,0.42)" />
          <stop offset="100%" stopColor="rgba(126,224,232,0)" />
        </radialGradient>
        <filter id="tr-smear" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5 2.5" />
        </filter>
        <filter id="tr-roofblur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <rect x="0" y="0" width="600" height="800" fill="#0B3038" />
      {/* the concourse floor, running away up the frame */}
      <path d="M -40 800 L 640 800 L 470 286 L 130 286 Z" fill="url(#tr-floor)" />
      {[
        [130, 286, -40, 800],
        [215, 286, 130, 800],
        [300, 286, 300, 800],
        [385, 286, 470, 800],
        [470, 286, 640, 800],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(160,226,232,0.14)"
          strokeWidth="2"
        />
      ))}
      {/* pools of overhead light on the floor */}
      {[
        [220, 420, 130],
        [400, 520, 160],
        [300, 690, 200],
      ].map(([cx, cy, r], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.42} fill="url(#tr-pool)" />
      ))}

      {/* overhead structure */}
      <g filter="url(#tr-roofblur)">
        <rect x="-40" y="-20" width="680" height="200" fill="#082830" />
        <path d="M -40 180 L 640 180 L 470 286 L 130 286 Z" fill="#0A3039" />
        {[40, 120, 200, 280, 360, 440, 520].map((x) => (
          <rect key={x} x={x} y="0" width="18" height="180" fill="#0D3B45" />
        ))}
        {[100, 300, 500].map((x) => (
          <ellipse key={x} cx={x} cy="150" rx="52" ry="10" fill="#9FE6EC" opacity="0.5" />
        ))}
      </g>

      {/* the crowd, every one of them smeared along their direction of travel */}
      <g filter="url(#tr-smear)">
        {CROWD.map(([x, y, len, angle, op], i) => (
          <g key={i} transform={`rotate(${angle} ${x} ${y})`} opacity={op}>
            <rect
              x={x - len}
              y={y - 9}
              width={len}
              height="18"
              rx="9"
              fill="#062028"
            />
            <ellipse cx={x} cy={y - 2} rx="13" ry="17" fill="#04181E" />
            <circle cx={x} cy={y - 20} r="8" fill="#04181E" />
          </g>
        ))}
      </g>

      {/* the one who is standing still */}
      <g
        style={{
          // brightening across the shot, as the exposure comes up
          opacity: 1,
        }}
      >
        <ellipse cx="300" cy="754" rx="40" ry="11" fill="rgba(2,16,20,0.55)" />
        {/* legs first, so the coat hangs over them */}
        <path d="M 284 660 L 296 660 L 294 748 L 280 748 Z" fill="#04161C" />
        <path d="M 304 660 L 316 660 L 320 748 L 306 748 Z" fill="#04161C" />
        <path d="M 272 744 L 296 744 L 296 756 L 270 756 Z" fill="#020E12" />
        <path d="M 304 744 L 328 744 L 330 756 L 304 756 Z" fill="#020E12" />
        {/* long dark coat, narrow through the shoulders */}
        <path
          d="M 300 564 C 282 564, 272 576, 270 596 L 264 682 C 263 694, 268 700, 278 700 L 322 700 C 332 700, 337 694, 336 682 L 330 596 C 328 576, 318 564, 300 564 Z"
          fill="#08222A"
        />
        <path
          d="M 272 594 C 264 606, 260 634, 260 664 L 272 666 C 273 638, 276 614, 282 602 Z"
          fill="#061C24"
        />
        <path
          d="M 328 594 C 336 606, 340 634, 340 664 L 328 666 C 327 638, 324 614, 318 602 Z"
          fill="#061C24"
        />
        <path d="M 292 566 L 300 620 L 308 566 Z" fill="#0C2E38" />
        <rect x="292" y="546" width="16" height="22" fill="#0A2830" />
        <circle cx="300" cy="530" r="21" fill="#0A2830" />
      </g>

      {/* the exposure lifting across the shot */}
      <rect
        x="0"
        y="0"
        width="600"
        height="800"
        fill="#8FE3EA"
        opacity={0.05 + lift * 0.13}
      />
      <rect
        x="0"
        y="0"
        width="600"
        height="800"
        fill="url(#tr-vig)"
      />
      <defs>
        <radialGradient id="tr-vig" cx="0.5" cy="0.46" r="0.72">
          <stop offset="52%" stopColor="rgba(3,20,25,0)" />
          <stop offset="100%" stopColor="rgba(3,20,25,0.62)" />
        </radialGradient>
      </defs>
    </svg>
  );
};
