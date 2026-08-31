import React from "react";
import { BADGE, BUTTON, CARD_BOT, CARD_TOP, SANS } from "../lib/tokens";

const ID = "pricecard";

const BULLETS = ["Unlimited Projects", "AI Assistant", "24/7 Support", "No Ads"];

/**
 * The hero of shot 5: a floating subscription pricing card.
 *
 * Every piece of its UI is present from the moment the card enters frame -
 * nothing on the card animates. The card itself moves; its contents do not.
 */
export const PriceCard: React.FC<{ height: number }> = ({ height }) => (
  <svg
    width={height * (520 / 660)}
    height={height}
    viewBox="0 0 520 660"
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id={`${ID}-panel`} x1="0" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stopColor={CARD_TOP} />
        <stop offset="100%" stopColor={CARD_BOT} />
      </linearGradient>
      <linearGradient id={`${ID}-badge`} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#C6A0E0" />
        <stop offset="100%" stopColor={BADGE} />
      </linearGradient>
      <linearGradient id={`${ID}-button`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A2D29" />
        <stop offset="52%" stopColor={BUTTON} />
        <stop offset="100%" stopColor="#0A0C09" />
      </linearGradient>
      <clipPath id={`${ID}-body`}>
        <rect x="0" y="0" width="520" height="660" rx="44" />
      </clipPath>
    </defs>

    {/* Wide soft shadow under the card. */}
    <rect
      x="26"
      y="52"
      width="468"
      height="620"
      rx="44"
      fill="#5E646C"
      opacity="0.26"
      style={{ filter: "blur(30px)" }}
    />

    <rect x="0" y="0" width="520" height="660" rx="44" fill="#FFFFFF" />

    <g clipPath={`url(#${ID}-body)`}>
      {/* Upper panel, lilac to pale blue. */}
      <rect x="0" y="0" width="520" height="252" fill={`url(#${ID}-panel)`} />
      <path
        d="M 0 252 L 520 252"
        stroke="rgba(120,124,150,0.16)"
        strokeWidth="1.4"
      />

      {/* Badge, top left. */}
      <rect x="44" y="44" width="104" height="46" rx="23" fill={`url(#${ID}-badge)`} />
      <text
        x="96"
        y="75"
        fill="#FFFFFF"
        textAnchor="middle"
        style={{ fontFamily: SANS, fontSize: 24, fontWeight: 700, letterSpacing: "0.01em" }}
      >
        Pro
      </text>

      {/* Price. */}
      <text
        x="44"
        y="205"
        fill="#0D0F12"
        style={{ fontFamily: SANS, fontSize: 108, fontWeight: 800, letterSpacing: "-0.05em" }}
      >
        $99
      </text>
      <text
        x="262"
        y="203"
        fill="#9AA0A8"
        style={{ fontFamily: SANS, fontSize: 30, fontWeight: 500, letterSpacing: "-0.01em" }}
      >
        / month
      </text>

      {/* The key, catching the left of the white body - under the type, so it
          lifts the card without washing the feature list out. */}
      <ellipse
        cx="120"
        cy="340"
        rx="180"
        ry="120"
        fill="#FFFFFF"
        opacity="0.34"
        style={{ filter: "blur(34px)" }}
      />

      {/* Feature list. */}
      {BULLETS.map((b, i) => (
        <g key={b} transform={`translate(48 ${312 + i * 50})`}>
          <circle cx="7" cy="-6" r="5.5" fill="#B9BFC7" />
          <text
            x="28"
            y="0"
            fill="#4A5058"
            style={{ fontFamily: SANS, fontSize: 25, fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            {b}
          </text>
        </g>
      ))}

      {/* Full-width black pill button. */}
      <rect x="44" y="530" width="432" height="82" rx="41" fill={`url(#${ID}-button)`} />
      <text
        x="260"
        y="581"
        fill="#FFFFFF"
        textAnchor="middle"
        style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: "-0.01em" }}
      >
        Choose
      </text>

    </g>

    <rect
      x="0"
      y="0"
      width="520"
      height="660"
      rx="44"
      fill="none"
      stroke="rgba(150,154,164,0.22)"
      strokeWidth="1.6"
    />
  </svg>
);
