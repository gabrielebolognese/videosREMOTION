import { ACID_YELLOW, NEAR_BLACK, OFF_WHITE } from "../lib/tokens";

/**
 * Flat vector doctor pictogram - round head, shoulders, stethoscope cut out of
 * the torso in the backdrop colour. Solid black, no gradients.
 */
export const DoctorPictogram: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      style={{ display: "block" }}
    >
      <circle cx="100" cy="46" r="36" fill={NEAR_BLACK} />
      <path
        d="M 16 240 C 16 156, 52 106, 100 106 C 148 106, 184 156, 184 240 Z"
        fill={NEAR_BLACK}
      />
      <path
        d="M 64 118 C 52 176, 82 208, 112 200"
        stroke={OFF_WHITE}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 136 120 C 146 154, 142 176, 130 186"
        stroke={OFF_WHITE}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="126" cy="200" r="17" fill={OFF_WHITE} />
      <circle cx="126" cy="200" r="7" fill={NEAR_BLACK} />
    </svg>
  );
};

/**
 * Dark charcoal app-style tile carrying a white outline hospital-with-cross
 * glyph.
 */
export const HospitalTile: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      <rect width="150" height="150" rx="36" fill="#2B2B29" />
      <path
        d="M 40 116 L 40 64 L 75 42 L 110 64 L 110 116"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 32 116 L 118 116"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 62 82 L 88 82 M 75 69 L 75 95"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Thin hand-drawn curved arrow with an open arrowhead, pointing down and to
 * the right. `progress` runs 0 to 1 to draw it on.
 */
export const CurvedArrow: React.FC<{
  width: number;
  progress: number;
  flip?: boolean;
}> = ({ width, progress, flip = false }) => {
  return (
    <svg
      width={width}
      height={width * 0.86}
      viewBox="0 0 220 190"
      fill="none"
      style={{ display: "block", scale: flip ? "-1 1" : undefined }}
    >
      <path
        d="M 16 24 C 10 84, 44 128, 96 146 C 128 157, 160 158, 186 150"
        stroke={NEAR_BLACK}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.min(1, progress / 0.78)}
      />
      <path
        d="M 152 128 C 168 140, 178 146, 190 149 C 180 156, 172 166, 166 178"
        stroke={NEAR_BLACK}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={
          1 - Math.max(0, Math.min(1, (progress - 0.72) / 0.28))
        }
      />
    </svg>
  );
};

/** Abstract acid-yellow logo mark made of three fused dots. */
export const ThreeDotMark: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size * 0.62}
      viewBox="0 0 160 100"
      fill="none"
      style={{ display: "block" }}
    >
      <circle cx="36" cy="66" r="30" fill={ACID_YELLOW} />
      <circle cx="80" cy="30" r="27" fill={ACID_YELLOW} />
      <circle cx="124" cy="66" r="30" fill={ACID_YELLOW} />
      {/* Just enough of a bridge to fuse the dots without filling the gaps. */}
      <path
        d="M 52 50 C 62 42, 68 38, 76 36 L 84 36 C 92 38, 98 42, 108 50 C 98 54, 92 56, 84 56 L 76 56 C 68 56, 62 54, 52 50 Z"
        fill={ACID_YELLOW}
      />
    </svg>
  );
};

/** Large acid-yellow organic shapes for the bottom right of the outro. */
export const YellowBlobs: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * 0.86}
      viewBox="0 0 420 360"
      fill="none"
      style={{ display: "block" }}
    >
      {/* Rounded amoeba, sitting above and right of the plain circle. */}
      <path
        d="M 226 18 C 288 0, 366 24, 392 78 C 410 116, 380 152, 390 190 C 402 234, 378 280, 330 292 C 286 304, 250 276, 210 286 C 158 298, 118 274, 110 228 C 102 184, 138 154, 132 118 C 124 70, 168 34, 226 18 Z"
        fill={ACID_YELLOW}
      />
      <circle cx="100" cy="268" r="76" fill={ACID_YELLOW} />
    </svg>
  );
};
