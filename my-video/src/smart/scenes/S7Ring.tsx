import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, GLIDE, OUT, SPRING } from "../lib/motion";
import { cueIn } from "../lib/tokens";
import { Row, W } from "../lib/Type";
import { WorldA } from "../lib/Worlds";
import { AppTile, RingHook, TileKind } from "../props/Ring";

const at = cueIn(20.3);

const CX = 360;
const CY = 830;
const R = 219;
const TILE = 96;

/**
 * Five generic tiles hung off the ring at the clock positions the brief names.
 * Nothing here is a real product mark.
 */
const TILES: { kind: TileKind; angle: number; cue: number }[] = [
  { kind: "chat", angle: -60, cue: 26 },
  { kind: "frame", angle: 0, cue: 33 },
  { kind: "letter", angle: 60, cue: 40 },
  { kind: "block", angle: 120, cue: 47 },
  { kind: "mark", angle: -120, cue: 54 },
];

/**
 * SHOT 7 - 20.3s to 24.0s. The stem lowers from the top of frame and ends in
 * the oversized ring, tiles spring onto it one by one, and the camera drifts
 * down a touch the whole way through.
 */
export const S7Ring: React.FC = () => {
  const frame = useCurrentFrame();

  const descend = interpolate(frame, [0, 28], [-620, 0], {
    ...CLAMP,
    easing: OUT,
  });

  const pill = interpolate(frame, [at(23.5), at(23.5) + 8], [0, 1], {
    ...CLAMP,
    easing: SPRING,
  });

  return (
    <AbsoluteFill name="Shot 7 - smart moves">
      <WorldA drift={(frame + 609) / 900} band="none" barcode />

      <AbsoluteFill
        name="Camera"
        style={{
          translate: `0px ${interpolate(frame, [0, 111], [0, -20], {
            ...CLAMP,
            easing: GLIDE,
          }).toFixed(2)}px`,
        }}
      >
        <AbsoluteFill style={{ translate: `0px ${descend.toFixed(1)}px` }}>
          <RingHook
            cx={CX}
            cy={CY}
            r={R}
            band={52}
            stemWidth={58}
            width={720}
            height={1280}
          />

          {TILES.map((tile) => {
            const rad = (tile.angle * Math.PI) / 180;
            const p = interpolate(frame, [tile.cue, tile.cue + 9], [0, 1], {
              ...CLAMP,
              easing: SPRING,
            });
            return (
              <div
                key={tile.kind}
                style={{
                  position: "absolute",
                  left: CX + Math.cos(rad) * R - TILE / 2,
                  top: CY + Math.sin(rad) * R - TILE / 2,
                  opacity: interpolate(frame, [tile.cue, tile.cue + 3], [0, 1], CLAMP),
                  scale: p.toFixed(4),
                  transformOrigin: `${TILE / 2}px ${TILE / 2}px`,
                }}
              >
                <AppTile size={TILE} kind={tile.kind} id={`s7-${tile.kind}`} />
              </div>
            );
          })}

          {/* inside the ring */}
          <Row top={742} name="don't">
            <W start={at(21.9)} size={44} role="light">
              don&apos;t
            </W>
          </Row>
          <Row top={794} name="reward">
            <W start={at(22.15)} size={54} role="bold">
              reward
            </W>
          </Row>
          <Row top={860} name="effort">
            <W start={at(22.4)} size={44} role="light">
              effort
            </W>
          </Row>
        </AbsoluteFill>

        {/* the headline and the label pill sit over the stem */}
        <Row top={242} gap={16} name="They reward">
          <W start={at(23.1)} size={46} role="light">
            They
          </W>
          <W start={at(23.1) + 3} size={46} role="bold">
            reward
          </W>
        </Row>
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 318,
            width: 340,
            height: 84,
            borderRadius: 44,
            backgroundColor: "#6F6F6F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [at(23.5), at(23.5) + 3], [0, 1], CLAMP),
            scale: pill.toFixed(4),
          }}
        >
          <W start={at(23.5)} size={40} role="bold" color="#FFFFFF" reveal="hold">
            Smart Moves
          </W>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
