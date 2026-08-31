import { CONTACT } from "../lib/tokens";

/** The rounded-corner card every photograph in the piece sits inside. */
export const Card: React.FC<{
  width: number;
  height: number;
  radius?: number;
  children: React.ReactNode;
}> = ({ width, height, radius = 28, children }) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      overflow: "hidden",
      backgroundColor: "#EDEDED",
      filter: CONTACT,
    }}
  >
    {children}
  </div>
);

const MOSAIC = ["#E23A2E", "#F2C230", "#2F7FD4", "#3FA96A", "#E2683A", "#7A4FB5"];

/**
 * The loud clinic: a modern hospital with a bold red and white striped facade,
 * a multicolour mosaic-letter entrance sign and a stylised cross panel above.
 */
export const RedClinic: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 440 290" fill="none">
    <defs>
      <linearGradient id="rc-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BFD6E4" />
        <stop offset="100%" stopColor="#E4EDF2" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="440" height="290" fill="url(#rc-sky)" />
    <rect x="0" y="252" width="440" height="38" fill="#B9B4AC" />

    {/* the striped block */}
    <rect x="44" y="46" width="352" height="208" fill="#F4F4F4" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect
        key={i}
        x="44"
        y={62 + i * 28}
        width="352"
        height="15"
        fill="#D9251F"
      />
    ))}
    {/* the cross panel above the entrance */}
    <rect x="186" y="18" width="68" height="68" rx="8" fill="#F6F6F6" />
    <path d="M 210 30 L 230 30 L 230 44 L 244 44 L 244 62 L 230 62 L 230 76 L 210 76 L 210 62 L 196 62 L 196 44 L 210 44 Z" fill="#D9251F" />

    {/* glazed entrance */}
    <rect x="150" y="164" width="140" height="90" fill="#3F4A52" />
    <rect x="158" y="172" width="58" height="74" fill="#6E8794" opacity="0.8" />
    <rect x="224" y="172" width="58" height="74" fill="#5B7280" opacity="0.8" />

    {/* the multicolour mosaic-letter sign */}
    {MOSAIC.map((c, i) => (
      <rect
        key={c}
        x={144 + i * 26}
        y="126"
        width="21"
        height="26"
        rx="4"
        fill={c}
      />
    ))}
    <rect x="140" y="120" width="164" height="38" rx="7" fill="none" stroke="#F6F6F6" strokeWidth="4" />

    {/* a soft top-front key, matching the set */}
    <rect x="0" y="0" width="440" height="290" fill="url(#rc-key)" />
    <defs>
      <linearGradient id="rc-key" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.24)" />
        <stop offset="100%" stopColor="rgba(40,50,58,0.20)" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * The quiet clinic: a clean white concrete block from a low angle against pale
 * sky, with calm blue-grey lettering on the facade.
 */
export const WhiteClinic: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 440 290" fill="none">
    <defs>
      <linearGradient id="wc-sky" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#A9C2CE" />
        <stop offset="100%" stopColor="#DCE6EA" />
      </linearGradient>
      <linearGradient id="wc-face" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#FCFCFB" />
        <stop offset="62%" stopColor="#E9ECEB" />
        <stop offset="100%" stopColor="#C4CBCB" />
      </linearGradient>
      <linearGradient id="wc-side" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stopColor="#AEB8B9" />
        <stop offset="100%" stopColor="#8C9698" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="440" height="290" fill="url(#wc-sky)" />

    {/* low angle: the block rises past the top of the frame */}
    <path d="M 74 290 L 74 34 L 330 -20 L 330 290 Z" fill="url(#wc-face)" />
    <path d="M 330 -20 L 430 22 L 430 290 L 330 290 Z" fill="url(#wc-side)" />
    <path d="M 74 34 L 330 -20 L 430 22 M 74 290 L 74 34" stroke="#98A3A5" strokeWidth="3" fill="none" />

    {/* recessed window bands */}
    {[92, 152, 212].map((y, i) => (
      <path
        key={y}
        d={`M 96 ${y + 22} L 306 ${y - 22} L 306 ${y + 6} L 96 ${y + 50} Z`}
        fill="#6E828C"
        opacity={0.72 - i * 0.07}
      />
    ))}
    {[64, 140, 216].map((y) => (
      <rect key={y} x="348" y={y} width="66" height="34" fill="#71797B" opacity="0.55" />
    ))}

    {/* calm blue-grey lettering on the facade */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect
        key={i}
        x={116 + i * 26}
        y={60 - i * 5}
        width="18"
        height="24"
        rx="3"
        fill="#5C7B92"
      />
    ))}

    <rect x="0" y="0" width="440" height="290" fill="url(#wc-key)" />
    <defs>
      <linearGradient id="wc-key" x1="0.2" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
        <stop offset="100%" stopColor="rgba(60,72,80,0.16)" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * The closing card: a polished chrome winged figurine on the bonnet of a pale
 * silver-blue sedan, cool dim light, dark bokeh behind.
 *
 * A generic art-deco flying form - no marque, no badge, no lettering.
 */
