import React from "react";
import { LINE_HEIGHT, SANS, TRACK_DEFAULT } from "./tokens";

/**
 * Stand-in for a 3D render that does not exist yet.
 *
 * A neutral grey plate at the size and position the finished art will occupy,
 * with the asset name in the middle. The layer is never dropped just because
 * its art is missing, and it is never faked with an emoji or an icon - if the
 * plate is on screen, the real render will be too.
 */
export const Placeholder: React.FC<{
  name: string;
  width: number;
  height: number;
}> = ({ name, width, height }) => (
  <div
    style={{
      width,
      height,
      boxSizing: "border-box",
      backgroundColor: "#A8A8A8",
      border: "3px solid #7C7C7C",
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 28,
      fontFamily: SANS,
      fontWeight: 700,
      fontSize: 34,
      letterSpacing: `${TRACK_DEFAULT}em`,
      lineHeight: LINE_HEIGHT,
      color: "#3C3C3C",
    }}
  >
    {name}
  </div>
);
