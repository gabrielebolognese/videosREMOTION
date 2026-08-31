/**
 * Headless business figure built from black halftone dot texture: dotted suit
 * jacket, dotted polka tie, white shirt cuffs, arms crossed. The glowing white
 * circle that stands in for the head is drawn by the scene on top of this.
 *
 * The silhouette carries the upper arms, so only the crossed forearms are drawn
 * as separate shapes on top of the chest.
 */
export const SuitFigure: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * (700 / 460)}
      viewBox="0 0 460 700"
      fill="none"
    >
      <defs>
        <pattern
          id="halftone"
          width="13"
          height="13"
          patternUnits="userSpaceOnUse"
        >
          <rect width="13" height="13" fill="#050505" />
          <circle cx="6.5" cy="6.5" r="4" fill="rgba(255,255,255,0.20)" />
        </pattern>
        <pattern
          id="halftonefine"
          width="11"
          height="11"
          patternUnits="userSpaceOnUse"
        >
          <rect width="11" height="11" fill="#0B0B0B" />
          <circle cx="5.5" cy="5.5" r="3" fill="rgba(255,255,255,0.28)" />
        </pattern>
        <pattern id="polka" width="17" height="17" patternUnits="userSpaceOnUse">
          <rect width="17" height="17" fill="#101010" />
          <circle cx="4.5" cy="4.5" r="2.8" fill="rgba(255,255,255,0.78)" />
          <circle cx="13" cy="13" r="2.8" fill="rgba(255,255,255,0.78)" />
        </pattern>
        <filter id="rimglow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="armshadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* backlit halo bleeding around the silhouette */}
      <g filter="url(#rimglow)" opacity="0.5">
        <path
          d="M 196 116 L 122 152 Q 60 182 44 250 L 58 700 L 402 700 L 416 250 Q 400 182 338 152 L 264 116 L 230 254 Z"
          fill="rgba(255,255,255,0.6)"
        />
      </g>

      {/* white shirt inside the V, with the polka tie over it */}
      <path d="M 188 104 L 272 104 L 230 284 Z" fill="#F2F2EE" />
      <path
        d="M 208 128 L 252 128 L 262 244 L 230 280 L 198 244 Z"
        fill="url(#polka)"
      />
      <path
        d="M 208 122 L 252 122 L 262 240 L 230 276 L 198 240 Z"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* shirt collar */}
      <path d="M 188 104 L 224 122 L 202 168 Z" fill="#FFFFFF" />
      <path d="M 272 104 L 236 122 L 258 168 Z" fill="#FFFFFF" />

      {/* jacket, broad shouldered, arms inside the silhouette */}
      <path
        d="M 196 116 L 122 152 Q 60 182 44 250 L 58 700 L 402 700 L 416 250 Q 400 182 338 152 L 264 116 L 230 254 Z"
        fill="url(#halftone)"
      />
      <path
        d="M 196 116 L 122 152 Q 60 182 44 250 L 58 700 L 402 700 L 416 250 Q 400 182 338 152 L 264 116 L 230 254 Z"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* lapels */}
      <path
        d="M 196 116 L 230 254 L 196 350 L 148 180 Z"
        fill="url(#halftonefine)"
      />
      <path
        d="M 264 116 L 230 254 L 264 350 L 312 180 Z"
        fill="url(#halftonefine)"
      />
      <path
        d="M 196 116 L 230 254 L 196 350 M 264 116 L 230 254 L 264 350"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="2.2"
        fill="none"
      />

      {/* crossed forearms - the one rising to the left sits underneath */}
      <g style={{ rotate: "13deg", transformOrigin: "230px 340px" }}>
        <rect
          x="52"
          y="306"
          width="356"
          height="66"
          rx="33"
          fill="url(#halftonefine)"
        />
        <rect
          x="52"
          y="306"
          width="356"
          height="66"
          rx="33"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2.4"
          fill="none"
        />
        <rect x="60" y="313" width="36" height="52" rx="16" fill="#F2F2EE" />
      </g>
      <g style={{ rotate: "-13deg", transformOrigin: "230px 340px" }}>
        <rect
          x="52"
          y="300"
          width="356"
          height="78"
          rx="39"
          fill="#000000"
          opacity="0.65"
          filter="url(#armshadow)"
        />
        <rect
          x="52"
          y="306"
          width="356"
          height="66"
          rx="33"
          fill="url(#halftone)"
        />
        <rect
          x="52"
          y="306"
          width="356"
          height="66"
          rx="33"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.6"
          fill="none"
        />
        <rect x="364" y="313" width="36" height="52" rx="16" fill="#F2F2EE" />
      </g>

      {/* hard rim light down the shoulders and the left flank */}
      <path
        d="M 196 118 L 122 154 Q 61 184 46 252"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 264 118 L 338 154 Q 399 184 414 252"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 48 420 L 58 700"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
