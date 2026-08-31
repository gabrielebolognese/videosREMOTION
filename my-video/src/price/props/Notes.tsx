import React from "react";
import { ContactShadow } from "./common";
import { BAND_BLUE, NOTE_EDGE, NOTE_INK } from "../lib/tokens";

const ID = "notes";

/** Twenty-five cut edges, so the front of the bundle reads as a real stack. */
const LAYERS = Array.from({ length: 25 }, (_, i) => i);

/**
 * The hero of shot 2: a strapped bundle of dark navy-black banknotes held by
 * a single royal-blue paper band.
 *
 * The engraving is deliberately empty - guilloche waves, a blank oval
 * medallion and two rosettes. No portrait, no denomination, no national mark
 * and no readable type of any kind appears anywhere on it.
 */
export const Notes: React.FC<{ width: number }> = ({ width }) => (
  <svg
    width={width}
    height={width * (340 / 560)}
    viewBox="0 0 560 340"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id={`${ID}-top`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#252B3C" />
        <stop offset="52%" stopColor="#171C29" />
        <stop offset="100%" stopColor={NOTE_INK} />
      </linearGradient>
      <linearGradient id={`${ID}-side`} x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stopColor="#141826" />
        <stop offset="100%" stopColor="#0A0D15" />
      </linearGradient>
      <linearGradient id={`${ID}-band`} x1="0" y1="0" x2="0.2" y2="1">
        <stop offset="0%" stopColor="#6A96E4" />
        <stop offset="46%" stopColor={BAND_BLUE} />
        <stop offset="100%" stopColor="#2B54A4" />
      </linearGradient>
      <linearGradient id={`${ID}-form`} x1="0.1" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
        <stop offset="46%" stopColor="rgba(255,255,255,0.02)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.30)" />
      </linearGradient>
      {/* Guilloche waves - the only engraving on the face. */}
      <pattern id={`${ID}-wave`} width="30" height="13" patternUnits="userSpaceOnUse">
        <path
          d="M 0 6.5 C 7.5 -1, 22.5 14, 30 6.5"
          stroke="rgba(150,168,214,0.32)"
          strokeWidth="1"
          fill="none"
        />
      </pattern>
      <pattern
        id={`${ID}-hatch`}
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(26)"
      >
        <path d="M 0 0 L 0 8" stroke="rgba(122,142,190,0.20)" strokeWidth="1" />
      </pattern>
      <clipPath id={`${ID}-topface`}>
        <path d="M 84 120 L 156 62 L 500 62 L 428 120 Z" />
      </clipPath>
    </defs>

    <ContactShadow cx={268} cy={288} rx={196} ry={22} opacity={0.26} blur={22} />

    {/* Top face - the printed face of the topmost note. */}
    <path d="M 84 120 L 156 62 L 500 62 L 428 120 Z" fill={`url(#${ID}-top)`} />
    <g clipPath={`url(#${ID}-topface)`}>
      <rect x="70" y="55" width="450" height="75" fill={`url(#${ID}-wave)`} />
      <rect x="70" y="55" width="450" height="75" fill={`url(#${ID}-hatch)`} opacity="0.7" />
      {/* Blank oval medallion, where a portrait would otherwise sit. */}
      <ellipse
        cx="222"
        cy="92"
        rx="34"
        ry="21"
        fill="none"
        stroke="rgba(150,168,214,0.45)"
        strokeWidth="1.6"
      />
      <ellipse
        cx="222"
        cy="92"
        rx="26"
        ry="15"
        fill="none"
        stroke="rgba(150,168,214,0.26)"
        strokeWidth="1.2"
      />
      {/* Two rosettes. Rings only - nothing to read. */}
      {[368, 434].map((cx) => (
        <g key={cx}>
          <ellipse
            cx={cx}
            cy="90"
            rx="22"
            ry="14"
            fill="none"
            stroke="rgba(150,168,214,0.42)"
            strokeWidth="1.5"
          />
          <ellipse
            cx={cx}
            cy="90"
            rx="13"
            ry="8"
            fill="none"
            stroke="rgba(150,168,214,0.28)"
            strokeWidth="3"
            strokeDasharray="3 4"
          />
        </g>
      ))}
      <path
        d="M 100 114 L 486 114"
        stroke="rgba(150,168,214,0.24)"
        strokeWidth="1.2"
      />
    </g>
    <path
      d="M 84 120 L 156 62 L 500 62 L 428 120 Z"
      fill="none"
      stroke="rgba(150,168,214,0.30)"
      strokeWidth="1.6"
    />

    {/* Right side face, showing the depth of the stack. */}
    <path d="M 428 120 L 500 62 L 500 212 L 428 270 Z" fill={`url(#${ID}-side)`} />
    {LAYERS.map((i) => (
      <path
        key={`s${i}`}
        d={`M 428 ${128 + i * 5.6} L 500 ${70 + i * 5.6}`}
        stroke="rgba(160,172,198,0.16)"
        strokeWidth="1.1"
      />
    ))}

    {/* Front face - the cut edges. */}
    <path d="M 84 120 L 428 120 L 428 270 L 84 270 Z" fill="#0D111A" />
    {LAYERS.map((i) => (
      <rect
        key={`f${i}`}
        x="84"
        y={124 + i * 5.7}
        width="344"
        height="2.6"
        fill={i % 2 === 0 ? NOTE_EDGE : "rgba(11,14,21,0.9)"}
        opacity={i % 2 === 0 ? 0.72 : 1}
      />
    ))}
    <path
      d="M 84 120 L 428 120 L 428 270 L 84 270 Z"
      fill="none"
      stroke="rgba(150,168,214,0.22)"
      strokeWidth="1.6"
    />

    {/* The single royal-blue paper band, wrapping the short axis. */}
    <path d="M 200 120 L 272 62 L 330 62 L 258 120 Z" fill="#5A85D8" />
    <path
      d="M 200 120 L 272 62 L 330 62 L 258 120 Z"
      fill="none"
      stroke="rgba(20,40,88,0.5)"
      strokeWidth="1.4"
    />
    <rect x="200" y="120" width="58" height="150" fill={`url(#${ID}-band)`} />
    <rect
      x="200"
      y="120"
      width="58"
      height="150"
      fill="none"
      stroke="rgba(20,40,88,0.5)"
      strokeWidth="1.4"
    />
    {/* A blind-embossed rule down the band. Still nothing to read. */}
    <line
      x1="229"
      y1="136"
      x2="229"
      y2="256"
      stroke="rgba(255,255,255,0.28)"
      strokeWidth="2"
      strokeDasharray="10 9"
    />

    {/* Form shading across the whole solid, so the three faces read as one. */}
    <path
      d="M 84 120 L 156 62 L 500 62 L 500 212 L 428 270 L 84 270 Z"
      fill={`url(#${ID}-form)`}
    />
  </svg>
);
