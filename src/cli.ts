import { Card } from "./interfaces/card.interface";
import { parseCard } from "./utils/parseCard";
import { suggestOptimalHand } from "./scoring/suggestOptimalHand";

interface SuggestCliArgs {
  sixCards: Card[];
  isDealer: boolean;
}

interface CliArgs {
  command: string;
  suggestArgs?: SuggestCliArgs;
}

export const parseCliArgs = (args: string[]): CliArgs => {
  const command = args[0];

  if (command === "suggest") {
    let handString: string | undefined;
    let isDealer: boolean = false;

    for (let i = 1; i < args.length; i++) {
      if (args[i].startsWith("--hand=")) {
        handString = args[i].substring("--hand=".length);
      } else if (args[i] === "--dealer") {
        isDealer = true;
      }
    }

    if (!handString) {
      throw new Error("Error: --hand argument is required for the 'suggest' command.");
    }

    const cardStrings = handString.split(" ");
    if (cardStrings.length !== 6) {
      throw new Error("Error: --hand must contain exactly 6 card strings.");
    }

    let sixCardsWithNull: (Card | null)[];
    try {
      sixCardsWithNull = cardStrings.map(parseCard);
      if (sixCardsWithNull.some((c) => !c)) {
        throw new Error(`Invalid card string found.`);
      }
    } catch (error: any) {
      throw new Error(`Error parsing cards: ${error.message}`);
    }

    const sixCards = sixCardsWithNull as Card[];

    return { command: "suggest", suggestArgs: { sixCards, isDealer } };
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
};

const main = () => {
  try {
    const { command, suggestArgs } = parseCliArgs(process.argv.slice(2));

    if (command === "suggest" && suggestArgs) {
      const { hand, discard, totalValue } = suggestOptimalHand(
        suggestArgs.sixCards,
        suggestArgs.isDealer
      );
      console.log("Optimal Hand to Keep:", hand.map(c => `${c.rank}${c.suit.charAt(0)}`).join(" "));
      console.log("Cards to Discard:", discard.map(c => `${c.rank}${c.suit.charAt(0)}`).join(" "));
      console.log("Expected Total Value:", totalValue.toFixed(2));
    } else {
      console.log("Usage: yarn suggest --hand=\"<cards>\" [--dealer]");
    }
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}
