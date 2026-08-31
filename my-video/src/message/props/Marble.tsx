/**
 * Shared marble. Every statue in the piece is cut from the same block: cool
 * white, lit from the upper left, with the shadow side falling to a warm grey.
 * The gradients are declared per-instance because two busts can be on the
 * sheet at once and SVG ids are global.
 */
export const MarbleDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <linearGradient id={`${id}-stone`} x1="0.08" y1="0" x2="0.92" y2="0.86">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="26%" stopColor="#F4F2EC" />
      <stop offset="62%" stopColor="#DCD8CF" />
      <stop offset="100%" stopColor="#B4B0A6" />
    </linearGradient>
    <linearGradient id={`${id}-shade`} x1="0.1" y1="0" x2="0.9" y2="0.8">
      <stop offset="0%" stopColor="#E6E3DB" />
      <stop offset="55%" stopColor="#C6C2B9" />
      <stop offset="100%" stopColor="#9C988F" />
    </linearGradient>
    <linearGradient id={`${id}-cloth`} x1="0.12" y1="0" x2="0.88" y2="1">
      <stop offset="0%" stopColor="#FBFAF6" />
      <stop offset="48%" stopColor="#E4E0D7" />
      <stop offset="100%" stopColor="#ADA99F" />
    </linearGradient>
    <linearGradient id={`${id}-plinth`} x1="0.1" y1="0" x2="0.95" y2="0.7">
      <stop offset="0%" stopColor="#EDE9DF" />
      <stop offset="46%" stopColor="#D2CEC4" />
      <stop offset="100%" stopColor="#A6A299" />
    </linearGradient>
  </defs>
);

/**
 * A mass of curls, laid over the top of a skull rather than drawn strand by
 * strand: one shadowed cap, then a scatter of lit lobes along its edge. Both
 * busts and the thinker share it, so the three heads read as one workshop.
 */
export const Curls: React.FC<{
  id: string;
  /** Centres for the lit lobes, in the parent viewBox. */
  lobes: [number, number][];
  cap: string;
  r?: number;
}> = ({ id, lobes, cap, r = 17 }) => (
  <>
    <path d={cap} fill={`url(#${id}-shade)`} />
    {lobes.map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill="#EFEBE2"
        stroke="rgba(126,122,112,0.30)"
        strokeWidth="3"
      />
    ))}
  </>
);
