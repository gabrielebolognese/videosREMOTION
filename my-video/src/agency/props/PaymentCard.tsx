import React from "react";
import { LacquerDefs, Specular } from "./common";
import { SANS } from "../lib/tokens";

/**
 * A blank premium payment card: dark grey, embossed numerals, a chip and a
 * contactless wave. Deliberately unbranded - no issuer mark, no network mark,
 * no logotype of any kind.
 */
export const PaymentCard: React.FC<{ size: number; id: string }> = ({ size, id }) => (
  <svg width={size} height={size * 0.632} viewBox="0 0 560 354" style={{ overflow: "visible" }}>
    <LacquerDefs id={id} angle={18} />
    <defs>
      <linearGradient id={`${id}-plate`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3C3C3C" />
        <stop offset="34%" stopColor="#232323" />
        <stop offset="62%" stopColor="#4A4A4A" />
        <stop offset="100%" stopColor="#1C1C1C" />
      </linearGradient>
    </defs>

    <rect x={0} y={0} width={560} height={354} rx={30} fill={`url(#${id}-plate)`} />
    <rect x={0} y={0} width={560} height={354} rx={30} fill="none" stroke="#6C6C6C" strokeWidth={2} opacity={0.45} />
    <Specular x={132} y={100} rx={140} ry={26} opacity={0.16} blur={20} rotate={-20} />

    {/* Chip. */}
    <rect x={52} y={112} width={86} height={66} rx={11} fill={`url(#${id}-chrome)`} />
    <g stroke="#5A5A5A" strokeWidth={2.4} opacity={0.75}>
      <line x1={52} y1={134} x2={138} y2={134} />
      <line x1={52} y1={156} x2={138} y2={156} />
      <line x1={95} y1={112} x2={95} y2={178} />
    </g>

    {/* Contactless wave. */}
    <g fill="none" stroke="#C9C9C9" strokeWidth={7} strokeLinecap="round" opacity={0.75}>
      <path d="M178 128 C 196 146 196 174 178 192" />
      <path d="M200 114 C 226 146 226 174 200 206" />
      <path d="M222 100 C 256 144 256 176 222 220" />
    </g>

    {/* Embossed numerals: a light copy above and a dark copy below the face. */}
    <g style={{ fontFamily: SANS, fontSize: 44, fontWeight: 600, letterSpacing: "3px" }}>
      <text x={52} y={266} fill="#6E6E6E" opacity={0.9}>0000 0000 0000 0000</text>
      <text x={54} y={268} fill="#0E0E0E" opacity={0.55}>0000 0000 0000 0000</text>
      <text x={53} y={267} fill="#4A4A4A">0000 0000 0000 0000</text>
    </g>
    <g style={{ fontFamily: SANS, fontSize: 24, fontWeight: 500, letterSpacing: "2px" }}>
      <text x={52} y={316} fill="#585858">00 / 00</text>
    </g>
  </svg>
);
