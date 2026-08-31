import { Curls, MarbleDefs } from "./Marble";

/**
 * The seated thinker: chin on fist, hunched over an open silver-grey laptop
 * balanced on his lap, toga over the shoulder and across the thighs, bare
 * feet. He faces right, so the laptop lid opens back toward his face and the
 * fist reads against the empty side of the frame.
 */
export const Thinker: React.FC<{ width: number }> = ({ width }) => {
  const id = "thinker";

  return (
    <svg
      width={width}
      height={width * (720 / 620)}
      viewBox="0 0 620 720"
      fill="none"
    >
      <MarbleDefs id={id} />
      <defs>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EAEBED" />
          <stop offset="52%" stopColor="#C9CBD0" />
          <stop offset="100%" stopColor="#9DA0A8" />
        </linearGradient>
      </defs>

      {/* the block he is sitting on */}
      <path
        d="M 96 604 L 452 604 L 470 706 L 78 706 Z"
        fill={`url(#${id}-plinth)`}
      />
      <path
        d="M 330 604 L 452 604 L 470 706 L 348 706 Z"
        fill="rgba(96,92,84,0.16)"
      />
      <path d="M 86 594 L 462 594 L 466 618 L 82 618 Z" fill="#F0ECE2" />

      {/* far shin and bare foot, behind everything */}
      <path
        d="M 398 486 L 452 492 C 462 540, 466 588, 462 630 L 404 626 C 404 584, 402 532, 398 486 Z"
        fill={`url(#${id}-shade)`}
      />
      <path
        d="M 402 616 L 464 622 C 494 630, 522 642, 528 654 C 532 666, 520 672, 496 670 L 406 662 Z"
        fill={`url(#${id}-shade)`}
      />

      {/* near shin, dropping from the raised knee to the floor */}
      <path
        d="M 352 470 L 424 478 C 436 534, 440 588, 434 638 L 358 632 C 360 578, 358 520, 352 470 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* near bare foot: heel, arch, toes */}
      <path
        d="M 356 624 L 436 632 C 470 640, 502 652, 508 666 C 512 678, 500 684, 474 682
           L 362 674 C 350 672, 346 660, 348 646 Z"
        fill={`url(#${id}-stone)`}
      />
      <path
        d="M 452 654 C 462 652, 472 654, 478 660 M 466 662 C 476 660, 486 662, 490 668"
        stroke="rgba(120,116,108,0.35)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* the thigh, running from the hip out to the raised knee */}
      <path
        d="M 178 500
           C 236 452, 314 432, 386 442
           C 424 448, 440 470, 434 500
           L 424 534
           C 350 520, 250 524, 186 546 Z"
        fill={`url(#${id}-stone)`}
      />

      {/* toga hanging off the front of the thigh */}
      <path
        d="M 160 496 C 214 460, 300 442, 372 448 L 380 500
           C 316 494, 236 508, 182 540
           C 158 554, 142 578, 138 604 L 96 600
           C 100 556, 122 520, 160 496 Z"
        fill={`url(#${id}-cloth)`}
      />
      <path
        d="M 168 512 C 158 546, 150 578, 148 602 M 214 490 C 202 528, 196 566, 194 596
           M 268 474 C 258 512, 252 552, 252 586"
        stroke="rgba(140,136,126,0.30)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* torso, leaning forward over the lap */}
      <path
        d="M 232 268
           C 202 288, 184 336, 178 396
           C 174 440, 176 486, 184 522
           L 388 500
           C 380 450, 368 396, 352 348
           C 336 302, 312 274, 286 264 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* the toga sash, over the far shoulder and down across the chest */}
      <path
        d="M 236 266 C 214 300, 202 356, 200 420 C 199 462, 203 496, 210 518
           L 264 512 C 254 480, 250 440, 252 396 C 254 340, 264 296, 280 268 Z"
        fill={`url(#${id}-cloth)`}
      />
      <path
        d="M 244 292 C 230 340, 224 398, 226 456 M 266 282 C 254 330, 248 390, 250 448"
        stroke="rgba(142,138,128,0.32)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* far arm, dropped down the inside and resting beside the laptop */}
      <path
        d="M 292 286 C 322 306, 344 348, 356 396 C 364 428, 364 456, 356 474
           L 316 468 C 322 448, 320 424, 312 396 C 302 360, 288 330, 272 312 Z"
        fill={`url(#${id}-shade)`}
      />

      {/* the laptop, open across the thighs: base, keys, hinge, lid, screen */}
      <path d="M 250 262 L 420 250 L 428 456 L 240 470 Z" fill={`url(#${id}-lid)`} />
      <path d="M 262 276 L 412 266 L 418 444 L 254 456 Z" fill="#474D59" />
      <path
        d="M 268 282 L 342 278 L 302 450 L 258 452 Z"
        fill="rgba(255,255,255,0.10)"
      />
      <path d="M 208 476 L 424 452 L 434 480 L 216 506 Z" fill={`url(#${id}-lid)`} />
      <path d="M 208 476 L 424 452 L 426 462 L 210 486 Z" fill="#F1F2F4" />
      <path
        d="M 236 492 L 388 474 L 386 486 L 234 504 Z"
        fill="rgba(90,94,102,0.32)"
      />

      {/* near arm: shoulder over the lid, elbow on the knee, forearm to the chin */}
      <path
        d="M 300 262
           C 344 276, 380 322, 402 382
           C 418 424, 424 462, 418 486
           L 460 492
           C 470 452, 462 396, 440 342
           C 414 280, 370 240, 320 232 Z"
        fill={`url(#${id}-stone)`}
      />
      <path
        d="M 418 486
           C 442 494, 458 490, 462 470
           C 468 440, 456 396, 434 350
           C 414 308, 392 278, 374 262
           L 340 292
           C 358 310, 378 342, 394 380
           C 408 414, 414 448, 410 470 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* the fist, tucked under the jaw */}
      <path
        d="M 340 240
           C 366 234, 386 244, 392 264
           C 398 286, 388 306, 366 312
           C 344 318, 326 308, 320 288
           C 314 266, 322 246, 340 240 Z"
        fill={`url(#${id}-stone)`}
      />
      <path
        d="M 330 258 C 344 252, 358 252, 370 258 M 328 276 C 342 270, 358 270, 372 276
           M 332 294 C 344 290, 358 290, 368 294"
        stroke="rgba(126,122,114,0.34)"
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* neck, then the head bowed forward onto the fist */}
      <path d="M 268 178 L 322 172 L 336 244 L 274 254 Z" fill={`url(#${id}-shade)`} />
      <path
        d="M 300 82
           C 350 78, 386 112, 390 164
           C 394 212, 366 250, 328 256
           C 288 262, 254 236, 246 192
           C 238 142, 258 88, 300 82 Z"
        fill={`url(#${id}-stone)`}
      />
      {/* brow ridge and the shadowed socket, and no features beyond that */}
      <path
        d="M 300 158 C 320 150, 344 152, 358 162"
        stroke="rgba(120,116,108,0.40)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 316 178 C 330 174, 346 176, 356 182"
        stroke="rgba(120,116,108,0.22)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      <Curls
        id={id}
        cap="M 292 76
             C 342 68, 388 96, 396 146
             C 400 170, 394 190, 384 196
             C 386 168, 376 142, 356 128
             C 332 110, 300 106, 274 118
             C 254 128, 244 148, 244 172
             C 234 160, 234 132, 246 108
             C 256 88, 272 78, 292 76 Z"
        lobes={[
          [268, 108],
          [296, 90],
          [326, 88],
          [356, 100],
          [378, 124],
          [386, 156],
          [254, 138],
        ]}
        r={16}
      />

      {/* the single specular roll down the lit side of the block */}
      <path
        d="M 206 300 C 194 356, 190 424, 194 494"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
