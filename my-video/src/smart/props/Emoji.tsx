/**
 * The oversized 3D emoji-style stickers. Each one is a self-contained SVG with
 * its own gradients; ids are namespaced by an `id` prop so two copies of the
 * same sticker can sit in one frame without their defs colliding.
 */

/**
 * Blue morpho butterfly. `flutter` runs -1..1 and squeezes the wings toward the
 * body, so the scene can drive a wingbeat without touching the artwork.
 */
export const Butterfly: React.FC<{
  size: number;
  id: string;
  flutter?: number;
}> = ({ size, id, flutter = 0 }) => (
  <svg
    width={size}
    height={size * (240 / 300)}
    viewBox="0 0 300 240"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id={`${id}-wingA`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#8FD4FF" />
        <stop offset="34%" stopColor="#2E8BE8" />
        <stop offset="72%" stopColor="#1B4FC4" />
        <stop offset="100%" stopColor="#122E86" />
      </linearGradient>
      <linearGradient id={`${id}-wingB`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#63B6F5" />
        <stop offset="46%" stopColor="#1E63D6" />
        <stop offset="100%" stopColor="#0E2A78" />
      </linearGradient>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2C3038" />
        <stop offset="40%" stopColor="#585F6B" />
        <stop offset="100%" stopColor="#191C21" />
      </linearGradient>
    </defs>

    {/* left pair, mirrored from the right by a negative x scale */}
    {[-1, 1].map((s) => (
      <g
        key={s}
        style={{
          scale: `${(s * (1 - Math.abs(flutter) * 0.62)).toFixed(3)} 1`,
          transformOrigin: "150px 120px",
        }}
      >
        <path
          d="M 150 92 C 168 30 224 8 268 22 C 300 32 296 82 262 108 C 232 130 182 132 150 118 Z"
          fill={`url(#${id}-wingA)`}
        />
        <path
          d="M 150 122 C 180 126 224 142 236 174 C 246 202 216 224 188 216 C 162 208 148 172 150 122 Z"
          fill={`url(#${id}-wingB)`}
        />
        <path
          d="M 150 92 C 168 30 224 8 268 22 C 300 32 296 82 262 108 C 232 130 182 132 150 118 Z"
          fill="none"
          stroke="#0B1F5E"
          strokeWidth="5"
        />
        <path
          d="M 150 122 C 180 126 224 142 236 174 C 246 202 216 224 188 216 C 162 208 148 172 150 122 Z"
          fill="none"
          stroke="#0B1F5E"
          strokeWidth="5"
        />
        {/* rim and speculars on the upper wing */}
        <path
          d="M 176 74 C 200 44 238 32 266 40"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx="236"
          cy="72"
          rx="16"
          ry="9"
          fill="rgba(255,255,255,0.55)"
          style={{ rotate: "-24deg", transformOrigin: "236px 72px" }}
        />
        <circle cx="212" cy="182" r="10" fill="rgba(255,255,255,0.4)" />
      </g>
    ))}

    {/* body and antennae */}
    <path
      d="M 150 78 C 160 78 164 98 164 130 C 164 168 158 196 150 208 C 142 196 136 168 136 130 C 136 98 140 78 150 78 Z"
      fill={`url(#${id}-body)`}
    />
    <path
      d="M 146 76 C 132 50 116 38 100 34 M 154 76 C 168 50 184 38 200 34"
      stroke="#2C3038"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="100" cy="34" r="8" fill="#2C3038" />
    <circle cx="200" cy="34" r="8" fill="#2C3038" />
    <ellipse cx="146" cy="104" rx="4" ry="20" fill="rgba(255,255,255,0.35)" />
  </svg>
);

/**
 * Cream clown face: lavender curly hair, cream face, blue eyes, red nose, wide
 * red smile. `ghost` flattens it to a pale silhouette for the two cropped
 * copies in the corners of shot 4.
 */
export const ClownFace: React.FC<{
  size: number;
  id: string;
  ghost?: boolean;
}> = ({ size, id, ghost = false }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none">
    <defs>
      <radialGradient id={`${id}-hair`} cx="0.34" cy="0.28" r="0.82">
        <stop offset="0%" stopColor="#D8D6EF" />
        <stop offset="46%" stopColor="#A5A4C4" />
        <stop offset="100%" stopColor="#6F6E92" />
      </radialGradient>
      <radialGradient id={`${id}-face`} cx="0.36" cy="0.26" r="0.84">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="58%" stopColor="#F7EFE3" />
        <stop offset="100%" stopColor="#D9CDBB" />
      </radialGradient>
      <radialGradient id={`${id}-nose`} cx="0.34" cy="0.3" r="0.78">
        <stop offset="0%" stopColor="#FF9089" />
        <stop offset="48%" stopColor="#F0141E" />
        <stop offset="100%" stopColor="#95090F" />
      </radialGradient>
      <radialGradient id={`${id}-eye`} cx="0.36" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="#7FB4FF" />
        <stop offset="52%" stopColor="#2C6BE0" />
        <stop offset="100%" stopColor="#123C8C" />
      </radialGradient>
    </defs>

    <g opacity={ghost ? 0.26 : 1}>
      {/* lavender curls */}
      <g fill={`url(#${id}-hair)`}>
        <circle cx="52" cy="152" r="46" />
        <circle cx="248" cy="152" r="46" />
        <circle cx="72" cy="94" r="40" />
        <circle cx="228" cy="94" r="40" />
        <circle cx="118" cy="58" r="36" />
        <circle cx="182" cy="58" r="36" />
        <circle cx="150" cy="46" r="30" />
        <circle cx="66" cy="198" r="34" />
        <circle cx="234" cy="198" r="34" />
      </g>
      <g fill="rgba(255,255,255,0.36)">
        <circle cx="40" cy="138" r="13" />
        <circle cx="60" cy="82" r="11" />
        <circle cx="108" cy="46" r="10" />
        <circle cx="216" cy="82" r="9" />
      </g>

      <circle cx="150" cy="164" r="102" fill={`url(#${id}-face)`} />
      <ellipse
        cx="112"
        cy="118"
        rx="40"
        ry="22"
        fill="rgba(255,255,255,0.45)"
        style={{ rotate: "-22deg", transformOrigin: "112px 118px" }}
      />

      <ellipse cx="112" cy="148" rx="17" ry="23" fill={`url(#${id}-eye)`} />
      <ellipse cx="188" cy="148" rx="17" ry="23" fill={`url(#${id}-eye)`} />
      <circle cx="106" cy="140" r="6" fill="#FFFFFF" />
      <circle cx="182" cy="140" r="6" fill="#FFFFFF" />

      <circle cx="150" cy="188" r="26" fill={`url(#${id}-nose)`} />
      <circle cx="142" cy="180" r="8" fill="rgba(255,255,255,0.65)" />

      <path
        d="M 88 210 C 106 264 194 264 212 210 C 190 228 110 228 88 210 Z"
        fill="#C8121A"
      />
      <path
        d="M 88 210 C 106 264 194 264 212 210"
        stroke="#F0141E"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 96 214 C 112 226 188 226 204 214"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  </svg>
);

/**
 * Yellow smiley in black sunglasses, pointing a finger straight down the lens.
 * The pointing hand is foreshortened - a fist seen end-on with the index
 * finger coming toward camera - so it reads as depth without any real 3D.
 */
export const SunglassesFace: React.FC<{ size: number; id: string }> = ({
  size,
  id,
}) => (
  <svg
    width={size}
    height={size * (380 / 300)}
    viewBox="0 0 300 380"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <defs>
      <radialGradient id={`${id}-face`} cx="0.34" cy="0.28" r="0.86">
        <stop offset="0%" stopColor="#FFE98F" />
        <stop offset="52%" stopColor="#FFC531" />
        <stop offset="100%" stopColor="#D9820A" />
      </radialGradient>
      <linearGradient id={`${id}-lens`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#484D53" />
        <stop offset="34%" stopColor="#16191C" />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
      <radialGradient id={`${id}-mouth`} cx="0.5" cy="0.2" r="0.9">
        <stop offset="0%" stopColor="#8A3B22" />
        <stop offset="100%" stopColor="#4B1A0C" />
      </radialGradient>
      <radialGradient id={`${id}-hand`} cx="0.36" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="#FFE07A" />
        <stop offset="56%" stopColor="#FFBE21" />
        <stop offset="100%" stopColor="#C97A08" />
      </radialGradient>
    </defs>

    <circle cx="150" cy="150" r="142" fill={`url(#${id}-face)`} />
    <circle
      cx="150"
      cy="150"
      r="142"
      fill="none"
      stroke="rgba(160,92,0,0.26)"
      strokeWidth="5"
    />
    <ellipse
      cx="102"
      cy="80"
      rx="54"
      ry="34"
      fill="rgba(255,255,255,0.3)"
      style={{ rotate: "-24deg", transformOrigin: "102px 80px" }}
    />

    {/* sunglasses */}
    <path d="M 22 116 L 278 116 L 278 131 L 22 131 Z" fill={`url(#${id}-lens)`} />
    <path
      d="M 32 116 L 140 116 L 136 168 C 132 191 110 202 88 202 C 57 202 39 179 35 150 Z"
      fill={`url(#${id}-lens)`}
    />
    <path
      d="M 160 116 L 268 116 L 265 150 C 261 179 243 202 212 202 C 190 202 168 191 164 168 Z"
      fill={`url(#${id}-lens)`}
    />
    <path
      d="M 140 120 C 146 131 154 131 160 120"
      stroke="#16191C"
      strokeWidth="12"
      fill="none"
    />
    <path
      d="M 46 137 L 78 137 M 176 137 L 212 137"
      stroke="rgba(255,255,255,0.42)"
      strokeWidth="9"
      strokeLinecap="round"
    />

    {/* smile */}
    <path
      d="M 96 220 C 118 254 182 254 204 220 C 182 238 118 238 96 220 Z"
      fill={`url(#${id}-mouth)`}
    />
    <path
      d="M 96 220 C 118 254 182 254 204 220"
      stroke="#4B1A0C"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 104 222 C 122 232 178 232 196 222"
      stroke="#FFFFFF"
      strokeWidth="9"
      strokeLinecap="round"
      fill="none"
    />

    {/* pointing hand, seen end-on: fist behind, index finger toward camera */}
    <g>
      <ellipse cx="196" cy="332" rx="66" ry="58" fill={`url(#${id}-hand)`} />
      <ellipse
        cx="196"
        cy="332"
        rx="66"
        ry="58"
        fill="none"
        stroke="rgba(160,92,0,0.35)"
        strokeWidth="4"
      />
      <path
        d="M 168 306 q 28 -12 56 0 M 166 330 q 30 -12 60 0 M 170 354 q 26 -12 52 0"
        stroke="rgba(160,92,0,0.42)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="176" cy="300" rx="42" ry="30" fill={`url(#${id}-hand)`} />
      <circle cx="168" cy="292" r="30" fill="#FFD259" />
      <circle
        cx="168"
        cy="292"
        r="30"
        fill="none"
        stroke="rgba(160,92,0,0.3)"
        strokeWidth="4"
      />
      <ellipse cx="158" cy="282" rx="12" ry="8" fill="rgba(255,255,255,0.55)" />
    </g>
  </svg>
);
