import { Card } from "../interfaces/card.interface";

/**
 * Scores 1 point for "Nobs" (Jack of the same suit as the starter card).
 */
export const scoreNobs = (hand: Card[], commonCard: Card): number => {
  console.log("Common Card:", commonCard);
  return hand.some((card) => card.rank === "J" && card.suit === commonCard.suit)
    ? 1
    : 0;
};
