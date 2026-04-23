from crib_calc.card import Card
from crib_calc.utils.get_all_hand_discard_combinations import get_all_hand_discard_combinations
from crib_calc.scoring.get_expected_hand_score import get_expected_hand_score
from crib_calc.scoring.get_simplified_discard_score import get_simplified_discard_score


def suggest_optimal_hand(
    initial_six_cards: list[Card],
    is_dealer: bool,
) -> dict:
    best_hand: list[Card] = []
    best_discard: list[Card] = []
    highest_value = float("-inf")

    for combo in get_all_hand_discard_combinations(initial_six_cards):
        hand: list[Card] = combo["hand"]
        discard: list[Card] = combo["discard"]

        expected_hand = get_expected_hand_score(hand, initial_six_cards)
        discard_score = get_simplified_discard_score(discard)

        total = expected_hand + discard_score if is_dealer else expected_hand - discard_score

        if total > highest_value:
            highest_value = total
            best_hand = hand
            best_discard = discard

    return {"hand": best_hand, "discard": best_discard, "total_value": highest_value}
