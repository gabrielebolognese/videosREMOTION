const CHARCOAL_DARK = [38, 38, 36];
const CHARCOAL_LIGHT = [118, 118, 112];

const shade = (t: number) => {
  const r = Math.round(
    CHARCOAL_DARK[0] + (CHARCOAL_LIGHT[0] - CHARCOAL_DARK[0]) * t,
  );
  const g = Math.round(
    CHARCOAL_DARK[1] + (CHARCOAL_LIGHT[1] - CHARCOAL_DARK[1]) * t,
  );
  const b = Math.round(
    CHARCOAL_DARK[2] + (CHARCOAL_LIGHT[2] - CHARCOAL_DARK[2]) * t,
  );
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Matte charcoal multi-point star burst, built facet by facet so it reads as a
 * folded paper star rather than a flat polygon. Each spike is split into two
 * triangles and shaded against a key light sitting up and to the left.
 */
export const StarBurst: React.FC<{
  size: number;
  spikes?: number;
  rotate?: number;
  innerRatio?: number;
}> = ({ size, spikes = 7, rotate = 0, innerRatio = 0.36 }) => {
  const c = 100;
  const outerR = 96;
  const innerR = outerR * innerRatio;
  const step = (Math.PI * 2) / spikes;
  const base = (rotate * Math.PI) / 180 - Math.PI / 2;

  const pt = (angle: number, radius: number) =>
    `${(c + Math.cos(angle) * radius).toFixed(2)},${(c + Math.sin(angle) * radius).toFixed(2)}`;

  const facets: { points: string; fill: string }[] = [];

  for (let i = 0; i < spikes; i++) {
    const a = base + i * step;
    const outer = pt(a, outerR);
    const prev = pt(a - step / 2, innerR);
    const next = pt(a + step / 2, innerR);
    // Light from up-left: facets facing that way catch more of it.
    const litLeft = 0.5 + 0.5 * Math.cos(a - step * 0.28 - Math.PI * 1.25);
    const litRight = 0.5 + 0.5 * Math.cos(a + step * 0.28 - Math.PI * 1.25);

    facets.push({
      points: `${c},${c} ${prev} ${outer}`,
      fill: shade(0.18 + litLeft * 0.72),
    });
    facets.push({
      points: `${c},${c} ${outer} ${next}`,
      fill: shade(0.05 + litRight * 0.5),
    });
  }

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {facets.map((facet, i) => (
        <polygon key={i} points={facet.points} fill={facet.fill} />
      ))}
    </svg>
  );
};
