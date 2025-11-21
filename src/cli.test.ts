import { parseCliArgs } from "./cli";
import { Card } from "./interfaces/card.interface";

describe("CLI Argument Parser", () => {
  it("should parse hand and dealer flag correctly", () => {
    const args = ["suggest", "--hand=AC 2S 3D 4H 5C 6S", "--dealer"];
    const { command, suggestArgs } = parseCliArgs(args);

    expect(command).toBe("suggest");
    expect(suggestArgs?.isDealer).toBe(true);
    expect(suggestArgs?.sixCards).toHaveLength(6);
    expect(suggestArgs?.sixCards[0].rank).toBe("A");
    expect(suggestArgs?.sixCards[5].suit).toBe("Spades");
  });

  it("should handle non-dealer case correctly", () => {
    const args = ["suggest", "--hand=AC 2S 3D 4H 5C 6S"];
    const { command, suggestArgs } = parseCliArgs(args);

    expect(command).toBe("suggest");
    expect(suggestArgs?.isDealer).toBe(false);
    expect(suggestArgs?.sixCards).toHaveLength(6);
  });

  it("should throw an error if hand is missing", () => {
    const args = ["suggest", "--dealer"];
    expect(() => parseCliArgs(args)).toThrow(
      "Error: --hand argument is required for the 'suggest' command."
    );
  });

  it("should throw an error for incorrect number of cards", () => {
    const args = ["suggest", "--hand=AC 2S 3D 4H 5C"];
    expect(() => parseCliArgs(args)).toThrow(
      "Error: --hand must contain exactly 6 card strings."
    );
  });

  it("should throw an error for invalid card string", () => {
    const args = ["suggest", "--hand=AC 2S 3D 4H 5C XX"];
    expect(() => parseCliArgs(args)).toThrow(
      "Error parsing cards: Invalid card string found."
    );
  });

  it("should throw an error for unknown command", () => {
    const args = ["unknown", "--hand=AC 2S 3D 4H 5C 6S"];
    expect(() => parseCliArgs(args)).toThrow("Unknown command: unknown");
  });
});