export const Ornament: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 560 880" fill="none">
    <defs>
      <linearGradient id="or-bg" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#22282E" />
        <stop offset="52%" stopColor="#39424A" />
        <stop offset="100%" stopColor="#171B20" />
      </linearGradient>
      <linearGradient id="or-bonnet" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor="#C3CDD6" />
        <stop offset="38%" stopColor="#98A6B2" />
        <stop offset="100%" stopColor="#5E6B77" />
      </linearGradient>
      <linearGradient id="or-chrome" x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="26%" stopColor="#D6DEE6" />
        <stop offset="52%" stopColor="#8E9AA6" />
        <stop offset="74%" stopColor="#EFF3F7" />
        <stop offset="100%" stopColor="#6E7A86" />
      </linearGradient>
      <filter id="or-bokeh" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
    </defs>

    <rect x="0" y="0" width="560" height="880" fill="url(#or-bg)" />
    {/* dark bokeh behind */}
    <g filter="url(#or-bokeh)" opacity="0.55">
      {[
        [96, 150, 54],
        [420, 96, 68],
        [470, 260, 44],
        [70, 320, 38],
        [300, 70, 46],
        [520, 420, 52],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#8FA2B4" opacity="0.5" />
      ))}
    </g>

    {/* the bonnet, running away to the bottom of the frame */}
    <path d="M -40 600 C 120 552, 440 552, 600 600 L 600 880 L -40 880 Z" fill="url(#or-bonnet)" />
    <path
      d="M -40 606 C 120 558, 440 558, 600 606"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="5"
      fill="none"
    />
    <path
      d="M 60 880 C 150 740, 410 740, 500 880"
      stroke="rgba(255,255,255,0.14)"
      strokeWidth="8"
      fill="none"
    />

    {/* the plinth */}
    <path d="M 236 596 L 330 596 L 320 570 L 246 570 Z" fill="url(#or-chrome)" />

    {/* the winged figure: swept-back wings, a leaning body, no face */}
    <path
      d="M 284 566 C 276 520, 282 470, 300 436 C 312 412, 330 396, 348 392 L 356 414 C 340 424, 326 444, 318 470 C 308 502, 304 536, 306 566 Z"
      fill="url(#or-chrome)"
    />
    <circle cx="352" cy="378" r="19" fill="url(#or-chrome)" />
    <path
      d="M 330 428 C 286 396, 214 366, 138 358 C 190 396, 246 434, 296 466 Z"
      fill="url(#or-chrome)"
    />
    <path
      d="M 320 468 C 274 448, 208 436, 146 440 C 200 468, 254 494, 300 512 Z"
      fill="url(#or-chrome)"
      opacity="0.85"
    />
    <path
      d="M 330 428 C 286 396, 214 366, 138 358 M 320 468 C 274 448, 208 436, 146 440"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="3"
      fill="none"
    />
    {/* the trailing gown */}
    <path
      d="M 306 566 C 300 528, 306 486, 320 458 L 342 470 C 330 500, 322 534, 322 566 Z"
      fill="url(#or-chrome)"
      opacity="0.8"
    />

    {/* cool dim key */}
    <rect x="0" y="0" width="560" height="880" fill="url(#or-key)" />
    <defs>
      <radialGradient id="or-key" cx="0.56" cy="0.42" r="0.7">
        <stop offset="40%" stopColor="rgba(10,14,18,0)" />
        <stop offset="100%" stopColor="rgba(10,14,18,0.62)" />
      </radialGradient>
    </defs>
  </svg>
);
