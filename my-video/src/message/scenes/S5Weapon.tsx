import { useCurrentFrame } from "remotion";
import { CreamField, InkCorners } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { CONTACT_DEEP, CRIMSON, cueIn } from "../lib/tokens";
import { FramedPoster, WALL_H, WALL_W, WALLS } from "../props/Poster";
import { Shrugger } from "../props/Shrugger";

const at = cueIn(12.2);

/** Frame this shot's poster lands and the wall behind it starts flipping. */
const FLIP_FROM = at(12.55);

/**
 * How long each wall texture is held, in frames. Written out rather than
 * generated so the strobe is identical on every render, and kept between three
 * and five frames - below three it reads as a flicker artefact, above five the
 * sub-rhythm stops driving the shot.
 */
const HOLDS = [4, 3, 5, 3, 4, 5, 3, 4, 3, 5, 4, 3, 5, 4, 3, 4, 5, 3, 4, 3, 5, 4];

/** Which texture is showing, `local` frames into the flip. */
const wallAt = (local: number) => {
  if (local < 0) {
    return 0;
  }
  let elapsed = 0;
  let step = 0;
  while (elapsed <= local) {
    elapsed += HOLDS[step % HOLDS.length];
    step += 1;
  }
  return (step - 1) % WALLS.length;
};

/**
 * Shot 5 - 12.2s to 15.9s. Logo is just a shape, your message is the weapon.
 *
 * The argument shot. The mark is hung on a wall that will not hold still - the
 * surface behind it flip-cuts every three to five frames through seven
 * different textures while the poster itself never moves a pixel, which is the
 * whole point being made. The shrug on the left is the reaction to it.
 */
export const S5Weapon: React.FC = () => {
  const frame = useCurrentFrame();
  const Wall = WALLS[wallAt(frame - FLIP_FROM)];

  return (
    <Shot
      name="Shot 5 - Your message is the weapon"
      backdrop={<CreamField leaf />}
      overlay={<InkCorners start={at(12.25)} travel={7} distance={1.4} />}
    >
      <Prop
        name="Poster on the flip-cutting wall"
        x={382}
        y={624}
        rot={1.2}
        fromScale={0.94}
        start={FLIP_FROM}
        travel={14}
        seed={6}
        driftAmount={0.5}
        border={6}
        shadow={CONTACT_DEEP}
      >
        <div
          style={{
            position: "relative",
            width: WALL_W * 0.64,
            height: WALL_H * 0.64,
          }}
        >
          <div
            style={{
              width: WALL_W,
              height: WALL_H,
              scale: 0.64,
              transformOrigin: "0 0",
            }}
          >
            <Wall />
          </div>
          <div
            style={{
              position: "absolute",
              left: (WALL_W * 0.64 - 158) / 2,
              top: (WALL_H * 0.64 - 212) / 2,
            }}
          >
            <FramedPoster width={158} />
          </div>
        </div>
      </Prop>

      <Prop
        name="Man in tweed, shrugging"
        x={-72}
        y={686}
        rot={-1.5}
        fromX={-360}
        start={at(12.3)}
        travel={20}
        seed={2}
        driftAmount={0.8}
        border={5}
        shadow={CONTACT_DEEP}
        zIndex={2}
      >
        <Shrugger width={432} />
      </Prop>

      <Stack
        name="Logo / is just a shape / your message / is the weapon"
        style={{ top: 112 }}
        lines={[
          {
            pieces: [{ text: "Logo" }],
            start: at(12.4),
            size: 64,
            align: "center",
          },
          {
            pieces: [{ text: "is just a shape" }],
            start: at(13.0),
            size: 56,
            align: "center",
            stagger: 6,
            gapAbove: 6,
          },
          {
            pieces: [{ text: "your message" }],
            start: at(13.7),
            size: 62,
            align: "left",
            gapAbove: 16,
          },
          {
            // "crimson red bold" in the brief, not the italic display face -
            // the one punch line in the piece that stays in the sans.
            pieces: [{ text: "is the weapon", color: CRIMSON }],
            start: at(14.35),
            size: 80,
            align: "right",
            stagger: 7,
            gapAbove: 4,
          },
        ]}
      />
    </Shot>
  );
};
