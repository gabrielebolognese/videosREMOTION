import { INK } from "../lib/tokens";

/**
 * A polished silver chess queen. The read is all in the silhouette - crown
 * points, a pinched collar, the swelling body and a wide flared base - so the
 * metal is done with two hard specular bands rather than a soft gradient.
 */
export const ChessQueen: React.FC<{ width: number }> = ({ width }) => {
  const id = "queen";

  return (
    <svg
      width={width}
      height={width * (470 / 200)}
      viewBox="0 0 200 470"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-silver`} x1="0.05" y1="0" x2="0.95" y2="0.4">
          <stop offset="0%" stopColor="#FDFDFE" />
          <stop offset="22%" stopColor="#D6DADF" />
          <stop offset="44%" stopColor="#9FA6AF" />
          <stop offset="62%" stopColor="#E8EBEF" />
          <stop offset="82%" stopColor="#8C949E" />
          <stop offset="100%" stopColor="#5F666F" />
        </linearGradient>
      </defs>

      {/* crown: five points and the ball on top */}
      <circle cx="100" cy="24" r="16" fill={`url(#${id}-silver)`} />
      <path
        d="M 46 108 L 38 56 L 62 82 L 74 44 L 88 78 L 100 40 L 112 78 L 126 44
           L 138 82 L 162 56 L 154 108 Z"
        fill={`url(#${id}-silver)`}
      />
      {/* collar */}
      <path d="M 44 108 L 156 108 L 150 132 L 50 132 Z" fill={`url(#${id}-silver)`} />
      <path d="M 54 138 L 146 138 L 140 158 L 60 158 Z" fill={`url(#${id}-silver)`} />

      {/* body: neck pinched under the collar, swelling to the skirt */}
      <path
        d="M 70 158
           C 66 194, 62 232, 58 268
           C 54 306, 46 344, 34 372
           L 166 372
           C 154 344, 146 306, 142 268
           C 138 232, 134 194, 130 158 Z"
        fill={`url(#${id}-silver)`}
      />

      {/* base: two steps and a wide foot */}
      <path d="M 30 372 L 170 372 L 176 402 L 24 402 Z" fill={`url(#${id}-silver)`} />
      <ellipse cx="100" cy="424" rx="88" ry="26" fill={`url(#${id}-silver)`} />
      <ellipse cx="100" cy="418" rx="88" ry="26" fill="#EDEFF2" />
      <ellipse cx="100" cy="418" rx="88" ry="26" fill={`url(#${id}-silver)`} />

      {/* the two speculars that make it read as polished rather than matte */}
      <path
        d="M 82 164 C 76 224, 68 296, 52 366"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 122 168 C 126 226, 132 296, 146 364"
        stroke="rgba(58,66,76,0.45)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 60 118 L 140 118 M 66 146 L 134 146"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * A flat black paper silhouette of somebody poured across a grey armchair -
 * legs over one arm, head back over the other. The chair is the only grey
 * thing in the shot; the figure is one flat value of ink, with no interior
 * detail at all, so it reads as cut paper rather than as a drawing.
 */
export const Recliner: React.FC<{ width: number }> = ({ width }) => {
  const id = "recliner";

  return (
    <svg
      width={width}
      height={width * (420 / 620)}
      viewBox="0 0 620 420"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-chair`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#CFCCC6" />
          <stop offset="52%" stopColor="#B2AEA7" />
          <stop offset="100%" stopColor="#8B8780" />
        </linearGradient>
      </defs>

      {/* back cushion */}
      <path
        d="M 96 122 C 96 92, 118 74, 152 74 L 470 74 C 504 74, 526 92, 526 122
           L 526 236 L 96 236 Z"
        fill={`url(#${id}-chair)`}
      />
      {/* seat */}
      <path d="M 84 232 L 538 232 L 546 306 L 76 306 Z" fill="#C4C0BA" />
      {/* both arms */}
      <path
        d="M 40 176 C 40 156, 56 144, 80 144 L 112 144 L 112 322 L 40 322 Z"
        fill={`url(#${id}-chair)`}
      />
      <path
        d="M 582 176 C 582 156, 566 144, 542 144 L 510 144 L 510 322 L 582 322 Z"
        fill={`url(#${id}-chair)`}
      />
      {/* legs */}
      <path
        d="M 66 322 L 104 322 L 100 400 L 70 400 Z M 518 322 L 556 322 L 552 400 L 522 400 Z"
        fill="#8F8B84"
      />
      {/* the two seams that stop the chair reading as a box */}
      <path
        d="M 118 236 L 504 236 M 148 96 L 148 230 M 474 96 L 474 230"
        stroke="rgba(96,92,86,0.35)"
        strokeWidth="4"
        fill="none"
      />

      {/* the figure, one flat black shape from the shoes to the crown */}
      <path
        d="M 118 154
           C 138 140, 162 138, 180 148
           C 196 158, 202 176, 196 192
           C 214 186, 240 186, 268 194
           C 316 208, 366 224, 412 232
           C 444 238, 470 234, 486 220
           C 500 208, 514 206, 524 214
           C 536 224, 534 240, 520 254
           C 496 278, 456 288, 410 282
           C 358 274, 302 254, 254 240
           C 228 232, 208 232, 196 240
           C 190 244, 186 252, 186 262
           C 186 276, 176 284, 160 282
           C 144 280, 136 268, 138 252
           C 140 236, 148 224, 160 216
           C 142 214, 126 204, 118 190
           C 110 176, 110 162, 118 154 Z"
        fill={INK}
      />
      {/* the near arm, hanging off the seat */}
      <path
        d="M 236 236 C 240 262, 244 288, 244 310 C 244 322, 236 330, 226 328
           C 216 326, 212 316, 214 304 C 218 282, 220 258, 218 234 Z"
        fill={INK}
      />
      {/* the shoes, over the far arm */}
      <path
        d="M 508 228 C 528 220, 548 220, 558 228 C 566 234, 564 244, 552 248
           C 536 254, 516 252, 504 244 Z"
        fill={INK}
      />
    </svg>
  );
};
