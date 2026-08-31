import { CONDENSED } from "../fonts";
import { ACCENT_RED, CARD_SHADOW } from "../lib/tokens";

/** Rounded-corner photo card shell with a soft drop shadow. */
export const PhotoCard: React.FC<{
  width: number;
  height: number;
  children: React.ReactNode;
}> = ({ width, height, children }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 26,
        overflow: "hidden",
        boxShadow: CARD_SHADOW,
        backgroundColor: "#FFFFFF",
      }}
    >
      {children}
    </div>
  );
};

const windowGrid = (
  cols: number,
  rows: number,
  x: number,
  y: number,
  gapX: number,
  gapY: number,
  w: number,
  h: number,
  fill: string,
) =>
  Array.from({ length: cols * rows }, (_, i) => (
    <rect
      key={i}
      x={x + (i % cols) * gapX}
      y={y + Math.floor(i / cols) * gapY}
      width={w}
      height={h}
      rx={1.5}
      fill={fill}
    />
  ));

/**
 * Generic red-and-white emergency hospital facade. The signage is deliberately
 * blurred into illegible bars - no readable words, no marque.
 */
export const RedHospitalPhoto: React.FC<{
  width: number;
  height: number;
}> = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 420 300" fill="none">
      <defs>
        <linearGradient id="bc-red-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CFDCE6" />
          <stop offset="100%" stopColor="#EEF1F3" />
        </linearGradient>
        <linearGradient id="bc-red-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EE3B40" />
          <stop offset="60%" stopColor={ACCENT_RED} />
          <stop offset="100%" stopColor="#B81C22" />
        </linearGradient>
        <filter id="bc-sign-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.1" />
        </filter>
      </defs>

      <rect width="420" height="300" fill="url(#bc-red-sky)" />

      <rect x="286" y="96" width="134" height="176" fill="#DFE4E8" />
      {windowGrid(4, 6, 300, 110, 30, 26, 18, 16, "#C3CDD5")}

      <rect x="34" y="60" width="248" height="212" fill="url(#bc-red-wall)" />
      <rect x="34" y="60" width="248" height="12" fill="#F5F6F6" />
      <rect x="34" y="128" width="248" height="10" fill="#F5F6F6" />
      <rect x="34" y="196" width="248" height="10" fill="#F5F6F6" />
      {windowGrid(5, 1, 52, 84, 46, 0, 32, 34, "#37454F")}
      {windowGrid(5, 1, 52, 152, 46, 0, 32, 34, "#37454F")}

      <rect x="60" y="216" width="196" height="56" rx="4" fill="#F5F6F6" />
      <rect x="86" y="228" width="46" height="44" fill="#6C7A84" />
      <rect x="146" y="228" width="46" height="44" fill="#6C7A84" />
      <rect x="56" y="206" width="204" height="12" rx="6" fill="#FFFFFF" />

      <g filter="url(#bc-sign-blur)">
        <rect x="98" y="164" width="120" height="26" rx="5" fill="#F7F8F8" />
        <rect x="108" y="172" width="42" height="10" rx="5" fill="#A9B4BC" />
        <rect x="156" y="172" width="26" height="10" rx="5" fill="#A9B4BC" />
        <rect x="188" y="172" width="20" height="10" rx="5" fill="#A9B4BC" />
      </g>

      <rect x="0" y="272" width="420" height="28" fill="#B9C2C9" />
      <rect x="0" y="272" width="420" height="4" fill="#98A4AD" />
    </svg>
  );
};

/**
 * Generic pale blue-and-white multi-storey hospital block, signage blurred to
 * illegibility.
 */
