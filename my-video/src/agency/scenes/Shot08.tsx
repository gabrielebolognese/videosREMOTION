import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { IN, OUT } from "../lib/motion";
import { useShot } from "../lib/shot";
import { Pill, SmearFilter, SnapLine } from "../lib/Type";
import { BLACK, dur, GREY, SHOT_SECONDS } from "../lib/tokens";

const SMEAR_AT = 7.05;

/**
 * SHOT 8 - 7.4s. "3 things / Need to be clear" plus the three chat pills.
 *
 * The slow point of the piece: no props, type only, on a very slow push-in,
 * with a beat every 1.6 seconds as each pill lands. Then the whole stack
 * smears upward out of frame on a heavy directional blur, which is one of only
 * two transitions in the video that is not a hard cut.
 */
export const Shot08: React.FC = () => {
  const clock = useShot(7);
  if (!clock.visible) return null;

  const push = interpolate(clock.local, [0, dur(SHOT_SECONDS[7])], [1, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  const smear = interpolate(clock.local, [dur(SMEAR_AT), dur(SHOT_SECONDS[7])], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: IN,
  });

  return (
    <AbsoluteFill
      style={{ transform: `scale(${push})`, transformOrigin: "50% 46%" }}
    >
      <SmearFilter id="shot8-smear" amount={96 * smear} />

      <AbsoluteFill
        style={{
          transform: `translateY(${-1620 * smear}px)`,
          filter: smear > 0.004 ? "url(#shot8-smear)" : undefined,
        }}
      >
        <SnapLine
          local={clock.local}
          at={0.35}
          text="3 things"
          size={206}
          weight={900}
          colour={BLACK}
          place={{ left: 0, top: 396, width: 1080, align: "center" }}
          tracking={-0.045}
        />
        <SnapLine
          local={clock.local}
          at={0.6}
          text="Need to be clear"
          size={64}
          weight={500}
          colour={GREY}
          place={{ left: 0, top: 636, width: 1080, align: "center" }}
        />

        <Pill local={clock.local} at={1.2} top={796} size={40} text="Who exactly is the customer?" />
        <Pill local={clock.local} at={2.8} top={958} size={40} text="Why should they choose you?" />
        <Pill
          local={clock.local}
          at={4.4}
          top={1120}
          size={40}
          text="And what happens after they show interest?"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
