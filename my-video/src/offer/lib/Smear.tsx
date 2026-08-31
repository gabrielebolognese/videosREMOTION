import { useId } from "react";

/**
 * Directional motion blur.
 *
 * A CSS `blur()` is radial and reads as soft focus; a whip pan needs the smear
 * to run along the direction of travel only, which is an SVG feGaussianBlur
 * with a two-axis deviation. The filter is only mounted while it is actually
 * doing something, since a full-frame filter is not free.
 */
export const Smear: React.FC<{
  /** Horizontal smear in pixels. Below 0.4 the filter is dropped entirely. */
  amount: number;
  /** Optional radial blur composed on top, for the cross-blur transitions. */
  blur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ amount, blur = 0, style, children }) => {
  const id = `smear-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const smearing = amount > 0.4;
  const blurring = blur > 0.2;

  const filter = smearing
    ? blurring
      ? `url(#${id}) blur(${blur.toFixed(2)}px)`
      : `url(#${id})`
    : blurring
      ? `blur(${blur.toFixed(2)}px)`
      : undefined;

  return (
    <div style={{ position: "absolute", inset: 0, filter, ...style }}>
      {smearing ? (
        <svg
          width="0"
          height="0"
          style={{ position: "absolute", pointerEvents: "none" }}
        >
          <filter
            id={id}
            x="-70%"
            y="-30%"
            width="240%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation={`${amount.toFixed(2)} 0`} />
          </filter>
        </svg>
      ) : null}
      {children}
    </div>
  );
};
