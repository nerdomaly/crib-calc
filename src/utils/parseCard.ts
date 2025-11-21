import { Card } from "../interfaces/card.interface";
import { rankMap } from "../types/rankMap";
import { suitMap } from "../types/suitMap";

/**
 * Parses a string like "AS", "TC", or "10D" into a Card object.
 */
export const parseCard = (cardStr: string): Card | null => {
  let rankChar: string;
  let suitChar: string;

  if (cardStr.length === 3 && cardStr.startsWith("10")) {
    rankChar = "T"; // Use 'T' to match the rankMap for '10'
    suitChar = cardStr[2].toUpperCase();
  } else if (cardStr.length === 2) {
    rankChar = cardStr[0].toUpperCase();
    suitChar = cardStr[1].toUpperCase();
  } else {
    // If not 2 or 3 characters, or doesn't start with "10", it's invalid
    console.error(`Error: Invalid card string format "${cardStr}"`);
    return null;
  }

  const rankInfo = rankMap[rankChar];
  const suit = suitMap[suitChar];

  if (!rankInfo || !suit) {
    console.error(`Error: Invalid rank or suit in card string "${cardStr}"`);
    return null;
  }

  return { ...rankInfo, suit };
};
