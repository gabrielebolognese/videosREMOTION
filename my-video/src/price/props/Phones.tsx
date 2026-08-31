import React from "react";

const ID = "phones";

/** Six backs, each a slightly different grey, so the studio light reads. */
const PHONES = [
  { a: 0, body: "#F1F1F1", low: "#B4B4B4" },
  { a: 60, body: "#D9D9D9", low: "#9C9C9C" },
  { a: 120, body: "#BDBDBD", low: "#7E7E7E" },
  { a: 180, body: "#A6A6A6", low: "#6C6C6C" },
  { a: 240, body: "#C6C6C6", low: "#8A8A8A" },
  { a: 300, body: "#E4E4E4", low: "#A6A6A6" },
];

/** How far each phone's centre sits from the middle of the pinwheel. */
const RADIUS = 126;

/** One unbranded phone, seen from the back. No mark anywhere on it. */
const Phone: React.FC<{ low: string; index: number }> = ({ low, index }) => (
  <g>
    <rect
      x={-55}
      y={-114}
      width={110}
      height={228}
      rx={16}
      fill={`url(#${ID}-body-${index})`}
    />
    <rect
      x={-55}
      y={-114}
      width={110}
      height={228}
      rx={16}
      fill="none"
      stroke={low}
      strokeWidth={1.6}
    />
    {/* Raised dual-camera module, set into one corner of the back. */}
    <rect x={-41} y={-100} width={44} height={64} rx={13} fill={`url(#${ID}-mod)`} />
    <rect
      x={-41}
      y={-100}
      width={44}
      height={64}
      rx={13}
      fill="none"
      stroke="rgba(60,60,60,0.35)"
      strokeWidth={1.2}
    />
    {[-80, -56].map((cy) => (
      <g key={cy}>
        <circle cx={-19} cy={cy} r={11.5} fill={`url(#${ID}-ring)`} />
        <circle cx={-19} cy={cy} r={7.5} fill={`url(#${ID}-glass)`} />
        <circle cx={-21.5} cy={cy - 3} r={2.4} fill="#FFFFFF" opacity={0.7} />
      </g>
    ))}
    {/* Specular running down the long edge. */}
    <rect
      x={-49}
      y={-104}
      width={11}
      height={208}
      rx={5.5}
      fill="#FFFFFF"
      opacity={0.4}
      style={{ filter: "blur(6px)" }}
    />
  </g>
);

/**
 * The hero of shot 7: a monochrome studio photograph of six unbranded
 * smartphones shot from the back and fanned into a pinwheel, presented as a
 * tall rectangular panel with a soft drop shadow to its lower right.
 */
export const PhonePanel: React.FC<{ height: number }> = ({ height }) => (
  <svg
    width={height * (460 / 760)}
    height={height}
    viewBox="0 0 460 760"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id={`${ID}-plate`} x1="0.15" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stopColor="#F6F6F6" />
        <stop offset="46%" stopColor="#DCDCDC" />
        <stop offset="100%" stopColor="#A6A6A6" />
      </linearGradient>
      <radialGradient id={`${ID}-core`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="58%" stopColor="rgba(255,255,255,0.65)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <linearGradient id={`${ID}-mod`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#6E6E6E" />
        <stop offset="100%" stopColor="#3A3A3A" />
      </linearGradient>
      <linearGradient id={`${ID}-ring`} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#FCFCFC" />
        <stop offset="34%" stopColor="#9A9A9A" />
        <stop offset="66%" stopColor="#EDEDED" />
        <stop offset="100%" stopColor="#7A7A7A" />
      </linearGradient>
      <radialGradient id={`${ID}-glass`} cx="0.32" cy="0.28" r="0.8">
        <stop offset="0%" stopColor="#5C5C5C" />
        <stop offset="60%" stopColor="#1C1C1C" />
        <stop offset="100%" stopColor="#0C0C0C" />
      </radialGradient>
      {PHONES.map((p, i) => (
        <linearGradient key={i} id={`${ID}-body-${i}`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={p.body} />
          <stop offset="62%" stopColor={p.low} />
          <stop offset="100%" stopColor="#6F6F6F" />
        </linearGradient>
      ))}
      <clipPath id={`${ID}-frame`}>
        <rect x="0" y="0" width="460" height="760" rx="6" />
      </clipPath>
    </defs>

    {/* Drop shadow, thrown to the lower right. */}
    <rect
      x="16"
      y="20"
      width="460"
      height="760"
      rx="6"
      fill="#6A6E74"
      opacity="0.34"
      style={{ filter: "blur(24px)" }}
    />

    <g clipPath={`url(#${ID}-frame)`}>
      <rect x="0" y="0" width="460" height="760" fill={`url(#${ID}-plate)`} />
      {/* The bright white core the pinwheel turns around. */}
      <circle cx="230" cy="380" r="215" fill={`url(#${ID}-core)`} />

      <g transform="translate(230 380)">
        {PHONES.map((p, i) => (
          <g
            key={i}
            transform={`rotate(${p.a}) translate(0 ${-RADIUS}) rotate(26)`}
            style={{ filter: "drop-shadow(4px 9px 12px rgba(70,70,70,0.42))" }}
          >
            <Phone low={p.low} index={i} />
          </g>
        ))}
      </g>

      {/* A last bloom in the middle, so the centre stays the brightest thing. */}
      <circle cx="230" cy="380" r="66" fill="#FFFFFF" opacity="0.8" style={{ filter: "blur(24px)" }} />
      {/* Photographic falloff into the corners. Greyscale throughout. */}
      <rect
        x="0"
        y="0"
        width="460"
        height="760"
        fill="#2C2C2C"
        opacity="0.22"
        style={{
          maskImage:
            "radial-gradient(62% 46% at 50% 50%, rgba(0,0,0,0) 40%, #000 100%)",
          WebkitMaskImage:
            "radial-gradient(62% 46% at 50% 50%, rgba(0,0,0,0) 40%, #000 100%)",
        }}
      />
    </g>
  </svg>
);
