import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, OUT } from "./Wall";
import { BrushSwoosh } from "../props/Marks";
import { GEO, GROTESQUE, INK, RED, sec } from "./tokens";

/** Fade and slide up, the one move every corner element shares. */
const arrive = (frame: number, at: number) => ({
  opacity: interpolate(frame, [at, at + 8], [0, 1], CLAMP),
  translate: `0px ${interpolate(frame, [at, at + 12], [16, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px`,
});

/**
 * The compact logo lockup at the top left: the same two words as the hero,
 * at about a quarter of the size, with the brush underline shortened to match.
 */
export const LogoLockup: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", left: 58, top: 198, ...arrive(frame, sec(8.4)) }}>
      <div
        style={{
          fontFamily: GEO,
          fontWeight: 900,
          fontSize: 42,
          lineHeight: "44px",
          letterSpacing: "-0.048em",
          color: RED,
          whiteSpace: "nowrap",
        }}
      >
        design
        <span style={{ fontSize: "1.32em", letterSpacing: "normal" }}>.</span>
      </div>
      <div
        style={{
          width: 118,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: GROTESQUE,
          fontSize: 26,
          lineHeight: 1,
          color: INK,
          marginTop: 4,
        }}
      >
        {"GRIDS".split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
      <div style={{ marginTop: 4 }}>
        <BrushSwoosh width={96} progress={1} />
      </div>
    </div>
  );
};

/** The tagline strip at the top right, bullets in brand red. */
export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        right: 56,
        top: 92,
        display: "flex",
        alignItems: "center",
        gap: 9,
        fontFamily: GEO,
        fontWeight: 500,
        fontSize: 20,
        letterSpacing: "0.01em",
        color: INK,
        whiteSpace: "nowrap",
        ...arrive(frame, sec(8.5)),
      }}
    >
      Creative
      <span style={{ color: RED, fontSize: 22 }}>&bull;</span>
      Modern
      <span style={{ color: RED, fontSize: 22 }}>&bull;</span>
      Professional
    </div>
  );
};

/** The two-line credit block at the bottom left, behind a short red bar. */
export const Credits: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        top: 1146,
        display: "flex",
        gap: 16,
        ...arrive(frame, sec(8.6)),
      }}
    >
      <div style={{ width: 6, borderRadius: 3, backgroundColor: RED }} />
      <div
        style={{
          fontFamily: GEO,
          fontWeight: 700,
          fontSize: 21,
          lineHeight: 1.42,
          letterSpacing: "0.085em",
          color: INK,
        }}
      >
        <div>ESTD. 2024</div>
        <div>LOCATED IN SYL</div>
      </div>
    </div>
  );
};
