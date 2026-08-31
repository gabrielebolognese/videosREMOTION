import { continueRender, delayRender } from "remotion";
import { loadFont } from "@remotion/google-fonts/Lexend";

/**
 * Lexend, and only Lexend, across the whole reel.
 *
 * Every weight from 100 to 900 is loaded, because the typography here lives in
 * the contrast inside a phrase - a 200 sitting next to a 900 is the normal
 * case, not the exception.
 */
const lexend = loadFont("normal", {
  weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

/**
 * Hold the render until the faces are actually available. A single frame drawn
 * in a fallback would be a bug, not a nitpick: every ragged line in the piece
 * is composed against Lexend's metrics and a substitute face reflows all of
 * them.
 */
const handle = delayRender("Loading Lexend 100-900");

lexend
  .waitUntilDone()
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
