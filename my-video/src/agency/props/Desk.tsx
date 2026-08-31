import React from "react";
import { ContactShadow, LacquerDefs, Specular } from "./common";

/** A modern laptop, open, greyscale. The statue's hand rests on the keys. */
export const Laptop: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 560 404" style={{ overflow: "visible" }}>
    <LacquerDefs id="laptop" angle={10} />
    <ContactShadow cx={300} cy={382} rx={224} ry={18} opacity={0.24} blur={20} />

    {/* Screen. */}
    <g transform="skewX(-9)">
      <rect x={96} y={18} width={356} height={244} rx={12} fill="#1B1B1B" />
      <rect x={110} y={32} width={328} height={212} rx={6} fill="#2E2E2E" />
      <Specular x={186} y={78} rx={94} ry={22} opacity={0.14} blur={16} rotate={-16} />
    </g>

    {/* Base and keys. */}
    <path d="M56 268 L 500 268 L 548 352 L 8 352 Z" fill="url(#laptop-body)" />
    <path d="M56 268 L 500 268" stroke="#8E8E8E" strokeWidth={2.4} opacity={0.5} />
    <g fill="#3A3A3A">
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 13 }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={82 + c * 30 + r * 5}
            y={282 + r * 16}
            width={22}
            height={11}
            rx={3}
          />
        )),
      )}
    </g>
    <rect x={214} y={348} width={132} height={9} rx={4.5} fill="#2A2A2A" />
  </svg>
);

/** The slim stylus the philosopher holds to his lips. */
export const Stylus: React.FC<{ length: number }> = ({ length }) => (
  <svg width={length} height={length * 0.16} viewBox="0 0 300 48" style={{ overflow: "visible" }}>
    <LacquerDefs id="stylus" angle={90} />
    <rect x={20} y={16} width={252} height={17} rx={8.5} fill="url(#stylus-body)" />
    <path d="M20 24.5 L 2 24.5 L 20 16 Z" fill="#C9C9C9" />
    <rect x={236} y={16} width={30} height={17} rx={8.5} fill="url(#stylus-chrome)" />
    <rect x={44} y={19} width={180} height={4} rx={2} fill="#FFFFFF" opacity={0.34} />
  </svg>
);
