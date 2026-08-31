import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { blurStyle, drift, OUT, whipIn } from "../lib/motion";
import { useShot } from "../lib/shot";
import { SnapLine } from "../lib/Type";
import { BLACK, dur, GREY } from "../lib/tokens";
import { JigsawPiece } from "../props/Jigsaw";
import { PhotoPlaceholder } from "../props/Placeholder";

/**
 * SHOT 11 - 1.4s. "They create / Activity"
 *
 * Hard cut. Two hands push in from the left and right holding jigsaw pieces
 * that move toward each other and stop just short of locking - the gap is the
 * point of the shot, so they hover there with a small parallax drift.
 *
 * The hands need photography and are labelled placeholders; the pieces are
 * built, one speckled mid-grey and one smooth light-grey.
 */
export const Shot11: React.FC = () => {
  const clock = useShot(10);
  if (!clock.visible) return null;

  const l = whipIn(clock.local, 0, 0.5, { dx: -520, blur: 40 });
  const r = whipIn(clock.local, 0.04, 0.5, { dx: 540, blur: 40 });
  const dl = drift(clock.frame, 12.2, 1.1);
  const dr = drift(clock.frame, 13.6, 1.1);

  // They keep easing toward each other but never close the last few pixels.
  const close = interpolate(clock.local, [dur(0.5), dur(1.4)], [0, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: -66,
          top: 1004,
          opacity: l.opacity,
          transform: `translate(${l.x + dl.x + close}px, ${dl.y}px)`,
          ...blurStyle(l.blur),
        }}
      >
        <PhotoPlaceholder name="photoreal greyscale hand, left" width={318} height={372} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 214,
          top: 1024,
          opacity: l.opacity,
          transform: `translate(${l.x + dl.x + close}px, ${dl.y}px)`,
          ...blurStyle(l.blur),
        }}
      >
        <JigsawPiece size={272} id="jig-a" variant="speckled" edge="tab" />
      </div>

      <div
        style={{
          position: "absolute",
          right: -66,
          top: 1004,
          opacity: r.opacity,
          transform: `translate(${r.x + dr.x - close}px, ${dr.y}px)`,
          ...blurStyle(r.blur),
        }}
      >
        <PhotoPlaceholder name="photoreal greyscale hand, right" width={318} height={372} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 214,
          top: 1044,
          opacity: r.opacity,
          transform: `translate(${r.x + dr.x - close}px, ${dr.y}px)`,
          ...blurStyle(r.blur),
        }}
      >
        <JigsawPiece size={272} id="jig-b" variant="smooth" edge="socket" />
      </div>

      <SnapLine
        local={clock.local}
        at={0.05}
        text="They create"
        size={62}
        weight={600}
        colour={BLACK}
        place={{ left: 0, top: 546, width: 1080, align: "center" }}
      />
      <SnapLine
        local={clock.local}
        at={0.2}
        text="Activity"
        size={204}
        weight={900}
        colour={GREY}
        place={{ left: 0, top: 618, width: 1080, align: "center" }}
        tracking={-0.045}
      />
    </AbsoluteFill>
  );
};
