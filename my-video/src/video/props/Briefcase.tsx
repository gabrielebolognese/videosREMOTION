const BACK_ROW = [106, 214, 322, 430];
const FRONT_ROW = [90, 206, 322, 438];

/** One banded stack of US-style banknotes. */
const CashStack: React.FC<{ x: number; y: number; w: number; h: number }> = ({
  x,
  y,
  w,
  h,
}) => {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="url(#notepaper)" />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        stroke="rgba(30,40,28,0.45)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d={`M ${x + 4} ${y + h * 0.3} L ${x + w - 4} ${y + h * 0.3} M ${x + 4} ${
          y + h * 0.52
        } L ${x + w - 4} ${y + h * 0.52} M ${x + 4} ${y + h * 0.74} L ${
          x + w - 4
        } ${y + h * 0.74}`}
        stroke="rgba(46,64,44,0.35)"
        strokeWidth="1.4"
      />
      <ellipse
        cx={x + w / 2}
        cy={y + h / 2}
        rx={w * 0.17}
        ry={h * 0.26}
        fill="rgba(58,80,54,0.28)"
      />
      <rect x={x + w * 0.3} y={y - 2} width={w * 0.22} height={h + 4} fill="#E8DCC6" />
      <rect
        x={x + w * 0.3}
        y={y - 2}
        width={w * 0.22}
        height={h + 4}
        stroke="rgba(120,100,70,0.5)"
        strokeWidth="1"
        fill="none"
      />
      <rect
        x={x + w * 0.3}
        y={y + h * 0.42}
        width={w * 0.22}
        height={h * 0.16}
        fill="#F0141E"
      />
    </g>
  );
};

/** Photoreal-leaning open metal briefcase packed with banded cash. */
export const Briefcase: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * (470 / 620)}
      viewBox="0 0 620 470"
      fill="none"
    >
      <defs>
        <linearGradient id="casemetal" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#D8DDE1" />
          <stop offset="18%" stopColor="#9BA3A9" />
          <stop offset="46%" stopColor="#E7ECEF" />
          <stop offset="70%" stopColor="#7C858C" />
          <stop offset="100%" stopColor="#4A5157" />
        </linearGradient>
        <linearGradient id="casemetal2" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#6E767C" />
          <stop offset="26%" stopColor="#C9D0D5" />
          <stop offset="58%" stopColor="#868E95" />
          <stop offset="100%" stopColor="#3E4449" />
        </linearGradient>
        <linearGradient id="notepaper" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#CBDCC2" />
          <stop offset="52%" stopColor="#A8C09D" />
          <stop offset="100%" stopColor="#7F9A76" />
        </linearGradient>
        <linearGradient id="traydark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15181A" />
          <stop offset="100%" stopColor="#33383C" />
        </linearGradient>
      </defs>

      {/* open lid, tilted back */}
      <path
        d="M 118 20 L 502 20 C 516 20 524 28 524 40 L 524 150 L 96 150 L 96 40 C 96 28 104 20 118 20 Z"
        fill="url(#casemetal)"
      />
      <rect x="118" y="42" width="384" height="90" rx="6" fill="#2E3236" />
      <path
        d="M 140 44 L 140 130 M 190 44 L 190 130 M 240 44 L 240 130 M 290 44 L 290 130 M 340 44 L 340 130 M 390 44 L 390 130 M 440 44 L 440 130 M 480 44 L 480 130"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
      />
      <path
        d="M 120 26 L 500 26"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* interior tray */}
      <path d="M 84 148 L 536 148 L 562 308 L 58 308 Z" fill="url(#traydark)" />

      {/* cash */}
      {BACK_ROW.map((x) => (
        <CashStack key={x} x={x} y={158} w={100} h={58} />
      ))}
      {FRONT_ROW.map((x) => (
        <CashStack key={x} x={x} y={226} w={108} h={66} />
      ))}

      {/* front face */}
      <path
        d="M 58 306 L 562 306 L 550 414 C 550 426 540 434 528 434 L 92 434 C 80 434 70 426 70 414 Z"
        fill="url(#casemetal2)"
      />
      <path
        d="M 62 312 L 558 312"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 76 396 L 544 396"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* latches */}
      <g>
        <rect x="150" y="292" width="72" height="42" rx="6" fill="url(#casemetal)" />
        <rect x="164" y="304" width="44" height="16" rx="4" fill="#31363A" />
        <rect x="164" y="298" width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.9)" />
        <rect x="398" y="292" width="72" height="42" rx="6" fill="url(#casemetal)" />
        <rect x="412" y="304" width="44" height="16" rx="4" fill="#31363A" />
        <rect x="412" y="298" width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.9)" />
      </g>

      {/* handle */}
      <path
        d="M 258 434 L 258 452 C 258 460 266 466 276 466 L 344 466 C 354 466 362 460 362 452 L 362 434"
        stroke="#26292C"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 262 440 L 262 452 C 262 456 268 460 276 460 L 344 460"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* corner speculars */}
      <path
        d="M 96 44 L 96 148 M 524 44 L 524 148"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
