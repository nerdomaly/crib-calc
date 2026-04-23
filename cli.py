import argparse
import sys

from crib_calc.utils.parse_card import parse_card
from crib_calc.scoring.suggest_optimal_hand import suggest_optimal_hand


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(prog="crib-calc")
    subparsers = parser.add_subparsers(dest="command")

    suggest_parser = subparsers.add_parser("suggest", help="Suggest optimal 4-card hand from 6 cards")
    suggest_parser.add_argument(
        "--hand",
        required=True,
        help='Six space-separated cards, e.g. "AC 2S 10D JH KH 5C"',
    )
    suggest_parser.add_argument(
        "--dealer",
        action="store_true",
        help="You are the dealer (crib cards work in your favour)",
    )

    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)

    if args.command is None:
        print('Usage: python cli.py suggest --hand="<6 cards>" [--dealer]')
        sys.exit(1)

    card_strings = args.hand.split()
    if len(card_strings) != 6:
        print(f"Error: --hand must contain exactly 6 cards, got {len(card_strings)}.", file=sys.stderr)
        sys.exit(1)

    cards = []
    for s in card_strings:
        card = parse_card(s)
        if card is None:
            print(f"Error: invalid card '{s}'.", file=sys.stderr)
            sys.exit(1)
        cards.append(card)

    result = suggest_optimal_hand(cards, args.dealer)

    hand_str = " ".join(f"{c.rank}{c.suit[0]}" for c in result["hand"])
    discard_str = " ".join(f"{c.rank}{c.suit[0]}" for c in result["discard"])

    print(f"Optimal Hand to Keep: {hand_str}")
    print(f"Cards to Discard:     {discard_str}")
    print(f"Expected Total Value: {result['total_value']:.2f}")


if __name__ == "__main__":
    main()
