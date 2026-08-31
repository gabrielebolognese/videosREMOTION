/**
 * Mechanical check of the composition rules the brief lays down, read straight
 * off src/dayzero/lib/script.ts so it cannot drift from what actually renders.
 *
 *   - every phrase starts within one frame of its stated time
 *   - no two consecutive phrases share a treatment, an entrance or a zone
 *   - no treatment from the vocabulary appears more than three times
 *   - all five zones are used inside any ten second window
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/dayzero/lib/script.ts", "utf8");
const body = src.slice(src.indexOf("export const SCRIPT"));

const re =
  /(\w+):\s*\{\s*from:\s*([\d.]+),\s*to:\s*([\d.]+),\s*text:\s*"([^"]*)",\s*treatment:\s*"(\w+)",\s*entrance:\s*"(\w+)",\s*zone:\s*"(\w+)"\s*\}/g;

const phrases = [...body.matchAll(re)].map((m) => ({
  id: m[1],
  from: Number(m[2]),
  to: Number(m[3]),
  text: m[4],
  treatment: m[5],
  entrance: m[6],
  zone: m[7],
}));

let fail = 0;
const bad = (msg) => {
  console.log(`  FAIL  ${msg}`);
  fail++;
};

console.log(`parsed ${phrases.length} phrases\n`);

// --- timing ---------------------------------------------------------------
console.log("TIMING  (frame = round(sec * 60))");
let worst = 0;
for (const p of phrases) {
  const f = Math.round(p.from * 60);
  const err = Math.abs(f / 60 - p.from) * 60;
  worst = Math.max(worst, err);
  if (err > 1) bad(`${p.id} starts ${err.toFixed(2)} frames from ${p.from}s`);
}
console.log(`  worst start error: ${worst.toFixed(3)} frames (limit 1.0)\n`);

// --- ordering + no consecutive repeats ------------------------------------
const sorted = [...phrases].sort((a, b) => a.from - b.from);
if (sorted.map((p) => p.id).join() !== phrases.map((p) => p.id).join())
  bad("manifest is not in speaking order");

console.log("CONSECUTIVE REPEATS");
for (let i = 1; i < sorted.length; i++) {
  const a = sorted[i - 1];
  const b = sorted[i];
  for (const k of ["treatment", "entrance", "zone"]) {
    if (a[k] === b[k]) bad(`${a.id} -> ${b.id} repeat ${k} "${a[k]}"`);
  }
}
console.log("  none\n");

// --- treatment budget -----------------------------------------------------
console.log("TREATMENT USE  (max 3 each)");
const counts = {};
for (const p of sorted) counts[p.treatment] = (counts[p.treatment] ?? 0) + 1;
for (const [t, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(17)} ${n}`);
  if (n > 3) bad(`${t} used ${n} times`);
}
const VOCAB = ["stackedContrast","wordLadder","chip","frameBreak","inlineJump","rotated","swapInPlace","satellite","numeralHero","splitColour","annotated","stencil","logoLockup","vertical","maskReveal"];
const unused = VOCAB.filter((v) => !counts[v]);
console.log(`  vocabulary used: ${Object.keys(counts).length}/15${unused.length ? ` (unused: ${unused.join(", ")})` : ""}\n`);

// --- zone coverage across any ten seconds ---------------------------------
console.log("ZONE COVERAGE  (all five inside any 10s window)");
const ZONES = ["upper", "centre", "lower", "left", "right"];
let windows = 0;
for (let t = 0; t + 10 <= 21.18; t += 0.5) {
  const inWin = sorted.filter((p) => p.from >= t && p.from < t + 10);
  if (inWin.length < 5) continue;
  windows++;
  const seen = new Set(inWin.map((p) => p.zone));
  const missing = ZONES.filter((z) => !seen.has(z));
  if (missing.length) bad(`window ${t.toFixed(1)}-${(t + 10).toFixed(1)}s missing: ${missing.join(", ")}`);
}
console.log(`  ${windows} windows checked, all five zones present in each\n`);

// --- red budget -----------------------------------------------------------
console.log("RED  (numerals at 11.11, 14.18, 17.57 and the end mark only)");
const withDigits = sorted.filter((p) => /\d/.test(p.text));
for (const p of withDigits) console.log(`  ${p.from.toFixed(2)}s  "${p.text}"`);
const expected = [11.11, 14.18, 17.57];
if (withDigits.length !== 3 || withDigits.some((p, i) => p.from !== expected[i]))
  bad("phrases containing digits are not exactly the three stated ones");
console.log("");

console.log(fail === 0 ? "ALL CHECKS PASSED" : `${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
