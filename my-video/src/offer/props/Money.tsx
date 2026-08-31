/**
 * The banknote paper the whole money family is printed on, plus the two props
 * that are made of it: one flat note, and a strapped brick of them.
 *
 * Every id is prefixed per component - SVG ids are document-global, and three
 * of these props can share a frame.
 */
export const MoneyPaperDefs: React.FC<{ id: string }> = ({ id }) => {
  return (
    <>
      <linearGradient id={`${id}-field`} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#CFD2B8" />
        <stop offset="46%" stopColor="#A9AD8E" />
        <stop offset="100%" stopColor="#8D9174" />
      </linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E2E4D2" />
        <stop offset="100%" stopColor="#9DA184" />
      </linearGradient>
      {/* Fine engraved cross hatch - the texture that reads as banknote paper. */}
      <pattern
        id={`${id}-hatch`}
        width="9"
        height="9"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(24)"
      >
        <path d="M 0 0 L 0 9" stroke="rgba(56,72,46,0.30)" strokeWidth="1.1" />
        <path
          d="M 4.5 0 L 4.5 9"
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="0.8"
        />
      </pattern>
      {/* Guilloche wave lines for the note face. */}
      <pattern
        id={`${id}-wave`}
        width="26"
        height="12"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 0 6 C 6.5 -1, 19.5 13, 26 6"
          stroke="rgba(48,66,40,0.34)"
          strokeWidth="1"
          fill="none"
        />
      </pattern>
    </>
  );
};

/** The engraved bust of a generic 18th century statesman. */
const Portrait: React.FC<{ id: string }> = ({ id }) => {
  return (
    <g>
      <ellipse
        cx="0"
        cy="0"
        rx="96"
        ry="120"
        fill={`url(#${id}-edge)`}
        opacity="0.75"
      />
      <g clipPath={`url(#${id}-oval)`}>
        {/* coat and shoulders */}
        <path
          d="M -104 128 C -96 66, -56 40, -14 34 L 16 34 C 60 40, 100 66, 106 128 Z"
          fill="#6E7758"
        />
        <path d="M -34 36 L 0 96 L 34 36 L 18 28 L -18 28 Z" fill="#DCDFC8" />
        {/* the wig: rolled curls either side of a high forehead */}
        <path
          d="M -56 -44 C -60 -92, -30 -118, 2 -118 C 34 -118, 62 -92, 58 -44 C 70 -22, 66 12, 48 26 C 34 36, 12 40, 0 40 C -12 40, -34 36, -48 26 C -66 12, -70 -22, -56 -44 Z"
          fill="#7C8564"
        />
        {/* face */}
        <path
          d="M -34 -50 C -34 -84, -18 -100, 2 -100 C 22 -100, 36 -84, 36 -50 C 36 -18, 22 6, 2 6 C -18 6, -34 -18, -34 -50 Z"
          fill="#A7AC8B"
        />
        {/* engraved modelling of the face - brow, cheek and jaw, no features */}
        <path
          d="M -28 -62 C -18 -70, 22 -70, 32 -62 M -30 -40 C -24 -34, -18 -32, -12 -34 M 12 -34 C 18 -32, 24 -34, 30 -40 M -20 -6 C -10 0, 12 0, 22 -6"
          stroke="rgba(46,62,38,0.5)"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 2 -56 L 2 -26 L -6 -20"
          stroke="rgba(46,62,38,0.4)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* engraving hatch laid over the whole bust */}
        <rect
          x="-110"
          y="-130"
          width="220"
          height="270"
          fill={`url(#${id}-hatch)`}
          opacity="0.5"
        />
      </g>
      <ellipse
        cx="0"
        cy="0"
        rx="96"
        ry="120"
        fill="none"
        stroke="rgba(48,66,40,0.55)"
        strokeWidth="2.4"
      />
    </g>
  );
};

const CORNERS: [number, number][] = [
  [70, 74],
  [830, 74],
  [70, 330],
  [830, 330],
];

