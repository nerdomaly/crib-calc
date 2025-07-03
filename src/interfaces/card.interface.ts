export type CardSuit = "Clubs" | "Diamonds" | "Hearts" | "Spades";
export type CardRank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface Card {
  suit: CardSuit;
  rank: CardRank;
  value: number; // For counting 15s
  order: number; // For sorting runs
}
