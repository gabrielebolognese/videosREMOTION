import { sec } from "./tokens";

/** The fifteen caption treatments. Each one is a component in lib/treatments. */
export type Treatment =
  | "logoLockup"
  | "vertical"
  | "frameBreak"
  | "wordLadder"
  | "stackedContrast"
  | "chip"
  | "stencil"
  | "inlineJump"
  | "rotated"
  | "maskReveal"
  | "satellite"
  | "annotated"
  | "numeralHero"
  | "swapInPlace"
  | "splitColour";

/** How a phrase arrives. Never the same one twice running. */
export type Entrance =
  | "stagger"
  | "scaleIn"
  | "maskWipe"
  | "blurResolve"
  | "slide"
  | "letters"
  | "scaleDown";

/** Where it sits. Consecutive phrases always change zone. */
export type Zone = "upper" | "centre" | "lower" | "left" | "right";

export type Phrase = {
  /** Seconds, measured off the voice. Exact. */
  from: number;
  to: number;
  text: string;
  treatment: Treatment;
  entrance: Entrance;
  zone: Zone;
};

/**
 * The whole script in one manifest.
 *
 * This is the single source of truth for timing: scenes read `from`/`to` from
 * here rather than restating a number, so a phrase cannot drift away from the
 * voice. The treatment / entrance / zone fields are declared here too so the
 * composition rules - no consecutive repeats, no treatment more than three
 * times, all five zones inside any ten seconds - can be checked mechanically
 * instead of by eye. See scripts/audit-script.mjs.
 */
export const SCRIPT = {
  // --- The intro. The whole video's audition. -----------------------------
  claudeHas: { from: 0.15, to: 0.56, text: "claude has", treatment: "logoLockup", entrance: "slide", zone: "upper" },
  a: { from: 0.65, to: 0.87, text: "a", treatment: "vertical", entrance: "blurResolve", zone: "left" },
  huge: { from: 1.04, to: 1.4, text: "HUGE", treatment: "frameBreak", entrance: "scaleDown", zone: "centre" },
  library: { from: 1.53, to: 1.97, text: "library:", treatment: "wordLadder", entrance: "stagger", zone: "lower" },

  // --- The full-screen scene. Accumulate, overload, then drain. -----------
  thousandsOf: { from: 2.19, to: 2.78, text: "thousands of", treatment: "stackedContrast", entrance: "scaleIn", zone: "upper" },
  skillsPlugins: { from: 3.03, to: 3.58, text: "skills, plugins,", treatment: "chip", entrance: "slide", zone: "left" },
  connectors: { from: 3.67, to: 4.17, text: "connectors.", treatment: "stencil", entrance: "scaleIn", zone: "centre" },
  iMean: { from: 4.31, to: 4.8, text: "i mean...", treatment: "inlineJump", entrance: "stagger", zone: "right" },
  areYou: { from: 5.29, to: 5.66, text: "are you", treatment: "rotated", entrance: "blurResolve", zone: "upper" },
  evenKeeping: { from: 5.8, to: 6.65, text: "even keeping", treatment: "maskReveal", entrance: "maskWipe", zone: "lower" },
  up: { from: 7.06, to: 7.3, text: "up?", treatment: "frameBreak", entrance: "scaleDown", zone: "centre" },

  // --- The desk shot. Big pale wall across the top. ------------------------
  soThats: { from: 7.3, to: 7.78, text: "so that's", treatment: "satellite", entrance: "stagger", zone: "left" },
  whyI: { from: 7.96, to: 8.45, text: "why i", treatment: "wordLadder", entrance: "slide", zone: "centre" },
  decidedTo: { from: 8.84, to: 9.75, text: "decided to", treatment: "stackedContrast", entrance: "blurResolve", zone: "upper" },
  startA: { from: 9.91, to: 10.58, text: "start a", treatment: "annotated", entrance: "scaleIn", zone: "lower" },

  // --- The selfie. Face centre left, forearm lower left. Stay right. -------
  series: { from: 10.69, to: 11.11, text: "series:", treatment: "vertical", entrance: "letters", zone: "right" },
  seriesTitle: { from: 11.11, to: 11.94, text: "100 days of claude.", treatment: "numeralHero", entrance: "scaleDown", zone: "upper" },
  where: { from: 12.07, to: 12.28, text: "where", treatment: "chip", entrance: "slide", zone: "right" },
  // Zone is "left" not "lower": in the real selfie footage the forearm sweeps
  // the lower RIGHT and the face sits centre, so the open ground is the upper
  // left wall, not the floor.
  everySingle: { from: 12.28, to: 13.14, text: "every single", treatment: "inlineJump", entrance: "stagger", zone: "left" },
  dayFor: { from: 13.14, to: 13.57, text: "day for", treatment: "rotated", entrance: "blurResolve", zone: "right" },

  // --- B-roll. No subject to avoid. Use the whole frame. -------------------
  hundredDays: { from: 14.18, to: 14.56, text: "100 days", treatment: "numeralHero", entrance: "scaleIn", zone: "centre" },
  illBe: { from: 14.57, to: 14.95, text: "i'll be", treatment: "swapInPlace", entrance: "maskWipe", zone: "left" },
  teachingOne: { from: 14.95, to: 15.53, text: "teaching one", treatment: "wordLadder", entrance: "stagger", zone: "lower" },
  claudeSkill: { from: 15.54, to: 16.06, text: "claude skill", treatment: "logoLockup", entrance: "scaleIn", zone: "centre" },
  perDay: { from: 16.2, to: 16.58, text: "per day.", treatment: "maskReveal", entrance: "maskWipe", zone: "lower" },

  // --- Back to the wide. Top quarter and bottom third open. ----------------
  andThis: { from: 16.89, to: 17.19, text: "and this...", treatment: "satellite", entrance: "blurResolve", zone: "upper" },
  isDayZero: { from: 17.57, to: 18.17, text: "is day 0,", treatment: "numeralHero", entrance: "scaleDown", zone: "centre" },
  soDropA: { from: 18.7, to: 19.22, text: "so drop a", treatment: "stencil", entrance: "scaleIn", zone: "lower" },
  follow: { from: 19.3, to: 19.66, text: "follow,", treatment: "chip", entrance: "slide", zone: "right" },
  andSeeYou: { from: 19.77, to: 20.28, text: "and see you", treatment: "maskReveal", entrance: "maskWipe", zone: "upper" },
  tomorrow: { from: 20.29, to: 20.81, text: "tomorrow.", treatment: "splitColour", entrance: "letters", zone: "centre" },
} satisfies Record<string, Phrase>;

export type PhraseId = keyof typeof SCRIPT;

/** Phrases in speaking order, for the mechanical audit. */
export const ORDER = Object.keys(SCRIPT) as PhraseId[];

/** Frame a phrase starts on. */
export const inFrame = (p: Phrase) => sec(p.from);
/** Frame a phrase is done reading and begins to leave. */
export const outFrame = (p: Phrase) => sec(p.to);
