import React from "react";
import { interpolate } from "remotion";
import { blurStyle, OUT, snap } from "./motion";
import { dur, PILL, SANS } from "./tokens";

export type Place = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: number;
  align?: "left" | "right" | "center";
};

export const Positioned: React.FC<{
  place: Place;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ place, style, children }) => (
  <div
    style={{
      position: "absolute",
      left: place.left,
      right: place.right,
      top: place.top,
      bottom: place.bottom,
      width: place.width,
      textAlign: place.align ?? "left",
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * A line of type that snaps on.
 *
 * This is the only way type arrives in the piece: a fast scale-and-blur, never
 * a slow dissolve. `from` above 1 gives the scale-down variant.
 */
export const SnapLine: React.FC<{
  local: number;
  at: number;
  text: string;
  size: number;
  weight: number;
  colour: string;
  place: Place;
  from?: number;
  tracking?: number;
  lineHeight?: number;
  origin?: string;
}> = ({
  local,
  at,
  text,
  size,
  weight,
  colour,
  place,
  from = 0.82,
  tracking = -0.02,
  lineHeight = 0.98,
  origin = "center center",
}) => {
  const s = snap(local, at, { from });
  if (s.opacity <= 0) return null;

  return (
    <Positioned place={place}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: size,
          fontWeight: weight,
          color: colour,
          letterSpacing: `${tracking}em`,
          lineHeight,
          whiteSpace: "pre",
          opacity: s.opacity,
          transform: `scale(${s.scale})`,
          transformOrigin: origin,
          ...blurStyle(s.blur),
        }}
      >
        {text}
      </div>
    </Positioned>
  );
};

/** Letter-by-letter build. Shot 7 only. */
export const Typewriter: React.FC<{
  local: number;
  at: number;
  over: number;
  text: string;
  size: number;
  weight: number;
  colour: string;
  place: Place;
}> = ({ local, at, over, text, size, weight, colour, place }) => {
  const chars = Math.floor(
    interpolate(local, [dur(at), dur(at + over)], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  if (chars <= 0) return null;

  return (
    <Positioned place={place}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: size,
          fontWeight: weight,
          color: colour,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          whiteSpace: "pre",
        }}
      >
        {/* The line stays centre-locked: the full string holds the width and
            the characters that have not landed yet are simply invisible. */}
        {Array.from(text).map((c, i) => (
          <span key={i} style={{ opacity: i < chars ? 1 : 0 }}>
            {c}
          </span>
        ))}
      </div>
    </Positioned>
  );
};

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

/**
 * Digital scramble reveal: each glyph cycles through junk characters before
 * snapping to its real one. Deterministic, driven only by the frame.
 */
export const scrambleText = (text: string, frame: number, at: number, over: number) => {
  const p = interpolate(frame, [dur(at), dur(at + over)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const landed = p * text.length;

  return Array.from(text).map((c, i) => {
    if (i < landed - 0.5) return c;
    if (i > landed + 3 || c === " ") return c === " " ? " " : "";
    const k = (i * 7 + Math.floor(frame / 2) * 13) % SCRAMBLE.length;
    return SCRAMBLE[k];
  });
};

/** One dark chat pill with near-white text. Shot 8 only. */
export const Pill: React.FC<{
  local: number;
  at: number;
  text: string;
  size: number;
  top: number;
}> = ({ local, at, text, size, top }) => {
  const s = snap(local, at, { from: 0.86, length: 0.2 });
  if (s.opacity <= 0) return null;

  // Lands with a few pixels of upward slide and a faint edge glow.
  const rise = interpolate(local, [dur(at), dur(at + 0.24)], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
  const glow = interpolate(local, [dur(at), dur(at + 0.5)], [0.55, 0.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity: s.opacity,
        transform: `translateY(${rise}px) scale(${s.scale})`,
        ...blurStyle(s.blur),
      }}
    >
      <div
        style={{
          background: PILL,
          color: "#F4F3F0",
          fontFamily: SANS,
          fontSize: size,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          padding: `${size * 0.62}px ${size * 0.92}px`,
          borderRadius: 999,
          whiteSpace: "pre",
          boxShadow: `0 0 ${size * 0.9}px rgba(46,46,46,${glow}), 0 ${size * 0.3}px ${size * 0.8}px rgba(23,23,23,0.18)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/**
 * Heavy directional blur, used once: the whole pill stack smearing upward and
 * out of frame at the end of shot 8.
 */
export const SmearFilter: React.FC<{ id: string; amount: number }> = ({ id, amount }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <filter id={id} x="-30%" y="-140%" width="160%" height="380%" colorInterpolationFilters="sRGB">
      <feGaussianBlur stdDeviation={`${Math.max(0.01, amount * 0.12)} ${Math.max(0.01, amount)}`} />
    </filter>
  </svg>
);
