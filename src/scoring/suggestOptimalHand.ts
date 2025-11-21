import { Card } from "../interfaces/card.interface";
import { getAllHandDiscardCombinations } from "../utils/getAllHandDiscardCombinations";
import { getExpectedHandScore } from "./getExpectedHandScore";
import { getSimplifiedDiscardScore } from "./getSimplifiedDiscardScore";

export const suggestOptimalHand = (
  initialSixCards: Card[],
  isDealer: boolean
): { hand: Card[]; discard: Card[]; totalValue: number } => {
  const combinations = getAllHandDiscardCombinations(initialSixCards);

  let bestHand: Card[] = [];
  let bestDiscard: Card[] = [];
  let highestTotalValue = -Infinity;

  for (const combo of combinations) {
    const expectedHandScore = getExpectedHandScore(
      combo.hand,
      initialSixCards
    );
    const simplifiedDiscardScore = getSimplifiedDiscardScore(combo.discard);

    let totalValue: number;
    if (isDealer) {
      totalValue = expectedHandScore + simplifiedDiscardScore;
    } else {
      totalValue = expectedHandScore - simplifiedDiscardScore;
    }

    if (totalValue > highestTotalValue) {
      highestTotalValue = totalValue;
      bestHand = combo.hand;
      bestDiscard = combo.discard;
    }
  }

  return { hand: bestHand, discard: bestDiscard, totalValue: highestTotalValue };
};
