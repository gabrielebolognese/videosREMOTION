const RIBS = Array.from({ length: 19 }, (_, i) => 158 + i * 16);
const TABLES = [
  [204, 606],
  [300, 614],
  [396, 606],
];

/**
 * A tilt-shift miniature diorama: a three-storey café whose upper section is
 * modelled as a giant takeaway cup, on a wet dusk street.
 *
 * The tilt-shift is the whole trick - sky and street go into their own blurred
 * groups and only the band across the middle stays sharp, which is what makes
 * a full-size building read as a model.
 *
 * `parallax` runs 0 to 1 across the shot and slides the layers at different
 * rates behind the card window.
 */
export const Storefront: React.FC<{ parallax?: number }> = ({
  parallax = 0,
}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 800" fill="none">
      <defs>
        <linearGradient id="sf-sky" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#25313F" />
          <stop offset="58%" stopColor="#4A5A66" />
          <stop offset="100%" stopColor="#8B9490" />
        </linearGradient>
        <linearGradient id="sf-glass" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#F5C877" />
          <stop offset="46%" stopColor="#E4A551" />
          <stop offset="100%" stopColor="#B87433" />
        </linearGradient>
        <linearGradient id="sf-cup" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#D8DCD8" />
          <stop offset="22%" stopColor="#F7F6F2" />
          <stop offset="74%" stopColor="#E6E7E2" />
          <stop offset="100%" stopColor="#B9BFBA" />
        </linearGradient>
        <linearGradient id="sf-street" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A444B" />
          <stop offset="100%" stopColor="#1B2227" />
        </linearGradient>
        <radialGradient id="sf-sign" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#3FE08C" />
          <stop offset="100%" stopColor="rgba(63,224,140,0)" />
        </radialGradient>
        <filter id="sf-far" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="sf-near" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* --- far plane: dusk sky and the block behind, thrown out of focus --- */}
      <g filter="url(#sf-far)" transform={`translate(0 ${(parallax * -10).toFixed(2)})`}>
        <rect x="-20" y="-20" width="640" height="420" fill="url(#sf-sky)" />
        <rect x="-20" y="240" width="180" height="200" fill="#333E48" />
        <rect x="470" y="200" width="160" height="240" fill="#2D3841" />
        {[40, 84, 128].map((x) => (
          <rect key={x} x={x} y="286" width="22" height="30" fill="#6E7A72" opacity="0.7" />
        ))}
        {[500, 546, 592].map((x) => (
          <rect key={x} x={x} y="250" width="20" height="28" fill="#6E7A72" opacity="0.6" />
        ))}
      </g>

      {/* the ground plane the model stands on, so no card backing shows */}
      <rect x="-20" y="392" width="640" height="430" fill="#2A333A" />
      <rect x="-20" y="600" width="640" height="230" fill="#222A30" />

      {/* --- sharp band: the model itself --- */}
      <g transform={`translate(${(parallax * 6).toFixed(2)} 0)`}>
        {/* bare autumn trees flanking the frontage */}
        {[
          { x: 92, s: 1 },
          { x: 508, s: -1 },
        ].map(({ x, s }) => (
          <g key={x} transform={`translate(${x} 0) scale(${s} 1)`}>
            <path
              d="M 0 660 L 0 430"
              stroke="#3B3229"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 0 470 C -30 440, -46 410, -50 380 M 0 456 C 28 428, 44 398, 48 366 M 0 430 C -20 404, -28 380, -30 356 M 0 424 C 18 400, 26 378, 28 352"
              stroke="#4A3E32"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M -50 380 C -58 366, -62 356, -62 344 M 48 366 C 54 352, 56 342, 56 332"
              stroke="#4A3E32"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* the giant takeaway cup that forms the top two storeys */}
        <path
          d="M 152 254 L 448 254 L 420 452 L 180 452 Z"
          fill="url(#sf-cup)"
        />
        <path
          d="M 152 254 L 448 254 L 420 452 L 180 452 Z"
          fill="none"
          stroke="rgba(60,70,64,0.35)"
          strokeWidth="2"
        />
        {/* black ribbed lid */}
        <path
          d="M 138 190 L 462 190 L 452 250 L 148 250 Z"
          fill="#1C1F1E"
        />
        <ellipse cx="300" cy="190" rx="162" ry="18" fill="#2A2E2C" />
        {RIBS.map((x) => (
          <rect key={x} x={x} y="196" width="5" height="50" fill="#343936" />
        ))}
        {/* warm windows set into the cup facade */}
        {[
          [200, 372],
          [368, 372],
        ].map(([x, y]) => (
          <rect key={x} x={x} y={y} width="34" height="46" rx="4" fill="#EFB963" />
        ))}
        {/* glowing green roundel sign on the upper facade */}
        <circle cx="300" cy="318" r="72" fill="url(#sf-sign)" opacity="0.85" />
        <circle cx="300" cy="318" r="40" fill="#0A6B3D" />
        <circle cx="300" cy="318" r="40" fill="none" stroke="#EAF7F0" strokeWidth="3" />
        <path
          d="M 300 300 L 305 312 L 318 312 L 308 320 L 312 332 L 300 324 L 288 332 L 292 320 L 282 312 L 295 312 Z"
          fill="#EAF7F0"
        />

        {/* curved glass storefront, warm amber inside */}
        <path
          d="M 168 452 L 432 452 L 432 640 L 168 640 Z"
          fill="url(#sf-glass)"
        />
        <path
          d="M 168 452 C 168 452, 300 442, 432 452"
          stroke="#2A2E2C"
          strokeWidth="10"
          fill="none"
        />
        {[214, 260, 306, 352, 398].map((x) => (
          <rect key={x} x={x} y="452" width="6" height="188" fill="#2A2E2C" opacity="0.7" />
        ))}
        <rect x="168" y="544" width="264" height="6" fill="#2A2E2C" opacity="0.5" />
        {/* silhouettes of people inside */}
        {[
          [196, 566],
          [246, 574],
          [340, 570],
          [396, 562],
        ].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="11" fill="#5E3D22" />
            <path
              d={`M ${x - 15} 640 C ${x - 15} ${y + 14}, ${x + 15} ${y + 14}, ${x + 15} 640 Z`}
              fill="#5E3D22"
            />
          </g>
        ))}
        <rect x="168" y="452" width="264" height="188" fill="rgba(255,255,255,0.10)" />

        {/* outdoor tables with tiny figures */}
        {TABLES.map(([x, y], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="26" ry="8" fill="#2E2A25" />
            <rect x={x - 3} y={y} width="6" height="22" fill="#2E2A25" />
            <circle cx={x - 34} cy={y - 16} r="8" fill="#3A3128" />
            <path d={`M ${x - 44} ${y + 22} L ${x - 24} ${y + 22} L ${x - 27} ${y - 8} L ${x - 41} ${y - 8} Z`} fill="#463A2E" />
            <circle cx={x + 34} cy={y - 14} r="8" fill="#332B23" />
            <path d={`M ${x + 24} ${y + 22} L ${x + 44} ${y + 22} L ${x + 41} ${y - 6} L ${x + 27} ${y - 6} Z`} fill="#3E332A" />
          </g>
        ))}
      </g>

      {/* --- near plane: the wet street, thrown out of focus --- */}
      <g filter="url(#sf-near)" transform={`translate(0 ${(parallax * 14).toFixed(2)})`}>
        <rect x="-20" y="652" width="640" height="180" fill="url(#sf-street)" />
        <rect x="-20" y="644" width="640" height="16" fill="#4A5359" />
        {/* the amber frontage reflected in the wet asphalt */}
        <rect x="176" y="660" width="248" height="110" fill="#C98A3E" opacity="0.34" />
        <rect x="272" y="660" width="58" height="130" fill="#3FE08C" opacity="0.2" />
        {[120, 210, 300, 390, 480].map((x) => (
          <rect key={x} x={x} y="676" width="4" height="86" fill="#8FA0A6" opacity="0.22" />
        ))}
      </g>
    </svg>
  );
};
