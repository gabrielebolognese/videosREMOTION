import { continueRender, delayRender } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPacifico } from "@remotion/google-fonts/Pacifico";

// The registered families are "Inter" and "Pacifico", which are written as
// hardcoded strings inline in the scenes.
const inter = loadInter("normal", {
  weights: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const interItalic = loadInter("italic", {
  weights: ["800", "900"],
  subsets: ["latin"],
});

const pacifico = loadPacifico("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

// Hold the render back until every face is actually available, otherwise short
// renders can flash through with the fallback serif.
const handle = delayRender("Loading Inter and Pacifico");

Promise.all([
  inter.waitUntilDone(),
  interItalic.waitUntilDone(),
  pacifico.waitUntilDone(),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
