import { parseCard } from "../utils/parseCard";
import { scoreFifteens } from "./scoreFifteens";
import { testingHands } from "../constants/testingHands";

describe("scoreFifteens", () => {
  testingHands.forEach(({ hand, fifteenScore }) => {
    test(`${hand} should score ${fifteenScore}`, () => {
      const cards = hand.split(" ").map((card) => parseCard(card)!);

      expect(scoreFifteens(cards)).toBe(fifteenScore);
    });
  });
});
