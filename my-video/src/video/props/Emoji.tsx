/** Large 3D clown-face emoji: red curly hair, white face, blue eyes, red nose, wide red smile. */
export const ClownFace: React.FC<{ size: number; id: string }> = ({
  size,
  id,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none">
      <defs>
        <radialGradient id={"clownhair-" + id} cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#FF6A62" />
          <stop offset="46%" stopColor="#EE2029" />
          <stop offset="100%" stopColor="#A50D14" />
        </radialGradient>
        <radialGradient id={"clownface-" + id} cx="0.36" cy="0.28" r="0.82">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="62%" stopColor="#F6F1EC" />
          <stop offset="100%" stopColor="#D6CCC4" />
        </radialGradient>
        <radialGradient id={"clownnose-" + id} cx="0.34" cy="0.3" r="0.78">
          <stop offset="0%" stopColor="#FF8A80" />
          <stop offset="48%" stopColor="#F0141E" />
          <stop offset="100%" stopColor="#9E0B12" />
        </radialGradient>
        <radialGradient id={"clowneye-" + id} cx="0.36" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#7FB4FF" />
          <stop offset="52%" stopColor="#2C6BE0" />
          <stop offset="100%" stopColor="#123C8C" />
        </radialGradient>
      </defs>

      {/* curly hair puffs */}
      <g fill={"url(#clownhair-" + id + ")"}>
        <circle cx="52" cy="150" r="46" />
        <circle cx="248" cy="150" r="46" />
        <circle cx="72" cy="92" r="40" />
        <circle cx="228" cy="92" r="40" />
        <circle cx="118" cy="58" r="36" />
        <circle cx="182" cy="58" r="36" />
        <circle cx="150" cy="46" r="30" />
        <circle cx="66" cy="196" r="34" />
        <circle cx="234" cy="196" r="34" />
      </g>
      <g fill="rgba(255,255,255,0.32)">
        <circle cx="40" cy="136" r="13" />
        <circle cx="60" cy="80" r="11" />
        <circle cx="108" cy="46" r="10" />
        <circle cx="216" cy="80" r="9" />
      </g>

      {/* face */}
      <circle cx="150" cy="162" r="102" fill={"url(#clownface-" + id + ")"} />

      {/* eyes */}
      <ellipse
        cx="112"
        cy="146"
        rx="17"
        ry="23"
        fill={"url(#clowneye-" + id + ")"}
      />
      <ellipse
        cx="188"
        cy="146"
        rx="17"
        ry="23"
        fill={"url(#clowneye-" + id + ")"}
      />
      <circle cx="106" cy="138" r="6" fill="#FFFFFF" />
      <circle cx="182" cy="138" r="6" fill="#FFFFFF" />

      {/* nose */}
      <circle cx="150" cy="186" r="26" fill={"url(#clownnose-" + id + ")"} />
      <circle cx="142" cy="178" r="8" fill="rgba(255,255,255,0.65)" />

      {/* wide red smile */}
      <path
        d="M 88 208 C 106 262 194 262 212 208 C 190 226 110 226 88 208 Z"
        fill="#C8121A"
      />
      <path
        d="M 88 208 C 106 262 194 262 212 208"
        stroke="#F0141E"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 96 212 C 112 224 188 224 204 212"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

/** Large 3D smiling-face-with-sunglasses emoji, pointing forward. */
export const SunglassesFace: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none">
      <defs>
        <radialGradient id="sunface" cx="0.34" cy="0.28" r="0.84">
          <stop offset="0%" stopColor="#FFE27A" />
          <stop offset="54%" stopColor="#FFC531" />
          <stop offset="100%" stopColor="#E08A0B" />
        </radialGradient>
        <linearGradient id="sunlens" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#43484E" />
          <stop offset="34%" stopColor="#16191C" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <radialGradient id="sunmouth" cx="0.5" cy="0.2" r="0.9">
          <stop offset="0%" stopColor="#8A3B22" />
          <stop offset="100%" stopColor="#4B1A0C" />
        </radialGradient>
      </defs>

      <circle cx="150" cy="150" r="142" fill="url(#sunface)" />
      <circle
        cx="150"
        cy="150"
        r="142"
        fill="none"
        stroke="rgba(160,92,0,0.28)"
        strokeWidth="5"
      />
      <ellipse
        cx="104"
        cy="82"
        rx="52"
        ry="34"
        fill="rgba(255,255,255,0.28)"
        style={{ rotate: "-24deg", transformOrigin: "104px 82px" }}
      />

      {/* sunglasses */}
      <path d="M 24 118 L 276 118 L 276 132 L 24 132 Z" fill="url(#sunlens)" />
      <path
        d="M 34 118 L 140 118 L 136 168 C 132 190 110 200 88 200 C 58 200 40 178 36 150 Z"
        fill="url(#sunlens)"
      />
      <path
        d="M 160 118 L 266 118 L 264 150 C 260 178 242 200 212 200 C 190 200 168 190 164 168 Z"
        fill="url(#sunlens)"
      />
      <path
        d="M 140 122 C 146 132 154 132 160 122"
        stroke="#16191C"
        strokeWidth="12"
        fill="none"
      />
      <path
        d="M 48 138 L 78 138 M 176 138 L 210 138"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* smile */}
      <path
        d="M 96 218 C 118 252 182 252 204 218 C 182 236 118 236 96 218 Z"
        fill="url(#sunmouth)"
      />
      <path
        d="M 96 218 C 118 252 182 252 204 218"
        stroke="#4B1A0C"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 104 220 C 122 230 178 230 196 220"
        stroke="#FFFFFF"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
