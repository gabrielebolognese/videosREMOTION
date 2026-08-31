/**
 * The glossy 3D incandescent bulb of shot 1, unlit: cool clear glass with a
 * hard specular down the upper left, a dead grey filament, and a dark chrome
 * screw base. Pure artwork - the scene that mounts it owns all the motion.
 */
export const Bulb: React.FC<{ width: number }> = ({ width }) => (
  <svg
    width={width}
    height={width * (760 / 440)}
    viewBox="0 0 440 760"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <radialGradient id="smartglass" cx="0.34" cy="0.28" r="0.82">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="38%" stopColor="#F4F7F9" />
        <stop offset="72%" stopColor="#D3DDE3" />
        <stop offset="92%" stopColor="#AEBDC6" />
        <stop offset="100%" stopColor="#8C9EAA" />
      </radialGradient>
      <linearGradient id="smartchrome" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0B0D0F" />
        <stop offset="12%" stopColor="#3C4247" />
        <stop offset="28%" stopColor="#7E878E" />
        <stop offset="40%" stopColor="#2A2F33" />
        <stop offset="58%" stopColor="#171A1D" />
        <stop offset="74%" stopColor="#5A6167" />
        <stop offset="88%" stopColor="#25292D" />
        <stop offset="100%" stopColor="#08090A" />
      </linearGradient>
      <linearGradient id="smartneck" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#9AAAB5" stopOpacity="0.75" />
        <stop offset="38%" stopColor="#F2F6F8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#7C8C97" stopOpacity="0.75" />
      </linearGradient>
      <radialGradient id="smartcore" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#B9C8D2" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#B9C8D2" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* contact shadow on the plane, directly under the base */}
    <ellipse cx="220" cy="716" rx="112" ry="26" fill="rgba(40,40,44,0.20)" />
    <ellipse cx="220" cy="714" rx="66" ry="15" fill="rgba(40,40,44,0.18)" />

    {/* glass envelope */}
    <circle cx="220" cy="230" r="198" fill="url(#smartglass)" />
    <circle cx="220" cy="252" r="126" fill="url(#smartcore)" />
    <circle
      cx="220"
      cy="230"
      r="198"
      stroke="rgba(255,255,255,0.92)"
      strokeWidth="3.5"
      fill="none"
    />
    <circle
      cx="220"
      cy="230"
      r="189"
      stroke="rgba(112,138,155,0.30)"
      strokeWidth="7"
      fill="none"
    />

    {/* neck pinching into the base */}
    <path
      d="M 116 376 C 146 420 158 432 158 470 L 282 470 C 282 432 294 420 324 376 C 288 410 250 422 220 422 C 190 422 152 410 116 376 Z"
      fill="url(#smartneck)"
    />

    {/* dead filament: grey stem, grey wires, grey coil */}
    <rect x="211" y="300" width="18" height="126" rx="9" fill="#C9D3DA" />
    <path
      d="M 186 308 L 186 236 M 254 308 L 254 236"
      stroke="#93A0A8"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M 186 236 L 197 272 L 208 236 L 219 272 L 230 236 L 241 272 L 252 240"
      stroke="#8D9AA3"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* dark chrome screw base */}
    <path
      d="M 152 462 L 288 462 L 284 606 C 284 636 262 656 220 656 C 178 656 156 636 156 606 Z"
      fill="url(#smartchrome)"
    />
    <path
      d="M 154 496 L 286 496 M 155 528 L 285 528 M 157 560 L 283 560 M 159 592 L 281 592"
      stroke="rgba(0,0,0,0.65)"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M 154 490 L 286 490 M 155 522 L 285 522 M 157 554 L 283 554 M 159 586 L 281 586"
      stroke="rgba(255,255,255,0.30)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* insulator and contact tip */}
    <ellipse cx="220" cy="652" rx="60" ry="24" fill="#141719" />
    <ellipse cx="220" cy="660" rx="44" ry="18" fill="#2A2E31" />
    <ellipse cx="220" cy="668" rx="26" ry="12" fill="#0A0B0C" />

    {/* speculars: one long sweep upper left, one tight kick lower right */}
    <ellipse
      cx="146"
      cy="148"
      rx="50"
      ry="80"
      fill="rgba(255,255,255,0.9)"
      style={{ rotate: "-26deg", transformOrigin: "146px 148px" }}
    />
    <ellipse cx="292" cy="330" rx="19" ry="36" fill="rgba(255,255,255,0.55)" />
    <path
      d="M 92 300 A 198 198 0 0 0 190 418"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 348 156 A 198 198 0 0 1 396 268"
      stroke="rgba(255,255,255,0.45)"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
