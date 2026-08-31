const LAMPS = [
  [148, 210, 62],
  [300, 246, 74],
  [452, 214, 62],
] as const;

/** x, height of the tabletop, scale, and which side the chair sits on. */
const SETTINGS = [
  [150, 606, 0.9, -1],
  [326, 646, 1.1, 1],
  [486, 598, 0.86, 1],
] as const;

/**
 * A warm café interior: terracotta and cream walls, woven rattan pendants, an
 * arched niche with warm backlight, tan moulded chairs and a glass shopfront
 * with a bright street beyond.
 *
 * `pan` slides the whole room laterally behind the card window.
 */
export const Interior: React.FC<{ pan?: number }> = ({ pan = 0 }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 800" fill="none">
      <defs>
        <linearGradient id="in-wall" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#E7D9C3" />
          <stop offset="62%" stopColor="#D9C4A8" />
          <stop offset="100%" stopColor="#BE9E7E" />
        </linearGradient>
        <linearGradient id="in-terracotta" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#C4785A" />
          <stop offset="100%" stopColor="#9A5540" />
        </linearGradient>
        <radialGradient id="in-niche" cx="0.5" cy="0.7" r="0.7">
          <stop offset="0%" stopColor="#FFD9A0" />
          <stop offset="100%" stopColor="#C98B52" />
        </radialGradient>
        <linearGradient id="in-street" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBF0" />
          <stop offset="100%" stopColor="#D9DCCE" />
        </linearGradient>
        <radialGradient id="in-lamp" cx="0.5" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#FFE0AC" />
          <stop offset="100%" stopColor="#B98444" />
        </radialGradient>
        <linearGradient id="in-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9C7550" />
          <stop offset="100%" stopColor="#6E4E33" />
        </linearGradient>
      </defs>

      <g transform={`translate(${(pan * -26).toFixed(2)} 0)`}>
        <rect x="-40" y="0" width="700" height="800" fill="url(#in-wall)" />
        {/* terracotta accent wall on the left */}
        <rect x="-40" y="0" width="330" height="800" fill="url(#in-terracotta)" />

        {/* arched niche, warm backlit */}
        <path
          d="M 74 470 L 74 306 C 74 258, 108 226, 152 226 C 196 226, 230 258, 230 306 L 230 470 Z"
          fill="url(#in-niche)"
        />
        <path
          d="M 74 470 L 74 306 C 74 258, 108 226, 152 226 C 196 226, 230 258, 230 306 L 230 470 Z"
          fill="none"
          stroke="rgba(120,66,44,0.4)"
          strokeWidth="6"
        />
        <rect x="94" y="374" width="116" height="7" fill="rgba(120,66,44,0.35)" />
        {[110, 138, 166].map((x) => (
          <rect key={x} x={x} y="336" width="14" height="38" rx="4" fill="#A9673F" />
        ))}

        {/* glass shopfront on the right, bright street beyond */}
        <rect x="416" y="120" width="230" height="450" fill="url(#in-street)" />
        <rect x="416" y="120" width="230" height="450" fill="none" stroke="#5B4636" strokeWidth="12" />
        <rect x="528" y="120" width="9" height="450" fill="#5B4636" />
        <rect x="416" y="330" width="230" height="9" fill="#5B4636" />
        <rect x="452" y="380" width="52" height="170" fill="#C6C9B8" opacity="0.6" />
        <rect x="566" y="368" width="42" height="182" fill="#CBCEBD" opacity="0.5" />

        {/* ceiling fan */}
        <rect x="292" y="34" width="9" height="42" fill="#7A5B3E" />
        <ellipse cx="296" cy="82" rx="18" ry="10" fill="#8A6845" />
        {[-1, 1].map((s) => (
          <ellipse
            key={s}
            cx={296 + s * 76}
            cy="84"
            rx="72"
            ry="8"
            fill="#7A5B3E"
            opacity="0.9"
          />
        ))}

        {/* woven rattan pendants */}
        {LAMPS.map(([x, y, r], i) => (
          <g key={i}>
            <rect x={x - 2} y="0" width="4" height={y - r} fill="#6E5236" />
            <path
              d={`M ${x - r} ${y} C ${x - r} ${y - r * 0.9}, ${x + r} ${y - r * 0.9}, ${x + r} ${y} C ${x + r} ${y + r * 0.55}, ${x - r} ${y + r * 0.55}, ${x - r} ${y} Z`}
              fill="url(#in-lamp)"
            />
            {/* the weave */}
            {[-0.55, -0.2, 0.16, 0.5].map((f, k) => (
              <path
                key={k}
                d={`M ${x - r * 0.96} ${y + r * f} C ${x - r * 0.4} ${y + r * (f + 0.14)}, ${x + r * 0.4} ${y + r * (f + 0.14)}, ${x + r * 0.96} ${y + r * f}`}
                stroke="rgba(112,72,36,0.4)"
                strokeWidth="3"
                fill="none"
              />
            ))}
            <ellipse cx={x} cy={y + r * 0.5} rx={r * 0.44} ry="7" fill="#FFE7BC" />
          </g>
        ))}

        {/* floor */}
        <rect x="-40" y="612" width="700" height="220" fill="url(#in-floor)" />
        <path d="M -40 612 L 660 612" stroke="rgba(50,32,18,0.35)" strokeWidth="5" />

        {/*
          Wooden tables and tan moulded chairs. The chair back has to stand
          clear above its seat and the legs have to splay - a low dome on a
          short stem reads as a mushroom, not as furniture.
        */}
        {SETTINGS.map(([x, top, s, side], i) => (
          <g key={i} transform={`translate(${x} ${top}) scale(${s})`}>
            {/* the chair, set behind the table on its own side */}
            <g transform={`translate(${side * 118} 44)`}>
              <path
                d="M -34 8 C -40 -30, -34 -68, -22 -76 L 22 -76 C 34 -68, 40 -30, 34 8 Z"
                fill="#D9B58A"
              />
              <path
                d="M -34 8 C -40 -30, -34 -68, -22 -76 L 22 -76 C 34 -68, 40 -30, 34 8 Z"
                fill="none"
                stroke="rgba(126,92,58,0.35)"
                strokeWidth="3"
              />
              <ellipse cx="0" cy="12" rx="38" ry="13" fill="#C9A377" />
              <path
                d="M -28 18 L -36 78 M 28 18 L 36 78 M -14 20 L -18 74 M 14 20 L 18 74"
                stroke="#8E6A46"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* the table: top, rim, pedestal, foot */}
            <ellipse cx="0" cy="6" rx="82" ry="19" fill="#8B6440" />
            <ellipse cx="0" cy="0" rx="82" ry="19" fill="#A87C51" />
            <ellipse cx="-14" cy="-4" rx="46" ry="10" fill="rgba(255,226,180,0.20)" />
            <rect x="-8" y="8" width="16" height="94" fill="#6E4E33" />
            <ellipse cx="0" cy="104" rx="36" ry="11" fill="#5C4029" />
            <ellipse cx="0" cy="112" rx="46" ry="10" fill="rgba(48,30,16,0.28)" />
          </g>
        ))}

        {/* warm ambient wash from the pendants */}
        <rect
          x="-40"
          y="0"
          width="700"
          height="800"
          fill="url(#in-glow)"
        />
        <defs>
          <radialGradient id="in-glow" cx="0.42" cy="0.3" r="0.72">
            <stop offset="0%" stopColor="rgba(255,206,140,0.30)" />
            <stop offset="100%" stopColor="rgba(255,206,140,0)" />
          </radialGradient>
        </defs>
      </g>
    </svg>
  );
};
