import React from "react";
import { ContactShadow, LacquerDefs, Specular } from "./common";

/**
 * The balance: a thin black beam on a black cone fulcrum, tipped down to the
 * left, with a tiny chrome ball on the low left end and a large mirror-black
 * sphere resting on the high right end.
 */
export const Seesaw: React.FC<{ size: number; tilt: number }> = ({ size, tilt }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 900 648" style={{ overflow: "visible" }}>
    <LacquerDefs id="see" angle={14} />
    <ContactShadow cx={478} cy={604} rx={236} ry={22} opacity={0.26} blur={24} />

    {/* Fulcrum cone. */}
    <path d="M450 596 L 388 596 L 450 356 L 512 596 Z" fill="url(#see-body)" />
    <path d="M450 356 L 512 596" stroke="#7C7C7C" strokeWidth={2.4} opacity={0.4} />

    {/* Beam, plus what sits on each end, all tilted together. */}
    <g transform={`rotate(${tilt} 450 350)`}>
      <rect x={110} y={338} width={680} height={24} rx={12} fill="url(#see-body)" />
      <rect x={140} y={343} width={600} height={5} rx={2.5} fill="#FFFFFF" opacity={0.3} />

      {/* Tiny chrome ball, low left end. */}
      <circle cx={150} cy={316} r={22} fill="url(#see-chrome)" />
      <circle cx={143} cy={308} r={6} fill="#FFFFFF" opacity={0.75} />

      {/* Large mirror-black sphere, high right end. */}
      <circle cx={704} cy={252} r={86} fill="url(#see-sphere)" />
      <Specular x={672} y={210} rx={26} ry={16} opacity={0.72} blur={5} rotate={-38} />
      <ellipse cx={716} cy={306} rx={44} ry={16} fill="#8E8E8E" opacity={0.2} style={{ filter: "blur(7px)" }} />
      <circle cx={704} cy={252} r={86} fill="none" stroke="#8A8A8A" strokeWidth={2} opacity={0.4} />
    </g>
  </svg>
);
