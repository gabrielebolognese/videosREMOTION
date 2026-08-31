import { useCurrentFrame } from "remotion";

type Segment = {
  text: string;
  style: React.CSSProperties;
};

/**
 * Types text out character by character. Segments let a single typed line mix
 * weights and colours, e.g. "But your " in black and "growth" in red.
 */
export const Typed: React.FC<{
  segments: Segment[];
  start: number;
  charsPerFrame: number;
}> = ({ segments, start, charsPerFrame }) => {
  const frame = useCurrentFrame();
  const revealed = Math.max(0, Math.floor((frame - start) * charsPerFrame));

  let consumed = 0;

  return (
    <>
      {segments.map((segment, i) => {
        const from = consumed;
        consumed += segment.text.length;
        const take = Math.min(
          segment.text.length,
          Math.max(0, revealed - from),
        );

        return (
          <span key={i} style={segment.style}>
            {segment.text.slice(0, take)}
          </span>
        );
      })}
      <span
        style={{
          opacity: revealed < consumed && frame >= start ? 1 : 0,
          color: "#F0141E",
        }}
      >
        |
      </span>
    </>
  );
};
