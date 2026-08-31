import { CREAM, INK } from "../lib/tokens";
import { CalligraphicMark } from "./Tee";

export const WALL_W = 470;
export const WALL_H = 640;

/** Every wall texture is cut to the same rectangle, so the flip-cut registers. */
const Wall: React.FC<{ children: React.ReactNode; base: string }> = ({
  children,
  base,
}) => (
  <svg
    width={WALL_W}
    height={WALL_H}
    viewBox={`0 0 ${WALL_W} ${WALL_H}`}
    fill="none"
  >
    <rect width={WALL_W} height={WALL_H} fill={base} />
    {children}
  </svg>
);

const Floral: React.FC = () => (
  <Wall base="#EBE0D2">
    <defs>
      <pattern id="w-floral" width="94" height="94" patternUnits="userSpaceOnUse">
        <g opacity="0.75">
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="47"
              cy="27"
              rx="10"
              ry="17"
              fill="#C4A0AE"
              style={{ rotate: `${deg}deg`, transformOrigin: "47px 47px" }}
            />
          ))}
          <circle cx="47" cy="47" r="7" fill="#8E6D7C" />
          <path
            d="M 8 82 C 22 68, 34 68, 44 78 M 86 82 C 72 68, 60 68, 50 78"
            stroke="#9BA882"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </pattern>
    </defs>
    <rect width={WALL_W} height={WALL_H} fill="url(#w-floral)" />
    <rect width={WALL_W} height={WALL_H} fill="rgba(120,96,78,0.10)" />
  </Wall>
);

const Wood: React.FC = () => (
  <Wall base="#9A7A55">
    {[0, 92, 184, 276, 368, 460, 552].map((y, i) => (
      <g key={y}>
        <rect
          y={y}
          width={WALL_W}
          height="88"
          fill={i % 2 ? "#8E6E4B" : "#A5865F"}
        />
        <path
          d={`M 0 ${y + 22} C 140 ${y + 14}, 300 ${y + 30}, ${WALL_W} ${y + 18}
              M 0 ${y + 56} C 160 ${y + 66}, 320 ${y + 46}, ${WALL_W} ${y + 60}`}
          stroke="rgba(72,52,32,0.35)"
          strokeWidth="3"
          fill="none"
        />
        <rect y={y + 86} width={WALL_W} height="5" fill="rgba(52,36,20,0.55)" />
      </g>
    ))}
    <rect width={WALL_W} height={WALL_H} fill="rgba(60,42,24,0.12)" />
  </Wall>
);

const TealBoards: React.FC = () => (
  <Wall base="#2F7C7A">
    {[0, 78, 156, 234, 312, 390, 468, 546].map((x, i) => (
      <g key={x}>
        <rect
          x={x}
          width="74"
          height={WALL_H}
          fill={i % 2 ? "#2A716F" : "#358886"}
        />
        <rect x={x + 72} width="6" height={WALL_H} fill="rgba(16,54,54,0.6)" />
      </g>
    ))}
    {/* the paint has been on there a while */}
    <path
      d="M 62 90 C 66 240, 58 400, 66 560 M 288 40 C 294 200, 286 380, 292 600"
      stroke="rgba(214,238,236,0.22)"
      strokeWidth="7"
      fill="none"
    />
    <path
      d="M 180 120 C 176 260, 184 420, 178 580"
      stroke="rgba(14,48,48,0.30)"
      strokeWidth="9"
      fill="none"
    />
  </Wall>
);

const Graffiti: React.FC = () => (
  <Wall base="#4A4E58">
    <path
      d="M -20 120 C 80 60, 200 200, 300 120 C 380 56, 460 140, 520 100
         L 520 300 L -20 300 Z"
      fill="#E4483C"
      opacity="0.85"
    />
    <path
      d="M -20 340 C 90 280, 180 420, 280 350 C 380 280, 470 400, 520 340
         L 520 560 L -20 560 Z"
      fill="#2F6FD0"
      opacity="0.8"
    />
    <path
      d="M 40 180 C 120 120, 200 260, 300 200"
      stroke="#F3C53E"
      strokeWidth="26"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 60 420 C 150 360, 240 500, 340 430"
      stroke="#6FCF6A"
      strokeWidth="22"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 90 500 L 180 560 M 300 480 L 380 546 M 210 90 L 300 42"
      stroke="#FFFFFF"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <rect width={WALL_W} height={WALL_H} fill="rgba(30,30,36,0.18)" />
  </Wall>
);

const Concrete: React.FC = () => (
  <Wall base="#A8A49C">
    {Array.from({ length: 16 }, (_, i) => i * 30).map((x) => (
      <g key={x}>
        <rect x={x} width="18" height={WALL_H} fill="rgba(126,122,114,0.45)" />
        <rect x={x + 18} width="12" height={WALL_H} fill="rgba(228,224,216,0.40)" />
      </g>
    ))}
    <rect width={WALL_W} height={WALL_H} fill="rgba(96,92,86,0.14)" />
    <path
      d="M 0 200 L 470 190 M 0 430 L 470 442"
      stroke="rgba(90,86,80,0.35)"
      strokeWidth="4"
    />
  </Wall>
);

const Tiles: React.FC = () => (
  <Wall base="#DCD5C6">
    <defs>
      <pattern id="w-tile" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#E6E0D2" />
        <rect x="3" y="3" width="74" height="74" fill="#CFC5B0" />
        <path
          d="M 40 14 L 66 40 L 40 66 L 14 40 Z"
          fill="#8E9BA8"
          opacity="0.75"
        />
        <circle cx="40" cy="40" r="9" fill="#E6E0D2" />
      </pattern>
    </defs>
    <rect width={WALL_W} height={WALL_H} fill="url(#w-tile)" />
    <rect width={WALL_W} height={WALL_H} fill="rgba(110,104,92,0.08)" />
  </Wall>
);

const RibbedMetal: React.FC = () => (
  <Wall base="#9DA3A9">
    {Array.from({ length: 12 }, (_, i) => i * 40).map((x) => (
      <g key={x}>
        <rect x={x} width="22" height={WALL_H} fill="#B8BEC4" />
        <rect x={x + 22} width="18" height={WALL_H} fill="#7C838A" />
        <rect x={x + 2} width="5" height={WALL_H} fill="rgba(255,255,255,0.55)" />
      </g>
    ))}
    <rect
      y="0"
      width={WALL_W}
      height={WALL_H}
      fill="url(#w-metal-sheen)"
      opacity="0.4"
    />
    <defs>
      <linearGradient id="w-metal-sheen" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#4C5259" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </Wall>
);

/**
 * The seven surfaces the wall behind the poster flip-cuts through. Ordered so
 * no two neighbours share a dominant hue - at three to five frames a hold, the
 * strobe only reads if consecutive frames are genuinely different.
 */
export const WALLS = [
  Floral,
  Wood,
  TealBoards,
  Graffiti,
  Concrete,
  Tiles,
  RibbedMetal,
];

/**
 * The framed poster: a thin dark frame, a wide cream mount and the same
 * calligraphic mark that is printed on the tee. It never moves - the whole
 * point of the shot is that the wall changes and the mark does not.
 */
export const FramedPoster: React.FC<{ width: number }> = ({ width }) => {
  const h = width * (1.34 / 1);

  return (
    <div
      style={{
        width,
        height: h,
        backgroundColor: "#2A2622",
        padding: 10,
        boxSizing: "border-box",
        boxShadow: "0 18px 30px rgba(24,20,16,0.34)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: CREAM,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CalligraphicMark width={width * 0.56} colour={INK} />
      </div>
    </div>
  );
};
