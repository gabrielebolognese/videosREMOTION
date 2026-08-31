import { AbsoluteFill } from "remotion";
import { BRICK, PAPER } from "./tokens";

/**
 * Paper fibre. A single static turbulence pass at very low opacity - the brief
 * asks for a sharp digital look with no film grain, so the seed never moves
 * and the texture reads as stock rather than noise.
 */
const Fibre: React.FC<{ opacity?: number }> = ({ opacity = 0.055 }) => {
  return (
    <AbsoluteFill
      style={{ opacity, mixBlendMode: "multiply", pointerEvents: "none" }}
    >
      <svg width="720" height="1280" viewBox="0 0 720 1280">
        <filter id="paperfibre">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves={3}
            seed={7}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="720" height="1280" filter="url(#paperfibre)" />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * The heavy grey vignette that is pressed into all four edges and the corners
 * on every shot, so the centre of the sheet stays the brightest thing in frame.
 */
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 1 }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(74% 54% at 50% 47%, rgba(143,143,143,0) 42%, rgba(120,120,120,${(
            0.2 * strength
          ).toFixed(3)}) 72%, rgba(58,58,58,${(0.62 * strength).toFixed(
            3,
          )}) 100%)`,
          mixBlendMode: "multiply",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(70,70,70,${(
            0.3 * strength
          ).toFixed(3)}) 0%, rgba(70,70,70,0) 13%, rgba(70,70,70,0) 87%, rgba(70,70,70,${(
            0.34 * strength
          ).toFixed(3)}) 100%)`,
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * The printed sheet the whole piece sits on: paper white, a faint pale grey
 * square grid at eight squares across, fibre, and the vignette.
 */
export const PaperField: React.FC<{ grid?: boolean }> = ({ grid = true }) => {
  return (
    <AbsoluteFill name="Paper sheet" style={{ backgroundColor: PAPER }}>
      {grid ? (
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(143,143,143,0.24) 1.2px, transparent 1.2px), linear-gradient(90deg, rgba(143,143,143,0.24) 1.2px, transparent 1.2px)",
            backgroundSize: "90px 90px",
            backgroundPosition: "-1px 35px",
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(96% 60% at 50% 40%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <Fibre />
    </AbsoluteFill>
  );
};

/** The single section that swaps the sheet for a flat brick red backdrop. */
export const RedField: React.FC = () => {
  return (
    <AbsoluteFill name="Brick red backdrop" style={{ backgroundColor: BRICK }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(78% 52% at 50% 40%, rgba(214,116,102,0.34) 0%, rgba(162,55,47,0) 72%)",
        }}
      />
      <Fibre opacity={0.05} />
    </AbsoluteFill>
  );
};

const BARS = [
  3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3,
];

/** Small printed barcode and serial, set into a corner of the sheet. */
export const Barcode: React.FC<{ left?: number; top?: number }> = ({
  left = 40,
  top = 42,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
        {BARS.map((w, i) => (
          <div
            key={i}
            style={{ width: w * 1.5, height: 30, backgroundColor: "#0A0A0A" }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: "Poppins",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: "#0A0A0A",
        }}
      >
        0 100 000 000
      </div>
    </div>
  );
};
