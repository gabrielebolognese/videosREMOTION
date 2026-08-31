/**
 * Fictional social app wordmark. Handwritten brush script in a
 * purple-to-pink-to-orange gradient.
 */
export const SocialgramMark: React.FC<{ fontSize: number }> = ({ fontSize }) => {
  return (
    <div
      style={{
        fontFamily: "Pacifico",
        fontSize,
        fontWeight: 400,
        lineHeight: 1.24,
        paddingRight: 10,
        backgroundImage:
          "linear-gradient(96deg, #7B2FF7 0%, #C13BC8 34%, #F0468C 62%, #FF8A3D 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      Socialgram
    </div>
  );
};