/** One flat hundred-denomination note, seen square on. */
export const Banknote: React.FC<{ width: number }> = ({ width }) => {
  const id = "note";

  return (
    <svg
      width={width}
      height={width * (392 / 900)}
      viewBox="0 0 900 392"
      fill="none"
    >
      <defs>
        <MoneyPaperDefs id={id} />
        <clipPath id={`${id}-oval`}>
          <ellipse cx="0" cy="0" rx="96" ry="120" />
        </clipPath>
        <clipPath id={`${id}-body`}>
          <rect x="0" y="0" width="900" height="392" rx="8" />
        </clipPath>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="42%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(40,52,32,0.16)" />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y="0"
        width="900"
        height="392"
        rx="8"
        fill={`url(#${id}-field)`}
      />
      <g clipPath={`url(#${id}-body)`}>
        <rect
          x="0"
          y="0"
          width="900"
          height="392"
          fill={`url(#${id}-wave)`}
          opacity="0.85"
        />
        <rect
          x="0"
          y="0"
          width="900"
          height="392"
          fill={`url(#${id}-hatch)`}
          opacity="0.35"
        />

        <rect
          x="22"
          y="22"
          width="856"
          height="348"
          fill="none"
          stroke="rgba(48,66,40,0.62)"
          strokeWidth="3"
        />
        <rect
          x="34"
          y="34"
          width="832"
          height="324"
          fill="none"
          stroke="rgba(48,66,40,0.34)"
          strokeWidth="1.6"
        />

        <g transform="translate(300 196)">
          <Portrait id={id} />
        </g>

        <circle
          cx="612"
          cy="252"
          r="52"
          fill="none"
          stroke="rgba(48,66,40,0.5)"
          strokeWidth="3"
        />
        <circle
          cx="612"
          cy="252"
          r="40"
          fill="none"
          stroke="rgba(48,66,40,0.32)"
          strokeWidth="6"
          strokeDasharray="5 7"
        />
        <circle
          cx="760"
          cy="252"
          r="52"
          fill="none"
          stroke="rgba(48,66,40,0.5)"
          strokeWidth="3"
        />
        <path
          d="M 736 268 L 760 224 L 784 268 Z"
          fill="none"
          stroke="rgba(48,66,40,0.45)"
          strokeWidth="3"
        />

        {CORNERS.map(([x, y], i) => (
          <text
            key={i}
            x={x}
            y={y}
            fill="rgba(40,58,34,0.82)"
            fontFamily="Poppins"
            fontWeight="800"
            fontSize="46"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            100
          </text>
        ))}
        <text
          x="686"
          y="122"
          fill="rgba(40,58,34,0.62)"
          fontFamily="Poppins"
          fontWeight="700"
          fontSize="24"
          letterSpacing="6"
          textAnchor="middle"
        >
          ONE HUNDRED
        </text>

        <rect
          x="0"
          y="0"
          width="900"
          height="392"
          fill={`url(#${id}-sheen)`}
        />
      </g>
      <rect
        x="0"
        y="0"
        width="900"
        height="392"
        rx="8"
        fill="none"
        stroke="rgba(40,54,32,0.35)"
        strokeWidth="2"
      />
    </svg>
  );
};

const STACK_LINES = Array.from({ length: 25 }, (_, i) => i);

/** A banded brick of hundreds, three-quarter view, yellow paper strap. */
export const CashBrick: React.FC<{ width: number }> = ({ width }) => {
  const id = "brick";

  return (
    <svg
      width={width}
      height={width * (330 / 520)}
      viewBox="0 0 520 330"
      fill="none"
    >
      <defs>
        <MoneyPaperDefs id={id} />
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#8A8E71" />
          <stop offset="100%" stopColor="#6C7059" />
        </linearGradient>
        <linearGradient id={`${id}-strap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2D765" />
          <stop offset="52%" stopColor="#E4C246" />
          <stop offset="100%" stopColor="#C6A22C" />
        </linearGradient>
        <linearGradient id={`${id}-form`} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(30,40,24,0.28)" />
        </linearGradient>
      </defs>

      {/* top face - the printed face of the topmost note */}
      <path
        d="M 76 116 L 148 58 L 492 58 L 420 116 Z"
        fill={`url(#${id}-edge)`}
      />
      <path
        d="M 76 116 L 148 58 L 492 58 L 420 116 Z"
        fill={`url(#${id}-wave)`}
        opacity="0.7"
      />
      <ellipse cx="238" cy="88" rx="30" ry="19" fill="rgba(74,92,60,0.32)" />
      <path
        d="M 76 116 L 148 58 L 492 58 L 420 116 Z"
        fill="none"
        stroke="rgba(48,66,40,0.45)"
        strokeWidth="2"
      />

      {/* right side face */}
      <path
        d="M 420 116 L 492 58 L 492 214 L 420 272 Z"
        fill={`url(#${id}-side)`}
      />
      {STACK_LINES.map((i) => (
        <path
          key={`s${i}`}
          d={`M 420 ${124 + i * 6} L 492 ${66 + i * 6}`}
          stroke="rgba(36,50,30,0.22)"
          strokeWidth="1.2"
        />
      ))}

      {/* front face - the cut edges of the stack */}
      <path d="M 76 116 L 420 116 L 420 272 L 76 272 Z" fill="#B9BEA2" />
      {STACK_LINES.map((i) => (
        <rect
          key={`f${i}`}
          x="76"
          y={120 + i * 6}
          width="344"
          height="3"
          fill={i % 2 === 0 ? "rgba(238,241,222,0.85)" : "rgba(70,86,56,0.30)"}
        />
      ))}
      <path
        d="M 76 116 L 420 116 L 420 272 L 76 272 Z"
        fill="none"
        stroke="rgba(40,54,32,0.42)"
        strokeWidth="2"
      />

      {/* yellow paper strap, wrapping the short axis */}
      <path d="M 196 116 L 268 58 L 322 58 L 250 116 Z" fill="#F0D45E" />
      <path
        d="M 196 116 L 268 58 L 322 58 L 250 116 Z"
        fill="none"
        stroke="rgba(150,116,20,0.55)"
        strokeWidth="1.6"
      />
      <rect x="196" y="116" width="54" height="156" fill={`url(#${id}-strap)`} />
      <rect
        x="196"
        y="116"
        width="54"
        height="156"
        fill="none"
        stroke="rgba(150,116,20,0.55)"
        strokeWidth="1.6"
      />
      <text
        x="223"
        y="200"
        fill="rgba(96,72,10,0.9)"
        fontFamily="Poppins"
        fontWeight="800"
        fontSize="25"
        textAnchor="middle"
        transform="rotate(-90 223 200)"
      >
        $10,000
      </text>

      <path
        d="M 76 116 L 148 58 L 492 58 L 492 214 L 420 272 L 76 272 Z"
        fill={`url(#${id}-form)`}
      />
    </svg>
  );
};
