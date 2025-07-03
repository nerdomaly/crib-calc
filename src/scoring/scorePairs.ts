import { Card } from "../interfaces/card.interface";
import { getCombinations } from "../utils/getCombinations";

/**
 * Scores 2 points for each pair of cards with the same rank.
 */
export const scorePairs = (allCards: Card[]): number => {
  let score = 0;
  const combinations = getCombinations(allCards, 2);
  for (const combo of combinations) {
    if (combo[0].rank === combo[1].rank) {
      score += 2;
    }
  }
  return score;
};
