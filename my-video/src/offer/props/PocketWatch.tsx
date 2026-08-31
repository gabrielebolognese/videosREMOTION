const ROMANS = [
  "XII",
  "I",
  "II",
  "III",
  "IIII",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
];

/**
 * The hunter lid engraving: a stag among foliage, cut into the copper.
 *
 * Drawn as filled masses with heavy strokes rather than fine line work - at
 * 170px across, a wire-frame deer reads as an insect.
 */
const StagEngraving: React.FC<{ colour: string; weight: number }> = ({
  colour,
  weight,
}) => {
  return (
    <g
      fill={colour}
      stroke={colour}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ground and foliage */}
      <path
        d="M 6 156 C 50 146, 150 146, 196 156"
        strokeWidth={weight * 1.4}
        fill="none"
      />
      <path
        d="M 18 152 C 16 132, 26 118, 42 114 C 40 134, 32 148, 18 152 Z M 40 150 C 44 134, 56 124, 70 124 C 64 140, 54 150, 40 150 Z"
      />
      <path
        d="M 186 150 C 188 130, 178 116, 162 112 C 164 132, 172 146, 186 150 Z"
      />
      {/* body, neck, head */}
      <ellipse cx="112" cy="86" rx="54" ry="29" />
      <path d="M 80 74 L 58 28" strokeWidth={weight * 5} fill="none" />
      <ellipse cx="47" cy="20" rx="23" ry="13" transform="rotate(-20 47 20)" />
      <path d="M 28 12 L 14 8" strokeWidth={weight * 2.4} fill="none" />
      {/* antlers */}
      <path
        d="M 54 6 C 46 -12, 34 -24, 20 -30 M 40 -10 L 22 -12 M 48 -2 L 32 4 M 30 -22 L 26 -38"
        strokeWidth={weight * 1.6}
        fill="none"
      />
      <path
        d="M 68 2 C 68 -18, 78 -32, 94 -38 M 74 -14 L 92 -18 M 68 -4 L 84 -2 M 88 -30 L 96 -46"
        strokeWidth={weight * 1.6}
        fill="none"
      />
      {/* legs and tail */}
      <path
        d="M 82 108 L 76 152 M 100 112 L 96 152 M 132 112 L 138 152 M 152 104 L 160 150"
        strokeWidth={weight * 2}
        fill="none"
      />
      <path d="M 164 72 C 176 62, 180 52, 178 42" strokeWidth={weight * 1.8} fill="none" />
    </g>
  );
};

/**
 * A large antique copper pocket watch, hunter lid swung open on the left with
 * the engraved deer scene facing us, the roman-numeral dial half visible
 * behind it, and a heavy link chain running out of the bottom of the frame.
 */
