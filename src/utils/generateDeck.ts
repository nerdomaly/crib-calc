import { Card, CardRank, CardSuit } from "../interfaces/card.interface";

const allRanks: CardRank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const allSuits: CardSuit[] = ["Clubs", "Diamonds", "Hearts", "Spades"];

export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  let order = 0;
  for (const suit of allSuits) {
    for (const rank of allRanks) {
      let value: number;
      if (rank === "A") {
        value = 1;
      } else if (["J", "Q", "K"].includes(rank)) {
        value = 10;
      } else {
        value = parseInt(rank);
      }
      deck.push({ suit, rank, value, order: order++ });
    }
  }
  return deck;
};