export const BlueHospitalPhoto: React.FC<{
  width: number;
  height: number;
}> = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 420 300" fill="none">
      <defs>
        <linearGradient id="bc-blue-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFD6EA" />
          <stop offset="100%" stopColor="#EFF4F8" />
        </linearGradient>
        <linearGradient id="bc-blue-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FBFCFD" />
          <stop offset="52%" stopColor="#DCE8F3" />
          <stop offset="100%" stopColor="#B9CEE1" />
        </linearGradient>
        <filter
          id="bc-sign-blur-b"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="2.1" />
        </filter>
      </defs>

      <rect width="420" height="300" fill="url(#bc-blue-sky)" />

      <rect x="16" y="118" width="96" height="154" fill="#D3E0EC" />
      {windowGrid(3, 5, 28, 132, 30, 26, 20, 16, "#9FB6C9")}

      <rect x="116" y="34" width="242" height="238" fill="url(#bc-blue-wall)" />
      <rect x="116" y="34" width="242" height="14" fill="#FFFFFF" />
      {Array.from({ length: 6 }, (_, r) => (
        <rect
          key={r}
          x="116"
          y={64 + r * 34}
          width="242"
          height="8"
          fill="#FFFFFF"
        />
      ))}
      {windowGrid(6, 6, 130, 74, 38, 34, 26, 22, "#7FA0BC")}

      <rect x="356" y="82" width="52" height="190" fill="#C6D7E5" />
      {windowGrid(1, 5, 368, 96, 0, 34, 26, 22, "#8FAAC3")}

      <rect x="166" y="238" width="146" height="34" rx="3" fill="#8FA8BE" />
      <rect x="162" y="230" width="154" height="10" rx="5" fill="#FFFFFF" />

      <g filter="url(#bc-sign-blur-b)">
        <rect x="182" y="196" width="116" height="24" rx="5" fill="#FFFFFF" />
        <rect x="192" y="203" width="38" height="10" rx="5" fill="#94AABE" />
        <rect x="236" y="203" width="24" height="10" rx="5" fill="#94AABE" />
        <rect x="266" y="203" width="22" height="10" rx="5" fill="#94AABE" />
      </g>

      <rect x="0" y="272" width="420" height="28" fill="#C4CFD8" />
      <rect x="0" y="272" width="420" height="4" fill="#A5B3BE" />
    </svg>
  );
};

/**
 * Unbranded polished chrome winged-figure hood ornament on a metallic blue
 * bonnet, dark blurred garage behind. No badges, no marque, no readable text.
 */
