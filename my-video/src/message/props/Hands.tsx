import { AMBER, CREAM, CRIMSON, INK } from "../lib/tokens";

/** Skin, lit from the upper left and falling warm on the underside. */
const SkinDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <linearGradient id={`${id}-skin`} x1="0.15" y1="0" x2="0.85" y2="0.95">
      <stop offset="0%" stopColor="#F4D6B8" />
      <stop offset="50%" stopColor="#E2BB96" />
      <stop offset="100%" stopColor="#B98C64" />
    </linearGradient>
  </defs>
);

/**
 * A bare forearm entering from the upper left, pinching a folded banknote
 * between thumb and forefinger. The note is drawn as cream paper with ink
 * engraving and one crimson seal - the palette has no green in it, and a
 * literal dollar bill would be a real-world mark the brief rules out.
 */
export const BanknoteArm: React.FC<{ width: number }> = ({ width }) => {
  const id = "notearm";

  return (
    <svg
      width={width}
      height={width * (380 / 540)}
      viewBox="0 0 540 380"
      fill="none"
    >
      <SkinDefs id={id} />

      {/* forearm, running down out of the top-left corner */}
      <path
        d="M -10 6
           C 60 30, 150 76, 226 128
           C 268 156, 300 182, 320 202
           L 268 268
           C 246 246, 214 220, 174 194
           C 106 148, 30 106, -20 84 Z"
        fill={`url(#${id}-skin)`}
      />
      {/* the tendon that keeps a forearm from reading as a tube */}
      <path
        d="M 30 46 C 100 78, 178 124, 244 174"
        stroke="rgba(150,110,74,0.30)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 20 22 C 92 54, 172 100, 240 150"
        stroke="rgba(255,236,214,0.35)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* the hand: heel, three curled fingers, and a thumb laid on top */}
      <path
        d="M 300 186
           C 336 178, 372 190, 392 214
           C 412 238, 410 268, 388 286
           C 362 306, 320 306, 292 288
           C 262 268, 258 226, 284 200 Z"
        fill={`url(#${id}-skin)`}
      />
      <path
        d="M 306 226 C 330 216, 358 218, 376 230 M 302 254 C 328 244, 358 246, 378 258
           M 310 282 C 332 274, 356 276, 372 284"
        stroke="rgba(150,110,74,0.38)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* the folded note, pinched and standing up out of the fist */}
      <path
        d="M 322 92 L 468 60 L 496 176 L 350 210 Z"
        fill={CREAM}
      />
      <path d="M 322 92 L 468 60 L 472 76 L 326 108 Z" fill="#EFE2CA" />
      {/* the crease of the fold */}
      <path
        d="M 396 76 L 424 194"
        stroke="rgba(120,96,66,0.42)"
        strokeWidth="3"
      />
      <path
        d="M 340 118 L 456 94 M 344 138 L 462 114 M 350 160 L 468 136"
        stroke="rgba(20,20,20,0.30)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M 336 104 L 480 74 L 490 160 L 356 190"
        stroke="rgba(20,20,20,0.28)"
        strokeWidth="2.6"
        fill="none"
      />
      <circle cx="452" cy="140" r="19" fill="none" stroke={CRIMSON} strokeWidth="4" />
      <circle cx="452" cy="140" r="9" fill={CRIMSON} opacity="0.75" />

      {/* the thumb, over the front of the note */}
      <path
        d="M 316 196
           C 336 172, 366 164, 386 176
           C 404 186, 404 208, 386 220
           C 366 234, 336 232, 318 218 Z"
        fill={`url(#${id}-skin)`}
      />
      <path
        d="M 336 186 C 356 178, 374 180, 386 190"
        stroke="rgba(150,110,74,0.34)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

/**
 * A bare forearm entering from the lower right, holding a clear glass bulb
 * upright. The glass is drawn as an outline plus two speculars over whatever
 * is behind it, so it stays transparent, and the filament is the only warm
 * thing in it.
 */
export const BulbArm: React.FC<{ width: number }> = ({ width }) => {
  const id = "bulbarm";

  return (
    <svg
      width={width}
      height={width * (420 / 540)}
      viewBox="0 0 540 420"
      fill="none"
    >
      <SkinDefs id={id} />
      <defs>
        <linearGradient id={`${id}-glass`} x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.86)" />
          <stop offset="46%" stopColor="rgba(226,234,238,0.42)" />
          <stop offset="100%" stopColor="rgba(158,170,178,0.44)" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0.1" y1="0" x2="0.9" y2="0.8">
          <stop offset="0%" stopColor="#DCDEE2" />
          <stop offset="50%" stopColor="#AEB3BA" />
          <stop offset="100%" stopColor="#787E86" />
        </linearGradient>
      </defs>

      {/* forearm, running up out of the bottom-right corner */}
      <path
        d="M 560 430
           C 500 396, 420 344, 352 292
           C 312 262, 282 236, 262 216
           L 316 152
           C 336 172, 366 198, 404 226
           C 470 274, 540 318, 588 344 Z"
        fill={`url(#${id}-skin)`}
      />
      <path
        d="M 520 392 C 452 352, 380 300, 320 250"
        stroke="rgba(150,110,74,0.30)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 534 366 C 464 326, 388 272, 328 222"
        stroke="rgba(255,236,214,0.35)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* the hand, closed around the cap of the bulb */}
      <path
        d="M 282 226
           C 246 234, 210 222, 190 198
           C 170 174, 174 144, 196 126
           C 222 106, 264 108, 292 126
           C 322 146, 324 200, 298 224 Z"
        fill={`url(#${id}-skin)`}
      />
      <path
        d="M 206 158 C 230 148, 258 150, 276 162 M 202 186 C 228 176, 258 178, 278 190
           M 212 212 C 234 204, 256 206, 272 214"
        stroke="rgba(150,110,74,0.38)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* the screw cap, gripped inside the fist */}
      <path d="M 196 106 L 288 100 L 292 146 L 200 152 Z" fill={`url(#${id}-cap)`} />
      <path
        d="M 198 116 L 290 110 M 199 128 L 291 122 M 200 140 L 292 134"
        stroke="rgba(80,86,94,0.5)"
        strokeWidth="3"
      />

      {/* the glass envelope */}
      <path
        d="M 206 104
           C 186 82, 178 52, 188 26
           C 200 -6, 234 -24, 268 -16
           C 302 -8, 320 22, 314 56
           C 310 78, 298 96, 284 106 Z"
        fill={`url(#${id}-glass)`}
        stroke="rgba(150,164,174,0.75)"
        strokeWidth="4"
      />
      {/* filament: the one warm thing in the cut-out */}
      <path
        d="M 232 96 L 234 46 M 268 94 L 266 46"
        stroke={AMBER}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 234 46 C 238 26, 246 18, 250 30 C 254 42, 260 34, 262 22 C 264 14, 266 30, 266 46"
        stroke={AMBER}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* two speculars, which is all that makes glass look like glass */}
      <path
        d="M 206 62 C 200 40, 208 18, 226 4"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 296 30 C 302 44, 300 62, 292 76"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

/**
 * The flat black arm-and-hand that slides in before the two photographic ones
 * arrive. One value of ink, holding an unreadable object - it exists only to
 * be replaced, so it must not resolve into anything specific.
 */
export const ArmSilhouette: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * (380 / 460)}
      viewBox="0 0 460 380"
      fill="none"
    >
      <path
        d="M -10 316
           C 54 292, 130 254, 196 210
           C 236 184, 266 160, 286 140
           C 300 126, 320 124, 332 136
           C 346 150, 344 172, 328 186
           C 306 206, 274 232, 232 260
           C 160 308, 74 350, 10 372 Z"
        fill={INK}
      />
      {/* the fist, closed over something */}
      <path
        d="M 288 96
           C 322 82, 362 90, 384 116
           C 406 142, 402 178, 374 196
           C 344 214, 300 208, 280 182
           C 260 156, 262 114, 288 96 Z"
        fill={INK}
      />
      {/* whatever it is, standing up out of the fist */}
      <path d="M 306 24 L 388 6 L 406 92 L 322 112 Z" fill={INK} />
    </svg>
  );
};
