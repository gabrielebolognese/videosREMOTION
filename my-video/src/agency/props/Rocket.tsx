import React from "react";
import { ContactShadow, LacquerDefs, Specular } from "./common";

/**
 * Chrome-black lacquered toy rocket: mirror-highlighted body, matte black fins
 * and nozzle, chrome porthole ring. Drawn pointing straight up so the shot can
 * rotate it onto its diagonal.
 */
export const Rocket: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 2.05} viewBox="0 0 300 615" style={{ overflow: "visible" }}>
    <LacquerDefs id="rocket" angle={8} />
    <ContactShadow cx={168} cy={560} rx={132} ry={22} opacity={0.24} blur={22} />

    {/* Matte fins sit behind the body. */}
    <path d="M104 352 L 34 498 L 104 474 Z" fill="#141414" />
    <path d="M196 352 L 266 498 L 196 474 Z" fill="#141414" />
    <path d="M126 470 L 174 470 L 168 520 L 132 520 Z" fill="#0F0F0F" />

    {/* Nose and body in one lacquered piece. */}
    <path
      d="M104 168 C 104 66 130 8 150 8 C 170 8 196 66 196 168 L 196 468 C 196 480 186 488 174 488 L 126 488 C 114 488 104 480 104 468 Z"
      fill="url(#rocket-body)"
    />
    {/* Rim light along the top edge, separating black from the pale ground. */}
    <path
      d="M104 168 C 104 66 130 8 150 8 C 170 8 196 66 196 168"
      stroke="#9A9A9A"
      strokeWidth={3}
      fill="none"
      opacity={0.5}
    />

    <Specular x={125} y={250} rx={9} ry={182} opacity={0.5} blur={6} />
    <Specular x={178} y={196} rx={4} ry={96} opacity={0.28} blur={5} />

    {/* Chrome porthole. */}
    <circle cx={150} cy={236} r={40} fill="url(#rocket-chrome)" />
    <circle cx={150} cy={236} r={29} fill="#0B0B0B" />
    <ellipse cx={140} cy={224} rx={12} ry={7} fill="#FFFFFF" opacity={0.35} transform="rotate(-32 140 224)" />

    {/* Nozzle. */}
    <path d="M118 488 L 182 488 L 196 546 L 104 546 Z" fill="#101010" />
    <path d="M104 546 L 196 546" stroke="#5E5E5E" strokeWidth={3} opacity={0.55} />
  </svg>
);
