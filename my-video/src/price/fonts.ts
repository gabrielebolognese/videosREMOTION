import { continueRender, delayRender } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";

/**
 * Inter is the neo-grotesque: 400 for every lead-in line, 700/800 for the
 * hero lines, and 500/700/800 for the pricing card's UI. Playfair Display is
 * the high-contrast Didone, and it appears in exactly two places - the bold
 * italic line in shot 4 and the wordmark on the end card.
 */
const inter = loadInter("normal", {
  weights: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const playfair = loadPlayfair("normal", {
  weights: ["500", "700", "900"],
  subsets: ["latin"],
});

const playfairItalic = loadPlayfair("italic", {
  weights: ["700"],
  subsets: ["latin"],
});

// Words land every 0.25s and each one snaps to full size the instant the next
// arrives, so a frame drawn against the fallback metrics would show the whole
// block reflowing. Hold the render until all three faces are in.
const handle = delayRender("Loading Inter and Playfair Display");

Promise.all([
  inter.waitUntilDone(),
  playfair.waitUntilDone(),
  playfairItalic.waitUntilDone(),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
