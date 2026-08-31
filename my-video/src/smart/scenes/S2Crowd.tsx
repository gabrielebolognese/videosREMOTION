import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, GLIDE, OVERSHOOT, RAMP } from "../lib/motion";
import { cueIn, PURPLE, RED } from "../lib/tokens";
import { W } from "../lib/Type";
import { WorldB } from "../lib/Worlds";
import { GlowHead, SuitFigure } from "../props/SuitFigure";

const at = cueIn(3.4);

/** The frame the camera lets go and rockets backward. */
const PULL = at(4.5);

const FIG_W = 360;
const HEAD = 150;

/**
 * The rows that appear behind the hero as the camera pulls out. Smaller and
 * higher means further away; the hero stays in front of all of them.
 */
const CROWD = [
  { scale: 0.28, headY: 706, top: 730, xs: [34, 124, 214, 304, 416, 506, 596, 686] },
  { scale: 0.42, headY: 782, top: 812, xs: [52, 168, 286, 434, 552, 668] },
  { scale: 0.6, headY: 872, top: 908, xs: [78, 196, 524, 642] },
];

/**
 * SHOT 2 - 3.4s to 6.9s. Medium chest-up on the suited figure, then the one
 * speed ramp in the piece: at 4.5s the camera rockets backward and the crowd
 * multiplies across the bottom of frame.
 */
export const S2Crowd: React.FC = () => {
  const frame = useCurrentFrame();

  // Barely creeping in, then a hard release backward that arrives soft.
  const zoom =
    frame < PULL
      ? interpolate(frame, [0, PULL], [2.66, 2.52], { ...CLAMP, easing: GLIDE })
      : interpolate(frame, [PULL, PULL + 12], [2.52, 1], {
          ...CLAMP,
          easing: RAMP,
        });

  return (
    <AbsoluteFill name="Shot 2 - but your growth">
      <WorldB lift={1.3} cy={40} />

      <AbsoluteFill
        style={{ scale: zoom, transformOrigin: "360px 600px" }}
        name="Camera"
      >
        {CROWD.map((row, r) =>
          row.xs.map((x, i) => {
            const w = FIG_W * row.scale;
            const h = HEAD * row.scale;
            const born = PULL + r * 2 + i;
            const p = interpolate(frame, [born, born + 7], [0, 1], CLAMP);
            return (
              <div
                key={`${r}-${i}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  opacity: p,
                  scale: interpolate(p, [0, 1], [0.86, 1], {
                    ...CLAMP,
                    easing: OVERSHOOT,
                    output: "perceptual-scale",
                  }),
                  transformOrigin: `${x}px ${row.headY}px`,
                }}
              >
                <div style={{ position: "absolute", left: x - w / 2, top: row.top }}>
                  <SuitFigure width={w} />
                </div>
                <GlowHead
                  size={h}
                  halo={0.55}
                  style={{ left: x - h / 2, top: row.headY - h / 2 }}
                />
              </div>
            );
          }),
        )}

        {/* the hero, with the words living inside the sphere */}
        <div style={{ position: "absolute", left: 360 - FIG_W / 2, top: 596 }}>
          <SuitFigure width={FIG_W} />
        </div>
        <GlowHead
          size={HEAD}
          style={{ left: 360 - HEAD / 2, top: 555 - HEAD / 2, gap: 6 }}
        >
          <W start={at(3.5)} size={22} role="light" name="But your">
            But your
          </W>
          <W start={at(4.0)} size={26} role="bold" color={PURPLE} name="growth?">
            growth?
          </W>
        </GlowHead>
      </AbsoluteFill>

      {/* the headline lives in screen space, so the pull back never touches it */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 228,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <W
          start={at(5.0)}
          size={44}
          role="light"
          color="#FFFFFF"
          halo="rgba(255,255,255,0.55)"
          haloStrength={0.7}
          reveal="rise"
          name="stuck in a"
        >
          stuck in a
        </W>
        <W
          start={at(5.4)}
          size={96}
          role="boldItalic"
          color={RED}
          halo="rgba(255,13,13,0.9)"
          name="Same"
        >
          Same
        </W>
        <W
          start={at(5.7)}
          size={96}
          role="boldItalic"
          color={RED}
          halo="rgba(255,13,13,0.9)"
          name="Place"
        >
          Place
        </W>
      </div>
    </AbsoluteFill>
  );
};
