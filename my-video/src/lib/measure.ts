type LineMetrics = {
  /** Advance width of the whole line, used to centre it. */
  total: number;
  /** x offset of each word from the start of the line. */
  offsets: number[];
};

let ctx: CanvasRenderingContext2D | null | undefined;

const context = () => {
  if (ctx === undefined) {
    ctx = document.createElement("canvas").getContext("2d");
  }
  return ctx;
};

/**
 * Advance width of a run including the trailing letter-spacing the browser
 * adds after the final glyph. Canvas reports the unspaced advance, so the
 * spacing is added back per character - which is exactly the model SVG text
 * uses, so the two agree.
 */
const advance = (text: string, font: string, letterSpacing: number) => {
  const c = context();
  if (!c) {
    return 0;
  }
  c.font = font;
  return c.measureText(text).width + letterSpacing * text.length;
};

const cache = new Map<string, LineMetrics>();

/**
 * Lays a line of words out on one baseline and returns where each word starts.
 *
 * Words in the full-screen scenes appear one at a time but must never shift a
 * word that has already settled, so the line is laid out once at its final
 * width and each word is drawn in the slot it will keep. Offsets come from
 * measuring prefixes of the real string, so space widths and kerning across
 * the space come out of the shaper instead of being guessed.
 */
export const measureLine = (
  words: string[],
  font: string,
  letterSpacing: number,
): LineMetrics => {
  const key = `${font}|${letterSpacing}|${words.join("\u0000")}`;
  const hit = cache.get(key);
  if (hit) {
    return hit;
  }

  const metrics: LineMetrics = {
    total: advance(words.join(" "), font, letterSpacing),
    offsets: words.map((_, i) =>
      i === 0
        ? 0
        : advance(words.slice(0, i).join(" ") + " ", font, letterSpacing),
    ),
  };

  // Only keep the result once the real face is available. Measuring against
  // the fallback during font load would poison the cache for the whole render.
  if (document.fonts.check(font)) {
    cache.set(key, metrics);
  }
  return metrics;
};
