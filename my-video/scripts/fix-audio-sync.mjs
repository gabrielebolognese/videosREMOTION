import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";

/**
 * Corrects the AAC encoder delay left in a Remotion MP4 render.
 *
 * Remotion encodes the audio to a raw ADTS stream (`-f adts` in
 * compress-audio.js) and then stream-copies it into the MP4. ADTS carries no
 * container-level encoder-delay metadata, so the AAC encoder's priming samples
 * survive into the file uncompensated and every player starts the audio 2048
 * samples - 42.67ms, about 2.5 frames at 60fps - after the picture.
 *
 * Measured against the source: the audio Remotion extracts is bit exact (a
 * pcm-16 render correlates at r = 1.000000 with zero lag), so the offset is
 * purely this container artefact.
 *
 * The fix is a stream copy, not a re-encode: seeking the audio input by
 * exactly two AAC frames lands on a frame boundary, so ffmpeg drops precisely
 * the priming and nothing else. The AAC bitstream, the video and the source
 * audio content are all untouched.
 */

const PRIMING_SAMPLES = 2048;
const SAMPLE_RATE = 48000;
const OFFSET = PRIMING_SAMPLES / SAMPLE_RATE;

const target = process.argv[2];
if (!target || !existsSync(target)) {
  console.error(`fix-audio-sync: no such file: ${target}`);
  process.exit(1);
}

const temp = target.replace(/\.mp4$/, ".sync-tmp.mp4");

// `remotion ffmpeg` is a .cmd shim on Windows, so this has to go through a
// shell. Every argument here is a literal from this file - nothing is
// interpolated from user input.
const result = spawnSync(
  [
    "npx remotion ffmpeg -y -v error",
    `-i "${target}"`,
    `-ss ${OFFSET}`,
    `-i "${target}"`,
    "-map 0:v -map 1:a -c copy -movflags faststart",
    `"${temp}"`,
  ].join(" "),
  { stdio: "inherit", shell: true },
);

if (result.status !== 0) {
  rmSync(temp, { force: true });
  console.error("fix-audio-sync: ffmpeg failed");
  process.exit(result.status ?? 1);
}

rmSync(target, { force: true });
renameSync(temp, target);
console.log(
  `fix-audio-sync: dropped ${PRIMING_SAMPLES} samples of AAC priming (${(OFFSET * 1000).toFixed(2)}ms) from ${target}`,
);
