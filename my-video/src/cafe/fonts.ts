import { continueRender, delayRender } from "remotion";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

/**
 * Four faces, one job each.
 *
 * Poppins 300 carries the light geometric lines, Poppins 800 the heavy punch
 * words, Playfair Display italic the bold italic serif punch words, and Caveat
 * the handwritten studio watermark in the corner of the opening shot.
 */
const poppins = loadPoppins("normal", {
  weights: ["300", "500", "800"],
  subsets: ["latin"],
});

const poppinsItalic = loadPoppins("italic", {
  weights: ["300", "500"],
  subsets: ["latin"],
});

const playfairItalic = loadPlayfair("italic", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

const caveat = loadCaveat("normal", {
  weights: ["600"],
  subsets: ["latin"],
});

// Words land two frames apart in places, so a single frame drawn against the
// fallback would visibly reflow a line. Hold the render until the faces exist.
const handle = delayRender("Loading Poppins, Playfair Display and Caveat");

Promise.all([
  poppins.waitUntilDone(),
  poppinsItalic.waitUntilDone(),
  playfairItalic.waitUntilDone(),
  caveat.waitUntilDone(),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
