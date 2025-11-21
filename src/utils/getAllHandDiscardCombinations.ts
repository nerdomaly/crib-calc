import { Card } from "../interfaces/card.interface";
import { getCombinations } from "./getCombinations";

// Helper function to check if two cards are the same (by rank and suit)
const areCardsEqual = (card1: Card, card2: Card): boolean => {
  return card1.rank === card2.rank && card1.suit === card2.suit;
};

export const getAllHandDiscardCombinations = (
  sixCards: Card[]
): { hand: Card[]; discard: Card[] }[] => {
  const allFourCardHands = getCombinations(sixCards, 4);
  const result: { hand: Card[]; discard: Card[] }[] = [];

  for (const fourCardHand of allFourCardHands) {
    const discard: Card[] = sixCards.filter(
      (card) => !fourCardHand.some((handCard) => areCardsEqual(card, handCard))
    );
    result.push({ hand: fourCardHand, discard: discard });
  }

  return result;
};
