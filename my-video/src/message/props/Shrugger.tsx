/**
 * The shrug: a man in a brown tweed jacket, white shirt and thin dark tie,
 * dark side-parted hair, both palms turned up and his eyebrows somewhere near
 * his hairline. Cropped at the hip, because the shrug lives entirely in the
 * shoulders and the hands.
 */
export const Shrugger: React.FC<{ width: number }> = ({ width }) => {
  const id = "shrug";

  return (
    <svg
      width={width}
      height={width * (720 / 660)}
      viewBox="0 0 660 720"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-tweed`} x1="0.12" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#9A7448" />
          <stop offset="46%" stopColor="#7E5C36" />
          <stop offset="100%" stopColor="#513A21" />
        </linearGradient>
        <linearGradient id={`${id}-skin`} x1="0.15" y1="0" x2="0.88" y2="0.9">
          <stop offset="0%" stopColor="#F2D2B4" />
          <stop offset="52%" stopColor="#E0B893" />
          <stop offset="100%" stopColor="#BE9068" />
        </linearGradient>
        <linearGradient id={`${id}-hair`} x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#4A3524" />
          <stop offset="60%" stopColor="#2E2015" />
          <stop offset="100%" stopColor="#1A1109" />
        </linearGradient>
        {/* the fleck that makes tweed tweed, at a scale that survives 300px */}
        <pattern
          id={`${id}-fleck`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <rect width="14" height="14" fill="none" />
          <path
            d="M 2 3 L 6 3 M 8 9 L 12 9"
            stroke="rgba(238,220,190,0.30)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 3 11 L 5 11"
            stroke="rgba(50,34,18,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </pattern>
      </defs>

      {/* both forearms, angling up and out from the elbows */}
      <path
        d="M 160 392 C 128 404, 100 420, 82 438 L 116 486
           C 134 470, 158 456, 184 448 Z"
        fill={`url(#${id}-skin)`}
      />
      <path
        d="M 500 392 C 532 404, 560 420, 578 438 L 544 486
           C 526 470, 502 456, 476 448 Z"
        fill={`url(#${id}-skin)`}
      />

      {/* the open palms, fingers spread, turned to the ceiling */}
      <path
        d="M 108 434
           C 82 424, 52 428, 36 444
           C 22 458, 26 476, 44 482
           C 30 488, 26 502, 38 512
           C 28 522, 32 536, 48 540
           C 44 552, 54 562, 72 560
           C 96 558, 122 542, 136 518
           C 148 496, 142 466, 122 448 Z"
        fill={`url(#${id}-skin)`}
      />
      <path
        d="M 44 482 C 62 476, 82 474, 98 476 M 38 512 C 58 504, 80 500, 98 500
           M 48 540 C 66 532, 86 526, 102 524"
        stroke="rgba(150,110,74,0.45)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 552 434
           C 578 424, 608 428, 624 444
           C 638 458, 634 476, 616 482
           C 630 488, 634 502, 622 512
           C 632 522, 628 536, 612 540
           C 616 552, 606 562, 588 560
           C 564 558, 538 542, 524 518
           C 512 496, 518 466, 538 448 Z"
        fill={`url(#${id}-skin)`}
      />
      <path
        d="M 616 482 C 598 476, 578 474, 562 476 M 622 512 C 602 504, 580 500, 562 500
           M 612 540 C 594 532, 574 526, 558 524"
        stroke="rgba(150,110,74,0.45)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* white shirt and the thin dark tie, behind the jacket fronts */}
      <path d="M 268 268 L 392 268 L 384 700 L 276 700 Z" fill="#F7F5F0" />
      <path d="M 268 268 L 330 300 L 300 356 Z" fill="#FFFFFF" />
      <path d="M 392 268 L 330 300 L 360 356 Z" fill="#FFFFFF" />
      <path
        d="M 330 296 L 348 314 L 340 328 L 352 700 L 308 700 L 320 328 L 312 314 Z"
        fill="#1E2430"
      />
      <path
        d="M 330 296 L 348 314 L 340 328 L 352 700 L 308 700 L 320 328 L 312 314 Z"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="2"
      />

      {/* the jacket: shoulders hiked, lapels wide, sleeves down to the wrist */}
      <path
        d="M 262 252
           C 214 258, 178 278, 156 310
           C 132 346, 122 396, 130 440
           L 196 452
           C 192 414, 198 378, 214 352
           L 236 700
           L 424 700
           L 446 352
           C 462 378, 468 414, 464 452
           L 530 440
           C 538 396, 528 346, 504 310
           C 482 278, 446 258, 398 252
           L 330 372 Z"
        fill={`url(#${id}-tweed)`}
      />
      <path
        d="M 262 252
           C 214 258, 178 278, 156 310
           C 132 346, 122 396, 130 440
           L 196 452
           C 192 414, 198 378, 214 352
           L 236 700
           L 424 700
           L 446 352
           C 462 378, 468 414, 464 452
           L 530 440
           C 538 396, 528 346, 504 310
           C 482 278, 446 258, 398 252
           L 330 372 Z"
        fill={`url(#${id}-fleck)`}
      />
      {/* lapels, cut deep enough to hold the shirt */}
      <path d="M 262 252 L 330 372 L 272 456 L 226 296 Z" fill="#6B4E2E" />
      <path d="M 398 252 L 330 372 L 388 456 L 434 296 Z" fill="#6B4E2E" />
      <path
        d="M 262 252 L 330 372 L 272 456 M 398 252 L 330 372 L 388 456"
        stroke="rgba(40,26,12,0.4)"
        strokeWidth="3.5"
        fill="none"
      />
      {/* cuffs */}
      <path
        d="M 130 440 L 196 452 L 190 480 L 124 468 Z M 530 440 L 464 452 L 470 480 L 536 468 Z"
        fill="#F7F5F0"
      />

      {/* neck, short because the shoulders are up around it */}
      <path d="M 300 214 L 362 214 L 366 276 L 296 276 Z" fill={`url(#${id}-skin)`} />
      <path
        d="M 300 236 C 316 254, 346 254, 364 236 L 366 276 L 296 276 Z"
        fill="rgba(150,110,74,0.30)"
      />

      {/* head */}
      <path
        d="M 330 44
           C 388 44, 420 88, 418 148
           C 416 208, 384 246, 330 246
           C 276 246, 244 208, 242 148
           C 240 88, 272 44, 330 44 Z"
        fill={`url(#${id}-skin)`}
      />
      {/* the eyebrows, up near the hairline, which is the whole performance */}
      <path
        d="M 268 116 C 284 104, 304 102, 316 108 M 344 108 C 356 102, 376 104, 392 116"
        stroke="#3A2917"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="292" cy="146" rx="10" ry="11" fill="#2B2018" />
      <ellipse cx="368" cy="146" rx="10" ry="11" fill="#2B2018" />
      <path
        d="M 326 148 C 328 172, 332 186, 338 194 C 332 200, 322 200, 316 196"
        stroke="rgba(150,110,74,0.55)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* the mouth, pulled flat and wide: no idea, mate */}
      <path
        d="M 296 210 C 314 202, 348 202, 366 210"
        stroke="#8A5C3C"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* dark hair, parted hard on his right */}
      <path
        d="M 330 34
           C 388 34, 424 72, 424 132
           C 424 146, 421 156, 416 162
           C 412 128, 400 104, 378 92
           C 350 78, 306 82, 280 100
           C 262 112, 250 134, 246 162
           C 240 152, 238 132, 240 114
           C 246 66, 280 34, 330 34 Z"
        fill={`url(#${id}-hair)`}
      />
      <path
        d="M 286 62 C 320 52, 360 58, 386 80"
        stroke="rgba(120,96,66,0.45)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* the part itself */}
      <path
        d="M 286 96 C 306 78, 340 70, 372 78"
        stroke="rgba(240,226,206,0.20)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
