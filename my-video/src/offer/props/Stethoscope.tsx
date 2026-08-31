/**
 * Blue rubber stethoscope with a glowing chestpiece.
 *
 * The bead in the middle of the diaphragm is the only light source the prop
 * carries; it is what the red shot picks up as its blue accent.
 */
export const Stethoscope: React.FC<{ width: number; glow?: number }> = ({
  width,
  glow = 1,
}) => {
  const id = "steth";

  return (
    <svg
      width={width}
      height={width * (560 / 420)}
      viewBox="0 0 420 560"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-tube`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#7A7DF0" />
          <stop offset="46%" stopColor="#4A4EDE" />
          <stop offset="100%" stopColor="#2A2EA4" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#E6E9F6" />
          <stop offset="48%" stopColor="#A9AFC6" />
          <stop offset="100%" stopColor="#6E7590" />
        </linearGradient>
        <radialGradient id={`${id}-bead`} cx="0.5" cy="0.42" r="0.6">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#8F93FF" />
          <stop offset="100%" stopColor="#3236C4" />
        </radialGradient>
        <filter id={`${id}-halo`} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* ear tubes and the Y junction */}
      <path
        d="M 76 78 C 44 168, 92 246, 178 292"
        stroke={`url(#${id}-tube)`}
        strokeWidth="24"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 344 78 C 376 168, 328 246, 242 292"
        stroke={`url(#${id}-tube)`}
        strokeWidth="24"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 76 78 C 46 166, 92 244, 178 290"
        stroke="rgba(255,255,255,0.34)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        transform="translate(-5 -4)"
      />

      {/* ear tips */}
      <ellipse cx="70" cy="66" rx="26" ry="20" fill={`url(#${id}-metal)`} transform="rotate(-22 70 66)" />
      <ellipse cx="350" cy="66" rx="26" ry="20" fill={`url(#${id}-metal)`} transform="rotate(22 350 66)" />

      {/* main tube down to the chestpiece */}
      <path
        d="M 178 292 C 196 312, 210 330, 210 358"
        stroke={`url(#${id}-tube)`}
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 242 292 C 224 312, 210 330, 210 358"
        stroke={`url(#${id}-tube)`}
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />

      {/* the glow the chestpiece throws onto the backdrop */}
      {glow > 0 ? (
        <circle
          cx="210"
          cy="430"
          r="70"
          fill="#4A4EDE"
          opacity={0.55 * glow}
          filter={`url(#${id}-halo)`}
        />
      ) : null}

      {/* chestpiece: stem, metal ring, blue diaphragm, glowing bead */}
      <rect x="192" y="336" width="36" height="46" rx="14" fill={`url(#${id}-metal)`} />
      <circle cx="210" cy="430" r="80" fill={`url(#${id}-metal)`} />
      <circle cx="210" cy="430" r="66" fill={`url(#${id}-tube)`} />
      <circle
        cx="210"
        cy="430"
        r="66"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="3"
      />
      <circle cx="210" cy="430" r="30" fill={`url(#${id}-bead)`} />
      <circle cx="210" cy="430" r="30" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <path
        d="M 158 396 C 172 376, 196 366, 218 368"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
