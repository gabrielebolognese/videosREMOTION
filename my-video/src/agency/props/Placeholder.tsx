import React from "react";
import { SANS } from "../lib/tokens";

/**
 * A stand-in for an element that genuinely needs photography or a 3D render -
 * the photoreal hands and the marble statue.
 *
 * Neutral grey, at the exact size and position the real asset will occupy,
 * with its name in the middle. The layer is never dropped because its art is
 * missing and it is never faked with an emoji or an icon font.
 */
export const PhotoPlaceholder: React.FC<{
  name: string;
  width: number;
  height: number;
  radius?: number;
}> = ({ name, width, height, radius = 18 }) => (
  <div
    style={{
      width,
      height,
      boxSizing: "border-box",
      background: "#A9A8A4",
      border: "3px solid #78776F",
      borderRadius: radius,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 16,
      fontFamily: SANS,
      fontWeight: 600,
      fontSize: Math.max(11, Math.min(width, height) * 0.075),
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
      color: "#2B2B2B",
      boxShadow: "0 26px 44px rgba(120,119,111,0.28)",
    }}
  >
    {name}
  </div>
);
