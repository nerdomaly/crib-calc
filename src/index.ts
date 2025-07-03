#!/usr/bin/env node

import { Card } from "./interfaces/card.interface";
import { calculateCribbageScore } from "./scoring";
import { getCombinations } from "./utils/getCombinations";
import { parseCard } from "./utils/parseCard";

/**
 * Code path for the --score command.
 */
const runScore = (args: string[]) => {
  if (args.length !== 5) {
    console.error("Usage: crib-calc --score <c1> <c2> <c3> <c4> <common>");
    process.exit(1);
  }

  const hand: Card[] = args
    .slice(0, 4)
    .map(parseCard)
    .filter((c): c is Card => c !== null);
  const commonCard = parseCard(args[4]);

  if (hand.length !== 4 || !commonCard) {
    console.error("Error: Could not parse all cards.");
    process.exit(1);
  }

  const isCrib = process.argv.includes("--crib");
  const result = calculateCribbageScore(hand, commonCard, isCrib);

  // ... (console.log output for the score is the same as before)
  console.log(
    `\nHand: ${hand.map((c) => c.rank + c.suit[0]).join(" ")} | Common: ${
      commonCard.rank
    }${commonCard.suit[0]}`
  );
  console.log("--------------------");
  console.log(`Total Score: ${result.totalScore}`);
};

/**
 * Code path for the --pick command.
 */
const runPick = (args: string[]) => {
  if (args.length !== 6) {
    console.error("Usage: crib-calc --pick <c1> <c2> <c3> <c4> <c5> <c6>");
    process.exit(1);
  }

  const sixCards: Card[] = args
    .map(parseCard)
    .filter((c): c is Card => c !== null);
  if (sixCards.length !== 6) {
    console.error("Error: Could not parse all 6 cards.");
    process.exit(1);
  }

  const all4CardHands = getCombinations(sixCards, 4);
  let bestHand: Card[] = [];
  let bestScore = -1;

  for (const hand of all4CardHands) {
    const { totalScore } = calculateCribbageScore(hand);
    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestHand = hand;
    }
  }

  const discards = sixCards.filter((card) => !bestHand.includes(card));
  const formatCards = (cards: Card[]) =>
    cards.map((c) => `${c.rank}${c.suit[0]}`).join(" ");

  console.log("\nAnalyzed 6 cards to find the best hand to keep.");
  console.log("-------------------------------------------------");
  console.log(
    `Best Hand: ${formatCards(bestHand)} (Scores ${bestScore} points)`
  );
  console.log(`Discards:  ${formatCards(discards)}`);
};

/**
 * Main CLI Router
 */
const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "--score":
      runScore(args.slice(1));
      break;
    case "--pick":
      runPick(args.slice(1));
      break;
    default:
      console.log("Unknown command. Please use '--score' or '--pick'.");
      console.log("\nUsage:");
      console.log("  crib-calc --score <c1> <c2> <c3> <c4> <common>");
      console.log("  crib-calc --pick <c1> <c2> <c3> <c4> <c5> <c6>");
      process.exit(1);
  }
};

main();
