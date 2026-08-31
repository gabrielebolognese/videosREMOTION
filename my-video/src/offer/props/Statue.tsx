/**
 * A colossal green-patinated robed figure holding a raised torch, on a tall
 * stone pedestal. Deliberately generic: no crown, no tablet, no inscription.
 */
export const Statue: React.FC<{ width: number }> = ({ width }) => {
  const id = "statue";

  return (
    <svg
      width={width}
      height={width * (1160 / 520)}
      viewBox="0 0 520 1160"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-patina`} x1="0.12" y1="0" x2="0.92" y2="0.8">
          <stop offset="0%" stopColor="#A2D0B7" />
          <stop offset="30%" stopColor="#6FA98B" />
          <stop offset="70%" stopColor="#4A7F66" />
          <stop offset="100%" stopColor="#2C5A46" />
        </linearGradient>
        <linearGradient id={`${id}-limb`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#8FC0A6" />
          <stop offset="100%" stopColor="#4E8369" />
        </linearGradient>
        <linearGradient id={`${id}-stone`} x1="0.1" y1="0" x2="0.95" y2="0.6">
          <stop offset="0%" stopColor="#DAD6CC" />
          <stop offset="42%" stopColor="#B5B1A7" />
          <stop offset="100%" stopColor="#827E75" />
        </linearGradient>
        <radialGradient id={`${id}-flame`} cx="0.5" cy="0.7" r="0.66">
          <stop offset="0%" stopColor="#FFF3D8" />
          <stop offset="38%" stopColor="#F0A94F" />
          <stop offset="100%" stopColor="#E58147" />
        </radialGradient>
        <filter id={`${id}-halo`} x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      {/* pedestal: cornice, then a tall tapered shaft */}
      <rect x="146" y="784" width="248" height="34" fill="#C8C4BA" />
      <rect x="136" y="818" width="268" height="24" fill="#A5A198" />
      <path d="M 156 842 L 384 842 L 408 1160 L 132 1160 Z" fill={`url(#${id}-stone)`} />
      <path
        d="M 290 842 L 306 1160 L 408 1160 L 384 842 Z"
        fill="rgba(60,56,48,0.18)"
      />
      {[912, 976, 1040, 1104].map((y) => (
        <path
          key={y}
          d={`M ${154 - (y - 842) * 0.02} ${y} L ${386 + (y - 842) * 0.075} ${y}`}
          stroke="rgba(70,66,58,0.24)"
          strokeWidth="2.6"
        />
      ))}
      <path
        d="M 156 842 L 384 842 L 408 1160 L 132 1160 Z"
        fill="none"
        stroke="rgba(70,66,58,0.35)"
        strokeWidth="3"
      />

      {/* the robe, shoulders to hem */}
      <path
        d="M 268 330
           C 236 332, 216 348, 208 378
           C 196 424, 184 520, 174 618
           C 166 692, 160 750, 158 784
           L 380 784
           C 378 750, 372 692, 364 618
           C 354 520, 342 424, 330 378
           C 322 348, 302 332, 268 330 Z"
        fill={`url(#${id}-patina)`}
      />
      <path
        d="M 236 366 C 226 456, 214 596, 200 780 M 268 350 C 266 470, 266 630, 266 780 M 302 366 C 312 456, 324 596, 336 780 M 218 396 C 210 486, 198 620, 186 780 M 320 396 C 330 486, 342 620, 352 780"
        stroke="rgba(34,70,54,0.42)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 246 362 C 236 456, 226 600, 214 780"
        stroke="rgba(178,216,198,0.42)"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M 158 784 C 220 768, 320 768, 380 784"
        stroke="rgba(34,70,54,0.5)"
        strokeWidth="7"
        fill="none"
      />

      {/* lowered arm, held down the far side of the robe */}
      <path
        d="M 330 372 C 350 414, 356 464, 348 512 C 342 546, 328 566, 310 570 L 302 528 C 316 522, 326 502, 328 472 C 330 440, 324 406, 314 380 Z"
        fill={`url(#${id}-limb)`}
      />

      {/* raised arm carrying the torch */}
      <path
        d="M 226 356
           C 210 328, 192 288, 178 246
           C 170 220, 164 194, 160 172
           L 200 160
           C 204 184, 212 212, 222 240
           C 234 274, 250 306, 262 328 Z"
        fill={`url(#${id}-limb)`}
      />
      <path
        d="M 224 350 C 208 322, 190 284, 176 242 C 168 216, 163 192, 159 172"
        stroke="rgba(178,216,198,0.4)"
        strokeWidth="5"
        fill="none"
      />
      {/* the sleeve falling away from the raised arm */}
      <path
        d="M 220 348 C 202 362, 190 386, 186 414 L 238 424 C 242 398, 252 378, 266 366 Z"
        fill="#4A7F66"
      />

      {/* veil behind the head, then the head, then the veil edges */}
      <path
        d="M 268 232 C 226 232, 204 266, 208 308 C 211 344, 224 368, 242 382 L 294 382 C 312 368, 325 344, 328 308 C 332 266, 310 232, 268 232 Z"
        fill="#4A7F66"
      />
      <ellipse cx="268" cy="292" rx="31" ry="35" fill="#8FC0A6" />
      <path
        d="M 240 246 C 222 264, 214 292, 218 322 C 221 346, 230 366, 242 380 L 230 390 C 210 372, 200 344, 198 312 C 196 276, 212 248, 236 236 Z"
        fill={`url(#${id}-patina)`}
      />
      <path
        d="M 296 246 C 314 264, 322 292, 318 322 C 315 346, 306 366, 294 380 L 306 390 C 326 372, 336 344, 338 312 C 340 276, 324 248, 300 236 Z"
        fill={`url(#${id}-patina)`}
      />

      {/* torch: handle, flared bowl, flame */}
      <path d="M 164 194 L 194 184 L 202 148 L 158 162 Z" fill="#4A7F66" />
      <path d="M 148 112 L 208 94 L 218 140 L 156 158 Z" fill="#79B69A" />
      <path
        d="M 148 112 L 208 94 L 218 140 L 156 158 Z"
        fill="none"
        stroke="rgba(34,70,54,0.42)"
        strokeWidth="3"
      />
      <circle cx="182" cy="72" r="52" fill="#E58147" opacity="0.55" filter={`url(#${id}-halo)`} />
      <path
        d="M 182 12 C 204 48, 218 76, 214 102 C 210 126, 192 138, 174 134 C 152 129, 142 110, 148 86 C 154 60, 170 40, 182 12 Z"
        fill={`url(#${id}-flame)`}
      />
      <path
        d="M 182 52 C 193 72, 199 90, 196 104 C 193 118, 184 123, 176 120 C 167 117, 164 106, 167 94 C 170 79, 176 66, 182 52 Z"
        fill="#FFF6E4"
        opacity="0.92"
      />

      {/* patina streaks down the lit side */}
      <path
        d="M 322 400 C 332 480, 342 590, 350 720"
        stroke="rgba(160,208,186,0.3)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 208 440 C 202 512, 194 610, 186 730"
        stroke="rgba(28,62,48,0.22)"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};
