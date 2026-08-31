import React from "react";
import { FONT } from "./tokens";

/**
 * A stand-in for artwork that does not exist yet.
 *
 * Neutral grey, at the exact size and position the real asset will occupy,
 * with its name rendered in the middle. A layer is never dropped because its
 * art is missing, and it is never faked with an emoji or an icon font.
 */
export const Placeholder: React.FC<{
  name: string;
  width: number;
  height: number;
  radius?: number;
  style?: React.CSSProperties;
}> = ({ name, width, height, radius, style }) => {
  // Keep the label legible from a 70px inline mark up to a 360px lockup.
  const label = Math.max(7, Math.min(width, height) * 0.15);

  return (
    <div
      style={{
        width,
        height,
        boxSizing: "border-box",
        background: "#9C9C9C",
        border: `${Math.max(1, width * 0.012)}px solid #6F6F6F`,
        borderRadius: radius ?? width * 0.24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: width * 0.08,
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: label,
        lineHeight: 1.05,
        color: "#2E2E2E",
        ...style,
      }}
    >
      {name}
    </div>
  );
};