export const OrnamentPhoto: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 420 320" fill="none">
      <defs>
        <radialGradient id="bc-garage" cx="0.5" cy="0.34" r="0.78">
          <stop offset="0%" stopColor="#2A3642" />
          <stop offset="58%" stopColor="#161E28" />
          <stop offset="100%" stopColor="#0A0E14" />
        </radialGradient>
        <linearGradient id="bc-bonnet" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#8FAECB" />
          <stop offset="34%" stopColor="#4E7A9E" />
          <stop offset="100%" stopColor="#101C2A" />
        </linearGradient>
        <linearGradient id="bc-chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBFDFE" />
          <stop offset="30%" stopColor="#C8D2DA" />
          <stop offset="54%" stopColor="#7C8994" />
          <stop offset="72%" stopColor="#E6ECF1" />
          <stop offset="100%" stopColor="#5B666F" />
        </linearGradient>
        <filter id="bc-bokeh" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <rect width="420" height="320" fill="url(#bc-garage)" />

      <g filter="url(#bc-bokeh)" opacity="0.5">
        <circle cx="66" cy="66" r="26" fill="#5C7B96" />
        <circle cx="352" cy="48" r="20" fill="#7E9AB4" />
        <circle cx="300" cy="104" r="14" fill="#46617A" />
        <rect x="120" y="30" width="150" height="10" rx="5" fill="#8FAECB" />
      </g>

      <path
        d="M -10 246 C 90 214, 320 210, 430 244 L 430 330 L -10 330 Z"
        fill="url(#bc-bonnet)"
      />
      <path
        d="M -10 246 C 90 214, 320 210, 430 244"
        stroke="rgba(190,215,236,0.55)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M 40 300 C 150 266, 300 264, 400 292"
        stroke="rgba(150,180,206,0.22)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      <ellipse cx="216" cy="240" rx="38" ry="8" fill="#0C141D" opacity="0.8" />

      {/* Far wing, sitting behind the figure and dropped a stop darker. */}
      <path
        d="M 214 196 C 182 176, 142 158, 100 150 C 138 172, 176 196, 206 224 Z"
        fill="url(#bc-chrome)"
        opacity="0.62"
      />
      {/* Near wing, swept back and up over the shoulder. */}
      <path
        d="M 224 176 C 196 142, 158 110, 114 88 C 152 126, 190 166, 216 208 Z"
        fill="url(#bc-chrome)"
      />
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M ${132 + i * 22} ${108 + i * 20} C ${164 + i * 20} ${138 + i * 18}, ${190 + i * 16} ${168 + i * 14}, ${210 + i * 8} ${198 + i * 8}`}
          stroke="rgba(60,72,82,0.5)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* The figure: a torso leaning forward off the plinth, arms trailing. */}
      <path
        d="M 208 238 C 200 214, 202 188, 214 168 C 224 150, 240 138, 256 132 C 250 150, 248 170, 246 190 C 244 212, 232 232, 220 242 Z"
        fill="url(#bc-chrome)"
      />
      <path
        d="M 222 186 C 236 178, 250 170, 262 158 C 256 174, 246 188, 234 198 Z"
        fill="url(#bc-chrome)"
        opacity="0.85"
      />
      <circle cx="260" cy="126" r="10" fill="url(#bc-chrome)" />
      <path
        d="M 258 136 C 246 144, 234 156, 226 170"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 114 88 C 152 128, 190 168, 216 210"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      <rect
        x="194"
        y="228"
        width="46"
        height="13"
        rx="5"
        fill="url(#bc-chrome)"
      />
    </svg>
  );
};

/**
 * Circular scalloped-edge red seal, three white stars over the word TRUSTED.
 */
export const TrustedSeal: React.FC<{ size: number }> = ({ size }) => {
  const bumps = 20;
  const R = 62;
  const c = 80;
  const chord = 2 * R * Math.sin(Math.PI / bumps);
  const scallop = chord * 0.56;

  const point = (i: number) => {
    const a = (i / bumps) * Math.PI * 2 - Math.PI / 2;
    return `${(c + Math.cos(a) * R).toFixed(2)} ${(c + Math.sin(a) * R).toFixed(2)}`;
  };

  let edge = `M ${point(0)}`;
  for (let i = 1; i <= bumps; i++) {
    edge += ` A ${scallop.toFixed(2)} ${scallop.toFixed(2)} 0 0 1 ${point(i)}`;
  }
  edge += " Z";

  const star = (cx: number, cy: number, rad: number) =>
    Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const rr = i % 2 === 0 ? rad : rad * 0.44;
      return `${(cx + Math.cos(a) * rr).toFixed(2)},${(cy + Math.sin(a) * rr).toFixed(2)}`;
    }).join(" ");

  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <path d={edge} fill="#C2181E" />
      <circle cx={c} cy={c} r={R - 2} fill={ACCENT_RED} />
      <circle
        cx={c}
        cy={c}
        r={R - 13}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.6"
        fill="none"
      />
      <polygon points={star(58, 60, 8)} fill="#FFFFFF" />
      <polygon points={star(80, 55, 9)} fill="#FFFFFF" />
      <polygon points={star(102, 60, 8)} fill="#FFFFFF" />
      <text
        x={c}
        y="103"
        textAnchor="middle"
        fill="#FFFFFF"
        style={{
          fontFamily: CONDENSED,
          fontWeight: 600,
          fontSize: 21,
          letterSpacing: "0.06em",
        }}
      >
        TRUSTED
      </text>
    </svg>
  );
};
