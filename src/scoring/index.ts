import { Card } from "../interfaces/card.interface";
import { scoreFifteens } from "./scoreFifteens";
import { scoreFlush } from "./scoreFlush";
import { scoreNobs } from "./scoreNobs";
import { scorePairs } from "./scorePairs";
import { scoreRuns } from "./scoreRuns";

export { scorePairs, scoreRuns, scoreFlush, scoreNobs, scoreFifteens };

/**
 * Calculates the total score for a cribbage hand.
 */
export const calculateCribbageScore = (
  hand: Card[],
  commonCard?: Card,
  isCrib: boolean = false
): { totalScore: number; breakdown: { [key: string]: number } } => {
  const allCards = [...hand, commonCard].filter(
    (c): c is Card => c !== undefined
  );

  const fifteenScore = scoreFifteens(allCards);
  const pairScore = scorePairs(allCards);
  const runScore = scoreRuns(allCards);
  const flushScore = scoreFlush(hand, commonCard, isCrib);
  const nobsScore = commonCard ? scoreNobs(hand, commonCard) : 0;

  const totalScore =
    fifteenScore + pairScore + runScore + flushScore + nobsScore;

  return {
    totalScore,
    breakdown: {
      fifteens: fifteenScore,
      pairs: pairScore,
      runs: runScore,
      flush: flushScore,
      nobs: nobsScore,
    },
  };
};
