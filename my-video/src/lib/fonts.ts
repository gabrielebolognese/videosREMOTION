import { continueRender, delayRender } from "remotion";
import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";

/**
 * Loaded once for the whole reel, from the composition root.
 *
 * Inter Tight carries everything: 400 for the full-screen small lines, 700 for
 * the headlines, the caption band and the hero satellites, 900 for the two
 * hero words. The single exception in the video is the 46px italic script
 * accent that closes hero moment 2, which needs a serif.
 */
const interTight = loadInterTight("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const playfairItalic = loadPlayfair("italic", {
  weights: ["400"],
  subsets: ["latin"],
});

/**
 * Hold the render until both faces are real. Word positions inside the
 * full-screen lines are measured from the loaded font, so a frame drawn
 * against the fallback would lay the line out at the wrong width.
 */
const handle = delayRender("Loading Inter Tight and Playfair Display");

Promise.all([interTight.waitUntilDone(), playfairItalic.waitUntilDone()])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
