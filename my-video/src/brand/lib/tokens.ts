import { MARKER, ROUNDED, SERIF } from "../fonts";

/** Palette locked to the brief. */
export const OFF_WHITE = "#F4F3F1";
export const PALE_GREY = "#E2E1DF";
export const MID_GREY = "#9C9A97";
export const NEAR_BLACK = "#141414";
export const ACCENT_RED = "#E1252B";
export const SKY_BLUE = "#3D9BE9";
export const BRAIN_PINK = "#E9B4B1";
export const ACID_YELLOW = "#D8DF1E";
export const STEEL_BLUE = "#7E9AB4";

/** Light italic mid-grey setup line. */
export const setup = (
  fontSize: number,
  color: string = MID_GREY,
): React.CSSProperties => ({
  fontFamily: SERIF,
  fontStyle: "italic",
  fontWeight: 400,
  fontSize,
  lineHeight: 1.04,
  letterSpacing: "-0.012em",
  color,
  whiteSpace: "nowrap",
});

/** Heavy italic near-black key word. */
export const key = (
  fontSize: number,
  color: string = NEAR_BLACK,
): React.CSSProperties => ({
  fontFamily: SERIF,
  fontStyle: "italic",
  fontWeight: 900,
  fontSize,
  lineHeight: 0.94,
  letterSpacing: "-0.028em",
  color,
  whiteSpace: "nowrap",
});

/** Rounded comic marker face, only for "Playful Fonts". */
export const playful = (fontSize: number): React.CSSProperties => ({
  fontFamily: MARKER,
  fontWeight: 800,
  fontSize,
  lineHeight: 1,
  letterSpacing: "-0.005em",
  color: NEAR_BLACK,
  whiteSpace: "nowrap",
});

/** Bold rounded sans, only for "Calm Blue text". */
export const calm = (fontSize: number): React.CSSProperties => ({
  fontFamily: ROUNDED,
  fontWeight: 800,
  fontSize,
  lineHeight: 1,
  letterSpacing: "-0.02em",
  color: SKY_BLUE,
  whiteSpace: "nowrap",
});

/**
 * Tints a glow to the element's own text colour. Returns undefined for
 * anything that is not text, so cards and props get no halo.
 */
export const glowFrom = (color?: string, alpha = 0.26): string | undefined => {
  if (typeof color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(color)) {
    return undefined;
  }
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Soft natural drop shadow under floating cards and icons. */
export const CARD_SHADOW =
  "0 30px 54px rgba(20,20,20,0.16), 0 8px 16px rgba(20,20,20,0.09)";
export const PROP_SHADOW =
  "0 18px 34px rgba(20,20,20,0.14), 0 4px 9px rgba(20,20,20,0.08)";

/**
 * Sits behind the transition series. Only ever visible in the gap a flip or a
 * page turn opens up, where it reads as the surface the cards sit on.
 */
export const TRANSITION_GROUND = "#D3D0CB";
