import React from "react";
import { ContactShadow } from "./common";

const CX = 320;
const CY = 320;
const R_OUT = 292;
const R_MID = 226;
const R_IN = 158;

/** Annular sector path, angles in degrees. */
const sector = (r0: number, r1: number, a0: number, a1: number) => {
  const rad = (a: number) => (a * Math.PI) / 180;
  const pt = (r: number, a: number) => [CX + r * Math.cos(rad(a)), CY + r * Math.sin(rad(a))];
  const [x0, y0] = pt(r1, a0);
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r0, a1);
  const [x3, y3] = pt(r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x0} ${y0} A ${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
};

/** A tiny greyscale worker: at a desk, shaking hands, or looking at a phone. */
const Figure: React.FC<{ x: number; y: number; kind: number }> = ({ x, y, kind }) => (
  <g transform={`translate(${x} ${y})`} fill="#BFBEB9">
    <circle cx={0} cy={-9} r={3.4} />
    <path d="M-3.4 -5 h6.8 a3 3 0 0 1 3 3 v8 a2 2 0 0 1 -2 2 h-8.8 a2 2 0 0 1 -2 -2 v-8 a3 3 0 0 1 3 -3 z" />
    {kind === 0 ? <rect x={-11} y={7} width={22} height={2.6} rx={1.3} fill="#8E8D89" /> : null}
    {kind === 1 ? <rect x={4} y={-4} width={7} height={2.4} rx={1.2} fill="#9E9D99" /> : null}
    {kind === 2 ? <rect x={4} y={-7} width={2.6} height={5} rx={1.3} fill="#9E9D99" /> : null}
  </g>
);

/**
 * The sculptural looped letterform, cut open into room-cells.
 *
 * A thick lowercase-'e' style loop - a full ring with a crossbar and a mouth
 * opening at the lower right - sliced into two bands of small dark rooms, each
 * holding tiny figures at desks, shaking hands or looking at phones, like an
 * architectural cross-section.
 */
export const CellRing: React.FC<{ size: number }> = ({ size }) => {
  const cells: { path: string; a: number; r: number }[] = [];
  const STEP = 20;
  for (let a = -180; a < 180; a += STEP) {
    cells.push({ path: sector(R_MID + 3, R_OUT, a + 1.5, a + STEP - 1.5), a: a + STEP / 2, r: (R_MID + R_OUT) / 2 });
    cells.push({ path: sector(R_IN, R_MID - 3, a + 1.5, a + STEP - 1.5), a: a + STEP / 2, r: (R_IN + R_MID) / 2 });
  }

  return (
    <svg width={size} height={size} viewBox="0 0 640 640" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="ring-shell" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#4C4C4C" />
          <stop offset="40%" stopColor="#1D1D1D" />
          <stop offset="100%" stopColor="#0E0E0E" />
        </linearGradient>
      </defs>

      <ContactShadow cx={352} cy={606} rx={228} ry={26} opacity={0.22} blur={26} />

      {/* The solid shell the rooms are cut into. */}
      <circle cx={CX} cy={CY} r={R_OUT + 8} fill="url(#ring-shell)" />
      <circle cx={CX} cy={CY} r={R_IN - 8} fill="#F1F0EE" />
      {cells.map((c, i) => {
        const rad = (c.a * Math.PI) / 180;
        const fx = CX + c.r * Math.cos(rad);
        const fy = CY + c.r * Math.sin(rad);
        return (
          <g key={i}>
            <path d={c.path} fill="#1A1A1A" stroke="#3B3B3B" strokeWidth={1.6} />
            <Figure x={fx - 11} y={fy} kind={i % 3} />
            {i % 2 === 0 ? <Figure x={fx + 12} y={fy + 2} kind={(i + 1) % 3} /> : null}
          </g>
        );
      })}

      {/* Rim light along the top of the shell. */}
      <circle cx={CX} cy={CY} r={R_OUT + 8} fill="none" stroke="#9C9C9C" strokeWidth={2.6} opacity={0.42} />
    </svg>
  );
};
