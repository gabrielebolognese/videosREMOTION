import { continueRender, delayRender } from "remotion";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

/**
 * Playfair Display italic is the voice of the piece - 400 for the thin lead-in
 * lines, 800 for the hero words, both with the ball terminals the brief asks
 * for. The other three faces appear exactly where the brief names them and
 * nowhere else: Caveat for "Playful Fonts", Poppins italic for "Calm Blue
 * text", Oswald for the "TRUSTED" stamp.
 */
const playfair = loadPlayfair("italic", {
  weights: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const playfairRoman = loadPlayfair("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

const caveat = loadCaveat("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

const poppinsItalic = loadPoppins("italic", {
  weights: ["800"],
  subsets: ["latin"],
});

const oswald = loadOswald("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

// Words land every 0.4s or so and several reveals are letter by letter, so a
// frame drawn against the fallback would reflow visibly. Hold the render.
const handle = delayRender("Loading Playfair, Caveat, Poppins and Oswald");

Promise.all([
  playfair.waitUntilDone(),
  playfairRoman.waitUntilDone(),
  caveat.waitUntilDone(),
  poppinsItalic.waitUntilDone(),
  oswald.waitUntilDone(),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
