import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT } from "./motion";
import { BLUSH, BURGUNDY, CREAM, INK } from "./tokens";

/**
 * The faint dotted grid. Painted as a radial-gradient tile rather than an SVG
 * pattern so it stays perfectly crisp at 720 wide, and masked to a horizontal
 * band because the brief only wants it across the middle of the sheet.
 */
export const DottedGrid: React.FC<{
  opacity?: number;
  /** Vertical extent of the band, as a pair of percentages. */
  band?: [number, number];
  gap?: number;
}> = ({ opacity = 0.5, band = [22, 82], gap = 46 }) => {
  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundImage: `radial-gradient(rgba(120,96,78,0.34) 1.6px, transparent 1.7px)`,
        backgroundSize: `${gap}px ${gap}px`,
        backgroundPosition: "12px 8px",
        maskImage: `linear-gradient(transparent 0%, #000 ${band[0]}%, #000 ${band[1]}%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(transparent 0%, #000 ${band[0]}%, #000 ${band[1]}%, transparent 100%)`,
      }}
    />
  );
};

/**
 * The one shadow the brief allows on the background: an oversized maple leaf,
 * blurred to a diffuse smudge and pressed into the sheet with multiply.
 */
export const MapleLeaf: React.FC<{
  size?: number;
  x?: number;
  y?: number;
  rotate?: number;
  opacity?: number;
}> = ({ size = 900, x = -90, y = 300, rotate = -14, opacity = 0.1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        rotate: `${rotate}deg`,
        mixBlendMode: "multiply",
        filter: "blur(14px)",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 600 600" fill="none">
        <path
          d="M 300 40 C 300 40, 322 120, 330 140 L 392 104 L 376 200 L 470 186
             L 452 244 L 560 300 L 512 336 L 540 420 L 420 400 L 404 448
             L 316 372 L 336 540 L 300 520 L 264 540 L 284 372 L 196 448
             L 180 400 L 60 420 L 88 336 L 40 300 L 148 244 L 130 186
             L 224 200 L 208 104 L 270 140 Z"
          fill="rgba(122,92,66,0.55)"
        />
      </svg>
    </div>
  );
};

/** The warm cream paper field the odd-numbered shots sit on. */
export const CreamField: React.FC<{
  grid?: boolean;
  gridBand?: [number, number];
  leaf?: boolean;
}> = ({ grid = false, gridBand = [22, 82], leaf = false }) => {
  return (
    <AbsoluteFill name="Cream sheet" style={{ backgroundColor: CREAM }}>
      {leaf ? <MapleLeaf /> : null}
      {grid ? <DottedGrid band={gridBand} /> : null}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(88% 56% at 50% 42%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 72%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** The blush pink field the even-numbered shots sit on. */
export const PinkField: React.FC<{ grid?: boolean }> = ({ grid = false }) => {
  return (
    <AbsoluteFill name="Blush sheet" style={{ backgroundColor: BLUSH }}>
      {grid ? <DottedGrid opacity={0.34} /> : null}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(90% 58% at 50% 40%, rgba(255,246,244,0.72) 0%, rgba(250,217,213,0) 74%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Torn edges, drawn once as literal vertex lists so the tear never crawls.
const TOP_RIGHT =
  "M 720 0 L 720 300 L 686 286 L 700 254 L 652 246 L 668 214 L 620 198 L 638 168 L 588 148 L 606 118 L 552 96 L 566 66 L 508 44 L 520 16 L 470 0 Z";
const BOTTOM_LEFT =
  "M 0 1280 L 0 962 L 40 978 L 26 1010 L 76 1022 L 58 1054 L 108 1070 L 92 1100 L 142 1122 L 124 1152 L 178 1174 L 164 1204 L 222 1228 L 210 1256 L 262 1280 Z";

/**
 * The matte-black torn paper corners that wipe in at the top-right and the
 * bottom-left. They push in along their own diagonal and settle - the brief
 * uses them as punctuation on the cut, not as a transition that covers frame.
 */
export const InkCorners: React.FC<{
  start?: number;
  travel?: number;
  topRight?: boolean;
  bottomLeft?: boolean;
  /** Extra distance travelled, for the shots where they flick rather than slide. */
  distance?: number;
}> = ({
  start = 0,
  travel = 9,
  topRight = true,
  bottomLeft = true,
  distance = 1,
}) => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [start, start + travel], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });

  return (
    <AbsoluteFill name="Torn ink corners" style={{ pointerEvents: "none" }}>
      <svg width="720" height="1280" viewBox="0 0 720 1280" fill="none">
        {topRight ? (
          <path
            d={TOP_RIGHT}
            fill={INK}
            style={{
              translate: `${((1 - p) * 150 * distance).toFixed(2)}px ${(
                (1 - p) *
                -110 *
                distance
              ).toFixed(2)}px`,
            }}
          />
        ) : null}
        {bottomLeft ? (
          <path
            d={BOTTOM_LEFT}
            fill={INK}
            style={{
              translate: `${((1 - p) * -140 * distance).toFixed(2)}px ${(
                (1 - p) *
                120 *
                distance
              ).toFixed(2)}px`,
            }}
          />
        ) : null}
      </svg>
    </AbsoluteFill>
  );
};

/**
 * The hand-drawn burgundy line that sweeps in from the left, arcs over the top
 * of the composition and drops away behind the figure. Drawn with a dash
 * offset so it genuinely draws rather than fading up, and given a slightly
 * uneven width by stacking a second, thinner pass just off-register.
 */
export const BurgundyArc: React.FC<{
  start?: number;
  travel?: number;
  d?: string;
  width?: number;
}> = ({
  start = 0,
  travel = 22,
  d = "M -30 706 C 96 700, 128 470, 232 366 C 340 258, 540 244, 636 336 C 726 422, 706 596, 646 742",
  width = 9,
}) => {
  const frame = useCurrentFrame();
  const LENGTH = 1600;

  return (
    <AbsoluteFill name="Burgundy arc" style={{ pointerEvents: "none" }}>
      <svg width="720" height="1280" viewBox="0 0 720 1280" fill="none">
        <path
          d={d}
          stroke={BURGUNDY}
          strokeWidth={width}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={LENGTH}
          style={{
            strokeDashoffset: interpolate(
              frame,
              [start, start + travel],
              [LENGTH, 0],
              { ...CLAMP, easing: OUT },
            ),
          }}
        />
        {/* Second pass, half a pixel off and thinner: the line reads as drawn
            by hand rather than stroked by a program. */}
        <path
          d={d}
          stroke={BURGUNDY}
          strokeWidth={width * 0.42}
          strokeLinecap="round"
          fill="none"
          opacity={0.55}
          strokeDasharray={LENGTH}
          style={{
            translate: "1.5px -2px",
            strokeDashoffset: interpolate(
              frame,
              [start + 1, start + travel + 1],
              [LENGTH, 0],
              { ...CLAMP, easing: OUT },
            ),
          }}
        />
      </svg>
    </AbsoluteFill>
  );
};
