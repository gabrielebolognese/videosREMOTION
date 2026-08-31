/** Small blue butterfly that drifts in beside the words. */
export const Butterfly: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="wingblue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6FA8FF" />
          <stop offset="60%" stopColor="#2C6BE0" />
          <stop offset="100%" stopColor="#17408F" />
        </linearGradient>
      </defs>
      <path
        d="M 58 60 C 34 22 6 20 8 46 C 10 70 34 74 58 60 Z"
        fill="url(#wingblue)"
      />
      <path
        d="M 62 60 C 86 22 114 20 112 46 C 110 70 86 74 62 60 Z"
        fill="url(#wingblue)"
      />
      <path
        d="M 58 62 C 40 82 24 100 40 106 C 54 110 58 88 58 62 Z"
        fill="#2C6BE0"
      />
      <path
        d="M 62 62 C 80 82 96 100 80 106 C 66 110 62 88 62 62 Z"
        fill="#2C6BE0"
      />
      <path
        d="M 24 34 C 34 40 46 50 56 60 M 96 34 C 86 40 74 50 64 60"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="56" y="42" width="8" height="44" rx="4" fill="#0F2B60" />
      <path
        d="M 58 44 C 52 32 44 28 40 26 M 62 44 C 68 32 76 28 80 26"
        stroke="#0F2B60"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

/** Blue pushpin, seen slightly from the side. */
export const BluePin: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="pinblue" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#8CBBFF" />
          <stop offset="52%" stopColor="#2C6BE0" />
          <stop offset="100%" stopColor="#123C8C" />
        </radialGradient>
      </defs>
      <path
        d="M 60 76 L 60 112"
        stroke="#9AA3AA"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <ellipse cx="60" cy="58" rx="34" ry="26" fill="url(#pinblue)" />
      <ellipse cx="60" cy="42" rx="26" ry="16" fill="rgba(255,255,255,0.28)" />
      <ellipse cx="60" cy="74" rx="18" ry="9" fill="#123C8C" />
    </svg>
  );
};

/** Rounded red pushpin that holds the note card on the page. */
export const RedPin: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="pinred" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#FF8A80" />
          <stop offset="48%" stopColor="#F0141E" />
          <stop offset="100%" stopColor="#8E0A10" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="38" fill="url(#pinred)" />
      <circle cx="48" cy="46" r="11" fill="rgba(255,255,255,0.62)" />
      <circle cx="60" cy="60" r="10" fill="rgba(120,8,14,0.5)" />
    </svg>
  );
};
