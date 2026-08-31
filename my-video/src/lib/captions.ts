export type CaptionUnit = {
  /** Seconds. */
  from: number;
  to: number;
  text: string;
};

/**
 * Every caption unit in the reel, in one flat list, in seconds.
 *
 * Deliberately NOT nested inside the shots. "100 DAYS" runs 13.17 to 14.02 and
 * "PER DAY" runs 16.20 to 16.89; each of those straddles a footage cut, and
 * keying them per shot would restart them on the cut. Driven from one array
 * against the absolute frame, a unit simply cannot notice a shot boundary.
 *
 * The gaps are as deliberate as the units: the frame is caption-free from 0.00
 * to 0.15, from 14.02 to 14.18 and from 18.30 to 18.70, and there is no band
 * at all across the two full-screen scenes.
 */
export const CAPTIONS: CaptionUnit[] = [
  // Shot 1 - live footage, band runs straight through the internal cuts.
  { from: 0.15, to: 1.04, text: "CLAUDE HAS A" },
  { from: 1.04, to: 1.53, text: "HUGE" },
  { from: 1.53, to: 2.19, text: "LIBRARY" },
  { from: 2.19, to: 3.03, text: "THOUSANDS OF" },
  { from: 3.03, to: 3.67, text: "SKILLS, PLUGINS," },
  { from: 3.67, to: 4.31, text: "CONNECTORS" },
  { from: 4.31, to: 5.22, text: "I MEAN..." },

  // Shot 4 - the band steps aside for hero moment 1 between 11.12 and 12.07.
  { from: 10.37, to: 11.12, text: "A SERIES" },
  { from: 12.07, to: 12.62, text: "WHERE EVERY" },
  { from: 12.62, to: 13.17, text: "SINGLE DAY FOR" },
  { from: 13.17, to: 14.02, text: "100 DAYS" }, // crosses the 13.50 cut

  // Shot 5 - b-roll, the band is the only overlay.
  { from: 14.18, to: 14.7, text: "I'LL BE" },
  { from: 14.7, to: 15.47, text: "TEACHING ONE" },
  { from: 15.47, to: 15.81, text: "CLAUDE" },
  { from: 15.81, to: 16.2, text: "SKILL" },
  { from: 16.2, to: 16.89, text: "PER DAY" }, // crosses the 16.78 cut

  // Shot 6 - runs out at 19.30, where hero moment 2 takes the frame.
  { from: 16.89, to: 17.57, text: "AND THIS..." },
  { from: 17.57, to: 18.3, text: "IS DAY 0" },
  { from: 18.7, to: 19.3, text: "SO DROP A" },
];
