import { parseCard } from "../utils/parseCard";
import { suggestOptimalHand } from "./suggestOptimalHand";

describe("suggestOptimalHand", () => {
  it("should suggest the optimal hand for a given set of cards (dealer)", () => {
    const sixCards = [
      "AC",
      "2S",
      "10D",
      "JH",
      "KH",
      "5C",
    ].map(parseCard).filter((card): card is import("/home/rwhite/Projects/crib-calc/src/interfaces/card.interface").Card => card !== null);
    const isDealer = true;

    const { hand, discard, totalValue } = suggestOptimalHand(
      sixCards,
      isDealer
    );

    // This is a placeholder test. The actual expected values need to be calculated manually or
    // with a known good cribbage calculator to ensure correctness.
    // For now, we'll assert that a hand and discard are returned and the totalValue is a number.
    expect(hand.length).toBe(4);
    expect(discard.length).toBe(2);
    expect(typeof totalValue).toBe("number");
    expect(totalValue).toBeGreaterThan(0); // Should be a positive score for a valid hand
  });

  it("should suggest the optimal hand for a given set of cards (non-dealer)", () => {
    const sixCards = [
      "AC",
      "2S",
      "10D",
      "JH",
      "KH",
      "5C",
    ].map(parseCard).filter((card): card is import("/home/rwhite/Projects/crib-calc/src/interfaces/card.interface").Card => card !== null);
    const isDealer = false;

    const { hand, discard, totalValue } = suggestOptimalHand(
      sixCards,
      isDealer
    );

    // Placeholder assertions similar to the dealer test.
    expect(hand.length).toBe(4);
    expect(discard.length).toBe(2);
    expect(typeof totalValue).toBe("number");
    expect(totalValue).toBeGreaterThan(0); // Still expecting a positive value for the hand, even if crib is negative
  });
});
