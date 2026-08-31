import React from "react";
import { drift, entranceAnim, exitStyle, partProgress, usePhrase } from "../motion";
import { Positioned } from "../Text";
import { DARK, FONT, WHITE } from "../tokens";
import type { TreatmentBase } from "./common";

export type ChipSpec = {
  text: string;
  size: number;
  weight: number;
  /** Filled by default; outline chips read as quieter. */
  fill?: string;
  colour?: string;
  padX?: number;
  padY?: number;
  /** Offset from the stack position, px. */
  dx?: number;
  dy?: number;
  rotate?: number;
};

/**
 * CHIP
 *
 * Filled rounded chips, one arriving per word. Used where the copy is a list
 * being piled up, and once at the end as a single punchy button.
 */
export const Chip: React.FC<
  TreatmentBase & { chips: ChipSpec[]; gap?: number; dirSign?: number; chipDelay?: number }
> = ({ p, slot, chips, gap = 14, dirSign = -1, chipDelay = 0.13, lift, seed = 0 }) => {
  const clock = usePhrase(p, 0.12);
  if (!clock.visible) return null;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, dirSign * -40, 0)}>
      {chips.map((c, i) => {
        const a = entranceAnim(
          p.entrance,
          partProgress(clock.local, i * chipDelay, p.entrance),
          dirSign,
        );
        const d = drift(clock.frame, seed + i * 1.9);
        const settled = a.opacity >= 1 ? 1 : 0;
        const padX = c.padX ?? c.size * 0.52;
        const padY = c.padY ?? c.size * 0.26;

        return (
          <div
            key={i}
            style={{
              display: "inline-block",
              marginTop: i === 0 ? 0 : gap,
              marginLeft: c.dx ?? 0,
              opacity: a.opacity,
              filter: a.blur > 0.05 ? `blur(${a.blur}px)` : undefined,
              transform: `translate(${a.x + d.x * settled}px, ${a.y + (c.dy ?? 0) + d.y * settled}px) scale(${a.scale}) rotate(${(c.rotate ?? 0) + d.rot * settled}deg)`,
            }}
          >
            <div
              style={{
                background: c.fill ?? WHITE,
                color: c.colour ?? DARK,
                fontFamily: FONT,
                fontSize: c.size,
                fontWeight: c.weight,
                lineHeight: 1,
                padding: `${padY}px ${padX}px`,
                borderRadius: 999,
                whiteSpace: "pre",
                boxShadow: lift ? "0 6px 30px rgba(6,7,6,0.34)" : undefined,
              }}
            >
              {c.text}
            </div>
          </div>
        );
      })}
    </Positioned>
  );
};
