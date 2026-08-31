import { AbsoluteFill, Interactive, useCurrentFrame } from "remotion";

/**
 * Very light 35mm grain. The turbulence seed is driven by the frame so the
 * grain actually moves instead of sitting static on the plate.
 */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: 0.075,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    >
      <svg width="720" height="1280" viewBox="0 0 720 1280">
        <filter id="filmgrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={frame}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="720" height="1280" filter="url(#filmgrain)" />
      </svg>
    </AbsoluteFill>
  );
};

const BARCODE_BARS = [
  3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2,
  1, 1, 2, 3, 1, 2,
];

/** Small black barcode strip, printed in the top right corner of the page. */
export const Barcode: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 44,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
        {BARCODE_BARS.map((w, i) => (
          <div
            key={i}
            style={{
              width: w * 1.7,
              height: 34,
              backgroundColor: "#000000",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: "Inter",
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.34em",
          color: "#000000",
        }}
      >
        0 419 28 0412
      </div>
    </div>
  );
};

/** Tiny generic film-rating badge strip. */
export const RatingStrip: React.FC<{ position: "top" | "bottom" }> = ({
  position,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position === "top" ? 48 : undefined,
        bottom: position === "bottom" ? 52 : undefined,
        left: position === "top" ? 44 : 0,
        right: 0,
        display: "flex",
        justifyContent: position === "top" ? "flex-start" : "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          border: "1.4px solid #000000",
          fontFamily: "Inter",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "#000000",
        }}
      >
        <div
          style={{
            padding: "5px 9px",
            backgroundColor: "#000000",
            color: "#FDF6EF",
          }}
        >
          GP
        </div>
        <div
          style={{
            padding: "5px 10px",
            borderRight: "1.4px solid #000000",
          }}
        >
          ALL AUDIENCES
        </div>
        <div style={{ padding: "5px 10px", fontWeight: 500 }}>NO. 0412</div>
      </div>
    </div>
  );
};

/**
 * Cream paper stock with faint blueprint grid squares, barcode and rating strip.
 */
export const CreamPage: React.FC<{
  rating?: "top" | "bottom" | "none";
  barcode?: boolean;
}> = ({ rating = "bottom", barcode = true }) => {
  return (
    <AbsoluteFill name="Cream page" style={{ backgroundColor: "#FDF6EF" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,126,158,0.085) 1px, transparent 1px), linear-gradient(90deg, rgba(96,126,158,0.085) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "30px 20px",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(120% 78% at 50% 42%, rgba(255,255,255,0.55) 0%, rgba(196,176,152,0.16) 100%)",
        }}
      />
      {barcode ? <Barcode /> : null}
      {rating === "none" ? null : <RatingStrip position={rating} />}
    </AbsoluteFill>
  );
};

/** Pure black void with a soft radial glow behind the subject. */
export const BlackVoid: React.FC<{ glow?: "none" | "white" | "red" }> = ({
  glow = "white",
}) => {
  return (
    <AbsoluteFill name="Black void" style={{ backgroundColor: "#000000" }}>
      {glow === "none" ? null : (
        <AbsoluteFill
          style={{
            backgroundImage:
              glow === "red"
                ? "radial-gradient(62% 38% at 50% 50%, rgba(240,20,30,0.42) 0%, rgba(240,20,30,0.10) 50%, rgba(0,0,0,0) 76%)"
                : "radial-gradient(48% 30% at 50% 46%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.04) 52%, rgba(0,0,0,0) 76%)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

/** Deep vignette used on the black plates to crush the corners. */
export const Vignette: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "radial-gradient(78% 56% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)",
        pointerEvents: "none",
      }}
    />
  );
};

/** Soft grey rounded ribbon band sweeping diagonally through frame. */
export const Ribbon: React.FC<{ sweep: number }> = ({ sweep }) => {
  return (
    <Interactive.Div
      name="Grey ribbon"
      style={{ position: "absolute", inset: 0 }}
    >
      <svg width="720" height="1280" viewBox="0 0 720 1280" fill="none">
        <defs>
          <linearGradient id="ribbonfill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C6C6BC" />
            <stop offset="45%" stopColor="#B4B4AA" />
            <stop offset="100%" stopColor="#9E9E93" />
          </linearGradient>
        </defs>
        <path
          d="M -180 1010 C 110 830, 250 1080, 470 900 C 640 758, 760 800, 900 700"
          stroke="url(#ribbonfill)"
          strokeWidth="104"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - sweep}
        />
        <path
          d="M -180 1010 C 110 830, 250 1080, 470 900 C 640 758, 760 800, 900 700"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - sweep}
          style={{ translate: "0px -22px" }}
        />
      </svg>
    </Interactive.Div>
  );
};
