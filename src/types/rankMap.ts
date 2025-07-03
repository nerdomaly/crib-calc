import { Card } from "../interfaces/card.interface";

// A map to convert rank characters to ranks and values
export const rankMap: {
  [key: string]: { rank: Card["rank"]; value: number; order: number };
} = {
  A: { rank: "A", value: 1, order: 1 },
  "2": { rank: "2", value: 2, order: 2 },
  "3": { rank: "3", value: 3, order: 3 },
  "4": { rank: "4", value: 4, order: 4 },
  "5": { rank: "5", value: 5, order: 5 },
  "6": { rank: "6", value: 6, order: 6 },
  "7": { rank: "7", value: 7, order: 7 },
  "8": { rank: "8", value: 8, order: 8 },
  "9": { rank: "9", value: 9, order: 9 },
  T: { rank: "10", value: 10, order: 10 },
  J: { rank: "J", value: 10, order: 11 },
  Q: { rank: "Q", value: 10, order: 12 },
  K: { rank: "K", value: 10, order: 13 },
};
