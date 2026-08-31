import React from "react";
import { drift, entranceAnim, exitStyle, partProgress, usePhrase } from "../motion";
import { FONT } from "../tokens";
import type { TreatmentBase } from "./common";

type StencilLine = {
  parts: { text: string; size: number; weight: number }[];
  /** Baseline, relative to the block. */
  y: number;
  x: number;
  anchor?: "start" | "middle" | "end";
};

/**
 * STENCIL
 *
 * The words are knocked out of a solid block, so whatever is behind - the
 * black field, the tile floor - shows through the letters. Done with an SVG
 * mask rather than a blend mode so it renders identically every time.
 */
export const Stencil: React.FC<
  TreatmentBase & {
    width: number;
    height: number;
    lines: StencilLine[];
    block: string;
    radius?: number;
  }
> = ({ p, slot, width, height, lines, block, radius = 0, seed = 0 }) => {
  const clock = usePhrase(p, 0.12);
  if (!clock.visible) return null;

  const a = entranceAnim(p.entrance, partProgress(clock.local, 0, p.entrance));
  const d = drift(clock.frame, seed);
  const settled = a.opacity >= 1 ? 1 : 0;
  const id = `stencil-${p.from}`.replace(".", "-");

  return (
    <div
      style={{
        position: "absolute",
        left: slot.left,
        right: slot.right,
        top: slot.top,
        bottom: slot.bottom,
        ...exitStyle(clock.exit, 0, -20),
        opacity: (1 - clock.exit) * a.opacity,
        transform: `translate(${d.x * settled}px, ${d.y * settled}px) scale(${a.scale}) rotate(${(slot.rotate ?? 0) + d.rot * settled}deg)`,
        filter: a.blur > 0.05 ? `blur(${a.blur}px)` : undefined,
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <mask id={id}>
          <rect x={0} y={0} width={width} height={height} rx={radius} fill="#FFFFFF" />
          {lines.map((line, i) => (
            <text
              key={i}
              x={line.x}
              y={line.y}
              textAnchor={line.anchor ?? "start"}
              fill="#000000"
              style={{ fontFamily: FONT, whiteSpace: "pre" }}
            >
              {line.parts.map((part, j) => (
                <tspan key={j} style={{ fontSize: part.size, fontWeight: part.weight }}>
                  {part.text}
                </tspan>
              ))}
            </text>
          ))}
        </mask>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={radius}
          fill={block}
          mask={`url(#${id})`}
        />
      </svg>
    </div>
  );
};
