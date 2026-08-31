const stroke = {
  stroke: "#FFFFFF",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const Slash: React.FC = () => <path d="M 7 33 L 33 7" {...stroke} />;

/** Crossed-out eye. */
export const NoEyeIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <path
      d="M 5 20 C 10 12 15 9 20 9 C 25 9 30 12 35 20 C 30 28 25 31 20 31 C 15 31 10 28 5 20 Z"
      {...stroke}
    />
    <circle cx="20" cy="20" r="5.4" {...stroke} />
    <Slash />
  </svg>
);

/** Crossed-out target. */
export const NoTargetIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="13" {...stroke} />
    <circle cx="20" cy="20" r="7" {...stroke} />
    <circle cx="20" cy="20" r="1.8" fill="#FFFFFF" stroke="none" />
    <Slash />
  </svg>
);

/** Crossed-out money note. */
export const NoMoneyIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <rect x="4" y="11" width="32" height="18" rx="3" {...stroke} />
    <circle cx="20" cy="20" r="4.4" {...stroke} />
    <path d="M 9 16 L 9 24 M 31 16 L 31 24" {...stroke} />
    <Slash />
  </svg>
);
