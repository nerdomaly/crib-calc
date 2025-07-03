import { Card } from "../interfaces/card.interface";

/**
 * Scores points for a 4-card or 5-card flush.
 */
export const scoreFlush = (
  hand: Card[],
  commonCard?: Card,
  isCrib: boolean = false
): number => {
  const firstSuit = hand[0].suit;
  const handFlush = hand.every((card) => card.suit === firstSuit);

  if (handFlush && commonCard?.suit === firstSuit) {
    return 5;
  }
  if (handFlush && !isCrib) {
    return 4;
  }
  return 0;
};
