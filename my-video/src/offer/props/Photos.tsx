/**
 * The people in the piece: photo cards of friends and family, and the large
 * family cutout that carries the last two shots.
 *
 * Everyone is built from the same `Person` primitive - head, neck, knitwear
 * torso, sleeves held clear of the body, legs - in a 120x300 local box, so a
 * card of five friends and a half-frame family group stay in the same world.
 */

type Hair = "crop" | "short" | "long" | "bun" | "curls";

/** Sits on a head centred at (60, 32) with radii 26 x 27. */
const HairShape: React.FC<{ style: Hair; color: string }> = ({
  style,
  color,
}) => {
  switch (style) {
    case "crop":
      return (
        <path
          d="M 34 32 C 33 13, 45 3, 60 3 C 75 3, 87 13, 86 32 C 80 20, 72 14, 60 14 C 48 14, 40 20, 34 32 Z"
          fill={color}
        />
      );
    case "short":
      return (
        <path
          d="M 33 38 C 31 14, 44 2, 60 2 C 76 2, 89 14, 87 38 C 83 22, 73 13, 60 13 C 47 13, 37 22, 33 38 Z M 33 34 C 30 44, 31 54, 34 60 L 38 34 Z M 87 34 C 90 44, 89 54, 86 60 L 82 34 Z"
          fill={color}
        />
      );
    case "long":
      return (
        <path
          d="M 32 36 C 30 12, 44 1, 60 1 C 76 1, 90 12, 88 36 C 91 62, 90 88, 87 106 L 74 102 C 78 82, 79 60, 77 40 C 72 24, 67 17, 60 17 C 53 17, 48 24, 43 40 C 41 60, 42 82, 46 102 L 33 106 C 30 88, 29 62, 32 36 Z"
          fill={color}
        />
      );
    case "bun":
      return (
        <>
          <circle cx="60" cy="-2" r="13" fill={color} />
          <path
            d="M 34 32 C 33 11, 45 2, 60 2 C 75 2, 87 11, 86 32 C 80 19, 72 13, 60 13 C 48 13, 40 19, 34 32 Z"
            fill={color}
          />
        </>
      );
    case "curls":
      return (
        <>
          <circle cx="40" cy="20" r="13" fill={color} />
          <circle cx="60" cy="9" r="15" fill={color} />
          <circle cx="80" cy="20" r="13" fill={color} />
          <circle cx="33" cy="36" r="10" fill={color} />
          <circle cx="87" cy="36" r="10" fill={color} />
        </>
      );
  }
};

