import { continueRender, delayRender } from "remotion";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";

/**
 * Three faces, and no more.
 *
 * Nunito is the base voice: a rounded geometric sans that stays friendly at
 * 800/900 and lowercase. Playfair Display supplies the italic punch words -
 * it is the only thing in the piece that leans. Oswald carries the two
 * condensed-caps moments, the glitch beat and the end-card wordmark.
 */
const nunito = loadNunito("normal", {
  weights: ["800", "900"],
  subsets: ["latin"],
});

const playfair = loadPlayfair("italic", {
  weights: ["700", "800", "900"],
  subsets: ["latin"],
});

const oswald = loadOswald("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

// Words land a fifth of a second apart, so a single frame drawn against the
// fallback would visibly reflow the stack. Hold the render until the faces
// are real.
const handle = delayRender("Loading The Message fonts");

Promise.all([
  nunito.waitUntilDone(),
  playfair.waitUntilDone(),
  oswald.waitUntilDone(),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
