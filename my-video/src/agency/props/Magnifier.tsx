import React from "react";
import { ContactShadow, GridPatch, LacquerDefs, Specular } from "./common";

/**
 * Magnifying glass: thick glossy black rim, chrome ferrule, matte black
 * handle, clear lens.
 *
 * The lens genuinely magnifies - a scaled copy of the construction lattice is
 * clipped inside it and counter-rotated by the prop's own angle, so the grid
 * stays world-locked while the glass tilts.
 */
export const Magnifier: React.FC<{ size: number; counterRotate?: number }> = ({
  size,
  counterRotate = 0,
}) => (
  <svg width={size} height={size * 1.42} viewBox="0 0 620 880" style={{ overflow: "visible" }}>
    <LacquerDefs id="mag" angle={20} />
    <ContactShadow cx={330} cy={820} rx={210} ry={26} opacity={0.2} blur={26} />

    <clipPath id="mag-lens">
      <circle cx={300} cy={300} r={196} />
    </clipPath>

    {/* Clear lens: a faint sheen plus the magnified lattice showing through. */}
    <circle cx={300} cy={300} r={196} fill="#FBFAF7" opacity={0.34} />
    <g clipPath="url(#mag-lens)">
      <g transform={`translate(300 300) rotate(${-counterRotate}) scale(1.9)`}>
        <GridPatch size={420} step={106} />
      </g>
      <ellipse cx={222} cy={200} rx={112} ry={64} fill="#FFFFFF" opacity={0.3} transform="rotate(-32 222 200)" style={{ filter: "blur(16px)" }} />
    </g>

    {/* Handle, behind the rim. */}
    <rect x={366} y={470} width={74} height={330} rx={37} fill="#141414" transform="rotate(-32 403 635)" />
    <rect x={392} y={492} width={12} height={286} rx={6} fill="#4A4A4A" opacity={0.5} transform="rotate(-32 398 635)" />

    {/* Chrome ferrule. */}
    <rect x={368} y={432} width={72} height={92} rx={16} fill="url(#mag-chrome)" transform="rotate(-32 404 478)" />

    {/* Thick glossy rim. */}
    <circle cx={300} cy={300} r={216} fill="none" stroke="url(#mag-rim)" strokeWidth={42} />
    <circle cx={300} cy={300} r={236} fill="none" stroke="#8E8E8E" strokeWidth={2.5} opacity={0.45} />
    <Specular x={168} y={182} rx={16} ry={62} opacity={0.6} blur={7} rotate={-42} />
    <Specular x={432} y={420} rx={9} ry={40} opacity={0.32} blur={6} rotate={-42} />
  </svg>
);
