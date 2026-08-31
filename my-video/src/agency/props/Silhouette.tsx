import React from "react";
import { ContactShadow } from "./common";

/**
 * Flat vector silhouette of a suited figure seen from the side, holding a
 * plain white sheet of paper with stubby rounded fingers. The body is solid
 * black; a glossy black-to-white gradient sweeps across the head and shoulder.
 */
export const Silhouette: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 1.72} viewBox="0 0 460 790" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="sil-sweep" x1="0.1" y1="1" x2="0.9" y2="0">
        <stop offset="0%" stopColor="#141414" />
        <stop offset="42%" stopColor="#1E1E1E" />
        <stop offset="74%" stopColor="#8E8E8E" />
        <stop offset="100%" stopColor="#EFEFEC" />
      </linearGradient>
      <linearGradient id="sil-paper" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DEDDD8" />
      </linearGradient>
    </defs>

    <ContactShadow cx={252} cy={772} rx={168} ry={20} opacity={0.2} blur={24} />

    {/* Torso and legs, solid black. */}
    <path
      d="M126 300 C 126 250 168 224 208 224 L 258 224 C 306 224 336 258 340 306
         L 356 560 C 358 596 340 618 308 620 L 176 620 C 144 618 126 596 128 560 Z"
      fill="#161616"
    />
    <path d="M150 612 L 340 612 L 352 782 L 296 782 L 268 660 L 236 782 L 178 782 Z" fill="#131313" />

    {/* Head and shoulder carry the gradient sweep. */}
    <path
      d="M196 46 C 262 46 300 92 300 148 C 300 200 268 236 224 240
         C 176 244 148 206 146 156 C 144 96 158 46 196 46 Z"
      fill="url(#sil-sweep)"
    />
    <path
      d="M208 224 L 258 224 C 300 224 330 250 340 296 L 250 316 C 214 306 186 282 180 250 Z"
      fill="url(#sil-sweep)"
      opacity={0.92}
    />

    {/* Forward arm, ending in stubby rounded fingers over the sheet. */}
    <path
      d="M320 328 C 372 336 402 372 408 424 L 412 486 C 414 512 396 528 374 526
         C 352 524 340 508 340 486 L 336 420 C 334 392 322 372 300 364 Z"
      fill="#161616"
    />
    <rect x={332} y={470} width={92} height={44} rx={22} fill="#171717" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={352 + i * 24} y={498} width={20} height={40} rx={10} fill="#171717" />
    ))}

    {/* The sheet of paper. */}
    <g transform="rotate(-7 300 560)">
      <rect x={214} y={468} width={236} height={168} rx={5} fill="url(#sil-paper)" />
      <rect x={214} y={468} width={236} height={168} rx={5} fill="none" stroke="#C9C8C3" strokeWidth={1.5} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={240} y={500 + i * 26} width={i === 3 ? 108 : 184} height={7} rx={3.5} fill="#C4C3BE" />
      ))}
    </g>
  </svg>
);
