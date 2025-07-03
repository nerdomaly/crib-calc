import { parseCard } from "../utils/parseCard";
import { scoreFifteens } from "./scoreFifteens";

describe("scoreFifteens", () => {
  test("AH, AD, 2H, 3D, 4H should score zero", () => {
    const card = parseCard("AH")!;

    const cards = [card];

    expect(scoreFifteens(cards)).toBe(0);
  });
});