export const PocketWatch: React.FC<{ width: number }> = ({ width }) => {
  const id = "watch";

  return (
    <svg
      width={width}
      height={width * (980 / 760)}
      viewBox="0 0 760 980"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-case`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#E8B583" />
          <stop offset="34%" stopColor="#B07A4A" />
          <stop offset="72%" stopColor="#8A5A32" />
          <stop offset="100%" stopColor="#5E3A1E" />
        </linearGradient>
        <linearGradient id={`${id}-lid`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#F0C593" />
          <stop offset="30%" stopColor="#C08954" />
          <stop offset="70%" stopColor="#96613A" />
          <stop offset="100%" stopColor="#6A4022" />
        </linearGradient>
        <radialGradient id={`${id}-dial`} cx="0.4" cy="0.32" r="0.78">
          <stop offset="0%" stopColor="#FBF3E2" />
          <stop offset="62%" stopColor="#EDE0C6" />
          <stop offset="100%" stopColor="#CBB894" />
        </radialGradient>
        <linearGradient id={`${id}-chain`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#D9A470" />
          <stop offset="50%" stopColor="#A26F41" />
          <stop offset="100%" stopColor="#6E4523" />
        </linearGradient>
      </defs>

      {/* chain, running from the bow down out of frame */}
      <path
        d="M 566 168 C 660 208, 700 322, 664 452 C 630 574, 596 700, 618 980"
        stroke={`url(#${id}-chain)`}
        strokeWidth="26"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 566 168 C 660 208, 700 322, 664 452 C 630 574, 596 700, 618 980"
        stroke="rgba(46,26,10,0.55)"
        strokeWidth="26"
        strokeLinecap="butt"
        strokeDasharray="3 15"
        fill="none"
      />
      <path
        d="M 566 168 C 660 208, 700 322, 664 452 C 630 574, 596 700, 618 980"
        stroke="rgba(255,226,190,0.45)"
        strokeWidth="7"
        strokeLinecap="butt"
        strokeDasharray="9 9"
        fill="none"
        transform="translate(-6 -3)"
      />

      {/* bow and crown on top of the case */}
      <circle
        cx="520"
        cy="150"
        r="34"
        fill="none"
        stroke={`url(#${id}-case)`}
        strokeWidth="20"
      />
      <rect x="496" y="176" width="48" height="42" rx="12" fill={`url(#${id}-case)`} />
      {Array.from({ length: 7 }, (_, i) => (
        <rect
          key={i}
          x={498 + i * 7}
          y="178"
          width="3"
          height="38"
          fill="rgba(60,34,14,0.45)"
        />
      ))}

      {/* case and dial */}
      <circle cx="470" cy="450" r="234" fill={`url(#${id}-case)`} />
      <circle cx="470" cy="450" r="234" fill="none" stroke="rgba(58,32,12,0.5)" strokeWidth="4" />
      <circle cx="470" cy="450" r="206" fill="#7A4F2A" />
      <circle cx="470" cy="450" r="192" fill={`url(#${id}-dial)`} />
      <circle
        cx="470"
        cy="450"
        r="192"
        fill="none"
        stroke="rgba(110,72,38,0.55)"
        strokeWidth="3"
      />
      <circle
        cx="470"
        cy="450"
        r="168"
        fill="none"
        stroke="rgba(110,72,38,0.30)"
        strokeWidth="2"
      />

      {ROMANS.map((numeral, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <text
            key={numeral}
            x={470 + Math.cos(a) * 146}
            y={450 + Math.sin(a) * 146}
            fill="#4A2F16"
            fontFamily="Poppins"
            fontWeight="700"
            fontSize="34"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {numeral}
          </text>
        );
      })}
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const inner = i % 5 === 0 ? 176 : 182;
        return (
          <line
            key={i}
            x1={470 + Math.cos(a) * inner}
            y1={450 + Math.sin(a) * inner}
            x2={470 + Math.cos(a) * 190}
            y2={450 + Math.sin(a) * 190}
            stroke="rgba(74,47,22,0.6)"
            strokeWidth={i % 5 === 0 ? 4 : 1.6}
          />
        );
      })}

      {/* hands, sat at ten past ten */}
      <path
        d="M 470 450 L 386 348"
        stroke="#3A2410"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 470 450 L 574 372"
        stroke="#3A2410"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="470" cy="450" r="16" fill="#3A2410" />
      <circle cx="470" cy="450" r="7" fill="#C08954" />

      {/* glass sheen over the dial */}
      <path
        d="M 470 258 A 192 192 0 0 0 316 560 C 366 466, 452 386, 566 350 A 192 192 0 0 0 470 258 Z"
        fill="rgba(255,255,255,0.28)"
      />

      {/* the open hunter lid, foreshortened, engraving facing us */}
      <g transform="rotate(-9 236 470)">
        <ellipse cx="236" cy="470" rx="176" ry="230" fill={`url(#${id}-lid)`} />
        <ellipse
          cx="236"
          cy="470"
          rx="176"
          ry="230"
          fill="none"
          stroke="rgba(56,30,12,0.55)"
          strokeWidth="5"
        />
        <ellipse
          cx="236"
          cy="470"
          rx="150"
          ry="202"
          fill="none"
          stroke="rgba(56,30,12,0.35)"
          strokeWidth="3"
        />
        <ellipse
          cx="236"
          cy="470"
          rx="140"
          ry="190"
          fill="rgba(255,224,186,0.10)"
        />
        <g transform="translate(120 402) scale(1.15)">
          <g transform="translate(-4 -5)">
            <StagEngraving colour="rgba(255,231,198,0.45)" weight={4} />
          </g>
          <StagEngraving colour="rgba(70,40,16,0.6)" weight={4} />
        </g>
        {/* lid highlight */}
        <path
          d="M 236 240 C 150 258, 92 340, 90 442 C 118 358, 176 292, 260 262 Z"
          fill="rgba(255,238,214,0.4)"
        />
      </g>

      {/* hinge between lid and case */}
      <rect x="392" y="600" width="60" height="34" rx="14" fill={`url(#${id}-case)`} />
    </svg>
  );
};
