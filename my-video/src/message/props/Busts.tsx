import { Curls, MarbleDefs } from "./Marble";

/**
 * The bust that holds the phone: an idealized young male classical figure,
 * curly hair, one hand raised with a light grey smartphone at eye level, the
 * other gathering the toga at the chest, mouth slightly open in disbelief.
 */
export const PhoneBust: React.FC<{ width: number }> = ({ width }) => {
  const id = "phonebust";

  return (
    <svg
      width={width}
      height={width * (760 / 560)}
      viewBox="0 0 560 760"
      fill="none"
    >
      <MarbleDefs id={id} />
      <defs>
        <linearGradient id={`${id}-glass`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#D9DBDF" />
          <stop offset="48%" stopColor="#BEC1C7" />
          <stop offset="100%" stopColor="#94979E" />
        </linearGradient>
      </defs>

      {/* bust socle */}
      <path d="M 176 664 L 380 664 L 402 760 L 154 760 Z" fill={`url(#${id}-plinth)`} />
      <path d="M 300 664 L 380 664 L 402 760 L 322 760 Z" fill="rgba(96,92,84,0.16)" />
      <path d="M 164 646 L 392 646 L 396 674 L 160 674 Z" fill="#F0ECE2" />

      {/* chest and shoulders, cut off as a bust */}
      <path
        d="M 268 424
           C 206 430, 158 470, 138 528
           C 124 570, 120 616, 124 652
           L 434 652
           C 438 614, 432 566, 416 524
           C 394 468, 344 430, 288 424 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* toga over the far shoulder, falling in folds across the chest */}
      <path
        d="M 300 428 C 336 440, 366 470, 386 512 C 404 550, 412 600, 410 650
           L 316 650 C 316 604, 308 556, 292 516 C 280 484, 266 456, 252 438 Z"
        fill={`url(#${id}-cloth)`}
      />
      <path
        d="M 316 470 C 336 508, 348 560, 350 622 M 346 496 C 364 534, 374 584, 376 636"
        stroke="rgba(140,136,126,0.32)"
        strokeWidth="4.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* the near hand, gathering the toga at the chest */}
      <path
        d="M 194 528
           C 216 512, 246 512, 264 526
           C 280 538, 282 560, 268 574
           C 250 592, 214 592, 196 576
           C 182 564, 180 540, 194 528 Z"
        fill={`url(#${id}-stone)`}
      />
      <path
        d="M 208 534 C 224 528, 244 530, 256 540 M 202 552 C 220 546, 242 548, 256 558
           M 206 570 C 222 566, 240 568, 252 574"
        stroke="rgba(126,122,114,0.34)"
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* the fold of cloth pinched between the fingers */}
      <path
        d="M 186 546 C 160 566, 142 600, 134 646 L 180 650 C 188 616, 200 592, 214 578 Z"
        fill={`url(#${id}-cloth)`}
      />

      {/* neck */}
      <path d="M 238 348 L 320 348 L 330 436 L 232 436 Z" fill={`url(#${id}-shade)`} />

      {/* head, tilted a few degrees toward the phone */}
      <path
        d="M 278 120
           C 344 118, 388 168, 388 244
           C 388 316, 344 372, 280 374
           C 216 376, 172 320, 172 246
           C 172 170, 214 122, 278 120 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* brow, the classical straight nose, and the parted mouth */}
      <path
        d="M 214 218 C 234 208, 258 208, 274 216 M 306 216 C 322 208, 344 208, 358 216"
        stroke="rgba(120,116,108,0.42)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 288 214 C 292 250, 298 278, 304 292 C 296 300, 282 300, 274 294"
        stroke="rgba(120,116,108,0.34)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="284" cy="326" rx="21" ry="14" fill="rgba(104,100,92,0.42)" />
      <path
        d="M 264 320 C 276 312, 294 312, 306 320"
        stroke="rgba(120,116,108,0.40)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      <Curls
        id={id}
        cap="M 268 112
             C 344 108, 396 158, 398 238
             C 399 266, 392 288, 380 296
             C 384 250, 370 208, 340 184
             C 306 156, 250 154, 216 180
             C 188 202, 174 240, 178 288
             C 164 276, 158 240, 166 202
             C 178 146, 216 114, 268 112 Z"
        lobes={[
          [200, 176],
          [236, 142],
          [278, 128],
          [320, 136],
          [356, 164],
          [382, 206],
          [388, 254],
          [176, 224],
          [174, 268],
        ]}
        r={20}
      />

      {/* the raised arm, elbow out, bringing the phone up to eye level */}
      <path
        d="M 372 452
           C 412 448, 452 424, 470 386
           C 484 356, 484 322, 472 296
           L 428 316
           C 436 336, 434 358, 424 376
           C 410 400, 386 414, 356 416 Z"
        fill={`url(#${id}-stone)`}
      />
      <path
        d="M 470 300
           C 460 268, 450 244, 442 230
           L 400 250
           C 408 266, 416 288, 422 312 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* the hand, wrapped around the far edge of the phone */}
      <path
        d="M 398 218
           C 420 204, 448 206, 462 224
           C 476 242, 472 266, 452 278
           C 430 292, 402 288, 390 268
           C 378 250, 380 230, 398 218 Z"
        fill={`url(#${id}-stone)`}
      />

      {/* the phone itself, held at eye level, face turned toward him */}
      <path
        d="M 356 172 L 448 160 L 470 268 L 378 282 Z"
        fill={`url(#${id}-glass)`}
      />
      <path
        d="M 366 182 L 440 172 L 458 258 L 384 270 Z"
        fill="#8D9198"
      />
      <path d="M 368 184 L 404 179 L 396 266 L 384 268 Z" fill="rgba(255,255,255,0.20)" />
      {/* the fingertips coming back over the front edge */}
      <path
        d="M 440 200 C 456 196, 468 202, 470 214 C 472 226, 462 234, 448 234 Z"
        fill={`url(#${id}-shade)`}
      />

      {/* specular roll down the lit shoulder */}
      <path
        d="M 172 500 C 158 542, 150 592, 150 640"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

