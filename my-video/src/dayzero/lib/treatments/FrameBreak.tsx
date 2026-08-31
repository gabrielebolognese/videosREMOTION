import React from "react";
import { drift, entranceAnim, exitStyle, partProgress, usePhrase } from "../motion";
import { FONT } from "../tokens";
import type { TreatmentBase } from "./common";

/**
 * FRAME BREAK
 *
 * One word set so large it crops on both edges. The container is deliberately
 * wider than the frame and centred on it, so the word bleeds rather than
 * fitting - the crop is the treatment.
 */
export const FrameBreak: React.FC<
  TreatmentBase & {
    text: string;
    size: number;
    weight: number;
    colour: string;
    top: number;
    tracking?: number;
    /** Wider than the frame on purpose, so the word can bleed both edges. */
    containerWidth?: number;
  }
> = ({
  p,
  text,
  size,
  weight,
  colour,
  top,
  tracking = -0.05,
  containerWidth = 3200,
  lift,
  seed = 0,
}) => {
  const clock = usePhrase(p, 0.1);
  if (!clock.visible) return null;

  const a = entranceAnim(p.entrance, partProgress(clock.local, 0, p.entrance));
  const d = drift(clock.frame, seed);
  const settled = a.opacity >= 1 ? 1 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top,
        width: containerWidth,
        marginLeft: -containerWidth / 2,
        textAlign: "center",
        transform: `translate(${d.x * settled}px, ${d.y * settled}px) scale(${a.scale})`,
        ...exitStyle(clock.exit, 0, -18),
        opacity: (1 - clock.exit) * a.opacity,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: size,
          fontWeight: weight,
          color: colour,
          letterSpacing: `${tracking}em`,
          lineHeight: 0.86,
          whiteSpace: "pre",
          filter: a.blur > 0.05 ? `blur(${a.blur}px)` : undefined,
          textShadow: lift ? "0 4px 26px rgba(6,7,6,0.4)" : undefined,
        }}
      >
        {text}
      </div>
    </div>
  );
};
