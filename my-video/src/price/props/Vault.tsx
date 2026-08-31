import React from "react";
import { ChromeDefs, ContactShadow, Specular } from "./common";
import { LIME, LIME_HI, LIME_LOW, SANS } from "../lib/tokens";

const ID = "vault";

/** The two-way arrow engraved into each coin face. No text, no denomination. */
const SwapGlyph: React.FC<{ scale: number }> = ({ scale }) => (
  <g
    transform={`scale(${scale})`}
    stroke={LIME}
    strokeWidth={8}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  >
    <path d="M -34 -13 L 30 -13 M 18 -25 L 30 -13 L 18 -1" />
    <path d="M 34 15 L -30 15 M -18 3 L -30 15 L -18 27" />
  </g>
);

/**
 * A chrome coin. Turned rim, brushed face, and the green two-way arrow. The
 * moving highlight is passed in rather than derived here, so the scene can
 * sweep it across both coins from one clock.
 */
const Coin: React.FC<{ cx: number; cy: number; r: number; sweep: number }> = ({
  cx,
  cy,
  r,
  sweep,
}) => (
  <g transform={`translate(${cx} ${cy})`}>
    <circle r={r} fill={`url(#${ID}-disc)`} />
    <circle r={r} fill={`url(#${ID}-brush)`} opacity={0.5} />
    {/* turned rim */}
    <circle r={r - 5} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={3} />
    <circle r={r - 12} fill="none" stroke="rgba(96,102,110,0.35)" strokeWidth={5} />
    <SwapGlyph scale={r / 62} />
    {/* the highlight that travels across the chrome */}
    <g clipPath={`url(#${ID}-coin-${Math.round(r)})`}>
      <rect
        x={-r + sweep * 2 * r - r * 0.42}
        y={-r}
        width={r * 0.84}
        height={r * 2}
        fill="#FFFFFF"
        opacity={0.5}
        transform="skewX(-16)"
        style={{ filter: "blur(9px)" }}
      />
    </g>
  </g>
);

/**
 * The hero of shot 1: a glossy lime wallet-vault icon - rounded-square body,
 * brushed chrome rim, a chrome dial at the upper right of the face, a short
 * embossed three-letter mark, a fan of pale note edges peeking from the top
 * seam, and two chrome swap coins tucked in behind.
 *
 * `sweep` runs 0 to 1 and drives the chrome highlight across the coins.
 */
export const Vault: React.FC<{ width: number; sweep: number }> = ({ width, sweep }) => (
  <svg
    width={width}
    height={width * (520 / 560)}
    viewBox="0 0 560 520"
    style={{ overflow: "visible" }}
  >
    <defs>
      <ChromeDefs id={ID} />
      <clipPath id={`${ID}-coin-84`}>
        <circle r={84} />
      </clipPath>
      <clipPath id={`${ID}-coin-70`}>
        <circle r={70} />
      </clipPath>
      <linearGradient id={`${ID}-body`} x1="0.08" y1="0" x2="0.86" y2="1">
        <stop offset="0%" stopColor={LIME_HI} />
        <stop offset="26%" stopColor={LIME} />
        <stop offset="70%" stopColor="#5FE842" />
        <stop offset="100%" stopColor={LIME_LOW} />
      </linearGradient>
      <linearGradient id={`${ID}-panel`} x1="0.1" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#8DFF72" />
        <stop offset="55%" stopColor="#66F04A" />
        <stop offset="100%" stopColor="#45D02F" />
      </linearGradient>
      <linearGradient id={`${ID}-note`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBFAF5" />
        <stop offset="100%" stopColor="#DCDCD3" />
      </linearGradient>
    </defs>

    <ContactShadow cx={252} cy={470} rx={168} ry={25} />

    <Coin cx={456} cy={190} r={84} sweep={sweep} />
    <Coin cx={438} cy={312} r={70} sweep={1 - sweep} />

    {/* The thin fan of pale note edges, drawn before the body so they read as
        sitting down inside the top seam rather than resting on it. */}
    <g>
      {[
        { x: 128, w: 232, a: -4.5 },
        { x: 146, w: 208, a: -1.5 },
        { x: 138, w: 220, a: 1.8 },
        { x: 156, w: 190, a: 5.2 },
      ].map((n, i) => (
        <g key={i} transform={`rotate(${n.a} 244 132)`}>
          <rect
            x={n.x}
            y={100 + i * 3}
            width={n.w}
            height={17}
            rx={8}
            fill={`url(#${ID}-note)`}
          />
          <rect
            x={n.x}
            y={100 + i * 3}
            width={n.w}
            height={17}
            rx={8}
            fill="none"
            stroke="rgba(120,124,130,0.32)"
            strokeWidth={1.2}
          />
        </g>
      ))}
    </g>

    {/* Body. */}
    <rect x={76} y={120} width={336} height={306} rx={68} fill={`url(#${ID}-body)`} />
    {/* Brushed chrome rim. */}
    <rect
      x={83}
      y={127}
      width={322}
      height={292}
      rx={62}
      fill="none"
      stroke={`url(#${ID}-chrome)`}
      strokeWidth={14}
    />
    <rect
      x={83}
      y={127}
      width={322}
      height={292}
      rx={62}
      fill="none"
      stroke={`url(#${ID}-brush)`}
      strokeWidth={14}
      opacity={0.45}
    />
    {/* Front panel, set into the face. */}
    <rect x={112} y={166} width={264} height={222} rx={48} fill={`url(#${ID}-panel)`} />
    <rect
      x={112}
      y={166}
      width={264}
      height={222}
      rx={48}
      fill="none"
      stroke="rgba(24,80,14,0.16)"
      strokeWidth={2.5}
    />

    {/* The embossed three-letter mark: a light copy above, a dark copy below. */}
    <g
      style={{ fontFamily: SANS, fontSize: 64, fontWeight: 800, letterSpacing: "2px" }}
      textAnchor="middle"
    >
      <text x={244} y={342} fill="#D6FFC6" opacity={0.85}>VLT</text>
      <text x={244} y={347} fill="#1E7A10" opacity={0.45}>VLT</text>
      <text x={244} y={344.5} fill="#3FA82C">VLT</text>
    </g>

    {/* Chrome dial, upper right of the face. */}
    <g transform="translate(338 206)">
      <circle r={37} fill={`url(#${ID}-disc)`} />
      <circle r={37} fill={`url(#${ID}-brush)`} opacity={0.55} />
      <circle r={30} fill="none" stroke="rgba(96,102,110,0.4)" strokeWidth={3} />
      <g stroke="rgba(72,78,86,0.55)" strokeWidth={2.4} strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={0}
            y1={-36}
            x2={0}
            y2={-30}
            transform={`rotate(${i * 30})`}
          />
        ))}
      </g>
      <line x1={0} y1={-22} x2={0} y2={12} stroke="#3B4048" strokeWidth={5} strokeLinecap="round" />
      <circle r={5} fill="#3B4048" />
    </g>

    {/* The broad soft key, landing on the upper left of the body. */}
    <Specular cx={168} cy={198} rx={104} ry={54} rotate={-30} opacity={0.38} blur={16} />
    <Specular cx={132} cy={168} rx={44} ry={18} rotate={-34} opacity={0.55} blur={7} />
  </svg>
);
