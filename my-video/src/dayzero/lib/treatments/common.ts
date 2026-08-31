import type { Phrase } from "../script";
import type { Slot } from "../Text";

/** What every treatment needs: which phrase it is, and where it sits. */
export type TreatmentBase = {
  p: Phrase;
  slot: Slot;
  /** The very slight dark lift. On over footage, off on the graphic states. */
  lift?: boolean;
  /** Varies the residual drift so two phrases never breathe in sync. */
  seed?: number;
};
