/**
 * The rounded-corner vertical card that carries every middle shot.
 *
 * The corner radius and the shadow are fixed here rather than per shot: the
 * card never moves between shots 3 and 6, so any wobble in its geometry would
 * read immediately as the card morphing rather than its contents changing.
 */
export const PhotoCard: React.FC<{
  width: number;
  height: number;
  children: React.ReactNode;
}> = ({ width, height, children }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "#111614",
        boxShadow:
          "10px 18px 34px rgba(58,72,64,0.28), 2px 4px 10px rgba(58,72,64,0.18)",
      }}
    >
      {children}
    </div>
  );
};

/**
 * The white bloom that blows one card to near-white for four frames before the
 * next image resolves out of it.
 */
export const Bloom: React.FC<{ amount: number }> = ({ amount }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "#FFFFFF",
      opacity: amount,
      pointerEvents: "none",
    }}
  />
);
