import { Card } from "../interfaces/card.interface";

// A map to convert suit characters to suits
export const suitMap: { [key: string]: Card["suit"] } = {
  C: "Clubs",
  D: "Diamonds",
  H: "Hearts",
  S: "Spades",
};