/**
 * The despairing bust: a curly-haired youth in a plain tunic with both palms
 * pressed flat to his forehead. The forearms come up steeply from the bottom
 * of the cut-out so the elbows never enter frame and the gesture reads as one
 * shape rather than two arms.
 */
export const DespairBust: React.FC<{ width: number }> = ({ width }) => {
  const id = "despairbust";

  return (
    <svg
      width={width}
      height={width * (740 / 540)}
      viewBox="0 0 540 740"
      fill="none"
    >
      <MarbleDefs id={id} />

      {/* socle */}
      <path d="M 168 652 L 372 652 L 392 740 L 148 740 Z" fill={`url(#${id}-plinth)`} />
      <path d="M 292 652 L 372 652 L 392 740 L 312 740 Z" fill="rgba(96,92,84,0.16)" />
      <path d="M 156 634 L 384 634 L 388 662 L 152 662 Z" fill="#F0ECE2" />

      {/* shoulders under a plain tunic, no folds to speak of */}
      <path
        d="M 262 420
           C 198 426, 150 468, 132 528
           C 120 570, 116 610, 120 640
           L 424 640
           C 428 608, 422 566, 408 524
           C 388 466, 338 424, 282 420 Z"
        fill={`url(#${id}-cloth)`}
      />
      <path
        d="M 190 470 C 174 512, 164 574, 164 634 M 356 470 C 372 512, 382 574, 382 634"
        stroke="rgba(140,136,126,0.26)"
        strokeWidth="4.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* the neckline of the tunic */}
      <path
        d="M 210 438 C 234 470, 268 486, 300 482 C 322 478, 338 462, 346 438"
        stroke="rgba(134,130,120,0.34)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* neck */}
      <path d="M 230 350 L 312 350 L 320 434 L 224 434 Z" fill={`url(#${id}-shade)`} />

      {/* head, tipped forward so the crown takes the palms */}
      <path
        d="M 268 122
           C 334 120, 378 172, 376 248
           C 374 320, 330 374, 266 374
           C 202 374, 160 318, 162 244
           C 164 168, 206 124, 268 122 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* the eyes are closed - two lids, drawn down */}
      <path
        d="M 202 254 C 220 244, 244 244, 258 254 M 282 254 C 298 244, 322 244, 336 254"
        stroke="rgba(120,116,108,0.44)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 268 250 C 272 284, 276 306, 282 318 C 274 326, 262 326, 254 320"
        stroke="rgba(120,116,108,0.32)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 240 350 C 254 342, 280 342, 296 350"
        stroke="rgba(120,116,108,0.38)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      <Curls
        id={id}
        cap="M 258 114
             C 332 110, 384 162, 384 240
             C 384 268, 376 288, 366 296
             C 370 250, 356 208, 326 184
             C 292 158, 236 158, 202 184
             C 174 206, 160 244, 164 292
             C 150 280, 146 240, 154 202
             C 166 148, 206 116, 258 114 Z"
        lobes={[
          [188, 178],
          [224, 144],
          [266, 130],
          [308, 138],
          [344, 166],
          [368, 208],
          [166, 226],
        ]}
        r={20}
      />

      {/* the two forearms, rising steeply out of the bottom of the cut-out */}
      <path
        d="M 150 640
           C 138 560, 146 468, 172 396
           C 188 350, 208 316, 228 296
           L 276 340
           C 258 358, 240 388, 226 428
           C 204 492, 198 566, 206 640 Z"
        fill={`url(#${id}-stone)`}
      />
      <path
        d="M 394 640
           C 406 560, 398 468, 372 396
           C 356 350, 336 316, 316 296
           L 268 340
           C 286 358, 304 388, 318 428
           C 340 492, 346 566, 338 640 Z"
        fill={`url(#${id}-shade)`}
      />

      {/* the palms, pressed flat across the forehead, heels of the hands meeting */}
      <path
        d="M 216 288
           C 234 258, 262 244, 286 250
           C 306 256, 314 276, 304 300
           C 292 328, 262 344, 236 338
           C 214 332, 206 310, 216 288 Z"
        fill={`url(#${id}-stone)`}
      />
      <path
        d="M 322 288
           C 304 258, 276 244, 252 250
           C 232 256, 224 276, 234 300
           C 246 328, 276 344, 302 338
           C 324 332, 332 310, 322 288 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* four fingers laid over each brow */}
      <path
        d="M 230 268 C 250 254, 274 250, 292 256 M 224 288 C 244 274, 270 270, 290 276
           M 226 308 C 244 296, 268 292, 286 298"
        stroke="rgba(126,122,114,0.32)"
        strokeWidth="3.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 308 268 C 288 254, 264 250, 246 256 M 314 288 C 294 274, 268 270, 248 276
           M 312 308 C 294 296, 270 292, 252 298"
        stroke="rgba(126,122,114,0.32)"
        strokeWidth="3.8"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M 174 470 C 160 520, 152 580, 152 630"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
