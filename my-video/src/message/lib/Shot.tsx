import { AbsoluteFill } from "remotion";
import { CREAM } from "./tokens";

/**
 * One shot of the reel.
 *
 * Deliberately thin. The brief locks the camera off - there is no push, no
 * drift, no shake and no transition of any kind at the boundaries, so a shot
 * is just a backdrop, a collage layer above it, and a butt cut either side.
 * Everything that moves does so because a `Prop` or a `Line` inside moves.
 */
export const Shot: React.FC<{
  name: string;
  /** The flat sheet. Sits under the collage and never moves. */
  backdrop: React.ReactNode;
  /** Colour behind everything, so nothing can ever reveal black. */
  base?: string;
  /** Drawn above the collage - torn corners, arcs, anything overlapping. */
  overlay?: React.ReactNode;
  children: React.ReactNode;
}> = ({ name, backdrop, base = CREAM, overlay, children }) => {
  return (
    <AbsoluteFill name={name} style={{ backgroundColor: base }}>
      {backdrop}
      <AbsoluteFill name="Collage">{children}</AbsoluteFill>
      {overlay ? <AbsoluteFill name="Overlay">{overlay}</AbsoluteFill> : null}
    </AbsoluteFill>
  );
};
