import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { OUT, spin } from "./motion";
import { dur, sec, WHITE } from "./tokens";

/** Deterministic, so the pile-up is identical on every render. */
const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

type Tile = {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  rate: number;
  depth: number;
  outline: boolean;
  spawn: number;
  despawn: number;
};

/**
 * The pile-up, in four waves that arrive faster each time.
 *
 * The copy in this scene is a list that is meant to feel like too much, so the
 * density does the work rather than a cut: three tiles under "thousands of",
 * eight under "skills, plugins,", fourteen under "connectors." and twenty-one
 * under "i mean...", by which point the frame is genuinely overloaded. They
 * then drain away individually between 5.29 and 6.65 so that nothing at all is
 * left when "up?" lands.
 */
const build = (): Tile[] => {
  const r = rng(20260831);
  const waves = [
    { n: 3, from: sec(2.19), to: sec(2.78) },
    { n: 8, from: sec(3.03), to: sec(3.58) },
    { n: 14, from: sec(3.67), to: sec(4.17) },
    { n: 21, from: sec(4.31), to: sec(4.92) },
  ];

  const tiles: Tile[] = [];
  const drainFrom = sec(5.29);
  const drainTo = sec(6.65);

  for (const wave of waves) {
    for (let i = 0; i < wave.n; i++) {
      const size = 46 + r() * 128;
      tiles.push({
        x: -60 + r() * 1160,
        y: 150 + r() * 1620,
        w: size * (0.9 + r() * 1.5),
        h: size,
        rot: -22 + r() * 44,
        rate: (r() - 0.5) * 9,
        depth: 0.35 + r() * 0.65,
        outline: r() > 0.55,
        spawn: wave.from + Math.round((wave.to - wave.from) * (i / wave.n)),
        // Older tiles tend to leave first, but not strictly, so the drain
        // reads as a thinning rather than a queue.
        despawn: drainFrom + Math.round((drainTo - drainFrom) * (0.1 + r() * 0.85)),
      });
    }
  }
  return tiles;
};

const TILES = build();

export const Debris: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {TILES.map((t, i) => {
        if (frame < t.spawn || frame >= t.despawn + dur(0.2)) return null;

        const arrive = interpolate(frame, [t.spawn, t.spawn + dur(0.22)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: OUT,
        });
        const leave = interpolate(frame, [t.despawn, t.despawn + dur(0.16)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Every tile keeps turning and floating for its whole life, each at its
        // own rate, driven by the absolute frame.
        const angle = t.rot + spin(frame, t.rate);
        const float = Math.sin(frame / 60 + i) * 6 * t.depth;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: t.x,
              top: t.y,
              width: t.w,
              height: t.h,
              borderRadius: t.h * 0.28,
              background: t.outline ? "transparent" : WHITE,
              border: t.outline ? `2px solid ${WHITE}` : undefined,
              opacity: (0.05 + t.depth * 0.14) * arrive * (1 - leave),
              transform: `translate(${leave * -90}px, ${float}px) rotate(${angle}deg) scale(${(0.6 + t.depth * 0.6) * (0.8 + 0.2 * arrive)})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
