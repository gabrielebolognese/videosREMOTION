import { PinkField } from "../lib/Backdrop";
import { Prop } from "../lib/Prop";
import { Shot } from "../lib/Shot";
import { Stack } from "../lib/Type";
import { BLUSH, CONTACT_DEEP, cueIn } from "../lib/tokens";
import { MallowCluster } from "../props/Flora";
import { SkyPanel, Tee } from "../props/Tee";

const at = cueIn(2.6);

/**
 * Shot 2 - 2.6s to 4.9s. You spent weeks perfecting a logo.
 *
 * Hard cut to blush pink. The tee is the only product shot in the piece, so it
 * gets the centre of frame, a pale sky panel behind it to lift the navy off
 * the pink, and blooms at the shoulder and the hem. It scales up from 85 and
 * keeps drifting right for the whole shot.
 */
export const S2Logo: React.FC = () => {
  return (
    <Shot name="Shot 2 - Perfecting a logo" base={BLUSH} backdrop={<PinkField />}>
      <Prop
        name="Sky panel"
        x={126}
        y={470}
        rot={-2}
        fromScale={0.94}
        start={at(2.62)}
        travel={16}
        seed={5}
        driftAmount={0.5}
        border={6}
        defocus={1.2}
      >
        <SkyPanel width={468} height={576} />
      </Prop>

      <Prop
        name="Navy tee with the mark"
        x={148}
        y={534}
        rot={1}
        fromScale={0.85}
        start={at(2.64)}
        travel={20}
        cruiseX={0.34}
        seed={1}
        driftAmount={0.7}
        border={5}
        shadow={CONTACT_DEEP}
      >
        <Tee width={430} />
      </Prop>

      <Prop
        name="Mallow at the right shoulder"
        x={470}
        y={512}
        rot={-8}
        fromScale={0.5}
        start={at(2.9)}
        travel={14}
        seed={3}
        driftAmount={1.5}
        border={4}
      >
        <MallowCluster scale={0.72} />
      </Prop>

      <Prop
        name="Mallow at the left hem"
        x={96}
        y={880}
        rot={14}
        fromScale={0.5}
        start={at(3.15)}
        travel={14}
        seed={6}
        driftAmount={1.6}
        border={4}
      >
        <MallowCluster scale={0.62} />
      </Prop>

      <Stack
        name="You spent weeks / perfecting a logo"
        style={{ top: 128 }}
        lines={[
          {
            pieces: [{ text: "you spent weeks" }],
            start: at(2.75),
            size: 60,
            align: "center",
          },
          {
            pieces: [
              { text: "perfecting a" },
              { text: "logo", punch: true, size: 118 },
            ],
            start: at(3.4),
            size: 60,
            align: "center",
            stagger: 7,
            gapAbove: 4,
          },
        ]}
      />
    </Shot>
  );
};