export const Person: React.FC<{
  x: number;
  y: number;
  /** 1 puts the figure in a 120 x 300 box. */
  scale: number;
  skin: string;
  hair: string;
  hairStyle?: Hair;
  /** The knitwear. */
  top: string;
  bottom?: string;
  seated?: boolean;
  /** Faces are only drawn where the figure is large enough to carry them. */
  features?: boolean;
  /** Small lean, in degrees, so a row of people never reads as a fence. */
  lean?: number;
}> = ({
  x,
  y,
  scale,
  skin,
  hair,
  hairStyle = "short",
  top,
  bottom = "#6E5A48",
  seated = false,
  features = false,
  lean = 0,
}) => {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${lean} 60 220)`}>
      {/* legs */}
      {seated ? (
        <>
          <path d="M 32 168 L 58 168 L 96 196 L 92 216 L 46 216 L 28 190 Z" fill={bottom} />
          <path d="M 62 168 L 88 168 L 118 200 L 112 218 L 92 216 L 96 196 Z" fill={bottom} opacity="0.88" />
        </>
      ) : (
        <>
          <path d="M 33 180 L 58 180 L 56 292 L 35 292 Z" fill={bottom} />
          <path d="M 62 180 L 87 180 L 85 292 L 64 292 Z" fill={bottom} />
          <path d="M 33 286 L 57 286 L 58 298 L 30 298 Z" fill="rgba(0,0,0,0.45)" />
          <path d="M 63 286 L 87 286 L 90 298 L 62 298 Z" fill="rgba(0,0,0,0.45)" />
        </>
      )}

      {/* sleeves, held clear of the body so the arms read at card size */}
      <path
        d={
          seated
            ? "M 34 88 C 24 96, 18 114, 16 136 L 15 160 C 14 170, 24 174, 28 166 L 31 138 C 33 118, 37 104, 43 94 Z"
            : "M 34 88 C 24 96, 18 116, 16 140 L 15 166 C 14 176, 24 180, 28 172 L 31 142 C 33 122, 37 106, 43 96 Z"
        }
        fill={top}
      />
      <path
        d={
          seated
            ? "M 86 88 C 96 96, 102 114, 104 136 L 105 160 C 106 170, 96 174, 92 166 L 89 138 C 87 118, 83 104, 77 94 Z"
            : "M 86 88 C 96 96, 102 116, 104 140 L 105 166 C 106 176, 96 180, 92 172 L 89 142 C 87 122, 83 106, 77 96 Z"
        }
        fill={top}
      />
      <circle cx="21" cy={seated ? 168 : 174} r="7.5" fill={skin} />
      <circle cx="99" cy={seated ? 168 : 174} r="7.5" fill={skin} />

      {/* knitwear torso */}
      <path
        d={
          seated
            ? "M 60 66 C 46 66, 36 76, 32 90 L 27 150 C 25 164, 31 172, 43 172 L 77 172 C 89 172, 95 164, 93 150 L 88 90 C 84 76, 74 66, 60 66 Z"
            : "M 60 66 C 46 66, 36 76, 32 90 L 26 164 C 24 178, 30 186, 42 186 L 78 186 C 90 186, 96 178, 94 164 L 88 90 C 84 76, 74 66, 60 66 Z"
        }
        fill={top}
      />
      {/* knit rib at the hem and a collar shadow */}
      <path
        d={seated ? "M 28 160 L 92 160" : "M 26 174 L 94 174"}
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="5"
      />
      <path
        d="M 48 70 C 52 78, 68 78, 72 70"
        stroke="rgba(0,0,0,0.16)"
        strokeWidth="4"
        fill="none"
      />

      {/* neck and head */}
      <path d="M 52 52 L 68 52 L 70 70 L 50 70 Z" fill={skin} />
      <path d="M 52 58 L 68 58 L 69 64 L 51 64 Z" fill="rgba(0,0,0,0.14)" />
      <ellipse cx="60" cy="32" rx="26" ry="27" fill={skin} />
      {features ? (
        <g
          stroke="rgba(82,54,36,0.5)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M 47 30 C 50 26, 55 26, 58 30" />
          <path d="M 62 30 C 65 26, 70 26, 73 30" />
          <path d="M 52 44 C 56 49, 64 49, 68 44" />
        </g>
      ) : null}
      <HairShape style={hairStyle} color={hair} />
      {/* the light is broad and from above */}
      <ellipse cx="52" cy="22" rx="13" ry="10" fill="rgba(255,255,255,0.16)" />
    </g>
  );
};

/** Five friends laughing on a sofa in a dim living room. */
const FriendsScene: React.FC = () => (
  <g>
    <rect x="0" y="0" width="600" height="440" fill="#3B2F27" />
    <rect x="0" y="0" width="600" height="440" fill="url(#photo-warm)" />
    <circle cx="524" cy="58" r="78" fill="#E58147" opacity="0.42" />
    <rect x="486" y="80" width="76" height="104" rx="10" fill="#7A5C3E" opacity="0.45" />
    {/* sofa back, high enough that the group is clearly sitting into it */}
    <path
      d="M 4 168 C 4 138, 28 124, 62 124 L 538 124 C 572 124, 596 138, 596 168 L 596 330 L 4 330 Z"
      fill="#4A382E"
    />
    <path
      d="M 4 300 C 4 284, 20 274, 44 274 L 556 274 C 580 274, 596 284, 596 300 L 596 440 L 4 440 Z"
      fill="#584237"
    />
    <g filter="url(#photo-soft)">
      <Person x={4} y={124} scale={0.74} seated lean={-5} skin="#C89A72" hair="#2E2119" hairStyle="curls" top="#D9C7AE" bottom="#5C4739" />
      <Person x={118} y={112} scale={0.8} seated lean={3} skin="#8E6242" hair="#1F1712" hairStyle="short" top="#8A6A4E" bottom="#4E3C30" />
      <Person x={244} y={118} scale={0.78} seated skin="#E0B893" hair="#6B4A2C" hairStyle="long" top="#EDE7DC" bottom="#5C4739" />
      <Person x={366} y={112} scale={0.8} seated lean={-4} skin="#A9764F" hair="#241A13" hairStyle="bun" top="#C09A6B" bottom="#4E3C30" />
      <Person x={486} y={126} scale={0.74} seated lean={5} skin="#D3A57E" hair="#3B2A1C" hairStyle="crop" top="#C8BBA6" bottom="#5C4739" />
    </g>
    <rect x="0" y="0" width="600" height="440" fill="url(#photo-dim)" />
  </g>
);

/** A family baking together in a bright kitchen. */
const KitchenScene: React.FC = () => (
  <g>
    <rect x="0" y="0" width="600" height="440" fill="#F0E7D8" />
    <rect x="372" y="18" width="200" height="164" rx="8" fill="#FCF8EE" />
    <path d="M 472 18 L 472 182 M 372 100 L 572 100" stroke="#D6C7AE" strokeWidth="7" />
    <rect
      x="372"
      y="18"
      width="200"
      height="164"
      rx="8"
      fill="none"
      stroke="#D6C7AE"
      strokeWidth="8"
    />
    <rect x="0" y="46" width="286" height="138" rx="6" fill="#E3D6C0" />
    <rect x="0" y="176" width="286" height="12" fill="#C9B79C" />
    <g filter="url(#photo-soft)">
      <Person x={38} y={64} scale={0.94} lean={3} skin="#D3A57E" hair="#3B2A1C" hairStyle="crop" top="#B98F63" bottom="#8A7053" />
      <Person x={168} y={58} scale={0.98} lean={-3} skin="#E0B893" hair="#7A5433" hairStyle="long" top="#EDE7DC" bottom="#8A7053" />
      <Person x={320} y={150} scale={0.66} skin="#C89A72" hair="#2E2119" hairStyle="short" top="#D9C7AE" bottom="#6E5A48" />
      <Person x={418} y={176} scale={0.56} lean={4} skin="#E0B893" hair="#6B4A2C" hairStyle="curls" top="#C08A5E" bottom="#6E5A48" />
    </g>
    {/* counter and mixing bowl */}
    <rect x="0" y="334" width="600" height="106" fill="#DCCAB1" />
    <rect x="0" y="326" width="600" height="16" rx="6" fill="#EFE4D2" />
    <path
      d="M 214 326 C 214 358, 240 378, 274 378 C 308 378, 334 358, 334 326 Z"
      fill="#F6F1E6"
    />
    <path
      d="M 214 326 C 214 358, 240 378, 274 378 C 308 378, 334 358, 334 326 Z"
      fill="none"
      stroke="#C7B79E"
      strokeWidth="5"
    />
    <ellipse cx="274" cy="322" rx="48" ry="11" fill="#FFFFFF" opacity="0.7" />
    <rect x="0" y="0" width="600" height="440" fill="url(#photo-bright)" />
  </g>
);

/** A rectangular photo card: thin white border, soft shadow, tilted on the sheet. */
export const PhotoCard: React.FC<{
  width: number;
  scene: "friends" | "kitchen";
}> = ({ width, scene }) => {
  const height = width * (440 / 600);

  return (
    <div
      style={{
        width: width + 24,
        padding: 12,
        backgroundColor: "#FFFFFF",
        boxShadow:
          "0 20px 30px rgba(24,24,24,0.30), 0 3px 6px rgba(24,24,24,0.20)",
      }}
    >
      <svg width={width} height={height} viewBox="0 0 600 440" fill="none">
        <defs>
          <linearGradient id="photo-warm" x1="0.8" y1="0" x2="0.1" y2="1">
            <stop offset="0%" stopColor="rgba(229,129,71,0.35)" />
            <stop offset="100%" stopColor="rgba(20,14,10,0.30)" />
          </linearGradient>
          <radialGradient id="photo-dim" cx="0.5" cy="0.45" r="0.72">
            <stop offset="55%" stopColor="rgba(10,8,6,0)" />
            <stop offset="100%" stopColor="rgba(10,8,6,0.55)" />
          </radialGradient>
          <radialGradient id="photo-bright" cx="0.72" cy="0.2" r="0.9">
            <stop offset="0%" stopColor="rgba(255,250,238,0.55)" />
            <stop offset="70%" stopColor="rgba(255,250,238,0)" />
          </radialGradient>
          <filter id="photo-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        {scene === "friends" ? <FriendsScene /> : <KitchenScene />}
      </svg>
    </div>
  );
};

/**
 * The family of four, cut out of its background: father, mother, teenage girl,
 * young boy, in warm beige and brown knitwear. Large enough to carry faces.
 */
export const FamilyCutout: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * (620 / 520)}
      viewBox="0 0 520 620"
      fill="none"
    >
      <defs>
        <radialGradient id="family-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(24,24,24,0.36)" />
          <stop offset="100%" stopColor="rgba(24,24,24,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="258" cy="594" rx="208" ry="26" fill="url(#family-shadow)" />

      {/* parents behind, the two children in front of them */}
      <Person
        x={26}
        y={62}
        scale={1.7}
        lean={2}
        skin="#C08A5E"
        hair="#33241A"
        hairStyle="crop"
        top="#A9764C"
        bottom="#5F4C3C"
        features
      />
      <Person
        x={236}
        y={54}
        scale={1.74}
        lean={-2}
        skin="#E0B893"
        hair="#5E3E24"
        hairStyle="long"
        top="#EDE4D4"
        bottom="#5F4C3C"
        features
      />
      <Person
        x={142}
        y={230}
        scale={1.26}
        skin="#D6A87F"
        hair="#7A5433"
        hairStyle="bun"
        top="#C0A483"
        bottom="#6E5A48"
        features
      />
      <Person
        x={300}
        y={288}
        scale={1.04}
        lean={3}
        skin="#C89A72"
        hair="#2E2119"
        hairStyle="curls"
        top="#96633C"
        bottom="#6E5A48"
        features
      />
    </svg>
  );
};
