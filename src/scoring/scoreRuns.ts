import { Card } from "../interfaces/card.interface";

/**
 * Finds all unique permutations of runs in a 5-card hand.
 * @param cards An array of exactly 5 card objects.
 * @returns An array of card arrays, where each inner array is a unique run.
 */
const findAllRunPermutations = (cards: Card[]): Card[][] => {
  if (cards.length !== 5) {
    return []; // Only works for 5 cards
  }

  // 1. Find the longest consecutive base run
  const uniqueSortedCards = [
    ...new Map(cards.map((c) => [c.order, c])).values(),
  ].sort((a, b) => a.order - b.order);

  let longestRun: Card[] = [];
  for (let i = 0; i < uniqueSortedCards.length; i++) {
    for (let j = i; j < uniqueSortedCards.length; j++) {
      const slice = uniqueSortedCards.slice(i, j + 1);
      const isRun =
        slice.length >= 3 &&
        slice.every(
          (card, index) =>
            index === 0 || card.order === slice[index - 1].order + 1
        );
      if (isRun && slice.length > longestRun.length) {
        longestRun = slice;
      }
    }
  }

  if (longestRun.length === 0) {
    return []; // No runs found
  }

  // 2. Group all original cards by the ranks needed for the run
  const participatingCardsByRank = new Map<number, Card[]>();
  for (const runCard of longestRun) {
    participatingCardsByRank.set(runCard.order, []);
  }
  for (const originalCard of cards) {
    if (participatingCardsByRank.has(originalCard.order)) {
      participatingCardsByRank.get(originalCard.order)!.push(originalCard);
    }
  }

  // 3. Generate the permutations using a recursive helper
  const allPermutations: Card[][] = [];
  const buildPermutations = (rankIndex: number, currentPermutation: Card[]) => {
    // Base case: if we have a card for each rank in the run, we're done
    if (rankIndex === longestRun.length) {
      allPermutations.push(currentPermutation);
      return;
    }

    // Recursive step
    const currentOrder = longestRun[rankIndex].order;
    const cardsForRank = participatingCardsByRank.get(currentOrder)!;

    for (const card of cardsForRank) {
      buildPermutations(rankIndex + 1, [...currentPermutation, card]);
    }
  };

  buildPermutations(0, []);
  return allPermutations;
};

/**
 * Scores points for runs of 3 or more consecutive cards.
 */
export const scoreRuns = (cards: Card[]): number => {
  if (cards.length !== 5) {
    console.error("This function requires exactly 5 cards.");
    return 0;
  }

  const runPermutations = findAllRunPermutations(cards);

  return runPermutations.reduce((totalScore, run) => {
    const runLength = run.length;
    if (runLength >= 3) {
      totalScore += runLength;
    }
    return totalScore;
  }, 0);
};
