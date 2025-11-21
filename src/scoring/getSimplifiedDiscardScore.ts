import { Card } from "../interfaces/card.interface";
import { scoreFifteens } from "./scoreFifteens";
import { scorePairs } from "./scorePairs";

export const getSimplifiedDiscardScore = (discard: Card[]): number => {
  if (discard.length !== 2) {
    throw new Error("Discard must contain exactly two cards.");
  }

  let score = 0;
  score += scoreFifteens(discard);
  score += scorePairs(discard);

  return score;
};
