import { continueRender, delayRender } from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

/**
 * One family runs the whole piece: Poppins, the geometric rounded sans the
 * brief asks for. 300 carries the connector words, 800 carries every keyword,
 * and the italic 800 exists only for "Same Place" in shot 2.
 */
const poppins = loadPoppins("normal", {
  weights: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const poppinsItalic = loadPoppins("italic", {
  weights: ["800"],
  subsets: ["latin"],
});

// Words land every 0.4-0.6s with a three frame overshoot on each. A frame drawn
// against the fallback face would visibly reflow, so hold the render.
const handle = delayRender("Loading Poppins for Smart Moves");

Promise.all([poppins.waitUntilDone(), poppinsItalic.waitUntilDone()])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
