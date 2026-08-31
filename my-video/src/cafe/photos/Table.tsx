import { Badge } from "../props/Badge";

const SEEDS = [
  [286, 402],
  [302, 394],
  [318, 404],
  [334, 396],
  [294, 414],
  [326, 416],
  [310, 408],
] as const;

/**
 * An eye-level table shot inside a warm wooden café: two hands typing on a
 * silver laptop, an iced latte, a seeded bagel, a phone on a charging cable,
 * under an exposed timber ceiling with warm track lights.
 */
export const Table: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 800" fill="none">
      <defs>
        <linearGradient id="tb-room" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#8A6A4A" />
          <stop offset="60%" stopColor="#B08F68" />
          <stop offset="100%" stopColor="#8E6E4C" />
        </linearGradient>
        <linearGradient id="tb-table" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#C69A66" />
          <stop offset="46%" stopColor="#A87A4C" />
          <stop offset="100%" stopColor="#7E5533" />
        </linearGradient>
        <linearGradient id="tb-metal" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#E9ECEF" />
          <stop offset="42%" stopColor="#C3C9CE" />
          <stop offset="100%" stopColor="#98A1A8" />
        </linearGradient>
        <linearGradient id="tb-latte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9D3B4" />
          <stop offset="34%" stopColor="#C79A6A" />
          <stop offset="100%" stopColor="#8B5B33" />
        </linearGradient>
        <radialGradient id="tb-track" cx="0.5" cy="0" r="0.9">
          <stop offset="0%" stopColor="rgba(255,214,150,0.65)" />
          <stop offset="100%" stopColor="rgba(255,214,150,0)" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="600" height="800" fill="url(#tb-room)" />

      {/* exposed timber ceiling with warm track lights */}
      <rect x="0" y="0" width="600" height="176" fill="#6B4C31" />
      {[16, 62, 108, 154].map((y) => (
        <rect key={y} x="0" y={y} width="600" height="30" rx="4" fill="#7C5A3A" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={92 + i * 130} y="150" width="10" height="26" fill="#3A2E22" />
          <ellipse cx={97 + i * 130} cy="182" rx="17" ry="10" fill="#FFE0AE" />
          <ellipse cx={97 + i * 130} cy="196" rx="58" ry="34" fill="url(#tb-track)" />
        </g>
      ))}

      {/* back wall and a hint of shelving */}
      <rect x="0" y="176" width="600" height="250" fill="#A07B54" opacity="0.5" />
      <rect x="60" y="240" width="180" height="10" rx="4" fill="#6B4C31" />
      <rect x="360" y="228" width="190" height="10" rx="4" fill="#6B4C31" />
      {[78, 112, 146, 180].map((x) => (
        <rect key={x} x={x} y="210" width="20" height="30" rx="3" fill="#7E5D3E" />
      ))}

      {/* round wood table */}
      <ellipse cx="300" cy="560" rx="392" ry="176" fill="url(#tb-table)" />
      <ellipse cx="300" cy="548" rx="392" ry="176" fill="#B98A5C" />
      <path
        d="M 20 480 C 130 434, 470 434, 580 480"
        stroke="rgba(90,58,32,0.25)"
        strokeWidth="6"
        fill="none"
      />

      {/* laptop, lid facing us, hands on the deck */}
      <path d="M 214 566 L 386 566 L 402 620 L 198 620 Z" fill="#B7BEC4" />
      <path d="M 222 396 L 378 396 L 386 566 L 214 566 Z" fill="url(#tb-metal)" />
      <path
        d="M 222 396 L 378 396 L 386 566 L 214 566 Z"
        fill="none"
        stroke="rgba(70,80,86,0.4)"
        strokeWidth="3"
      />
      <ellipse cx="300" cy="482" rx="26" ry="26" fill="#AAB2B8" />
      <path d="M 198 620 L 402 620 L 404 632 L 196 632 Z" fill="#8F979E" />
      {/* two hands reaching onto the deck */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${300 + s * 108} 0) scale(${s} 1)`}>
          <path
            d="M 0 620 C -8 596, 6 576, 30 574 C 52 572, 66 584, 70 602 L 74 640 C 76 672, 58 692, 30 692 C 4 692, -8 672, -6 646 Z"
            fill="#D9AE86"
          />
          {/* four fingers laid on the deck, separated by real gaps */}
          {[0, 1, 2, 3].map((k) => (
            <path
              key={k}
              d={`M ${2 + k * 17} ${618 - k * 3} C ${6 + k * 17} ${598 - k * 5}, ${16 + k * 17} ${590 - k * 5}, ${22 + k * 17} ${596 - k * 4}`}
              stroke="#E4BE97"
              strokeWidth="13"
              strokeLinecap="round"
              fill="none"
            />
          ))}
          <path
            d="M 12 610 L 12 640 M 29 606 L 29 638 M 46 602 L 46 636"
            stroke="rgba(150,110,74,0.5)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -8 668 C 8 690, 46 692, 66 674 L 74 720 L -4 720 Z"
            fill="#4A5560"
          />
        </g>
      ))}

      {/* iced latte with the roundel */}
      <path d="M 78 402 L 176 402 L 164 566 C 163 578, 154 584, 144 584 L 110 584 C 100 584, 91 578, 90 566 Z" fill="url(#tb-latte)" />
      <path
        d="M 78 402 L 176 402 L 164 566 C 163 578, 154 584, 144 584 L 110 584 C 100 584, 91 578, 90 566 Z"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="3"
      />
      <ellipse cx="127" cy="402" rx="49" ry="10" fill="#F0DCC0" />
      {[
        [100, 432, 12],
        [134, 448, -8],
        [112, 486, 16],
        [146, 500, -12],
      ].map(([x, y, r], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="26"
          height="24"
          rx="4"
          fill="rgba(255,255,255,0.34)"
          transform={`rotate(${r} ${x + 13} ${y + 12})`}
        />
      ))}
      <rect x="146" y="330" width="13" height="86" rx="5" fill="#2F7A4C" />
      <g transform="translate(104 470)">
        <Badge size={46} />
      </g>

      {/* seeded bagel sandwich on a white plate */}
      <ellipse cx="470" cy="530" rx="104" ry="40" fill="#F2F0EA" />
      <ellipse cx="470" cy="524" rx="104" ry="40" fill="#FBFAF6" />
      <path
        d="M 404 508 C 404 470, 434 448, 470 448 C 506 448, 536 470, 536 508 Z"
        fill="#D5A15E"
      />
      <rect x="404" y="504" width="132" height="16" fill="#8EA35C" />
      <rect x="404" y="516" width="132" height="14" fill="#C77A63" />
      <path
        d="M 404 528 C 404 552, 434 562, 470 562 C 506 562, 536 552, 536 528 Z"
        fill="#C8934F"
      />
      {SEEDS.map(([x, y], i) => (
        <ellipse key={i} cx={x + 156} cy={y + 60} rx="4.5" ry="3" fill="#F0E2C4" />
      ))}

      {/* phone on a charging cable */}
      <rect x="238" y="676" width="128" height="66" rx="12" fill="#22262A" transform="rotate(-8 302 709)" />
      <rect x="246" y="684" width="112" height="50" rx="8" fill="#3D444B" transform="rotate(-8 302 709)" />
      <path
        d="M 366 716 C 424 726, 470 706, 522 676"
        stroke="#E7E4DC"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />

      {/* the warm falloff from the track lights */}
      <rect x="0" y="0" width="600" height="800" fill="url(#tb-vig)" />
      <defs>
        <radialGradient id="tb-vig" cx="0.5" cy="0.28" r="0.8">
          <stop offset="42%" stopColor="rgba(40,24,12,0)" />
          <stop offset="100%" stopColor="rgba(40,24,12,0.5)" />
        </radialGradient>
      </defs>
    </svg>
  );
};
