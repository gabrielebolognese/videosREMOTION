import { continueRender, delayRender } from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadChakra } from "@remotion/google-fonts/ChakraPetch";

/**
 * Two faces only.
 *
 * Poppins is the geometric sans the whole kinetic type layer is set in, from a
 * 400 caption up to a 900 hero word. Chakra Petch is squared-off and is used
 * for nothing except the agency wordmark lock-up.
 */
const poppins = loadPoppins("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const chakra = loadChakra("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

// Type snaps in hard here, so a frame drawn in a fallback face would be very
// visible. Hold the render until both are real.
const handle = delayRender("Loading Poppins and Chakra Petch");

Promise.all([poppins.waitUntilDone(), chakra.waitUntilDone()])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
