/**
 * Photoreal-leaning glass incandescent bulb with a brushed aluminium screw base.
 * Pure artwork - all motion is applied by the scene that mounts it.
 */
export const Bulb: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * (700 / 440)}
      viewBox="0 0 440 700"
      fill="none"
    >
      <defs>
        <radialGradient id="bulbglass" cx="0.36" cy="0.3" r="0.78">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="42%" stopColor="#E8EFF3" stopOpacity="0.72" />
          <stop offset="78%" stopColor="#BCCBD4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8FA3B0" stopOpacity="0.78" />
        </radialGradient>
        <linearGradient id="bulbmetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6E7276" />
          <stop offset="14%" stopColor="#C9CED2" />
          <stop offset="34%" stopColor="#F2F4F5" />
          <stop offset="52%" stopColor="#A8AEB3" />
          <stop offset="74%" stopColor="#D6DADD" />
          <stop offset="100%" stopColor="#63686C" />
        </linearGradient>
        <linearGradient id="bulbneck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9EB0BB" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#F0F5F8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8496A2" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="bulbwarm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFC46A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFC46A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* glass envelope */}
      <circle cx="220" cy="228" r="196" fill="url(#bulbglass)" />
      <circle
        cx="220"
        cy="228"
        r="196"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="220"
        cy="228"
        r="188"
        stroke="rgba(120,145,160,0.35)"
        strokeWidth="6"
        fill="none"
      />

      {/* inner warm glow around the filament */}
      <circle cx="220" cy="250" r="128" fill="url(#bulbwarm)" />

      {/* neck */}
      <path
        d="M 118 372 C 146 414 158 424 158 460 L 282 460 C 282 424 294 414 322 372 C 288 404 250 416 220 416 C 190 416 152 404 118 372 Z"
        fill="url(#bulbneck)"
      />

      {/* filament stem and wire */}
      <rect x="212" y="300" width="16" height="120" rx="8" fill="#DCE4E9" />
      <path
        d="M 186 306 L 186 232 M 254 306 L 254 232"
        stroke="#8C959B"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 186 232 L 196 268 L 206 232 L 216 268 L 226 232 L 236 268 L 246 232 L 254 258"
        stroke="#FFB03A"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* brushed aluminium screw base */}
      <path
        d="M 152 452 L 288 452 L 284 592 C 284 618 262 636 220 636 C 178 636 156 618 156 592 Z"
        fill="url(#bulbmetal)"
      />
      <path
        d="M 154 486 L 286 486 M 155 516 L 285 516 M 157 546 L 283 546 M 159 576 L 281 576"
        stroke="rgba(40,46,52,0.45)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M 154 486 L 286 486 M 155 516 L 285 516 M 157 546 L 283 546 M 159 576 L 281 576"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ translate: "0px -5px" }}
      />
      <ellipse cx="220" cy="632" rx="56" ry="22" fill="#2B2F33" />
      <ellipse cx="220" cy="628" rx="40" ry="14" fill="#4A5055" />

      {/* speculars on the glass */}
      <ellipse
        cx="150"
        cy="150"
        rx="52"
        ry="76"
        fill="rgba(255,255,255,0.85)"
        style={{ rotate: "-28deg", transformOrigin: "150px 150px" }}
      />
      <ellipse cx="286" cy="326" rx="20" ry="34" fill="rgba(255,255,255,0.5)" />
      <path
        d="M 96 300 A 196 196 0 0 0 190 414"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
