import React from "react";
import { AbsoluteFill } from "remotion";
import { blurStyle, drift, spin, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK } from "../lib/tokens";
import { AppTile, type Glyph } from "../props/AppTile";
import { PhotoPlaceholder } from "../props/Placeholder";

/** A dozen tiles orbiting the hand, at mixed depths. */
const TILES: { x: number; y: number; size: number; rot: number; rate: number; blur: number; kind: Glyph }[] = [
  { x: 92, y: 742, size: 128, rot: -16, rate: 5, blur: 5, kind: "play" },
  { x: 300, y: 640, size: 104, rot: 12, rate: -4, blur: 1.5, kind: "bubble" },
  { x: 520, y: 662, size: 136, rot: -8, rate: 6, blur: 0, kind: "globe" },
  { x: 742, y: 664, size: 112, rot: 18, rate: -5, blur: 1.5, kind: "camera" },
  { x: 892, y: 800, size: 122, rot: -22, rate: 4, blur: 6, kind: "share" },
  { x: 44, y: 986, size: 96, rot: 24, rate: -6, blur: 8, kind: "loop" },
  { x: 232, y: 902, size: 86, rot: -12, rate: 5, blur: 2, kind: "wedge" },
  { x: 660, y: 902, size: 92, rot: 14, rate: -4, blur: 2, kind: "grid" },
  { x: 918, y: 1032, size: 108, rot: -18, rate: 6, blur: 7, kind: "ring" },
  { x: 148, y: 1178, size: 80, rot: 8, rate: -5, blur: 4, kind: "bubble" },
  { x: 828, y: 1218, size: 88, rot: -14, rate: 5, blur: 5, kind: "play" },
  { x: 356, y: 1096, size: 74, rot: 20, rate: -7, blur: 3, kind: "ring" },
];

/**
 * SHOT 5 - 1.3s. "Platforms"
 *
 * Hard cut. The hand pushes up from the bottom edge with a dozen glossy tiles
 * tumbling around it in loose 3D, the ones near the frame edges drifting out
 * of focus. Every glyph is an abstract shape - no recognisable app icon and no
 * trademarked mark anywhere.
 *
 * The hand itself needs photography, so it is a labelled placeholder at the
 * size and position the real element will occupy.
 */
export const Shot05: React.FC = () => {
  const clock = useShot(4);
  if (!clock.visible) return null;

  const hand = whipIn(clock.local, 0, 0.6, { dy: 400, blur: 28 });
  const hd = drift(clock.frame, 5.1, 0.6);

  return (
    <AbsoluteFill>
      {TILES.map((t, i) => {
        const w = whipIn(clock.local, 0.02 + i * 0.018, 0.55, {
          dx: (540 - t.x) * 0.5,
          dy: (960 - t.y) * 0.5,
          rot: -40,
          blur: 34,
          scaleFrom: 0.6,
        });
        const d = drift(clock.frame, i * 1.7, 1.3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: t.x,
              top: t.y,
              opacity: w.opacity,
              transform: `translate(${w.x + d.x}px, ${w.y + d.y}px) rotate(${t.rot + w.rot + spin(clock.frame, t.rate)}deg) scale(${w.scale})`,
              ...blurStyle(w.blur + t.blur),
            }}
          >
            <AppTile size={t.size} kind={t.kind} id={`t5-${i}`} />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 330,
          top: 1436,
          opacity: hand.opacity,
          transform: `translate(${hd.x}px, ${hand.y + hd.y}px)`,
          ...blurStyle(hand.blur),
        }}
      >
        <PhotoPlaceholder name="photoreal greyscale hand, palm up, fingers spread" width={420} height={520} />
      </div>

      <SnapLine
        local={clock.local}
        at={0.05}
        text="Platforms"
        size={152}
        weight={900}
        colour={BLACK}
        place={{ left: 0, top: 452, width: 1080, align: "center" }}
        tracking={-0.045}
      />
    </AbsoluteFill>
  );
};
