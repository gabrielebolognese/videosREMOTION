import React from "react";
import { HEIGHT, WIDTH } from "./tokens";

const LEFT = 104;
const TOP = 600;
const COLS = 4;
const ROWS = 5;
const CELL_W = 218;
const CELL_H = 144;

const LINE = "#C7C6C1";

/**
 * The construction grid that sits behind the type: a 4x5 lattice of dashed
 * squares across the middle third, with small dashed tick crosses at every
 * intersection. Faint enough to read as setup marks rather than as content.
 */
export const Grid: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const w = COLS * CELL_W;
  const h = ROWS * CELL_H;

  const verticals = Array.from({ length: COLS + 1 }, (_, i) => LEFT + i * CELL_W);
  const horizontals = Array.from({ length: ROWS + 1 }, (_, i) => TOP + i * CELL_H);

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style={{ position: "absolute", left: 0, top: 0, opacity, pointerEvents: "none" }}
    >
      <g stroke={LINE} strokeWidth={1.2} strokeDasharray="7 9" opacity={0.55}>
        {verticals.map((x, i) => (
          <line key={`v${i}`} x1={x} y1={TOP} x2={x} y2={TOP + h} />
        ))}
        {horizontals.map((y, i) => (
          <line key={`h${i}`} x1={LEFT} y1={y} x2={LEFT + w} y2={y} />
        ))}
      </g>

      {/* Tick crosses at the intersections. */}
      <g stroke={LINE} strokeWidth={1.4} opacity={0.85}>
        {verticals.map((x) =>
          horizontals.map((y) => (
            <React.Fragment key={`${x}-${y}`}>
              <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
              <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
            </React.Fragment>
          )),
        )}
      </g>
    </svg>
  );
};

/** Where the grid sits, so the magnifying glass can magnify the right patch. */
export const GRID_BOX = { left: LEFT, top: TOP, width: COLS * CELL_W, height: ROWS * CELL_H };
