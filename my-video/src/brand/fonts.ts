import { continueRender, delayRender } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadBaloo } from "@remotion/google-fonts/Baloo2";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";

/**
 * Type stack for the branding carousel.
 *
 * SERIF carries the whole reel - a high contrast display serif, always italic.
 * MARKER is only ever used for the words "Playful Fonts", ROUNDED only for
 * "Calm Blue text", and CONDENSED only for the word inside the TRUSTED seal.
 */
export const SERIF = "Playfair Display";
export const MARKER = "Baloo Two";
export const ROUNDED = "Nunito";
export const CONDENSED = "Oswald";

const serifItalic = loadPlayfair("italic", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const serifRoman = loadPlayfair("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const marker = loadBaloo("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

const rounded = loadNunito("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});

const condensed = loadOswald("normal", {
  weights: ["500", "600"],
  subsets: ["latin"],
});

// Every reveal in this reel is a blur-to-sharp snap, so a single frame drawn
// with a fallback face is very visible. Hold the render until all four land.
const handle = delayRender("Loading branding carousel fonts");

Promise.all([
  serifItalic.waitUntilDone(),
  serifRoman.waitUntilDone(),
  marker.waitUntilDone(),
  rounded.waitUntilDone(),
  condensed.waitUntilDone(),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
