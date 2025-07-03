import { Card } from "../interfaces/card.interface";
import { getCombinations } from "../utils/getCombinations";

/**
 * Scores 2 points for each combination of cards that sums to 15.
 */
export const scoreFifteens = (allCards: Card[]): number => {
  let score = 0;
  for (let i = 2; i <= allCards.length; i++) {
    const combinations = getCombinations(allCards, i);
    for (const combo of combinations) {
      if (combo.reduce((acc, card) => acc + card.value, 0) === 15) {
        score += 2;
      }
    }
  }
  return score;
};
