import { continueRender, delayRender } from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

/**
 * Poppins is the whole type system: a geometric sans heavy enough at 800/900
 * to carry the stacked hook lines, set with negative tracking so the pairs
 * read as one block rather than two words.
 */
const poppins = loadPoppins("normal", {
  weights: ["700", "800", "900"],
  subsets: ["latin"],
});

// Words land 6 frames apart, so a single frame drawn against the fallback
// would visibly reflow the stack. Hold the render until the faces are real.
const handle = delayRender("Loading Poppins");

poppins
  .waitUntilDone()
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
