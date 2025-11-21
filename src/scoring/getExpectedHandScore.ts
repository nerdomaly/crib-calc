import { Card } from "../interfaces/card.interface";
import { generateDeck } from "../utils/generateDeck";
import { calculateCribbageScore } from "./index";

export const getExpectedHandScore = (
  fourCardHand: Card[],
  initialSixCards: Card[]
): number => {
  const fullDeck = generateDeck();

  // Filter out the initial six cards to get possible cut cards
  const possibleCutCards = fullDeck.filter(
    (deckCard) =>
      !initialSixCards.some(
        (initialCard) =>
          initialCard.rank === deckCard.rank && initialCard.suit === deckCard.suit
      )
  );

  let totalScore = 0;
  for (const cutCard of possibleCutCards) {
    totalScore += calculateCribbageScore(fourCardHand, cutCard).totalScore;
  }

  return totalScore / possibleCutCards.length;
};
