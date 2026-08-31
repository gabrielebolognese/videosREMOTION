import { BADGE } from "../lib/tokens";

/** Ten alternating points, starting at twelve o'clock. */
const starPoints = (cx: number, cy: number, outer: number, inner: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return `${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`;
  }).join(" ");

/**
 * The mark itself, drawn as line work in a 200x200 box: a five point star
 * above two curved leaves. Shared by the printed badge and the wall relief so
 * the two can never drift apart.
 */
const BadgeMarks: React.FC<{ stroke: string; width: number }> = ({
  stroke,
  width,
}) => (
  <g
    stroke={stroke}
    strokeWidth={width}
    fill="none"
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    <circle cx="100" cy="100" r="86" strokeWidth={width * 0.8} />
    <polygon points={starPoints(100, 72, 30, 13)} />
    <path d="M 100 150 C 78 146, 62 130, 60 108 C 82 110, 98 128, 100 150 Z" />
    <path d="M 100 150 C 122 146, 138 130, 140 108 C 118 110, 102 128, 100 150 Z" />
    <path d="M 100 128 L 100 154" strokeWidth={width * 0.85} />
  </g>
);

/**
 * The café roundel. `printed` is the emerald disc that sits on the cups;
 * `relief` is the same mark embossed into the wall, carrying no colour of its
 * own - just a highlight up-left and a shadow down-right, matching the key.
 */
export const Badge: React.FC<{
  size: number;
  variant?: "printed" | "relief" | "sign";
  opacity?: number;
}> = ({ size, variant = "printed", opacity = 1 }) => {
  const id = `badge-${variant}`;

  if (variant === "relief") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" opacity={opacity}>
        <defs>
          <radialGradient id={`${id}-face`} cx="0.34" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="62%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(120,138,128,0.16)" />
          </radialGradient>
        </defs>
        {/* the raised disc, lit from upper left */}
        <circle cx="100" cy="100" r="96" fill={`url(#${id}-face)`} />
        <circle
          cx="99"
          cy="99"
          r="96"
          fill="none"
          stroke="rgba(255,255,255,0.62)"
          strokeWidth="2.6"
        />
        <circle
          cx="101.5"
          cy="101.5"
          r="96"
          fill="none"
          stroke="rgba(120,138,128,0.34)"
          strokeWidth="2.6"
        />
        {/* the mark, cut in relief: highlight above, shadow below */}
        <g transform="translate(-1.6 -1.6)">
          <BadgeMarks stroke="rgba(255,255,255,0.66)" width={5} />
        </g>
        <g transform="translate(1.6 1.6)">
          <BadgeMarks stroke="rgba(116,134,124,0.36)" width={5} />
        </g>
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" opacity={opacity}>
      <defs>
        <radialGradient id={`${id}-disc`} cx="0.36" cy="0.3" r="0.82">
          <stop offset="0%" stopColor="#15834B" />
          <stop offset="64%" stopColor={BADGE} />
          <stop offset="100%" stopColor="#064E2C" />
        </radialGradient>
        {variant === "sign" ? (
          <filter id={`${id}-glow`} x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        ) : null}
      </defs>
      {variant === "sign" ? (
        <circle cx="100" cy="100" r="96" fill="#2ED27E" opacity="0.55" filter={`url(#${id}-glow)`} />
      ) : null}
      <circle cx="100" cy="100" r="98" fill={`url(#${id}-disc)`} />
      <BadgeMarks stroke="#FFFFFF" width={5} />
    </svg>
  );
};
