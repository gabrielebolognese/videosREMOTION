import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, GLIDE, OUT, OVERSHOOT } from "../lib/motion";
import { cueIn } from "../lib/tokens";
import { W } from "../lib/Type";
import { WorldA } from "../lib/Worlds";
import { Glyph, GlyphKind, PaperNote } from "../props/Note";

const at = cueIn(15.7);

const ROWS: { label: string; kind: GlyphKind; y: number; cue: number }[] = [
  { label: "No traffic", kind: "megaphone", y: 626, cue: at(17.0) },
  { label: "No leads", kind: "people", y: 726, cue: at(17.9) },
  { label: "No sales", kind: "chart", y: 826, cue: at(19.0) },
];

/**
 * SHOT 6 - 15.7s to 20.3s. The note scales in and pins itself to the plane,
 * the heading rule wipes across, then the three rows stack in one by one.
 */
export const S6Note: React.FC = () => {
  const frame = useCurrentFrame();

  const wipe = interpolate(frame, [at(16.2), at(16.2) + 14], [0, 1], {
    ...CLAMP,
    easing: OUT,
  });

  return (
    <AbsoluteFill name="Shot 6 - value">
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 138], [1, 1.05], {
            ...CLAMP,
            easing: GLIDE,
            output: "perceptual-scale",
          }),
        }}
      >
        <WorldA drift={(frame + 471) / 900} band="sweep" barcode />

        <AbsoluteFill
          name="Note"
          style={{
            scale: interpolate(frame, [0, 15], [0.16, 1], {
              ...CLAMP,
              easing: OVERSHOOT,
              output: "perceptual-scale",
            }),
            transformOrigin: "360px 680px",
            opacity: interpolate(frame, [0, 3], [0, 1], CLAMP),
          }}
        >
          <div style={{ position: "absolute", left: 120, top: 366 }}>
            <PaperNote width={480} height={560} />
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 448,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <W start={at(15.9)} size={66} role="bold" color="#FFFFFF">
              Value
            </W>
          </div>
          {/* the black underline rule wiping in left to right */}
          <div
            style={{
              position: "absolute",
              left: 200,
              top: 542,
              width: 320 * wipe,
              height: 5,
              backgroundColor: "#0A0A0A",
            }}
          />

          {ROWS.map((row) => {
            const p = interpolate(frame, [row.cue, row.cue + 8], [0, 1], {
              ...CLAMP,
              easing: OUT,
            });
            return (
              <div
                key={row.label}
                style={{
                  position: "absolute",
                  left: 178,
                  top: row.y,
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  opacity: interpolate(p, [0, 0.7], [0, 1], CLAMP),
                  translate: `0px ${interpolate(p, [0, 1], [20, 0], CLAMP).toFixed(2)}px`,
                }}
              >
                <Glyph kind={row.kind} size={46} />
                <W start={row.cue} size={44} role="semi" reveal="hold">
                  {row.label}
                </W>
              </div>
            );
          })}
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
