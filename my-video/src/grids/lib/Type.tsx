import { interpolate, useCurrentFrame } from "remotion";
import { CLAMP, LEAVE, OUT, OVERSHOOT, SETTLE, whipBlurAt } from "./Wall";
import { BrushSwoosh } from "../props/Marks";
import { GEO, GROTESQUE, INK, RED, sec } from "./tokens";

/** The lockup column is 576 wide - about 80% of the frame, as briefed. */
const BLOCK = 576;
/** "GRIDS" sits in a box of known width, which is what lets the 6.7s whip
 *  slide it from centred under the wordmark to flush left without measuring. */
const GRIDS_BOX = 470;
const SWOOSH_BOX = 340;

/**
 * "design." - heavy geometric rounded sans, very tight tracking, oversized
 * period. The line-height is pinned in pixels so the larger period cannot
 * grow the line box and nudge everything below it.
 */
const Wordmark: React.FC = () => (
  <div
    style={{
      fontFamily: GEO,
      fontWeight: 900,
      fontSize: 156,
      lineHeight: "160px",
      letterSpacing: "-0.048em",
      color: RED,
      whiteSpace: "nowrap",
    }}
  >
    design
    <span style={{ fontSize: "1.32em", letterSpacing: "normal" }}>.</span>
  </div>
);

/** "GRIDS" - heavy grotesque, justified across a fixed box so it reads wide. */
const Grids: React.FC<{ size: number; boxWidth: number }> = ({
  size,
  boxWidth,
}) => (
  <div
    style={{
      width: boxWidth,
      display: "flex",
      justifyContent: "space-between",
      fontFamily: GROTESQUE,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1,
      color: INK,
    }}
  >
    {"GRIDS".split("").map((letter, i) => (
      <span key={i}>{letter}</span>
    ))}
  </div>
);

/** "find your / brand voice", set word by word behind a short red bar. */
const BrandVoice: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = [
    ["find", "your"],
    ["brand", "voice"],
  ];
  let order = 0;

  return (
    <div style={{ display: "flex", gap: 18, alignItems: "stretch" }}>
      <div
        style={{
          width: 6,
          borderRadius: 3,
          backgroundColor: RED,
          scale: `1 ${interpolate(frame, [sec(6.78), sec(7.05)], [0, 1], { ...CLAMP, easing: SETTLE }).toFixed(3)}`,
          transformOrigin: "50% 0%",
        }}
      />
      <div
        style={{
          fontFamily: GEO,
          fontWeight: 500,
          fontSize: 34,
          lineHeight: 1.3,
          letterSpacing: "-0.005em",
          color: INK,
        }}
      >
        {lines.map((words, l) => (
          <div key={l} style={{ display: "flex", gap: "0.28em" }}>
            {words.map((word) => {
              const start = sec(6.8) + order++ * 3.2;
              return (
                <span
                  key={word}
                  style={{
                    display: "inline-block",
                    opacity: interpolate(frame, [start, start + 6], [0, 1], CLAMP),
                    translate: `0px ${interpolate(frame, [start, start + 9], [22, 0], { ...CLAMP, easing: OUT }).toFixed(2)}px`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * The title lockup: one column that owns the wordmark, "GRIDS", the brush
 * underline and the brand-voice lines.
 *
 * It lives at a fixed left edge and carries the whole 6.7s reposition on its
 * own transform - up, left and down to 80% - so the move is one continuous
 * interpolation rather than a re-layout. The vertical smear is an SVG
 * directional blur on this same element, and "GRIDS" additionally leaves a
 * doubled after-image for five frames.
 */
export const Lockup: React.FC = () => {
  const frame = useCurrentFrame();
  const whip = interpolate(frame, [sec(6.68), sec(7.06)], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });
  const blur = whipBlurAt(frame);

  // The wordmark rises out from behind the waves; the waves are painted over
  // this layer, so the wave edge does the masking for free.
  const riseY = interpolate(frame, [sec(1.86), sec(2.42)], [430, 0], {
    ...CLAMP,
    easing: OVERSHOOT,
  });

  const gridsSnap = interpolate(frame, [sec(4.5), sec(4.74)], [0.9, 1], {
    ...CLAMP,
    easing: OVERSHOOT,
  });
  const gridsIn = interpolate(frame, [sec(4.5), sec(4.6)], [0, 1], CLAMP);

  // Ghosting: a second "GRIDS" trailing the real one through the whip.
  const ghost = interpolate(
    frame,
    [sec(6.68), sec(6.75), sec(6.93)],
    [0, 0.42, 0],
    CLAMP,
  );

  // The underline does not travel with the lockup - it sweeps clean off the
  // right of the frame and is gone before the brand-voice lines land.
  const swooshOff = interpolate(frame, [sec(6.7), sec(7.02)], [0, 1020], {
    ...CLAMP,
    easing: LEAVE,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        top: 0,
        width: BLOCK,
        transformOrigin: "0% 0%",
        translate: `${interpolate(whip, [0, 1], [16, 0]).toFixed(2)}px ${interpolate(whip, [0, 1], [444, 340]).toFixed(2)}px`,
        scale: interpolate(whip, [0, 1], [1, 0.8], {
          output: "perceptual-scale",
        }),
        filter: blur > 0.05 ? "url(#grids-vblur)" : undefined,
      }}
    >
      <div style={{ translate: `0px ${riseY.toFixed(2)}px` }}>
        <Wordmark />
      </div>

      <div
        style={{
          marginTop: 14,
          position: "relative",
          opacity: gridsIn,
          translate: `${interpolate(whip, [0, 1], [(BLOCK - GRIDS_BOX) / 2, 0]).toFixed(2)}px 0px`,
          scale: gridsSnap,
          transformOrigin: "50% 50%",
        }}
      >
        <Grids size={104} boxWidth={GRIDS_BOX} />
        {ghost > 0.01 ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              opacity: ghost,
              translate: "0px 30px",
            }}
          >
            <Grids size={104} boxWidth={GRIDS_BOX} />
          </div>
        ) : null}
      </div>

      <div
        style={{
          marginTop: 10,
          height: 60,
          translate: `${(interpolate(whip, [0, 1], [(BLOCK - SWOOSH_BOX) / 2, 0]) + swooshOff).toFixed(2)}px 0px`,
        }}
      >
        <BrushSwoosh
          width={SWOOSH_BOX}
          progress={interpolate(frame, [sec(4.7), sec(5.0)], [0, 1], {
            ...CLAMP,
            easing: OUT,
          })}
          opacity={interpolate(frame, [sec(6.86), sec(7.0)], [1, 0], CLAMP)}
        />
      </div>

      <div style={{ marginTop: 26 }}>
        <BrandVoice />
      </div>
    </div>
  );
};
