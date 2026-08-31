import { continueRender, delayRender } from "remotion";
import { loadFont as loadArchivoBlack } from "@remotion/google-fonts/ArchivoBlack";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

/**
 * Poppins is the geometric rounded sans: 900 for the "design." wordmark and
 * the small logo lockup, 500/700 for the body lines and the credit block.
 * Archivo Black is the single heavy grotesque weight "GRIDS" is set in.
 */
const poppins = loadPoppins("normal", {
  weights: ["500", "700", "900"],
  subsets: ["latin"],
});

const archivoBlack = loadArchivoBlack("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

// The wordmark is masked by the wave edge as it rises and the whip at 6.7s
// smears the letterforms, so a frame drawn against the fallback metrics would
// reveal itself immediately. Hold the render until both faces are in.
const handle = delayRender("Loading Poppins and Archivo Black");

Promise.all([poppins.waitUntilDone(), archivoBlack.waitUntilDone()])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
