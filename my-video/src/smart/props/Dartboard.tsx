import React from "react";

const C = 200;

/** Annular sector between two radii, angles in degrees, clockwise. */
const sector = (r0: number, r1: number, a0: number, a1: number) => {
  const rad = (a: number) => (a * Math.PI) / 180;
  const pt = (r: number, a: number) => [
    C + r * Math.cos(rad(a)),
    C + r * Math.sin(rad(a)),
  ];
  const [x0, y0] = pt(r1, a0);
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r0, a1);
  const [x3, y3] = pt(r0, a0);
  return `M${x0} ${y0} A ${r1} ${r1} 0 0 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 0 0 ${x3} ${y3} Z`;
};

const SEGMENTS = Array.from({ length: 20 }, (_, i) => i);
const STEP = 18;

/**
 * The monochrome dartboard of shot 5. No colour anywhere: the beds alternate
 * bone white and near black, the doubles and trebles alternate white and mid
 * grey, and the whole face is lit from inside rather than from the room.
 */
export const Dartboard: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 400 400"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <radialGradient id="dart-bloom" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0.16" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="dart-rim" cx="0.35" cy="0.28" r="0.85">
        <stop offset="0%" stopColor="#3A3A3A" />
        <stop offset="70%" stopColor="#141414" />
        <stop offset="100%" stopColor="#050505" />
      </radialGradient>
    </defs>

    {/* the halo the board throws into the void */}
    <circle cx={C} cy={C} r={300} fill="url(#dart-bloom)" />

    {/* outer surround with the number pips */}
    <circle cx={C} cy={C} r={192} fill="url(#dart-rim)" />
    <circle
      cx={C}
      cy={C}
      r={192}
      fill="none"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth={3}
    />
    {SEGMENTS.map((i) => {
      const a = ((i * STEP - 81) * Math.PI) / 180;
      return (
        <rect
          key={`pip${i}`}
          x={C + Math.cos(a) * 178 - 4}
          y={C + Math.sin(a) * 178 - 9}
          width={8}
          height={18}
          rx={3}
          fill="rgba(255,255,255,0.8)"
          style={{
            rotate: `${i * STEP - 81 + 90}deg`,
            transformOrigin: `${C + Math.cos(a) * 178}px ${C + Math.sin(a) * 178}px`,
          }}
        />
      );
    })}

    {/* the four playing bands */}
    {SEGMENTS.map((i) => {
      const a0 = i * STEP - 90;
      const a1 = a0 + STEP;
      const light = i % 2 === 0;
      return (
        <g key={i}>
          <path d={sector(96, 150, a0, a1)} fill={light ? "#EDEDED" : "#232323"} />
          <path d={sector(40, 88, a0, a1)} fill={light ? "#EDEDED" : "#232323"} />
          <path d={sector(150, 166, a0, a1)} fill={light ? "#FFFFFF" : "#8E8E8E"} />
          <path d={sector(88, 96, a0, a1)} fill={light ? "#FFFFFF" : "#8E8E8E"} />
        </g>
      );
    })}

    {/* spider wires */}
    <g stroke="rgba(255,255,255,0.75)" strokeWidth={1.6}>
      {SEGMENTS.map((i) => {
        const a = ((i * STEP - 90) * Math.PI) / 180;
        return (
          <line
            key={`w${i}`}
            x1={C + Math.cos(a) * 26}
            y1={C + Math.sin(a) * 26}
            x2={C + Math.cos(a) * 166}
            y2={C + Math.sin(a) * 166}
          />
        );
      })}
      <circle cx={C} cy={C} r={166} fill="none" />
      <circle cx={C} cy={C} r={150} fill="none" />
      <circle cx={C} cy={C} r={96} fill="none" />
      <circle cx={C} cy={C} r={88} fill="none" />
      <circle cx={C} cy={C} r={40} fill="none" />
    </g>

    {/* bull */}
    <circle cx={C} cy={C} r={26} fill="#9C9C9C" />
    <circle cx={C} cy={C} r={26} fill="none" stroke="#FFFFFF" strokeWidth={2} />
    <circle cx={C} cy={C} r={12} fill="#FFFFFF" />

    {/* soft inner bloom over the face */}
    <circle cx={C} cy={C} r={192} fill="url(#dart-bloom)" opacity={0.5} />
  </svg>
);

/**
 * A single dart, drawn tip-first at the origin and running out along +x:
 * steel point, knurled barrel, thin stem, folded white flight.
 */
export const Dart: React.FC<{ length: number }> = ({ length }) => (
  <svg
    width={length}
    height={length * (72 / 240)}
    viewBox="0 0 240 72"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="dart-barrel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F2F2F2" />
        <stop offset="42%" stopColor="#9A9A9A" />
        <stop offset="100%" stopColor="#3A3A3A" />
      </linearGradient>
    </defs>
    {/* point */}
    <path d="M 0 36 L 44 29 L 44 43 Z" fill="#D9D9D9" />
    {/* barrel */}
    <rect x={44} y={26} width={92} height={20} rx={7} fill="url(#dart-barrel)" />
    <g stroke="rgba(0,0,0,0.45)" strokeWidth={2.4}>
      {[58, 68, 78, 88, 98, 108, 118].map((x) => (
        <line key={x} x1={x} y1={28} x2={x} y2={44} />
      ))}
    </g>
    {/* stem */}
    <rect x={136} y={32} width={38} height={8} rx={4} fill="#6E6E6E" />
    {/* folded flight */}
    <path d="M 172 36 L 238 6 L 238 36 Z" fill="#FFFFFF" />
    <path d="M 172 36 L 238 66 L 238 36 Z" fill="#C9C9C9" />
    <path
      d="M 172 36 L 238 6 M 172 36 L 238 66"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={2}
    />
  </svg>
);
