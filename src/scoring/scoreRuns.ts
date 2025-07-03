import { Card } from "../interfaces/card.interface";

/**
 * Scores points for runs of 3 or more consecutive cards.
 */
export const scoreRuns = (allCards: Card[]): number => {
  const uniqueCards = Array.from(
    new Map(allCards.map((card) => [card.order, card])).values()
  );
  uniqueCards.sort((a, b) => a.order - b.order);

  let runScore = 0;
  let i = 0;
  while (i < uniqueCards.length - 2) {
    let runLength = 1;
    let j = i;
    while (
      j < uniqueCards.length - 1 &&
      uniqueCards[j + 1].order === uniqueCards[j].order + 1
    ) {
      runLength++;
      j++;
    }

    if (runLength >= 3) {
      const runCards = allCards.filter(
        (card) =>
          card.order >= uniqueCards[i].order &&
          card.order <= uniqueCards[j].order
      );
      const ranksInRun = new Set(runCards.map((c) => c.rank));
      let multiplier = 1;
      if (ranksInRun.size < runLength) {
        const rankCounts: { [key: string]: number } = {};
        for (const card of runCards) {
          rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
        }
        multiplier = Object.values(rankCounts).reduce(
          (acc, count) => acc * count,
          1
        );
      }
      runScore += runLength * multiplier;
      i = j + 1;
    } else {
      i++;
    }
  }
  return runScore;
};
