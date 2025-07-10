import { parseCard } from "../utils/parseCard";
import { scoreFifteens } from "./scoreFifteens";
import { testingHands } from "../constants/testingHands";
import { scoreFlush } from "./scoreFlush";
import { scoreNobs } from "./scoreNobs";
import { scorePairs } from "./scorePairs";
import { scoreRuns } from "./scoreRuns";
import { calculateCribbageScore } from ".";

describe("Testing Fifteen Scores", () => {
  testingHands.forEach(({ hand, fifteenScore }) => {
    test(`${hand} should score ${fifteenScore}`, () => {
      const cards = hand.split(" ").map((card) => parseCard(card)!);

      expect(scoreFifteens(cards)).toBe(fifteenScore);
    });
  });
});

describe("Testing Flush Scores", () => {
  testingHands.forEach(({ hand, flushScore }) => {
    test(`${hand} should score ${flushScore}`, () => {
      const cards = hand.split(" ").map((card) => parseCard(card)!);

      expect(scoreFlush(cards)).toBe(flushScore);
    });
  });
});

describe("Testing Nobs Scores", () => {
  testingHands.forEach(({ hand, nobsScore }) => {
    test(`${hand} should score ${nobsScore}`, () => {
      const cards = hand.split(" ").map((card) => parseCard(card)!);

      expect(scoreNobs(cards.slice(0, 4), cards[5])).toBe(nobsScore);
    });
  });
});

describe("Testing Pair Scores", () => {
  testingHands.forEach(({ hand, pairScore }) => {
    test(`${hand} should score ${pairScore}`, () => {
      const cards = hand.split(" ").map((card) => parseCard(card)!);

      expect(scorePairs(cards)).toBe(pairScore);
    });
  });
});

describe("Testing Runs Scores", () => {
  testingHands.forEach(({ hand, runScore }) => {
    test(`${hand} should score ${runScore}`, () => {
      const cards = hand.split(" ").map((card) => parseCard(card)!);

      expect(scoreRuns(cards)).toBe(runScore);
    });
  });
});

describe("Testing Total Scores", () => {
  testingHands.forEach(({ hand, ...scores }) => {
    const score = Array.from(Object.values(scores)).reduce(
      (total, value) => total + value,
      0
    );

    test(`${hand} should score ${score}`, () => {
      const cards = hand.split(" ").map((card) => parseCard(card)!);

      expect(calculateCribbageScore(cards).totalScore).toBe(score);
    });
  });
});
