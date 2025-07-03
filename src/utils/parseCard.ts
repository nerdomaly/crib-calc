import { Card } from "../interfaces/card.interface";
import { rankMap } from "../types/rankMap";
import { suitMap } from "../types/suitMap";

/**
 * Parses a string like "AS" or "TC" into a Card object.
 */
export const parseCard = (cardStr: string): Card | null => {
  if (cardStr.length !== 2) return null;

  const rankChar = cardStr[0].toUpperCase();
  const suitChar = cardStr[1].toUpperCase();

  const rankInfo = rankMap[rankChar];
  const suit = suitMap[suitChar];

  if (!rankInfo || !suit) {
    console.error(`Error: Invalid card string "${cardStr}"`);
    return null;
  }

  return { ...rankInfo, suit };
};
