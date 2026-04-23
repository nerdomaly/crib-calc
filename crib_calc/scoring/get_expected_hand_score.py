from crib_calc.card import Card
from crib_calc.utils.generate_deck import generate_deck
from crib_calc.scoring import calculate_cribbage_score


def get_expected_hand_score(four_card_hand: list[Card], initial_six_cards: list[Card]) -> float:
    full_deck = generate_deck()
    six_keys = {(c.rank, c.suit) for c in initial_six_cards}
    possible_cuts = [c for c in full_deck if (c.rank, c.suit) not in six_keys]

    total = sum(
        calculate_cribbage_score(four_card_hand, cut)["total_score"]
        for cut in possible_cuts
    )
    return total / len(possible_cuts)
