/**
 * A white dove in flight, wings spread.
 *
 * On a paper-white sheet a white bird has no silhouette of its own, so the
 * form is carried entirely by the grey feather separations and a cool shadow
 * side under each wing.
 */
export const Dove: React.FC<{ width: number }> = ({ width }) => {
  const id = "dove";

  return (
    <svg
      width={width}
      height={width * (420 / 620)}
      viewBox="0 0 620 420"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="58%" stopColor="#F0F1F3" />
          <stop offset="100%" stopColor="#CFD2D8" />
        </linearGradient>
        <linearGradient id={`${id}-upper`} x1="0.5" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E7E9ED" />
          <stop offset="100%" stopColor="#C3C7CF" />
        </linearGradient>
        <linearGradient id={`${id}-lower`} x1="0.5" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#DEE1E6" />
          <stop offset="100%" stopColor="#AEB3BC" />
        </linearGradient>
      </defs>

      {/* lower wing, sweeping back and down */}
      <path
        d="M 352 246 C 306 268, 246 300, 178 334 C 128 358, 78 372, 40 372 C 82 348, 130 316, 176 282 C 228 244, 288 220, 336 216 Z"
        fill={`url(#${id}-lower)`}
      />
      <path
        d="M 320 232 C 262 258, 200 296, 140 330 M 330 244 C 274 272, 212 310, 154 344 M 340 258 C 288 286, 232 320, 176 352"
        stroke="rgba(120,128,140,0.5)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* body and tail */}
      <path
        d="M 336 208 C 372 178, 424 168, 466 176 C 470 200, 458 226, 434 242 C 400 264, 348 274, 306 268 C 282 264, 268 246, 274 228 C 280 212, 306 206, 336 208 Z"
        fill={`url(#${id}-body)`}
      />
      <path
        d="M 292 240 C 240 252, 180 266, 128 286 C 168 250, 226 226, 282 218 Z"
        fill={`url(#${id}-lower)`}
      />

      {/* head and beak */}
      <ellipse cx="486" cy="176" rx="44" ry="40" fill={`url(#${id}-body)`} />
      <path d="M 524 176 L 572 186 L 522 198 Z" fill="#D8B268" />
      <circle cx="500" cy="166" r="6" fill="#3A3E46" />

      {/* upper wing, raised into the top of the frame */}
      <path
        d="M 372 202 C 344 152, 306 96, 258 46 C 220 8, 176 -6, 140 2 C 176 34, 212 84, 246 138 C 282 194, 328 224, 372 226 Z"
        fill={`url(#${id}-upper)`}
      />
      <path
        d="M 348 200 C 320 150, 282 96, 236 48 M 362 194 C 332 142, 294 88, 250 40 M 334 212 C 306 164, 268 112, 224 66"
        stroke="rgba(120,128,140,0.45)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 372 202 C 344 152, 306 96, 258 46 C 220 8, 176 -6, 140 2 C 176 34, 212 84, 246 138 C 282 194, 328 224, 372 226 Z"
        fill="none"
        stroke="rgba(150,157,168,0.5)"
        strokeWidth="2.4"
      />
      <path
        d="M 336 208 C 372 178, 424 168, 466 176 C 470 200, 458 226, 434 242 C 400 264, 348 274, 306 268 C 282 264, 268 246, 274 228 C 280 212, 306 206, 336 208 Z"
        fill="none"
        stroke="rgba(150,157,168,0.45)"
        strokeWidth="2.2"
      />
    </svg>
  );
};
