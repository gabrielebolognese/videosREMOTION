import React from "react";
import { drift, entranceAnim, exitStyle, partProgress, usePhrase } from "../motion";
import { Positioned, Run, type Part } from "../Text";
import { FONT } from "../tokens";
import type { TreatmentBase } from "./common";

/**
 * NUMERAL HERO
 *
 * The number carries the frame and the words are reduced to labels around it.
 * The numeral is the only place in this video that is allowed to be red.
 */
export const NumeralHero: React.FC<
  TreatmentBase & {
    numeral: {
      text: string;
      size: number;
      weight: number;
      colour: string;
      left: number;
      top: number;
      tracking?: number;
    };
    around?: { parts: Part[]; left: number; top: number; delay?: number }[];
    children?: React.ReactNode;
  }
> = ({ p, slot, numeral, around = [], children, lift, seed = 0 }) => {
  const clock = usePhrase(p, 0.14);
  if (!clock.visible) return null;

  const a = entranceAnim(p.entrance, partProgress(clock.local, 0, p.entrance));
  const d = drift(clock.frame, seed);
  const settled = a.opacity >= 1 ? 1 : 0;

  return (
    <Positioned slot={slot} style={exitStyle(clock.exit, 0, -26)}>
      <div
        style={{
          position: "absolute",
          left: numeral.left,
          top: numeral.top,
          fontFamily: FONT,
          fontSize: numeral.size,
          fontWeight: numeral.weight,
          color: numeral.colour,
          letterSpacing: numeral.tracking === undefined ? undefined : `${numeral.tracking}em`,
          lineHeight: 0.82,
          whiteSpace: "pre",
          opacity: a.opacity,
          filter: a.blur > 0.05 ? `blur(${a.blur}px)` : undefined,
          transform: `translate(${d.x * settled}px, ${d.y * settled}px) scale(${a.scale})`,
          textShadow: lift ? "0 6px 34px rgba(6,7,6,0.42)" : undefined,
        }}
      >
        {numeral.text}
      </div>

      {around.map((item, i) => (
        <Run
          key={i}
          parts={item.parts}
          clock={clock}
          entrance={p.entrance}
          baseDelay={item.delay ?? 0.1 + i * 0.09}
          lift={lift}
          seed={seed + i * 1.4}
          style={{ position: "absolute", left: item.left, top: item.top, whiteSpace: "pre" }}
        />
      ))}

      {children}
    </Positioned>
  );
};
